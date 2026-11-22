/**
 * Suggests selection categories from quote line items. Suggestions are only
 * a starting point: an admin approves each one before it reaches a portal.
 */
import { splitKeywords } from "./categories";

export type SuggestCategory = { id: string; slug: string; name: string; keywords: readonly string[] };
export type SuggestLineItem = {
  id: string;
  name: string;
  description: string | null;
  quantity: number | null;
  totalPrice: number | null;
};

export type Suggestion = {
  lineItemId: string;
  categoryId: string;
  categoryName: string;
  title: string;
  area: string | null;
  quantity: number | null;
  unit: string | null;
  allowanceCents: number | null;
  /** 0 to 1. */
  confidence: number;
  reason: string;
  alternative: string | null;
};

/** Line items that are labor or site work, not something a customer picks. */
const NOT_A_SELECTION = ["labor", "demolition", "demo", "haul off", "mitigation", "drying", "extraction", "permit", "dumpster", "cleanup", "clean up", "disposal"];
const CUSTOMER_CHOICE = ["customer to select", "customer selects", "customer to choose", "owner to select", "owner to confirm", "customer supplied selection"];

/** Lowercase, punctuation to spaces, naive singular. Applied to keywords and text alike. */
export function normalize(text: string): string {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => (word.length > 3 && word.endsWith("s") && !word.endsWith("ss") ? word.slice(0, -1) : word));
  return ` ${words.join(" ")} `;
}

function has(text: string, phrase: string): boolean {
  const needle = normalize(phrase);
  return needle.trim() !== "" && text.includes(needle);
}

/** Longer phrases are more specific, so they count for more. */
function weight(phrase: string): number {
  return 2 + normalize(phrase).trim().split(" ").length;
}

type Scored = { category: SuggestCategory; score: number; matched: string[]; excluded: string[] };

export function scoreCategory(category: SuggestCategory, name: string, description: string): Scored {
  const { include, exclude } = splitKeywords(category.keywords);
  let score = 0;
  const matched: string[] = [];
  const excluded: string[] = [];
  for (const keyword of include) {
    if (has(name, keyword)) {
      score += weight(keyword);
      matched.push(keyword);
    } else if (has(description, keyword)) {
      score += 1;
      matched.push(keyword);
    }
  }
  for (const keyword of exclude) {
    if (has(name, keyword)) {
      score -= weight(keyword) + 1;
      excluded.push(keyword);
    } else if (has(description, keyword)) {
      score -= 1;
      excluded.push(keyword);
    }
  }
  return { category, score, matched, excluded };
}

const AREAS: [string, string][] = [
  ["primary bathroom", "Primary bathroom"],
  ["primary bath", "Primary bathroom"],
  ["master bathroom", "Primary bathroom"],
  ["master bath", "Primary bathroom"],
  ["guest bathroom", "Guest bathroom"],
  ["guest bath", "Guest bathroom"],
  ["hall bathroom", "Hall bathroom"],
  ["hall bath", "Hall bathroom"],
  ["powder", "Powder room"],
  ["kitchen", "Kitchen"],
  ["island", "Kitchen"],
  ["breakfast", "Kitchen"],
  ["laundry", "Laundry room"],
  ["living", "Living room"],
  ["dining", "Dining room"],
  ["bedroom", "Bedroom"],
  ["hallway", "Hallway"],
  ["office", "Office"],
  ["bathroom", "Bathroom"],
  ["bath", "Bathroom"],
  ["shower", "Bathroom"],
];

function areaIn(text: string | null | undefined): string | null {
  if (!text) return null;
  const normalized = normalize(text);
  for (const [phrase, label] of AREAS) if (has(normalized, phrase)) return label;
  return null;
}

/** Area from the line item; a generic "Bathroom" defers to a specific bathroom in the quote title. */
export function detectArea(name: string, description: string | null, quoteTitle?: string | null): string | null {
  const fromItem = areaIn(name) ?? areaIn(description);
  const fromTitle = areaIn(quoteTitle);
  if (!fromItem) return fromTitle;
  if (fromItem === "Bathroom" && fromTitle && fromTitle !== "Bathroom" && /bathroom|powder/i.test(fromTitle)) return fromTitle;
  return fromItem;
}

function detectUnit(text: string): string | null {
  if (/\b(sq\.?\s?ft|square\s+feet|sf)\b/i.test(text)) return "sq ft";
  if (/\b(lin\.?\s?ft|linear\s+feet|lf)\b/i.test(text)) return "linear ft";
  if (/\b(pieces|pcs)\b/i.test(text)) return "pieces";
  return null;
}

/** "Quartzite Countertop Material Allowance" becomes "Quartzite countertop". */
export function suggestedTitle(lineItemName: string, fallback: string): string {
  const cleaned = lineItemName
    .replace(/\b(material|materials)\b/gi, " ")
    .replace(/\ballowance\b/gi, " ")
    .replace(/\s*[-–—:]\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length < 3) return fallback;
  const sentence = cleaned
    .split(" ")
    .map((word) => (/^[A-Z]{2,4}$/.test(word) ? word : word.toLowerCase()))
    .join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

const MIN_SCORE = 3;

export function suggestForLineItem(item: SuggestLineItem, categories: readonly SuggestCategory[], quoteTitle?: string | null): Suggestion | null {
  const name = normalize(item.name);
  const description = normalize(item.description ?? "");
  const both = `${name}${description}`;

  if (NOT_A_SELECTION.some((term) => has(name, term))) return null;

  const isAllowance = has(both, "allowance");
  const customerChoice = CUSTOMER_CHOICE.some((term) => has(description, term));
  const ranked = categories
    .map((category) => scoreCategory(category, name, description))
    .filter((scored) => scored.score > 0)
    .map((scored) => ({ ...scored, score: scored.score + (isAllowance ? 2 : 0) + (customerChoice ? 2 : 0) }))
    .sort((a, b) => b.score - a.score);

  let best = ranked[0];
  const runnerUp = ranked[1];
  if (!best || best.score < MIN_SCORE) {
    const other = categories.find((category) => category.slug === "other");
    if (!(isAllowance || customerChoice) || !other) return null;
    best = { category: other, score: MIN_SCORE, matched: [], excluded: [] };
  }

  const margin = runnerUp ? best.score - runnerUp.score : best.score;
  let confidence = best.score >= 9 ? 0.92 : best.score >= 6 ? 0.8 : best.score >= 4 ? 0.62 : 0.45;
  if (runnerUp && margin < 2) confidence -= 0.15;
  if (!best.matched.length) confidence = 0.35;
  confidence = Math.max(0.2, Math.min(0.97, Math.round(confidence * 100) / 100));

  const reasons: string[] = [];
  if (best.matched.length) reasons.push(`matched ${best.matched.slice(0, 3).map((k) => `"${k}"`).join(", ")}`);
  else reasons.push("no category keywords matched");
  if (isAllowance) reasons.push("allowance line item");
  if (customerChoice) reasons.push("description says the customer chooses");
  if (runnerUp && margin < 2) reasons.push(`close to ${runnerUp.category.name}`);

  const unit = detectUnit(`${item.name} ${item.description ?? ""}`);
  const quantity = item.quantity && item.quantity > 1 && unit ? item.quantity : null;
  const allowanceCents = isAllowance && item.totalPrice && item.totalPrice > 0 ? Math.round(item.totalPrice * 100) : null;
  const sentence = reasons.join("; ");

  return {
    lineItemId: item.id,
    categoryId: best.category.id,
    categoryName: best.category.name,
    title: suggestedTitle(item.name, best.category.name),
    area: detectArea(item.name, item.description, quoteTitle),
    quantity,
    unit: quantity ? unit : null,
    allowanceCents,
    confidence,
    reason: sentence.charAt(0).toUpperCase() + sentence.slice(1),
    alternative: runnerUp && margin < 2 ? runnerUp.category.name : null,
  };
}

export function suggestSelections(items: readonly SuggestLineItem[], categories: readonly SuggestCategory[], quoteTitle?: string | null): Suggestion[] {
  return items
    .map((item) => suggestForLineItem(item, categories, quoteTitle))
    .filter((suggestion): suggestion is Suggestion => suggestion !== null);
}
