import { describe, expect, it } from "vitest";

import { conflictsBetween, dedupeKey } from "@/server/opportunities/dedupe";
import { missingPhotoReason, screenCandidate } from "@/server/opportunities/eligibility";
import { applyExclusion } from "@/server/opportunities/exclusion";
import { exportAllowed } from "@/server/opportunities/export-auth";
import { parseImportJson } from "@/server/opportunities/import-listings";
import { decidePrice, rangesOverlap } from "@/server/opportunities/pricing";
import { normalizeRepliersListing } from "@/server/opportunities/providers";
import { defaultSettings, runSettingsSchema, soldWindow } from "@/server/opportunities/settings";
import { recoverTask, reserveAgainstCap } from "@/server/opportunities/spending";
import { roomAssessmentSchema } from "@/server/opportunities/vision";
import { assertPublicHttps } from "@/server/opportunities/ssrf";

const window = { chicagoStart: "2026-09-01", chicagoEnd: "2026-10-01" };
const settings = defaultSettings();

describe("sold dates and prices", () => {
  it("keeps a verified closing date inside the Chicago window", () => {
    const result = screenCandidate(
      {
        transactionStatus: "closed",
        closedDate: "2026-09-15",
        propertyType: "Single Family Residence",
        yearBuilt: null,
        sqft: null,
        bedrooms: null,
        bathrooms: null,
        city: "Houston",
        postalCode: "77019",
      },
      settings,
      window,
    );
    expect(result.eligible).toBe(true);
  });

  it("rejects pending, rentals, and unverified closing dates", () => {
    expect(screenCandidate({ ...closedHome(), transactionStatus: "pending" }, settings, window).eligible).toBe(false);
    expect(screenCandidate({ ...closedHome(), transactionStatus: "rental" }, settings, window).eligible).toBe(false);
    expect(screenCandidate({ ...closedHome(), closedDate: null }, settings, window).eligible).toBe(false);
    expect(screenCandidate({ ...closedHome(), closedDate: "2026-08-01" }, settings, window).eligible).toBe(false);
  });

  it("does not treat asking price or a range as an exact sale price", () => {
    const exact = decidePrice({ exactSalePrice: null, askingPrice: 400000, priceRangeLow: 390000, priceRangeHigh: 410000, estimatedValue: 405000 }, settings);
    expect(exact.include).toBe(false);
    const asking = decidePrice(
      { exactSalePrice: 100, askingPrice: 450000, priceRangeLow: null, priceRangeHigh: null, estimatedValue: null },
      { ...settings, priceBasis: "asking", minPrice: 400000, maxPrice: 500000 },
    );
    expect(asking.include).toBe(true);
    if (asking.include) expect(asking.note).toContain("not the sale price");
  });

  it("matches a reported range only when it overlaps the filter", () => {
    expect(rangesOverlap(300000, 350000, 340000, 400000)).toBe(true);
    expect(rangesOverlap(300000, 330000, 340000, 400000)).toBe(false);
    const decision = decidePrice(
      { exactSalePrice: null, askingPrice: null, priceRangeLow: 300000, priceRangeHigh: 330000, estimatedValue: null },
      { ...settings, priceBasis: "range", minPrice: 340000, maxPrice: 400000 },
    );
    expect(decision.include).toBe(false);
  });

  it("snapshots Chicago date bounds", () => {
    const bounds = soldWindow({ ...settings, soldPreset: "30" }, new Date("2026-10-13T18:00:00Z"));
    expect(bounds.chicagoEnd).toBe("2026-10-13");
    expect(bounds.chicagoStart).toBe("2026-09-13");
    expect(runSettingsSchema.parse({}).priceBasis).toBe("exact");
  });
});

describe("dedupe and exclusion", () => {
  it("treats the same MLS number or normalized address as one home", () => {
    expect(dedupeKey({ mlsId: "ABC 1", addressLine: "1 Main Street", unit: null, city: "Houston", postalCode: "77002" })).toBe(
      dedupeKey({ mlsId: "abc1", addressLine: "9 Other Ave", unit: "2", city: "Katy", postalCode: "77494" }),
    );
    expect(
      dedupeKey({ mlsId: null, addressLine: "10 Oak Street", unit: "A", city: "Houston", postalCode: "77019" }),
    ).toBe(dedupeKey({ mlsId: null, addressLine: "10 Oak St", unit: "a", city: "houston", postalCode: "77019" }));
  });

  it("flags conflicting sale details", () => {
    const conflicts = conflictsBetween(
      { mlsId: "1", addressLine: "10 Oak St", unit: null, city: "Houston", postalCode: "77019", exactSalePrice: 400000, closedDate: "2026-10-01" },
      { mlsId: "1", addressLine: "10 Oak St", unit: null, city: "Houston", postalCode: "77019", exactSalePrice: 410000, closedDate: "2026-10-02" },
    );
    expect(conflicts.map((item) => item.field)).toEqual(["exactSalePrice", "closedDate"]);
  });

  it("excludes an updated kitchen in strict mode and keeps only the outdated room otherwise", () => {
    const rooms = [
      { id: "k", roomType: "kitchen" as const, decision: "updated_appearance" as const, outdatedScore: 0.2, updatedScore: 0.9, confidence: 0.8 },
      { id: "b", roomType: "bathroom" as const, decision: "outdated" as const, outdatedScore: 0.8, updatedScore: 0.1, confidence: 0.8 },
    ];
    expect(applyExclusion(rooms, { ...settings, exclusionMode: "strict_property" }).action).toBe("exclude");
    const roomMode = applyExclusion(rooms, { ...settings, exclusionMode: "room_opportunity" });
    expect(roomMode.action).toBe("qualify");
    if (roomMode.action === "qualify") expect(roomMode.roomIds).toEqual(["b"]);
  });

  it("sends ambiguous rooms to review", () => {
    const result = applyExclusion(
      [{ id: "k", roomType: "kitchen", decision: "mixed", outdatedScore: 0.5, updatedScore: 0.5, confidence: 0.4 }],
      settings,
    );
    expect(result.action).toBe("review");
  });
});

describe("photos, schema, recovery, spend, and export", () => {
  it("explains a listing with no photos", () => {
    expect(missingPhotoReason(0)).toMatch(/No authorized photos/);
    expect(missingPhotoReason(2)).toBeNull();
  });

  it("validates an assessment and an import", () => {
    expect(roomAssessmentSchema.parse({
      roomType: "kitchen",
      observations: { cabinets: "a", counters: "b", surfaces: "c", fixtures: "d", wear: "e", recentUpdates: "f", photoQuality: "g" },
      outdatedScore: 0.7,
      updatedScore: 0.2,
      confidence: 0.6,
      explanation: "Visible wear only.",
      decision: "outdated",
    }).decision).toBe("outdated");
    expect(parseImportJson({ listings: [{ addressLine: "1 Main", city: "Houston", state: "TX", postalCode: "77002", closedDate: "2026-10-01", photos: [] }] }).listings).toHaveLength(1);
  });

  it("does not retry an uncertain paid request", () => {
    expect(recoverTask({ status: "uncertain", attempt: 0 }, 1)).toBe("hold_uncertain");
    expect(recoverTask({ status: "failed", attempt: 0 }, 1)).toBe("retry");
    expect(recoverTask({ status: "failed", attempt: 2 }, 1)).toBe("stop");
  });

  it("keeps concurrent reservations inside the cap", async () => {
    let reserved = 0;
    const cap = 10;
    async function hold(amount: number) {
      const decision = reserveAgainstCap({ capCents: cap, reservedCents: reserved, recordedCents: 0 }, amount);
      if (!decision.ok) return decision;
      reserved = decision.reservedCents;
      return decision;
    }
    const first = await hold(6);
    const second = await hold(6);
    expect(first.ok).toBe(true);
    expect(second.ok).toBe(false);
    expect(reserved).toBe(6);
  });

  it("refuses an unauthenticated or unpermitted export", () => {
    expect(exportAllowed("live", false).allowed).toBe(false);
    expect(exportAllowed("import", false).allowed).toBe(true);
    expect(exportAllowed("demo", false).allowed).toBe(true);
  });

  it("blocks private image hosts and maps a sold Repliers record without inventing a price range", async () => {
    await expect(assertPublicHttps("https://127.0.0.1/photo.jpg")).rejects.toThrow(/private/i);
    await expect(assertPublicHttps("http://cdn.repliers.io/a.jpg")).rejects.toThrow(/HTTPS/);
    const listing = normalizeRepliersListing(
      {
        mlsNumber: "HAR1",
        status: "U",
        lastStatus: "Sld",
        type: "Sale",
        listPrice: 500000,
        soldPrice: 480000,
        timestamps: { closedDate: "2026-10-01T00:00:00.000Z" },
        address: { streetNumber: "10", streetName: "Oak", streetSuffix: "St", city: "HOUSTON", state: "TX", zip: "77019" },
        details: { style: "Single Family Residence", numBedrooms: 3, numBathrooms: 2 },
        images: ["img/a.jpg"],
      },
      "2026-10-13T00:00:00.000Z",
    );
    if ("error" in listing) throw new Error(listing.error);
    expect(listing.transactionStatus).toBe("closed");
    expect(listing.exactSalePrice).toBe(480000);
    expect(listing.askingPrice).toBe(500000);
    expect(listing.priceRangeLow).toBeNull();
    expect(listing.photoRefs[0]?.sourceUrl).toBe("https://cdn.repliers.io/img/a.jpg");
  });
});

function closedHome() {
  return {
    transactionStatus: "closed" as const,
    closedDate: "2026-09-15",
    propertyType: "Single Family Residence",
    yearBuilt: null,
    sqft: null,
    bedrooms: null,
    bathrooms: null,
    city: "Houston",
    postalCode: "77019",
  };
}
