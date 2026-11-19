import { assertCopyAllowed } from '@/lib/copy-guards';
import { esGroupNames } from '@/lib/i18n';
import type { RestorationCompanyCopy } from '@/lib/restoration-company-types';
import { titleFits } from '@/lib/seo';
import { serviceGroups } from '@/lib/service-nav';
import { services } from '@/lib/services';
import { wordCount } from '@/lib/words';

/** Editorial copy. Place-name link lists are navigation and are not included. */
export function proseParts(copy: RestorationCompanyCopy) {
  return [
    copy.h1,
    copy.lede,
    copy.callLabel,
    copy.textLabel,
    ...copy.sections.flatMap((section) => [
      section.eyebrow,
      section.heading,
      ...section.paragraphs,
      ...(section.links ?? []).map((link) => link.label),
    ]),
    copy.servicesEyebrow,
    copy.servicesHeading,
    copy.servicesIntro,
    ...serviceGroups.flatMap((group) => [
      copy.locale === 'es' ? (esGroupNames[group] ?? group) : group,
      copy.groupIntros[group],
    ]),
    ...services.flatMap((service) => [
      copy.serviceLabels?.[service.slug] ?? service.name,
      copy.serviceBlurbs[service.slug],
    ]),
    copy.processEyebrow,
    copy.processHeading,
    copy.processIntro,
    ...copy.steps.flatMap((step) => [step.index, step.title, step.body]),
    copy.areasEyebrow,
    copy.areasHeading,
    copy.areasIntro,
    copy.citiesLabel,
    copy.areasLabel,
    copy.faqEyebrow,
    copy.faqHeading,
    ...copy.faqs.flatMap((faq) => [faq.q, faq.a]),
    copy.relatedHeading,
    ...copy.related.map((link) => link.label),
    copy.ctaTitle,
    copy.ctaBody,
    copy.ctaButton,
  ];
}

export function assertHubCopy(
  copy: RestorationCompanyCopy,
  rules: {
    min: number;
    max: number;
    officePhrase: string;
    adjusterPhrase: string;
    negotiates: RegExp;
  },
) {
  const missing = services.filter((service) => !copy.serviceBlurbs[service.slug]?.trim());
  if (missing.length > 0) {
    throw new Error(
      `${copy.path} is missing a blurb for ${missing.map((service) => service.slug).join(', ')}`,
    );
  }
  const extra = Object.keys(copy.serviceBlurbs).filter(
    (slug) => !services.some((service) => service.slug === slug),
  );
  if (extra.length > 0) {
    throw new Error(`${copy.path} has blurbs for unknown services: ${extra.join(', ')}`);
  }
  for (const group of serviceGroups) {
    if (!copy.groupIntros[group]?.trim()) {
      throw new Error(`${copy.path} is missing a group intro for ${group}`);
    }
  }
  if (copy.description.length > 155) {
    throw new Error(`${copy.path} description is ${copy.description.length} characters`);
  }
  if (!titleFits(copy.metaTitle)) {
    throw new Error(`${copy.path} title does not fit: ${copy.metaTitle}`);
  }
  const parts = proseParts(copy);
  const words = wordCount(parts);
  if (words < rules.min || words > rules.max) {
    throw new Error(`${copy.path} is ${words} words, outside ${rules.min}-${rules.max}`);
  }
  const blob = parts.join('\n');
  assertCopyAllowed(copy.path, blob);
  if (!blob.includes(rules.officePhrase)) {
    throw new Error(`${copy.path} is missing the office phrase`);
  }
  if (!blob.includes(rules.adjusterPhrase)) {
    throw new Error(`${copy.path} is missing the allowed adjuster sentence`);
  }
  if (!rules.negotiates.test(blob)) {
    throw new Error(`${copy.path} does not say we negotiate the claim`);
  }
  if (!blob.includes('(713) 909-0034')) {
    throw new Error(`${copy.path} is missing the phone number`);
  }
  if (!blob.includes('511 Crestwater Ct')) {
    throw new Error(`${copy.path} is missing the street address`);
  }
  if (!blob.includes('1993')) {
    throw new Error(`${copy.path} is missing 1993`);
  }
  return words;
}
