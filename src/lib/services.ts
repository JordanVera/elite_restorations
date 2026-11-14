import { duplicateQuestions, extraServiceFaqs } from '@/lib/faqs';
import { addedServiceInputs } from '@/lib/guides/added-service-inputs';
import { serviceGuides } from '@/lib/guides/index';
import type { ServiceGuide } from '@/lib/guides/types';
import { img, type Img } from '@/lib/images';
import { processSteps } from '@/lib/process';
import { wordCount } from '@/lib/words';

export type ServiceGroup =
  | 'Interiors'
  | 'Floors'
  | 'Roof & exterior'
  | 'Recovery';

export type ServiceLocal = {
  heading: string;
  body: string[];
  conditions: { title: string; body: string }[];
  neighborhoods: string[];
};

export type Service = {
  slug: string;
  name: string;
  group: ServiceGroup;
  tagline: string;
  summary: string;
  metaDescription: string;
  /** Shorter name used when the full service name cannot fit a Houston title. */
  metaTitle?: string;
  intro: string[];
  includes: string[];
  materials?: { label: string; items: string[] };
  process?: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
  /** Omitted when the site has no real job photo for this service yet. */
  image?: Img;
  emergency?: boolean;
  links?: { href: string; label: string }[];
  local: ServiceLocal;
  guide: ServiceGuide;
};

export const serviceGroups: ServiceGroup[] = [
  'Interiors',
  'Floors',
  'Roof & exterior',
  'Recovery',
];

export const serviceGroupBlurbs: Record<ServiceGroup, string> = {
  Interiors:
    'The rooms you live in: kitchens, baths and the finish work that ties them together.',
  Floors:
    'Wood, tile, vinyl and laminate, installed over a properly prepared subfloor.',
  'Roof & exterior':
    'What keeps the weather out: roofs, siding, and the decks and patios beside the house.',
  Recovery:
    'Paint and drywall that finish a remodel, recovery after water or a storm, and documentation for an insurance claim.',
};

const serviceInputs: Omit<Service, 'guide'>[] = [
  {
    slug: 'kitchen-remodeling',
    name: 'Kitchen Remodeling',
    group: 'Interiors',
    tagline: 'The room where everything happens, rebuilt around how you live.',
    summary:
      'We plan and build the layout, cabinets, counters, lighting and finishes as one job.',
    metaTitle: 'Houston Kitchen Remodeling',
    metaDescription:
      'Kitchen remodeling in Houston: layouts, cabinets, counters, and lighting, built as one project. Call (713) 909-0034.',
    intro: [
      'A Houston kitchen remodel touches nearly every trade at once: cabinets, counters, tile, flooring, electrical and plumbing. We coordinate those trades so you talk to one team, not six.',
      'We walk the space with you, measure, and talk through how you cook, gather and store. Layout, cabinets and finishes are settled before any walls come out, so the room that comes back matches how you live.',
    ],
    includes: [
      'Layout planning and design support',
      'Cabinets, hardware and built-in storage',
      'Countertops and backsplash',
      'Flooring transitions and repairs',
      'Lighting, including pendants and under-cabinet',
      'Full renovations or smaller refreshes',
    ],
    faqs: [
      {
        q: 'Can you handle the whole kitchen, or only parts of it?',
        a: 'Both. Some clients want a full renovation. Others want new counters and a backsplash, or new flooring. We set the work to what you actually need.',
      },
      {
        q: 'How long will a Houston kitchen remodel take?',
        a: 'It depends on the layout change and how long the materials you choose will take. We give you a clear timeline during the consultation, before work starts.',
      },
      {
        q: 'Can you open the kitchen to the rest of the house?',
        a: 'Often, yes. In Katy, Cinco Ranch and The Woodlands the kitchen is already the center of an open plan, and the work is the island, the view and the lighting. In Heights, Bellaire and West University houses we measure structure and plumbing before we promise a wall can move.',
      },
      {
        q: 'Do you remodel kitchens inside the Loop and in the suburbs?',
        a: 'Yes. We work in Heights bungalows and West University houses as well as open plans in Katy, Cinco Ranch, Memorial and The Woodlands. Older houses often limit how far a wall or a drain can move, and we measure that before we promise a layout.',
      },
    ],
    related: ['countertops', 'backsplash', 'wood-flooring', 'carpentry'],
    links: [
      {
        href: '/kitchen-remodel-cost-houston',
        label: 'What changes a kitchen remodel cost',
      },
      {
        href: '/kitchen-remodel-case-study',
        label: 'A kitchen remodel, in a customer\'s words',
      },
    ],
    image: img(
      '/images/services/kitchen-remodeling.jpg',
      'Houston kitchen remodel with a coffered ceiling, marble island and pendant lighting',
    ),
    local: {
      heading: 'A kitchen planned around how you live.',
      body: [
        'A lot of the kitchens we visit were built for a different routine: a closed Heights bungalow, a Memorial two-story, a Katy or Woodlands plan where the island has to hold the whole room. The remodel starts there.',
        'We settle the layout, the cabinets and the stone with you, then build it as one project. Cabinet boxes are chosen so the doors still close through a Houston summer. That choice is part of the design.',
      ],
      conditions: [
        {
          title: 'The working layout',
          body: 'Islands, storage and the path from sink to range are decided before demolition, around how you cook and gather.',
        },
        {
          title: 'Open suburban plans',
          body: 'In Katy, Cinco Ranch and The Woodlands the kitchen is often the center of one large room. Islands, the view and lighting have to work for all of it.',
        },
        {
          title: 'Tight older kitchens',
          body: 'Heights, Bellaire and West University kitchens are frequently small, with plumbing and structure that decide what a new layout can do.',
        },
      ],
      neighborhoods: [
        'The Heights',
        'River Oaks',
        'Memorial',
        'Bellaire',
        'West University',
        'Katy',
        'Cinco Ranch',
        'The Woodlands',
      ],
    },
  },
  {
    slug: 'bathroom-remodeling',
    name: 'Bathroom Remodeling',
    group: 'Interiors',
    tagline: 'A quieter room, finished with the tile and fixtures you want.',
    summary:
      'Showers, vanities, tile and lighting, planned as one bathroom, with waterproofing done before the tile.',
    metaTitle: 'Houston Bathroom Remodeling',
    metaDescription:
      'Bathroom remodeling in Houston, TX: showers, vanities, tile and lighting, from a powder-room refresh to a full primary bath planned for how you use it.',
    intro: [
      'A bathroom remodel is a small room with a lot of decisions: the shower, the vanity, the tile and the light. We plan those with you and build them as one project.',
      'Waterproofing goes in before the finish tile, so the marble or porcelain you chose has a solid wall behind it. What you live with is the shower, the vanity and a room that finally works.',
    ],
    includes: [
      'Design guidance and fixture selection',
      'Tile for showers, floors and feature walls',
      'Vanities, tubs and shower systems',
      'Lighting and mirrors',
      'Plumbing and electrical preparation',
      'Waterproofing and easier-to-use layouts',
    ],
    faqs: [
      {
        q: 'Can you change the layout of my bathroom?',
        a: 'Yes. Moving a shower, vanity or tub is part of many projects. We review what the plumbing and structure allow during the consultation, which matters in older Heights and West University houses as much as in newer slab homes.',
      },
      {
        q: 'Do you install large-format and patterned tile?',
        a: 'Yes. Large-format porcelain, mosaics, herringbone and encaustic-style patterns need careful layout and a flat surface under the tile, and our tile work covers showers, floors and accent walls.',
      },
      {
        q: 'What is the difference between a refresh and a full remodel?',
        a: 'A refresh might be a new vanity, mirror and light. A full remodel moves the shower or tub, retiles the room and changes the layout. We set the work to the bathroom you have, from a West University powder room to a Memorial primary.',
      },
      {
        q: 'Do you help choose fixtures and tile?',
        a: 'Yes. We walk through showers, tubs, vanities and tile with you, including large-format porcelain, mosaics and patterned floors, before anything is ordered.',
      },
    ],
    related: [
      'tile-flooring',
      'carpentry',
      'water-damage-restoration',
      'countertops',
    ],
    links: [
      {
        href: '/bathroom-remodel-cost-houston',
        label: 'What changes a bathroom remodel cost',
      },
    ],
    image: img(
      '/images/services/bathroom-remodeling.jpg',
      'Houston bathroom remodel with a marble shower and frameless glass door',
    ),
    local: {
      heading: 'The bath you use every day, rebuilt.',
      body: [
        'Houston baths we remodel range from a tight powder room in West University to a primary suite in Memorial or The Woodlands. The size changes. The order of the work does not: layout, fixtures, tile, then the finish you live with.',
        'Waterproofing is part of that sequence, done before the tile goes on. The project itself is the room: the shower you step into, the vanity, and the light.',
      ],
      conditions: [
        {
          title: 'Shower, tub, or both',
          body: 'We help you choose the fixture and the tile, then build the shower so niches, glass and the floor feel like one design.',
        },
        {
          title: 'Vanities and light',
          body: 'Mirrors, wall lights and storage are planned with the vanity, so a small powder room still feels finished.',
        },
        {
          title: 'Primary and powder',
          body: 'Memorial and River Oaks primaries and smaller Bellaire or West University baths are both common. We size the layout to the room.',
        },
      ],
      neighborhoods: [
        'Memorial',
        'River Oaks',
        'Bellaire',
        'West University',
        'Upper Kirby',
        'The Woodlands',
        'Sugar Land',
        'The Heights',
      ],
    },
  },
  {
    slug: 'backsplash',
    name: 'Backsplash',
    group: 'Interiors',
    tagline:
      'The smallest surface in the kitchen that gets the most attention.',
    summary:
      'We lay out, grout and seal ceramic, porcelain, glass, marble and stone tile.',
    metaTitle: 'Houston Backsplash Installation',
    metaDescription:
      'Backsplash installation in Houston: ceramic, porcelain, glass, and stone, laid out before it is set. Call (713) 909-0034.',
    intro: [
      'A backsplash is the wall that finishes the kitchen. Chevron, herringbone, geometric and hand-finished tile all depend on a careful layout.',
      'We lay the pattern out on the wall before we set it, so cuts land where they should and the design centers on the range, the hood or the window. Grout and sealer are chosen so a working kitchen can be wiped down.',
    ],
    includes: [
      'New backsplash installation',
      'Removal and replacement of old tile',
      'Custom layouts and patterns',
      'Repairs, regrouting and sealing',
      'Waterproofing where needed',
    ],
    materials: {
      label: 'Tile we install',
      items: [
        'Ceramic',
        'Porcelain',
        'Glass',
        'Marble and natural stone',
        'Custom tile',
      ],
    },
    faqs: [
      {
        q: 'Can you replace a backsplash without replacing my countertops?',
        a: 'Usually, yes. We remove the old tile carefully and protect the counters and cabinets. The condition of the wall behind the tile can change the job.',
      },
      {
        q: 'Do you do herringbone, chevron and geometric layouts?',
        a: 'Yes. Those patterns need a planned layout. We mock them up so the repeat centers on the range, the window or the hood.',
      },
      {
        q: 'Which tile works on a short kitchen wall?',
        a: 'Chevron, herringbone and geometric tile all can. On a short Heights or West University wall we plan the repeat so the end of the wall gets a clean cut, and the pattern centers on the range or the hood.',
      },
      {
        q: 'Can a backsplash be part of a larger remodel?',
        a: 'Yes. It is often the last visible layer of a kitchen project, set after the counters are measured so the tile meets the stone cleanly.',
      },
    ],
    related: ['kitchen-remodeling', 'countertops', 'tile-fireplaces'],
    image: img(
      '/images/services/backsplash.webp',
      'Ceramic tile backsplash above a marble counter in a Houston kitchen',
    ),
    local: {
      heading: 'The wall that finishes the kitchen.',
      body: [
        'In a Houston kitchen the backsplash is often the surface people notice from the doorway: the pattern behind the range, the stone against the counter, the line where tile meets cabinet.',
        'We set the main area so the pattern shows, then grout and finish the edges. A sealer suited to a working kitchen is part of the install, so the wall you chose can be wiped down.',
      ],
      conditions: [
        {
          title: 'Centered on the range',
          body: 'The repeat is planned before the first tile is set, so the focal point lands on the hood, the window or the range.',
        },
        {
          title: 'Pattern on a short wall',
          body: 'Older inside-the-Loop kitchens often have a short stretch of wall. Chevron and herringbone have to be planned so the end gets a clean cut.',
        },
        {
          title: 'Stone against stone',
          body: 'Marble counters and a stone backsplash need joints and sealers that work together. We coordinate that with the countertop work.',
        },
      ],
      neighborhoods: [
        'The Heights',
        'Bellaire',
        'West University',
        'River Oaks',
        'Memorial',
        'Upper Kirby',
        'Rice Village',
        'The Woodlands',
      ],
    },
  },
  {
    slug: 'countertops',
    name: 'Countertops',
    group: 'Interiors',
    tagline: 'Surfaces chosen to be lived on, and cut to fit exactly.',
    summary:
      'Granite, quartz, marble and solid-surface counters with custom edges, cut to fit.',
    metaTitle: 'Houston Countertops',
    metaDescription:
      'Countertops in Houston: granite, quartz, marble and solid surface, measured on site for the kitchen you use every day. Call (713) 909-0034.',
    intro: [
      'Countertops are the surface you touch most in a kitchen or bath. The material, the edge and the seams all matter, and so does a measurement taken from the cabinets that are actually in the room.',
      'We help you compare granite, quartz, marble and solid surface for how they look and how you want to live with them, then measure, cut and install the counters.',
    ],
    includes: [
      'Installation and replacement',
      'Repairs to existing counters',
      'Custom edge shapes',
      'On-site measuring and cutting',
      'Sink and cooktop cutouts',
    ],
    materials: {
      label: 'Materials',
      items: ['Granite', 'Quartz', 'Marble', 'Solid surface'],
    },
    faqs: [
      {
        q: 'Which countertop is practical for a busy Houston kitchen?',
        a: 'It depends on how you cook and how much upkeep you want. Quartz and granite ask less day to day than marble. We walk through the tradeoffs in your kitchen so the choice fits the way you use it.',
      },
      {
        q: 'Can you repair a damaged countertop instead of replacing it?',
        a: 'Often, yes. We look at chips, cracks and seams first and tell you whether a repair or a replacement makes more sense.',
      },
      {
        q: 'Should I choose quartz, granite or marble?',
        a: 'It depends on the look you want and how much care you want to give it. Quartz and granite ask less day to day than marble. We walk through the tradeoffs in your kitchen or bath, including how stone marks if that matters to you.',
      },
      {
        q: 'Do you measure before the old counters come out?',
        a: 'Measuring happens when the cabinets are set and level. In a remodel, that is its own step, scheduled so we cut from the real kitchen, not a guess.',
      },
    ],
    related: ['kitchen-remodeling', 'bathroom-remodeling', 'backsplash'],
    image: img(
      '/images/services/countertops.jpg',
      'Quartz kitchen island in a Houston kitchen remodel',
    ),
    local: {
      heading: 'Stone cut to the kitchen you have.',
      body: [
        'A slab looks one way in a showroom and another once it is the island in a Memorial kitchen or the counter in a Heights bungalow. The edge, the overhang and the seam are what make it feel built for the room.',
        'We measure the cabinets that are actually set, including older houses in Bellaire, the Heights and West University, where a factory rectangle rarely fits.',
      ],
      conditions: [
        {
          title: 'Material for the way you cook',
          body: 'Quartz, granite, marble and solid surface wear differently. We talk through care and the edge shape before the stone is ordered.',
        },
        {
          title: 'Islands and edges',
          body: 'Waterfall edges, softened corners and sink cutouts are decided with the layout, so the island looks like one piece.',
        },
        {
          title: 'Out-of-square rooms',
          body: 'Inside-the-Loop kitchens are seldom perfectly square. Measuring on site is what makes the seams and the overhangs look intentional.',
        },
      ],
      neighborhoods: [
        'River Oaks',
        'Memorial',
        'Bellaire',
        'West University',
        'The Heights',
        'Galleria Area',
        'Katy',
        'The Woodlands',
      ],
    },
  },
  {
    slug: 'wood-flooring',
    name: 'Wood Flooring',
    group: 'Floors',
    tagline: 'Hardwood that warms a room for decades.',
    summary:
      'Hardwood and engineered wood: installation, replacement, dustless refinishing, staining and sealing.',
    metaTitle: 'Houston Wood Flooring',
    metaDescription:
      'Wood flooring in Houston: hardwood installation, refinishing, and dustless sanding. Call (713) 909-0034 for an estimate.',
    intro: [
      'Wood floors change how a Houston house looks and sounds, from a sunlit living room to a stair landing. Getting them right depends on a flat layer under the floor and a finish chosen for the room.',
      'We install hardwood and engineered planks, replace damaged sections, and refinish existing floors, including dustless sanding so the rest of the house stays cleaner. The wood adjusts in the house before it is fastened down.',
    ],
    includes: [
      'Hardwood and engineered wood installation',
      'Replacement of damaged boards',
      'Refinishing with dustless sanding',
      'Staining and sealing',
      'Stair landings and transitions',
    ],
    faqs: [
      {
        q: 'Should I refinish or replace my hardwood?',
        a: 'If the boards are sound and thick enough to sand, refinishing can renew the floor for much less disruption than replacement. We inspect the boards and the layer underneath first and tell you which path fits.',
      },
      {
        q: 'What is dustless sanding?',
        a: 'Sanding equipment connected to dust extraction, which captures most of the dust as it is created and keeps the rest of your home cleaner.',
      },
      {
        q: 'Do you install hardwood on stairs and in whole houses?',
        a: 'Yes. Planks, landings and stair treads are part of the same floor. We also talk through engineered versus solid where the room and the layer underneath make one the better choice, and we let the wood adjust in the house before it goes down.',
      },
      {
        q: 'Can you match new boards to an existing floor?',
        a: 'Often, yes, when the species and the finish can be blended. If the floor is worn evenly, refinishing the whole room usually looks more intentional than a patch.',
      },
    ],
    related: [
      'tile-flooring',
      'vinyl-flooring',
      'laminate-flooring',
      'water-damage-restoration',
    ],
    image: img(
      '/images/services/wood-flooring.jpg',
      'Light wood plank flooring in a Houston home',
    ),
    local: {
      heading: 'A floor that holds the whole house.',
      body: [
        'Hardwood in a Houston house is usually a whole-room decision: the living room, the hall, the stair. Wood type, width and stain are what you see. The layer underneath is what makes the floor stay flat.',
        'We install new planks and refinish floors that still have life in them. The wood adjusts in the house before it is fastened, which is how a new floor belongs in a Memorial, Heights or Woodlands home instead of arriving from a warehouse and warping later.',
      ],
      conditions: [
        {
          title: 'Refinish or replace',
          body: 'Sound boards can be sanded, stained and sealed. Worn-through or mismatched floors are better replaced. We inspect and tell you which.',
        },
        {
          title: 'Stairs and landings',
          body: 'Treads, landings and the floor they meet are finished so the wood feels like one stretch through the house.',
        },
        {
          title: 'The finish you live with',
          body: 'Stain and sealer are chosen for the room and the light, from a pale plank in a new build to a darker floor in an older house.',
        },
      ],
      neighborhoods: [
        'Memorial',
        'The Heights',
        'Bellaire',
        'West University',
        'River Oaks',
        'The Woodlands',
        'Bunker Hill',
        'Piney Point',
      ],
    },
  },
  {
    slug: 'tile-flooring',
    name: 'Tile Flooring',
    group: 'Floors',
    tagline: 'Pattern, stone and porcelain, laid flat and even.',
    summary:
      'Residential and commercial tile floors, with careful layout, grout and sealing.',
    metaTitle: 'Houston Tile Flooring',
    metaDescription:
      'Tile flooring in Houston: porcelain, stone-look, and patterned floors for homes and businesses. Call (713) 909-0034.',
    intro: [
      'Tile is the floor that can carry a pattern, a stone look, or a quiet span of large tile through an entry, a kitchen or a bath. It still has to be flat, and the layout has to be right from the first row.',
      'We install tile in homes and commercial spaces across Houston, prepare the surface underneath, and finish with grout and sealer suited to the room. Wet areas are waterproofed before the finish tile goes on.',
    ],
    includes: [
      'Residential and commercial installation',
      'Repair and replacement',
      'Layout and pattern planning',
      'Waterproof applications for wet areas',
      'Grouting and sealing',
    ],
    faqs: [
      {
        q: 'Can tile be laid over my existing floor?',
        a: 'Sometimes, if what is underneath is sound, flat and not too high for the doors and transitions. We check that surface before recommending it.',
      },
      {
        q: 'Do you handle patterned and encaustic-style tile?',
        a: 'Yes. Those patterns need a planned layout so the design centers and repeats correctly through the doorway.',
      },
      {
        q: 'Where does patterned tile work best?',
        a: 'Entries, kitchens and baths, where the pattern can be centered on a doorway or a room. We plan the layout so the design repeats instead of ending in a thin cut at the wall.',
      },
      {
        q: 'Do you tile floors in baths and showers as well as living areas?',
        a: 'Yes. Shower floors and bathroom floors are waterproofed. Living areas and entries are set for flatness, movement joints and the grout the room needs.',
      },
    ],
    related: ['wood-flooring', 'bathroom-remodeling', 'tile-fireplaces'],
    image: img(
      '/images/services/tile-flooring.jpg',
      'Patterned tile floor in a Houston home',
    ),
    local: {
      heading: 'Pattern and stone, laid for the room.',
      body: [
        'Houston tile floors show up as encaustic-style entries, stone-look kitchens, and large porcelain tile that runs from a hall into a bath. The design is the part you live with. A flat surface underneath is what makes large tile look right.',
        'We flatten first, then set the layout so the pattern meets the doorway. In showers and baths the waterproofing is in place before the finish tile. In living areas the work is the main floor, the grout and the transitions.',
      ],
      conditions: [
        {
          title: 'Large-format fields',
          body: 'Big porcelain makes every ridge in the floor obvious. Leveling is the long part of the job, and the finished room depends on it.',
        },
        {
          title: 'Patterned entries',
          body: 'Encaustic-style and geometric floors are centered on the room so the pattern shows from the front door.',
        },
        {
          title: 'Kitchens and baths',
          body: 'Stone-look kitchens and tiled baths are set with grout and, in wet rooms, a waterproof layer under the finish you see.',
        },
      ],
      neighborhoods: [
        'Bellaire',
        'Memorial',
        'West University',
        'Katy',
        'Pearland',
        'Sugar Land',
        'The Heights',
        'Upper Kirby',
      ],
    },
  },
  {
    slug: 'vinyl-flooring',
    name: 'Vinyl Flooring',
    group: 'Floors',
    tagline: 'The look of wood or stone, in a floor made for daily life.',
    summary:
      'Luxury vinyl plank, sheet and tile, clicked together, glued down or laid loose.',
    metaTitle: 'Houston Vinyl Flooring',
    metaDescription:
      'Vinyl flooring in Houston: luxury vinyl plank with a wood or stone look for kitchens and living areas. Call (713) 909-0034.',
    intro: [
      'Luxury vinyl plank gives a Houston house the look of wood or stone in kitchens, playrooms and first floors where you want a durable finish and a straightforward install.',
      'We install vinyl plank, sheet and vinyl tile with the method that fits the layer underneath, and we repair or replace worn sections when a full floor is more than you need.',
    ],
    includes: [
      'Luxury vinyl plank (LVP)',
      'Vinyl sheet and vinyl tile',
      'Click-lock, glue-down and floating installation',
      'Replacement and repair',
    ],
    faqs: [
      {
        q: 'Is vinyl a good choice for a kitchen or playroom?',
        a: 'Yes. It is a common upgrade where you want the look of wood and a floor that handles daily traffic. For a shower, tile is still the right choice, and we will say so.',
      },
      {
        q: 'Can vinyl go over my current floor?',
        a: 'Often, if the surface is flat, dry and sound. A wavy slab or a soft spot will show through. We check before we recommend it.',
      },
      {
        q: 'Can you replace a worn section without redoing the whole floor?',
        a: 'Often, if matching material is available and the layer underneath is flat. If the wear is even across the room, a full replacement usually looks cleaner.',
      },
      {
        q: 'Click-lock, glue-down or floating: which do you use?',
        a: 'Whichever the product and the layer underneath call for. Glue-down is often steadier on a slab. A floating floor is not fastened down. We explain the choice before materials are ordered.',
      },
    ],
    related: ['laminate-flooring', 'wood-flooring', 'tile-flooring'],
    image: img(
      '/images/services/vinyl-flooring.jpg',
      'Wood-look vinyl plank flooring in a Houston home',
    ),
    local: {
      heading: 'Wood look, chosen for the room.',
      body: [
        'Vinyl shows up in Houston as a kitchen floor, a playroom, or a first-floor upgrade in Katy, Pearland and Spring Branch, where families want the look of plank without committing the whole house to hardwood.',
        'We install it click-lock, glue-down or laid loose, whichever the product and the layer underneath call for. The floor is flat before the first plank goes down.',
      ],
      conditions: [
        {
          title: 'Kitchens and living areas',
          body: 'Plank that looks like wood or stone, laid through the rooms you use most, with transitions handled at the doorways.',
        },
        {
          title: 'Over an existing floor',
          body: 'Vinyl can often go over a sound, flat surface. A wavy floor will show through, so we check before we recommend it.',
        },
        {
          title: 'A full floor or a repair',
          body: 'Worn sections can be replaced when the product matches. An even, tired floor is usually better as a full installation.',
        },
      ],
      neighborhoods: [
        'Pearland',
        'Clear Lake',
        'Katy',
        'Spring Branch',
        'Bear Creek',
        'Sugar Land',
        'Baytown',
        'Stafford',
      ],
    },
  },
  {
    slug: 'laminate-flooring',
    name: 'Laminate Flooring',
    group: 'Floors',
    tagline: 'A clean, affordable look with a quick turnaround.',
    summary:
      'Laminate installation, repair and replacement, including the pad underneath, for a clean wood look.',
    metaTitle: 'Houston Laminate Flooring',
    metaDescription:
      'Laminate flooring in Houston: wood-look floors for bedrooms, halls, and living rooms. Call (713) 909-0034.',
    intro: [
      'Laminate gives a Houston house the look of wood with straightforward upkeep, which makes it a practical upgrade for bedrooms, halls and living rooms.',
      'We install click-lock or glued laminate over a flat floor with the right pad underneath, and we replace damaged planks when a full floor is more than you need.',
    ],
    includes: [
      'Laminate installation',
      'Click-lock or glue-down methods',
      'Underlayment',
      'Repair and replacement',
      'Water-resistant options',
    ],
    faqs: [
      {
        q: 'Is laminate a good fit for bedrooms and living rooms?',
        a: 'Yes. Those are the rooms where it usually belongs. For a bath or a shower, we will recommend tile or another floor instead.',
      },
      {
        q: 'Can you replace just the damaged planks?',
        a: 'In many cases, yes, if matching material is still available and the layer underneath is dry.',
      },
      {
        q: 'Where in a Houston house should I use laminate?',
        a: 'Bedrooms, halls and living rooms in newer houses in Katy, Cinco Ranch, Pearland and Magnolia are the usual fit. Kitchens can work with the right product. Baths are better in tile.',
      },
      {
        q: 'What does the pad underneath do?',
        a: 'It smooths small bumps and quiets the floor over concrete. A badly uneven slab still needs leveling. We check the floor before the planks arrive.',
      },
    ],
    related: ['vinyl-flooring', 'wood-flooring', 'tile-flooring'],
    image: img(
      '/images/services/laminate-flooring.jpg',
      'Chevron laminate flooring in a Houston home',
    ),
    local: {
      heading: 'A wood look with a quicker install.',
      body: [
        'Laminate is the floor we install when a Houston family wants the look of wood in bedrooms, halls and living rooms, and wants the work finished without a full sanding project.',
        'In newer houses in Cinco Ranch, Katy, Pearland and Magnolia we set it over prepared concrete with a pad chosen for that floor, not a generic roll chosen only for price.',
      ],
      conditions: [
        {
          title: 'Bedrooms and living rooms',
          body: 'The usual fit. The plank, the pad and the transitions are planned so the floor meets the doors cleanly.',
        },
        {
          title: 'A flat start',
          body: 'The layer underneath is checked and leveled where it needs it. The pad quiets the floor. A bad slab still gets fixed first.',
        },
        {
          title: 'Repairs that match',
          body: 'A damaged plank can often be replaced if the click system and the product are still available.',
        },
      ],
      neighborhoods: [
        'Katy',
        'Cinco Ranch',
        'Pearland',
        'Stafford',
        'Spring Branch',
        'Magnolia',
        'Richmond',
        'Sugar Land',
      ],
    },
  },
  {
    slug: 'carpentry',
    name: 'Carpentry',
    group: 'Interiors',
    tagline: 'The structure and trim that make a room feel finished.',
    summary:
      'Framing, trim, built-ins, stairs and woodwork, from repairs to custom pieces.',
    metaTitle: 'Houston Carpentry',
    metaDescription:
      'Carpentry in Houston: trim, built-ins, and stairs, matched to an older house or built new for the room. Call (713) 909-0034.',
    intro: [
      'Good carpentry is what makes a remodel feel finished: square framing, tight joints, and trim that belongs to the house. It is also the built-ins, stairs and woodwork people notice.',
      'We handle structural framing and finish carpentry, including shelving, stair work and wall paneling sized to the room you have.',
    ],
    includes: [
      'Framing and door or window openings',
      'Trim, molding and paneling',
      'Built-ins, shelving and closets',
      'Cabinet installation and modification',
      'Stairs and railings',
      'Repairs to existing woodwork',
    ],
    faqs: [
      {
        q: 'Do you build custom built-ins and shelving?',
        a: 'Yes. We build and install shelving, closets and built-ins sized to the wall, including the awkward alcoves common in older Houston houses.',
      },
      {
        q: 'Can you match trim in an older home?',
        a: 'In Heights, West University and Bellaire houses we can usually match the shape and size, or blend new trim so it looks like part of the room.',
      },
      {
        q: 'Can you add built-ins to a room that was never designed for them?',
        a: 'Yes. Alcoves in older Heights and West University houses, and plain walls in newer Memorial or Woodlands rooms, are both places we size shelving, closets and paneling to the wall that is there. The wood adjusts to the house before it is cut.',
      },
      {
        q: 'Do you do carpentry as part of a kitchen or bath remodel?',
        a: 'Yes. Framing, soffits, cabinet modifications and finish trim are often the carpentry inside a larger remodel, handled by the same team.',
      },
    ],
    related: [
      'kitchen-remodeling',
      'bathroom-remodeling',
      'painting-drywall-repair',
    ],
    image: img(
      '/images/services/carpentry.jpg',
      'Staircase millwork in a Houston home',
    ),
    local: {
      heading: 'Trim that belongs to the house.',
      body: [
        "Houston's older neighborhoods still have trim, stairs and panel shapes worth keeping. Newer houses in Memorial, Katy and The Woodlands often need the opposite: woodwork that gives a plain room a finished look.",
        'We match what should stay and build what the room is missing. The wood adjusts in the house before it is cut, so new trim sits with the old instead of fighting it.',
      ],
      conditions: [
        {
          title: 'Trim shapes',
          body: 'Heights, Rice Village and West University trim is often worth matching. We look at the existing shape before we recommend new.',
        },
        {
          title: 'Built-ins and stairs',
          body: 'Shelving, closets, stair treads and railings are sized to the opening, whether the house is a bungalow or a two-story.',
        },
        {
          title: 'Framing behind the walls',
          body: 'Opening a wall in a 1940s bungalow is different from framing in a 2000s two-story. We inspect before we cut.',
        },
      ],
      neighborhoods: [
        'The Heights',
        'West University',
        'Bellaire',
        'Rice Village',
        'Memorial',
        'River Oaks',
        'Upper Kirby',
        'The Woodlands',
      ],
    },
  },
  {
    slug: 'tile-fireplaces',
    name: 'Tile Fireplaces',
    group: 'Interiors',
    tagline: 'A hearth that anchors the room.',
    summary:
      'Tile and stone fireplace surrounds, new or refreshed, using materials that can handle the heat.',
    metaTitle: 'Houston Tile Fireplaces',
    metaDescription:
      'Tile fireplaces in Houston: new surrounds and retiling, with materials safe next to the fire. Call (713) 909-0034.',
    intro: [
      'In Houston a fireplace is usually the anchor of the room, not the heat source. A linear marble wall or a herringbone surround still has to be built with materials that are safe beside the fire.',
      'We install new surrounds and retile existing ones in living rooms from Memorial to The Woodlands, using appropriate tile, mortar and grout, then seal for protection.',
    ],
    includes: [
      'New tile fireplace installation',
      'Remodeling and updating existing surrounds',
      'Repair and retiling',
      'Heat-resistant tile and fire-safe mortar',
      'Grouting and sealing',
    ],
    faqs: [
      {
        q: 'Can you update an old brick or tile fireplace?',
        a: 'Yes. We review the existing surround and recommend whether to retile, resurface or rebuild. A lot of Houston living rooms have a brick box that no longer matches the house.',
      },
      {
        q: 'What tile is suitable around a fireplace?',
        a: 'Heat-resistant tile set with fire-safe mortar. We help you choose materials that look right and are appropriate next to the fire, even if the fireplace is used only a few nights a year.',
      },
      {
        q: 'Can the fireplace be mostly a design piece?',
        a: 'Yes. Many Houston hearths are the visual center of the room and are lit only occasionally. The tile and mortar next to the opening are still chosen for heat.',
      },
      {
        q: 'Can the surround be part of a larger living-room remodel?',
        a: 'Yes. Mantels, paneling and built-in shelving often travel with the tile, and our carpentry team handles that finish work.',
      },
    ],
    related: ['backsplash', 'tile-flooring', 'carpentry'],
    image: img(
      '/images/services/tile-fireplaces.jpg',
      'Tile fireplace surround in a Houston living room',
    ),
    local: {
      heading: 'The wall the living room is built around.',
      body: [
        'In Houston the fireplace is usually the anchor of the living room: the wall you see from the kitchen and the sofa. Updating it is a finish project, whether the surround is linear marble, herringbone tile or a stone great-room hearth.',
        'We still build it for a real fire. Heat-rated tile and mortar, a solid base, and a mantel or panel sized to the room, from a Memorial great room to a smaller West University living room.',
      ],
      conditions: [
        {
          title: 'A finish, not just masonry',
          body: 'The surround is the wall people see. Mantel, paneling and tile are planned together so the hearth belongs to the room.',
        },
        {
          title: 'Scale of the wall',
          body: 'Two-story rooms in The Woodlands and Katy can swallow a small surround. We size the tiled area to the room.',
        },
        {
          title: 'Older brick boxes',
          body: 'Inside-the-Loop houses often have a brick fireplace that can be retiled once we see what is behind the face.',
        },
      ],
      neighborhoods: [
        'Memorial',
        'River Oaks',
        'The Woodlands',
        'Katy',
        'Cinco Ranch',
        'Sugar Land',
        'West University',
        'Bellaire',
      ],
    },
  },

  {
    slug: 'roofing',
    name: 'Roofing',
    group: 'Roof & exterior',
    tagline: 'Repair or replacement, chosen for the house under the roof.',
    summary:
      'Inspections, repairs, tear-offs and new roofs, plus a tarp when a storm opens the roof.',
    metaTitle: 'Houston Roof Repair & Replacement',
    metaDescription:
      'Roofing in Houston, TX: inspections, repairs, tear-off and replacement in asphalt, metal, tile or composite, and emergency tarping after storms.',
    intro: [
      'A Houston roof is one system: the shingles, the layer beneath, the metal joints and the vents. We inspect it and say whether a repair will hold or the roof needs to come off.',
      'After a storm, the first job is often a tarp so the next round of weather stays outside. We photograph what we find for your records and any insurance claim. Your insurer decides coverage. The permanent roof is the step after the house is covered.',
    ],
    includes: [
      'Roof assessment and photographs',
      'Repairs when the roof can be saved',
      'Tear-off, underlayment, metal joints and vents',
      'New roofs in asphalt, metal, tile or composite',
      'Emergency tarping when the roof is open',
      'Help with insurance documentation',
    ],
    materials: {
      label: 'Roofing materials',
      items: [
        'Asphalt architectural shingles',
        'Metal',
        'Ceramic and concrete tile',
        'Slate and composite',
        'Cool-roof membranes',
      ],
    },
    faqs: [
      {
        q: 'Do you repair roofs, or only replace them?',
        a: 'Both. We inspect the roof and say whether a repair will hold or the roof needs to come off. A replacement includes the tear-off, a look at the wood under the shingles, new underlayment, metal joints, vents and the material you chose.',
      },
      {
        q: 'What roofing material makes sense in Houston?',
        a: 'We compare appearance, weight, heat and wind for your house. Architectural asphalt is common. Metal, tile and composite are options when the structure and the look call for them.',
      },
      {
        q: 'Will you help with my insurance claim?',
        a: 'We provide inspection photos and documentation that support a claim. Your insurer decides coverage.',
      },
      {
        q: 'What if water is coming in right now?',
        a: 'Call (713) 909-0034. A tarp is temporary protection, not a finished roof. We photograph the damage, cover the opening, and plan the permanent repair once the house is dry.',
      },
    ],
    related: [
      'roof-replacement',
      'roofing-emergency-tarp-repair',
      'siding',
      'water-damage-restoration',
    ],
    links: [
      {
        href: '/roof-replacement-cost-houston',
        label: 'What changes a Houston roof replacement cost',
      },
      {
        href: '/storm-and-hail-roof-repair-houston',
        label: 'Storm and hail roof repair in Houston',
      },
      {
        href: '/what-to-do-after-a-roof-leak-in-houston',
        label: 'What to do after a roof leak in Houston',
      },
      {
        href: '/hail-damage-vs-normal-wear-houston-roof',
        label: 'Hail damage vs normal wear on a Houston roof',
      },
      { href: '/houston-storm-damage', label: 'Houston storm damage help' },
      { href: '/commercial-storm-restoration', label: 'Commercial and apartment storm restoration' },
      { href: '/emergency-board-up', label: 'Emergency board-up' },
    ],
    image: img(
      '/images/projects/roofing/brick-home-multi-gable.webp',
      'Brick Houston home with a multi-gable shingle roof',
    ),
    local: {
      heading: 'The roof the house shows, and the one it needs.',
      body: [
        'Brick houses in Memorial and Bellaire and newer roofs in Katy, Pearland and The Woodlands get the same order: look, document, then repair or replace. Vents, valleys and metal joints go in with the roofing, not as an afterthought.',
        'Hurricane season and the squalls that come with it are a Houston fact. When a limb or lifted shingles open the roof, we tarp it when it is safe to be up there, then talk through the permanent roof with the pictures already in hand.',
      ],
      conditions: [
        {
          title: 'Repair or replace',
          body: 'We say which one the roof in front of us actually needs, after the inspection, not before.',
        },
        {
          title: 'The whole system',
          body: 'Underlayment, valleys, vent-pipe collars and attic vents are part of a replacement, along with the shingles or metal you see from the street.',
        },
        {
          title: 'The first dry night',
          body: 'A secured tarp buys time. It is not the finished roof, and we say when it needs to be checked.',
        },
      ],
      neighborhoods: [
        'Houston',
        'Westchase',
        'Alief',
        'Memorial',
        'Katy',
        'Sugar Land',
        'Bellaire',
        'Spring Branch',
      ],
    },
  },
  {
    slug: 'roof-replacement',
    name: 'Roof Replacement',
    group: 'Roof & exterior',
    tagline: 'A new roof, built for the house underneath it.',
    summary:
      'Assessment, tear-off and replacement in asphalt, metal, tile, slate and composite materials.',
    metaTitle: 'Houston Roof Replacement',
    metaDescription:
      'Roof replacement in Houston: tear-off, a new asphalt, metal, tile or composite roof, metal joints, vents and cleanup. Call (713) 909-0034.',
    intro: [
      'A roof replacement is the chance to put the right system on the house: the shingles, the layer beneath, metal at the joints and the vents, as one roof rather than a patchwork of repairs.',
      'We inspect, say whether the roof can be repaired or needs to come off, and install the new one. Material, color and shape change how the house looks from the street.',
    ],
    includes: [
      'Roof assessment and damage documentation',
      'Emergency tarping when needed',
      'Old roof removal',
      'New roofing installation',
      'Final inspection and cleanup',
      'Help with insurance documentation',
    ],
    materials: {
      label: 'Roofing materials',
      items: [
        'Asphalt architectural shingles',
        'Metal',
        'Ceramic and concrete tile',
        'Slate and composite',
        'Cool-roof membranes',
      ],
    },
    process: [
      {
        title: 'Assess',
        body: 'We inspect the roof and document the condition with photographs.',
      },
      {
        title: 'Protect',
        body: 'If the roof is open to weather, we tarp it to keep the house dry.',
      },
      {
        title: 'Document',
        body: 'We assemble the documentation an insurance claim needs, when one applies.',
      },
      {
        title: 'Remove',
        body: 'The old roofing comes off and the wood under the shingles is inspected.',
      },
      {
        title: 'Install',
        body: 'Underlayment and new roofing go on, with metal joints and vents finished.',
      },
      {
        title: 'Inspect',
        body: 'We inspect the finished roof and clean the property.',
      },
    ],
    faqs: [
      {
        q: 'Will you help with my insurance claim?',
        a: "We provide inspection photos and documentation that support a claim, and we work alongside your adjuster's process. Your insurer decides coverage.",
      },
      {
        q: 'What roofing material makes sense in Houston?',
        a: 'We compare appearance, weight, heat and wind for your house and neighborhood. Architectural asphalt is common. Metal, tile and composite are options when the structure and the look call for them.',
      },
      {
        q: 'What does a full roof replacement include?',
        a: 'Tear-off of the old roofing, a look at the wood below, new underlayment, metal joints, vents and the roofing material you chose, then a final inspection and cleanup.',
      },
      {
        q: 'Can you replace the roof and update the way the house looks?',
        a: 'Yes. Material, color and shape change how a brick Memorial house or a newer Katy or Woodlands roof looks from the street. We compare asphalt, metal, tile and composite for appearance, weight and the structure you have.',
      },
    ],
    related: [
      'roofing',
      'roofing-emergency-tarp-repair',
      'siding',
      'water-damage-restoration',
    ],
    links: [
      {
        href: '/roof-replacement-cost-houston',
        label: 'What changes a roof replacement cost',
      },
      {
        href: '/what-to-do-after-a-roof-leak-in-houston',
        label: 'What to do after a roof leak in Houston',
      },
      {
        href: '/hail-damage-vs-normal-wear-houston-roof',
        label: 'Hail damage vs normal wear on a Houston roof',
      },
    ],
    image: img(
      '/images/services/roof-replacement.webp',
      'Finished roof on a brick home in Houston',
    ),
    local: {
      heading: 'The roof the house shows, and the one it needs.',
      body: [
        'Replacing a Houston roof is both a street-facing upgrade and a system: shingles or metal, underlayment, metal joints and vents, detailed together. Brick houses in Memorial and Bellaire and newer roofs in Katy, Pearland and The Woodlands all get that same sequence.',
        'We photograph what we find, say whether repair or replacement makes sense, and install the new roof. Airflow is part of the replacement, and the color and shape are chosen for the front of the house.',
      ],
      conditions: [
        {
          title: 'Material and shape',
          body: 'Architectural asphalt is common. Metal, tile and composite are options when the look and the structure call for them.',
        },
        {
          title: 'The whole system',
          body: 'Underlayment, valleys, vent-pipe collars and attic vents go in with the new roofing, not as an afterthought.',
        },
        {
          title: 'How the house looks',
          body: 'A brick Memorial roof and a newer Katy or Woodlands roof can take different color and shape. We choose both for the front of the house.',
        },
      ],
      neighborhoods: [
        'Houston',
        'Memorial',
        'Katy',
        'The Woodlands',
        'Pearland',
        'Sugar Land',
        'Bellaire',
        'Clear Lake',
      ],
    },
  },
  {
    slug: 'roofing-emergency-tarp-repair',
    metaTitle: 'Houston Emergency Roof Tarping & Repair',
    name: 'Emergency Roof Tarping & Repair',
    group: 'Roof & exterior',
    tagline: 'When water is getting in, the first job is to stop it.',
    summary:
      'Inspection, photo documentation and waterproof tarping to protect your home until permanent repairs.',
    metaDescription:
      'Emergency roof tarping in Houston, TX: inspection, damage photos and a secured tarp after storms, until the permanent repair can be scheduled.',
    emergency: true,
    intro: [
      'After a Houston storm or a fallen limb, the priority is keeping water out of the house. A properly anchored tarp buys time to plan the permanent repair.',
      'We inspect the damage, photograph it for your records and any claim, tarp the exposed area, and plan the repair once the weather allows a real look at the wood under the shingles.',
    ],
    includes: [
      'Safety inspection of the roof',
      'Photo documentation of damage',
      'Waterproof tarp installation',
      'Water diversion',
      'Planning and coordination of permanent repairs',
    ],
    process: [
      {
        title: 'Inspect',
        body: 'We check the roof safely and identify where water is entering.',
      },
      {
        title: 'Document',
        body: 'Photographs capture the damage for your records and any insurance claim.',
      },
      {
        title: 'Select',
        body: 'We choose the tarp and the size for the opening and the weather.',
      },
      {
        title: 'Anchor',
        body: 'The tarp is secured so it stays put in the wind.',
      },
      { title: 'Divert', body: 'We direct water away from the opening.' },
      {
        title: 'Plan',
        body: 'We outline the permanent repair so you know what comes next.',
      },
    ],
    faqs: [
      {
        q: 'How do I reach you about a roof emergency?',
        a: 'Call (713) 909-0034. Tell us what happened and where in the Houston area, and we will advise on next steps. If you cannot call, the emergency form on this site reaches the same team.',
      },
      {
        q: 'Is a tarp a permanent fix?',
        a: 'No. A tarp is temporary protection through the next rounds of weather. We plan the permanent repair or replacement after the house is covered.',
      },
      {
        q: 'Should I tarp the roof before the insurance adjuster sees it?',
        a: 'Protecting the house from more water is the priority. We photograph the damage first so you have a record, then cover the opening. Your insurer decides what the claim covers.',
      },
      {
        q: 'What if water is already in the ceilings?',
        a: 'Say so when you call. A tarp stops more water from entering. Wet insulation and drywall are a separate drying job, and we handle that restoration as well.',
      },
    ],
    related: ['roofing', 'roof-replacement', 'water-damage-restoration', 'insurance-claims', 'emergency-board-up'],
    links: [
      { href: '/houston-storm-damage', label: 'Houston storm damage help' },
      { href: '/emergency', label: 'Emergency help' },
      { href: '/roofing', label: 'Roofing' },
      { href: '/emergency-board-up', label: 'Emergency board-up' },
      { href: '/commercial-storm-restoration', label: 'Commercial and apartment buildings' },
      { href: '/insurance-claims', label: 'Insurance claims help' },
    ],
    image: img(
      '/images/services/roofing-emergency-tarp-repair.jpg',
      'Emergency roof tarp secured on a Houston home after storm damage',
    ),
    local: {
      heading: 'The first dry night after a storm.',
      body: [
        'Hurricane season and the squalls that come with it are a Houston fact. Limbs, lifted shingles and wind-driven rain show up from Clear Lake and Galveston to Katy and The Woodlands, often on roofs that were ordinary the day before.',
        'We get on the roof when it is safe, photograph what happened, and anchor a tarp so the next band of weather stays outside. Then we talk through the permanent roof, with the pictures already in hand.',
      ],
      conditions: [
        {
          title: 'Storm season',
          body: 'Tropical weather and severe thunderstorms are when most of these calls come in. The job is to stop water, then plan.',
        },
        {
          title: 'Photographs first',
          body: 'We document the opening and the surrounding roof before the tarp covers it, for your records and any claim.',
        },
        {
          title: 'Wind after the tarp',
          body: 'A loose cover becomes the next problem. We anchor it for the weather still in the forecast, and we say when it needs to be checked.',
        },
      ],
      neighborhoods: [
        'Houston',
        'Clear Lake',
        'Galveston',
        'Pearland',
        'Katy',
        'Baytown',
        'The Woodlands',
        'Sugar Land',
      ],
    },
  },
  {
    slug: 'siding',
    name: 'Siding',
    group: 'Roof & exterior',
    tagline: 'The face your home shows the street.',
    summary:
      'Siding installation, repair and full replacement, including trim and color matching.',
    metaTitle: 'Houston Siding Repair & Replacement',
    metaDescription:
      'Siding in Houston: board-and-batten, lap and other styles, with trim and color matched to the front of the house. Call (713) 909-0034.',
    intro: [
      'Siding is the face the house shows the street. Board-and-batten, lap and other styles each need different detailing at corners, windows and trim, which is what makes the front of the house look finished.',
      'We install and replace siding, repair sections that can be matched, and finish the trim. The project is the wall itself: the style, the color and the corners.',
    ],
    includes: [
      'Installation and full replacement',
      'Repair of damaged sections',
      'Storm-damage restoration',
      'Trim, sealing and color matching',
    ],
    faqs: [
      {
        q: 'Can you repair a section instead of replacing all the siding?',
        a: 'Often, yes. It depends on matching the material and the color after Houston sun has faded what is already on the house. We assess that before we recommend a full replacement.',
      },
      {
        q: 'Can a new siding style change the front of the house?',
        a: 'Yes. Board-and-batten, lap and other styles, plus the trim at corners and windows, change how a Cinco Ranch, Woodlands or Memorial house looks from the curb.',
      },
      {
        q: 'What siding styles do you install?',
        a: 'Board-and-batten, lap and other common styles, including fiber cement and engineered wood. We talk through how each one finishes at corners, windows and the roof overhang, and which one fits the house.',
      },
      {
        q: 'Can siding repairs be documented for insurance?',
        a: 'Yes. We photograph the damage and the completed repair. Your insurer decides coverage.',
      },
    ],
    related: ['patios-decks', 'roof-replacement', 'roofing-emergency-tarp-repair', 'carpentry'],
    image: img(
      '/images/services/siding.jpg',
      'Board-and-batten siding on a Houston home',
    ),
    local: {
      heading: 'The front of the house, not just a wall covering.',
      body: [
        'A siding project in Houston is usually about how the house looks from the curb: board-and-batten on a newer Cinco Ranch or Woodlands house, or a matched repair on an older Memorial exterior that only needs a section.',
        'We detail corners, soffits and window trim so the new work looks deliberate. South and west walls fade faster here, so a repair is matched to the boards that are on the house now.',
      ],
      conditions: [
        {
          title: 'Full replacement',
          body: 'Profile, color and trim are chosen together, then installed so corners, windows and soffits finish cleanly.',
        },
        {
          title: 'A section that matches',
          body: 'Sun-faded walls are matched to what is there, not to the original chip. We say when a patch will blend and when the wall needs more.',
        },
        {
          title: 'Color on the front',
          body: 'The new boards and the trim are finished together, so the front is one color rather than a patch of a different shade.',
        },
      ],
      neighborhoods: [
        'Katy',
        'Cinco Ranch',
        'The Woodlands',
        'Magnolia',
        'Pearland',
        'Sugar Land',
        'Memorial',
        'Spring Branch',
      ],
    },
  },
  {
    slug: 'patios-decks',
    name: 'Patios & Decks',
    group: 'Roof & exterior',
    tagline: 'The outdoor room the house opens onto.',
    summary:
      'Decks, patios, and patio covers, built or rebuilt after a look at the framing and how the yard meets the house.',
    metaTitle: 'Houston Patios & Decks',
    metaDescription:
      'Patios and decks in Houston: new decks, rebuilds, patios, and covers, based on the framing and the yard you have. Call (713) 909-0034.',
    intro: [
      'A deck or a patio is the room outside the back door. We build new ones and rebuild ones that have worn out, starting with what is actually holding them up.',
      'Houston sun and rain decide the materials and the drainage. A cover, the rails, and the stairs are planned with the surface, so water sheds away from the house and the walk down is solid.',
    ],
    includes: [
      'New decks',
      'Deck rebuilds, down to the framing that is still sound',
      'Patios',
      'Patio covers',
      'Rails, stairs, and gates',
      'A check of the board that ties the deck to the house, plus footings and posts, before new boards go down',
    ],
    faqs: [
      {
        q: 'Can you repair a deck instead of replacing it?',
        a: 'Sometimes. We look at the framing, the board where the deck meets the house, and the footings first. Sound structure can take new decking and rails. Rotted structure comes out.',
      },
      {
        q: 'Do you build patio covers?',
        a: 'Yes. Posts, beams, and the roof are set so water sheds away from the wall. The cover is planned with the patio or deck under it, not added as an afterthought.',
      },
      {
        q: 'Wood or a composite board?',
        a: 'It depends on the look you want and how much upkeep you want in Houston sun and rain. We talk through that before anything is ordered.',
      },
      {
        q: 'Can the deck be part of a larger exterior project?',
        a: 'Often, yes. Siding, the door the deck meets, and the rails are easier to detail when the same crew is already on the house.',
      },
    ],
    related: ['siding', 'carpentry', 'roofing'],
    image: img(
      '/images/projects/siding/rear-deck-glass-doors.jpg',
      'Rear deck and glass doors on a Houston home',
    ),
    local: {
      heading: 'Outside the back door.',
      body: [
        'We start with what the yard and the door need: a ground-level patio, an elevated deck, or a cover that keeps the rain off the part you use.',
        'We measure the house side, the slope, and what is already there. A rebuild starts by opening up the framing. A new patio starts from the ground and the door it has to meet.',
      ],
      conditions: [
        {
          title: 'What is still sound',
          body: 'The board that ties the deck to the house, the posts, and the footings are inspected before new decking goes down. What can stay, stays. What cannot is replaced.',
        },
        {
          title: 'Rain and sun',
          body: 'The surface, the gaps, and a cover are chosen for Houston weather, so water leaves the house instead of sitting against it.',
        },
        {
          title: 'How it meets the house',
          body: 'The door, the siding, the stairs, and the rails are finished together so the outdoor room belongs with the house.',
        },
      ],
      neighborhoods: [
        'Westchase',
        'Energy Corridor',
        'Alief',
        'Memorial',
        'Katy',
        'Sugar Land',
        'The Woodlands',
        'Cinco Ranch',
      ],
    },
  },
  {
    slug: 'water-damage-restoration',
    metaTitle: 'Houston Water & Storm Restoration',
    name: 'Water Damage Restoration',
    group: 'Recovery',
    tagline: 'Dry it properly, then rebuild it right.',
    summary:
      'Assessment, extraction, drying, cleaning and structural repair after a leak, flood or storm.',
    metaDescription:
      'Water and storm damage restoration in Houston: drying, then the rebuild, with insurance claims help. Call (713) 909-0034.',
    emergency: true,
    intro: [
      'Water damage in Houston gets worse by the hour. Humidity slows drying, and standing water in a slab home invites mold and swells anything it touches.',
      'We find where the water went, remove it, dry the structure, clean and disinfect, and then rebuild. Recovery and the repairs stay with one team. We also handle fire and storm-related repairs.',
    ],
    includes: [
      'Moisture assessment with meters and thermal imaging',
      'Water extraction',
      'Drying and dehumidification',
      'Cleaning, disinfection and odor treatment',
      'Structural repairs',
      'Help with insurance documentation',
    ],
    process: [
      {
        title: 'Assess',
        body: 'Moisture meters and thermal imaging map where the water went.',
      },
      {
        title: 'Extract',
        body: 'Standing water is removed to stop further spread.',
      },
      {
        title: 'Dry',
        body: 'Air movers and dehumidifiers dry the structure and contents.',
      },
      {
        title: 'Clean',
        body: 'Affected areas are cleaned, disinfected and treated for odor.',
      },
      {
        title: 'Repair',
        body: 'Damaged drywall, flooring and finishes are rebuilt.',
      },
      {
        title: 'Verify',
        body: 'A final inspection confirms the structure is dry and safe.',
      },
    ],
    faqs: [
      {
        q: 'What should I do first after a leak or flood in Houston?',
        a: 'If it is safe, stop the water and call (713) 909-0034. Stay clear of wet electrical equipment. The sooner drying starts, the less of the house has to be rebuilt.',
      },
      {
        q: 'Can you rebuild after the drying?',
        a: 'Yes. We repair drywall, flooring, cabinetry and finishes once the structure is dry, so you are not hiring a second contractor to finish the job.',
      },
      {
        q: 'How quickly can mold become a concern here?',
        a: 'In Houston humidity, damp materials need drying right away. We track the moisture and keep air movers and dehumidifiers running until the readings say the structure is dry.',
      },
      {
        q: 'Do you help with insurance documentation?',
        a: 'We photograph the rooms and the drying and repair work. Coverage decisions belong to your insurer. Our insurance photo log is available if you want a room-by-room record of your own.',
      },
    ],
    related: [
      'painting-drywall-repair',
      'roofing',
      'roofing-emergency-tarp-repair',
      'insurance-claims',
    ],
    links: [
      {
        href: '/frozen-and-burst-pipes-in-houston',
        label: 'Frozen or burst pipe: what to do first',
      },
      {
        href: '/water-damage-insurance-claims-in-texas',
        label: 'Water-damage claim checklist',
      },
      {
        href: '/water-heater-flood',
        label: 'Water heater flood: drying and a rebuild',
      },
      {
        href: '/what-to-do-after-water-damage-houston',
        label: 'What to do after water damage in Houston',
      },
      {
        href: '/hurricane-season-prep-houston',
        label: 'Hurricane season prep for a Houston home',
      },
      {
        href: '/how-insurance-claims-work-texas-restoration',
        label: 'How insurance claims work for Texas restoration',
      },
      {
        href: '/what-to-do-after-a-roof-leak-in-houston',
        label: 'What to do after a roof leak in Houston',
      },
      {
        href: '/slab-moisture-after-a-supply-line-break-houston',
        label: 'Slab moisture after a supply-line break',
      },
      {
        href: '/how-to-build-an-insurance-photo-log',
        label: 'How to build an insurance photo log',
      },
      { href: '/houston-storm-damage', label: 'Houston storm damage help' },
      { href: '/commercial-storm-restoration', label: 'Commercial and apartment water restoration' },
      { href: '/burst-frozen-pipe-water-damage-houston', label: 'Burst or frozen pipe damage' },
      { href: '/water-heater-leak-damage-houston', label: 'Water heater leak damage' },
      { href: '/dishwasher-leak-water-damage-houston', label: 'Dishwasher leak damage' },
      { href: '/toilet-overflow-water-damage-houston', label: 'Toilet overflow damage' },
    ],
    image: img(
      '/images/services/water-damage-restoration.jpg',
      'Air movers drying a Houston home during water damage restoration',
    ),
    local: {
      heading: 'Dry the structure before you rebuild it.',
      body: [
        'Houston water damage is usually a supply line, an appliance, a roof opening after a storm, or water that came in at ground level. The houses sit in humid air, so a room that looks dry can still hold moisture in the slab, the insulation or the bottom of the drywall.',
        'We measure before we remove more than we have to, extract what is standing, and dry with air movers and dehumidifiers. Repairs to drywall, floors and cabinets start when the readings say it is dry.',
      ],
      conditions: [
        {
          title: 'Humidity slows drying',
          body: 'Outside air is often too wet to help. Dehumidification is part of the setup, not an optional add-on.',
        },
        {
          title: 'Slab and wall cavities',
          body: 'Meters and thermal imaging show water that has traveled past the stain you can see, which is common on Houston slabs.',
        },
        {
          title: 'Then the rebuild',
          body: 'Once the structure is dry, the same team repairs drywall, flooring and finishes instead of handing you off.',
        },
      ],
      neighborhoods: [
        'Houston',
        'Memorial',
        'Spring Branch',
        'Katy',
        'Pearland',
        'Clear Lake',
        'Bellaire',
        'The Heights',
      ],
    },
  },
  {
    slug: 'insurance-claims',
    name: 'Insurance Claims Help',
    group: 'Recovery',
    metaTitle: 'Houston Insurance Claims Help',
    tagline: 'Photographs and a clear record of the damage, for you and your adjuster.',
    summary:
      'Inspection photos and notes on water or storm damage. Your insurer decides what the claim covers.',
    metaDescription:
      'Insurance claims help in Houston, TX: damage photos and documentation for water and storm losses. Your insurer decides coverage. Call (713) 909-0034.',
    intro: [
      'When a roof or a pipe lets water in, a clear record helps the conversation with your insurer. We photograph the damage, note where the water went, and put that documentation with the repair plan.',
      'Your insurer decides what your policy covers. If you want a room-by-room record of your own before anything is moved, the insurance photo log on this site is free to use.',
    ],
    includes: [
      'Inspection photos of roof, water and storm damage',
      'Notes on what was wet and what was repaired',
      'Documentation you can share with your adjuster',
      'A free room-by-room photo log you can fill out yourself',
      'Drying and repairs once the house is protected',
    ],
    faqs: [
      {
        q: 'Do you file the claim or decide what is covered?',
        a: 'You file the claim, and your insurer decides coverage. We provide inspection photos and documentation.',
      },
      {
        q: 'Should I clean up before the photos?',
        a: 'Protect the house from more water, and photograph the damage before you throw things away. The insurance photo log walks a room at a time if you want to start that record yourself.',
      },
      {
        q: 'Can you dry and rebuild after the loss?',
        a: 'Yes. Tarping, drying, and the repairs to drywall, flooring and the roof can stay with the same team. The claim paperwork and the construction are separate jobs, and we keep them that way.',
      },
      {
        q: 'How do I reach you?',
        a: 'Call (713) 909-0034. If water is still coming in, say so. The emergency form on this site reaches the same team.',
      },
    ],
    related: [
      'water-damage-restoration',
      'roofing-emergency-tarp-repair',
      'roofing',
    ],
    links: [
      { href: '/insurance-log', label: 'Open the free insurance photo log' },
      {
        href: '/water-damage-insurance-claims-in-texas',
        label: 'Water-damage claim checklist',
      },
      {
        href: '/frozen-and-burst-pipes-in-houston',
        label: 'Frozen or burst pipe: what to do first',
      },
      {
        href: '/water-heater-flood',
        label: 'Water heater flood: drying and a rebuild',
      },
      {
        href: '/how-insurance-claims-work-texas-restoration',
        label: 'How insurance claims work for Texas restoration',
      },
      {
        href: '/storm-and-hail-roof-repair-houston',
        label: 'Storm and hail roof repair in Houston',
      },
      {
        href: '/how-to-build-an-insurance-photo-log',
        label: 'How to build an insurance photo log',
      },
      {
        href: '/hail-damage-vs-normal-wear-houston-roof',
        label: 'Hail damage vs normal wear on a Houston roof',
      },
      {
        href: '/slab-moisture-after-a-supply-line-break-houston',
        label: 'Slab moisture after a supply-line break',
      },
    ],
    image: img(
      '/images/projects/roofing/brick-house-missing-shingles.webp',
      'Brick Houston house with missing roof shingles',
    ),
    local: {
      heading: 'A record of what the storm or the leak did.',
      body: [
        'Houston claims we document usually start with a roof opening, a supply line, an appliance, or water that came in at ground level. We photograph what happened and the drying and repair work.',
        'The photo log is yours to use whether or not you hire us for the work. It is a room-by-room record you can share. What the policy pays is up to your insurer.',
      ],
      conditions: [
        {
          title: 'Photos before cleanup',
          body: 'Wide shots and close shots of the opening, the wet rooms, and the belongings, taken before they are moved.',
        },
        {
          title: 'What we write down',
          body: 'Where the water went, what was dried, and what was repaired. Your insurer uses that record however the policy allows.',
        },
        {
          title: 'The building, separately',
          body: 'Stopping more water and drying the structure happen before a coverage decision. We say which work is protection and which work is the rebuild.',
        },
      ],
      neighborhoods: [
        'Houston',
        'Westchase',
        'Alief',
        'Katy',
        'Sugar Land',
        'Bellaire',
        'Memorial',
        'Spring Branch',
      ],
    },
  },
  {
    slug: 'painting-drywall-repair',
    name: 'Painting & Drywall Repair',
    group: 'Recovery',
    tagline: 'The color and the smooth walls that finish a remodel.',
    summary:
      'Drywall patching and replacement, priming and interior painting, with the cleanup done.',
    metaTitle: 'Houston Painting & Drywall Repair',
    metaDescription:
      'Painting and drywall repair in Houston: patches, texture, primer, and interior paint. Call (713) 909-0034.',
    intro: [
      'Paint is how a Houston remodel actually finishes: new drywall in a kitchen, a patched wall in a living room, a powder room taken to a deeper color. The repair has to disappear, and the paint has to sit on a solid surface.',
      'We patch or replace drywall, prime, and paint, then clean up. Texture is blended so the new work meets the walls already in the house.',
    ],
    includes: [
      'Drywall patching and replacement',
      'Texture blending',
      'Priming',
      'Interior painting',
      'Cleanup',
    ],
    faqs: [
      {
        q: 'Will the repair be visible after painting?',
        a: 'A good repair should disappear. We soften the edges, prime and paint so the patch blends into the wall, including textured Houston interiors where a hard edge would show.',
      },
      {
        q: 'Do you paint whole rooms, or only the patched wall?',
        a: 'Both. A small patch is blended and painted so it disappears. A kitchen, bath or living room that changed is usually painted as a whole so the color and sheen match.',
      },
      {
        q: 'Can you match texture in an older Houston house?',
        a: 'Yes. Many Heights, Bellaire and West University walls are textured or meet older plaster. We blend the patch so the paint has one plane to cover.',
      },
      {
        q: 'Can you paint as part of a kitchen or bathroom remodel?',
        a: 'Yes. Once the drywall and tile are finished, interior paint is part of closing the project, matched to the rooms around the work.',
      },
    ],
    related: ['water-damage-restoration', 'carpentry', 'kitchen-remodeling'],
    image: img(
      '/images/projects/bathrooms/powder-room-charcoal-walls.jpg',
      'Painted powder room in a Houston home after drywall repair',
    ),
    local: {
      heading: 'The finish you notice when the work is done.',
      body: [
        'New drywall and paint are what make a kitchen, a bath or a living room feel done. In Heights, Bellaire and West University houses that often means blending into texture and trim that were already there.',
        'We patch, prime and paint so the new work disappears into the room. Color is matched to the walls around it. If a wall was opened because of a leak, we make sure it is dry before we close it. That check is just part of the job.',
      ],
      conditions: [
        {
          title: 'New walls in a remodel',
          body: 'Drywall after cabinets, tile or a layout change is taped, primed and painted with the rest of the room.',
        },
        {
          title: 'Color and sheen',
          body: 'A powder room can take a deeper color. A patched living room usually wants the paint that is already on the wall, carried far enough to blend.',
        },
        {
          title: 'Texture that matches',
          body: 'Many Houston walls are textured. We blend the patch into that surface so the paint has one plane to cover.',
        },
      ],
      neighborhoods: [
        'The Heights',
        'Bellaire',
        'West University',
        'Memorial',
        'Rice Village',
        'Upper Kirby',
        'Spring Branch',
        'Galleria Area',
      ],
    },
  },
  ...addedServiceInputs,
];

/** Services that already have city landing pages. New hubs stay off that list. */
export const cityIndexedServiceSlugs = new Set([
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
]);

export function isCityIndexedService(slug: string) {
  return cityIndexedServiceSlugs.has(slug);
}

export const services: Service[] = serviceInputs.map((service) => {
  const guide = serviceGuides[service.slug];
  if (!guide) throw new Error(`Missing service guide: ${service.slug}`);
  const extra = extraServiceFaqs[service.slug];
  if (!extra) throw new Error(`Missing customer FAQs: ${service.slug}`);
  return { ...service, faqs: [...service.faqs, ...extra], guide };
});

const priorityServiceSlugs = new Set([
  'kitchen-remodeling',
  'bathroom-remodeling',
  'roofing',
  'roof-replacement',
  'water-damage-restoration',
]);

function serviceMainWords(service: Service) {
  const steps =
    service.process ??
    service.guide.process ??
    processSteps.map((step) => ({ title: step.title, body: `${step.lead} ${step.body}` }));
  return wordCount([
    service.tagline,
    ...service.intro,
    ...service.includes,
    service.materials?.label,
    ...(service.materials?.items ?? []),
    service.local.heading,
    ...service.local.body,
    ...service.local.conditions.flatMap((condition) => [condition.title, condition.body]),
    ...service.local.neighborhoods,
    ...steps.flatMap((step) => [step.title, step.body]),
    ...service.guide.sections.flatMap((section) => [
      section.eyebrow,
      section.heading,
      ...section.paragraphs,
      ...(section.points ?? []).flatMap((point) => [point.title, point.body]),
    ]),
    ...service.faqs.flatMap((faq) => [faq.q, faq.a]),
    ...service.guide.faqs.flatMap((faq) => [faq.q, faq.a]),
  ]);
}

const serviceDepthErrors: string[] = [];
for (const service of services) {
  const words = serviceMainWords(service);
  const faqs = service.faqs.length + service.guide.faqs.length;
  if (words < 1500 || words > 3200) {
    serviceDepthErrors.push(`${service.slug} main content is ${words} words`);
  }
  if (faqs < 14 || faqs > 24) {
    serviceDepthErrors.push(`${service.slug} has ${faqs} FAQs`);
  }
  const extra = extraServiceFaqs[service.slug] ?? [];
  const originalFaqs = service.faqs.slice(0, service.faqs.length - extra.length);
  const existingKeys = new Set(
    [...originalFaqs, ...service.guide.faqs].map((item) => item.q.trim().toLowerCase()),
  );
  const repeated = [
    ...duplicateQuestions(extra),
    ...extra
      .filter((item) => existingKeys.has(item.q.trim().toLowerCase()))
      .map((item) => item.q),
  ];
  if (repeated.length > 0) {
    serviceDepthErrors.push(`${service.slug} repeats FAQ: ${repeated.join(' | ')}`);
  }
  const blob = [
    service.tagline,
    ...service.intro,
    ...service.guide.sections.flatMap((section) => section.paragraphs),
    ...service.faqs.map((faq) => `${faq.q} ${faq.a}`),
    ...service.guide.faqs.map((faq) => faq.a),
  ].join('\n');
  if (/\bGAF\b|\bIICRC\b/.test(blob)) {
    serviceDepthErrors.push(`${service.slug} mentions a banned name`);
  }
}

const deepHubMinimum = new Set([
  'roofing-emergency-tarp-repair',
  'emergency-board-up',
  'fence-installation-repair',
  'gutters',
  'patios',
  'gazebos',
  'decks',
  'commercial-storm-restoration',
]);
for (const service of services) {
  if (!deepHubMinimum.has(service.slug)) continue;
  const words = serviceMainWords(service);
  if (words < 2000) {
    serviceDepthErrors.push(`${service.slug} is ${words} words, under the 2000-word hub minimum`);
  }
}

const rankedServices = [...services].sort(
  (a, b) => serviceMainWords(b) - serviceMainWords(a),
);
for (const slug of priorityServiceSlugs) {
  if (!rankedServices.slice(0, 5).some((service) => service.slug === slug)) {
    serviceDepthErrors.push(`${slug} is not among the five longest service pages`);
  }
}
if (serviceDepthErrors.length > 0) {
  throw new Error(serviceDepthErrors.join('\n'));
}

export const servicesBySlug = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string) {
  return servicesBySlug.get(slug);
}

/** Canonical path for an individual service page (no `/services` prefix). */
export function servicePath(slug: string) {
  return `/${slug}`;
}

export function isServicePagePath(pathname: string) {
  const slug = pathname.replace(/^\//, '').split('/')[0];
  return slug.length > 0 && servicesBySlug.has(slug);
}

export function servicesInGroup(group: ServiceGroup) {
  return services.filter((s) => s.group === group);
}
