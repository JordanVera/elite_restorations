export type Faq = { q: string; a: string };

const banned = /\bGAF\b|\bIICRC\b|guarant/i;

export function assertFaqSet(label: string, items: readonly Faq[]) {
  if (items.length < 6 || items.length > 12) {
    throw new Error(`${label} has ${items.length} new FAQs`);
  }
  const seen = new Set<string>();
  for (const item of items) {
    const key = item.q.trim().toLowerCase();
    if (!item.q.trim() || !item.a.trim()) {
      throw new Error(`${label} has an empty FAQ`);
    }
    if (seen.has(key)) throw new Error(`${label} repeats: ${item.q}`);
    seen.add(key);
    if (banned.test(`${item.q} ${item.a}`)) {
      throw new Error(`${label} uses a banned phrase in: ${item.q}`);
    }
  }
}

export function assertFaqMap(map: Record<string, readonly Faq[]>) {
  for (const [label, items] of Object.entries(map)) assertFaqSet(label, items);
}
