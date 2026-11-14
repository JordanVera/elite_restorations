import { exteriorFaqs } from "@/lib/faqs/exterior";
import { floorFaqs } from "@/lib/faqs/floors";
import { interiorFaqs } from "@/lib/faqs/interiors";
import { recoveryFaqs } from "@/lib/faqs/recovery";
import { assertFaqMap, type Faq } from "@/lib/faqs/types";

export const extraServiceFaqs: Record<string, readonly Faq[]> = {
  ...interiorFaqs,
  ...floorFaqs,
  ...exteriorFaqs,
  ...recoveryFaqs,
};

const keys = Object.keys(extraServiceFaqs);
if (keys.length !== 25) {
  throw new Error(`Expected 25 service FAQ sets, found ${keys.length}`);
}
assertFaqMap(extraServiceFaqs);

export function duplicateQuestions(items: readonly { q: string }[]) {
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const item of items) {
    const key = item.q.trim().toLowerCase();
    if (seen.has(key)) duplicates.push(item.q);
    seen.add(key);
  }
  return duplicates;
}
