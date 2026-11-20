import { isNewCityArea } from '@/lib/city-landing-locales';
import { img, type Img } from '@/lib/images';

export type EditedShot = {
  image: Img;
  href?: string;
  caption: string;
};

function shot(src: string, alt: string, href?: string, caption?: string): EditedShot {
  return {
    image: img(src, alt),
    href,
    caption: caption ?? alt,
  };
}

const kitchenNavy = shot(
  '/images/edited/kitchen-navy.webp',
  'Finished kitchen with a navy island, white cabinets, and a farmhouse sink',
  '/projects/hoods-ranges-and-cooking-walls',
);
const kitchenQuartz = shot(
  '/images/edited/kitchen-quartz.webp',
  'White kitchen with a quartz island and a tile backsplash',
  '/projects/hoods-ranges-and-cooking-walls',
);
const backsplash = shot(
  '/images/edited/backsplash-arabesque.webp',
  'Arabesque tile backsplash above a light stone counter',
);
const bathMarble = shot(
  '/images/edited/bath-marble.webp',
  'Marble shower with a frameless glass door',
);
const bathKaty = shot(
  '/images/edited/bath-katy.webp',
  'Marble shower wall with a rain head and a tiled niche',
  '/projects/katy-marble-bathroom',
);
const powder = shot(
  '/images/projects/bathrooms/navy-vanity-gold-pulls.webp',
  'Painted navy vanity with gold pulls and a vessel sink',
  '/projects/vanities-gold-and-glass',
);
const woodLight = shot(
  '/images/edited/wood-light.webp',
  'Light wood plank flooring in an empty finished room',
);
const tilePattern = shot(
  '/images/edited/tile-pattern.webp',
  'Patterned tile floor seen through a doorway',
);
const vinylRoom = shot(
  '/images/edited/vinyl-room.webp',
  'Wood-look plank flooring in a bright finished room',
);
const plankGray = shot(
  '/images/projects/flooring/stair-landing-hardwood.jpg',
  'Wood plank flooring across a stair landing',
  '/projects/floors-that-hold-the-room',
);
const stair = shot(
  '/images/edited/stair-millwork.webp',
  'Stair rail and geometric wall paneling',
  '/projects/stairs-beams-and-millwork',
);
const fireplace = shot(
  '/images/edited/fireplace-marble.webp',
  'Marble fireplace wall in a finished living room',
);
const roofStone = shot(
  '/images/edited/roof-stone.webp',
  'Finished architectural shingles on a stone-veneer gable',
  '/projects/roofs-read-from-above',
);
const roofBrick = shot(
  '/images/edited/roof-brick.webp',
  'Finished multi-gable shingle roof on a brick house',
  '/projects/roofs-read-from-above',
);
const tarp = shot(
  '/images/edited/tarp-aerial.webp',
  'Emergency tarp secured across a residential roof',
  '/projects/storm-and-water-response',
);
const siding = shot(
  '/images/edited/siding-corner.webp',
  'Finished board-and-batten siding and brick at a house corner',
  '/projects/exteriors-renewed',
);
const deck = shot(
  '/images/edited/deck-surface.webp',
  'Composite deck boards',
  '/projects/katy-composite-deck',
);
const waterKitchen = shot(
  '/images/projects/kitchens/shaker-diagonal-tile-floor.jpg',
  'Finished kitchen with white cabinets, a lantern-tile backsplash, and a marble floor',
  '/projects/coffered-ceilings-marble-islands',
);

const sets: Record<string, { hero: EditedShot; gallery: readonly EditedShot[] }> = {
  'kitchen-remodeling': { hero: kitchenNavy, gallery: [kitchenQuartz, backsplash] },
  'bathroom-remodeling': { hero: bathMarble, gallery: [bathKaty, powder] },
  backsplash: { hero: backsplash, gallery: [kitchenQuartz, kitchenNavy] },
  countertops: { hero: kitchenQuartz, gallery: [kitchenNavy, backsplash] },
  'wood-flooring': { hero: woodLight, gallery: [vinylRoom, plankGray] },
  'tile-flooring': { hero: tilePattern, gallery: [bathMarble, vinylRoom] },
  'vinyl-flooring': { hero: vinylRoom, gallery: [plankGray, woodLight] },
  'laminate-flooring': { hero: plankGray, gallery: [woodLight, vinylRoom] },
  carpentry: { hero: stair, gallery: [fireplace, powder] },
  'tile-fireplaces': { hero: fireplace, gallery: [stair] },
  roofing: { hero: roofStone, gallery: [roofBrick] },
  'roof-replacement': { hero: roofBrick, gallery: [roofStone] },
  'roofing-emergency-tarp-repair': { hero: tarp, gallery: [roofStone] },
  siding: { hero: siding, gallery: [roofStone] },
  'patios-decks': { hero: deck, gallery: [siding] },
  'water-damage-restoration': { hero: waterKitchen, gallery: [plankGray] },
  'insurance-claims': { hero: roofBrick, gallery: [tarp] },
  'painting-drywall-repair': { hero: powder, gallery: [stair] },
};

export function usesEditedCityPhotos(areaSlug: string) {
  return isNewCityArea(areaSlug);
}

export function editedPhotoSet(serviceSlug: string) {
  const set = sets[serviceSlug];
  if (!set) throw new Error(`No edited photos for ${serviceSlug}`);
  return set;
}

/** Every edited file, for the manifest check and the review list. */
export const editedPhotoFiles = [
  kitchenNavy,
  kitchenQuartz,
  backsplash,
  bathMarble,
  bathKaty,
  powder,
  woodLight,
  tilePattern,
  vinylRoom,
  plankGray,
  stair,
  fireplace,
  roofStone,
  roofBrick,
  tarp,
  siding,
  deck,
  waterKitchen,
] as const;
