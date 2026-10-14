import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { FatalError } from "workflow";

import { getPrisma } from "@/server/db";
import {
  analysisCacheKey,
  assessRoom,
  checkConcept,
  classifyPhotos,
  conceptCacheKey,
  imageModel,
  openaiConfigured,
  sha256,
  visionModel,
} from "@/server/opportunities/analyze";
import { readPrivateImage, savePrivateImage, privateBlobConfigured } from "@/server/opportunities/blob";
import { editRoomPhoto, recordedEditCents } from "@/server/opportunities/image-edit";
import { assertCompanyPhoto } from "@/server/opportunities/import-listings";
import { conceptPrompt, scopeSummary, type TierKey } from "@/server/opportunities/prompts";
import { planningAllowance, rankAndSelect, reserveSpend, settleSpend } from "@/server/opportunities/repository";
import { runSettingsSchema } from "@/server/opportunities/settings";
import { repliersStatus } from "@/server/opportunities/providers";
import { recoverTask } from "@/server/opportunities/spending";
import { roomAssessmentSchema } from "@/server/opportunities/vision";

async function bytesForPhoto(photo: { publicPath: string | null; blobPath: string | null }) {
  if (photo.publicPath) {
    assertCompanyPhoto(photo.publicPath);
    const bytes = await readFile(path.join(process.cwd(), "public", photo.publicPath));
    return { bytes, mime: photo.publicPath.endsWith(".png") ? "image/png" : photo.publicPath.endsWith(".webp") ? "image/webp" : "image/jpeg" };
  }
  if (photo.blobPath) {
    const stored = await readPrivateImage(photo.blobPath);
    if (!stored) throw new Error("A stored photo could not be read.");
    const bytes = Buffer.from(await new Response(stored.stream).arrayBuffer());
    return { bytes, mime: stored.blob.contentType || "image/jpeg" };
  }
  throw new Error("The photo has no stored file.");
}

export async function analyzeRun(runId: string) {
  const prisma = getPrisma();
  const run = await prisma.opportunityRun.findUnique({ where: { id: runId } });
  if (!run) throw new FatalError("The run no longer exists.");
  if (run.status === "cancelled") throw new FatalError("The run was cancelled.");
  if (run.origin === "live") {
    const provider = repliersStatus();
    if (!provider.capabilities.aiProcessing) {
      await prisma.opportunityRun.update({
        where: { id: runId },
        data: {
          status: "partial",
          partial: true,
          error: `Provider not configured for AI processing. ${provider.needed.join(" ")}`,
        },
      });
      return;
    }
  }
  const settings = runSettingsSchema.parse(run.settings);
  const listings = await prisma.listing.findMany({
    where: { runId, status: "screened" },
    include: { photos: true, rooms: true },
  });
  let inspected = 0;
  for (const listing of listings) {
    if (listing.rooms.length) continue;
    if (!openaiConfigured()) {
      await prisma.listing.update({
        where: { id: listing.id },
        data: { status: "review", reviewReason: "OpenAI is not configured, so the photos were not analyzed." },
      });
      continue;
    }
    const photos = listing.photos.slice(0, 8);
    if (!photos.length || inspected >= settings.maxPhotos) continue;
    const loaded = [];
    for (const photo of photos) {
      if (inspected >= settings.maxPhotos) break;
      const file = await bytesForPhoto(photo);
      loaded.push({ id: photo.id, ...file, hash: sha256(file.bytes) });
      inspected += 1;
    }
    const classified = await classifyPhotos(loaded.map((photo) => ({ id: photo.id, mediaType: photo.mime, data: photo.bytes })));
    const groups = new Map<string, typeof loaded>();
    for (const item of classified.object.photos) {
      const photo = loaded.find((entry) => entry.id === item.photoId);
      if (!photo) continue;
      await prisma.photo.update({ where: { id: photo.id }, data: { classification: item.classification, contentHash: photo.hash } });
      if (item.classification !== "kitchen" && item.classification !== "bathroom") continue;
      const groupId = item.duplicateOf ?? photo.id;
      const bucket = groups.get(groupId) ?? [];
      bucket.push(photo);
      groups.set(groupId, bucket);
    }
    let rooms = 0;
    for (const bucket of groups.values()) {
      if (rooms >= settings.maxRoomsPerProperty) break;
      const roomType = (await prisma.photo.findUnique({ where: { id: bucket[0].id } }))?.classification;
      if (roomType !== "kitchen" && roomType !== "bathroom") continue;
      const assessment = await assessRoom({
        roomType,
        description: listing.description,
        images: bucket.slice(0, 3).map((photo) => ({ mediaType: photo.mime, data: photo.bytes })),
      });
      const parsed = roomAssessmentSchema.parse(assessment.object);
      const room = await prisma.room.create({
        data: {
          listingId: listing.id,
          roomType,
          label: roomType === "kitchen" ? `Kitchen ${rooms + 1}` : `Bathroom ${rooms + 1}`,
          representativePhotoId: bucket[0].id,
          decision: parsed.decision,
          outdatedScore: parsed.outdatedScore,
          updatedScore: parsed.updatedScore,
          confidence: parsed.confidence,
          explanation: parsed.explanation,
          observations: parsed.observations,
        },
      });
      await prisma.assessment.create({
        data: {
          roomId: room.id,
          photoId: bucket[0].id,
          cacheKey: analysisCacheKey(bucket[0].hash, visionModel()),
          payload: parsed,
          model: visionModel(),
          promptVersion: "opportunity-v1",
        },
      });
      await prisma.photo.update({ where: { id: bucket[0].id }, data: { representative: true, roomId: room.id } });
      rooms += 1;
    }
  }
  await rankAndSelect(runId);
}

export async function generateRun(runId: string) {
  const prisma = getPrisma();
  const run = await prisma.opportunityRun.findUnique({ where: { id: runId } });
  if (!run || run.status === "cancelled") throw new FatalError("The run is not active.");
  const settings = runSettingsSchema.parse(run.settings);
  if (run.origin === "live" && !repliersStatus().capabilities.derivativeImages) {
    await prisma.opportunityRun.update({
      where: { id: runId },
      data: { partial: true, error: "Provider not configured for derivative images. Concepts were not generated from HAR photos." },
    });
    return;
  }
  if (!openaiConfigured() || !privateBlobConfigured()) {
    await prisma.opportunityRun.update({
      where: { id: runId },
      data: {
        partial: true,
        status: "partial",
        error: !openaiConfigured()
          ? "OPENAI_API_KEY is not configured, so concepts were not generated."
          : "Private Blob storage is not configured, so generated images were not stored.",
      },
    });
    return;
  }
  const listings = await prisma.listing.findMany({
    where: { runId, selected: true },
    include: { rooms: { where: { includeInConcepts: true }, include: { concepts: true } } },
  });
  const book = await prisma.priceBookItem.findMany();
  const counts = (run.stageCounts ?? {}) as { generated?: number; failed?: number };
  let generated = counts.generated ?? 0;
  let failed = counts.failed ?? 0;
  for (const listing of listings) {
    const rooms = listing.rooms.slice(0, settings.maxRoomsPerProperty);
    let images = 0;
    for (const room of rooms) {
      const photo = room.representativePhotoId
        ? await prisma.photo.findUnique({ where: { id: room.representativePhotoId } })
        : await prisma.photo.findFirst({ where: { roomId: room.id, representative: true } });
      if (!photo) continue;
      const file = await bytesForPhoto(photo);
      const hash = sha256(file.bytes);
      const parsed = roomAssessmentSchema.parse({
        roomType: room.roomType,
        observations: room.observations,
        outdatedScore: room.outdatedScore ?? 0,
        updatedScore: room.updatedScore ?? 0,
        confidence: room.confidence ?? 0,
        explanation: room.explanation ?? "",
        decision: room.decision ?? "insufficient_evidence",
      });
      for (const tier of ["low", "medium", "high"] as const) {
        if (images >= settings.maxImagesPerProperty) break;
        const cacheKey = conceptCacheKey(hash, tier, settings, imageModel());
        const existing = await prisma.concept.findUnique({ where: { cacheKey } });
        if (existing) {
          generated += 1;
          images += 1;
          continue;
        }
        const taskKey = `${room.id}:${tier}:${cacheKey}`;
        const task = await prisma.generationTask.upsert({
          where: { idempotencyKey: taskKey },
          update: {},
          create: { runId, roomId: room.id, tier, idempotencyKey: taskKey, status: "pending" },
        });
        const recovery = recoverTask(task, settings.maxRetries);
        if (recovery === "hold_uncertain" || recovery === "stop" || recovery === "already_done") continue;
        const estimate = settings.imageQuality === "high" ? 16 : settings.imageQuality === "low" ? 4 : 8;
        const reserved = await reserveSpend(runId, estimate, taskKey);
        if (!reserved.ok) {
          await prisma.opportunityRun.update({
            where: { id: runId },
            data: { partial: true, error: reserved.reason },
          });
          return;
        }
        await prisma.generationTask.update({
          where: { id: task.id },
          data: { status: "running", attempt: { increment: 1 }, reservationId: reserved.reservationId },
        });
        try {
          const prompt = conceptPrompt({
            assessment: parsed,
            tier,
            settings,
            retained: "Viewpoint, footprint, windows, doors, and major fixture locations.",
          });
          const edited = await editRoomPhoto({ bytes: file.bytes, mime: file.mime, prompt, quality: settings.imageQuality });
          const pathname = await savePrivateImage(`opportunities/concepts/${room.id}-${tier}.jpg`, edited.bytes, "image/jpeg");
          let checkStatus = "needs_review";
          let checkNotes = "Automated visual check did not run.";
          try {
            const check = await checkConcept({
              source: { mediaType: file.mime, data: file.bytes },
              concept: { mediaType: "image/jpeg", data: edited.bytes },
              prompt,
            });
            const problems = check.object.geometryChanged || check.object.openingsMoved || check.object.fixturesMisplaced || check.object.circulationProblem || check.object.scopeViolation;
            checkStatus = check.object.passed && !problems ? "passed" : "needs_review";
            checkNotes = `${check.object.notes} Automated visual checks do not guarantee accuracy.`;
          } catch {
            checkNotes = "The automated check failed. The concept is kept for review and was not described as accurate.";
          }
          const allowance = book.find((item) => item.roomType === room.roomType && item.tier === tier);
          await prisma.concept.create({
            data: {
              roomId: room.id,
              tier,
              cacheKey,
              blobPath: pathname,
              prompt,
              scopeSummary: scopeSummary({
                tier: tier as TierKey,
                settings,
                assessment: parsed,
                budget: planningAllowance(allowance ?? null),
              }),
              checkStatus,
              checkNotes,
              model: imageModel(),
            },
          });
          await prisma.generationTask.update({ where: { id: task.id }, data: { status: checkStatus === "passed" ? "succeeded" : "needs_review" } });
          await settleSpend(reserved.reservationId, recordedEditCents(edited.usage, settings.imageQuality));
          generated += 1;
          images += 1;
        } catch (error) {
          const timedOut = error instanceof Error && /timeout|timed out/i.test(error.message);
          await prisma.generationTask.update({
            where: { id: task.id },
            data: { status: timedOut ? "uncertain" : "failed", error: error instanceof Error ? error.message : "Image edit failed." },
          });
          if (!timedOut && task.attempt + 1 <= settings.maxRetries) throw error;
          failed += 1;
        }
      }
    }
  }
  await prisma.opportunityRun.update({
    where: { id: runId },
    data: { stageCounts: { ...(typeof run.stageCounts === "object" && run.stageCounts ? run.stageCounts : {}), generated, failed } },
  });
}

export async function finalizeRun(runId: string) {
  const prisma = getPrisma();
  const run = await prisma.opportunityRun.findUnique({
    where: { id: runId },
    include: { listings: { where: { selected: true }, include: { rooms: { where: { includeInConcepts: true }, include: { concepts: true } } } } },
  });
  if (!run) return;
  let missing = 0;
  for (const listing of run.listings) {
    for (const room of listing.rooms) {
      const tiers = new Set(room.concepts.filter((concept) => concept.checkStatus === "passed").map((concept) => concept.tier));
      if (tiers.size < 3) missing += 1;
    }
  }
  const missingNote = missing ? `${missing} selected rooms are missing a passing concept. The report is partial.` : null;
  await prisma.opportunityRun.update({
    where: { id: runId },
    data: {
      status: missing || run.partial ? "partial" : "completed",
      partial: Boolean(missing || run.partial),
      error: [run.error, missingNote].filter(Boolean).join(" ") || null,
    },
  });
}
