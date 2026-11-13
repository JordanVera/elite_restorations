import { getArticle } from '@/lib/articles';
import { getAreaPage } from '@/lib/area-pages';
import { costGuideExtras } from '@/lib/cost-guide-copy';
import { parseLocalLandingSlug } from '@/lib/local-paths';
import { titleFits } from '@/lib/seo';
import { getService, servicePath } from '@/lib/services';
import { site } from '@/lib/site';

export type CostRange = {
  label: string;
  /**
   * Dollar amount for this row. Leave null and the site will not print a range.
   */
  low: number | null;
  high: number | null;
};

export type CostGuide = {
  slug: string;
  path: string;
  title: string;
  description: string;
  lines: readonly string[];
  lede: string;
  serviceSlug: string;
  serviceLabel: string;
  factors: readonly { title: string; body: string }[];
  /** Hidden until every row has a low and a high. */
  ranges: readonly CostRange[];
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
  faqs: readonly { q: string; a: string }[];
  related: readonly { href: string; label: string }[];
};

export function rangesArePublishable(ranges: readonly CostRange[]) {
  return (
    ranges.length > 0 &&
    ranges.every(
      (range) =>
        typeof range.low === 'number' &&
        typeof range.high === 'number' &&
        Number.isFinite(range.low) &&
        Number.isFinite(range.high) &&
        range.low > 0 &&
        range.high >= range.low,
    )
  );
}

export function formatPublishedRange(range: CostRange) {
  if (!rangesArePublishable([range]) || range.low === null || range.high === null) {
    return null;
  }
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  return `${money.format(range.low)} to ${money.format(range.high)}`;
}

const phone = site.phone.display;

export const costGuides: readonly CostGuide[] = [
  {
    slug: 'kitchen-remodel-cost-houston',
    path: '/kitchen-remodel-cost-houston',
    title: 'Kitchen Remodel Cost in Houston',
    description:
      'Typical Houston kitchen remodel planning ranges for finishes, a layout change, or a full gut. The final price comes from an on-site estimate.',
    lines: ['Kitchen remodel cost', 'in Houston.'],
    lede: 'A Houston kitchen price is the room you have, the materials you choose, and whether the layout has to move. We price that after a visit, not from a citywide average.',
    serviceSlug: 'kitchen-remodeling',
    serviceLabel: 'Kitchen remodeling',
    factors: [
      {
        title: 'Size',
        body: 'A galley and a room that opens to the rest of the house are different amounts of cabinet, counter, and floor. The square footage is the start. The number of runs, the island, and the appliances change it from there.',
      },
      {
        title: 'Materials',
        body: 'Painted cabinets and a quartz counter are a different scope from a custom box and a stone that needs more care. Hardware, the backsplash, and the lighting travel with that choice.',
      },
      {
        title: 'Layout changes',
        body: 'Keeping the sink and the range where they are is a smaller job than moving a wall, a drain, or the path through the room. Older Houston houses are often out of square, so the layout is measured before anyone promises a wall can move.',
      },
      {
        title: 'Permits',
        body: 'A finish refresh often stays inside the existing kitchen. Moving plumbing, electrical, or structure is when a permit usually enters the job. We say which one it is after we see the plan, not before.',
      },
    ],
    ranges: [
      { label: 'Same layout, new finishes', low: 25000, high: 55000 },
      { label: 'Layout change', low: 40000, high: 80000 },
      { label: 'Full gut', low: 70000, high: 135000 },
    ],
    sections: costGuideExtras['kitchen-remodel-cost-houston'].sections,
    faqs: [
      {
        q: 'Why is there no single kitchen price for Houston?',
        a: 'The room, the cabinets and counters, and whether the layout moves are different jobs. The ranges on this page are typical planning ranges, not a quote. The final price comes from an on-site estimate.',
      },
      {
        q: 'Does moving a wall change the cost?',
        a: 'It can. Structure, plumbing, and electrical are extra work, and they are also when a permit is more likely. We inspect before we say a wall can move.',
      },
      {
        q: 'When do you need a permit for a kitchen?',
        a: 'Often when plumbing, electrical, or structure changes. A finish update that leaves those in place may not. We tell you which case the plan is after we see it.',
      },
      {
        q: 'How do I get a number for my kitchen?',
        a: `Call ${phone} or request an estimate. The visit is how the scope, and then the price, gets decided.`,
      },
      ...costGuideExtras['kitchen-remodel-cost-houston'].faqs,
    ],
    related: [
      { href: '/kitchen-remodeling', label: 'Houston kitchen remodeling' },
      { href: '/kitchen-remodeling-houston-tx', label: 'Kitchen remodeling in Houston' },
      { href: '/kitchen-remodeling-the-heights-tx', label: 'Kitchen remodeling in The Heights' },
      { href: '/kitchen-remodeling-katy-tx', label: 'Kitchen remodeling in Katy' },
      { href: '/kitchen-remodeling-the-woodlands-tx', label: 'Kitchen remodeling in The Woodlands' },
      {
        href: '/kitchen-remodel-case-study',
        label: "A kitchen remodel, in a customer's words",
      },
    ],
  },
  {
    slug: 'bathroom-remodel-cost-houston',
    path: '/bathroom-remodel-cost-houston',
    title: 'Bathroom Remodel Cost in Houston',
    description:
      'Typical Houston bathroom remodel planning ranges, from a finish refresh to plumbing moves. The final price comes from an on-site estimate.',
    lines: ['Bathroom remodel cost', 'in Houston.'],
    lede: 'A powder-room refresh and a primary bath that moves the shower are not the same price. The difference is the room, the finishes, and whether the plumbing stays put.',
    serviceSlug: 'bathroom-remodeling',
    serviceLabel: 'Bathroom remodeling',
    factors: [
      {
        title: 'Size',
        body: 'A small powder room and a primary bath are different amounts of tile, glass, and fixture. The square footage matters less than what the room has to do.',
      },
      {
        title: 'Materials',
        body: 'A new vanity, mirror, and light is a different scope from a full tile shower, a tub, and a stone that has to be waterproofed behind the finish you see.',
      },
      {
        title: 'Layout changes',
        body: 'Leaving the drain where it is costs less than moving the shower, the tub, or the vanity. In older houses the plumbing and the structure decide what can move. We check that before we promise a new layout.',
      },
      {
        title: 'Permits',
        body: 'Replacing a faucet in the same place is not the same as relocating a drain. Plumbing changes are when a permit usually shows up. We say so once the plan is real.',
      },
    ],
    ranges: [
      { label: 'Vanity and finish refresh', low: 6000, high: 15000 },
      { label: 'Shower rebuild, same layout', low: 12000, high: 25000 },
      { label: 'Full remodel with plumbing moves', low: 30000, high: 65000 },
    ],
    sections: costGuideExtras['bathroom-remodel-cost-houston'].sections,
    faqs: [
      {
        q: 'Why can two bathroom remodels cost so differently?',
        a: 'A new vanity in the same footprint is not a new shower in a new place. Tile, glass, waterproofing, and moved plumbing are the usual reasons the scope grows.',
      },
      {
        q: 'Is waterproofing part of the price?',
        a: 'Yes, when the shower or the wet wall is in the job. It goes in before the finish tile. It is part of that scope, not a line you can skip and keep the same result.',
      },
      {
        q: 'Do bathroom remodels need a permit in Houston?',
        a: 'Often when the plumbing moves. A refresh that keeps the drains and the electrical in place may not. We tell you which one applies after we see the bathroom.',
      },
      {
        q: 'How do I get a price?',
        a: `Call ${phone} or request an estimate. We look at the bathroom you have and price that scope.`,
      },
      ...costGuideExtras['bathroom-remodel-cost-houston'].faqs,
    ],
    related: [
      { href: '/bathroom-remodeling', label: 'Houston bathroom remodeling' },
      { href: '/bathroom-remodeling-houston-tx', label: 'Bathroom remodeling in Houston' },
      { href: '/bathroom-remodeling-memorial-tx', label: 'Bathroom remodeling in Memorial' },
      { href: '/bathroom-remodeling-bellaire-tx', label: 'Bathroom remodeling in Bellaire' },
      {
        href: '/bathroom-remodeling-west-university-tx',
        label: 'Bathroom remodeling in West University',
      },
    ],
  },
  {
    slug: 'roof-replacement-cost-houston',
    path: '/roof-replacement-cost-houston',
    title: 'Roof Replacement Cost in Houston',
    description:
      'Typical Houston roof replacement planning ranges for asphalt, metal, tile, or composite. The final price comes from an on-site estimate.',
    lines: ['Roof replacement cost', 'in Houston.'],
    lede: 'A roof price is the house under it: the size, the pitch, what the deck looks like after the old roof comes off, and the material you choose. An insurance claim does not set that price.',
    serviceSlug: 'roof-replacement',
    serviceLabel: 'Roof replacement',
    factors: [
      {
        title: 'Size and shape',
        body: 'Squares of roof are the start. Stories, pitch, valleys, and the number of penetrations change how long the crew is up there and how the flashing has to be detailed.',
      },
      {
        title: 'Materials',
        body: 'Architectural asphalt is common. Metal, tile, and composite are different weights and different installs. The structure has to be able to carry the one you want. We compare that on the house, not from a single product.',
      },
      {
        title: 'What is under the shingles',
        body: 'A replacement includes the tear-off and a look at the deck. Soft decking, bad flashing, or missing vents change the scope. We say so before the job grows past the roof we priced. Replacing a bad sheet of decking is typically about $75-$150 per 4x8 sheet.',
      },
      {
        title: 'Permits',
        body: 'A full replacement in Houston is typically permitted. The permit is part of planning the job. It is not a surprise we add after the roof is on.',
      },
      {
        title: 'Insurance coverage',
        body: 'Your insurer decides what the policy pays. A claim is not a bid, and it is not a promise that the roof is covered. We photograph the roof and install the one you hire us to build. We do not negotiate the claim, and we are not a public adjuster.',
      },
    ],
    ranges: [
      { label: 'Architectural asphalt replacement', low: 12000, high: 24000 },
      { label: 'Metal, tile, or composite', low: 20000, high: 45000 },
      { label: 'Deck repairs found after tear-off', low: 500, high: 2000 },
    ],
    sections: costGuideExtras['roof-replacement-cost-houston'].sections,
    faqs: [
      {
        q: 'Why is there no single roof price per square?',
        a: 'Pitch, stories, valleys, the deck under the shingles, and the material all change the job. A per-square number written before the inspection would leave those out.',
      },
      {
        q: 'Does insurance set the cost of the roof?',
        a: 'No. Your insurer decides what the policy pays. The cost of the roof is the scope of the roof. We can document the conditions. We do not decide coverage and we do not negotiate the claim.',
      },
      {
        q: 'What if the deck is damaged?',
        a: 'We find that after the old roofing comes off. Soft decking is extra work. We tell you before we expand the job past the roof that was priced.',
      },
      {
        q: 'How do I get a roof estimate?',
        a: `Call ${phone}. We inspect the roof you have and say whether a repair will hold or it needs to come off, then price that scope.`,
      },
      ...costGuideExtras['roof-replacement-cost-houston'].faqs,
    ],
    related: [
      { href: '/roof-replacement', label: 'Houston roof replacement' },
      { href: '/roof-replacement-houston-tx', label: 'Roof replacement in Houston' },
      { href: '/roof-replacement-katy-tx', label: 'Roof replacement in Katy' },
      { href: '/roof-replacement-memorial-tx', label: 'Roof replacement in Memorial' },
      {
        href: '/roof-replacement-the-woodlands-tx',
        label: 'Roof replacement in The Woodlands',
      },
    ],
  },
];

const bySlug = new Map(costGuides.map((guide) => [guide.slug, guide]));

export function getCostGuide(slug: string) {
  return bySlug.get(slug);
}

export function estimateHref(serviceSlug: string) {
  return `/contact?service=${encodeURIComponent(serviceSlug)}`;
}

function costGuideWordCount(guide: CostGuide) {
  const parts = [
    guide.lede,
    ...guide.factors.flatMap((item) => [item.title, item.body]),
    ...guide.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    ...guide.ranges.flatMap((range) => [range.label, formatPublishedRange(range) ?? '']),
    'These are typical planning ranges, not quotes. The final price comes from an on-site estimate.',
    ...guide.faqs.flatMap((item) => [item.q, item.a]),
  ];
  const clean = parts.filter(Boolean).join('\n').replace(/\s+/g, ' ').trim();
  return clean ? clean.split(' ').length : 0;
}

for (const guide of costGuides) {
  const guideWords = costGuideWordCount(guide);
  if (guideWords < 1500 || guideWords > 2200) {
    throw new Error(`Cost guide ${guide.slug} is ${guideWords} words`);
  }
  if (guide.faqs.length < 6 || guide.faqs.length > 10) {
    throw new Error(`Cost guide ${guide.slug} has ${guide.faqs.length} FAQs`);
  }
  if (!titleFits(guide.title)) {
    throw new Error(`Cost guide title does not fit: ${guide.title}`);
  }
  if (guide.description.length > 155) {
    throw new Error(`Cost guide description too long: ${guide.slug}`);
  }
  if (
    getService(guide.slug) ||
    getArticle(guide.slug) ||
    getAreaPage(guide.slug) ||
    parseLocalLandingSlug(guide.slug)
  ) {
    throw new Error(`Cost guide slug collides: ${guide.slug}`);
  }
  if (!getService(guide.serviceSlug)) {
    throw new Error(`Cost guide service missing: ${guide.serviceSlug}`);
  }
  const hub = servicePath(guide.serviceSlug);
  if (!guide.related.some((link) => link.href === hub)) {
    throw new Error(`Cost guide ${guide.slug} does not link its service hub`);
  }
  const cityLinks = guide.related.filter((link) => parseLocalLandingSlug(link.href.slice(1)));
  if (cityLinks.length < 3 || cityLinks.length > 4) {
    throw new Error(`Cost guide ${guide.slug} should link 3 or 4 city pages`);
  }
  if (
    guide.serviceSlug === 'kitchen-remodeling' &&
    !guide.related.some((link) => link.href === '/kitchen-remodel-case-study')
  ) {
    throw new Error(`Cost guide ${guide.slug} should link the kitchen case study`);
  }
  const seen = new Set<string>();
  for (const link of guide.related) {
    if (!link.label.trim()) throw new Error(`Cost guide ${guide.slug} has an empty anchor`);
    if (seen.has(link.href)) throw new Error(`Cost guide ${guide.slug} repeats ${link.href}`);
    seen.add(link.href);
    const slug = link.href.replace(/^\//, '');
    const known =
      Boolean(getService(slug)) ||
      Boolean(getArticle(slug)) ||
      Boolean(parseLocalLandingSlug(slug)) ||
      slug === 'kitchen-remodel-case-study';
    if (!known) throw new Error(`Cost guide ${guide.slug} links an unknown path: ${link.href}`);
  }
}
