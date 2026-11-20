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
      'Westchase is the west Houston district of offices, townhomes, and houses along Westheimer and the Beltway. Our office in west Houston (77082) is a short drive from the district, near George Bush Park.',
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
      'Bellaire sits on both sides of the West Loop, on smaller lots, with mid-century houses and newer rebuilds. Rooms are often tight, and older walls are not always square.',
    clause: 'smaller lots, mid-century houses, and newer rebuilds',
  },
  Memorial: {
    setting:
      'Memorial is known for larger lots and two-story houses. Kitchens, primary baths, and roofs are often bigger than in a bungalow closer to downtown.',
    clause: 'larger lots and two-story houses',
  },
  'Spring Branch': {
    setting:
      'Spring Branch mixes postwar ranch houses and newer houses on older lots west of the Loop, much of it on concrete slabs.',
    clause: 'postwar ranch houses and newer houses on slabs',
  },
  'The Heights': {
    setting:
      'The Heights is mostly older bungalows and cottages, plus some newer houses tucked between them. Rooms are often small, and the plumbing and the structure decide how far a wall can move.',
    clause: 'older bungalows, cottages, and some newer houses',
  },
  'River Oaks': {
    setting:
      'River Oaks houses tend to be larger, with more formal rooms, bigger baths, and more trim and woodwork than a typical suburban plan.',
    clause: 'larger houses with formal rooms and more wood trim',
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
      'Upper Kirby is inside the Loop, with older houses and newer townhomes sitting on smaller lots.',
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
      'Piney Point Village is a small city of large-lot houses west of the Loop, often with long roofs and larger baths.',
    clause: 'large-lot houses with long roofs',
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
      'The Woodlands is a master-planned community north of Houston, with larger houses, open kitchens, and roofs under a tree canopy.',
    clause: 'larger master-planned houses under a tree canopy',
  },
  Magnolia: {
    setting:
      'Magnolia is northwest of Houston, with newer suburban houses and larger lots than neighborhoods inside the Loop.',
    clause: 'newer suburban houses on larger lots',
  },
  Copperfield: {
    setting:
      'Copperfield is a west Houston neighborhood of brick houses from the late 1970s and the 1980s, on conventional slabs, between Highway 6 and Barker Cypress Road. Bear Creek and the Addicks Reservoir pool sit south of Clay Road, and permits come from the City of Houston.',
    clause: '1970s and 1980s brick houses on conventional slabs',
  },
  Rosenberg: {
    setting:
      'Rosenberg is the Fort Bend city beside Richmond, with an older railroad town and newer slab subdivisions. The Brazos River is west of town, Seabourne Creek drains the flat clay, and Rosenberg issues its own permits.',
    clause: 'an older railroad town and newer slab subdivisions',
  },
  'Jersey Village': {
    setting:
      'Jersey Village is its own city on US 290, with brick ranches from the 1960s through the 1980s on slabs. White Oak Bayou runs through it, and permits come from Jersey Village, not from Houston.',
    clause: '1960s to 1980s brick ranches on slabs along White Oak Bayou',
  },
  'Towne Lake': {
    setting:
      'Towne Lake is the master-planned community north of US 290 in Cypress, with two-story houses around a lake since about 2008, often on post-tension slabs. Most addresses are in unincorporated Harris County.',
    clause: 'newer houses around a lake, often on post-tension slabs',
  },
  Bridgeland: {
    setting:
      'Bridgeland is the Cypress community of villages along Fry Road and Mason Road, with Cypress Creek on the south edge and newer post-tension slabs. Addresses are commonly in unincorporated Harris County.',
    clause: 'newer villages along Fry Road, with Cypress Creek to the south',
  },
  Sienna: {
    setting:
      'Sienna is the master-planned community in Missouri City along Sienna Parkway, in Fort Bend County, with later post-tension houses and earlier sections nearer Highway 6. Missouri City issues the permits.',
    clause: 'master-planned houses in Missouri City along Sienna Parkway',
  },
  Cypress: {
    setting:
      'Cypress is northwest Harris County along US 290, with older slab houses near Cypress Creek and newer sections toward the Grand Parkway. Addresses fall in Houston or in unincorporated Harris County.',
    clause: 'older slab houses and newer sections along US 290',
  },
  Spring: {
    setting:
      'Spring is north Harris County along Interstate 45, from Old Town Spring to newer subdivisions. Spring Creek has flooded low streets, and the permit follows the address.',
    clause: 'Old Town houses and newer slabs along Interstate 45',
  },
  'Missouri City': {
    setting:
      'Missouri City is mostly in Fort Bend County, with a portion in Harris County. It issues its own permits. Quail Valley is the older slab fabric, and later sections are larger two-story plans.',
    clause: 'older Quail Valley slabs and later two-story houses',
  },
  Fulshear: {
    setting:
      'Fulshear is a Fort Bend city along FM 1093, with a small older town and newer subdivisions toward the Grand Parkway. Many newer slabs are post-tension, and Fulshear issues its own permits.',
    clause: 'a small older town and newer subdivisions on FM 1093',
  },
  Tomball: {
    setting:
      'Tomball is its own city along FM 2920 and Highway 249, with smaller houses near downtown and newer slabs toward the Grand Parkway. Permits inside the city come from Tomball.',
    clause: 'an older downtown and newer subdivisions along Highway 249',
  },
  Kingwood: {
    setting:
      'Kingwood is inside the City of Houston, northeast near Lake Houston, with slab houses from the 1970s through the 2000s under pines. Low ground near the lake has flooded in past tropical storms.',
    clause: 'pine-shaded slab houses near Lake Houston',
  },
  Humble: {
    setting:
      'Humble is its own city in northeast Harris County along Interstate 69, with an older downtown and later slab houses toward FM 1960 and Lake Houston. Low ground near the San Jacinto River has taken storm water in past tropical storms.',
    clause: 'an older downtown and later slabs toward Lake Houston',
  },
  Atascocita: {
    setting:
      'Atascocita is the unincorporated Harris County community along FM 1960 between Humble and Lake Houston. Houses are mostly brick slabs from the 1970s onward, many under pines, and the permit follows the county address.',
    clause: '1970s brick slabs under pines, beside Lake Houston',
  },
  Friendswood: {
    setting:
      'Friendswood is its own city southeast of Houston, mostly in Galveston County with a northern portion in Harris County. Brick slab houses from the 1960s through the 1990s sit near Clear Creek, and Friendswood issues its own permits.',
    clause: 'brick slab houses near Clear Creek',
  },
  'League City': {
    setting:
      'League City is its own city along Interstate 45, mostly in Galveston County with a portion in Harris County. An older town near FM 518 sits beside later slab subdivisions toward Clear Creek and Clear Lake.',
    clause: 'an older town and later slabs along Interstate 45',
  },
  Conroe: {
    setting:
      'Conroe is the Montgomery County seat north of The Woodlands, with an older downtown and newer slab subdivisions toward Lake Conroe. The city permits addresses inside the city, and many nearby lots are in unincorporated Montgomery County.',
    clause: 'an older downtown and newer slabs toward Lake Conroe',
  },
  Meyerland: {
    setting:
      'Meyerland is the southwest Houston neighborhood of 1950s one-story brick ranches on slabs along Brays Bayou and North Braeswood. Low ground along the bayou has taken storm water, and some of those houses were later rebuilt or lifted.',
    clause: '1950s brick ranches along Brays Bayou',
  },
  Montrose: {
    setting:
      'Montrose is inside Loop 610 in Houston, with older bungalows on piers and newer townhomes on slabs along Westheimer, Montrose Boulevard, and Richmond. Streets are tight, and the roofs are often a mix of patched slopes, dormers, and flat porches.',
    clause: 'bungalows on piers and townhomes on slabs',
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
