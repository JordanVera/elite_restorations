import { services } from '@/lib/services';
import { site } from '@/lib/site';

/** URL slug for a name in `site.serviceArea`. */
export function areaSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const serviceSlugsLongestFirst = services
  .map((service) => service.slug)
  .sort((a, b) => b.length - a.length);

const areaSlugs = new Set(site.serviceArea.map((name) => areaSlug(name)));

export function localLandingSlug(serviceSlug: string, area: string) {
  const slug = areaSlugs.has(area) ? area : areaSlug(area);
  return `${serviceSlug}-${slug}-tx`;
}

export function parseLocalLandingSlug(slug: string) {
  if (!slug.endsWith('-tx')) return undefined;
  const body = slug.slice(0, -3);
  for (const serviceSlug of serviceSlugsLongestFirst) {
    const prefix = `${serviceSlug}-`;
    if (!body.startsWith(prefix)) continue;
    const area = body.slice(prefix.length);
    if (!areaSlugs.has(area)) continue;
    return { serviceSlug, areaSlug: area };
  }
  return undefined;
}

export function isLocalLandingPath(pathname: string) {
  const slug = pathname.replace(/^\//, '').split('/')[0] ?? '';
  return parseLocalLandingSlug(slug) !== undefined;
}
