import { assertCopyAllowed } from '@/lib/copy-guards';
import { humanize, img, type Img } from '@/lib/images';
import { fitDescription, titleFits } from '@/lib/seo';

export type ProjectCategory =
  | 'Kitchens'
  | 'Bathrooms'
  | 'Floors'
  | 'Details'
  | 'Roof & exterior'
  | 'Recovery';

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  tagline: string;
  summary: string[];
  notes: string[];
  services: string[];
  cover: Img;
  gallery: Img[];
  featured?: boolean;
  /** Closing line for the estimate band. Other projects keep the shared line. */
  cta?: string;
  /** Story pages can supply the meta description. Others use the title and tagline. */
  description?: string;
  /**
   * One finished job. Its photos are added on the related service pages
   * after the existing sample, so those samples stay put.
   */
  story?: boolean;
  /** Guides and city pages that sit beside the service links. */
  reading?: { href: string; label: string }[];
  /** Visible questions. The same items are emitted as FAQPage JSON-LD. */
  faqs?: readonly { q: string; a: string }[];
};

export const projectCategories: ProjectCategory[] = [
  'Kitchens',
  'Bathrooms',
  'Floors',
  'Details',
  'Roof & exterior',
  'Recovery',
];

const altOverrides: Record<string, string> = {
  'kitchens/coffered-ceiling-island.jpg':
    'Houston kitchen remodel with a coffered ceiling, twin marble islands and pendant lighting',
  'bathrooms/white-vanity-oval-mirrors.webp':
    'Houston bathroom remodel with a white double vanity, marble wall and oval mirrors',
  'flooring/dark-floors-french-doors.jpg':
    'Dark wood-look plank floor in a Houston home, running toward black-framed French doors',
  'roofing/brick-house-missing-shingles.webp':
    'Roofer repairing shingles on a brick Houston home',
  'roofing/roofer-ladder-underlayment.webp':
    'Roofer on a ladder installing the layer under the shingles on a Houston roof',
  'roofing/tarp-aerial-full-roof.jpg':
    'Aerial view of an emergency tarp covering a Houston roof',
  'restoration/air-movers-drying.jpg':
    'Air movers drying a water-damaged room in a Houston home',
  'cypress/01-before-floors-torn-out.jpg':
    'Downstairs in a Cypress home with the old flooring torn out and the slab exposed',
  'cypress/02-during-room-prepped.jpg':
    'Downstairs room in a Cypress home, prepped and contained, with air movers set out',
  'cypress/03-during-self-leveler.jpg':
    'Self-leveling compound poured on a Cypress slab to flatten it',
  'cypress/04-after-dining-room-flooring.jpg':
    'Dining room in a Cypress home with new wood-look luxury vinyl plank flooring',
  'cypress/05-after-living-room-flooring.jpg':
    'Living room in a Cypress home with new wood-look luxury vinyl plank flooring',
  'cypress/06-after-kitchen.jpg':
    'Cypress kitchen with new shaker-style cabinets, quartz countertops, and a backsplash',
  'cypress/07-after-kitchen-counters.jpg':
    'Cypress kitchen counter with quartz, an undermount stainless sink, and shaker-style cabinets',
  'cypress/08-after-stairs.jpg':
    'Stair treads in a Cypress home, finished in the same wood-look as the new flooring',
  'crosby/01-before-kitchen-water-damage.jpg':
    'Kitchen in a Crosby home with the flooring torn out down to a stained, water-damaged subfloor',
  'crosby/02-before-bathroom-subfloor.jpg':
    'Bathroom in a Crosby home with the floor torn out to a stained, water-damaged subfloor, and a stained hallway floor',
  'crosby/03-before-damaged-rafters.jpg':
    'Badly water-stained, damaged wood rafters overhead in a Crosby home',
  'crosby/04-during-bathroom-drying.jpg':
    'A dehumidifier and an air mover drying the bathroom in a Crosby home',
  'crosby/05-during-kitchen-drying.jpg':
    'A dehumidifier drying the kitchen in a Crosby home',
  'crosby/06-after-kitchen.jpg':
    'Crosby kitchen with new gray shaker-style cabinets, a built-in microwave cabinet, light granite countertops, and a white subway tile backsplash',
  'crosby/07-after-kitchen-wide.jpg':
    'Crosby kitchen with gray shaker-style cabinets, light granite countertops, a white subway tile backsplash, and wood-look flooring',
  'crosby/08-after-shower.jpg':
    'New tub in a Crosby bathroom with a white marble-look wall surround and matte black shower fixtures',
  'crosby/09-after-bathroom.jpg':
    'Crosby bathroom with a new vanity, a granite top, wood-look flooring, a new tub, and a white marble-look wall surround',
  'katy-deck/katy-composite-deck-01.jpg':
    'Open hot tub on a gray composite deck built by Elite Restorations in Katy, TX, with trees beyond a black fence.',
  'katy-deck/katy-composite-deck-02.jpg':
    'Finished composite deck and closed hot tub platform with dark fascia and red rock, built by Elite Restorations in Katy, TX.',
  'katy-deck/katy-composite-deck-03.jpg':
    'Angled view of an open hot tub on composite deck boards built by Elite Restorations in Katy, TX.',
  'katy-deck/katy-composite-deck-04.jpg':
    'Composite deck with built-in steps and an open hot tub, seen from the yard, built by Elite Restorations in Katy, TX.',
  'katy-deck/katy-composite-deck-05.jpg':
    'Close-up of the composite deck corner, dark fascia, and built-in steps built by Elite Restorations in Katy, TX.',
  'katy-deck/katy-composite-deck-06.jpg':
    'Full-length view of a composite deck and closed hot tub along the back of a house in Katy, TX, built by Elite Restorations.',
  'katy-closet/katy-custom-walk-in-closet-hanging-rods.webp':
    'Custom walk-in closet in Katy, TX with double hanging rods and a pull-down wardrobe lift in an espresso finish',
  'katy-closet/katy-custom-walk-in-closet-dresser.webp':
    'Built-in espresso dresser with twelve drawers and brushed nickel bar pulls, plus open shelves above, in a Katy, TX walk-in closet',
  'katy-closet/katy-custom-walk-in-closet-shoe-shelving.webp':
    'Floor-to-ceiling espresso shoe shelving beside a built-in dresser in a custom walk-in closet in Katy, TX',
  'katy-bathroom/katy-marble-bathroom-01.jpg':
    'Square rain shower head over large white and gray marble-look tile, with a recessed niche lined in hex mosaic, in a Katy bathroom finished by Elite Restorations.',
  'katy-bathroom/katy-marble-bathroom-02.jpg':
    'Frameless glass walk-in shower in Katy, TX, with marble-look walls, a rain shower head, a handheld, two mosaic niches, a pebble floor, a built-in bench, and a glass-block window, finished by Elite Restorations.',
  'katy-bathroom/katy-marble-bathroom-03.jpg':
    'Walk-in shower in Katy with a rain shower head, a handheld, a built-in bench, and a glass-block window, lined in large marble-look tile, finished by Elite Restorations.',
  'katy-bathroom/katy-marble-bathroom-04.jpg':
    'Frameless glass shower in Katy, TX, with marble-look walls, two recessed mosaic niches, a built-in bench, a pebble mosaic floor, and a square drain, finished by Elite Restorations.',
  'katy-bathroom/katy-marble-bathroom-05.jpg':
    'Corner jetted tub with a marble-look deck and tiled apron beside a glass-block window, next to a pebble mosaic shower floor, in a Katy bathroom by Elite Restorations.',
  'katy-bathroom/katy-marble-bathroom-06.jpg':
    'White corner jetted tub on a marble-look deck with a tiled apron, a glass-block window, and large floor tile, in a Katy, TX bathroom finished by Elite Restorations.',
};

const projectSeoNames: Record<string, string> = {
  'coffered-ceilings-marble-islands': 'Coffered Kitchen Remodel',
  'timber-and-lantern-light': 'Timber Kitchen Remodel',
  'vaulted-rooms-waterfall-islands': 'Vaulted Kitchen Remodel',
  'hoods-ranges-and-cooking-walls': 'Cooking Wall Remodel',
  'marble-showers-and-patterned-floors': 'Shower Renovation',
  'vanities-gold-and-glass': 'Gold and Glass Vanities',
  'charcoal-cream-and-wallpaper-baths': 'Wallpaper Bath Remodel',
  'floors-that-hold-the-room': 'Flooring Project',
  'hearths-in-stone-and-marble': 'Stone Fireplace Remodel',
  'tile-as-detail': 'Kitchen Backsplash',
  'stairs-beams-and-millwork': 'Carpentry and Millwork',
  'roofs-read-from-above': 'Roofing Project Photos',
  'storm-and-water-response': 'Storm and Water Repair',
  'exteriors-renewed': 'Siding Project',
  'blackhorse-ranch-cypress': 'Cypress Floors & Kitchen',
  'crosby-water-damage': 'Crosby Water Damage Repair',
  'katy-composite-deck': 'Katy Composite Deck',
  'katy-marble-bathroom': 'Katy Marble Bathroom',
  'custom-walk-in-closet-katy': 'Custom Walk-In Closet in Katy, TX',
};

export function projectSeoName(slug: string) {
  return projectSeoNames[slug];
}

function gallery(folder: string, label: string, files: string[]): Img[] {
  return files.map((file) => {
    const key = `${folder}/${file}`;
    return img(
      `/images/projects/${key}`,
      altOverrides[key] ?? `${label} in Houston: ${humanize(file).toLowerCase()}`,
    );
  });
}

const kitchens = (files: string[]) =>
  gallery('kitchens', 'Kitchen remodel', files);
const baths = (files: string[]) =>
  gallery('bathrooms', 'Bathroom remodel', files);

const coffered = kitchens([
  'coffered-ceiling-island.jpg',
  'coffered-shaker-kitchen.jpg',
  'coffered-lantern-chandelier.webp',
  'crystal-pendants-marble-island.jpg',
  'dark-island-white-cabinets.jpg',
  'gray-cabinets-marble-backsplash.jpg',
  'shaker-diagonal-tile-floor.jpg',
]);

const timber = kitchens([
  'lantern-pendants-beamed-kitchen.jpg',
  'beamed-ceiling-island.jpg',
  'lantern-pendant-island-wide.webp',
  'lantern-pendant-island-square.webp',
  'slat-detail-island.jpg',
  'wood-island-wood-hood.jpg',
  'light-wood-island-gold-pendants.jpg',
]);

const vaulted = kitchens([
  'vaulted-waterfall-island.jpg',
  'vaulted-open-plan.jpg',
  'brass-dome-waterfall-island.jpg',
  'waterfall-island-black-pendants.jpg',
  'lit-island-gold-glass-pendants.jpg',
  'globe-pendant-island.webp',
]);

const cookingWalls = kitchens([
  'range-hood-cooking-wall.jpg',
  'hood-gooseneck-faucet.jpg',
  'navy-island-farmhouse-sink.jpg',
  'dark-lower-cabinets-hallway.jpg',
  'quartz-island-woven-shades.jpg',
]);

const showers = baths([
  'marble-shower-frameless-door.jpg',
  'patterned-floor-marble-shower.jpg',
  'glass-block-pebble-shower.jpg',
  'pebble-floor-shower-niches.jpg',
  'herringbone-shower-hex-floor.jpg',
  'shower-niche-large-format.jpg',
  'shower-handheld-body-jets.jpg',
  'matte-black-tub-and-shower.jpg',
  'primary-bath-gold-showerheads.jpg',
  'wood-look-tile-teal-shower.jpg',
  'freestanding-tub-window.jpg',
]);

const vanities = baths([
  'white-vanity-oval-mirrors.webp',
  'classic-double-vanity-gold.jpg',
  'double-vanity-arched-mirrors.jpg',
  'double-vanity-wide-view.jpg',
  'light-wood-vanity-gold-mirrors.jpg',
  'navy-vanity-gold-pulls.webp',
  'taupe-vanity-marble-floor.jpg',
  'beamed-primary-vanity.jpg',
  'terracotta-wall-double-vanity.jpg',
  'vanity-linen-cabinet-mosaic-floor.jpg',
  'dark-vanity-glass-block.jpg',
  'black-fixtures-hex-accent.jpg',
]);

const quietBaths = baths([
  'charcoal-bath-vanity-doorway.jpg',
  'charcoal-bath-patterned-shower.jpg',
  'powder-room-charcoal-walls.jpg',
  'powder-room-patterned-wall.jpg',
  'cream-vanity-patterned-shower.webp',
  'wallpaper-bath-glass-shower.jpg',
]);

const floors = gallery('flooring', 'Flooring', [
  'dark-floors-french-doors.jpg',
  'encaustic-style-tile.jpg',
  'light-plank-empty-room.jpg',
  'plank-floors-black-windows.jpg',
  'chevron-plank-detail.jpg',
  'espresso-plank-detail.jpg',
  'light-plank-closeup.jpg',
  'wood-floor-bright-room.jpg',
  'stair-landing-hardwood.jpg',
  'entry-stair-light-floors.jpg',
  'plank-hallway-arch.jpg',
  'stone-look-tile-entry.jpg',
  'patterned-tile-into-shower.jpg',
]);

const hearths = gallery('fireplaces', 'Tile fireplace', [
  'double-height-marble.jpg',
  'linear-marble-wall.jpg',
  'herringbone-surround-mantel.jpg',
  'herringbone-garland-mantel.jpg',
  'tall-stone-great-room.jpg',
  'tile-surround-lit-shelving.jpg',
]);

const tile = gallery('backsplash', 'Backsplash', [
  'ornate-ceramic-marble-counter.webp',
  'chevron-behind-range.webp',
  'herringbone-behind-range.webp',
  'geometric-double-oven.webp',
  'gold-faucet-detail.webp',
]);

const millwork = gallery('carpentry', 'Carpentry', [
  'stair-geometric-wall-millwork.jpg',
  'stair-dark-treads-paneling.jpg',
  'exposed-beams-open-plan.jpg',
]);

const roofs = gallery('roofing', 'Roofing', [
  'brick-house-missing-shingles.webp',
  'roofer-ladder-underlayment.webp',
  'brick-home-multi-gable.webp',
  'brick-home-shingles.jpg',
  'brick-gable-attic-vent.jpg',
  'gable-stone-veneer.jpg',
  'two-story-stone-home.jpg',
  'shingles-white-siding.jpg',
  'roof-over-backyard-pool.webp',
]);

const response = [
  ...gallery('roofing', 'Emergency roofing', [
    'tarp-aerial-full-roof.jpg',
    'tarp-aerial-complex-roof.jpg',
    'tarp-partial-roof.jpg',
  ]),
  ...gallery('restoration', 'Water damage restoration', [
    'air-movers-drying.jpg',
  ]),
];

const cypressJob = gallery('cypress', 'Cypress project', [
  '01-before-floors-torn-out.jpg',
  '02-during-room-prepped.jpg',
  '03-during-self-leveler.jpg',
  '04-after-dining-room-flooring.jpg',
  '05-after-living-room-flooring.jpg',
  '06-after-kitchen.jpg',
  '07-after-kitchen-counters.jpg',
  '08-after-stairs.jpg',
]);

const katyCloset = gallery('katy-closet', 'Katy closet', [
  'katy-custom-walk-in-closet-hanging-rods.webp',
  'katy-custom-walk-in-closet-dresser.webp',
  'katy-custom-walk-in-closet-shoe-shelving.webp',
]);

const katyBath = gallery('katy-bathroom', 'Katy bathroom', [
  'katy-marble-bathroom-01.jpg',
  'katy-marble-bathroom-02.jpg',
  'katy-marble-bathroom-03.jpg',
  'katy-marble-bathroom-04.jpg',
  'katy-marble-bathroom-05.jpg',
  'katy-marble-bathroom-06.jpg',
]);

const katyDeck = gallery('katy-deck', 'Katy deck', [
  'katy-composite-deck-01.jpg',
  'katy-composite-deck-02.jpg',
  'katy-composite-deck-03.jpg',
  'katy-composite-deck-04.jpg',
  'katy-composite-deck-05.jpg',
  'katy-composite-deck-06.jpg',
]);

const crosbyJob = gallery('crosby', 'Crosby project', [
  '01-before-kitchen-water-damage.jpg',
  '02-before-bathroom-subfloor.jpg',
  '03-before-damaged-rafters.jpg',
  '04-during-bathroom-drying.jpg',
  '05-during-kitchen-drying.jpg',
  '06-after-kitchen.jpg',
  '07-after-kitchen-wide.jpg',
  '08-after-shower.jpg',
  '09-after-bathroom.jpg',
]);

const exteriors = gallery('siding', 'Siding', [
  'farmhouse-board-and-batten.jpg',
  'finished-exterior-corner.jpg',
  'soffit-and-sconce-detail.jpg',
  'rear-deck-glass-doors.jpg',
  'siding-upgrade-in-progress.jpg',
]);

export const projects: Project[] = [
  {
    slug: 'coffered-ceilings-marble-islands',
    title: 'Coffered Ceilings & Marble Islands',
    category: 'Kitchens',
    tagline: 'The ceiling and the stone carry the room.',
    summary: [
      'A collection of kitchens where the ceiling does as much work as the cabinetry. Coffered grids frame the room, marble runs across islands and backsplashes, and pendants and chandeliers set the mood.',
      'These are rooms designed to be looked at and cooked in: layered lighting, generous islands and custom cabinetry with crown detail.',
    ],
    notes: [
      'Coffered ceilings with recessed lighting',
      'Marble islands and slab backsplashes',
      'Custom cabinetry with crown molding',
      'Pendant and chandelier lighting',
    ],
    services: ['kitchen-remodeling', 'countertops', 'carpentry', 'backsplash'],
    cover: coffered[0],
    gallery: coffered,
    featured: true,
  },
  {
    slug: 'timber-and-lantern-light',
    title: 'Timber & Lantern Light',
    category: 'Kitchens',
    tagline: 'Wood, beams, and glowing pendants warm the room.',
    summary: [
      'Exposed beams, wood islands and lantern pendants give these kitchens a lived-in warmth that still feels considered.',
      'Wood is the through-line: on ceilings, on range hoods, and in islands with slatted or natural finishes.',
    ],
    notes: [
      'Exposed and beamed ceilings',
      'Lantern and gold-accent pendants',
      'Wood islands and wood range hoods',
      'Slatted island detailing',
    ],
    services: ['kitchen-remodeling', 'carpentry', 'countertops'],
    cover: timber[0],
    gallery: timber,
  },
  {
    slug: 'vaulted-rooms-waterfall-islands',
    title: 'Vaulted Rooms, Waterfall Islands',
    category: 'Kitchens',
    tagline: 'Tall rooms, with stone that runs down to the floor.',
    summary: [
      'Open plans under vaulted ceilings, anchored by waterfall-edge islands where the counter material continues down the sides.',
      'Brass, black and glass pendants punctuate the space and pick up the finishes in the fixtures and hardware.',
    ],
    notes: [
      'Vaulted, open-plan layouts',
      'Waterfall-edge islands',
      'Brass dome, globe and glass pendants',
      'Mixed-metal finishes',
    ],
    services: ['kitchen-remodeling', 'countertops'],
    cover: vaulted[0],
    gallery: vaulted,
    featured: true,
  },
  {
    slug: 'hoods-ranges-and-cooking-walls',
    title: 'Hoods, Ranges & Cooking Walls',
    category: 'Kitchens',
    tagline: 'The cooking wall is the part of the room you notice.',
    summary: [
      'Statement range hoods, deep farmhouse sinks and colored cabinetry, from navy islands to dark lower cabinets.',
      'Details such as gooseneck faucets and woven shades show how much finish carries the design.',
    ],
    notes: [
      'Custom range hoods',
      'Farmhouse sinks and gooseneck faucets',
      'Colored and dark cabinetry',
      'Quartz counters',
    ],
    services: ['kitchen-remodeling', 'countertops', 'backsplash'],
    cover: cookingWalls[0],
    gallery: cookingWalls,
  },
  {
    slug: 'marble-showers-and-patterned-floors',
    title: 'Marble Showers & Patterned Floors',
    category: 'Bathrooms',
    tagline: 'Showers and baths built to live with water.',
    summary: [
      'Showers in marble, pebble, herringbone and large-format tile, with niches, handheld and body-jet fixtures, and freestanding tubs.',
      'Patterned and hex floors add rhythm underfoot, and glass keeps the rooms open.',
    ],
    notes: [
      'Marble, pebble and herringbone shower tile',
      'Frameless and glass-block enclosures',
      'Niches, handheld and body-jet fixtures',
      'Freestanding and matte black tubs',
    ],
    services: ['bathroom-remodeling', 'tile-flooring'],
    cover: showers[0],
    gallery: showers,
    featured: true,
    description:
      'Shower renovation in Houston: marble, pebble, and patterned tile showers, waterproofed before the finish. Family-owned since 1993. Call (713) 909-0034.',
    faqs: [
      {
        q: 'What does a shower renovation include?',
        a: 'The enclosure you see: tile, glass, and valve trim, plus the waterproof layer behind them. A conversion is the separate job of taking a tub out and building a shower. These photographs are finished shower renovations. The layout of your house is decided on a visit.',
      },
      {
        q: 'Can you renovate a shower without moving the drain?',
        a: 'Often, yes. On a Houston slab, keeping the drain is a smaller job than cutting concrete. We look at the pan and the valve before we say the drain can stay. Family-owned since 1993.',
      },
      {
        q: 'What belongs behind the new tile?',
        a: 'A waterproof layer on the shower walls and the pan, before the finish tile. Tile and glass are not the waterproofing. Niches and the curb are built into that layer, not cut in afterward.',
      },
      {
        q: 'Where do you schedule a shower renovation?',
        a: 'From our office in west Houston (77082). Call (713) 909-0034. We serve Houston, including the neighborhoods around that office.',
      },
    ],
  },
  {
    slug: 'vanities-gold-and-glass',
    title: 'Vanities in Gold & Glass',
    category: 'Bathrooms',
    tagline: 'The vanity is what you see first, kept simple.',
    summary: [
      'Double vanities in white, navy, taupe and light wood, framed by oval, arched and gold-trimmed mirrors.',
      'Marble counters, mosaic floors and gold or matte-black hardware give each room its own character.',
    ],
    notes: [
      'White, navy, taupe and wood vanities',
      'Oval, arched and gold-framed mirrors',
      'Marble counters and mosaic floors',
      'Gold and black fixtures',
    ],
    services: ['bathroom-remodeling', 'countertops', 'carpentry'],
    cover: vanities[0],
    gallery: vanities,
    featured: true,
  },
  {
    slug: 'charcoal-cream-and-wallpaper-baths',
    title: 'Charcoal, Cream & Wallpaper Baths',
    category: 'Bathrooms',
    tagline: 'Powder rooms and primary baths with a clear point of view.',
    summary: [
      'Deep charcoal walls, patterned tile showers and wallpapered baths show how much personality a small room can hold.',
    ],
    notes: [
      'Charcoal wall and vanity palettes',
      'Patterned shower tile',
      'Wallpapered bathrooms',
      'Powder-room feature walls',
    ],
    services: [
      'bathroom-remodeling',
      'tile-flooring',
      'painting-drywall-repair',
    ],
    cover: quietBaths[0],
    gallery: quietBaths,
  },
  {
    slug: 'floors-that-hold-the-room',
    title: 'Floors That Hold the Room',
    category: 'Floors',
    tagline: 'Plank, chevron, stone-look, and patterned tile.',
    summary: [
      'Wood, wood-look and tile floors in dark, light and patterned finishes: hallways, entries, stair landings and open rooms.',
      'Transitions between materials are handled cleanly, including tile flowing into a shower.',
    ],
    notes: [
      'Wide plank, chevron and hardwood floors',
      'Patterned tile and stone-look tile',
      'Stair landings and entries',
      'Clean transitions between materials',
    ],
    services: [
      'wood-flooring',
      'tile-flooring',
      'vinyl-flooring',
      'laminate-flooring',
    ],
    cover: floors[0],
    gallery: floors,
    featured: true,
  },
  {
    slug: 'hearths-in-stone-and-marble',
    title: 'Hearths in Stone & Marble',
    category: 'Details',
    tagline: "The fireplace is the room's anchor.",
    summary: [
      'Double-height marble, linear tile walls, herringbone surrounds and stone great-room fireplaces, some with lit shelving.',
    ],
    notes: [
      'Marble and linear tile surrounds',
      'Herringbone patterns with mantels',
      'Stone great-room fireplaces',
      'Integrated lit shelving',
    ],
    services: ['tile-fireplaces', 'carpentry'],
    cover: hearths[0],
    gallery: hearths,
  },
  {
    slug: 'tile-as-detail',
    title: 'Tile as Detail',
    category: 'Details',
    tagline: 'Backsplashes with a pattern you can see across the room.',
    summary: [
      'Chevron, herringbone, geometric and ornate ceramic backsplashes behind ranges and above counters, with details like gold faucets to finish.',
    ],
    notes: [
      'Chevron and herringbone layouts',
      'Geometric tile behind cooking surfaces',
      'Ornate ceramic and marble pairings',
    ],
    services: ['backsplash', 'kitchen-remodeling'],
    cover: tile[0],
    gallery: tile,
  },
  {
    slug: 'stairs-beams-and-millwork',
    title: 'Stairs, Beams & Millwork',
    category: 'Details',
    tagline: 'Carpentry you notice by the way it feels under your hand.',
    summary: [
      'Geometric wood trim along a stair, dark treads against paneling, and exposed beams over an open plan.',
    ],
    notes: [
      'Geometric wood trim',
      'Dark stair treads and paneling',
      'Exposed beams',
    ],
    services: ['carpentry'],
    cover: millwork[0],
    gallery: millwork,
  },
  {
    slug: 'roofs-read-from-above',
    title: 'Roofs, Read From Above',
    category: 'Roof & exterior',
    tagline: 'New roofing on homes with brick, stone, and siding.',
    summary: [
      'Roof work on brick, stone, and siding homes, from the layer under the shingles through to the finished shingles and the gable details.',
    ],
    notes: [
      'The layer under the shingles, then the shingles',
      'Multi-gable roofs on brick homes',
      'Stone-veneer and siding exteriors',
    ],
    services: ['roof-replacement', 'siding'],
    cover: roofs[0],
    gallery: roofs,
  },
  {
    slug: 'storm-and-water-response',
    title: 'Storm & Water Response',
    category: 'Recovery',
    tagline: 'The first call is about stopping the damage.',
    summary: [
      'Tarps secured over full and partial roofs to keep water out, and air movers drying a room after water got in.',
      'This is the practical, time-sensitive work that comes before any rebuilding.',
    ],
    notes: [
      'Aerial tarp coverage of damaged roofs',
      'Partial-roof protection',
      'Air movers drying out the wet room',
    ],
    services: ['roofing-emergency-tarp-repair', 'water-damage-restoration'],
    cover: response[0],
    gallery: response,
    featured: true,
  },
  {
    slug: 'exteriors-renewed',
    title: 'Exteriors, Renewed',
    category: 'Roof & exterior',
    tagline: 'Board-and-batten siding, clean corners, and careful details.',
    summary: [
      'Farmhouse board-and-batten, finished corners, soffit and sconce details, a rear deck with glass doors, and an upgrade captured mid-project.',
    ],
    notes: [
      'Board-and-batten siding',
      'Soffit and lighting details',
      'Corner and trim finishing',
    ],
    services: ['siding', 'carpentry'],
    cover: exteriors[0],
    gallery: exteriors,
  },
  {
    slug: 'blackhorse-ranch-cypress',
    title: 'Downstairs flooring, stairs and kitchen in BlackHorse Ranch, Cypress',
    category: 'Floors',
    tagline: 'Wood-look vinyl, stair treads, and a kitchen, finished October 2026.',
    summary: [
      'In October 2026 we finished the downstairs of a house in the BlackHorse Ranch South neighborhood of Cypress, TX 77433, taking out the old flooring, prepping and containing the rooms with air movers, and pouring self-leveling compound to flatten the slab.',
      'Wood-look luxury vinyl plank went into the dining room and living room, the stairs got new treads in the same wood-look finish, and the kitchen got new shaker-style cabinets, quartz countertops and backsplash, and an undermount stainless sink.',
    ],
    notes: [
      'Old flooring torn out across the downstairs',
      'Rooms prepped and contained, with air movers',
      'Self-leveling compound poured to flatten the slab',
      'Wood-look luxury vinyl plank in the dining room and living room',
      'New stair treads in the same wood-look finish',
      'Shaker-style cabinets, quartz countertops and backsplash, and an undermount stainless sink',
    ],
    services: ['vinyl-flooring', 'kitchen-remodeling', 'countertops', 'backsplash'],
    cover: cypressJob[3],
    gallery: cypressJob,
    cta: 'Call (713) 909-0034, or tell us what you need on the contact page.',
    story: true,
  },
  {
    slug: 'crosby-water-damage',
    title: 'Water damage repair and rebuilt kitchen and bath in Crosby',
    category: 'Recovery',
    tagline: 'Gray shaker kitchen, marble-look bath, and wood-look floors, finished April 2025.',
    summary: [
      'Water damage was found in January 2025 at a house in Crosby, TX 77532.',
      'The kitchen flooring was torn out down to a stained, water-damaged subfloor. The bathroom and hallway floors were stained and water-damaged. The wood framing overhead was badly water-stained and damaged.',
      'Drying and repairs ran from February to March 2025. Dehumidifiers and air movers dried the bathroom and the kitchen.',
      'The work was finished in April 2025. The kitchen was finished with gray shaker-style cabinets, light granite countertops, a white subway tile backsplash, a built-in microwave cabinet, and wood-look luxury vinyl plank flooring. The bathroom was finished with a new tub, a white marble-look wall surround, matte black shower fixtures, a new vanity with a granite top, and wood-look flooring.',
    ],
    notes: [
      'Took out the water-damaged kitchen flooring down to the subfloor',
      'Dried out the kitchen and bathroom with dehumidifiers and air movers',
      'Repaired the water damage from February to March 2025',
      'Installed gray shaker-style cabinets, a built-in microwave cabinet, light granite countertops, and a white subway tile backsplash in the kitchen',
      'Put down wood-look luxury vinyl plank flooring',
      'Rebuilt the bathroom with a new tub, a white marble-look wall surround, matte black shower fixtures, and a new vanity with a granite top',
    ],
    services: [
      'water-damage-restoration',
      'kitchen-remodeling',
      'bathroom-remodeling',
      'vinyl-flooring',
      'countertops',
      'backsplash',
    ],
    cover: crosbyJob[6],
    gallery: crosbyJob,
    cta: 'Call (713) 909-0034, or tell us what you need on the contact page.',
    story: true,
  },
  {
    slug: 'katy-composite-deck',
    title: 'Composite Deck & Hot Tub Platform, Katy, TX',
    category: 'Roof & exterior',
    tagline: 'Gray-brown composite deck and hot tub platform, finished October 2024.',
    summary: [
      'Elite Restorations built this new gray-brown composite deck in Katy, Texas. It was completed in October 2024.',
      'The deck forms a low platform along the back of the house, with matching fascia, built-in steps, and a white hot tub at one end.',
      'Red rock sits at the base, and trees and a black fence run along the yard beyond the platform.',
    ],
    notes: [
      'New gray-brown composite deck',
      'Low platform along the back of the house',
      'Matching fascia',
      'Built-in steps',
      'White hot tub at one end',
      'Red rock at the base',
      'Trees and a black fence along the yard',
    ],
    services: ['decks', 'carpentry'],
    cover: katyDeck[0],
    gallery: katyDeck,
    cta: 'Call (713) 909-0034, or tell us what you need on the contact page.',
    story: true,
  },
  {
    slug: 'katy-marble-bathroom',
    title: 'Marble-Look Walk-In Shower and Jetted Tub Bathroom in Katy, TX',
    category: 'Bathrooms',
    tagline: 'Marble-look shower and corner jetted tub, finished February 2025.',
    summary: [
      'Elite Restorations finished this marble-look bathroom in Katy, Texas, in February 2025. The room has a frameless glass walk-in shower and a corner jetted tub.',
      'Large-format white and gray marble-look tile covers the shower walls. The frameless glass enclosure has a rain shower head and a handheld. Two recessed niches have pebble and hex mosaic backs. The shower floor is pebble mosaic with a square drain, and a built-in bench sits in the shower. Glass-block windows light the room.',
      'A corner jetted tub sits on a marble-look deck, with a tiled apron on the front. The jets are visible inside the tub, and a metal faucet sits on the deck.',
      'A glass enclosure holds the spray inside the shower, which helps in Houston humidity, where the air is already damp. Large-format tile on the walls leaves fewer grout lines to wipe than a wall of small tile. The pebble floor has many joints, so rinse it after use and clean the grout before soap film builds up. Squeegee the glass so spots do not haze it, and wipe the deck around the tub so water does not sit by the faucet. Glass-block windows bring in daylight and stay closed, so the room is not sitting under an open window in humid air. We are family-owned, serving Houston since 1993. See [bathroom remodeling](/bathroom-remodeling), [bathroom remodeling in Katy](/bathroom-remodeling-katy-tx), and the [Houston bathroom remodel guide](/houston-bathroom-remodel-guide) for waterproofing, a fan that vents outside, and how a hall bath differs from a room like this one.',
    ],
    notes: [
      'Large-format white and gray marble-look wall tile',
      'Frameless glass walk-in shower',
      'Rain shower head and handheld',
      'Two recessed niches with pebble and hex mosaic backs',
      'Pebble mosaic shower floor with a square drain',
      'Built-in shower bench',
      'Glass-block windows',
      'Corner jetted tub with a marble-look deck and tiled apron',
    ],
    services: ['bathroom-remodeling'],
    reading: [
      { href: '/bathroom-remodeling-katy-tx', label: 'Bathroom remodeling in Katy' },
      { href: '/houston-bathroom-remodel-guide', label: 'Houston bathroom remodel guide' },
    ],
    cover: katyBath[1],
    gallery: katyBath,
    cta: 'Call (713) 909-0034, or tell us what you need on the contact page.',
    story: true,
  },
  {
    slug: 'custom-walk-in-closet-katy',
    title: 'Custom Walk-In Closet in Katy, TX',
    category: 'Details',
    tagline: 'Espresso built-ins, a 12-drawer dresser, and floor-to-ceiling shoe shelving, finished in 2026.',
    description:
      'A 2026 custom walk-in closet in Katy, TX with espresso built-ins, a 12-drawer dresser, pull-down wardrobe lift, and floor-to-ceiling shoe shelving.',
    summary: [
      'This custom walk-in closet was completed in 2026 for a home in Katy, Texas. Espresso-finish built-ins wrap the room, set against white walls and light wide-plank floors.',
      'At the center of the layout is a double-hanging bay: a shorter rod above a longer rod, divided by a mid-shelf. A pull-down wardrobe lift is mounted above that bay, so the highest hanging storage can be brought down within reach. The side panels are drilled with shelf-pin holes, allowing rods and shelves to be moved as needs change.',
      'On the adjoining wall, a built-in dresser is the focal point: twelve drawers in two columns, each with a recessed panel front and a brushed nickel bar pull. The lowest drawers are slightly taller than the ones above. Two stacked bays of open shelving sit on top of the dresser, with small hooks along the lowest openings.',
      'To the right, a floor-to-ceiling shoe tower fills a narrow bay with closely spaced shelves. Between the dresser and the shoe tower, a corner hanging space with a rod and hooks uses the remaining wall.',
      'The result is a walk-in organized from floor to ceiling. Elite Restorations is family-owned and has been serving Houston since 1993. We build this kind of custom closet for homes in Katy and across the Houston area. See [carpentry](/carpentry) and [carpentry in Katy](/carpentry-katy-tx).',
    ],
    notes: [
      'Espresso-finish custom built-ins',
      'Double hanging rods with a mid-shelf between the upper and lower rods',
      'Pull-down wardrobe lift above the hanging bay',
      'Built-in 12-drawer dresser with recessed panel fronts',
      'Brushed nickel bar pulls',
      'Open shelving above the dresser, with hooks on the lower openings',
      'Floor-to-ceiling shoe shelving',
      'Adjustable shelf-pin holes on the hanging side panels',
      'Corner hanging bay with a rod and hooks',
      'Light wide-plank floors',
    ],
    services: ['carpentry'],
    reading: [
      { href: '/carpentry', label: 'Carpentry' },
      { href: '/carpentry-katy-tx', label: 'Carpentry in Katy' },
    ],
    cover: katyCloset[0],
    gallery: katyCloset,
    cta: 'Ready for a custom closet or remodel? Call (713) 909-0034, Monday through Saturday, 8 AM to 6 PM. Tell us what you need on the contact page.',
    story: true,
  },
];

export const projectsBySlug = new Map(projects.map((p) => [p.slug, p]));

export function getProject(slug: string) {
  return projectsBySlug.get(slug);
}

export function projectsForService(serviceSlug: string) {
  return projects.filter((p) => p.services.includes(serviceSlug));
}

export type ServiceGalleryItem = {
  image: Img;
  project: Project;
};

function galleryItemsForService(serviceSlug: string, story: boolean): ServiceGalleryItem[] {
  const seen = new Set<string>();
  const items: ServiceGalleryItem[] = [];
  for (const project of projectsForService(serviceSlug)) {
    if (Boolean(project.story) !== story) continue;
    for (const image of project.gallery) {
      if (seen.has(image.src)) continue;
      seen.add(image.src);
      items.push({ image, project });
    }
  }
  return items;
}

/**
 * Sample photographs for a service, in project order.
 * A story job is left out of this list so the sample on each page stays as it was.
 */
export function imagesForService(serviceSlug: string): ServiceGalleryItem[] {
  return galleryItemsForService(serviceSlug, false);
}

/** Photographs from a finished job, linked after the sample on a service page. */
export function storyItemsForService(serviceSlug: string): ServiceGalleryItem[] {
  return galleryItemsForService(serviceSlug, true);
}

const phone = '(713) 909-0034';

for (const project of projects) {
  const lead = projectSeoName(project.slug) ?? project.title;
  if (projectSeoName(project.slug) && !titleFits(lead)) {
    throw new Error(`Project SEO name does not fit: ${project.slug}`);
  }
  if (project.story) {
    const seo = projectSeoName(project.slug);
    if (!seo) throw new Error(`Story needs an SEO name: ${project.slug}`);
    const description = project.description ?? `${project.title} in Houston. ${project.tagline}`;
    if (description.length > 155 || fitDescription(description) !== description) {
      throw new Error(
        `Story description is ${description.length} characters and would be trimmed: ${project.slug}`,
      );
    }
    if (!project.cta?.includes(phone) || !/contact page/i.test(project.cta)) {
      throw new Error(`Story CTA needs the phone and the contact page: ${project.slug}`);
    }
  }
  assertCopyAllowed(
    `/projects/${project.slug}`,
    [
      project.title,
      project.tagline,
      project.description ?? '',
      project.cta ?? '',
      ...project.summary,
      ...project.notes,
      ...(project.faqs ?? []).flatMap((faq) => [faq.q, faq.a]),
      ...(project.reading ?? []).map((link) => link.label),
      ...project.gallery.map((image) => image.alt),
    ].join('\n'),
  );
}
