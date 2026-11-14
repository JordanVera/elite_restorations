import { areaSlug } from '@/lib/local-paths';
import { site } from '@/lib/site';

export type Foundation = 'pier' | 'slab' | 'mixed' | 'post-tension' | 'raised';
export type Weather = 'bayou' | 'reservoir' | 'coastal' | 'creek' | 'citywide';
export type Authority = 'houston' | 'zoned-city' | 'village' | 'township' | 'mixed-cities';
export type Hoa = 'usual' | 'mixed' | 'light';

export type AreaProfile = {
  slug: string;
  name: string;
  priority: boolean;
  neighbors: readonly [string, string, string];
  /** Named place the straight-line distance is measured to. */
  landmark: string;
  lat: number;
  lng: number;
  /** Phrase such as "east of the office". */
  direction: string;
  roads: string;
  foundation: Foundation;
  weather: Weather;
  authority: Authority;
  trees: boolean;
  hoa: Hoa;
  /** Four words or fewer, so it does not become a reusable five-word phrase. */
  housingShort: string;
  lines: readonly [string, string, string, string, string, string];
};

const priority = new Set([
  'Houston',
  'Katy',
  'Memorial',
  'Energy Corridor',
  'Westchase',
  'Alief',
  'Sugar Land',
  'Bellaire',
  'The Heights',
  'The Woodlands',
]);

const raw: Record<
  string,
  Omit<AreaProfile, 'slug' | 'name' | 'priority'>
> = {
  Houston: {
    neighbors: ['the-heights', 'bellaire', 'memorial'],
    landmark: 'Houston City Hall',
    lat: 29.760427,
    lng: -95.369804,
    direction: 'east of the office',
    roads: 'the Westpark Tollway, Westheimer, or I-10',
    foundation: 'mixed',
    weather: 'citywide',
    authority: 'houston',
    trees: false,
    hoa: 'mixed',
    housingShort: 'mixed housing eras',
    lines: [
      'Houston is many housing stocks in one city: bungalows inside the Loop, postwar ranches, and newer slab subdivisions toward the Beltway.',
      'Pier-and-beam is common in older neighborhoods inside Loop 610. Slab-on-grade is the usual foundation farther out, and a lot of construction from the mid-1980s on uses post-tension cable in the slab.',
      'The city sits on flat clay and drains to bayous. Streets flood in heavy rain. Hail comes with spring storms, and tropical systems bring wind and driven rain.',
      'Houston has no zoning. Deed restrictions still shape some street elevations, and a few districts add historic-design rules. A permit depends on the work, not on a neighborhood nickname.',
      'The office is at 511 Crestwater Ct in west Houston, 77082, in the Crestwater neighborhood near George Bush Park. Downtown is a cross-town drive, not a local errand.',
      'A Houston address is not a house type. The scope comes from the building you ask us to visit.',
    ],
  },
  Westchase: {
    neighbors: ['energy-corridor', 'alief', 'memorial'],
    landmark: 'the Westchase core along Richmond',
    lat: 29.7328,
    lng: -95.565,
    direction: 'east of the office',
    roads: 'Westheimer or Richmond',
    foundation: 'slab',
    weather: 'reservoir',
    authority: 'houston',
    trees: false,
    hoa: 'mixed',
    housingShort: 'slab townhomes and houses',
    lines: [
      'Westchase is the west Houston district of offices, townhomes, and single-family houses along Westheimer, Richmond, and the Sam Houston Tollway.',
      'A lot of those houses and townhomes went up from the 1970s through the 1990s, which on this side of town usually means a concrete slab rather than a crawlspace.',
      'Townhome sections often have an association. Single-family streets are less uniform. Exterior color and fences are the usual review, not a kitchen inside the house.',
      'The office is in 77082 near George Bush Park, west of the district core. This side of town drains toward Barker Reservoir and the local bayous.',
      'Heavy rain ponds on flat streets. Low ground near the reservoir pools has taken storm water in past tropical storms. Higher pads have not all seen the same water.',
      'Westchase is not one floor plan. A townhome association and a single-family ranch on the next block are different visits.',
    ],
  },
  Alief: {
    neighbors: ['westchase', 'sugar-land', 'stafford'],
    landmark: 'Bellaire Boulevard at Dairy Ashford',
    lat: 29.7044,
    lng: -95.6065,
    direction: 'south of the office',
    roads: 'Bellaire Boulevard or Beechnut',
    foundation: 'slab',
    weather: 'bayou',
    authority: 'houston',
    trees: false,
    hoa: 'light',
    housingShort: '1970s and 1990s slabs',
    lines: [
      'Alief is the southwest Houston community along Bellaire Boulevard, south of the office, made up of ranch houses and two-story homes.',
      'Most of those houses date from the 1970s through the 1990s and sit on slabs. Kitchens and baths have often been updated one piece at a time, so one room can mix decades.',
      'Alief is part of Houston, not a separate city hall. Associations exist in some subdivisions and not in others.',
      'Keegans Bayou and the wider Brays Bayou drainage run through this part of southwest Houston. Heavy rain floods streets, and some low blocks have taken storm water.',
      'Lots are ordinary suburban lots. There is usually a driveway to stage materials, which a street inside the Loop does not always allow.',
      'We do not treat Alief as a single remodel package. The house south of 77082 is the scope.',
    ],
  },
  'Energy Corridor': {
    neighbors: ['westchase', 'memorial', 'katy'],
    landmark: 'Interstate 10 at Eldridge Parkway',
    lat: 29.7846,
    lng: -95.6235,
    direction: 'north of the office',
    roads: 'Highway 6 north to I-10',
    foundation: 'slab',
    weather: 'bayou',
    authority: 'houston',
    trees: false,
    hoa: 'mixed',
    housingShort: 'corridor slab houses',
    lines: [
      'The Energy Corridor is the I-10 district on the west side, with houses, townhomes, and apartments between the office towers.',
      'Residential stock mixes 1960s and 1970s houses, later townhomes, and newer infill. Slabs are the normal foundation.',
      'Terry Hershey Park and Buffalo Bayou run through the district. Low ground along the bayou has flooded in past tropical storms, including when the upstream reservoirs released.',
      'Many townhome communities have an association that reviews exterior changes. A kitchen inside a house is usually outside that review.',
      'The office is south of the corridor, in 77082 near George Bush Park. There is no separate corridor showroom.',
      'A townhome and a single-family house a block apart are different scopes. The district name does not pick the scope.',
    ],
  },
  Katy: {
    neighbors: ['cinco-ranch', 'energy-corridor', 'bear-creek'],
    landmark: 'downtown Katy',
    lat: 29.785786,
    lng: -95.824396,
    direction: 'west of the office',
    roads: 'I-10 or the Westpark Tollway',
    foundation: 'post-tension',
    weather: 'creek',
    authority: 'zoned-city',
    trees: false,
    hoa: 'usual',
    housingShort: 'newer post-tension houses',
    lines: [
      'Katy is an older town center and a wide band of master-planned subdivisions along I-10 and the Grand Parkway.',
      'The newer houses are open two-story plans on slabs, and this era is often post-tension, with cables in the concrete. The older town center is not the same construction.',
      'Associations are typical in the master-planned sections and usually review roofs, fences, paint, and sometimes driveways. They rarely govern a cabinet layout inside the house.',
      'Detention ponds are how many of these subdivisions hold rain. They are not a promise that a street will never flood. Creek-side sections have taken storm water.',
      'Lots are suburban, with driveways that can take a dumpster or a slab delivery more easily than a street inside the Loop.',
      'Downtown Katy and a new section near the Grand Parkway are both “Katy” on a map and not the same house.',
    ],
  },
  'Sugar Land': {
    neighbors: ['stafford', 'richmond', 'alief'],
    landmark: 'Sugar Land Town Square',
    lat: 29.5984,
    lng: -95.6226,
    direction: 'south of the office',
    roads: 'Highway 6 or the Fort Bend Tollway',
    foundation: 'post-tension',
    weather: 'creek',
    authority: 'zoned-city',
    trees: false,
    hoa: 'usual',
    housingShort: 'two-story slab houses',
    lines: [
      'Sugar Land is a Fort Bend city of master-planned neighborhoods, from First Colony onward, with an older core tied to the Imperial Sugar site and Town Square.',
      'The common house is a two-story plan from the 1980s through the 2010s on a slab. Newer ones are often post-tension. Kitchens and primary baths were built as large rooms.',
      'The city has its own permitting. Neighborhood associations are widespread and usually review exterior materials, roof color, and yard structures.',
      'Drainage runs toward Oyster Creek and, farther west, the Brazos. Some neighborhoods sit nearer a floodplain than others.',
      'Streets in the planned sections are wide enough for a crew, which is a practical difference from a bungalow block inside the Loop.',
      'First Colony and a later section are both Sugar Land. The roof shape repeats. The house we climb is still one address.',
    ],
  },
  Bellaire: {
    neighbors: ['west-university', 'houston', 'galleria-area'],
    landmark: 'Bellaire City Hall',
    lat: 29.705786,
    lng: -95.458816,
    direction: 'east of the office',
    roads: 'the Westpark Tollway or Bellaire Boulevard',
    foundation: 'mixed',
    weather: 'bayou',
    authority: 'zoned-city',
    trees: true,
    hoa: 'light',
    housingShort: 'rebuilds on small lots',
    lines: [
      'Bellaire is its own city inside the Loop, with mid-century houses and a long run of teardowns and custom rebuilds on smaller lots.',
      'Older houses may be pier-and-beam or early slabs, and a rebuilt house is often a new slab. An addition sometimes joins the two.',
      'The city has zoning and its own permits, which is different from Houston next door. The city code can touch a street elevation.',
      'Brays Bayou runs along the area, and parts of Bellaire have flooded in tropical storms. Blocks farther from the bayou did not all take the same water.',
      'Lots are tight. A dumpster, a lumber stack, or a stone slab has to fit a short driveway and a narrow street.',
      'Rooms in the older houses are often out of square. We measure before we talk about moving a wall.',
    ],
  },
  Memorial: {
    neighbors: ['energy-corridor', 'bunker-hill', 'hunters-creek'],
    landmark: 'Memorial City',
    lat: 29.7802,
    lng: -95.5417,
    direction: 'east of the office',
    roads: 'Memorial Drive or I-10',
    foundation: 'slab',
    weather: 'bayou',
    authority: 'mixed-cities',
    trees: true,
    hoa: 'mixed',
    housingShort: 'large two-story houses',
    lines: [
      'Memorial is the large-lot area along Memorial Drive between the Energy Corridor and the Loop, mostly two-story houses rather than bungalows.',
      'Houses commonly date from the 1950s through the 1980s, with renovations and some rebuilds since. Slab foundations are the usual construction. Roofs and primary baths are bigger than on a one-story ranch.',
      'Mature oaks shade a lot of these roofs. Limbs, leaves in the valleys, and damp shade belong in any roof conversation.',
      'Much of Memorial is in the City of Houston. Bunker Hill, Piney Point, and Hunters Creek are separate cities beside it, with their own permits.',
      'Low ground along Buffalo Bayou has flooded when the bayou rose. Houses set higher on the same street did not necessarily take water.',
      'Some streets add private deed restrictions aimed at the elevation. Interior work is usually a different question from a new roof.',
    ],
  },
  'Spring Branch': {
    neighbors: ['memorial', 'the-heights', 'energy-corridor'],
    landmark: 'Long Point at Gessner',
    lat: 29.8032,
    lng: -95.5285,
    direction: 'northeast of the office',
    roads: 'I-10 toward Gessner',
    foundation: 'mixed',
    weather: 'citywide',
    authority: 'houston',
    trees: false,
    hoa: 'light',
    housingShort: 'ranch houses and infill',
    lines: [
      'Spring Branch sits west of the Loop along Long Point, a mix of postwar ranch houses and newer infill townhomes.',
      'The older ranches are a transition era: some pier-and-beam, many early slabs, and additions that may not match the original foundation. Infill is usually slab.',
      'It is inside the City of Houston. A few subdivisions have deed restrictions. There is no single Spring Branch association.',
      'Kitchens in the ranches are often still the closed postwar room, unless a later remodel opened them.',
      'Lots range from the original ranch lot to a townhome pad. Staging follows whichever one the address is.',
      'Clay soil and flat drainage are the same regional facts as the rest of the west side. We look at the floor and the grade at the house.',
    ],
  },
  'The Heights': {
    neighbors: ['spring-branch', 'houston', 'river-oaks'],
    landmark: '19th Street at Yale',
    lat: 29.8024,
    lng: -95.3992,
    direction: 'east of the office',
    roads: 'I-10 east, then north of downtown',
    foundation: 'pier',
    weather: 'bayou',
    authority: 'houston',
    trees: true,
    hoa: 'light',
    housingShort: 'pier-and-beam bungalows',
    lines: [
      'The Heights is the neighborhood north of downtown known for bungalows and cottages from the early twentieth century through the 1940s, plus newer infill houses and townhomes.',
      'The older houses are typically pier-and-beam, with a crawlspace. That crawlspace can make a plumbing move more direct than cutting a slab, and the old walls still decide whether a kitchen can open up.',
      'Parts of the Heights are in a City of Houston historic district. Exterior changes on those blocks follow the district rules. Interior built-ins usually do not.',
      'Streets near White Oak Bayou have flooded. Much of the bungalow grid sits off the lowest bank. Tight streets affect deliveries and roof staging.',
      'Rooms are small, trim profiles are often original, and walls are frequently out of square. New work either matches that trim or it looks stuck on.',
      'The trip from 77082 is cross-town. We schedule it from the west Houston office, and the house on the block is still the scope.',
    ],
  },
  'River Oaks': {
    neighbors: ['upper-kirby', 'houston', 'galleria-area'],
    landmark: 'River Oaks Boulevard at Kirby',
    lat: 29.7525,
    lng: -95.4185,
    direction: 'east of the office',
    roads: 'Westheimer or San Felipe',
    foundation: 'mixed',
    weather: 'bayou',
    authority: 'houston',
    trees: true,
    hoa: 'mixed',
    housingShort: 'large formal houses',
    lines: [
      'River Oaks is the estate neighborhood inside the Loop, with large houses, formal rooms, and more millwork than a suburban plan.',
      'Older houses are often pier-and-beam. Later construction and additions may sit on slab. Lots are deep, and the roofs are large, with mature trees over them.',
      'Private deed restrictions are part of the neighborhood. They tend to care about what the street sees. A bathroom inside the house is a different project from a new elevation.',
      'Buffalo Bayou is the northern edge. Low sections near the bayou have a different flood history from houses in the middle of the neighborhood.',
      'Access for a dumpster on a narrow interior street with old oaks is a planning item. We measure that on the visit.',
      'Millwork and formal rooms mean new trim either matches the house or it reads as a later insert.',
    ],
  },
  'West University': {
    neighbors: ['bellaire', 'rice-village', 'medical-center'],
    landmark: 'West University Place City Hall',
    lat: 29.7176,
    lng: -95.4339,
    direction: 'east of the office',
    roads: 'the Westpark Tollway',
    foundation: 'mixed',
    weather: 'bayou',
    authority: 'zoned-city',
    trees: true,
    hoa: 'light',
    housingShort: 'cottages and rebuilds',
    lines: [
      'West University Place is its own zoned city south of the Loop, with small lots, older cottages, and many rebuilt houses.',
      'Original houses may be pier-and-beam. The rebuilds are commonly slab. Kitchens and powder rooms stay compact even when the new house is bigger than the cottage it replaced.',
      'The city issues its own permits, separate from Houston. Exterior work follows that code. Older interior trim is often worth matching when it still belongs to the house.',
      'The city is near Brays Bayou. Flood history here is block by block, not a single West University story.',
      'Streets are tight and trees are mature. A material delivery has to fit the lot, on a roof as much as on a stone slab.',
      'Out-of-square rooms show up in the cottages. A rebuild is a different measuring job from the house it replaced.',
    ],
  },
  'Galleria Area': {
    neighbors: ['memorial', 'upper-kirby', 'bellaire'],
    landmark: 'the Galleria',
    lat: 29.7403,
    lng: -95.4619,
    direction: 'east of the office',
    roads: 'Westheimer',
    foundation: 'slab',
    weather: 'citywide',
    authority: 'houston',
    trees: false,
    hoa: 'mixed',
    housingShort: 'townhomes and houses',
    lines: [
      'The Galleria area, around Post Oak and Westheimer, mixes townhomes, older houses, and high-rise streets. It is not a suburb of one floor plan.',
      'The houses and townhomes are mostly slab-era construction, from mid-century stock through later infill.',
      'A townhome association is common. A single-family street nearby may only have deed restrictions, or none you can see from the curb.',
      'Lots that still hold a house are smaller than Memorial lots. Staging a tear-off or a dumpster shares the street with a busy commercial district.',
      'This is City of Houston territory. Wind, hail, and hard rain are the regional weather, and we still ask where water has entered the building.',
      'Interior work here is often in a townhome: a shared wall, an association on the exterior, and a floor plan that cannot borrow the neighbor’s square footage.',
    ],
  },
  'Upper Kirby': {
    neighbors: ['river-oaks', 'rice-village', 'galleria-area'],
    landmark: 'Kirby Drive at Westheimer',
    lat: 29.7428,
    lng: -95.4186,
    direction: 'east of the office',
    roads: 'Westheimer past the Galleria',
    foundation: 'mixed',
    weather: 'citywide',
    authority: 'houston',
    trees: true,
    hoa: 'mixed',
    housingShort: 'houses and townhomes',
    lines: [
      'Upper Kirby runs along Kirby Drive inside the Loop, a mix of older houses, newer townhomes, and small lots between River Oaks and the Rice area.',
      'Foundations vary with the age of the building. Older houses may be pier-and-beam. Townhomes and rebuilds are usually slab.',
      'It is the City of Houston. Some streets have deed restrictions. Townhome associations, where they exist, usually watch the street elevation.',
      'Rooms in the older houses are modest. New townhomes are tall and narrow. Those are different stair and trim problems.',
      'Trees and tight parking affect deliveries. We plan the material drop on the visit, not from a suburban driveway.',
      'The drive from 77082 is Westheimer across town. The scope is still the building on Kirby or the street just off it.',
    ],
  },
  'Rice Village': {
    neighbors: ['west-university', 'upper-kirby', 'medical-center'],
    landmark: 'Rice Village',
    lat: 29.7168,
    lng: -95.4155,
    direction: 'east of the office',
    roads: 'the Westpark Tollway or US-59',
    foundation: 'pier',
    weather: 'bayou',
    authority: 'houston',
    trees: true,
    hoa: 'light',
    housingShort: 'older pier-and-beam cottages',
    lines: [
      'Rice Village is the shopping streets near Rice Boulevard and Kirby, surrounded by older bungalows and cottages and some newer infill.',
      'The older houses are commonly pier-and-beam, with original trim and rooms that were not built as one open plan. Infill next door may be a slab townhome.',
      'This is Houston, near West University but not the same city hall. Many blocks have an older character without sitting in a formal historic district. We check before exterior work.',
      'Brays Bayou is not far south. Flood exposure is uneven across these blocks.',
      'Kitchens are often still small, and trim wants to be matched if it stays. A new cabinet that ignores the casing looks like it arrived from another house.',
      'Deliveries compete with Village traffic. We plan the drop for the cottage lot, not for a cul-de-sac.',
    ],
  },
  'Medical Center': {
    neighbors: ['rice-village', 'west-university', 'bellaire'],
    landmark: 'the Texas Medical Center',
    lat: 29.7066,
    lng: -95.3984,
    direction: 'east of the office',
    roads: 'the Westpark Tollway or US-59 toward Holcombe',
    foundation: 'slab',
    weather: 'bayou',
    authority: 'houston',
    trees: false,
    hoa: 'mixed',
    housingShort: 'mid-century slab houses',
    lines: [
      'The Medical Center area is the neighborhoods beside the Texas Medical Center: mid-century and later houses and townhomes, plus apartments.',
      'Slab foundations are the norm. The houses are everyday family houses, even with the medical campus next door.',
      'The area is in Houston, near Brays Bayou. Some residential blocks have a flood history. Others are older slab houses with ordinary wear.',
      'Townhome associations appear in later construction. A single-family ranch from the middle of the century usually does not have a design committee.',
      'Parking and tight lots near the hospitals affect where a dumpster can sit. We plan that at the address.',
      'The drive from the west Houston office follows the tollway or US-59. The visit is the house, not the hospital campus.',
    ],
  },
  'Bunker Hill': {
    neighbors: ['memorial', 'piney-point', 'hunters-creek'],
    landmark: 'Bunker Hill Village City Hall',
    lat: 29.7689,
    lng: -95.5362,
    direction: 'east of the office',
    roads: 'Memorial Drive or I-10',
    foundation: 'slab',
    weather: 'bayou',
    authority: 'village',
    trees: true,
    hoa: 'mixed',
    housingShort: 'large wooded-lot houses',
    lines: [
      'Bunker Hill Village is one of the Memorial villages, an independent city of larger houses on wooded lots west of the Loop.',
      'The houses are mostly slab-built, from the village’s postwar growth through later rebuilds. Roofs are substantial. Primary suites are large.',
      'The city has its own permits, separate from Houston. Tree cover and the village rules are part of planning a roof, siding, or a street-facing change.',
      'Oaks over the roof are normal. A tear-off has to deal with access under those limbs and with valleys on a house bigger than a ranch.',
      'Buffalo Bayou and the larger Memorial drainage story sit nearby. The village name does not tell us the elevation of one lot.',
      'Interior remodeling still follows the building code. The village review is aimed at what the street and the trees see.',
    ],
  },
  'Piney Point': {
    neighbors: ['hunters-creek', 'bunker-hill', 'memorial'],
    landmark: 'Piney Point Village',
    lat: 29.7489,
    lng: -95.5172,
    direction: 'east of the office',
    roads: 'Memorial Drive',
    foundation: 'slab',
    weather: 'bayou',
    authority: 'village',
    trees: true,
    hoa: 'mixed',
    housingShort: 'large-lot slab houses',
    lines: [
      'Piney Point Village is a small independent city of large-lot houses west of the Loop, between the other Memorial villages.',
      'Homes are large, often with long roof planes and big primary baths, on slabs typical of this part of the west side. Later rebuilds are larger still.',
      'Permits come from the village. Some properties add private restrictions on top of the city code.',
      'Mature trees and long driveways change staging. A roof crew and a stone delivery both have to fit the lot we see.',
      'More roof planes and more penetrations mean more flashing to inspect. The sky is the same sky as Memorial. The roof is bigger.',
      'We schedule Piney Point from 77082. The scope is the house on that lot, including the length of the ridge.',
    ],
  },
  'Hunters Creek': {
    neighbors: ['piney-point', 'bunker-hill', 'memorial'],
    landmark: 'Hunters Creek Village',
    lat: 29.7694,
    lng: -95.4995,
    direction: 'east of the office',
    roads: 'Memorial Drive or San Felipe',
    foundation: 'slab',
    weather: 'bayou',
    authority: 'village',
    trees: true,
    hoa: 'mixed',
    housingShort: 'wooded village houses',
    lines: [
      'Hunters Creek Village is the Memorial village along Memorial Drive and Voss, an independent city of larger houses under mature trees.',
      'Slab houses with big roofs are the pattern, from mid-century builds through later renovations. The trees and the setbacks are part of the lot.',
      'The village issues permits. Exterior materials can also fall under deed restrictions. Interior remodeling is mostly the owner and the building code.',
      'Shade holds moisture on a roof and drops debris in valleys. That is an inspection item.',
      'These are not bungalows. Staging, dumpsters, and the length of the ridge are sized to the house in front of us.',
      'The drive from the office follows Memorial Drive or San Felipe. Traffic changes the time. It does not change the roof.',
    ],
  },
  'Bear Creek': {
    neighbors: ['energy-corridor', 'katy', 'westchase'],
    landmark: 'Bear Creek Pioneers Park',
    lat: 29.8275,
    lng: -95.641,
    direction: 'north of the office',
    roads: 'Highway 6 toward Clay Road',
    foundation: 'slab',
    weather: 'reservoir',
    authority: 'houston',
    trees: false,
    hoa: 'light',
    housingShort: 'suburban slab houses',
    lines: [
      'Bear Creek is the west Houston neighborhood beside Bear Creek Pioneers Park, Clay Road, and Highway 6, near Addicks and Barker reservoirs.',
      'The houses are suburban slab homes, largely from the 1970s through the 1990s, on ordinary lots with driveways.',
      'In extreme storms those reservoir pools have risen into nearby subdivisions. Not every street is inside that pool.',
      'A water conversation here starts with the elevation of the lot and where the water came from, not with the neighborhood name.',
      'Depending on the block, the address is in Houston or on the edge of unincorporated Harris County. We confirm who permits it.',
      'Associations are present in some sections only. Hail, wind, and hard rain match the rest of the west side. The reservoir history is the local difference.',
    ],
  },
  'Cinco Ranch': {
    neighbors: ['katy', 'richmond', 'energy-corridor'],
    landmark: 'Cinco Ranch Boulevard at Fry Road',
    lat: 29.7475,
    lng: -95.779,
    direction: 'west of the office',
    roads: 'Westheimer Parkway or Fry Road',
    foundation: 'post-tension',
    weather: 'creek',
    authority: 'mixed-cities',
    trees: false,
    hoa: 'usual',
    housingShort: 'master-planned slab houses',
    lines: [
      'Cinco Ranch is a master-planned community on the Katy side, begun in the early 1990s, with open kitchens and two-story plans across many sections.',
      'Houses sit on slabs, and this era is typically post-tension. A shower or a kitchen sink that has to move starts with locating the cables before concrete is cut.',
      'The association’s architectural rules cover a lot of exterior work: roof color, paint, fences, and often a patio or a deck. Interior finishes are usually the owner’s choice.',
      'Cinco Ranch is closer to the 77082 office than downtown Katy is. The drive uses Westheimer Parkway or Fry Road.',
      'Detention ponds and curbs handle ordinary rain. They do not make a lot flood-proof. We still ask what the house has seen.',
      'Garages and driveways make staging simpler than on a Heights street. The roof shapes repeat, and the one we price is the one we climb.',
    ],
  },
  Stafford: {
    neighbors: ['sugar-land', 'alief', 'richmond'],
    landmark: 'Stafford City Hall',
    lat: 29.6163,
    lng: -95.5577,
    direction: 'south of the office',
    roads: 'Highway 6 or US-90A',
    foundation: 'slab',
    weather: 'creek',
    authority: 'zoned-city',
    trees: false,
    hoa: 'mixed',
    housingShort: 'mixed-age slab houses',
    lines: [
      'Stafford is a small city southwest of Houston, along US-90A and the Southwest Freeway, with suburban houses from several decades and a commercial strip.',
      'Most houses are slab homes on modest lots. A 1970s ranch and a later two-story on the next street are both common.',
      'The city has its own permits. Associations show up in some subdivisions and not in others.',
      'Drainage is the southwest pattern: flat streets, heavy rain, and ditches or bayous. We ask about the house.',
      'The permit desk is Stafford’s, not the City of Houston’s. The visit is otherwise the same kind of look at the building.',
      'Staging fits a suburban driveway more often than it fits an inside-the-Loop curb.',
    ],
  },
  Richmond: {
    neighbors: ['sugar-land', 'cinco-ranch', 'stafford'],
    landmark: 'the Fort Bend County Courthouse',
    lat: 29.5822,
    lng: -95.7602,
    direction: 'southwest of the office',
    roads: 'US-90A or the Grand Parkway',
    foundation: 'mixed',
    weather: 'creek',
    authority: 'zoned-city',
    trees: false,
    hoa: 'mixed',
    housingShort: 'old and new houses',
    lines: [
      'Richmond is the Fort Bend County seat, with a nineteenth-century downtown by the courthouse and newer subdivisions toward the Grand Parkway.',
      'The old town and the new sections are different houses. Newer subdivisions are slab, often post-tension, and look closer to Katy or Sugar Land than to the courthouse square.',
      'The city permits work inside its limits. Master-planned sections add association review for exteriors. The historic center is not an association street.',
      'The Brazos River is the western geography. Floodplain questions are real on some tracts and irrelevant on others.',
      'Some newer neighborhoods are closer to the office than the courthouse is. We measure the address, not the square.',
      'An open-plan kitchen in a new section and a wall in an older house near downtown are not the same layout conversation.',
    ],
  },
  Pearland: {
    neighbors: ['medical-center', 'clear-lake', 'stafford'],
    landmark: 'Pearland Town Center',
    lat: 29.5445,
    lng: -95.3945,
    direction: 'southeast of the office',
    roads: 'Beltway 8 and the southern freeways',
    foundation: 'post-tension',
    weather: 'creek',
    authority: 'zoned-city',
    trees: false,
    hoa: 'usual',
    housingShort: 'newer slab subdivisions',
    lines: [
      'Pearland is the large suburban city south of Houston, much of it built from the 1990s through the 2010s, with an older town and master-planned sections such as Shadow Creek Ranch.',
      'Newer houses are slab, commonly post-tension, with open first floors. We treat a drain move as post-tension until we confirm the slab is not.',
      'The city issues permits. Associations are standard in the master-planned neighborhoods and review exterior changes.',
      'The drive from 77082 is longer than the drive to Sugar Land. Beltway 8 or the southern freeways are the usual routes.',
      'Clear Creek’s watershed reaches parts of the city. Some neighborhoods have taken tropical-storm water and many houses have not. Detention ponds are common in later sections.',
      'Lots and garages are suburban, so staging is straightforward. Repeated roof shapes still get climbed one at a time.',
    ],
  },
  'Clear Lake': {
    neighbors: ['pearland', 'texas-city', 'galveston'],
    landmark: 'Johnson Space Center',
    lat: 29.5583,
    lng: -95.09,
    direction: 'southeast of the office',
    roads: 'Beltway 8 and I-45',
    foundation: 'slab',
    weather: 'coastal',
    authority: 'mixed-cities',
    trees: false,
    hoa: 'mixed',
    housingShort: 'bay-side slab houses',
    lines: [
      'Clear Lake is the southeast Houston communities around the lake and near Johnson Space Center, mostly suburban houses from the NASA years onward.',
      'Slab foundations are typical, in one-story and two-story plans. Humidity here is Gulf air, with bay weather on top of it.',
      'Much of the area is inside Houston, with smaller cities beside it. We confirm which city permits the address.',
      'The drive from 77082 follows Beltway 8 and I-45 and is one of the longer trips we schedule. The straight-line distance understates the drive.',
      'Bay flooding and wind are the coastal risk, different from a street flood in Katy. Thunderstorms still happen. Wind matters more here than it does inland.',
      'Associations exist in some subdivisions. Exterior metal, fasteners, and paint live in bay air. Interior work, once the weather is kept out, is the room and the slab.',
    ],
  },
  Baytown: {
    neighbors: ['texas-city', 'houston', 'clear-lake'],
    landmark: 'Baytown City Hall',
    lat: 29.7355,
    lng: -94.9774,
    direction: 'east of the office',
    roads: 'I-10 east',
    foundation: 'mixed',
    weather: 'coastal',
    authority: 'zoned-city',
    trees: false,
    hoa: 'mixed',
    housingShort: 'east-side slab houses',
    lines: [
      'Baytown is the city east of Houston along the Ship Channel, with older neighborhoods, newer subdivisions, and its own city hall.',
      'Foundations in the subdivisions are mostly slab. Older streets can mix eras. We look before we describe the house as new construction.',
      'The city permits its own work. Associations show up in some newer sections, not on every older block.',
      'The drive is I-10 east, and it is a long one from 77082. We schedule it as a trip, not as a west-side stop.',
      'Hurricane wind, heavy rain, and the channel’s drainage are the context. Cedar Bayou country floods differently from a west-side street.',
      'Rising water and a wind-damaged roof are different insurance questions. Your insurer decides which policy responds. We photograph and do the work you hire.',
    ],
  },
  Galveston: {
    neighbors: ['texas-city', 'clear-lake', 'baytown'],
    landmark: 'the Galveston Seawall',
    lat: 29.2966,
    lng: -94.7977,
    direction: 'southeast of the office',
    roads: 'I-45 south',
    foundation: 'raised',
    weather: 'coastal',
    authority: 'zoned-city',
    trees: false,
    hoa: 'mixed',
    housingShort: 'raised coastal houses',
    lines: [
      'Galveston is a barrier island. Houses include nineteenth-century buildings raised on piers, beach houses, and later construction built for wind and water.',
      'A Heights bungalow on pier-and-beam and a Galveston house on piers are both raised, and they are not the same structure. Island houses are elevated for surge and wind. Fasteners and exterior metals live in salt air.',
      'The city permits island work. Parts of the island, including blocks near the Strand and the East End, sit in historic districts. Exterior changes there follow those rules.',
      'The drive is I-45 south from 77082 and is longer than a straight line to the Seawall. It is the far end of the area we schedule.',
      'A wind policy and a flood policy are often separate. We photograph damage and build what you hire. We do not decide coverage.',
      'Elevation changes the walk from the street to the door and the way a roof is staged. We price the house we climb, including the height.',
    ],
  },
  'Texas City': {
    neighbors: ['galveston', 'clear-lake', 'baytown'],
    landmark: 'downtown Texas City',
    lat: 29.3838,
    lng: -94.9027,
    direction: 'southeast of the office',
    roads: 'I-45 south',
    foundation: 'slab',
    weather: 'coastal',
    authority: 'zoned-city',
    trees: false,
    hoa: 'light',
    housingShort: 'everyday bay houses',
    lines: [
      'Texas City sits on Galveston Bay, with the dike, the refineries, and residential streets of mostly slab suburban houses.',
      'Wind off the bay and hurricane exposure are part of a roof or a siding project. The houses are everyday slabs, not Galveston houses on historic piers, though elevation rules can still apply near the water.',
      'The city has its own permits. Associations are limited to some subdivisions.',
      'The drive from 77082 is I-45 south, longer than the straight line to downtown Texas City.',
      'Surge and bay flooding are the water story. A supply-line leak inside a slab house is a different visit from storm water that rose from the street.',
      'Humidity and salt influence exterior fasteners and paint. Interior work is the slab and the room once the weather is kept out.',
    ],
  },
  'The Woodlands': {
    neighbors: ['magnolia', 'spring-branch', 'houston'],
    landmark: 'The Woodlands Waterway',
    lat: 30.1602,
    lng: -95.4556,
    direction: 'north of the office',
    roads: 'the Beltway to I-45, or the Grand Parkway',
    foundation: 'post-tension',
    weather: 'creek',
    authority: 'township',
    trees: true,
    hoa: 'usual',
    housingShort: 'canopied village houses',
    lines: [
      'The Woodlands is a master-planned community begun in 1974, organized in villages from Grogan’s Mill outward, mostly in Montgomery County, under a pine canopy.',
      'Houses are larger suburban plans with open kitchens. Older village sections and newer sections share the trees and the covenants more than they share a construction year. Slabs are standard, and newer houses are often post-tension.',
      'The township, the village associations, and the deed covenants are real. Exterior color, roofing, fences, and tree work can require approval. A bathroom inside the house usually does not go through that architectural review.',
      'The drive from 77082 uses the Beltway and I-45, or the Grand Parkway, and it takes longer than a straight line to the Waterway.',
      'Pines over the roof drop needles and limbs and hold shade. After a storm, a roof visit here often starts with trees as well as shingles. This is wind, hail, and rain, not Galveston surge.',
      'Creeks such as Panther Branch and Spring Creek touch parts of the community. Most houses are on wooded lots with detention in the plan. We ask about water at the address.',
    ],
  },
  Magnolia: {
    neighbors: ['the-woodlands', 'katy', 'houston'],
    landmark: 'downtown Magnolia',
    lat: 30.2094,
    lng: -95.7502,
    direction: 'northwest of the office',
    roads: 'Highway 290 or the Grand Parkway to FM 1488',
    foundation: 'post-tension',
    weather: 'creek',
    authority: 'zoned-city',
    trees: true,
    hoa: 'mixed',
    housingShort: 'larger-lot slab houses',
    lines: [
      'Magnolia is a smaller city northwest of Houston, with a historic downtown and newer subdivisions and acreage lots along FM 1488 and the 249 corridor.',
      'The new houses are slab plans, often post-tension, on larger lots than a lot inside the Loop. Older houses near downtown are a different building.',
      'The city permits work inside the city limits. Many new subdivisions add association rules for exteriors. An acreage tract may have neither an association nor a tight setback.',
      'The drive uses Highway 290 or the Grand Parkway to FM 1488 and is longer than the straight line from 77082.',
      'Storms here are inland: wind, hail, and heavy rain. Tree debris on a roof is a common reason for the visit. Surge is not the issue.',
      'We schedule Magnolia from the Houston office. A longer driveway on an acreage lot changes staging, and we look at that before materials are ordered.',
    ],
  },
};

function straightMiles(lat: number, lng: number) {
  const R = 3958.8;
  const toRad = Math.PI / 180;
  const lat1 = site.geo.latitude * toRad;
  const dLat = (lat - site.geo.latitude) * toRad;
  const dLon = (lng - site.geo.longitude) * toRad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat * toRad) * Math.sin(dLon / 2) ** 2;
  return Math.max(1, Math.round(2 * R * Math.asin(Math.sqrt(h))));
}

function wordCountOf(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export const areaProfiles: readonly AreaProfile[] = site.serviceArea.map((name) => {
  const data = raw[name];
  if (!data) throw new Error(`Missing area profile for ${name}`);
  return {
    name,
    slug: areaSlug(name),
    priority: priority.has(name),
    ...data,
  };
});

const bySlug = new Map(areaProfiles.map((area) => [area.slug, area]));

export function getAreaProfile(slug: string) {
  return bySlug.get(slug);
}

export function areaMiles(area: AreaProfile) {
  return straightMiles(area.lat, area.lng);
}

const profileErrors: string[] = [];
if (areaProfiles.length !== site.serviceArea.length) {
  profileErrors.push('Area profile count does not match service areas');
}
for (const area of areaProfiles) {
  if (wordCountOf(area.housingShort) > 4) {
    profileErrors.push(`${area.slug} housingShort is longer than 4 words`);
  }
  const seen = new Set<string>();
  for (const line of area.lines) {
    if (seen.has(line)) profileErrors.push(`${area.slug} repeats a line`);
    seen.add(line);
    if (wordCountOf(line) < 12) profileErrors.push(`${area.slug} line is thin`);
  }
  for (const neighbor of area.neighbors) {
    if (neighbor === area.slug) profileErrors.push(`${area.slug} neighbors itself`);
    if (!bySlug.has(neighbor)) profileErrors.push(`${area.slug} missing neighbor ${neighbor}`);
  }
}
if (profileErrors.length > 0) {
  throw new Error(profileErrors.join('\n'));
}
