import { costGuides, formatPublishedRange } from '@/lib/cost-guides';
import { exteriorDepth } from '@/lib/service-depth-exterior';
import { floorDepth } from '@/lib/service-depth-floors';
import { interiorDepth } from '@/lib/service-depth-interiors';
import { recoveryDepth } from '@/lib/service-depth-recovery';
import type { ServiceDepth } from '@/lib/service-depth-types';
import { services, type Service } from '@/lib/services';

const bySlug: Record<string, ServiceDepth> = {
  ...interiorDepth,
  ...floorDepth,
  ...exteriorDepth,
  ...recoveryDepth,
};

export function getServiceDepth(slug: string) {
  const depth = bySlug[slug];
  if (!depth) throw new Error(`Missing service depth: ${slug}`);
  return depth;
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
  return countWords(serviceMainText(service, getServiceDepth(service.slug)));
}

const banned =
  /\bGAF\b|\bIICRC\b|\bwarranty\b|\bguarantee\b|\blicensed\b|\bcertified\b|\bawards?\b|\bfive-star\b|\b5-star\b/i;

export function serviceCopyIssues() {
  const issues: string[] = [];
  const slugs = new Set(services.map((service) => service.slug));
  for (const slug of Object.keys(bySlug)) {
    if (!slugs.has(slug)) issues.push(`Depth for unknown service: ${slug}`);
  }
  for (const service of services) {
    const depth = bySlug[service.slug];
    if (!depth) {
      issues.push(`Missing depth: ${service.slug}`);
      continue;
    }
    const faqs = [...service.faqs, ...depth.faqs];
    if (faqs.length < 6 || faqs.length > 10) {
      issues.push(`${service.slug} has ${faqs.length} FAQs`);
    }
    const questions = new Set(faqs.map((item) => item.q));
    if (questions.size !== faqs.length) issues.push(`${service.slug} has duplicate FAQ questions`);
    if (depth.process.length < 6) issues.push(`${service.slug} process is short`);
    const words = countWords(serviceMainText(service, depth));
    if (words < 1500 || words > 2200) {
      issues.push(`${service.slug} is ${words} words`);
    }
    const blob = serviceMainText(service, depth);
    if (banned.test(blob)) issues.push(`${service.slug} has a banned term`);
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
