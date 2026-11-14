import { areaSlug } from '@/lib/local-paths';
import { site } from '@/lib/site';

export type ServiceArea = {
  name: string;
  slug: string;
  /** Factual note about the housing and setting. Not a count of our jobs. */
  setting: string;
  /** Short fragment, no closing period, for meta descriptions. */
  clause: string;
};

const details: Record<string, { setting: string; clause: string }> = {
  Houston: {
    setting:
      'Houston is the center of the area we cover: older neighborhoods inside the Loop, slab houses farther out, and humidity that hangs on for most of the year.',
    clause: 'older neighborhoods inside the Loop and slab houses farther out',
  },
  Westchase: {
    setting:
      'Westchase is the west Houston district of offices, townhomes, and houses along Westheimer and the Beltway. Our office at 511 Crestwater Ct is in 77082, a short drive west near George Bush Park.',
    clause: 'townhomes and single-family houses around the 77082 office',
  },
  Alief: {
    setting:
      'Alief is a southwest Houston community of ranch houses and two-story homes, usually on slabs, where kitchens and baths have often been updated one piece at a time. It sits just south of our office ZIP, 77082.',
    clause: 'ranch houses and two-story homes just south of the office',
  },
  'Energy Corridor': {
    setting:
      'The Energy Corridor is the west Houston district along Interstate 10, beside our office in 77082. It mixes single-family houses, townhomes, and apartments with the offices the corridor is named for.',
    clause: 'houses and townhomes along Interstate 10, beside the 77082 office',
  },
  Katy: {
    setting:
      'Katy is mostly newer suburban construction: open floor plans, larger kitchens, and slab foundations west of town.',
    clause: 'newer open floor plans and slab foundations',
  },
  'Sugar Land': {
    setting:
      'Sugar Land is a master-planned city southwest of Houston. A lot of the houses are two-story plans from the 1990s onward, with an open kitchen and a primary bath built as one large room.',
    clause: 'master-planned two-story houses with open kitchens',
  },
  Bellaire: {
    setting:
      'Bellaire sits inside the Loop on smaller lots, with mid-century houses and newer rebuilds. Rooms are often tight, and older walls are not always square.',
    clause: 'smaller lots, mid-century houses, and newer rebuilds',
  },
  Memorial: {
    setting:
      'Memorial is known for larger lots and two-story houses. Kitchens, primary baths, and roof planes are often bigger than in a bungalow closer to downtown.',
    clause: 'larger lots and two-story houses',
  },
  'Spring Branch': {
    setting:
      'Spring Branch mixes postwar ranch houses and newer infill west of the Loop, much of it on concrete slabs.',
    clause: 'postwar ranch houses and newer infill on slabs',
  },
  'The Heights': {
    setting:
      'The Heights is mostly older bungalows and cottages, plus some newer infill. Rooms are often small, and the plumbing and structure decide how far a wall can move.',
    clause: 'older bungalows, cottages, and some newer infill',
  },
  'River Oaks': {
    setting:
      'River Oaks houses tend to be larger, with more formal rooms, bigger baths, and more millwork than a typical suburban plan.',
    clause: 'larger houses with formal rooms and more millwork',
  },
  'West University': {
    setting:
      'West University houses often sit on small lots, with compact kitchens, powder rooms, and older trim that is worth matching when it still belongs to the house.',
    clause: 'small lots, compact kitchens, and older trim',
  },
  'Galleria Area': {
    setting:
      'Around the Galleria, the houses and townhomes are a mix of older builds and later updates, often on smaller lots than the suburbs west of town.',
    clause: 'a mix of older houses and later townhome updates',
  },
  'Upper Kirby': {
    setting:
      'Upper Kirby is inside the Loop, with older houses and newer townhomes on smaller lots.',
    clause: 'older houses and newer townhomes on smaller lots',
  },
  'Rice Village': {
    setting:
      'Near Rice Village, many houses are older bungalows and cottages, with original trim and rooms that were not built as one open plan.',
    clause: 'older bungalows and cottages with original trim',
  },
  'Medical Center': {
    setting:
      'The Medical Center area includes mid-century and later houses and townhomes, many of them slab homes used as everyday family houses.',
    clause: 'mid-century and later houses and townhomes',
  },
  'Bunker Hill': {
    setting:
      'Bunker Hill Village is one of the Memorial villages: larger houses on wooded lots, with substantial roofs and primary suites.',
    clause: 'larger houses on wooded lots',
  },
  'Piney Point': {
    setting:
      'Piney Point Village is a small city of large-lot houses west of the Loop, often with long roof planes and larger baths.',
    clause: 'large-lot houses with long roof planes',
  },
  'Hunters Creek': {
    setting:
      'Hunters Creek Village sits among the Memorial villages, with larger houses and mature trees around the roof and the exterior walls.',
    clause: 'larger houses under mature trees',
  },
  'Bear Creek': {
    setting:
      'Bear Creek is on the west side, with suburban slab houses near the parks and the reservoir.',
    clause: 'suburban slab houses near the parks',
  },
  'Cinco Ranch': {
    setting:
      'Cinco Ranch is a master-planned community with open kitchens, larger family rooms, and newer construction.',
    clause: 'newer master-planned houses with open kitchens',
  },
  Stafford: {
    setting:
      'Stafford is southwest of Houston, with suburban houses from several decades, mostly on slabs.',
    clause: 'suburban houses from several decades, mostly on slabs',
  },
  Richmond: {
    setting:
      'Richmond includes an older town center and newer subdivisions southwest of Houston.',
    clause: 'an older town center and newer subdivisions',
  },
  Pearland: {
    setting:
      'Pearland is a large suburban city south of Houston, with many newer slab homes and open first floors.',
    clause: 'newer slab homes and open first floors',
  },
  'Clear Lake': {
    setting:
      'Clear Lake is southeast of Houston, near the bay. Houses are mostly suburban plans, and storms and humidity are part of any roof or water conversation.',
    clause: 'suburban houses near the bay, with storm weather in the mix',
  },
  Baytown: {
    setting:
      'Baytown is east of Houston, with older neighborhoods and newer subdivisions, and the same humidity and storm weather as the rest of the region.',
    clause: 'older neighborhoods and newer subdivisions east of Houston',
  },
  Galveston: {
    setting:
      'Galveston is on the coast. Wind, salt air, and storm weather are part of planning a roof, siding, or water repair there, in a way an inland suburb does not see.',
    clause: 'a coastal city where wind, salt air, and storms are part of the plan',
  },
  'Texas City': {
    setting:
      'Texas City sits on the bay, southeast of Houston. Wind and humidity show up on roofs and exteriors, and most houses are everyday suburban plans.',
    clause: 'bay-side houses where wind and humidity reach the roof',
  },
  'The Woodlands': {
    setting:
      'The Woodlands is a master-planned community north of Houston, with larger houses, open kitchens, and roof planes under a tree canopy.',
    clause: 'larger master-planned houses under a tree canopy',
  },
  Magnolia: {
    setting:
      'Magnolia is northwest of Houston, with newer suburban houses and larger lots than neighborhoods inside the Loop.',
    clause: 'newer suburban houses on larger lots',
  },
};

export const serviceAreas: ServiceArea[] = site.serviceArea.map((name) => {
  const detail = details[name];
  if (!detail) {
    throw new Error(`Missing service-area copy for ${name}`);
  }
  return { name, slug: areaSlug(name), ...detail };
});

const areasBySlug = new Map(serviceAreas.map((area) => [area.slug, area]));

export function getServiceArea(slug: string) {
  return areasBySlug.get(slug);
}
