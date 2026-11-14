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
  faqs: readonly { q: string; a: string }[];
  services: readonly { href: string; label: string; cityHref: string }[];
};

const notes: Record<
  (typeof nearOfficeSlugs)[number],
  {
    lede: string;
    description: string;
    paragraphs: readonly string[];
    faqs: readonly { q: string; a: string }[];
  }
> = {
  westchase: {
    lede:
      'The office is at 511 Crestwater Ct, Houston, TX 77082, in the Crestwater neighborhood near George Bush Park, a short drive west of the Westchase district. Remodeling, roofing, and restoration for Westchase are scheduled from that address.',
    description:
      'Westchase, TX, a short drive from the Elite Restorations office at 511 Crestwater Ct, Houston 77082. Remodeling, roofing, and restoration.',
    paragraphs: [
      'Westchase is the district of offices, townhomes, and single-family houses along Westheimer, Richmond, and the Sam Houston Tollway. It is not one floor plan. A townhome with a shared wall and a single-family house from the late 1970s can sit a few blocks apart, and the scope follows the building.',
      'Most of that housing went up from the 1970s through the 1990s. On this side of Houston that usually means a concrete slab rather than a crawlspace. Kitchens and baths have often been updated once already. We look at what is there before we assume the drains, the floor, or the roof match the year on the outside.',
      'Townhome sections often have an association that reviews exterior color, fences, and sometimes a roof. Single-family streets are less uniform. A kitchen or a bath inside the house is usually outside that review. A permit, when the work needs one, is a City of Houston permit. We confirm the address.',
      'The office is not in the middle of the district. Crestwater Court is in 77082, near George Bush Park and the east side of Barker Reservoir, about 7 miles west of the Westchase core along Richmond in a straight line. The drive is Westheimer or Richmond. Traffic on the tollway changes the time. We do not quote one.',
      'This side of town drains toward the reservoir and the local bayous. Heavy rain ponds on flat streets. Low ground near the reservoir pools has taken storm water in past tropical storms. Higher pads have not all seen the same water. A water-heater leak and water that rose from outside are different visits, and sometimes different insurance policies. Your insurer decides coverage. We document and, if you hire us, dry and repair.',
      'Hail and wind are the same regional weather as the rest of west Houston. Roofs here are often asphalt on one or two stories. We inspect before we say a repair will hold. South and west walls fade first when the house has siding. Yards are usually modest, so a deck or a patio is sized to the lot and sloped away from the slab.',
      'There is no separate Westchase storefront. The visit is at the property. The links below open each service as it applies in Westchase, from kitchens and baths to roofs, water damage, and the notes that go with a claim.',
    ],
    faqs: [
      {
        q: 'Is the Elite Restorations office in the Westchase district?',
        a: 'The office is at 511 Crestwater Ct, Houston, TX 77082, in Crestwater near George Bush Park. That is a short drive west of the Westchase core along Richmond and Westheimer, about 7 miles in a straight line. Westchase work is scheduled from that address. There is not a second storefront in the district.',
      },
      {
        q: 'What kind of houses are common in Westchase?',
        a: 'Townhomes and single-family houses, many built from the 1970s through the 1990s, usually on concrete slabs. Some sections have an association that reviews exterior changes. Others do not. We ask, and we still measure the house, because a slab from that era is not always flat and the roof is not always ready for a simple repair.',
      },
      {
        q: 'Does Westchase flood?',
        a: 'Some low ground near Barker Reservoir and the bayou drainage has taken storm water in past tropical storms. Many streets only see ponding in heavy rain. We do not treat the district as one elevation. A water visit starts with where the water entered this house. Wind and hail are separate from rising water, and your insurer decides which policy applies.',
      },
      {
        q: 'Which services do you schedule in Westchase?',
        a: 'The same list as the rest of our Houston work: kitchens, baths, counters, backsplashes, flooring, carpentry, fireplaces, roofs, tarping, siding, decks and patios, painting and drywall, water damage, and claim documentation. Each has its own Westchase page. The scope still comes from the visit.',
      },
    ],
  },
  alief: {
    lede:
      'Alief is the southwest Houston community just south of our 77082 office. We schedule the work from 511 Crestwater Ct.',
    description:
      'Alief, TX, just south of the Elite Restorations office in Houston 77082. Remodeling, roofing, and restoration scheduled from 511 Crestwater Ct.',
    paragraphs: [
      'Alief runs along Bellaire Boulevard south of the office: ranch houses and two-story homes, not a high-rise district. Most of the houses date from the 1970s through the 1990s and sit on slabs. Kitchens and baths have often been updated one piece at a time, so one room can mix decades. We scope what you want replaced.',
      'Bellaire Boulevard at Dairy Ashford is about 4 miles south of 511 Crestwater Ct in a straight line. Beechnut and Bellaire are the usual drives. There is no Alief office. The visit is at the property.',
      'Alief is part of Houston, not a separate city hall. Associations exist in some subdivisions and not in others. When a permit is required, it is typically a City of Houston permit. Interior remodeling is rarely an association review. Roofs, paint, and fences are the items an association is more likely to care about, and only where one exists.',
      'Keegans Bayou and the wider Brays Bayou drainage run through this part of southwest Houston. Heavy rain floods streets. Some low blocks have taken storm water. A supply-line leak on a slab is still the more ordinary call, and it shows up at the base of the drywall. We meter before we dry, and we do not close a wall that is still wet. Humidity is why dehumidifiers are part of a dry-out here.',
      'Roofs are typically asphalt on one and two stories. South and west slopes age faster. We look at all of them before we recommend a repair. Exteriors are often brick with some siding and trim. A siding repair is matched to the faded board, not to a chip from the year the house was built. Yards are ordinary suburban lots, which makes staging easier than on a street inside the Loop, and a patio still has to slope away from the slab.',
      'Lots have driveways. That matters for a dumpster, a stone delivery, or a roof tear-off. It does not make the house square, and it does not tell us whether the slab is flat enough for new flooring. Vinyl and laminate will show a ridge that carpet hid. Wood has to acclimate in the house. Tile needs a flat substrate, and a shower is waterproofed before the finish.',
      'The service list below is everything we schedule in Alief, each linked to the page for that trade in this community. The neighborhood name does not pick the scope.',
    ],
    faqs: [
      {
        q: 'How far is Alief from the office?',
        a: 'The office is at 511 Crestwater Ct, Houston, TX 77082, just north of Alief. Bellaire Boulevard at Dairy Ashford is about 4 miles south in a straight line. The drive is Bellaire Boulevard or Beechnut. We do not keep a separate Alief office, and we do not quote a single drive time, because traffic changes it.',
      },
      {
        q: 'Are Alief houses usually pier-and-beam?',
        a: 'Usually they are slabs. The common house is a ranch or a two-story from the 1970s through the 1990s. That matters when a sink or a shower has to move, because the drain is under concrete. We confirm this house before we promise a layout. An older exception can exist. We look rather than argue from the decade.',
      },
      {
        q: 'What should a roof inspection cover in Alief?',
        a: 'All the slopes, not only the front. South and west faces age faster. Pipe boots, valleys, and flashing fail while the field still looks calm from the street. We photograph the roof and say whether a repair will hold. If you are filing a claim, your insurer decides coverage. We do not.',
      },
      {
        q: 'Do you only remodel kitchens in Alief?',
        a: 'No. Kitchens are one trade. Baths, flooring, carpentry, roofs, siding, decks, painting, water damage, and claim documentation are on the list below, each with an Alief page. A kitchen that was updated in pieces is a common starting point. It is not the only one.',
      },
    ],
  },
  'energy-corridor': {
    lede:
      'The Energy Corridor is the west Houston district along Interstate 10, north of the office in 77082. We schedule work here from 511 Crestwater Ct.',
    description:
      'Energy Corridor, TX, along Interstate 10 near the Houston office in 77082. Remodeling, roofing, and restoration scheduled from 511 Crestwater Ct.',
    paragraphs: [
      'The Energy Corridor is the I-10 district from the office parks near Eldridge toward Highway 6, with houses, townhomes, and apartments between the towers. A townhome with a shared wall and a single-family house on the next block are different scopes. The district name does not choose.',
      'Residential stock mixes 1960s and 1970s houses, later townhomes, and newer infill. Slabs are the normal foundation. Moving a shower or a sink means cutting concrete unless the fixture stays on its drain. Newer slabs are often post-tension, with cables that have to be located before anyone cuts. We do not assume every corridor house is from the same decade.',
      'Interstate 10 at Eldridge Parkway is about 6 miles north of 511 Crestwater Ct in a straight line. The drive is Highway 6 north to the freeway. The office is in Crestwater, near George Bush Park, south of the corridor. There is no corridor showroom.',
      'Terry Hershey Park and Buffalo Bayou run through the district. Low ground along the bayou has flooded in past tropical storms, including when the upstream reservoirs released. Houses and apartments on higher ground did not all take water. A second-floor supply leak is a different problem from bayou water. We ask which one happened. Wind and hail still belong in any roof conversation, separate from rising water. Your insurer decides which policy applies.',
      'Many townhome communities have an association that reviews exterior changes: roof color, siding, fences, and sometimes a deck. A kitchen or a bath inside the house is usually outside that review. This is Houston, so there is no zoning, and a permit depends on whether plumbing, electrical, or structure changes. We confirm the address before we treat a townhome rule as if it were the city.',
      'Roofs sit on houses and on townhomes, so staging and debris are planned for the one you have. Siding shows up on house walls and on townhome rear elevations. Patios may be a court or a yard, and water still has to leave the wall, especially on lower ground near the bayou. Interior floors need a flat slab. A ridge will show through vinyl or large tile. Wood acclimates in the house. Showers are waterproofed before the finish tile.',
      'Every service we schedule in the corridor has its own page in the list below. Use those for the trade. Use this page for where the office sits relative to the district and for the housing the visits actually see.',
    ],
    faqs: [
      {
        q: 'Where is the office relative to the Energy Corridor?',
        a: 'At 511 Crestwater Ct, Houston, TX 77082, in Crestwater near George Bush Park, south of Interstate 10. Interstate 10 at Eldridge is about 6 miles north in a straight line. The usual drive is Highway 6 up to the freeway. Corridor work is scheduled from that office. There is not a separate showroom in the district.',
      },
      {
        q: 'Are Energy Corridor homes all the same age?',
        a: 'No. The district mixes 1960s and 1970s houses, later townhomes, and newer infill. Slabs are the usual foundation. Some newer slabs are post-tension, which changes whether a drain can move. Townhomes add shared walls and, often, an association that reviews the exterior. We identify the building on the visit.',
      },
      {
        q: 'How does Buffalo Bayou affect restoration in the Energy Corridor?',
        a: 'Low ground along the bayou has flooded in past tropical storms, including after reservoir releases. That is not every house in the district. We start with where water entered this building. A roof leak, a supply line, and bayou water are different scopes, and they can be different insurance policies. Your insurer decides coverage. We map, dry, and repair what you hire.',
      },
      {
        q: 'Do you work on Energy Corridor townhomes?',
        a: 'Yes. A townhome bath shares a wall and a stack. A townhome roof may have rules about color and about where debris can sit. A single-family house nearby does not have those limits. Both are scheduled from the 77082 office. The page for each trade describes how the work changes. The visit confirms which building you have.',
      },
    ],
  },
};

function buildAreaPage(areaSlug: (typeof nearOfficeSlugs)[number]): AreaPage {
  const area = getServiceArea(areaSlug);
  const note = notes[areaSlug];
  if (!area) throw new Error(`Missing service area for ${areaSlug}`);
  const title = `${area.name}, TX`;
  if (!titleFits(title)) throw new Error(`Area title does not fit: ${title}`);
  return {
    slug: `${area.slug}-tx`,
    path: `/${area.slug}-tx`,
    name: area.name,
    title,
    description: note.description,
    lede: note.lede,
    paragraphs: note.paragraphs,
    faqs: note.faqs,
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
    throw new Error(`Area description too long (${page.description.length}): ${page.description}`);
  }
  if (page.faqs.length < 3) {
    throw new Error(`${page.path} needs at least 3 FAQs`);
  }
}
