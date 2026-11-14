import { areaMiles, type AreaProfile, type Foundation } from '@/lib/local/areas';
import { beatFor } from '@/lib/local/priority-beats';
import { driveParagraph, nearbyParagraph, permitSentence, pick, placeLine } from '@/lib/local/speak';
import { visitParagraph } from '@/lib/local/visit';
import { site } from '@/lib/site';
import { wordCount } from '@/lib/words';

export type Sentence = (area: AreaProfile) => string;

export type TradeSpec = {
  slug: string;
  work: string;
  emergency?: boolean;
  exterior: boolean;
  ledes: readonly Sentence[];
  openers: readonly Sentence[];
  foundation: Record<Foundation, readonly Sentence[]>;
  craft: readonly Sentence[];
  sequence: readonly Sentence[];
  coda: readonly Sentence[];
  notes: readonly { title: string; bodies: readonly Sentence[] }[];
  faqs: readonly { q: Sentence; answers: readonly Sentence[] }[];
};

export type LocalCopy = {
  lede: string;
  paragraphs: readonly string[];
  notes: readonly { title: string; body: string }[];
  faqs: readonly { q: string; a: string }[];
};

const foundations: Foundation[] = ['pier', 'slab', 'mixed', 'post-tension', 'raised'];

export function assemble(area: AreaProfile, spec: TradeSpec): LocalCopy {
  for (const key of foundations) {
    if (!spec.foundation[key] || spec.foundation[key].length < 2) {
      throw new Error(`${spec.slug} is missing foundation copy for ${key}`);
    }
  }
  if (spec.faqs.length < 5) throw new Error(`${spec.slug} needs 5 FAQs`);
  const salt = spec.slug;
  const lineA = placeLine(area, spec.slug, 0);
  const lineB = placeLine(area, spec.slug, 1);
  const lineC = placeLine(area, spec.slug, 2);
  const lineD = placeLine(area, spec.slug, 3);
  const lineE = placeLine(area, spec.slug, 4);
  const lineF = placeLine(area, spec.slug, 5);
  const paragraphs = [
    `${lineA} ${pick(spec.openers, `${salt}:open:${area.slug}`)(area)}`,
    pick(spec.foundation[area.foundation], `${salt}:fnd:${area.slug}`)(area),
    `${lineC} ${lineD}`,
    pick(spec.craft, `${salt}:craft:${area.slug}`)(area),
    pick(spec.sequence, `${salt}:seq:${area.slug}`)(area),
    `${lineE} ${lineF}`,
    `${lineB} ${permitSentence(area, spec.exterior)}`,
    driveParagraph(area, spec.work, Boolean(spec.emergency), salt),
    visitParagraph(spec.slug, area),
    nearbyParagraph(area, spec.work, salt),
  ];
  if (area.priority) {
    const beat = beatFor(spec.slug, area.slug);
    if (!beat) throw new Error(`Missing priority beat for ${spec.slug} in ${area.slug}`);
    paragraphs.push(`${beat} ${pick(spec.coda, `${salt}:coda:${area.slug}`)(area)}`);
  }
  const faqCount = area.priority ? 5 : 4;
  const faqs = spec.faqs.slice(0, faqCount).map((faq, index) => ({
    q: faq.q(area),
    a: pick(faq.answers, `${salt}:faq:${index}:${area.slug}`)(area),
  }));
  const notes = spec.notes.map((note, index) => ({
    title: note.title,
    body: pick(note.bodies, `${salt}:note:${index}:${area.slug}`)(area),
  }));
  const lede = pick(spec.ledes, `${salt}:lede:${area.slug}`)(area);
  const count = () =>
    wordCount([
      lede,
      ...paragraphs,
      ...notes.flatMap((note) => [note.title, note.body]),
      ...faqs.flatMap((faq) => [faq.q, faq.a]),
    ]);
  const minimum = area.priority ? 900 : 750;
  let pad = 0;
  while (count() < minimum && pad < 2) {
    paragraphs.push(padParagraph(spec.work, area, pad));
    pad += 1;
  }
  return {
    lede,
    paragraphs,
    notes,
    faqs,
  };
}

export function miles(area: AreaProfile) {
  return areaMiles(area);
}

function padParagraph(work: string, area: AreaProfile, pad: number) {
  const phone = site.phone.display;
  const options = [
    `A note on ${area.name}: the visit is where we confirm foundation, access, and whether any review applies to this address. ${area.housingShort} is a fair description of the area and a poor description of one house. We write the scope after we see the property, including the detail that does not show up in a listing photo. Call ${phone} when you want ${work} scheduled.`,
    `If you are comparing ${area.name} with a neighboring community, use the links below for ${work} and keep this page for this address. The work does not travel unchanged. Doors, drains, roof planes, and association rules are local to the lot. We would rather measure them than copy them from the next community.`,
    `${area.landmark} is a landmark, not a floor plan. Houses within a short drive of it still differ in age, foundation, and what the last remodel left behind. For ${work} in ${area.name}, those differences decide the scope. Bring the history of leaks or repairs, and any rule you already know applies.`,
  ];
  return options[(pad + area.name.length + work.length) % options.length] ?? options[0];
}
