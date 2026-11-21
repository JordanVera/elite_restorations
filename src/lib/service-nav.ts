/**
 * Slug, name, and group only. Header, footer, and mobile nav use this
 * instead of the full service catalog so page copy stays on the server.
 * `services.ts` checks that this list matches the catalog at build time.
 */

export type ServiceGroup =
  | 'Interiors'
  | 'Floors'
  | 'Roof & exterior'
  | 'Recovery';

export const serviceGroups: ServiceGroup[] = [
  'Interiors',
  'Floors',
  'Roof & exterior',
  'Recovery',
];

export type ServiceNavItem = {
  slug: string;
  name: string;
  group: ServiceGroup;
};

export const serviceNav: ServiceNavItem[] = [
  { slug: "kitchen-remodeling", name: "Kitchen Remodeling", group: "Interiors" },
  { slug: "bathroom-remodeling", name: "Bathroom Remodeling", group: "Interiors" },
  { slug: "backsplash", name: "Backsplash", group: "Interiors" },
  { slug: "countertops", name: "Countertops", group: "Interiors" },
  { slug: "wood-flooring", name: "Wood Flooring", group: "Floors" },
  { slug: "tile-flooring", name: "Tile Flooring", group: "Floors" },
  { slug: "vinyl-flooring", name: "Vinyl Flooring", group: "Floors" },
  { slug: "laminate-flooring", name: "Laminate Flooring", group: "Floors" },
  { slug: "carpentry", name: "Carpentry", group: "Interiors" },
  { slug: "tile-fireplaces", name: "Tile Fireplaces", group: "Interiors" },
  { slug: "roofing", name: "Roofing", group: "Roof & exterior" },
  { slug: "roof-replacement", name: "Roof Replacement", group: "Roof & exterior" },
  { slug: "roofing-emergency-tarp-repair", name: "Emergency Roof Tarping & Repair", group: "Roof & exterior" },
  { slug: "siding", name: "Siding", group: "Roof & exterior" },
  { slug: "patios-decks", name: "Patios & Decks", group: "Roof & exterior" },
  { slug: "water-damage-restoration", name: "Water Damage Restoration", group: "Recovery" },
  { slug: "insurance-claims", name: "Insurance Claims Help", group: "Recovery" },
  { slug: "painting-drywall-repair", name: "Painting & Drywall Repair", group: "Recovery" },
  { slug: "emergency-board-up", name: "Emergency Board-Up", group: "Recovery" },
  { slug: "fence-installation-repair", name: "Fence Installation & Repair", group: "Roof & exterior" },
  { slug: "gutters", name: "Gutters", group: "Roof & exterior" },
  { slug: "patios", name: "Patios", group: "Roof & exterior" },
  { slug: "gazebos", name: "Gazebos", group: "Roof & exterior" },
  { slug: "decks", name: "Decks", group: "Roof & exterior" },
  { slug: "commercial-storm-restoration", name: "Commercial & Multifamily Storm Restoration", group: "Recovery" },
  { slug: "fire-damage-restoration", name: "Fire Damage Restoration", group: "Recovery" },
  { slug: "hail-damage-roof-repair", name: "Hail Damage Roof Repair", group: "Roof & exterior" },
];

const navSlugs = new Set(serviceNav.map((service) => service.slug));

export function servicesInGroup(group: ServiceGroup) {
  return serviceNav.filter((service) => service.group === group);
}

export function isServicePagePath(pathname: string) {
  const slug = pathname.replace(/^\//, '').split('/')[0] ?? '';
  return slug.length > 0 && navSlugs.has(slug);
}
