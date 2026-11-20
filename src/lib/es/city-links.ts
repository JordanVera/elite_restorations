import { esServiceNames, spanishServiceSlugs } from '@/lib/i18n';
import { localLandingSlug } from '@/lib/local-paths';

/** Spanish service-by-city links for an area that has city pages. */
export function esCityServiceLinks(area: string, name: string) {
  return spanishServiceSlugs.map((slug) => ({
    href: `/es/${localLandingSlug(slug, area)}`,
    label: `${esServiceNames[slug]} en ${name}`,
  }));
}
