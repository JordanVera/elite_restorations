import { humanize, img, type Img } from "@/lib/images";

export type ProjectCategory =
  | "Kitchens"
  | "Bathrooms"
  | "Floors"
  | "Details"
  | "Roof & exterior"
  | "Recovery";

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
  "Kitchens",
  "Bathrooms",
  "Floors",
  "Details",
  "Roof & exterior",
  "Recovery",
];

const altOverrides: Record<string, string> = {
  "kitchens/coffered-ceiling-island.jpg":
    "Kitchen with a coffered ceiling, twin marble islands and pendant lighting",
  "bathrooms/white-vanity-oval-mirrors.webp":
    "White double vanity with marble counter, marble-tiled wall and three oval mirrors",
  "flooring/dark-floors-french-doors.jpg":
    "Dark wood-look plank floor running toward black-framed French doors",
  "roofing/brick-house-missing-shingles.webp":
    "Roofer working on the roof of a brick and cream-siding home on a sunny day",
  "roofing/roofer-ladder-underlayment.webp":
    "Roofer on a ladder installing underlayment on a roof deck",
  "roofing/tarp-aerial-full-roof.jpg": "Aerial view of a tarp covering a full roof",
  "restoration/air-movers-drying.jpg": "Air movers drying a water-damaged room",
};

function gallery(folder: string, label: string, files: string[]): Img[] {
  return files.map((file) => {
    const key = `${folder}/${file}`;
    return img(`/images/projects/${key}`, altOverrides[key] ?? `${label}: ${humanize(file).toLowerCase()}`);
  });
}

const kitchens = (files: string[]) => gallery("kitchens", "Kitchen remodel", files);
const baths = (files: string[]) => gallery("bathrooms", "Bathroom remodel", files);

const coffered = kitchens([
  "coffered-ceiling-island.jpg",
  "coffered-shaker-kitchen.jpg",
  "coffered-lantern-chandelier.webp",
  "crystal-pendants-marble-island.jpg",
  "dark-island-white-cabinets.jpg",
  "gray-cabinets-marble-backsplash.jpg",
  "shaker-diagonal-tile-floor.jpg",
]);

const timber = kitchens([
  "lantern-pendants-beamed-kitchen.jpg",
  "beamed-ceiling-island.jpg",
  "lantern-pendant-island-wide.webp",
  "lantern-pendant-island-square.webp",
  "slat-detail-island.jpg",
  "wood-island-wood-hood.jpg",
  "light-wood-island-gold-pendants.jpg",
]);

const vaulted = kitchens([
  "vaulted-waterfall-island.jpg",
  "vaulted-open-plan.jpg",
  "brass-dome-waterfall-island.jpg",
  "waterfall-island-black-pendants.jpg",
  "lit-island-gold-glass-pendants.jpg",
  "globe-pendant-island.webp",
]);

const cookingWalls = kitchens([
  "range-hood-cooking-wall.jpg",
  "hood-gooseneck-faucet.jpg",
  "navy-island-farmhouse-sink.jpg",
  "dark-lower-cabinets-hallway.jpg",
  "quartz-island-woven-shades.jpg",
]);

const showers = baths([
  "marble-shower-frameless-door.jpg",
  "patterned-floor-marble-shower.jpg",
  "glass-block-pebble-shower.jpg",
  "pebble-floor-shower-niches.jpg",
  "herringbone-shower-hex-floor.jpg",
  "shower-niche-large-format.jpg",
  "shower-handheld-body-jets.jpg",
  "matte-black-tub-and-shower.jpg",
  "primary-bath-gold-showerheads.jpg",
  "wood-look-tile-teal-shower.jpg",
  "freestanding-tub-window.jpg",
]);

const vanities = baths([
  "white-vanity-oval-mirrors.webp",
  "classic-double-vanity-gold.jpg",
  "double-vanity-arched-mirrors.jpg",
  "double-vanity-wide-view.jpg",
  "light-wood-vanity-gold-mirrors.jpg",
  "navy-vanity-gold-pulls.webp",
  "taupe-vanity-marble-floor.jpg",
  "beamed-primary-vanity.jpg",
  "terracotta-wall-double-vanity.jpg",
  "vanity-linen-cabinet-mosaic-floor.jpg",
  "dark-vanity-glass-block.jpg",
  "black-fixtures-hex-accent.jpg",
]);

const quietBaths = baths([
  "charcoal-bath-vanity-doorway.jpg",
  "charcoal-bath-patterned-shower.jpg",
  "powder-room-charcoal-walls.jpg",
  "powder-room-patterned-wall.jpg",
  "cream-vanity-patterned-shower.webp",
  "wallpaper-bath-glass-shower.jpg",
]);

const floors = gallery("flooring", "Flooring", [
  "dark-floors-french-doors.jpg",
  "encaustic-style-tile.jpg",
  "light-plank-empty-room.jpg",
  "plank-floors-black-windows.jpg",
  "chevron-plank-detail.jpg",
  "espresso-plank-detail.jpg",
  "light-plank-closeup.jpg",
  "wood-floor-bright-room.jpg",
  "stair-landing-hardwood.jpg",
  "entry-stair-light-floors.jpg",
  "plank-hallway-arch.jpg",
  "stone-look-tile-entry.jpg",
  "patterned-tile-into-shower.jpg",
]);

const hearths = gallery("fireplaces", "Tile fireplace", [
  "double-height-marble.jpg",
  "linear-marble-wall.jpg",
  "herringbone-surround-mantel.jpg",
  "herringbone-garland-mantel.jpg",
  "tall-stone-great-room.jpg",
  "tile-surround-lit-shelving.jpg",
]);

const tile = gallery("backsplash", "Backsplash", [
  "ornate-ceramic-marble-counter.webp",
  "chevron-behind-range.webp",
  "herringbone-behind-range.webp",
  "geometric-double-oven.webp",
  "gold-faucet-detail.webp",
]);

const millwork = gallery("carpentry", "Carpentry", [
  "stair-geometric-wall-millwork.jpg",
  "stair-dark-treads-paneling.jpg",
  "exposed-beams-open-plan.jpg",
]);

const roofs = gallery("roofing", "Roofing", [
  "brick-house-missing-shingles.webp",
  "roofer-ladder-underlayment.webp",
  "brick-home-multi-gable.webp",
  "brick-home-shingles.jpg",
  "brick-gable-attic-vent.jpg",
  "gable-stone-veneer.jpg",
  "two-story-stone-home.jpg",
  "shingles-white-siding.jpg",
  "roof-over-backyard-pool.webp",
]);

const response = [
  ...gallery("roofing", "Emergency roofing", [
    "tarp-aerial-full-roof.jpg",
    "tarp-aerial-complex-roof.jpg",
    "tarp-partial-roof.jpg",
  ]),
  ...gallery("restoration", "Water damage restoration", ["air-movers-drying.jpg"]),
];

const exteriors = gallery("siding", "Siding", [
  "farmhouse-board-and-batten.jpg",
  "finished-exterior-corner.jpg",
  "soffit-and-sconce-detail.jpg",
  "rear-deck-glass-doors.jpg",
  "siding-upgrade-in-progress.jpg",
]);

export const projects: Project[] = [
  {
    slug: "coffered-ceilings-marble-islands",
    title: "Coffered Ceilings & Marble Islands",
    category: "Kitchens",
    tagline: "Architecture overhead, stone underfoot.",
    summary: [
      "A collection of kitchens where the ceiling does as much work as the cabinetry. Coffered grids frame the room, marble runs across islands and backsplashes, and pendants and chandeliers set the mood.",
      "These are rooms designed to be looked at and cooked in: layered lighting, generous islands and custom cabinetry with crown detail.",
    ],
    notes: [
      "Coffered ceilings with recessed lighting",
      "Marble islands and slab backsplashes",
      "Custom cabinetry with crown molding",
      "Pendant and chandelier lighting",
    ],
    services: ["kitchen-remodeling", "countertops", "carpentry", "backsplash"],
    cover: coffered[0],
    gallery: coffered,
    featured: true,
  },
  {
    slug: "timber-and-lantern-light",
    title: "Timber & Lantern Light",
    category: "Kitchens",
    tagline: "Warmth from wood, beams and glowing pendants.",
    summary: [
      "Exposed beams, wood islands and lantern pendants give these kitchens a lived-in warmth that still feels considered.",
      "Wood is the through-line: on ceilings, on range hoods, and in islands with slatted or natural finishes.",
    ],
    notes: [
      "Exposed and beamed ceilings",
      "Lantern and gold-accent pendants",
      "Wood islands and wood range hoods",
      "Slatted island detailing",
    ],
    services: ["kitchen-remodeling", "carpentry", "countertops"],
    cover: timber[0],
    gallery: timber,
  },
  {
    slug: "vaulted-rooms-waterfall-islands",
    title: "Vaulted Rooms, Waterfall Islands",
    category: "Kitchens",
    tagline: "Height, volume and stone that pours to the floor.",
    summary: [
      "Open plans under vaulted ceilings, anchored by waterfall-edge islands where the counter material continues down the sides.",
      "Brass, black and glass pendants punctuate the space and pick up the finishes in the fixtures and hardware.",
    ],
    notes: [
      "Vaulted, open-plan layouts",
      "Waterfall-edge islands",
      "Brass dome, globe and glass pendants",
      "Mixed-metal finishes",
    ],
    services: ["kitchen-remodeling", "countertops"],
    cover: vaulted[0],
    gallery: vaulted,
    featured: true,
  },
  {
    slug: "hoods-ranges-and-cooking-walls",
    title: "Hoods, Ranges & Cooking Walls",
    category: "Kitchens",
    tagline: "The working wall, treated as a focal point.",
    summary: [
      "Statement range hoods, deep farmhouse sinks and colored cabinetry, from navy islands to dark lower cabinets.",
      "Details such as gooseneck faucets and woven shades show how much finish carries the design.",
    ],
    notes: [
      "Custom range hoods",
      "Farmhouse sinks and gooseneck faucets",
      "Colored and dark cabinetry",
      "Quartz counters",
    ],
    services: ["kitchen-remodeling", "countertops", "backsplash"],
    cover: cookingWalls[0],
    gallery: cookingWalls,
  },
  {
    slug: "marble-showers-and-patterned-floors",
    title: "Marble Showers & Patterned Floors",
    category: "Bathrooms",
    tagline: "Wet rooms built for the long haul.",
    summary: [
      "Showers in marble, pebble, herringbone and large-format tile, with niches, handheld and body-jet fixtures, and freestanding tubs.",
      "Patterned and hex floors add rhythm underfoot, and glass keeps the rooms open.",
    ],
    notes: [
      "Marble, pebble and herringbone shower tile",
      "Frameless and glass-block enclosures",
      "Niches, handheld and body-jet fixtures",
      "Freestanding and matte black tubs",
    ],
    services: ["bathroom-remodeling", "tile-flooring"],
    cover: showers[0],
    gallery: showers,
    featured: true,
  },
  {
    slug: "vanities-gold-and-glass",
    title: "Vanities in Gold & Glass",
    category: "Bathrooms",
    tagline: "The piece you see first, done with restraint.",
    summary: [
      "Double vanities in white, navy, taupe and light wood, framed by oval, arched and gold-trimmed mirrors.",
      "Marble counters, mosaic floors and gold or matte-black hardware give each room its own character.",
    ],
    notes: [
      "White, navy, taupe and wood vanities",
      "Oval, arched and gold-framed mirrors",
      "Marble counters and mosaic floors",
      "Gold and black fixtures",
    ],
    services: ["bathroom-remodeling", "countertops", "carpentry"],
    cover: vanities[0],
    gallery: vanities,
    featured: true,
  },
  {
    slug: "charcoal-cream-and-wallpaper-baths",
    title: "Charcoal, Cream & Wallpaper Baths",
    category: "Bathrooms",
    tagline: "Powder rooms and primary baths with a point of view.",
    summary: [
      "Deep charcoal walls, patterned tile showers and wallpapered baths show how much personality a small room can hold.",
    ],
    notes: [
      "Charcoal wall and vanity palettes",
      "Patterned shower tile",
      "Wallpapered bathrooms",
      "Powder-room feature walls",
    ],
    services: ["bathroom-remodeling", "tile-flooring", "painting-drywall-repair"],
    cover: quietBaths[0],
    gallery: quietBaths,
  },
  {
    slug: "floors-that-hold-the-room",
    title: "Floors That Hold the Room",
    category: "Floors",
    tagline: "Plank, chevron, stone-look and encaustic.",
    summary: [
      "Wood, wood-look and tile floors in dark, light and patterned finishes: hallways, entries, stair landings and open rooms.",
      "Transitions between materials are handled cleanly, including tile flowing into a shower.",
    ],
    notes: [
      "Wide plank, chevron and hardwood floors",
      "Encaustic-style and stone-look tile",
      "Stair landings and entries",
      "Clean transitions between materials",
    ],
    services: ["wood-flooring", "tile-flooring", "vinyl-flooring", "laminate-flooring"],
    cover: floors[0],
    gallery: floors,
    featured: true,
  },
  {
    slug: "hearths-in-stone-and-marble",
    title: "Hearths in Stone & Marble",
    category: "Details",
    tagline: "Fireplaces as the room's anchor.",
    summary: [
      "Double-height marble, linear tile walls, herringbone surrounds and stone great-room fireplaces, some with lit shelving.",
    ],
    notes: [
      "Marble and linear tile surrounds",
      "Herringbone patterns with mantels",
      "Stone great-room fireplaces",
      "Integrated lit shelving",
    ],
    services: ["tile-fireplaces", "carpentry"],
    cover: hearths[0],
    gallery: hearths,
  },
  {
    slug: "tile-as-detail",
    title: "Tile as Detail",
    category: "Details",
    tagline: "Backsplashes with pattern and intent.",
    summary: [
      "Chevron, herringbone, geometric and ornate ceramic backsplashes behind ranges and above counters, with details like gold faucets to finish.",
    ],
    notes: [
      "Chevron and herringbone layouts",
      "Geometric tile behind cooking surfaces",
      "Ornate ceramic and marble pairings",
    ],
    services: ["backsplash", "kitchen-remodeling"],
    cover: tile[0],
    gallery: tile,
  },
  {
    slug: "stairs-beams-and-millwork",
    title: "Stairs, Beams & Millwork",
    category: "Details",
    tagline: "Carpentry you notice by how it feels.",
    summary: [
      "Geometric wall millwork along a stair, dark treads against paneling, and exposed beams over an open plan.",
    ],
    notes: ["Geometric wall millwork", "Dark stair treads and paneling", "Exposed beams"],
    services: ["carpentry"],
    cover: millwork[0],
    gallery: millwork,
  },
  {
    slug: "roofs-read-from-above",
    title: "Roofs, Read From Above",
    category: "Roof & exterior",
    tagline: "Brick, stone and siding homes, new roofing on top.",
    summary: [
      "Roof work across brick, stone-veneer and siding homes, from underlayment going down to finished shingles and detailed gables.",
    ],
    notes: [
      "Underlayment and shingle installation",
      "Multi-gable roofs on brick homes",
      "Stone-veneer and siding exteriors",
    ],
    services: ["roof-replacement", "siding"],
    cover: roofs[0],
    gallery: roofs,
  },
  {
    slug: "storm-and-water-response",
    title: "Storm & Water Response",
    category: "Recovery",
    tagline: "The first call is about stopping the damage.",
    summary: [
      "Tarps secured over full and partial roofs to keep water out, and air movers drying a room after water intrusion.",
      "This is the unglamorous, time-sensitive work that comes before any rebuilding.",
    ],
    notes: [
      "Aerial tarp coverage of damaged roofs",
      "Partial-roof protection",
      "Air movers for structural drying",
    ],
    services: ["roofing-emergency-tarp-repair", "water-damage-restoration"],
    cover: response[0],
    gallery: response,
    featured: true,
  },
  {
    slug: "exteriors-renewed",
    title: "Exteriors, Renewed",
    category: "Roof & exterior",
    tagline: "Board-and-batten, clean corners and considered details.",
    summary: [
      "Farmhouse board-and-batten, finished corners, soffit and sconce details, a rear deck with glass doors, and an upgrade captured mid-project.",
    ],
    notes: [
      "Board-and-batten siding",
      "Soffit and lighting details",
      "Corner and trim finishing",
    ],
    services: ["siding", "carpentry"],
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
