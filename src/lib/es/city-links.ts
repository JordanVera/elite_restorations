import { esServiceNames, spanishServiceSlugs } from '@/lib/i18n';
import { localLandingSlug } from '@/lib/local-paths';
import { isCityIndexedService } from '@/lib/services';

/** Spanish service-by-city links for an area that has city pages. */
export function esCityServiceLinks(area: string, name: string) {
  return spanishServiceSlugs.filter((slug) => isCityIndexedService(slug)).map((slug) => ({
    href: `/es/${localLandingSlug(slug, area)}`,
    label: `${esServiceNames[slug]} en ${name}`,
  }));
}
