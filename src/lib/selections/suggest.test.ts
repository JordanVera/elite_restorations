import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { MOCK_QUOTES } from "../../server/jobber/fixtures";
import { CATEGORY_TEMPLATES, joinKeywords, splitKeywords } from "./categories";
import { detectArea, normalize, suggestedTitle, suggestForLineItem, suggestSelections, type SuggestLineItem } from "./suggest";

const categories = CATEGORY_TEMPLATES.map((template) => ({ id: template.slug, slug: template.slug, name: template.name, keywords: template.keywords }));

function line(name: string, description = "", totalPrice: number | null = 1000, quantity: number | null = 1): SuggestLineItem {
  return { id: name, name, description, quantity, totalPrice };
}

function categoryFor(name: string, description = "") {
  return suggestForLineItem(line(name, description), categories)?.categoryId ?? null;
}

describe("selection suggestions", () => {
  it("maps common allowance line items to the right category", () => {
    assert.equal(categoryFor("LVP Flooring Material Allowance"), "flooring");
    assert.equal(categoryFor("Quartzite Countertop Material Allowance"), "countertops");
    assert.equal(categoryFor("Backsplash tile allowance"), "backsplash");
    assert.equal(categoryFor("Shower Tile Material Allowance"), "shower-tile");
    assert.equal(categoryFor("Tub surround tile allowance"), "shower-tile");
    assert.equal(categoryFor("Bathroom Floor Tile Allowance"), "bathroom-floor-tile");
    assert.equal(categoryFor("Plumbing Fixtures Allowance", "Shower valve and trim, rain head, two faucets, toilet."), "plumbing-fixtures");
    assert.equal(categoryFor("Cabinet hardware allowance", "Pulls and knobs, 38 pieces."), "cabinet-hardware");
    assert.equal(categoryFor("Pendant lights over island"), "lighting-fixtures");
    assert.equal(categoryFor("Interior doors (2) allowance"), "doors");
  });

  it("uses exclusions to break ties between overlapping words", () => {
    assert.equal(categoryFor("Cabinet refinish - paint grade", "Customer selects finish color."), "cabinet-finishes");
    assert.equal(categoryFor("Interior paint - walls, trim, doors"), "paint-colors");
    assert.equal(categoryFor("Quartz Vanity Countertop Allowance"), "countertops");
  });

  it("skips labor and site work", () => {
    assert.equal(categoryFor("Tile installation labor", "Shower walls, niche, and floor."), null);
    assert.equal(categoryFor("Demolition and haul-off", "Remove existing tub, tile, vanity, and flooring."), null);
    assert.equal(categoryFor("Water mitigation and drying"), null);
    assert.equal(categoryFor("Drywall replacement"), null);
  });

  it("falls back to Other for an unmatched allowance, with low confidence", () => {
    const suggestion = suggestForLineItem(line("Specialty glass allowance"), categories);
    assert.equal(suggestion?.categoryId, "other");
    assert.ok((suggestion?.confidence ?? 1) < 0.5);
  });

  it("gives a confidence score, a reason, and an allowance in cents", () => {
    const suggestion = suggestForLineItem(line("Quartzite Countertop Material Allowance", "approx. 68 sq ft", 6460, 68), categories);
    assert.ok(suggestion);
    assert.ok(suggestion.confidence >= 0.8);
    assert.match(suggestion.reason, /quartzite/);
    assert.match(suggestion.reason, /allowance/);
    assert.equal(suggestion.allowanceCents, 646000);
    assert.equal(suggestion.quantity, 68);
    assert.equal(suggestion.unit, "sq ft");
    assert.equal(suggestion.title, "Quartzite countertop");
  });

  it("does not attach an allowance to non-allowance items", () => {
    assert.equal(suggestForLineItem(line("Pendant lights over island", "", 660), categories)?.allowanceCents, null);
  });

  it("lowers confidence when two categories are close", () => {
    const suggestion = suggestForLineItem(line("Hardware and lighting"), categories);
    assert.ok(suggestion);
    assert.ok(suggestion.confidence < 0.6);
    assert.ok(suggestion.alternative);
    assert.match(suggestion.reason, /close to/);
  });

  it("detects the area, preferring a specific bathroom from the quote title", () => {
    assert.equal(detectArea("Shower Tile Allowance", null, "Primary bathroom remodel"), "Primary bathroom");
    assert.equal(detectArea("Pendant lights over island", null, null), "Kitchen");
    assert.equal(detectArea("Paint", null, "Guest bath refresh"), "Guest bathroom");
    assert.equal(detectArea("Paint", null, null), null);
  });

  it("covers every demo quote without suggesting labor lines", () => {
    for (const quote of MOCK_QUOTES) {
      const items = (quote.lineItems?.nodes ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description ?? null,
        quantity: item.quantity ?? null,
        totalPrice: item.totalPrice ?? null,
      }));
      const suggestions = suggestSelections(items, categories, quote.title);
      assert.ok(suggestions.length > 0, `quote ${quote.quoteNumber} has suggestions`);
      for (const suggestion of suggestions) assert.doesNotMatch(suggestion.title, /labor|demolition/i);
    }
  });
});

describe("keyword helpers", () => {
  it("normalizes plurals and punctuation", () => {
    assert.equal(normalize("Faucets, Sinks & Knobs"), " faucet sink knob ");
    assert.equal(normalize("glass"), " glass ");
  });

  it("splits and joins exclusion keywords", () => {
    assert.deepEqual(splitKeywords(["tile", " -labor ", "-", ""]), { include: ["tile"], exclude: ["labor"] });
    assert.deepEqual(joinKeywords(["Tile", "tile", " "], ["-Labor"]), ["tile", "-labor"]);
  });

  it("cleans titles", () => {
    assert.equal(suggestedTitle("LVP Flooring Material Allowance", "Flooring"), "LVP flooring");
    assert.equal(suggestedTitle("Allowance", "Other"), "Other");
  });
});
