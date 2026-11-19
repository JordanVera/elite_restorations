import { getAreaPage } from '@/lib/area-pages';
import { esNeighborhoods } from '@/lib/es/neighborhoods';
import { localLandingSlug } from '@/lib/local-paths';
import { getLocalLanding } from '@/lib/local-landings';
import { neighborhoods } from '@/lib/neighborhoods';
import { serviceAreas } from '@/lib/service-areas';

export type PlaceLink = { href: string; label: string };

/** Every city and neighborhood page. Spanish uses the /es routes. */
export function cityPageLinks(locale: 'en' | 'es'): PlaceLink[] {
  const pages = locale === 'es' ? esNeighborhoods : neighborhoods;
  return pages.map((page) => ({ href: page.path, label: page.name }));
}

/**
 * One key page per community in `serviceAreas`.
 * Westchase, Alief, and the Energy Corridor have area pages.
 * Every other community links to its water-damage page.
 */
export function serviceAreaPageLinks(locale: 'en' | 'es'): PlaceLink[] {
  return serviceAreas.map((area) => {
    const areaPage = getAreaPage(`${area.slug}-tx`);
    if (areaPage) return { href: areaPage.path, label: area.name };
    const landing = getLocalLanding(localLandingSlug('water-damage-restoration', area.slug));
    if (!landing) {
      throw new Error(`Missing service-area page for ${area.name}`);
    }
    return {
      href: landing.path,
      label: locale === 'es' ? `Daño de agua en ${area.name}` : `Water damage in ${area.name}`,
    };
  });
}
