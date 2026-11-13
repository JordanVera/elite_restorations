import { humanize, img, type Img } from '@/lib/images';

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
  'kitchens/white-island-pendant-lights.webp':
    'Custom white kitchen with island, cooktop, and glass pendant lights, Houston remodel by Elite Restorations',
  'kitchens/white-island-wall-ovens.webp':
    'White kitchen island and stacked wall ovens with a mosaic backsplash, Houston remodel by Elite Restorations',
  'kitchens/cream-kitchen-granite-island.webp':
    'Cream kitchen with granite counters, a double wall oven, and a mosaic backsplash, Houston remodel by Elite Restorations',
  'kitchens/wet-bar-prep-sink.webp':
    'Kitchen wet bar with a prep sink, beverage cooler, and granite counter, Houston remodel by Elite Restorations',
  'kitchens/pro-range-arched-alcove.webp':
    'Professional gas range and hood in an arched stone-tile alcove, Houston kitchen remodel by Elite Restorations',
  'kitchens/cream-hood-brick-backsplash.webp':
    'Cream custom hood over a gas range with a brick-tile backsplash, Houston kitchen remodel by Elite Restorations',
  'bathrooms/white-vanity-oval-mirrors.webp':
    'Houston bathroom remodel with a white double vanity, marble wall and oval mirrors',
  'bathrooms/frameless-glass-shower.webp':
    'Frameless glass shower with mosaic tile beside a soaking tub, Houston bathroom remodel by Elite Restorations',
  'bathrooms/jetted-tub-mosaic.webp':
    'Jetted soaking tub set in a mosaic tile deck, Houston bathroom remodel by Elite Restorations',
  'bathrooms/travertine-bronze-shower.webp':
    'Travertine shower with an oil-rubbed bronze showerhead and hand shower, Houston bathroom remodel by Elite Restorations',
  'bathrooms/marble-shower-niche.webp':
    'Marble-look shower with a framed niche and chrome fixtures, Houston bathroom remodel by Elite Restorations',
  'bathrooms/dark-wood-vanity.webp':
    'Dark wood bathroom vanity with a granite top and oil-rubbed bronze faucet, Houston remodel by Elite Restorations',
  'flooring/dark-floors-french-doors.jpg':
    'Dark wood-look plank floor in a Houston home, running toward black-framed French doors',
  'flooring/wood-look-plank-hall.webp':
    'Wood-look plank floor running through a kitchen and hallway, Houston flooring by Elite Restorations',
  'flooring/wood-look-plank-detail.webp':
    'Wood-look plank flooring in a staggered layout, Houston floor installation by Elite Restorations',
  'flooring/polished-porcelain-tile.webp':
    'Polished brown porcelain tile floor in an open room, Houston tile flooring by Elite Restorations',
  'roofing/brick-house-missing-shingles.webp':
    'Roofer repairing shingles on a brick Houston home',
  'roofing/roofer-ladder-underlayment.webp':
    'Roofer on a ladder installing underlayment on a Houston roof',
  'roofing/tarp-aerial-full-roof.jpg':
    'Aerial view of an emergency tarp covering a Houston roof',
  'roofing/white-lap-siding-shingles.webp':
    'New gray shingles over white lap siding on a one-story house, Houston roof by Elite Restorations',
  'roofing/white-two-story-shingles.webp':
    'White two-story house with a new gray shingle roof, Houston roofing by Elite Restorations',
  'roofing/architectural-shingles-vents.webp':
    'Architectural gray shingles with roof vents and a pipe flashing, Houston roof replacement by Elite Restorations',
  'roofing/finished-shingles-brick-home.webp':
    'Finished architectural shingle roof on a brick house, Houston roof replacement by Elite Restorations',
  'patios/slate-patio.webp':
    'Multicolor slate patio beside a brick house, Houston patio by Elite Restorations',
  'patios/dark-composite-deck-screen.webp':
    'Dark composite deck screen beside a backyard pool, Houston deck by Elite Restorations',
  'patios/cedar-pergola-string-lights.webp':
    'Cedar pergola with ceiling fans and string lights over a poolside patio, Houston remodel by Elite Restorations',
  'patios/stained-pergola-pool.webp':
    'Stained wood pergola beside a backyard pool, Houston patio cover by Elite Restorations',
  'patios/pergola-before.webp':
    'Unfinished cedar pergola framing beside a brick house, Houston project by Elite Restorations',
  'patios/pergola-after.webp':
    'Stained pergola with ceiling fans and a light beside a brick house, Houston patio cover by Elite Restorations',
  'restoration/air-movers-drying.jpg':
    'Air movers drying a water-damaged room in a Houston home',
  'restoration/storm-tarp-on-roof.webp':
    'Blue storm tarp covering an open section of roof on a Houston house, storm repair by Elite Restorations',
};

const projectSeoNames: Record<string, string> = {
  'coffered-ceilings-marble-islands': 'Coffered Kitchen Remodel',
  'timber-and-lantern-light': 'Timber Kitchen Remodel',
  'vaulted-rooms-waterfall-islands': 'Vaulted Kitchen Remodel',
  'hoods-ranges-and-cooking-walls': 'Cooking Wall Remodel',
  'marble-showers-and-patterned-floors': 'Marble Shower Remodel',
  'vanities-gold-and-glass': 'Gold and Glass Vanities',
  'charcoal-cream-and-wallpaper-baths': 'Wallpaper Bath Remodel',
  'floors-that-hold-the-room': 'Flooring Project',
  'hearths-in-stone-and-marble': 'Stone Fireplace Remodel',
  'tile-as-detail': 'Kitchen Backsplash',
  'stairs-beams-and-millwork': 'Carpentry and Millwork',
  'roofs-read-from-above': 'Roofing Project Photos',
  'storm-and-water-response': 'Storm and Water Repair',
  'exteriors-renewed': 'Siding Project',
  'white-kitchens-islands-ranges': 'White Kitchen Remodel',
  'glass-showers-and-soaking-tubs': 'Glass Shower Remodel',
  'shingle-roofs-finished': 'Shingle Roof Project',
  'white-lap-siding': 'Lap Siding Project',
  'patios-decks-and-pergolas': 'Patio and Pergola',
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

const whiteKitchens = kitchens([
  'white-island-pendant-lights.webp',
  'white-island-wall-ovens.webp',
  'cream-kitchen-granite-island.webp',
  'wet-bar-prep-sink.webp',
  'pro-range-arched-alcove.webp',
  'cream-hood-brick-backsplash.webp',
]);

const glassBaths = baths([
  'frameless-glass-shower.webp',
  'jetted-tub-mosaic.webp',
  'travertine-bronze-shower.webp',
  'marble-shower-niche.webp',
  'dark-wood-vanity.webp',
]);

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
  'wood-look-plank-hall.webp',
  'wood-look-plank-detail.webp',
  'polished-porcelain-tile.webp',
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

const newRoofs = gallery('roofing', 'Roofing', [
  'finished-shingles-brick-home.webp',
  'white-two-story-shingles.webp',
  'white-lap-siding-shingles.webp',
  'architectural-shingles-vents.webp',
]);

const lapSiding = gallery('roofing', 'Siding', [
  'white-lap-siding-shingles.webp',
  'white-two-story-shingles.webp',
]);

const patios = gallery('patios', 'Patio and pergola', [
  'slate-patio.webp',
  'dark-composite-deck-screen.webp',
  'cedar-pergola-string-lights.webp',
  'stained-pergola-pool.webp',
  'pergola-before.webp',
  'pergola-after.webp',
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
    'storm-tarp-on-roof.webp',
  ]),
];

const exteriors = gallery('siding', 'Siding', [
  'farmhouse-board-and-batten.jpg',
  'finished-exterior-corner.jpg',
  'soffit-and-sconce-detail.jpg',
  'rear-deck-glass-doors.jpg',
  'siding-upgrade-in-progress.jpg',
]);

export const projects: Project[] = [
  {
    slug: 'white-kitchens-islands-ranges',
    title: 'White Kitchens, Islands & Ranges',
    category: 'Kitchens',
    tagline: 'Islands, pendant light, and the cooking wall.',
    summary: [
      'White and cream kitchens with islands, glass pendant lights, granite counters, and mosaic or brick-tile backsplashes.',
      'One room centers on a cooktop island and stacked wall ovens. Others are a wet bar, a professional range in an arched alcove, and a custom hood over a gas range.',
    ],
    notes: [
      'White island with a cooktop and glass pendants',
      'Stacked wall ovens and a mosaic backsplash',
      'Wet bar with a prep sink and beverage cooler',
      'Professional range and a custom hood',
    ],
    services: ['kitchen-remodeling'],
    cover: whiteKitchens[0],
    gallery: whiteKitchens,
  },
  {
    slug: 'coffered-ceilings-marble-islands',
    title: 'Coffered Ceilings & Marble Islands',
    category: 'Kitchens',
    tagline: 'Architecture overhead, stone underfoot.',
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
    tagline: 'Warmth from wood, beams and glowing pendants.',
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
    tagline: 'Height, volume and stone that pours to the floor.',
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
    tagline: 'The working wall, treated as a focal point.',
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
    slug: 'glass-showers-and-soaking-tubs',
    title: 'Glass Showers & Soaking Tubs',
    category: 'Bathrooms',
    tagline: 'Wet rooms in tile, glass, and stone.',
    summary: [
      'Frameless glass showers, a jetted tub in a mosaic deck, a travertine shower with oil-rubbed bronze fixtures, and a dark wood vanity with a granite top.',
    ],
    notes: [
      'Frameless glass shower and mosaic tile',
      'Jetted soaking tub',
      'Travertine and marble-look showers',
      'Dark wood vanity',
    ],
    services: ['bathroom-remodeling'],
    cover: glassBaths[0],
    gallery: glassBaths,
  },
  {
    slug: 'marble-showers-and-patterned-floors',
    title: 'Marble Showers & Patterned Floors',
    category: 'Bathrooms',
    tagline: 'Wet rooms built for the long haul.',
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
  },
  {
    slug: 'vanities-gold-and-glass',
    title: 'Vanities in Gold & Glass',
    category: 'Bathrooms',
    tagline: 'The piece you see first, done with restraint.',
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
    tagline: 'Powder rooms and primary baths with a point of view.',
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
    tagline: 'Plank, chevron, stone-look and encaustic.',
    summary: [
      'Wood, wood-look and tile floors in dark, light and patterned finishes: hallways, entries, stair landings and open rooms.',
      'Transitions between materials are handled cleanly, including tile flowing into a shower.',
    ],
    notes: [
      'Wide plank, chevron and hardwood floors',
      'Encaustic-style and stone-look tile',
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
    tagline: "Fireplaces as the room's anchor.",
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
    tagline: 'Backsplashes with pattern and intent.',
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
    tagline: 'Carpentry you notice by how it feels.',
    summary: [
      'Geometric wall millwork along a stair, dark treads against paneling, and exposed beams over an open plan.',
    ],
    notes: [
      'Geometric wall millwork',
      'Dark stair treads and paneling',
      'Exposed beams',
    ],
    services: ['carpentry'],
    cover: millwork[0],
    gallery: millwork,
  },
  {
    slug: 'shingle-roofs-finished',
    title: 'Shingle Roofs, Finished',
    category: 'Roof & exterior',
    tagline: 'New shingles on brick and siding houses.',
    summary: [
      'Architectural shingles on a brick house and on white lap-sided houses, plus a closer look at vents and pipe flashing.',
    ],
    notes: [
      'Finished shingles on a brick house',
      'Gray shingles over white lap siding',
      'Vents and pipe flashing',
    ],
    services: ['roofing', 'roof-replacement'],
    cover: newRoofs[0],
    gallery: newRoofs,
  },
  {
    slug: 'white-lap-siding',
    title: 'White Lap Siding',
    category: 'Roof & exterior',
    tagline: 'New lap siding, with the roof that sits on it.',
    summary: [
      'White lap siding and a gray shingle roof on a one-story house and a two-story house, photographed from the yard.',
    ],
    notes: [
      'White lap siding',
      'New gray shingles on the same houses',
    ],
    services: ['siding'],
    cover: lapSiding[0],
    gallery: lapSiding,
  },
  {
    slug: 'patios-decks-and-pergolas',
    title: 'Patios, Decks & Pergolas',
    category: 'Roof & exterior',
    tagline: 'The outdoor room, from slate to stained cedar.',
    summary: [
      'A slate patio, a dark composite deck screen by a pool, and wood pergolas with fans and string lights.',
      'One pergola is shown before the stain and again after the wood was finished.',
    ],
    notes: [
      'Slate patio',
      'Composite deck screen by a pool',
      'Cedar pergola with fans and string lights',
      'Before and after the pergola was stained',
    ],
    services: ['patios-decks'],
    cover: patios[0],
    gallery: patios,
  },
  {
    slug: 'roofs-read-from-above',
    title: 'Roofs, Read From Above',
    category: 'Roof & exterior',
    tagline: 'Brick, stone and siding homes, new roofing on top.',
    summary: [
      'Roof work across brick, stone-veneer and siding homes, from underlayment going down to finished shingles and detailed gables.',
    ],
    notes: [
      'Underlayment and shingle installation',
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
      'Tarps secured over full and partial roofs, including a blue tarp on a house after the roof opened up.',
      'This is the unglamorous, time-sensitive work that comes before any rebuilding.',
    ],
    notes: [
      'Aerial tarp coverage of damaged roofs',
      'Partial-roof protection',
      'A storm tarp on the roof of a house',
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
    tagline: 'Board-and-batten, clean corners and considered details.',
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

/** Unique project photographs for a service, in project order. */
export function imagesForService(serviceSlug: string): ServiceGalleryItem[] {
  const seen = new Set<string>();
  const items: ServiceGalleryItem[] = [];
  for (const project of projectsForService(serviceSlug)) {
    for (const image of project.gallery) {
      if (seen.has(image.src)) continue;
      seen.add(image.src);
      items.push({ image, project });
    }
  }
  return items;
}
