import { areaMiles, getAreaProfile, type AreaProfile } from '@/lib/local/areas';
import { site } from '@/lib/site';

export function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function pick<T>(items: readonly T[], salt: string): T {
  if (items.length === 0) throw new Error(`Nothing to choose for ${salt}`);
  return items[hashString(salt) % items.length] as T;
}

const serviceOrder = [
  'kitchen-remodeling',
  'bathroom-remodeling',
  'backsplash',
  'countertops',
  'wood-flooring',
  'tile-flooring',
  'vinyl-flooring',
  'laminate-flooring',
  'carpentry',
  'tile-fireplaces',
  'roofing',
  'roof-replacement',
  'roofing-emergency-tarp-repair',
  'siding',
  'patios-decks',
  'water-damage-restoration',
  'insurance-claims',
  'painting-drywall-repair',
];

export function placeLine(area: AreaProfile, serviceSlug: string, slot: number) {
  const index = serviceOrder.indexOf(serviceSlug);
  if (index < 0) throw new Error(`Unknown service for place line: ${serviceSlug}`);
  return area.lines[(index * 2 + slot) % area.lines.length] as string;
}

export function neighborNames(area: AreaProfile) {
  return area.neighbors.map((slug) => {
    const neighbor = getAreaProfile(slug);
    if (!neighbor) throw new Error(`Missing neighbor ${slug}`);
    return neighbor.name;
  }) as [string, string, string];
}

export function driveParagraph(
  area: AreaProfile,
  work: string,
  emergency: boolean,
  salt: string,
) {
  const miles = areaMiles(area);
  const street = site.address.streetAddress;
  const zip = site.address.postalCode;
  const phone = site.phone.display;
  const call = emergency
    ? `If water is still coming in, call ${phone} before you do anything else.`
    : `Call ${phone} or send the estimate form.`;
  const options = [
    `${area.landmark} is about ${miles} miles ${area.direction}, measured in a straight line from ${street}, ${zip}. The drive follows ${area.roads}. ${call} We book ${work} in ${area.name} from the office on that street, and traffic is why your arrival time is just a window.`,
    `From ${street} to ${area.landmark} is about ${miles} miles as a straight line, ${area.direction}. ${area.roads} is the road the drive actually takes. ${call} ${work} in ${area.name} is booked from the 77082 office.`,
    `${area.name} is on our list because we can get there from ${street}. ${area.landmark} lies about ${miles} miles ${area.direction}. Follow ${area.roads}. ${call} The ${work} plan is still based on the house, not on the mileage.`,
    `Schedule ${work} in ${area.name} at ${street}, Houston ${zip}. A straight line to ${area.landmark} is about ${miles} miles, ${area.direction}, and ${area.roads} is the normal route. ${call}`,
    `The 77082 office on ${street} is where ${work} for ${area.name} gets scheduled. ${area.landmark} is about ${miles} miles ${area.direction} in a straight line. ${area.roads} covers the drive. ${call} Traffic makes that drive time a window.`,
    `${call} The office is ${street}, Houston, ${zip}. ${area.name} sits about ${miles} miles ${area.direction} of that door if you measure straight to ${area.landmark}. Day to day the route is ${area.roads}.`,
  ];
  return pick(options, `${salt}:drive:${area.slug}`);
}

export function nearbyParagraph(area: AreaProfile, work: string, salt: string) {
  const [a, b, c] = neighborNames(area);
  const options = [
    `${work} nearby is listed for ${a}, ${b}, and ${c}. Each community has its own page because the houses are not interchangeable with ${area.name}. The links are at the bottom of this page. Work still happens at this house.`,
    `${a}, ${b}, and ${c} are the neighboring areas we publish for the same trade. Open those pages for the local differences. A plan written for ${area.name} does not move with you if the house is actually in one of them.`,
    `If the house is closer to ${a}, ${b}, or ${c}, use that city page. This one is ${area.name}: ${area.housingShort}, reached from our office along ${area.roads}.`,
  ];
  return pick(options, `${salt}:nearby:${area.slug}`);
}

export function permitSentence(area: AreaProfile, exterior: boolean) {
  const interior = exterior
    ? 'Roof color, siding, paint, fences, and anything the street sees are the items an association or a historic district is most likely to review.'
    : 'An association or a historic district, where one applies, usually reviews the front wall. Work inside the house is often outside that review, and a permit is a separate question when plumbing, electrical, or structure changes.';
  switch (area.authority) {
    case 'houston':
      return `This address is in Houston, which does not use zoning. ${
        area.hoa === 'usual'
          ? 'A lot of subdivisions still have deed restrictions or an association.'
          : area.hoa === 'mixed'
            ? 'Some streets have deed restrictions or a townhome association, and some do not.'
            : 'Many blocks have no association at all.'
      } ${interior} When a permit is required, it is a City of Houston permit unless the map says otherwise. We confirm that on the address.`;
    case 'zoned-city':
      return `${area.name} issues its own permits. That office is not the City of Houston’s. ${
        area.hoa === 'usual'
          ? 'Master-planned sections usually add an association review on top of the city.'
          : area.hoa === 'mixed'
            ? 'Some sections add an association and some do not.'
            : 'An association is the exception here, not the default.'
      } ${interior}`;
    case 'village':
      return `${area.name} is its own city. Permits come from the village, not from Houston. ${interior} We confirm which city permits this lot.`;
    case 'township':
      return `The Woodlands is a township, not a Houston neighborhood and not a single city hall. Village associations and deed covenants review a great deal of exterior work. ${interior} We ask which village and which review the address falls under before exterior materials are ordered.`;
    case 'mixed-cities':
      return `${area.name} sits where city limits are easy to mix up. ${interior} We confirm which city actually permits the address before anyone treats it as Houston, a village, or a county road.`;
    default:
      return interior;
  }
}
