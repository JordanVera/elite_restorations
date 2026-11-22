import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { detectLogoKind } from "./resource-logo";
import {
  categorySlugForRequirement,
  PORTAL_RESOURCES,
  resolveResourceSlugs,
  resourcesForCategory,
  resourcesFromSlugs,
  sanitizeResourceSlugs,
  slugifyResourceName,
  suggestedResourceSlugs,
} from "./resources";

const catalog = PORTAL_RESOURCES;

describe("portal supplier resources", () => {
  it("keeps the seven suppliers staff asked for, in that order", () => {
    assert.deepEqual(
      catalog.map((r) => r.slug),
      ["sherwin-williams", "floor-and-decor", "builders-firstsource", "home-depot", "lowes", "expo-stones", "earth-stone-colours"],
    );
  });

  it("points each default supplier at a copied logo file", () => {
    for (const resource of catalog) {
      assert.match(resource.logoPath ?? "", /^\/images\/suppliers\/[a-z0-9-]+\.(svg|png)$/);
    }
  });

  it("suggests paint and flooring suppliers from those categories only", () => {
    assert.deepEqual(suggestedResourceSlugs(catalog, ["paint-colors"]), ["sherwin-williams"]);
    assert.deepEqual(suggestedResourceSlugs(catalog, ["flooring"]), ["floor-and-decor"]);
    assert.deepEqual(suggestedResourceSlugs(catalog, ["countertops"]), ["expo-stones", "earth-stone-colours"]);
  });

  it("suggests both big-box stores for fixtures, and Builders FirstSource for doors", () => {
    assert.deepEqual(suggestedResourceSlugs(catalog, ["plumbing-fixtures"]), ["home-depot", "lowes"]);
    assert.deepEqual(suggestedResourceSlugs(catalog, ["doors"]), ["builders-firstsource", "home-depot", "lowes"]);
  });

  it("unions suggestions across a portal's materials", () => {
    assert.deepEqual(suggestedResourceSlugs(catalog, ["paint-colors", "flooring", "countertops"]), [
      "sherwin-williams",
      "floor-and-decor",
      "expo-stones",
      "earth-stone-colours",
    ]);
  });

  it("skips inactive suppliers when suggesting, but still resolves customized slugs", () => {
    const withHidden = catalog.map((resource) =>
      resource.slug === "sherwin-williams" ? { ...resource, active: false } : resource,
    );
    assert.deepEqual(suggestedResourceSlugs(withHidden, ["paint-colors"]), []);
    assert.deepEqual(
      resolveResourceSlugs(withHidden, { customized: true, saved: ["sherwin-williams"], categorySlugs: ["paint-colors"] }),
      ["sherwin-williams"],
    );
  });

  it("drops unknown slugs and restores catalog order", () => {
    assert.deepEqual(sanitizeResourceSlugs(catalog, ["lowes", "nope", "sherwin-williams", "lowes"]), ["sherwin-williams", "lowes"]);
  });

  it("uses saved slugs once customized, otherwise follows the materials", () => {
    assert.deepEqual(
      resolveResourceSlugs(catalog, { customized: false, saved: ["home-depot"], categorySlugs: ["paint-colors"] }),
      ["sherwin-williams"],
    );
    assert.deepEqual(
      resolveResourceSlugs(catalog, { customized: true, saved: ["home-depot"], categorySlugs: ["paint-colors"] }),
      ["home-depot"],
    );
  });

  it("limits per-selection links to suppliers that match that material", () => {
    const names = resourcesForCategory(catalog, "countertops", ["expo-stones", "home-depot"]).map((r) => r.slug);
    assert.deepEqual(names, ["expo-stones"]);
  });

  it("resolves a deleted category from its frozen name", () => {
    assert.equal(categorySlugForRequirement(null, "Paint colors"), "paint-colors");
    assert.equal(categorySlugForRequirement("flooring", "Anything"), "flooring");
  });

  it("loads display records for saved slugs", () => {
    const [paint] = resourcesFromSlugs(catalog, ["sherwin-williams"]);
    assert.equal(paint?.name, "Sherwin-Williams");
    assert.equal(paint?.url, "https://www.sherwin-williams.com/");
    assert.equal(paint?.logoPath, "/images/suppliers/sherwin-williams.svg");
  });

  it("slugifies new supplier names", () => {
    assert.equal(slugifyResourceName("Floor & Decor"), "floor-decor");
    assert.equal(slugifyResourceName("  "), "resource");
  });
});

describe("resource logos", () => {
  it("accepts PNG, JPEG, WebP, and SVG from magic bytes", () => {
    assert.equal(detectLogoKind(Uint8Array.of(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a))?.ext, "png");
    assert.equal(detectLogoKind(Uint8Array.of(0xff, 0xd8, 0xff, 0xe0))?.ext, "jpg");
    const webp = new Uint8Array(12);
    webp.set([0x52, 0x49, 0x46, 0x46], 0);
    webp.set([0x57, 0x45, 0x42, 0x50], 8);
    assert.equal(detectLogoKind(webp)?.ext, "webp");
    assert.equal(detectLogoKind(new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg"></svg>'))?.ext, "svg");
  });

  it("rejects HTML pretending to be an image", () => {
    assert.equal(detectLogoKind(new TextEncoder().encode("<!doctype html><svg>")), null);
  });
});
