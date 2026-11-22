/**
 * Neighborhoods and districts inside the City of Houston.
 * Slugs match `authority: 'houston'` in area profiles, excluding Houston
 * itself. Garden Oaks and Oak Forest have neighborhood pages and no profile.
 * Independent cities keep a plain "Name, TX" label.
 */
export const HOUSTON_NEIGHBORHOOD_SLUGS = new Set([
  'westchase',
  'alief',
  'energy-corridor',
  'spring-branch',
  'the-heights',
  'river-oaks',
  'galleria-area',
  'upper-kirby',
  'rice-village',
  'medical-center',
  'bear-creek',
  'copperfield',
  'kingwood',
  'meyerland',
  'montrose',
  'garden-oaks',
  'oak-forest',
]);

/** True for a neighborhood slug (`meyerland`) or its page slug (`meyerland-tx`). */
export function isHoustonNeighborhoodSlug(slug: string) {
  const bare = slug.endsWith('-tx') ? slug.slice(0, -3) : slug;
  return HOUSTON_NEIGHBORHOOD_SLUGS.has(bare);
}

/** Postal label. Houston neighborhoods are not their own cities. */
export function postalPlaceLabel(name: string, slug: string) {
  return isHoustonNeighborhoodSlug(slug) ? `${name}, Houston, TX` : `${name}, TX`;
}

/** areaServed node. Neighborhoods are administrative areas, not cities. */
export function servedPlace(name: string, slug: string) {
  if (isHoustonNeighborhoodSlug(slug)) {
    return { '@type': 'AdministrativeArea' as const, name: `${name}, Houston, TX` };
  }
  return { '@type': 'Place' as const, name: `${name}, Texas` };
}

/** Business-level areaServed. Cities stay a plain place name. */
export function businessAreaServed(name: string, slug: string) {
  if (isHoustonNeighborhoodSlug(slug)) {
    return { '@type': 'AdministrativeArea' as const, name: `${name}, Houston, TX` };
  }
  return { '@type': 'Place' as const, name };
}
