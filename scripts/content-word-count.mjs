import { costGuides, formatPublishedRange } from "../src/lib/cost-guides.ts";
import { serviceCopyIssues, serviceWordCount } from "../src/lib/service-depth.ts";
import { services } from "../src/lib/services.ts";

function words(text) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return 0;
  return clean.split(" ").length;
}

function guideText(guide) {
  const parts = [
    guide.lede,
    ...guide.factors.flatMap((item) => [item.title, item.body]),
    ...(guide.sections ?? []).flatMap((section) => [
      section.heading,
      ...section.paragraphs,
    ]),
    ...guide.ranges.flatMap((range) => [range.label, formatPublishedRange(range)]),
    "These are typical planning ranges, not quotes. The final price comes from an on-site estimate.",
    ...guide.faqs.flatMap((item) => [item.q, item.a]),
  ];
  return parts.filter(Boolean).join("\n");
}

const serviceRows = services.map((service) => ({
  slug: service.slug,
  words: serviceWordCount(service),
}));
const guideRows = costGuides.map((guide) => ({
  slug: guide.slug,
  words: words(guideText(guide)),
}));

console.log(JSON.stringify({ services: serviceRows, guides: guideRows, issues: serviceCopyIssues() }, null, 2));
