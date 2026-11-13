import { getArticle } from '@/lib/articles';
import { localLandingSlug, parseLocalLandingSlug } from '@/lib/local-paths';
import { titleFits } from '@/lib/seo';
import { getServiceArea } from '@/lib/service-areas';
import { getService, servicePath, services } from '@/lib/services';

/** Neighborhoods beside the 77082 office. Slugs match `site.serviceArea`. */
export const nearOfficeSlugs = ['westchase', 'alief', 'energy-corridor'] as const;

export type AreaPage = {
  slug: string;
  path: string;
  name: string;
  title: string;
  description: string;
  lede: string;
  paragraphs: readonly string[];
  services: readonly { href: string; label: string; cityHref: string }[];
};

const notes: Record<
  (typeof nearOfficeSlugs)[number],
  { lede: string; extra: string; description: string }
> = {
  westchase: {
    lede:
      'The office is at 511 Crestwater Ct, Houston, TX 77082, in the Westchase area. Remodeling, roofing, and restoration are scheduled from that address.',
    extra:
      'There is no separate Westchase storefront. A kitchen, a roof, or a deck here is scoped at the house, the same way it is anywhere else we work.',
    description:
      'Westchase, TX, where the Elite Restorations office sits in Houston 77082. Remodeling, roofing, decks, and restoration scheduled from 511 Crestwater Ct.',
  },
  alief: {
    lede:
      'Alief is the southwest Houston community just south of our 77082 office. We schedule the work from 511 Crestwater Ct.',
    extra:
      'There is no Alief office. The visit is at the property, and the scope comes from what that house needs.',
    description:
      'Alief, TX, just south of the Elite Restorations office in Houston 77082. Remodeling, roofing, and restoration scheduled from 511 Crestwater Ct.',
  },
  'energy-corridor': {
    lede:
      'The Energy Corridor is the west Houston district along Interstate 10, beside the office in 77082. We schedule work here from 511 Crestwater Ct.',
    extra:
      'Houses, townhomes, and apartments sit next to the offices the corridor is named for. The job is still scoped from the property in front of us, not from the district name.',
    description:
      'Energy Corridor, TX, along Interstate 10 beside the Houston office in 77082. Remodeling, roofing, and decks scheduled from 511 Crestwater Ct.',
  },
};

function buildAreaPage(areaSlug: (typeof nearOfficeSlugs)[number]): AreaPage {
  const area = getServiceArea(areaSlug);
  const note = notes[areaSlug];
  if (!area) throw new Error(`Missing service area for ${areaSlug}`);
  const title = `${area.name}, TX`;
  if (!titleFits(title)) throw new Error(`Area title does not fit: ${title}`);
  const description = note.description;
  return {
    slug: `${area.slug}-tx`,
    path: `/${area.slug}-tx`,
    name: area.name,
    title,
    description,
    lede: note.lede,
    paragraphs: [area.setting, note.extra],
    services: services.map((service) => ({
      href: servicePath(service.slug),
      label: service.name,
      cityHref: `/${localLandingSlug(service.slug, area.slug)}`,
    })),
  };
}

export const areaPages: readonly AreaPage[] = nearOfficeSlugs.map(buildAreaPage);

const bySlug = new Map(areaPages.map((page) => [page.slug, page]));

export function getAreaPage(slug: string) {
  return bySlug.get(slug);
}

for (const page of areaPages) {
  if (getService(page.slug) || getArticle(page.slug) || parseLocalLandingSlug(page.slug)) {
    throw new Error(`Area page slug collides with another route: ${page.slug}`);
  }
  if (page.description.length > 155) {
    throw new Error(`Area description too long: ${page.description}`);
  }
}
