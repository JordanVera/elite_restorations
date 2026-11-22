import { CATEGORY_TEMPLATES } from './categories';

/**
 * Retailers and yards we send customers to for material selections.
 * Names are trademarks of their owners. Elite Restorations is an independent contractor.
 */
export type PortalResource = {
  slug: string;
  name: string;
  url: string;
  /** Short line on the card: what we send people there for. */
  recommendedFor: string;
  /** Houston-area hint shown under the recommendation when we have one. */
  location?: string | null;
  /** Public path or https URL for a copied company logo. */
  logoPath?: string | null;
  categorySlugs: readonly string[];
  /** Hidden resources stay on customized portals but are not suggested. */
  active?: boolean;
};

function logo(file: string): string {
  return `/images/suppliers/${file}`;
}

/** Seeded catalog. Admins can add, edit, and hide rows from Settings. */
export const PORTAL_RESOURCES: readonly PortalResource[] = [
  {
    slug: 'sherwin-williams',
    name: 'Sherwin-Williams',
    url: 'https://www.sherwin-williams.com/',
    recommendedFor:
      'Interior and exterior paint, including walls, trim, doors, and cabinet colors. We use Duration, Emerald, SuperPaint, and ProClassic.',
    logoPath: logo('sherwin-williams.svg'),
    categorySlugs: ['paint-colors', 'cabinet-finishes'],
  },
  {
    slug: 'floor-and-decor',
    name: 'Floor & Decor',
    url: 'https://www.flooranddecor.com/',
    recommendedFor:
      'Tile, luxury vinyl plank, wood, and laminate. You pick the product at the store; we install it.',
    logoPath: logo('floor-and-decor.svg'),
    categorySlugs: ['flooring', 'backsplash', 'shower-tile', 'bathroom-floor-tile'],
  },
  {
    slug: 'builders-firstsource',
    name: 'Builders FirstSource',
    url: 'https://www.bldr.com/',
    recommendedFor:
      'Lumber, interior and exterior doors, windows, and structural building materials for remodels and repairs.',
    logoPath: logo('builders-firstsource.png'),
    categorySlugs: ['doors', 'other', 'cabinet-finishes', 'base', 'baseboards', 'trim', 'molding', 'crown-molding'],
  },
  {
    slug: 'home-depot',
    name: 'The Home Depot',
    url: 'https://www.homedepot.com/',
    recommendedFor:
      'Plumbing fixtures, lighting, cabinet hardware, and everyday building supplies when you want a widely available option.',
    logoPath: logo('home-depot.svg'),
    categorySlugs: ['plumbing-fixtures', 'lighting-fixtures', 'cabinet-hardware', 'doors', 'other'],
  },
  {
    slug: 'lowes',
    name: "Lowe's",
    url: 'https://www.lowes.com/',
    recommendedFor:
      'Plumbing fixtures, lighting, cabinet hardware, and building supplies — another easy place to compare finishes.',
    logoPath: logo('lowes.svg'),
    categorySlugs: ['plumbing-fixtures', 'lighting-fixtures', 'cabinet-hardware', 'doors', 'other'],
  },
  {
    slug: 'expo-stones',
    name: 'Expo Stones',
    url: 'https://expostones.com/',
    recommendedFor:
      'Granite, quartz, quartzite, and marble slabs for kitchens and baths. You pick the slab; we template and install.',
    location: '1055 W Sam Houston Pkwy N #100, Houston, TX 77043',
    logoPath: logo('expo-stones.svg'),
    categorySlugs: ['countertops'],
  },
  {
    slug: 'earth-stone-colours',
    name: 'Earth Stone Colours',
    url: 'https://earthstonetexas.com/',
    recommendedFor:
      'Natural stone slabs, quartz, porcelain slabs, and tile when you want a second Houston yard to compare.',
    location: '5525 Brittmoore Rd and 4305 Richmond Ave, Houston',
    logoPath: logo('earth-stone-colours.png'),
    categorySlugs: ['countertops'],
  },
];

export type PortalResourceSlug = (typeof PORTAL_RESOURCES)[number]['slug'];

export function slugifyResourceName(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 50) || 'resource'
  );
}

function bySlug(catalog: readonly PortalResource[]) {
  return new Map(catalog.map((resource) => [resource.slug, resource]));
}

export function resourceBySlug(catalog: readonly PortalResource[], slug: string): PortalResource | undefined {
  return bySlug(catalog).get(slug);
}

export function sanitizeResourceSlugs(catalog: readonly PortalResource[], slugs: readonly string[]): string[] {
  const known = bySlug(catalog);
  const seen = new Set<string>();
  for (const slug of slugs) {
    if (!known.has(slug) || seen.has(slug)) continue;
    seen.add(slug);
  }
  return catalog.filter((resource) => seen.has(resource.slug)).map((resource) => resource.slug);
}

export function resourcesFromSlugs(catalog: readonly PortalResource[], slugs: readonly string[]): PortalResource[] {
  const known = bySlug(catalog);
  return sanitizeResourceSlugs(catalog, slugs)
    .map((slug) => known.get(slug))
    .filter((resource): resource is PortalResource => Boolean(resource));
}

/** Category slug from a live category row, or from the frozen name if the row was deleted. */
export function categorySlugForRequirement(
  categorySlug: string | null | undefined,
  categoryName: string,
): string | null {
  if (categorySlug) return categorySlug;
  const template = CATEGORY_TEMPLATES.find((item) => item.name === categoryName);
  return template?.slug ?? null;
}

export function suggestedResourceSlugs(catalog: readonly PortalResource[], categorySlugs: readonly string[]): string[] {
  const needed = new Set(categorySlugs.filter(Boolean));
  if (needed.size === 0) return [];
  return catalog
    .filter((resource) => resource.active !== false)
    .filter((resource) => resource.categorySlugs.some((slug) => needed.has(slug)))
    .map((resource) => resource.slug);
}

export function resolveResourceSlugs(
  catalog: readonly PortalResource[],
  {
    customized,
    saved,
    categorySlugs,
  }: {
    customized: boolean;
    saved: readonly string[];
    categorySlugs: readonly string[];
  },
): string[] {
  if (customized) return sanitizeResourceSlugs(catalog, saved);
  return suggestedResourceSlugs(catalog, categorySlugs);
}

export function resourcesForCategory(
  catalog: readonly PortalResource[],
  categorySlug: string | null | undefined,
  allowedSlugs?: readonly string[],
): PortalResource[] {
  if (!categorySlug) return [];
  const allowed = allowedSlugs ? new Set(allowedSlugs) : null;
  return catalog.filter((resource) => {
    if (!resource.categorySlugs.includes(categorySlug)) return false;
    return allowed ? allowed.has(resource.slug) : resource.active !== false;
  });
}
