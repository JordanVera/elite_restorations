import { areaMiles, type AreaProfile, type Foundation, type Weather } from '@/lib/local/areas';
import { hashString } from '@/lib/local/speak';

export type ServiceKind = 'water' | 'roof' | 'floor' | 'interior' | 'exterior';

export function serviceKind(slug: string): ServiceKind {
  switch (slug) {
    case 'water-damage-restoration':
    case 'insurance-claims':
      return 'water';
    case 'roofing':
    case 'roof-replacement':
    case 'roofing-emergency-tarp-repair':
      return 'roof';
    case 'wood-flooring':
    case 'tile-flooring':
    case 'vinyl-flooring':
    case 'laminate-flooring':
      return 'floor';
    case 'siding':
    case 'patios-decks':
      return 'exterior';
    default:
      return 'interior';
  }
}

function foundationFact(foundation: Foundation) {
  switch (foundation) {
    case 'pier':
      return 'Older houses are often pier-and-beam, with a crawlspace under the floor.';
    case 'slab':
      return 'Most houses sit on a concrete slab.';
    case 'mixed':
      return 'Pier-and-beam houses and slab houses are both common, sometimes on the same street.';
    case 'post-tension':
      return 'Newer slabs often have post-tension cables running through the concrete.';
    case 'raised':
      return 'Many houses are raised for wind and water, which is different from a typical Houston slab.';
    default:
      return 'We confirm the foundation when we see your house.';
  }
}

function weatherFact(weather: Weather) {
  switch (weather) {
    case 'bayou':
      return 'Bayous and flat streets hold water in a hard rain. Hurricane season runs from June 1 through November 30.';
    case 'reservoir':
      return 'Low ground near the Addicks and Barker reservoirs has flooded in past storms. Higher lots nearby have not all seen the same water.';
    case 'coastal':
      return 'Wind off the coast and salt air wear on roofs, siding, and paint. Hurricane season runs from June 1 through November 30.';
    case 'creek':
      return 'Creeks run through parts of the area. Detention ponds help with heavy rain, but low streets can still flood in a big storm.';
    case 'citywide':
      return 'This part of Houston has clay soil, streets that flood in a hard rain, spring hail, and tropical storms.';
    default:
      return 'Spring hail and tropical rain are the regional storms.';
  }
}

function interiorCut(area: AreaProfile) {
  switch (area.foundation) {
    case 'pier':
      return 'In a pier-and-beam house, a drain can often move through the crawlspace. The old walls still decide whether a room can open up.';
    case 'post-tension':
      return 'If a drain has to move, we locate the cables in the slab before anyone cuts the concrete. If the fixtures stay where they are, the slab can stay intact.';
    case 'raised':
      return 'On a raised house, getting materials up to the room is part of the job. We still trace the plumbing at your house.';
    case 'mixed':
      return 'One house can be pier-and-beam and the next one a slab. We look before we say a sink or a shower can move.';
    default:
      return 'On a slab, moving a sink or a shower means cutting concrete. If the fixtures stay put, the drain stays put.';
  }
}

function tradeLine(slug: string) {
  const lines: Record<string, string> = {
    'kitchen-remodeling':
      'For a kitchen, we settle the path from the sink to the range before demolition starts.',
    'bathroom-remodeling': 'For a bathroom, waterproofing goes in before the finish tile.',
    backsplash: 'For a backsplash, we center the pattern before the tile goes into the mortar.',
    countertops: 'For a countertop, we make the template from the cabinets that are actually installed.',
    'wood-flooring': 'New wood stays in the house for a while before we fasten it, so it can adjust to the humidity.',
    'tile-flooring': 'Tile needs a flat floor underneath, and a wet room is waterproofed before the finish tile.',
    'vinyl-flooring': 'Vinyl needs a flat, dry floor underneath, whether that floor is concrete or wood.',
    'laminate-flooring':
      'The laminate stays in the house before we install it, so the planks can adjust to the room.',
    carpentry: 'Trim and built-ins are cut to fit the wall you already have.',
    'tile-fireplaces': 'Fireplace tile is made for heat, even if you rarely light a fire.',
    roofing: 'We photograph every slope before we say whether a repair will hold.',
    'roof-replacement':
      'A replacement starts by taking the old roof off, so we can see the wood and point out anything soft.',
    'roofing-emergency-tarp-repair':
      'An emergency cover keeps the next rain out. It is not a finished roof.',
    siding: 'A siding repair is matched to the faded boards on your house, not to a sample from the year it was built.',
    'patios-decks': 'A deck or patio has to send water away from the wall, and the footings are part of that work.',
    'water-damage-restoration':
      'When water gets in, we follow it past the stain you can see, then dry the structure before we rebuild.',
    'insurance-claims':
      'We document the damage, meet with your adjuster, and work with your insurance company on the scope of repairs as your contractor. We are not public adjusters. Your insurer makes the final coverage decision.',
    'painting-drywall-repair':
      'If a wall was opened because of a leak, we make sure it is dry before we close it and paint.',
  };
  const line = lines[slug];
  if (!line) throw new Error(`Missing trade line for ${slug}`);
  return line;
}

function kindLine(area: AreaProfile, kind: ServiceKind, variant: number) {
  const clay =
    variant % 2 === 0
      ? 'The clay soil under these houses swells when it is wet and shrinks when it dries, so a door can stick or a floor can slope even when the street looks flat.'
      : 'The clay under these lots shrinks and swells with the moisture. We measure your house instead of assuming the slab or the piers have not moved.';
  switch (kind) {
    case 'water':
      return variant % 2 === 0
        ? `Gulf humidity is why drying a house here takes dehumidifiers along with fans. ${clay} Water that came in from outside and water from a supply line are two different jobs.`
        : `A wall can feel dry to your hand and still be wet along the floor. ${clay} We check for moisture past the stain before we close anything up.`;
    case 'roof':
      return area.trees
        ? `Spring hail bruises shingles, and limbs from the trees land in the valleys. From June 1 through November 30, tropical wind can drive rain into those openings. ${clay}`
        : `Spring hail, and tropical wind from June 1 through November 30, are the storms that usually damage a roof here. South and west slopes wear out first. ${clay}`;
    case 'floor':
      return variant % 2 === 0
        ? `In a Gulf Coast summer, new wood and laminate need time in the house before they go down. ${clay} A bathroom stays a tile floor.`
        : `Vinyl and laminate will show a high spot that carpet used to hide, and wood needs time in the house first. ${clay} We install the floor only after the surface under it is flat and dry.`;
    case 'exterior':
      return `South and west walls take more sun and more rain. ${clay} We plan the footings, and the way water leaves the wall, for your yard rather than copying the house next door.`;
    default:
      return variant % 2 === 0
        ? `${interiorCut(area)} ${clay} An association usually reviews what the street sees. Cabinets and interior paint are usually your choice.`
        : `If plumbing, wiring, or structure changes, the permit follows the legal address. ${clay} ${interiorCut(area)}`;
  }
}

/**
 * One local paragraph per service and area. The first sentence names the
 * place and the county. The rest is housing and climate that already describe
 * this part of Houston, applied to the trade.
 */
export function placeParagraph(area: AreaProfile, serviceSlug: string) {
  const kind = serviceKind(serviceSlug);
  const n = hashString(`${serviceSlug}:place:${area.slug}`);
  const county = `${area.name} sits ${area.county}.`;
  const houses = `${foundationFact(area.foundation)} We look at your house before we plan the work, because two homes on the same street can still be built differently.`;
  const weather = weatherFact(area.weather);
  const work = kindLine(area, kind, n);
  const trade = tradeLine(serviceSlug);
  const near = `We come to your home, whether you are near ${area.landmark} or across town.`;
  const templates = [
    `${county} ${houses} ${weather} ${work} ${trade}`,
    `${county} ${trade} ${work} ${weather} ${near}`,
    `${county} ${houses} ${trade} ${work} ${near}`,
    `${county} ${weather} ${houses} ${trade} ${work}`,
  ];
  return templates[n % templates.length] ?? templates[0];
}

export function placeFacts(area: AreaProfile) {
  return [
    { label: 'County', value: `${area.name} sits ${area.county}.` },
    { label: 'Houses', value: `${area.housingShort}. ${foundationFact(area.foundation)}` },
    { label: 'Weather', value: weatherFact(area.weather) },
    {
      label: 'From Houston',
      value: `About ${areaMiles(area)} miles ${area.direction.replace(/ of the office$/, '')} of our office in west Houston (77082), measured to ${area.landmark}. The usual drive is ${area.roads}.`,
    },
  ];
}
