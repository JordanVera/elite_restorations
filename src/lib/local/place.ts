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
      return 'Concrete slabs are the usual foundation.';
    case 'mixed':
      return 'Pier-and-beam houses and slab houses are both common, sometimes on the same street.';
    case 'post-tension':
      return 'Newer slabs are often post-tension, with cables in the concrete.';
    case 'raised':
      return 'Many houses are raised for wind and water, which is a different structure from a Houston slab.';
    default:
      return 'The foundation is confirmed at the address.';
  }
}

function weatherFact(weather: Weather) {
  switch (weather) {
    case 'bayou':
      return 'Bayous and flat streets pond in hard rain. Hurricane season runs from June 1 through November 30.';
    case 'reservoir':
      return 'Low ground near the Addicks and Barker pools has taken storm water. Higher pads have not all seen the same water.';
    case 'coastal':
      return 'Coastal wind and salt air are part of exterior work. Hurricane season runs from June 1 through November 30.';
    case 'creek':
      return 'Creeks and detention ponds hold rain. A pond is not a promise that a street never floods.';
    case 'citywide':
      return 'Flat clay, street flooding in hard rain, spring hail, and tropical storms are the regional weather.';
    default:
      return 'Spring hail and tropical rain are the regional storms.';
  }
}

function interiorCut(area: AreaProfile) {
  switch (area.foundation) {
    case 'pier':
      return 'A drain in a pier-and-beam house can move through the crawlspace. The old walls still decide whether a room can open.';
    case 'post-tension':
      return 'Moving a drain means locating the cables in the slab before anyone cuts. A remodel that keeps the fixtures in place does not need that cut.';
    case 'raised':
      return 'The height of the house changes how materials reach the room. The plumbing is still traced at the address.';
    case 'mixed':
      return 'One house can be pier-and-beam and the next a slab. We look before we say a sink or a shower can move.';
    default:
      return 'On a slab, a sink or a shower that has to move means cutting concrete. A same-place remodel leaves the drain where it is.';
  }
}

function tradeLine(slug: string) {
  const lines: Record<string, string> = {
    'kitchen-remodeling':
      'On a kitchen, the path from the sink to the range is settled before demolition.',
    'bathroom-remodeling': 'On a bath, waterproofing goes in before the finish tile.',
    backsplash: 'On a backsplash, the pattern is centered before the tile is set in mortar.',
    countertops: 'On a counter, the template is taken from the cabinets that are actually set.',
    'wood-flooring': 'On a wood floor, new boards acclimate in the house before they are fastened.',
    'tile-flooring': 'On a tile floor, the substrate has to be flat, and a wet room is waterproofed first.',
    'vinyl-flooring': 'On vinyl, the slab or the wood underneath has to be flat and dry.',
    'laminate-flooring':
      'On laminate, the boxes acclimate in the house, and a bath stays a tile floor.',
    carpentry: 'On carpentry, trim and built-ins are sized to the wall that is there.',
    'tile-fireplaces': 'On a fireplace, the surround is heat-rated even if the firebox is rarely lit.',
    roofing: 'On a roof, every slope is photographed before anyone says a repair will hold.',
    'roof-replacement':
      'On a replacement, tear-off is how the wood underneath is seen, and soft boards are called out then.',
    'roofing-emergency-tarp-repair':
      'On an emergency roof, the cover stops the next rain. It is not the finished roof.',
    siding: 'On siding, a repair is matched to the faded board, not to a chip from the year the house was built.',
    'patios-decks': 'On a deck or a patio, water has to leave the wall, and the footings are part of the job.',
    'water-damage-restoration':
      'On a water call, we map past the stain, then dry the structure before it is rebuilt.',
    'insurance-claims':
      'On a claim file, we photograph what we can see. We are not public adjusters. Your insurer decides coverage.',
    'painting-drywall-repair':
      'On paint and drywall, a wall that was opened for a leak is confirmed dry before it is closed.',
  };
  const line = lines[slug];
  if (!line) throw new Error(`Missing trade line for ${slug}`);
  return line;
}

function kindLine(area: AreaProfile, kind: ServiceKind, variant: number) {
  const clay =
    variant % 2 === 0
      ? 'Clay soil under these houses moves as it wets and dries, so a door or a floor can be out of line even when the street looks flat.'
      : 'Gulf Coast clay under these lots shrinks and swells with moisture. We measure the house instead of assuming the slab or the piers are still where they started.';
  switch (kind) {
    case 'water':
      return variant % 2 === 0
        ? `Gulf humidity is why a dry-out here uses dehumidifiers with the air movers. ${clay} Water that rose from outside and water from a supply line are different visits.`
        : `A wall that feels dry can still read wet at the base. ${clay} We meter past the stain before anything is closed up.`;
    case 'roof':
      return area.trees
        ? `Spring hail bruises shingles, and limbs from the trees here land in valleys. Hurricane season, June 1 through November 30, is when wind-driven rain finds those openings. ${clay}`
        : `Spring hail and, from June 1 through November 30, tropical wind are the storms that mark a roof. South and west slopes age faster. ${clay}`;
    case 'floor':
      return variant % 2 === 0
        ? `Humidity in a Gulf Coast summer is why new wood and laminate boxes sit in the house before they are installed. ${clay} A bath stays a tile floor.`
        : `Vinyl and laminate show a ridge that carpet hid, and wood has to acclimate in the house. ${clay} The floor goes down after the surface under it is flat and dry.`;
    case 'exterior':
      return `South and west walls take more sun and more rain. ${clay} Footings and the way water leaves the wall are planned for this lot, not copied from the next subdivision.`;
    default:
      return variant % 2 === 0
        ? `${interiorCut(area)} ${clay} Cabinets and paint inside the house are usually outside an association review of the street.`
        : `A permit, when plumbing, electrical, or structure moves, follows the legal address. ${clay} ${interiorCut(area)}`;
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
  const houses = `${foundationFact(area.foundation)} The street label "${area.housingShort}" describes the blocks and misses the house.`;
  const weather = weatherFact(area.weather);
  const work = kindLine(area, kind, n);
  const trade = tradeLine(serviceSlug);
  const near = `The visit is the address near ${area.landmark}, not the county line.`;
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
      value: `About ${areaMiles(area)} miles ${area.direction} to ${area.landmark}, along ${area.roads}.`,
    },
  ];
}
