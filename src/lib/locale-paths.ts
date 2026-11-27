/** Slug lists shared with the language switch. Kept free of page copy so the client bundle stays small. */

export const neighborhoodSlugs = [
  'meyerland-tx',
  'montrose-tx',
  'garden-oaks-tx',
  'oak-forest-tx',
  'kingwood-tx',
  'cypress-tx',
  'spring-tx',
  'humble-tx',
  'friendswood-tx',
  'tomball-tx',
  'missouri-city-tx',
  'fulshear-tx',
  'copperfield-tx',
  'rosenberg-tx',
  'jersey-village-tx',
  'towne-lake-tx',
  'bridgeland-tx',
  'sienna-tx',
] as const;

export const houstonPostSlugs = [
  'houston-hail-storm-roof-claims',
  'emergency-tarp-and-board-up-houston',
  'houston-leaks-pipes-heater-dishwasher-toilet',
  'houston-flood-damage-repair',
  'houston-kitchen-remodel-ideas',
  'houston-bathroom-remodel-guide',
  'houston-flooring-for-humidity',
  'houston-roof-replacement-guide',
  'first-24-hours-water-damage-houston',
  'remodeling-a-houston-ranch-house',
  'quartz-vs-granite-countertops-houston',
  'carpentry-for-houston-humidity',
  'patio-cover-gazebo-cypress-bridgeland',
  'tile-fireplace-surround-houston',
  'drywall-repair-after-a-leak-houston',
  'deck-material-for-houston-humidity',
  'best-fence-for-houston-weather',
  'gutter-size-for-houston-rain',
  'kitchen-backsplash-cinco-ranch-katy',
  'woodlands-spring-first-freeze-prep',
  'sugar-land-tub-to-shower-conversion',
  'pearland-roof-repair-or-replacement',
] as const;

export type NeighborhoodSlug = (typeof neighborhoodSlugs)[number];
export type HoustonPostSlug = (typeof houstonPostSlugs)[number];

/** English project slugs that have a Spanish page at `/es/projects/${slug}`. */
export const spanishProjectSlugs = [
  'coffered-ceilings-marble-islands',
  'timber-and-lantern-light',
  'vaulted-rooms-waterfall-islands',
  'hoods-ranges-and-cooking-walls',
  'marble-showers-and-patterned-floors',
  'vanities-gold-and-glass',
  'charcoal-cream-and-wallpaper-baths',
  'floors-that-hold-the-room',
  'hearths-in-stone-and-marble',
  'tile-as-detail',
  'stairs-beams-and-millwork',
  'roofs-read-from-above',
  'storm-and-water-response',
  'exteriors-renewed',
  'blackhorse-ranch-cypress',
  'crosby-water-damage',
  'katy-composite-deck',
  'katy-marble-bathroom',
  'custom-walk-in-closet-katy',
] as const;

export const insurerSlugs = [
  'state-farm',
  'allstate',
  'usaa',
  'farmers',
  'liberty-mutual',
  'travelers',
  'nationwide',
  'progressive',
] as const;

export const costGuideSlugs = [
  'kitchen-remodel-cost-houston',
  'bathroom-remodel-cost-houston',
  'roof-replacement-cost-houston',
] as const;

export const areaOverviewSlugs = ['westchase-tx', 'alief-tx', 'energy-corridor-tx'] as const;

export const waterCauseSlugs = [
  'burst-frozen-pipe-water-damage-houston',
  'water-heater-leak-damage-houston',
  'dishwasher-leak-water-damage-houston',
  'toilet-overflow-water-damage-houston',
] as const;

export const legacyArticleSlugs = [
  'remodeling-vs-restoring-whats-right-for-your-home',
  'how-to-prevent-water-damage-in-your-home',
  'what-to-do-after-a-fire-your-first-5-steps',
  'bathroom-upgrades-that-boost-your-homes-resale-value',
  'signs-its-time-to-replace-your-homes-flooring',
  'kitchen-remodel-benefits',
  'frozen-and-burst-pipes-in-houston',
  'water-damage-insurance-claims-in-texas',
  'what-to-do-after-water-damage-houston',
  'storm-and-hail-roof-repair-houston',
  'how-insurance-claims-work-texas-restoration',
  'hurricane-season-prep-houston',
  'what-to-do-after-a-roof-leak-in-houston',
  'slab-moisture-after-a-supply-line-break-houston',
  'hail-damage-vs-normal-wear-houston-roof',
  'how-to-build-an-insurance-photo-log',
  'houston-freeze-prep-for-pipes',
  'ground-check-after-a-houston-storm',
  'plan-kitchen-bath-remodel-2027',
] as const;
