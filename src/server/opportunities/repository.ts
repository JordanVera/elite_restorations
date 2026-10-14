import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { FatalError } from "workflow";

import { getPrisma } from "@/server/db";
import { savePrivateImage } from "@/server/opportunities/blob";
import { conflictsBetween, dedupeKey } from "@/server/opportunities/dedupe";
import { demoAssessment, demoListings, DEMO_NOTICE } from "@/server/opportunities/demo";
import { missingPhotoReason, screenCandidate } from "@/server/opportunities/eligibility";
import { assertCompanyPhoto, type ImportedListing } from "@/server/opportunities/import-listings";
import { decidePrice, type PriceFields } from "@/server/opportunities/pricing";
import {
  normalizeRepliersListing,
  repliersStatus,
  searchRepliers,
  type NormalizedListing,
} from "@/server/opportunities/providers";
import { scoreOpportunity } from "@/server/opportunities/ranking";
import { applyExclusion } from "@/server/opportunities/exclusion";
import { downloadImage } from "@/server/opportunities/ssrf";
import { defaultSettings, runSettingsSchema, soldWindow, type RunSettings } from "@/server/opportunities/settings";
import { estimateFromSettings, reserveAgainstCap } from "@/server/opportunities/spending";

export type StageCounts = {
  discovered: number;
  screened: number;
  excluded: number;
  qualified: number;
  selected: number;
  generated: number;
  failed: number;
};

export const emptyCounts = (): StageCounts => ({
  discovered: 0,
  screened: 0,
  excluded: 0,
  qualified: 0,
  selected: 0,
  generated: 0,
  failed: 0,
});

function countsOf(value: unknown): StageCounts {
  const base = emptyCounts();
  if (!value || typeof value !== "object") return base;
  for (const key of Object.keys(base) as (keyof StageCounts)[]) {
    const next = (value as Record<string, unknown>)[key];
    if (typeof next === "number") base[key] = next;
  }
  return base;
}

export async function ensurePriceBook() {
  const prisma = getPrisma();
  const count = await prisma.priceBookItem.count();
  if (count > 0) return;
  const rows = (["kitchen", "bathroom"] as const).flatMap((roomType) =>
    (["low", "medium", "high"] as const).map((tier) => ({
      roomType,
      tier,
      label: tier === "low" ? "Refresh" : tier === "medium" ? "Remodel" : "Premium",
      lowCents: null,
      highCents: null,
      assumptions: "No company price has been entered. Measurements are not taken from photos.",
      siteVisitRequired: true,
    })),
  );
  await prisma.priceBookItem.createMany({ data: rows });
}

export function planningAllowance(item: { lowCents: number | null; highCents: number | null; siteVisitRequired: boolean } | null) {
  if (!item || item.siteVisitRequired || item.lowCents == null || item.highCents == null) return "Site visit required";
  const low = Math.round(item.lowCents / 100).toLocaleString("en-US");
  const high = Math.round(item.highCents / 100).toLocaleString("en-US");
  return `Planning allowance $${low}–$${high}. This is not a construction quote or a promise of added home value.`;
}

export async function createRun(input: {
  name: string;
  origin: "live" | "import" | "demo";
  settings: RunSettings;
  createdBy: string;
}) {
  const prisma = getPrisma();
  const window = soldWindow(input.settings);
  const estimate = estimateFromSettings(input.settings);
  return prisma.opportunityRun.create({
    data: {
      name: input.name,
      origin: input.origin,
      status: "queued",
      settings: input.settings,
      chicagoStart: window.chicagoStart,
      chicagoEnd: window.chicagoEnd,
      stageCounts: emptyCounts(),
      estimatedCostCents: estimate.estimatedCents,
      spendCapCents: input.settings.maxSpendCents,
      createdBy: input.createdBy,
    },
  });
}

async function setCounts(runId: string, counts: StageCounts) {
  await getPrisma().opportunityRun.update({ where: { id: runId }, data: { stageCounts: counts } });
}

async function assertActive(runId: string) {
  const run = await getPrisma().opportunityRun.findUnique({ where: { id: runId } });
  if (!run) throw new FatalError("The run no longer exists.");
  if (run.status === "cancelled") throw new FatalError("The run was cancelled.");
  return run;
}

function settingsOf(value: unknown) {
  return runSettingsSchema.parse(value);
}

export async function discoverListings(runId: string) {
  const run = await assertActive(runId);
  const settings = settingsOf(run.settings);
  const counts = countsOf(run.stageCounts);
  if (run.origin === "live") {
    const provider = repliersStatus();
    if (!provider.capabilities.soldSearch || !provider.capabilities.localRetention) {
      const message = `Provider not configured for a stored HAR search. ${provider.needed.join(" ")}`;
      await getPrisma().opportunityRun.update({
        where: { id: runId },
        data: { status: "failed", partial: true, error: message },
      });
      throw new FatalError(message);
    }
    let page = 1;
    let numPages = 1;
    const seen = new Set<string>();
    while (page <= numPages && counts.discovered < settings.maxCandidates) {
      const batch = await searchRepliers(settings, { chicagoStart: run.chicagoStart, chicagoEnd: run.chicagoEnd }, page);
      numPages = batch.numPages;
      for (const raw of batch.listings) {
        if (counts.discovered >= settings.maxCandidates) break;
        const normalized = normalizeRepliersListing(raw, new Date().toISOString());
        if ("error" in normalized) continue;
        const key = dedupeKey(normalized);
        if (seen.has(key)) continue;
        seen.add(key);
        await insertListing(runId, normalized, provider.capabilities.photos);
        counts.discovered += 1;
      }
      page += 1;
      if (page > 20) break;
    }
  }
  counts.discovered = Math.max(counts.discovered, await getPrisma().listing.count({ where: { runId } }));
  await setCounts(runId, counts);
  await getPrisma().opportunityRun.update({ where: { id: runId }, data: { status: "running" } });
}

async function insertListing(runId: string, listing: NormalizedListing, storePhotos: boolean) {
  const prisma = getPrisma();
  const key = dedupeKey(listing);
  const existing = await prisma.listing.findUnique({ where: { runId_dedupeKey: { runId, dedupeKey: key } } });
  if (existing) {
    const conflicts = conflictsBetween(
      { ...existing, mlsId: existing.mlsId, addressLine: existing.addressLine, unit: existing.unit, city: existing.city, postalCode: existing.postalCode },
      listing,
    );
    if (conflicts.length) {
      await prisma.listingConflict.createMany({
        data: conflicts.map((conflict) => ({
          listingId: existing.id,
          field: conflict.field,
          leftValue: conflict.left,
          rightValue: conflict.right,
          note: "Another record for this home disagreed. The first record was kept.",
        })),
      });
    }
    return existing.id;
  }
  const created = await prisma.listing.create({
    data: {
      runId,
      provider: listing.provider,
      providerId: listing.providerId,
      sourceUrl: listing.sourceUrl,
      attribution: listing.attribution,
      retrievedAt: new Date(listing.retrievedAt),
      usageRestrictions: listing.usageRestrictions,
      mlsId: listing.mlsId,
      addressLine: listing.addressLine,
      unit: listing.unit,
      city: listing.city,
      state: listing.state,
      postalCode: listing.postalCode,
      dedupeKey: key,
      status: "discovered",
      closedDate: listing.closedDate,
      saleDateVerified: Boolean(listing.closedDate) && listing.transactionStatus === "closed",
      priceBasis: listing.exactSalePrice != null ? "exact" : listing.priceRangeLow != null ? "range" : listing.askingPrice != null ? "asking" : "unknown",
      exactSalePrice: listing.exactSalePrice,
      askingPrice: listing.askingPrice,
      priceRangeLow: listing.priceRangeLow,
      priceRangeHigh: listing.priceRangeHigh,
      estimatedValue: listing.estimatedValue,
      yearBuilt: listing.yearBuilt,
      sqft: listing.sqft,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      propertyType: listing.propertyType,
      description: listing.description,
    },
  });
  if (storePhotos) {
    let saved = 0;
    for (const photo of listing.photoRefs) {
      if (saved >= 12) break;
      if (photo.publicPath) {
        assertCompanyPhoto(photo.publicPath);
        await prisma.photo.create({
          data: {
            listingId: created.id,
            publicPath: photo.publicPath,
            sourcePhotoId: photo.sourcePhotoId,
            attribution: listing.attribution,
            fetchedAt: new Date(),
          },
        });
        saved += 1;
        continue;
      }
      if (!photo.sourceUrl) continue;
      const host = new URL(photo.sourceUrl).hostname;
      if (listing.provider === "repliers" && host !== "cdn.repliers.io") continue;
      const image = await downloadImage(photo.sourceUrl);
      const pathname = await savePrivateImage(`opportunities/${created.id}/${saved}.jpg`, image.bytes, image.mime);
      await prisma.photo.create({
        data: {
          listingId: created.id,
          blobPath: pathname,
          sourceUrl: photo.sourceUrl,
          sourcePhotoId: photo.sourcePhotoId,
          mimeType: image.mime,
          attribution: listing.attribution,
          fetchedAt: new Date(),
        },
      });
      saved += 1;
    }
  }
  return created.id;
}

export async function seedImported(runId: string, listings: ImportedListing[], origin: "import" | "demo") {
  const retrievedAt = new Date().toISOString();
  for (const listing of listings) {
    const normalized: NormalizedListing = {
      provider: origin,
      providerId: listing.mlsId ?? null,
      sourceUrl: listing.sourceUrl ?? null,
      attribution: origin === "demo" ? DEMO_NOTICE : "Imported by staff from an authorized file.",
      retrievedAt,
      usageRestrictions: origin === "demo" ? DEMO_NOTICE : "Staff import. Use only records and photos you are allowed to keep.",
      mlsId: listing.mlsId ?? null,
      addressLine: listing.addressLine,
      unit: listing.unit ?? null,
      city: listing.city,
      state: listing.state,
      postalCode: listing.postalCode,
      transactionStatus: "closed",
      closedDate: listing.closedDate,
      exactSalePrice: listing.exactSalePrice ?? null,
      askingPrice: listing.askingPrice ?? null,
      priceRangeLow: listing.priceRangeLow ?? null,
      priceRangeHigh: listing.priceRangeHigh ?? null,
      estimatedValue: null,
      yearBuilt: listing.yearBuilt ?? null,
      sqft: listing.sqft ?? null,
      bedrooms: listing.bedrooms ?? null,
      bathrooms: listing.bathrooms ?? null,
      propertyType: listing.propertyType,
      description: listing.description ?? null,
      photoRefs: listing.photos.map((photo, index) => ({
        sourcePhotoId: `${index}`,
        sourceUrl: photo.sourceUrl ?? null,
        publicPath: photo.publicPath ?? null,
      })),
    };
    const id = await insertListing(runId, normalized, true);
    if (origin === "demo") {
      for (const photo of listing.photos) {
        if (!photo.roomHint) continue;
        const room = await getPrisma().room.create({
          data: {
            listingId: id,
            roomType: photo.roomHint,
            label: photo.roomHint === "kitchen" ? "Kitchen" : "Bathroom",
            decision: "outdated",
            outdatedScore: 0.74,
            updatedScore: 0.22,
            confidence: 0.7,
            explanation: demoAssessment(photo.roomHint).explanation,
            observations: demoAssessment(photo.roomHint).observations,
            includeInConcepts: true,
          },
        });
        const stored = await getPrisma().photo.findFirst({ where: { listingId: id, publicPath: photo.publicPath } });
        if (stored) {
          await getPrisma().photo.update({
            where: { id: stored.id },
            data: { classification: photo.roomHint, roomId: room.id, representative: true },
          });
          await getPrisma().room.update({ where: { id: room.id }, data: { representativePhotoId: stored.id } });
        }
      }
    }
  }
}

export async function screenListings(runId: string) {
  const run = await assertActive(runId);
  const settings = settingsOf(run.settings);
  const prisma = getPrisma();
  const listings = await prisma.listing.findMany({ where: { runId, status: "discovered" } });
  const counts = countsOf(run.stageCounts);
  for (const listing of listings) {
    counts.screened += 1;
    const prices: PriceFields = listing;
    const price = decidePrice(prices, settings);
    if (!price.include) {
      await prisma.listing.update({ where: { id: listing.id }, data: { status: "excluded", exclusionReason: price.reason } });
      counts.excluded += 1;
      continue;
    }
    const screened = screenCandidate(
      {
        transactionStatus: listing.saleDateVerified ? "closed" : "unknown",
        closedDate: listing.closedDate,
        propertyType: listing.propertyType,
        yearBuilt: listing.yearBuilt,
        sqft: listing.sqft,
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        city: listing.city,
        postalCode: listing.postalCode,
      },
      settings,
      { chicagoStart: run.chicagoStart, chicagoEnd: run.chicagoEnd },
    );
    if (!screened.eligible) {
      await prisma.listing.update({ where: { id: listing.id }, data: { status: "excluded", exclusionReason: screened.reason } });
      counts.excluded += 1;
      continue;
    }
    const photos = await prisma.photo.count({ where: { listingId: listing.id } });
    const photoReason = missingPhotoReason(photos);
    if (photoReason) {
      await prisma.listing.update({
        where: { id: listing.id },
        data: { status: "excluded", exclusionReason: photoReason },
      });
      counts.excluded += 1;
      continue;
    }
    await prisma.listing.update({ where: { id: listing.id }, data: { status: "screened", priceBasis: price.basis } });
  }
  await setCounts(runId, counts);
}

export async function readProjectImage(publicPath: string) {
  assertCompanyPhoto(publicPath);
  return readFile(path.join(process.cwd(), "public", publicPath));
}

export async function reserveSpend(runId: string, amountCents: number, taskKey: string) {
  const prisma = getPrisma();
  return prisma.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<{ reservedCostCents: number; spendCapCents: number }[]>`
      SELECT "reservedCostCents", "spendCapCents" FROM "OpportunityRun" WHERE "id" = ${runId} FOR UPDATE
    `;
    const row = rows[0];
    if (!row) throw new FatalError("The run no longer exists.");
    const decision = reserveAgainstCap(
      { capCents: row.spendCapCents, reservedCents: row.reservedCostCents, recordedCents: 0 },
      amountCents,
    );
    if (!decision.ok) return decision;
    await tx.opportunityRun.update({ where: { id: runId }, data: { reservedCostCents: decision.reservedCents } });
    const reservation = await tx.spendReservation.create({
      data: { runId, amountCents, status: "held", taskKey },
    });
    return { ok: true as const, reservedCents: decision.reservedCents, reservationId: reservation.id };
  });
}

export async function settleSpend(reservationId: string, recordedCents: number) {
  const prisma = getPrisma();
  await prisma.$transaction(async (tx) => {
    const reservation = await tx.spendReservation.findUnique({ where: { id: reservationId } });
    if (!reservation || reservation.status !== "held") return;
    await tx.spendReservation.update({ where: { id: reservationId }, data: { status: "settled" } });
    await tx.opportunityRun.update({
      where: { id: reservation.runId },
      data: { recordedCostCents: { increment: recordedCents } },
    });
    await tx.usageRecord.create({
      data: { runId: reservation.runId, kind: "generation", estimatedCents: reservation.amountCents, recordedCents },
    });
  });
}

export async function rankAndSelect(runId: string) {
  const run = await assertActive(runId);
  const settings = settingsOf(run.settings);
  const prisma = getPrisma();
  const listings = await prisma.listing.findMany({
    where: { runId, status: { in: ["screened", "qualified", "review", "selected"] } },
    include: { rooms: true },
  });
  const counts = countsOf(run.stageCounts);
  const qualified: { id: string; score: number }[] = [];
  for (const listing of listings) {
    if (!listing.rooms.length) continue;
    const result = applyExclusion(
      listing.rooms.map((room) => ({
        id: room.id,
        roomType: room.roomType as "kitchen" | "bathroom",
        decision: (room.decision ?? "insufficient_evidence") as "outdated" | "updated_appearance" | "mixed" | "insufficient_evidence",
        outdatedScore: room.outdatedScore ?? 0,
        updatedScore: room.updatedScore ?? 0,
        confidence: room.confidence ?? 0,
      })),
      settings,
    );
    if (result.action === "exclude") {
      await prisma.listing.update({ where: { id: listing.id }, data: { status: "excluded", exclusionReason: result.reason, selected: false } });
      counts.excluded += 1;
      continue;
    }
    if (result.action === "review") {
      await prisma.listing.update({ where: { id: listing.id }, data: { status: "review", reviewReason: result.reason, selected: false } });
      continue;
    }
    if (result.action !== "qualify") {
      await prisma.listing.update({ where: { id: listing.id }, data: { status: "excluded", exclusionReason: result.reason } });
      counts.excluded += 1;
      continue;
    }
    const scored = scoreOpportunity({
      outdatedScore: Math.max(...listing.rooms.map((room) => room.outdatedScore ?? 0)),
      confidence: Math.max(...listing.rooms.map((room) => room.confidence ?? 0)),
      closedDate: listing.closedDate ?? run.chicagoEnd,
      window: { chicagoStart: run.chicagoStart, chicagoEnd: run.chicagoEnd },
      cityMatched: true,
      priceMatched: true,
      qualifyingRooms: result.roomIds.length,
      weights: settings.rankWeights,
    });
    await prisma.room.updateMany({ where: { listingId: listing.id }, data: { includeInConcepts: false } });
    await prisma.room.updateMany({ where: { id: { in: result.roomIds } }, data: { includeInConcepts: true } });
    await prisma.listing.update({
      where: { id: listing.id },
      data: {
        status: "qualified",
        opportunityScore: scored.score,
        scoreBreakdown: scored.breakdown,
        scoreExplanation: scored.explanation,
      },
    });
    qualified.push({ id: listing.id, score: scored.score });
    counts.qualified += 1;
  }
  qualified.sort((a, b) => b.score - a.score);
  const chosen = qualified.slice(0, settings.targetCount);
  await prisma.listing.updateMany({ where: { runId }, data: { selected: false, rank: null } });
  for (const [index, item] of chosen.entries()) {
    await prisma.listing.update({ where: { id: item.id }, data: { selected: true, rank: index + 1, status: "selected" } });
  }
  counts.selected = chosen.length;
  counts.qualified = qualified.length;
  counts.excluded = await prisma.listing.count({ where: { runId, status: "excluded" } });
  if (chosen.length < settings.targetCount) {
    await prisma.opportunityRun.update({
      where: { id: runId },
      data: {
        shortfallNote: `The filters produced ${chosen.length} of ${settings.targetCount} requested homes. The report keeps that number. Filters were not relaxed.`,
      },
    });
  }
  await setCounts(runId, counts);
}

export async function loadRun(runId: string) {
  return getPrisma().opportunityRun.findUnique({
    where: { id: runId },
    include: {
      listings: { include: { rooms: { include: { concepts: true } }, photos: true, conflicts: true }, orderBy: { rank: "asc" } },
      artifacts: true,
    },
  });
}
