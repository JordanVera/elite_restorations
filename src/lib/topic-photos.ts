import { img, type Img } from "@/lib/images";

/** Existing photographs, grouped so a page can use a topic match instead of the dry-out photo. */

export const dryOut = img(
  "/images/services/water-damage-restoration.jpg",
  "Air movers drying a water-damaged room in a Houston home",
);

export const roofs = {
  finishedBrick: img(
    "/images/projects/roofing/brick-home-shingles.jpg",
    "Finished shingle roof on a brick Houston home",
  ),
  multiGable: img(
    "/images/projects/roofing/brick-home-multi-gable.webp",
    "Brick Houston home with a multi-gable shingle roof",
  ),
  atticVent: img(
    "/images/projects/roofing/brick-gable-attic-vent.jpg",
    "Gabled shingle roof and attic vent on a brick Houston home",
  ),
  missingShingles: img(
    "/images/projects/roofing/brick-house-missing-shingles.webp",
    "Brick Houston house with missing roof shingles",
  ),
  underlayment: img(
    "/images/projects/roofing/roofer-ladder-underlayment.webp",
    "Roofer on a ladder installing underlayment on a Houston roof",
  ),
  stoneGable: img(
    "/images/projects/roofing/gable-stone-veneer.jpg",
    "Stone-veneer Houston home with a gabled shingle roof",
  ),
  twoStoryStone: img(
    "/images/projects/roofing/two-story-stone-home.jpg",
    "Two-story stone Houston home with a shingle roof",
  ),
  whiteSiding: img(
    "/images/projects/roofing/shingles-white-siding.jpg",
    "Shingle roof meeting white siding on a Houston home",
  ),
  overPool: img(
    "/images/projects/roofing/roof-over-backyard-pool.webp",
    "Shingle roof above a backyard pool at a Houston home",
  ),
  serviceReplacement: img(
    "/images/services/roof-replacement.webp",
    "Finished shingle roof on a brick Houston home",
  ),
};

export const tarps = {
  full: img(
    "/images/services/roofing-emergency-tarp-repair.jpg",
    "Aerial view of an emergency tarp covering a Houston roof",
  ),
  complex: img(
    "/images/projects/roofing/tarp-aerial-complex-roof.jpg",
    "Aerial view of a tarp on a complex Houston roof",
  ),
  partial: img(
    "/images/projects/roofing/tarp-partial-roof.jpg",
    "Tarp covering part of a Houston roof",
  ),
};

export const exteriors = {
  boardAndBatten: img(
    "/images/projects/siding/farmhouse-board-and-batten.jpg",
    "Board-and-batten siding on a Houston home",
  ),
  corner: img(
    "/images/projects/siding/finished-exterior-corner.jpg",
    "Finished exterior corner and trim on a Houston home",
  ),
  inProgress: img(
    "/images/projects/siding/siding-upgrade-in-progress.jpg",
    "Exterior siding work in progress on a Houston home",
  ),
  soffit: img(
    "/images/projects/siding/soffit-and-sconce-detail.jpg",
    "Soffit and exterior light at the eave of a Houston home",
  ),
  deck: img(
    "/images/projects/siding/rear-deck-glass-doors.jpg",
    "Rear deck and glass doors on a Houston home",
  ),
  serviceSiding: img(
    "/images/services/siding.jpg",
    "Board-and-batten siding on a Houston home",
  ),
};

export const rooms = {
  farmhouseSink: img(
    "/images/projects/kitchens/navy-island-farmhouse-sink.jpg",
    "Kitchen island and farmhouse sink in a Houston kitchen remodel",
  ),
  bathVanity: img(
    "/images/projects/bathrooms/taupe-vanity-marble-floor.jpg",
    "Bathroom vanity and marble floor in a Houston bathroom remodel",
  ),
  paintedPowder: img(
    "/images/projects/bathrooms/powder-room-charcoal-walls.jpg",
    "Painted charcoal walls in a Houston powder room",
  ),
};

/**
 * Hero rotation for city pages. Water stays on the only drying photo.
 * Roof, storm, and exterior services rotate real roof and exterior shots.
 */
export const cityHeroPools: Record<string, readonly Img[]> = {
  roofing: [
    roofs.multiGable,
    roofs.finishedBrick,
    roofs.atticVent,
    roofs.stoneGable,
    roofs.twoStoryStone,
    roofs.whiteSiding,
  ],
  "roof-replacement": [
    roofs.serviceReplacement,
    roofs.underlayment,
    roofs.missingShingles,
    roofs.finishedBrick,
  ],
  "roofing-emergency-tarp-repair": [tarps.full, tarps.complex, tarps.partial],
  "water-damage-restoration": [dryOut],
  "insurance-claims": [
    roofs.missingShingles,
    tarps.partial,
    roofs.underlayment,
    roofs.multiGable,
  ],
  siding: [
    exteriors.serviceSiding,
    exteriors.boardAndBatten,
    exteriors.corner,
    exteriors.inProgress,
  ],
  "patios-decks": [exteriors.deck, roofs.overPool],
  "emergency-board-up": [exteriors.inProgress, exteriors.corner],
  "fence-installation-repair": [exteriors.corner, exteriors.boardAndBatten],
  gutters: [roofs.whiteSiding, exteriors.soffit],
  patios: [roofs.overPool, exteriors.deck],
  gazebos: [roofs.overPool, exteriors.boardAndBatten],
  decks: [exteriors.deck, roofs.overPool],
  "commercial-storm-restoration": [tarps.complex, roofs.missingShingles, tarps.partial],
};

export function pickFromPool(pool: readonly Img[], shift: number, fallback?: Img) {
  if (pool.length === 0) return fallback;
  const index = ((shift % pool.length) + pool.length) % pool.length;
  return pool[index];
}
