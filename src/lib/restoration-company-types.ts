import type { ServiceGroup } from '@/lib/service-nav';

export type HubLink = { href: string; label: string };

export type HubSection = {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: readonly string[];
  links?: readonly HubLink[];
};

export type HubStep = {
  index: string;
  title: string;
  body: string;
};

export type RestorationCompanyCopy = {
  locale: 'en' | 'es';
  path: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  title: readonly string[];
  h1: string;
  lede: string;
  crumb: string;
  callLabel: string;
  textLabel: string;
  imageAlt: string;
  sections: readonly HubSection[];
  servicesEyebrow: string;
  servicesHeading: string;
  servicesIntro: string;
  groupIntros: Record<ServiceGroup, string>;
  serviceBlurbs: Record<string, string>;
  serviceLabels?: Record<string, string>;
  processEyebrow: string;
  processHeading: string;
  processIntro: string;
  steps: readonly HubStep[];
  areasEyebrow: string;
  areasHeading: string;
  areasIntro: string;
  citiesLabel: string;
  areasLabel: string;
  faqEyebrow: string;
  faqHeading: string;
  faqs: readonly { q: string; a: string }[];
  relatedHeading: string;
  related: readonly HubLink[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaHref: string;
  catalogName: string;
};
