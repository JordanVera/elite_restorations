import type { AreaProfile } from '@/lib/local/areas';
import type { Sentence, TradeSpec } from '@/lib/local/engine';
import { miles } from '@/lib/local/engine';
import { site } from '@/lib/site';

export type Brief = {
  slug: string;
  work: string;
  exterior: boolean;
  emergency?: boolean;
  lede: readonly [string, string, string, string];
  opener: readonly [string, string, string];
  pier: readonly [string, string];
  slab: readonly [string, string];
  mixed: readonly [string, string];
  post: readonly [string, string];
  raised: readonly [string, string];
  craft: readonly [string, string, string];
  sequence: readonly [string, string];
  coda: readonly [string, string];
  notes: readonly [
    { title: string; bodies: readonly [string, string] },
    { title: string; bodies: readonly [string, string] },
    { title: string; bodies: readonly [string, string] },
  ];
  faqs: readonly [
    { q: string; answers: readonly [string, string] },
    { q: string; answers: readonly [string, string] },
    { q: string; answers: readonly [string, string] },
    { q: string; answers: readonly [string, string] },
    { q: string; answers: readonly [string, string] },
  ];
};

function fill(area: AreaProfile, template: string) {
  return template
    .replaceAll('{name}', area.name)
    .replaceAll('{housing}', area.housingShort)
    .replaceAll('{landmark}', area.landmark)
    .replaceAll('{miles}', String(miles(area)))
    .replaceAll('{roads}', area.roads)
    .replaceAll('{direction}', area.direction)
    .replaceAll('{phone}', site.phone.display);
}

function asSentences(templates: readonly string[]): Sentence[] {
  return templates.map((template) => (area) => fill(area, template));
}

export function briefToTrade(brief: Brief): TradeSpec {
  return {
    slug: brief.slug,
    work: brief.work,
    exterior: brief.exterior,
    emergency: brief.emergency,
    ledes: asSentences(brief.lede),
    openers: asSentences(brief.opener),
    foundation: {
      pier: asSentences(brief.pier),
      slab: asSentences(brief.slab),
      mixed: asSentences(brief.mixed),
      'post-tension': asSentences(brief.post),
      raised: asSentences(brief.raised),
    },
    craft: asSentences(brief.craft),
    sequence: asSentences(brief.sequence),
    coda: asSentences(brief.coda),
    notes: brief.notes.map((note) => ({
      title: note.title,
      bodies: asSentences(note.bodies),
    })),
    faqs: brief.faqs.map((faq) => ({
      q: (area) => fill(area, faq.q),
      answers: asSentences(faq.answers),
    })),
  };
}
