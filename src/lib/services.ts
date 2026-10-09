import { img, type Img } from '@/lib/images';

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
  intro: string[];
  includes: string[];
  materials?: { label: string; items: string[] };
  process?: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
  image: Img;
  emergency?: boolean;
  local: ServiceLocal;
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
    'What keeps the weather out, from a single repair to a complete replacement.',
  Recovery:
    'Paint and drywall that finish a remodel, and recovery when water or a storm is why you called.',
};

export const services: Service[] = [
  {
    slug: 'kitchen-remodeling',
    name: 'Kitchen Remodeling',
    group: 'Interiors',
    tagline: 'The room everything happens in, rebuilt around how you live.',
    summary:
      'Layouts, cabinetry, counters, lighting and finishes, planned and built as one project.',
    metaDescription:
      'Kitchen remodeling in Houston, TX: new layouts, cabinets, counters, backsplash and lighting for Heights, West University and open suburban family kitchens.',
    intro: [
      'A Houston kitchen remodel touches nearly every trade at once: cabinetry, counters, tile, flooring, electrical and plumbing. We manage that choreography so you talk to one team, not six.',
      'We walk the space with you, measure, and talk through how you cook, gather and store. Layout, cabinets and finishes are settled before demolition, so the room that comes back matches the way the house is lived in.',
    ],
    includes: [
      'Layout planning and design support',
      'Cabinets, hardware and built-in storage',
      'Countertops and backsplash',
      'Flooring transitions and repairs',
      'Lighting, including pendants and under-cabinet',
      'Full gut renovations or focused refreshes',
    ],
    faqs: [
      {
        q: 'Can you handle the whole kitchen, or only parts of it?',
        a: 'Both. Some clients want a full renovation. Others want new counters and a backsplash, or new flooring. We scope the work to what you actually need.',
      },
      {
        q: 'How long will a Houston kitchen remodel take?',
        a: 'It depends on the layout change and the lead time of the materials you choose. We give you a realistic sequence during the consultation, before work starts.',
      },
      {
        q: 'Can you open the kitchen to the rest of the house?',
        a: 'Often, yes. In Katy, Cinco Ranch and The Woodlands the kitchen is already the center of an open plan, and the work is the island, the sightlines and the lighting. In Heights, Bellaire and West University houses we measure structure and plumbing before we promise a wall can move.',
      },
      {
        q: 'Do you remodel kitchens inside the Loop and in the suburbs?',
        a: 'Yes. We work in Heights bungalows and West University houses as well as open plans in Katy, Cinco Ranch, Memorial and The Woodlands. Older houses often limit how far a wall or a drain can move, and we measure that before we promise a layout.',
      },
    ],
    related: ['countertops', 'backsplash', 'wood-flooring', 'carpentry'],
    image: img(
      '/images/services/kitchen-remodeling.jpg',
      'Luxury kitchen with a coffered ceiling, marble island and pendant lighting',
    ),
    local: {
      heading: 'A kitchen planned around how you live.',
      body: [
        'A lot of the kitchens we walk were built for a different routine: a closed Heights bungalow, a Memorial two-story, a Katy or Woodlands plan where the island has to hold the whole room. The remodel starts there.',
        'We settle the layout, the cabinets and the stone with you, then build it as one project. Cabinet boxes are specified so doors still close through a Houston summer. That is a materials choice inside the design.',
      ],
      conditions: [
        {
          title: 'The working layout',
          body: 'Islands, storage and the path from sink to range are decided before demolition, around how you cook and gather.',
        },
        {
          title: 'Open suburban plans',
          body: 'In Katy, Cinco Ranch and The Woodlands the kitchen is often the center of one large room. Islands, sightlines and lighting have to work for all of it.',
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
      'Showers, vanities, tile and lighting, planned as one bathroom and built with waterproofing behind the walls.',
    metaDescription:
      'Bathroom remodeling in Houston, TX: showers, vanities, tile and lighting, from a powder-room refresh to a full primary bath planned for how you use it.',
    intro: [
      'A bathroom remodel is a small room with a lot of decisions: the shower, the vanity, the tile and the light. We plan those with you and build them as one project.',
      'Waterproofing goes in before the finish tile, so the marble or porcelain you chose has a sound wall behind it. What you live with is the shower, the vanity and a room that finally works.',
    ],
    includes: [
      'Design guidance and fixture selection',
      'Tile for showers, floors and feature walls',
      'Vanities, tubs and shower systems',
      'Lighting and mirrors',
      'Plumbing and electrical preparation',
      'Waterproofing, plus accessibility-minded layout changes',
    ],
    faqs: [
      {
        q: 'Can you change the layout of my bathroom?',
        a: 'Yes. Moving a shower, vanity or tub is part of many projects. We review what the plumbing and structure allow during the consultation, which matters in older Heights and West University houses as much as in newer slab homes.',
      },
      {
        q: 'Do you install large-format and patterned tile?',
        a: 'Yes. Large-format porcelain, mosaics, herringbone and encaustic-style patterns need careful layout and a flat substrate, and our tile work spans showers, floors and feature walls.',
      },
      {
        q: 'What is the difference between a refresh and a full remodel?',
        a: 'A refresh might be a new vanity, mirror and light. A full remodel moves the shower or tub, retile the room and changes the layout. We scope it to the bathroom you have, from a West University powder room to a Memorial primary.',
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
    image: img(
      '/images/services/bathroom-remodeling.jpg',
      'Marble-lined shower with a frameless glass door in a remodeled bathroom',
    ),
    local: {
      heading: 'The bath you use every day, rebuilt.',
      body: [
        'Houston baths we remodel range from a tight powder room in West University to a primary suite in Memorial or The Woodlands. The square footage changes. The sequence does not: layout, fixtures, tile, then the finish you live with.',
        'Waterproofing is part of that sequence, done before the tile goes on. The project itself is the room: the shower you step into, the vanity, and the light.',
      ],
      conditions: [
        {
          title: 'Shower, tub, or both',
          body: 'We help you choose the fixture and the tile, then build the enclosure so niches, glass and the floor read as one design.',
        },
        {
          title: 'Vanities and light',
          body: 'Mirrors, sconces and storage are planned with the vanity, so a small powder room still feels finished.',
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
      'Ceramic, porcelain, glass, marble and stone tile, laid out, grouted and sealed with care.',
    metaDescription:
      'Backsplash installation in Houston, TX: ceramic, porcelain, glass, marble and stone patterns set behind the range or along the full run of the counter.',
    intro: [
      'A backsplash is the wall that finishes the kitchen. Chevron, herringbone, geometric and hand-finished tile all live or die by their layout.',
      'We dry-lay patterns before setting them, so cuts land where they should and the design centers on the range, the hood or the window. Grout and sealer are chosen so a working kitchen can be wiped down.',
    ],
    includes: [
      'New backsplash installation',
      'Removal and replacement of old tile',
      'Custom layouts and patterns',
      'Repairs, regrouting and sealing',
      'Waterproofing where needed',
    ],
    materials: {
      label: 'Materials we set',
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
        a: 'Usually, yes. We remove the old tile carefully and protect the counters and cabinets. The condition of the wall behind the tile can change the scope.',
      },
      {
        q: 'Do you do herringbone, chevron and geometric layouts?',
        a: 'Yes. Those patterns need a planned layout. We mock them up so the repeat centers on the range, the window or the hood.',
      },
      {
        q: 'Which tile works on a short kitchen wall?',
        a: 'Chevron, herringbone and geometric tile all can. On a short Heights or West University run we plan the repeat so the cuts do not pile up at the end, and the pattern centers on the range or the hood.',
      },
      {
        q: 'Can a backsplash be part of a larger remodel?',
        a: 'Yes. It is often the last visible layer of a kitchen project, set after counters are templated so the tile meets the stone cleanly.',
      },
    ],
    related: ['kitchen-remodeling', 'countertops', 'tile-fireplaces'],
    image: img(
      '/images/services/backsplash.webp',
      'Ornate ceramic tile backsplash above a marble kitchen counter',
    ),
    local: {
      heading: 'The wall that finishes the kitchen.',
      body: [
        'In a Houston kitchen the backsplash is often the surface people notice from the doorway: the pattern behind the range, the stone against the counter, the line where tile meets cabinet.',
        'We set the field so that pattern reads, then grout and finish the edges. A sealer suited to a working kitchen is part of the install, so the wall you chose can be wiped down.',
      ],
      conditions: [
        {
          title: 'Centered on the range',
          body: 'The repeat is planned before the first tile is set, so the focal point lands on the hood, the window or the range.',
        },
        {
          title: 'Pattern on a short wall',
          body: 'Older inside-the-Loop kitchens often have a short run. Chevron and herringbone have to be planned so the cuts do not pile up at the end.',
        },
        {
          title: 'Stone against stone',
          body: 'Marble counters and a stone backsplash need joints and sealers that agree. We coordinate that with the countertop work.',
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
      'Granite, quartz, marble and solid-surface counters with custom edges and precise fabrication.',
    metaDescription:
      'Countertop installation in Houston, TX: granite, quartz, marble and solid surface, templated on site for islands, edges and the kitchen you use every day.',
    intro: [
      'Countertops are the surface you touch most in a kitchen or bath. The material, the edge and the seams all matter, and so does a template taken from the cabinets that are actually in the room.',
      'We help you compare granite, quartz, marble and solid surface for how they look and how you want to live with them, then handle measurement, fabrication and installation.',
    ],
    includes: [
      'Installation and replacement',
      'Repairs to existing counters',
      'Custom edge profiles',
      'Precise templating and fabrication',
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
        q: 'Do you template before the old counters come out?',
        a: 'Templating happens when the cabinets are set and level. In a remodel, that is its own step, scheduled so fabrication does not start on a guess.',
      },
    ],
    related: ['kitchen-remodeling', 'bathroom-remodeling', 'backsplash'],
    image: img(
      '/images/services/countertops.jpg',
      'Quartz kitchen island with woven shades in the background',
    ),
    local: {
      heading: 'Stone cut to the kitchen you have.',
      body: [
        'A slab looks one way in a showroom and another once it is the island in a Memorial kitchen or the counter in a Heights bungalow. The edge, the overhang and the seam are what make it feel built for the room.',
        'We template to the cabinets that are actually set, including out-of-square older houses in Bellaire, the Heights and West University, where a factory rectangle rarely fits.',
      ],
      conditions: [
        {
          title: 'Material for the way you cook',
          body: 'Quartz, granite, marble and solid surface wear differently. We talk through care and the edge profile before the slab is ordered.',
        },
        {
          title: 'Islands and edges',
          body: 'Waterfall edges, eased corners and sink cutouts are decided with the layout, so the island reads as one piece.',
        },
        {
          title: 'Out-of-square rooms',
          body: 'Inside-the-Loop kitchens are seldom perfectly square. Templating on site is what makes the seams and the overhangs look intentional.',
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
    metaDescription:
      'Wood flooring in Houston, TX: hardwood and engineered installation, refinishing and dustless sanding for living rooms, halls and stairs in Houston houses.',
    intro: [
      'Wood floors change how a Houston house looks and sounds, from a sunlit living room to a stair landing. Getting them right depends on a flat subfloor and a finish chosen for the room.',
      'We install hardwood and engineered planks, replace damaged sections, and refinish existing floors, including dustless sanding so the rest of the house stays cleaner. Material is acclimated in the house before it is fastened down.',
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
        a: 'If the boards are sound and thick enough to sand, refinishing can renew the floor for much less disruption than replacement. We inspect the boards and the subfloor first and tell you which path fits.',
      },
      {
        q: 'What is dustless sanding?',
        a: 'Sanding equipment connected to dust extraction, which captures most of the dust as it is created and keeps the rest of your home cleaner.',
      },
      {
        q: 'Do you install hardwood on stairs and in whole houses?',
        a: 'Yes. Planks, landings and stair treads are part of the same floor. We also talk through engineered versus solid where the room and the subfloor make one the better choice, and we acclimate the wood in the house before it goes down.',
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
      'Light wood plank flooring in an empty, sunlit room',
    ),
    local: {
      heading: 'A floor that holds the whole house.',
      body: [
        'Hardwood in a Houston house is usually a whole-room decision: the living room, the hall, the stair. Species, width and stain are what you see. The subfloor underneath is what makes the floor stay flat.',
        'We install new planks and refinish floors that still have life in them. Wood is acclimated in the house before it is fastened, which is how a new floor belongs in a Memorial, Heights or Woodlands home instead of arriving from a warehouse and cupping later.',
      ],
      conditions: [
        {
          title: 'Refinish or replace',
          body: 'Sound boards can be sanded, stained and sealed. Worn-through or mismatched floors are better replaced. We inspect and say which.',
        },
        {
          title: 'Stairs and landings',
          body: 'Treads, landings and the floor they meet are detailed so the wood reads as one run through the house.',
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
    tagline: 'Pattern, stone and porcelain, laid flat and true.',
    summary:
      'Residential and commercial tile floors, with careful layout, grout and sealing.',
    metaDescription:
      'Tile flooring in Houston, TX: porcelain, stone-look and patterned floors for homes and businesses, laid out for the room over a flat, prepared substrate.',
    intro: [
      'Tile is the floor that can carry a pattern, a stone look, or a quiet large-format field through an entry, a kitchen or a bath. It still has to be flat, and the layout has to be right from the first row.',
      'We install tile in homes and commercial spaces across Houston, prepare the substrate, and finish with grout and sealer suited to the room. Wet areas are waterproofed before the finish tile goes on.',
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
        a: 'Sometimes, if what is underneath is sound, flat and not too high for the doors and transitions. We check the substrate before recommending it.',
      },
      {
        q: 'Do you handle patterned and encaustic-style tile?',
        a: 'Yes. Those patterns need a planned layout so the design centers and repeats correctly through the doorway.',
      },
      {
        q: 'Where does patterned tile work best?',
        a: 'Entries, kitchens and baths, where the pattern can be centered on a doorway or a room. We plan the layout so the design repeats instead of dying in a cut at the wall.',
      },
      {
        q: 'Do you tile floors in baths and showers as well as living areas?',
        a: 'Yes. Shower floors and bathroom floors are waterproofed. Living areas and entries are set for flatness, movement joints and the grout the room needs.',
      },
    ],
    related: ['wood-flooring', 'bathroom-remodeling', 'tile-fireplaces'],
    image: img(
      '/images/services/tile-flooring.jpg',
      'Encaustic-style patterned tile floor',
    ),
    local: {
      heading: 'Pattern and stone, laid for the room.',
      body: [
        'Houston tile floors show up as encaustic-style entries, stone-look kitchens, and large-format porcelain that runs from a hall into a bath. The design is the part you live with. The flat substrate is what makes large tile look intentional.',
        'We flatten first, then set the layout so the pattern meets the doorway. In showers and baths the waterproofing is in place before the finish tile. In living areas the work is the field, the grout and the transitions.',
      ],
      conditions: [
        {
          title: 'Large-format fields',
          body: 'Big porcelain makes every ridge in the floor obvious. Prep is the long part of the job, and it is what the finished room depends on.',
        },
        {
          title: 'Patterned entries',
          body: 'Encaustic-style and geometric floors are centered on the room so the repeat reads from the front door.',
        },
        {
          title: 'Kitchens and baths',
          body: 'Stone-look kitchens and tiled baths are set with grout and, in wet rooms, a membrane under the finish you see.',
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
      'Luxury vinyl plank, sheet and tile, installed as click-lock, glue-down or floating floors.',
    metaDescription:
      'Vinyl flooring in Houston, TX: luxury vinyl plank, sheet and tile with a wood or stone look, chosen for kitchens, playrooms and first-floor living areas.',
    intro: [
      'Luxury vinyl plank gives a Houston house the look of wood or stone in kitchens, playrooms and first floors where you want a durable finish and a straightforward install.',
      'We install LVP, sheet and vinyl tile with the method that fits your subfloor, and we repair or replace worn sections when a full floor is more than you need.',
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
        a: 'Yes. It is a common upgrade where you want the look of wood and a floor that handles daily traffic. For a shower, tile is still the right assembly, and we will say so.',
      },
      {
        q: 'Can vinyl go over my current floor?',
        a: 'Often, if the surface is flat, dry and sound. A wavy slab or a soft spot will telegraph through. We check before we recommend it.',
      },
      {
        q: 'Can you replace a worn section without redoing the whole floor?',
        a: 'Often, if matching material is available and the subfloor is flat. If the wear is even across the room, a full replacement usually looks cleaner.',
      },
      {
        q: 'Click-lock, glue-down or floating: which do you use?',
        a: 'Whichever the product and the subfloor call for. Glue-down is often steadier on a slab. We explain the choice before materials are ordered.',
      },
    ],
    related: ['laminate-flooring', 'wood-flooring', 'tile-flooring'],
    image: img(
      '/images/services/vinyl-flooring.jpg',
      'Plank flooring in a bright room with black-framed windows',
    ),
    local: {
      heading: 'Wood look, chosen for the room.',
      body: [
        'Vinyl shows up in Houston as a kitchen floor, a playroom, or a first-floor upgrade in Katy, Pearland and Spring Branch, where families want the look of plank without committing the whole house to hardwood.',
        'We install it click-lock, glue-down or floating, whichever the product and the subfloor call for. The floor is flat before the first plank goes down.',
      ],
      conditions: [
        {
          title: 'Kitchens and living areas',
          body: 'Plank that reads as wood or stone, run through the rooms you use most, with transitions handled at the doorways.',
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
      'Laminate installation, repair and replacement, including underlayment, for a clean wood look.',
    metaDescription:
      'Laminate flooring in Houston, TX: click-lock or glue-down wood-look floors with underlayment, installed in bedrooms, halls and living rooms across the house.',
    intro: [
      'Laminate gives a Houston house the look of wood with straightforward upkeep, which makes it a practical upgrade for bedrooms, halls and living rooms.',
      'We install click-lock or glued laminate over a flat subfloor with the right underlayment, and we replace damaged planks when a full floor is more than you need.',
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
        a: 'In many cases, yes, if matching material is still available and the subfloor underneath is dry.',
      },
      {
        q: 'Where in a Houston house should I use laminate?',
        a: 'Bedrooms, halls and living rooms in newer houses in Katy, Cinco Ranch, Pearland and Magnolia are the usual fit. Kitchens can work with the right product. Baths are better in tile.',
      },
      {
        q: 'What does underlayment do here?',
        a: 'It smooths minor variation and quiets the floor over concrete. It does not fix a badly uneven slab. We check the floor before the planks arrive.',
      },
    ],
    related: ['vinyl-flooring', 'wood-flooring', 'tile-flooring'],
    image: img(
      '/images/services/laminate-flooring.jpg',
      'Chevron plank flooring detail',
    ),
    local: {
      heading: 'A wood look with a quicker install.',
      body: [
        'Laminate is the floor we install when a Houston family wants the look of wood in bedrooms, halls and living rooms, and wants the work finished without a full sanding project.',
        'In newer houses in Cinco Ranch, Katy, Pearland and Magnolia we set it over prepared concrete with underlayment specified for that floor, not a generic roll chosen only for price.',
      ],
      conditions: [
        {
          title: 'Bedrooms and living rooms',
          body: 'The usual fit. The plank, the underlayment and the transitions are planned so the floor meets the doors cleanly.',
        },
        {
          title: 'A flat start',
          body: 'The subfloor is checked and leveled where it needs it. Underlayment quiets the floor. It does not hide a bad slab.',
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
      'Framing, trim, built-ins, stairs and millwork, from repairs to custom pieces.',
    metaDescription:
      'Carpentry in Houston, TX: finish trim, built-ins, stairs and millwork, matched to older Heights and West University profiles or built new for the room.',
    intro: [
      'Good carpentry is what makes a remodel feel finished: square framing, tight joints, and trim that belongs to the house. It is also the built-ins, stairs and millwork people notice.',
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
        a: 'In Heights, West University and Bellaire houses we can usually match profiles and proportions, or blend new trim so it reads as part of the room.',
      },
      {
        q: 'Can you add built-ins to a room that was never designed for them?',
        a: 'Yes. Alcoves in older Heights and West University houses, and plain walls in newer Memorial or Woodlands rooms, are both places we size shelving, closets and paneling to the wall that is there. Wood is acclimated in the house before it is cut.',
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
      'Staircase with geometric wall millwork in a custom-finished home',
    ),
    local: {
      heading: 'Trim that belongs to the house.',
      body: [
        "Houston's older neighborhoods still have casing, stairs and panel profiles worth keeping. Newer houses in Memorial, Katy and The Woodlands often need the opposite: millwork that gives a plain room a point of view.",
        'We match what should stay and build what the room is missing. Material is acclimated in the house before it is cut, so new trim sits with the old instead of fighting it.',
      ],
      conditions: [
        {
          title: 'Older profiles',
          body: 'Heights, Rice Village and West University trim is often worth matching. We look at the existing profile before we recommend new.',
        },
        {
          title: 'Built-ins and stairs',
          body: 'Shelving, closets, stair treads and railings are sized to the opening, whether the house is a bungalow or a two-story.',
        },
        {
          title: 'Structure you do not see',
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
      'Tile and stone fireplace surrounds, new or refreshed, set with heat-appropriate materials.',
    metaDescription:
      'Tile fireplace installation in Houston, TX: heat-rated surrounds, retiling and sealing for living rooms that anchor the Houston house through the year.',
    intro: [
      'In Houston a fireplace is usually the anchor of the room, not the heat source. A linear marble wall or a herringbone surround still has to be built with materials rated for the firebox.',
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
        a: 'Heat-resistant tile set with fire-safe mortar. We help you choose materials that look right and are appropriate next to the firebox, even if the fireplace is used only a few nights a year.',
      },
      {
        q: 'Can the fireplace be mostly a design piece?',
        a: 'Yes. Many Houston hearths are the visual center of the room and are lit only occasionally. The tile and mortar next to the opening are still specified for heat.',
      },
      {
        q: 'Can the surround be part of a larger living-room remodel?',
        a: 'Yes. Mantels, paneling and built-in shelving often travel with the tile, and our carpentry team handles that finish work.',
      },
    ],
    related: ['backsplash', 'tile-flooring', 'carpentry'],
    image: img(
      '/images/services/tile-fireplaces.jpg',
      'Linear marble fireplace wall in a modern living room',
    ),
    local: {
      heading: 'The wall the living room is built around.',
      body: [
        'In Houston the fireplace is usually the anchor of the living room: the wall you see from the kitchen and the sofa. Updating it is a finish project, whether the surround is linear marble, herringbone tile or a stone great-room hearth.',
        'We still build it for fire. Heat-rated tile and mortar, a sound substrate, and a mantel or panel detail sized to the room, from a Memorial great room to a smaller West University living room.',
      ],
      conditions: [
        {
          title: 'A finish, not just masonry',
          body: 'The surround is the wall people see. Mantel, paneling and tile are planned together so the hearth belongs to the room.',
        },
        {
          title: 'Scale of the wall',
          body: 'Two-story rooms in The Woodlands and Katy can swallow a small surround. We size the tile field to the volume.',
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
    slug: 'roof-replacement',
    name: 'Roof Replacement',
    group: 'Roof & exterior',
    tagline: 'A new roof, detailed for the house underneath it.',
    summary:
      'Assessment, tear-off and replacement in asphalt, metal, tile, slate and composite materials.',
    metaDescription:
      'Roof replacement in Houston, TX: tear-off and a new roof in asphalt, metal, tile or composite, detailed with flashing, vents and a finished site cleanup.',
    intro: [
      'A roof replacement is the chance to put the right system on the house: the material, the underlayment, the flashing and the ventilation, planned as one roof rather than a patchwork of repairs.',
      'We inspect, say whether the roof can be repaired or needs to come off, and install the new one. Material, color and profile change how the house reads from the street.',
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
        body: 'The old roofing comes off and the deck is inspected.',
      },
      {
        title: 'Install',
        body: 'Underlayment and new roofing go on, with flashing and vents detailed.',
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
        a: 'Tear-off of the old roofing, a look at the deck, new underlayment, flashing, vents and the roofing material you chose, then a final inspection and cleanup.',
      },
      {
        q: 'Can you replace the roof and update the way the house looks?',
        a: 'Yes. Material, color and profile change how a brick Memorial house or a newer Katy or Woodlands roof reads from the street. We compare asphalt, metal, tile and composite for appearance, weight and the structure you have.',
      },
    ],
    related: [
      'roofing-emergency-tarp-repair',
      'siding',
      'water-damage-restoration',
    ],
    image: img(
      '/images/services/roof-replacement.webp',
      'Brick home with multiple gables and a newly finished roof',
    ),
    local: {
      heading: 'The roof the house shows, and the one it needs.',
      body: [
        'Replacing a Houston roof is both a street-facing upgrade and a full system: shingles or metal, underlayment, flashing and vents, detailed together. Brick houses in Memorial and Bellaire and newer roofs in Katy, Pearland and The Woodlands all get that same sequence.',
        'We photograph what we find, say whether repair or replacement makes sense, and install the new roof. Ventilation is part of the replacement, and the color and profile are chosen for the elevation you see from the street.',
      ],
      conditions: [
        {
          title: 'Material and profile',
          body: 'Architectural asphalt is common. Metal, tile and composite are options when the look and the structure call for them.',
        },
        {
          title: 'The whole system',
          body: 'Underlayment, valleys, pipe boots and attic vents go in with the new roofing, not as an afterthought.',
        },
        {
          title: 'How the house reads',
          body: 'A brick Memorial roof and a newer Katy or Woodlands roof can take different color and profile. We choose both with the elevation.',
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
    name: 'Emergency Roof Tarping & Repair',
    group: 'Roof & exterior',
    tagline: 'When water is getting in, the first job is to stop it.',
    summary:
      'Inspection, photo documentation and waterproof tarping to protect your home until permanent repairs.',
    metaDescription:
      'Emergency roof tarping in Houston, TX: inspection, damage photos and a secured tarp after storms, until the permanent roof repair can be scheduled with you.',
    emergency: true,
    intro: [
      'After a Houston storm or a fallen limb, the priority is keeping water out of the house. A properly anchored tarp buys time to plan the permanent repair.',
      'We inspect the damage, photograph it for your records and any claim, tarp the exposed area, and coordinate the repair once the weather allows a real look at the deck.',
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
        body: 'We choose tarp material and sizing for the opening and the weather.',
      },
      {
        title: 'Anchor',
        body: 'The tarp is secured so wind will not lift it.',
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
    related: ['roof-replacement', 'water-damage-restoration', 'siding'],
    image: img(
      '/images/services/roofing-emergency-tarp-repair.jpg',
      'Aerial view of a blue tarp secured across a damaged roof',
    ),
    local: {
      heading: 'The first dry night after a storm.',
      body: [
        'Hurricane season and the squalls that come with it are a Houston fact. Limbs, lifted shingles and wind-driven rain show up from Clear Lake and Galveston to Katy and The Woodlands, often on roofs that were ordinary the day before.',
        'We get on the roof when it is safe, photograph what happened, and anchor a tarp so the next band of weather stays outside. The permanent roof is the following conversation, with the pictures already in hand.',
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
    metaDescription:
      'Siding installation and replacement in Houston, TX: board-and-batten, lap and other profiles, with trim, corners and color matched to the street elevation.',
    intro: [
      'Siding is the face the house shows the street. Board-and-batten, lap and other profiles each need different detailing at corners, windows and trim, which is what makes a new elevation look finished.',
      'We install and replace siding, repair sections that can be matched, and finish the trim. The project is the wall itself: the profile, the color and the corners.',
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
        q: 'Can a new siding profile change the elevation?',
        a: 'Yes. Board-and-batten, lap and other profiles, plus the trim at corners and windows, change how a Cinco Ranch, Woodlands or Memorial house reads from the curb.',
      },
      {
        q: 'What siding profiles do you install?',
        a: 'Board-and-batten, lap and other common profiles, including fiber cement and engineered wood. We talk through how each one finishes at corners, windows and soffits, and which one fits the house.',
      },
      {
        q: 'Can siding repairs be documented for insurance?',
        a: 'Yes. We photograph the damage and the completed repair. Your insurer decides coverage.',
      },
    ],
    related: ['roof-replacement', 'roofing-emergency-tarp-repair', 'carpentry'],
    image: img(
      '/images/services/siding.jpg',
      'Farmhouse exterior with board-and-batten siding',
    ),
    local: {
      heading: 'An elevation, not just a wall covering.',
      body: [
        'A siding project in Houston is usually about how the house reads from the curb: board-and-batten on a newer Cinco Ranch or Woodlands elevation, or a matched repair on an older Memorial exterior that only needs a section.',
        'We detail corners, soffits and window trim so the new work looks deliberate. South and west walls fade faster here, so a repair is matched to the boards that are on the house now.',
      ],
      conditions: [
        {
          title: 'Full replacement',
          body: 'Profile, color and trim are chosen together, then installed so corners, windows and soffits finish cleanly.',
        },
        {
          title: 'A section that matches',
          body: 'Sun-faded walls are matched to what is there, not to the original chip. We say when a patch will blend and when the wall wants more.',
        },
        {
          title: 'Color on the elevation',
          body: 'The new boards and the trim are finished together, so the wall reads as one elevation rather than a patch of a different shade.',
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
    slug: 'water-damage-restoration',
    name: 'Water Damage Restoration',
    group: 'Recovery',
    tagline: 'Dry it properly, then rebuild it right.',
    summary:
      'Assessment, extraction, drying, cleaning and structural repair after a leak, flood or storm.',
    metaDescription:
      'Water damage restoration in Houston, TX: moisture mapping, extraction, drying and dehumidification, then the repairs after a leak, a flood or a storm.',
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
        a: 'In Houston humidity, damp materials do not get a long grace period. Drying is time-sensitive. We map moisture and keep air movers and dehumidifiers running until the readings say the structure is dry.',
      },
      {
        q: 'Do you help with insurance documentation?',
        a: 'We photograph conditions and the scope of drying and repair. Coverage decisions belong to your insurer. Our insurance photo log is available if you want a room-by-room record of your own.',
      },
    ],
    related: [
      'painting-drywall-repair',
      'wood-flooring',
      'roofing-emergency-tarp-repair',
    ],
    image: img(
      '/images/services/water-damage-restoration.jpg',
      'Air movers drying a room during water damage restoration',
    ),
    local: {
      heading: 'Dry the structure before you rebuild it.',
      body: [
        'Houston water damage is usually a supply line, an appliance, a roof opening after a storm, or water that came in at grade. The houses sit in humid air, so a room that looks dry can still hold moisture in the slab, the insulation or the bottom of the drywall.',
        'We measure before we demolish more than we have to, extract what is standing, and dry with air movers and dehumidification. Repairs to drywall, floors and cabinets start when the readings support it.',
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
    slug: 'painting-drywall-repair',
    name: 'Painting & Drywall Repair',
    group: 'Recovery',
    tagline: 'The color and the smooth wall a remodel ends on.',
    summary:
      'Drywall patching and replacement, priming and interior painting, with the cleanup done.',
    metaDescription:
      'Painting and drywall in Houston, TX: patches, texture blending, primer and interior paint that close a kitchen, bath or living-room remodel, then the cleanup.',
    intro: [
      'Paint is how a Houston remodel actually finishes: new drywall in a kitchen, a patched wall in a living room, a powder room taken to a deeper color. The repair has to disappear, and the paint has to sit on a sound surface.',
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
        a: 'A good repair should disappear. We feather, prime and paint so the patch blends into the wall, including textured Houston interiors where a hard edge would show.',
      },
      {
        q: 'Do you paint whole rooms, or only the patched wall?',
        a: 'Both. A small patch is feathered and painted so it disappears. A kitchen, bath or living room that changed is usually painted as a whole so the color and sheen match.',
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
      'Powder room with painted charcoal walls after interior drywall and paint work',
    ),
    local: {
      heading: 'The finish the remodel is judged by.',
      body: [
        'New drywall and paint are what make a kitchen, a bath or a living room feel done. In Heights, Bellaire and West University houses that often means blending into texture and trim that were already there.',
        'We patch, prime and paint so the new work disappears into the room. Color is matched to the walls around it. If a wall was opened because of a leak, it is confirmed dry before it is closed. That check is part of the sequence, not the reason for the project.',
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
];

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
