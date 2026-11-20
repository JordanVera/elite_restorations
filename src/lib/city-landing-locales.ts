import { parseLocalLandingSlug } from '@/lib/local-paths';

/** City service pages that have a Spanish twin. PR #61 areas plus the six added with them. */
export const spanishCityAreaSlugs = [
  'copperfield',
  'rosenberg',
  'jersey-village',
  'towne-lake',
  'bridgeland',
  'sienna',
  'cypress',
  'spring',
  'missouri-city',
  'fulshear',
  'tomball',
  'kingwood',
] as const;

export type SpanishCityAreaSlug = (typeof spanishCityAreaSlugs)[number];

/** English city pages added in this round. Their heroes use the edited photo set. */
export const newCityAreaSlugs = [
  'cypress',
  'spring',
  'missouri-city',
  'fulshear',
  'tomball',
  'kingwood',
] as const;

const spanishCityAreaSet = new Set<string>(spanishCityAreaSlugs);

export function isSpanishCityArea(slug: string) {
  return spanishCityAreaSet.has(slug);
}

export function isNewCityArea(slug: string) {
  return (newCityAreaSlugs as readonly string[]).includes(slug);
}

/** Spanish path for an English city-service path, when that area has a Spanish page. */
export function spanishCityPath(pathname: string) {
  const slug = pathname.replace(/^\//, '').split('/')[0] ?? '';
  const parsed = parseLocalLandingSlug(slug);
  if (!parsed || !spanishCityAreaSet.has(parsed.areaSlug)) return null;
  return `/es/${slug}`;
}
