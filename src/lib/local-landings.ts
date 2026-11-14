import 'server-only';

import { getArticle } from '@/lib/articles';
import { getAreaProfile } from '@/lib/local/areas';
import { buildLocalCopy, costGuideForService } from '@/lib/local/copy';
import { localLandingSlug } from '@/lib/local-paths';
import { documentTitle, fitDescription, servicePageTitle, titleFits } from '@/lib/seo';
import { getService, isCityIndexedService, services, type Service } from '@/lib/services';
import { getServiceArea, serviceAreas, type ServiceArea } from '@/lib/service-areas';
import { site } from '@/lib/site';
import { wordCount } from '@/lib/words';

type Angle = {
  /** Noun phrase. */
  focus: string;
  before: string;
  onSite: string;
  /** One sentence, used in the meta description. */
  blurb: string;
};

const shortNames: Record<string, readonly string[]> = {
  'kitchen-remodeling': ['Kitchen Remodeling'],
  'bathroom-remodeling': ['Bathroom Remodeling', 'Bath Remodeling'],
  backsplash: ['Backsplash'],
  countertops: ['Countertops'],
  'wood-flooring': ['Wood Flooring'],
  'tile-flooring': ['Tile Flooring'],
  'vinyl-flooring': ['Vinyl Flooring'],
  'laminate-flooring': ['Laminate Flooring'],
  carpentry: ['Carpentry'],
  'tile-fireplaces': ['Tile Fireplaces', 'Fireplace Tile'],
  roofing: ['Roofing'],
  'roof-replacement': ['Roof Replacement'],
  'roofing-emergency-tarp-repair': ['Emergency Roof Repair', 'Roof Emergency'],
  siding: ['Siding'],
  'patios-decks': ['Patios & Decks'],
  'water-damage-restoration': ['Water Damage Restoration', 'Water Damage Help'],
  'insurance-claims': ['Insurance Claims Help', 'Claim Help'],
  'painting-drywall-repair': ['Painting & Drywall Repair', 'Painting & Drywall'],
};

const angles: Record<string, readonly Angle[]> = {
  'kitchen-remodeling': [
    {
      focus: 'the layout, the cabinets, and the path from the sink to the range',
      before:
        'Those choices are settled before demolition, so the room matches how you cook and gather.',
      onSite:
        'We measure the kitchen that is there, including the plumbing and any wall you hope to open.',
      blurb: 'Layout, cabinets, counters, and lighting are planned as one project.',
    },
    {
      focus: 'whether the room is already open to the house or still a closed kitchen',
      before:
        'An open room needs the island, the sightlines, and the light to work together. A smaller kitchen needs the structure checked before anyone promises a wall can move.',
      onSite:
        'We walk the space with you and talk through storage, cooking, and where people gather.',
      blurb: 'The layout is settled from the kitchen you have, before demolition starts.',
    },
    {
      focus:
        'cabinets, counters, backsplash, lighting, and the floor where the kitchen meets the next room',
      before:
        'A kitchen touches several trades at once. We run them as one project, so you are talking to one team.',
      onSite:
        'Finishes are chosen before demolition, including cabinet boxes specified for a humid Gulf Coast summer.',
      blurb: 'Cabinets, counters, tile, and lighting are built as one kitchen project.',
    },
  ],
  'bathroom-remodeling': [
    {
      focus: 'the shower, the vanity, the tile, and the light',
      before:
        'Waterproofing goes in before the finish tile, so the wall behind the stone or porcelain is sound.',
      onSite:
        'We plan the fixtures with you, then build the shower, the vanity, and the room as one project.',
      blurb: 'Showers, vanities, tile, and lighting, with waterproofing before the finish.',
    },
    {
      focus: 'whether this is a powder-room refresh or a full primary bath',
      before:
        'A refresh might be a vanity, a mirror, and a light. A full remodel can move the shower or the tub and retile the room.',
      onSite: 'We review what the plumbing and the structure allow before the layout changes.',
      blurb: 'From a powder-room refresh to a full bath, scoped to the room you have.',
    },
    {
      focus: 'tile, glass, niches, and a vanity sized to the room',
      before: 'The result you live with is the shower you step into, the vanity, and the light.',
      onSite: 'We look at the room that is there, from a tight powder room to a larger primary suite.',
      blurb: 'Tile, glass, and the vanity are planned for the bathroom you use every day.',
    },
  ],
  backsplash: [
    {
      focus: 'where the pattern centers, on the range, the hood, or the window',
      before:
        'Chevron, herringbone, and geometric tile live or die by that layout. We dry-lay the pattern before it is set.',
      onSite:
        'We look at the length of the wall and where the cuts will land, especially on a short run.',
      blurb: 'Pattern, grout, and sealer for the wall behind the counter or the range.',
    },
    {
      focus: 'replacing the tile without assuming the counters have to come out',
      before:
        'Usually the old tile can come off while the counters and cabinets stay protected. The wall behind the tile can change the scope.',
      onSite:
        'We look at the wall, the edge of the counter, and how the new tile will meet the stone.',
      blurb: 'New tile on the kitchen wall, laid out before it is set in mortar.',
    },
    {
      focus: 'grout and sealer that a working kitchen can be wiped down with',
      before:
        'The backsplash is often the surface people notice from the doorway, so the field has to read as one pattern.',
      onSite: 'We set the layout so the focal point lands where you want it, then grout and finish the edges.',
      blurb: 'Ceramic, porcelain, glass, or stone tile set behind the counter.',
    },
  ],
  countertops: [
    {
      focus: 'the material, the edge, and a template taken from the cabinets that are actually set',
      before:
        'Quartz, granite, marble, and solid surface wear differently. We talk through care before a slab is ordered.',
      onSite: 'Templating happens when the cabinets are set and level, not from a guess.',
      blurb: 'Granite, quartz, marble, or solid surface, templated to the cabinets.',
    },
    {
      focus: 'islands, overhangs, sink cutouts, and seams',
      before:
        'A slab looks different once it is the island or the counter in the room. The edge and the seam are what make it feel built for that kitchen.',
      onSite: 'We measure the room that is there, including older houses that are not perfectly square.',
      blurb: 'Edges, seams, and sink cutouts templated on site.',
    },
    {
      focus: 'whether a chip or a seam should be repaired or the top replaced',
      before: 'We look at the damage first and say which path makes sense.',
      onSite:
        'The comparison is how you cook and how much upkeep you want, not a single material pushed for every house.',
      blurb: 'Repair or replacement, based on the counter that is there.',
    },
  ],
  'wood-flooring': [
    {
      focus: 'whether the boards can be refinished or need to be replaced',
      before:
        'Sound boards that are thick enough to sand can be stained and sealed. Worn-through floors are better replaced.',
      onSite:
        'We inspect the boards and the subfloor, and we acclimate new wood in the house before it is fastened.',
      blurb: 'Hardwood installation, refinishing, and dustless sanding.',
    },
    {
      focus: 'the subfloor, the species, and the finish for the rooms the floor runs through',
      before: 'Stairs, landings, and the floor they meet are detailed so the wood reads as one run.',
      onSite: 'We look at flatness and at how the floor meets the doors, the stairs, and the next room.',
      blurb: 'Planks, stairs, and landings, acclimated in the house first.',
    },
    {
      focus: 'a finish chosen for the light in the room',
      before:
        'Stain and sealer are chosen for the room, from a pale plank to a darker floor in an older house.',
      onSite:
        'Dustless sanding is available when the existing floor is worth keeping and the rest of the house should stay cleaner.',
      blurb: 'New planks or a refinish of floors that still have life in them.',
    },
  ],
  'tile-flooring': [
    {
      focus: 'a flat substrate and a layout that centers on the room or the doorway',
      before:
        'Large porcelain makes every ridge obvious. Prep is what makes the finished floor look intentional.',
      onSite:
        'We check whether tile can go over the current floor, or whether the substrate has to be rebuilt.',
      blurb: 'Porcelain, stone-look, and patterned floors over a flat substrate.',
    },
    {
      focus: 'patterned entries, stone-look kitchens, and bathroom floors that need waterproofing',
      before:
        'Wet rooms are waterproofed before the finish tile. Living areas are set for flatness, movement joints, and grout.',
      onSite: 'We plan the layout so the pattern repeats instead of dying in a sliver at the wall.',
      blurb: 'Layout, grout, and sealing for entries, kitchens, and baths.',
    },
    {
      focus: 'tile for homes and commercial spaces, with grout and sealer suited to the room',
      before: 'The design is the part you live with. The flat substrate is what makes it stay that way.',
      onSite:
        'We look at height at the doors and transitions before we recommend setting tile over what is there.',
      blurb: 'Tile floors laid out for the room, including wet areas.',
    },
  ],
  'vinyl-flooring': [
    {
      focus: 'a wood or stone look for kitchens, playrooms, and first floors',
      before:
        'Click-lock, glue-down, or floating is chosen for the product and the subfloor, not as a default.',
      onSite: 'We check that the floor is flat and dry. A wavy slab will show through.',
      blurb: 'Luxury vinyl plank, sheet, or tile for the rooms you use most.',
    },
    {
      focus: 'whether a worn section can be replaced or the room wants a full floor',
      before:
        'A matching product can often replace a section. Even wear across the room is usually cleaner as a full installation.',
      onSite: 'We look at the subfloor and the transitions at the doorways before materials are ordered.',
      blurb: 'Wood-look or stone-look vinyl, installed over a flat subfloor.',
    },
    {
      focus: 'the install method the subfloor actually needs',
      before: 'Glue-down is often steadier on a slab. We explain the choice before the planks arrive.',
      onSite: 'For a shower, tile is still the right assembly, and we will say so.',
      blurb: 'Click-lock, glue-down, or floating vinyl, chosen for the subfloor.',
    },
  ],
  'laminate-flooring': [
    {
      focus: 'a wood look for bedrooms, halls, and living rooms',
      before:
        'Underlayment quiets the floor and smooths minor variation. It does not hide a badly uneven slab.',
      onSite:
        'We check the subfloor before the planks arrive, and we set transitions so the floor meets the doors.',
      blurb: 'Laminate for bedrooms, halls, and living rooms, with the right underlayment.',
    },
    {
      focus: 'click-lock or glue-down, plus underlayment specified for that floor',
      before: 'Baths are a better fit for tile. Kitchens can work with the right product, and we will say which.',
      onSite: 'We look at flatness, height at the doors, and whether a damaged plank can be matched.',
      blurb: 'Click-lock or glue-down laminate over a checked subfloor.',
    },
    {
      focus: 'a quicker wood-look floor when a full sanding project is more than the room needs',
      before: 'The plank, the underlayment, and the transitions are planned together.',
      onSite:
        'A damaged plank can often be replaced if the product and the click system are still available.',
      blurb: 'Wood-look laminate, including repairs when the product can be matched.',
    },
  ],
  carpentry: [
    {
      focus: 'trim, built-ins, and stairs sized to the room that is there',
      before:
        'Older profiles are worth matching when they belong to the house. A plain room may need millwork that gives it a point of view.',
      onSite:
        'We look at the existing casing, the openings, and whether new wood should be acclimated in the house before it is cut.',
      blurb: 'Trim, built-ins, stairs, and framing sized to the house.',
    },
    {
      focus: 'framing and openings, when a wall or a doorway is part of the remodel',
      before:
        'Opening a wall in an older house is different from framing in a newer two-story. We inspect before we cut.',
      onSite: 'Built-ins, shelving, and closets are sized to the wall, including awkward alcoves.',
      blurb: 'Finish carpentry and framing, from trim to built-ins and stairs.',
    },
    {
      focus: 'the carpentry inside a kitchen or a bath: soffits, cabinet modifications, and finish trim',
      before:
        'That work stays with the same team as the remodel, instead of being handed to a separate crew at the end.',
      onSite: 'We measure the profiles that should stay and the gaps the new work has to close.',
      blurb: 'Built-ins, stairs, and trim, matched to the house or built new.',
    },
  ],
  'tile-fireplaces': [
    {
      focus: 'a surround that anchors the living room and is still built for the firebox',
      before: 'Heat-rated tile and mortar go in even when the fireplace is lit only occasionally.',
      onSite: 'We look at the existing brick or tile and say whether to retile, resurface, or rebuild.',
      blurb: 'Heat-rated tile surrounds, new or rebuilt, for the living room.',
    },
    {
      focus: 'the scale of the wall, so the surround is not too small for the room',
      before: 'Mantel, paneling, and tile are planned together. The carpentry can travel with the tile.',
      onSite: 'We size the field to the room, from a large great room to a smaller living room.',
      blurb: 'Mantel, paneling, and tile planned as one hearth.',
    },
    {
      focus: 'updating a brick fireplace that no longer matches the house',
      before: 'The fireplace is often the wall you see from the sofa. The finish is the project.',
      onSite: 'We check what is behind the face before we promise a new surface.',
      blurb: 'Retile or rebuild a fireplace surround with heat-rated materials.',
    },
  ],
  roofing: [
    {
      focus: 'whether a repair will hold or the roof needs to come off',
      before:
        'A replacement includes the tear-off, a look at the deck, new underlayment, flashing, vents, and the material you chose.',
      onSite: 'We inspect and photograph the roof, then say which path fits the roof in front of us.',
      blurb: 'Inspections, repairs, and replacements, including flashing and vents.',
    },
    {
      focus: 'the material, the underlayment, the flashing, and the ventilation as one system',
      before:
        'Architectural asphalt is common. Metal, tile, and composite are options when the structure and the look call for them.',
      onSite: 'We compare appearance, weight, heat, and wind for the house, not from a single product.',
      blurb: 'Repair or replacement after an inspection of the roof you have.',
    },
    {
      focus: 'what to do when a storm opens the roof, and what the permanent roof should be',
      before:
        'A tarp is temporary protection. The permanent roof is the step after the house is covered. Your insurer decides coverage. We provide photos and documentation.',
      onSite:
        'If water is coming in, call first. We photograph what we find and cover the opening when it is safe to be up there.',
      blurb: 'Roof repair or replacement, plus tarping when a storm opens the roof.',
    },
  ],
  'roof-replacement': [
    {
      focus: 'tear-off, the deck, underlayment, flashing, vents, and the new material',
      before: 'Color and profile change how the house reads from the street. We choose both with the elevation.',
      onSite:
        'We inspect, photograph the condition, and say whether repair or replacement makes sense before the old roof comes off.',
      blurb: 'Tear-off and a new roof, with flashing, vents, and a site cleanup.',
    },
    {
      focus: 'asphalt, metal, tile, or composite, chosen for the structure and the look',
      before:
        'Architectural asphalt is common. The other materials are options when the house can carry them and the elevation wants them.',
      onSite: 'We look at weight, heat, wind, and the roof that is up there now.',
      blurb: 'A new asphalt, metal, tile, or composite roof, detailed as one system.',
    },
    {
      focus: 'ventilation, valleys, and pipe boots, not only the shingles you see from the street',
      before: 'Those pieces go in with the new roofing. They are part of the replacement.',
      onSite:
        'We document the roof for your records and, when you are filing, for the conversation with your insurer. Coverage is your insurer’s decision.',
      blurb: 'Full replacement, from tear-off through flashing, vents, and cleanup.',
    },
  ],
  'roofing-emergency-tarp-repair': [
    {
      focus: 'keeping the next round of weather out of the house',
      before:
        'A tarp is temporary protection, not a finished roof. We plan the permanent repair after the house is covered.',
      onSite:
        'We get on the roof when it is safe, photograph the opening, and anchor the cover so wind is less likely to lift it.',
      blurb: 'Inspection, damage photos, and a secured tarp after a storm.',
    },
    {
      focus: 'photographs of the damage before the tarp covers it',
      before: 'Protecting the house from more water is the priority. Your insurer decides what a claim covers.',
      onSite:
        'Call if water is coming in. Tell us what happened and where. If you cannot call, the emergency form reaches the same team.',
      blurb: 'A temporary cover after storm damage, with photos taken first.',
    },
    {
      focus: 'what happens if the ceiling is already wet',
      before:
        'A tarp stops more water from entering. Wet insulation and drywall are a separate drying job, and we handle that restoration as well.',
      onSite: 'We say which work is the temporary cover and which work is the permanent roof.',
      blurb: 'Emergency tarping until the permanent roof repair can be scheduled.',
    },
  ],
  'patios-decks': [
    {
      focus: 'whether the framing, ledger, and footings can stay or need to come out',
      before:
        'Sound structure can take new decking and rails. Rotted posts, a soft ledger, or a failing footing come out before the surface goes back.',
      onSite:
        'We look at how the deck meets the house, the slope of the yard, and the door the new work has to reach.',
      blurb: 'New decks and rebuilds, after a look at the framing and the ledger.',
    },
    {
      focus: 'a patio, a deck, or a cover, sized to the yard and the door it meets',
      before:
        'A ground-level patio and an elevated deck are different structures. The cover, when there is one, is planned so rain sheds away from the wall.',
      onSite:
        'We measure the house side and talk through wood or composite before materials are ordered.',
      blurb: 'Patios, decks, and covers scoped from the yard and the back door.',
    },
    {
      focus: 'rails, stairs, and how the new work meets the siding and the door',
      before:
        'Those pieces are what make the outdoor room feel finished, and they are part of the same project as the surface.',
      onSite:
        'Houston sun and rain are part of the material conversation. We say what each option asks of you before anything is ordered.',
      blurb: 'Rails, stairs, and a surface chosen for Houston sun and rain.',
    },
  ],
  siding: [
    {
      focus: 'the profile, the color, and the trim at corners, windows, and soffits',
      before:
        'Board-and-batten, lap, and other profiles each finish differently. That detailing is what makes a new elevation look finished.',
      onSite: 'We look at the wall from close up, including rot, loose trim, and boards the sun has faded.',
      blurb: 'Siding installation, repair, or replacement, with trim and color.',
    },
    {
      focus: 'whether a section can be matched or the wall needs a full replacement',
      before:
        'South and west walls fade faster. A repair is matched to the boards on the house now, not to the original chip.',
      onSite: 'We say when a patch will blend and when the elevation wants more.',
      blurb: 'Matched repairs or a full replacement of the street elevation.',
    },
    {
      focus: 'board-and-batten, lap, fiber cement, or engineered wood',
      before:
        'We talk through how each one finishes at corners, windows, and soffits, and which one fits the house.',
      onSite: 'Storm-damaged sections can be photographed for your records. Your insurer decides coverage.',
      blurb: 'New siding or a matched repair, detailed at the corners and windows.',
    },
  ],
  'water-damage-restoration': [
    {
      focus:
        'where the water went, including moisture that has traveled past the stain you can see',
      before: 'Humidity slows drying here. Dehumidification is part of the setup, not an optional extra.',
      onSite:
        'We map moisture, extract standing water, and dry with air movers and dehumidifiers before we rebuild.',
      blurb: 'Moisture mapping, extraction, drying, and the repairs after a leak or storm.',
    },
    {
      focus: 'drying the structure before drywall, floors, or cabinets are rebuilt',
      before:
        'Repairs start when the readings support it. The same team can do the rebuild, so you are not hiring a second contractor to finish.',
      onSite: 'If it is safe, stop the water and call. Stay clear of wet electrical equipment.',
      blurb: 'Dry the structure first, then repair drywall, floors, and finishes.',
    },
    {
      focus: 'a supply line, an appliance, a roof opening, or water that came in at grade',
      before:
        'A room that looks dry can still hold moisture in a slab, in insulation, or at the bottom of the drywall.',
      onSite:
        'We photograph the conditions and the scope of drying and repair. Coverage decisions belong to your insurer.',
      blurb: 'Drying and repairs after a leak, a flood, or storm water.',
    },
  ],
  'insurance-claims': [
    {
      focus: 'photographs and notes on what got wet and what was repaired',
      before: 'We do not decide what your policy covers. Your insurer does.',
      onSite:
        'We document the roof, the water, or the storm damage, and you can share that record with your adjuster.',
      blurb: 'Damage photos and notes for you and your adjuster. Your insurer decides coverage.',
    },
    {
      focus: 'a clear record taken before cleanup throws the evidence away',
      before:
        'Protect the house from more water, and photograph the damage before belongings are tossed. The free photo log on this site is a room-by-room way to start that record yourself.',
      onSite: 'We can also photograph the conditions if you hire us for the inspection or the repairs.',
      blurb: 'Inspection photos and a written record. We do not decide coverage.',
    },
    {
      focus: 'keeping the claim paperwork separate from the drying and the rebuild',
      before:
        'Stopping more water does not wait on a coverage decision. We say which work is protection and which work is the rebuild.',
      onSite: 'Call and say whether water is still coming in. The emergency form reaches the same team.',
      blurb: 'Documentation for a water or storm claim, plus drying and repairs if you hire us.',
    },
  ],
  'painting-drywall-repair': [
    {
      focus: 'a repair that disappears, and paint on a sound surface',
      before:
        'We feather, prime, and paint so a patch blends, including textured walls where a hard edge would show.',
      onSite: 'We look at whether the wall needs a spot repair or the whole room painted so the sheen matches.',
      blurb: 'Drywall repair, primer, and interior paint that finish the room.',
    },
    {
      focus: 'new drywall after a kitchen, a bath, or a layout change',
      before:
        'Once the drywall is taped and primed, paint is part of closing the project, matched to the rooms around the work.',
      onSite: 'If a wall was opened because of a leak, it is confirmed dry before it is closed.',
      blurb: 'Patches, texture blending, primer, and interior paint.',
    },
    {
      focus:
        'color and sheen, from a deeper powder-room color to a patched living room that should match',
      before: 'A small patch is feathered so it disappears. A room that changed is usually painted as a whole.',
      onSite: 'We blend texture so the paint has one plane to cover, including older textured walls.',
      blurb: 'Interior painting and drywall repair after a remodel or a repair.',
    },
  ],
};

export type LocalLanding = {
  slug: string;
  path: string;
  serviceSlug: string;
  areaSlug: string;
  areaName: string;
  title: string;
  description: string;
  lede: string;
  paragraphs: readonly string[];
  notes: readonly { title: string; body: string }[];
  faqs: readonly { q: string; a: string }[];
  nearby: readonly { href: string; label: string; areaName: string }[];
  costGuide?: { href: string; label: string };
  photoShift: number;
};

function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function rotate<T>(items: readonly T[], amount: number) {
  if (items.length === 0) return [];
  const start = amount % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

function pageTitle(service: Service, area: ServiceArea) {
  const names = shortNames[service.slug] ?? [service.metaTitle ?? service.name];
  const candidates = names.flatMap((name) => [
    `${name} in ${area.name}, TX`,
    `${name} in ${area.name}`,
    `${name}, ${area.name} TX`,
    `${name}, ${area.name}`,
  ]);
  const fit = candidates.find((candidate) => titleFits(candidate));
  if (!fit) {
    throw new Error(`No title fits for ${service.slug} in ${area.name}`);
  }
  return fit;
}

function pageDescription(service: Service, area: ServiceArea, blurb: string, n: number) {
  const tail = ` Call ${site.phone.display}.`;
  const options = [
    `${service.name} in ${area.name}, TX. ${blurb}${tail}`,
    `${blurb} For houses in ${area.name}, TX.${tail}`,
    `${service.name} for a house in ${area.name}, TX. ${blurb}${tail}`,
  ];
  const ordered = rotate(options, n);
  const fit = ordered.find((item) => item.replace(/\s+/g, ' ').trim().length <= 155);
  const text = (fit ?? `${service.name} in ${area.name}, TX.${tail}`).replace(/\s+/g, ' ').trim();
  return text.length <= 155 ? text : fitDescription(text);
}

function buildLanding(service: Service, area: ServiceArea): LocalLanding {
  const serviceAngles = angles[service.slug];
  if (!serviceAngles || serviceAngles.length < 2) {
    throw new Error(`Missing local copy angles for ${service.slug}`);
  }
  const profile = getAreaProfile(area.slug);
  if (!profile) throw new Error(`Missing area profile for ${area.slug}`);
  const n = hashString(`${service.slug}:${area.slug}`);
  const angle = serviceAngles[n % serviceAngles.length];
  const copy = buildLocalCopy(service, profile);
  const slug = localLandingSlug(service.slug, area.slug);
  const nearby = profile.neighbors.map((neighborSlug) => {
    const neighbor = getAreaProfile(neighborSlug);
    if (!neighbor) throw new Error(`Missing neighbor ${neighborSlug}`);
    return {
      href: `/${localLandingSlug(service.slug, neighborSlug)}`,
      label: `${service.name} in ${neighbor.name}`,
      areaName: neighbor.name,
    };
  });
  return {
    slug,
    path: `/${slug}`,
    serviceSlug: service.slug,
    areaSlug: area.slug,
    areaName: area.name,
    title: pageTitle(service, area),
    description: pageDescription(service, area, angle.blurb, n),
    lede: copy.lede,
    paragraphs: copy.paragraphs,
    notes: copy.notes,
    faqs: copy.faqs,
    nearby,
    costGuide: costGuideForService[service.slug],
    photoShift: n % 11,
  };
}

const banned = [
  /jobs in/i,
  /projects in/i,
  /\blicensed\b/i,
  /\binsured\b/i,
  /testimonial/i,
  /\b\d+\s+(homes|kitchens|baths|roofs|jobs|projects)\b/i,
  /5-star|five-star/i,
  /\bGAF\b/,
  /\bIICRC\b/,
  /\bwarranty\b/i,
  /\bguarantee\b/i,
  /\bcertified\b/i,
  /\baward\b/i,
];

function assertLandings(pages: readonly LocalLanding[]) {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const ledes = new Set<string>();
  const openings = new Set<string>();
  const slugs = new Set<string>();
  const wordErrors: string[] = [];

  for (const page of pages) {
    if (slugs.has(page.slug)) throw new Error(`Duplicate landing slug ${page.slug}`);
    slugs.add(page.slug);
    if (getService(page.slug) || getArticle(page.slug)) {
      throw new Error(`Landing slug collides with an existing route: ${page.slug}`);
    }
    if (!titleFits(page.title)) throw new Error(`Title does not fit: ${page.title}`);
    if (titles.has(page.title)) throw new Error(`Duplicate title: ${page.title}`);
    titles.add(page.title);
    if (page.description.length > 155) {
      throw new Error(`Description too long (${page.description.length}): ${page.description}`);
    }
    if (descriptions.has(page.description)) {
      throw new Error(`Duplicate description for ${page.path}: ${page.description}`);
    }
    descriptions.add(page.description);
    if (ledes.has(page.lede)) throw new Error(`Duplicate lede for ${page.path}`);
    ledes.add(page.lede);
    const opening = page.paragraphs[0];
    if (!opening || openings.has(opening)) throw new Error(`Duplicate opening for ${page.path}`);
    openings.add(opening);
    const blob = [
      page.title,
      page.description,
      page.lede,
      ...page.paragraphs,
      ...page.notes.flatMap((note) => [note.title, note.body]),
      ...page.faqs.flatMap((faq) => [faq.q, faq.a]),
    ].join('\n');
    for (const pattern of banned) {
      if (pattern.test(blob)) {
        throw new Error(`Banned phrase ${pattern} on ${page.path}`);
      }
    }
    if (!page.paragraphs.some((paragraph) => paragraph.includes(page.areaName))) {
      throw new Error(`City name missing from body: ${page.path}`);
    }
    const profile = getAreaProfile(page.areaSlug);
    const faqCount = page.faqs.length;
    if (faqCount < 3 || faqCount > 5) {
      throw new Error(`${page.path} has ${faqCount} FAQs`);
    }
    if (profile?.priority && faqCount !== 5) {
      throw new Error(`${page.path} should have 5 FAQs`);
    }
    if (!profile?.priority && faqCount !== 4) {
      throw new Error(`${page.path} should have 4 FAQs`);
    }
    if (page.nearby.length < 2 || page.nearby.length > 3) {
      throw new Error(`${page.path} should link 2 or 3 nearby areas`);
    }
    const expectsCost = Boolean(costGuideForService[page.serviceSlug]);
    if (expectsCost && !page.costGuide) {
      throw new Error(`${page.path} is missing its cost guide`);
    }
    if (!expectsCost && page.costGuide) {
      throw new Error(`${page.path} has an unexpected cost guide`);
    }
    const words = wordCount([
      page.lede,
      ...page.paragraphs,
      ...page.notes.flatMap((note) => [note.title, note.body]),
      ...page.faqs.flatMap((faq) => [faq.q, faq.a]),
    ]);
    const minimum = profile?.priority ? 900 : 750;
    const maximum = profile?.priority ? 1350 : 1200;
    if (words < minimum || words > maximum) {
      wordErrors.push(`${page.path} ${words} ${profile?.priority ? 'priority' : 'standard'}`);
    }
  }
  if (wordErrors.length > 0) {
    throw new Error(`${wordErrors.length} word-count misses: ${wordErrors.slice(0, 12).join('; ')}`);
  }
}

export const localLandings: readonly LocalLanding[] = services
  .filter((service) => isCityIndexedService(service.slug))
  .flatMap((service) => serviceAreas.map((area) => buildLanding(service, area)));

assertLandings(localLandings);

const bySlug = new Map(localLandings.map((page) => [page.slug, page]));

const distinctFromHouston = [
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
  'painting-drywall-repair',
  'water-damage-restoration',
  'insurance-claims',
] as const;

/**
 * Service hub titles name Houston in a different word order from the
 * "{service} in Houston" city page, so both can rank without sharing a title.
 */
for (const slug of distinctFromHouston) {
  const service = getService(slug);
  const houston = bySlug.get(localLandingSlug(slug, 'houston'));
  if (!service || !houston) throw new Error(`Missing Houston title pair for ${slug}`);
  const main = documentTitle(servicePageTitle(service));
  const city = documentTitle(houston.title);
  if (main === city) throw new Error(`Service title still matches its Houston page: ${main}`);
  if (main.length > 60 || city.length > 60) {
    throw new Error(`Title over 60 characters: ${main} / ${city}`);
  }
  if (!main.endsWith('Elite Restorations') || !city.endsWith('Elite Restorations')) {
    throw new Error(`Title is missing the brand: ${main} / ${city}`);
  }
  if (main.includes('Inc.') || city.includes('Inc.')) {
    throw new Error(`Title includes Inc.: ${main} / ${city}`);
  }
  if (!/\bHouston\b/.test(main)) {
    throw new Error(`Service page title should name Houston: ${main}`);
  }
  if (!/\bHouston\b/.test(city)) throw new Error(`Houston page title omits Houston: ${city}`);
}

export function getLocalLanding(slug: string) {
  return bySlug.get(slug);
}

export function landingsForService(serviceSlug: string) {
  return localLandings.filter((page) => page.serviceSlug === serviceSlug);
}

export function relatedCityLandings(page: LocalLanding) {
  const service = getService(page.serviceSlug);
  if (!service) return [];
  return service.related
    .map((slug) => bySlug.get(localLandingSlug(slug, page.areaSlug)))
    .filter((item): item is LocalLanding => Boolean(item))
    .slice(0, 4);
}

export function getArea(slug: string) {
  return getServiceArea(slug);
}
