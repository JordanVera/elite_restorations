import { assertCopyAllowed } from '@/lib/copy-guards';
import { costGuides, formatPublishedRange } from '@/lib/cost-guides';
import { exteriorDepth } from '@/lib/service-depth-exterior';
import { floorDepth } from '@/lib/service-depth-floors';
import { interiorDepth } from '@/lib/service-depth-interiors';
import { fireHailDepth } from '@/lib/service-depth-fire-hail';
import { recoveryDepth } from '@/lib/service-depth-recovery';
import type { ServiceDepth } from '@/lib/service-depth-types';
import { serviceHomeownerFaqs } from '@/lib/faqs/homeowner';
import { services, type Service } from '@/lib/services';

const bySlug: Record<string, ServiceDepth> = Object.fromEntries(
  Object.entries({
    ...interiorDepth,
    ...floorDepth,
    ...exteriorDepth,
    ...recoveryDepth,
    ...fireHailDepth,
  }).map(([slug, depth]) => {
    const extra = serviceHomeownerFaqs[slug];
    if (!extra?.length) return [slug, depth];
    return [slug, { ...depth, faqs: [...depth.faqs, ...extra] }];
  }),
);

export function getServiceDepth(slug: string) {
  return bySlug[slug];
}

export function countWords(text: string) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean) return 0;
  return clean.split(' ').length;
}

function details(items: { title: string; body: string }[]) {
  return items.flatMap((item) => [item.title, item.body]);
}

/** Main explanatory copy on a service hub, excluding reviews, city lists, and shared chrome. */
export function serviceMainText(service: Service, depth: ServiceDepth) {
  const parts = [
    service.tagline,
    ...service.intro,
    ...depth.moreIntro,
    ...service.includes,
    service.materials?.label,
    ...(service.materials?.items ?? []),
    service.local.heading,
    ...service.local.body,
    ...depth.moreLocal,
    ...details(service.local.conditions),
    service.local.neighborhoods.join(' '),
    depth.factorsHeading,
    depth.factorsIntro,
    ...details(depth.factors),
    ...details(depth.process),
    depth.signsHeading,
    ...details(depth.signs),
    depth.materialsHeading,
    depth.materialsIntro,
    ...details(depth.materials),
    depth.costHeading,
    ...depth.costIntro,
    ...depth.ranges.flatMap((range) => [range.label, range.range]),
    depth.rangeNote,
    ...details(depth.costFactors),
    depth.insurance?.heading,
    ...(depth.insurance?.paragraphs ?? []),
    ...service.faqs.flatMap((item) => [item.q, item.a]),
    ...depth.faqs.flatMap((item) => [item.q, item.a]),
  ];
  return parts.filter((part): part is string => Boolean(part && part.trim())).join('\n');
}

export function serviceWordCount(service: Service) {
  const depth = getServiceDepth(service.slug);
  if (!depth) return 0;
  return countWords(serviceMainText(service, depth));
}

export function serviceCopyIssues() {
  const issues: string[] = [];
  const slugs = new Set(services.map((service) => service.slug));
  for (const slug of Object.keys(bySlug)) {
    if (!slugs.has(slug)) issues.push(`Depth for unknown service: ${slug}`);
  }
  for (const service of services) {
    const depth = bySlug[service.slug];
    if (!depth) continue;
    if (depth.process.length < 6) issues.push(`${service.slug} process is short`);
    assertCopyAllowed(service.slug, serviceMainText(service, depth));
  }
  const paired: [string, string][] = [
    ['kitchen-remodeling', 'kitchen-remodel-cost-houston'],
    ['bathroom-remodeling', 'bathroom-remodel-cost-houston'],
    ['roof-replacement', 'roof-replacement-cost-houston'],
  ];
  for (const [serviceSlug, guideSlug] of paired) {
    const depth = bySlug[serviceSlug];
    const guide = costGuides.find((item) => item.slug === guideSlug);
    if (!depth || !guide) {
      issues.push(`Missing range pair ${serviceSlug}`);
      continue;
    }
    if (depth.ranges.length !== guide.ranges.length) {
      issues.push(`${serviceSlug} range rows do not match its cost guide`);
    }
    guide.ranges.forEach((range, index) => {
      const published = formatPublishedRange(range);
      const row = depth.ranges[index];
      if (!row || row.label !== range.label || row.range !== published) {
        issues.push(`${serviceSlug} range ${range.label} drifted from the cost guide`);
      }
    });
  }
  return issues;
}

const copyIssues = serviceCopyIssues();
if (copyIssues.length > 0) {
  throw new Error(copyIssues.join('\n'));
}
