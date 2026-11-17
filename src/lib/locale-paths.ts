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
  'tile-fireplace-surround-houston',
  'drywall-repair-after-a-leak-houston',
  'deck-material-for-houston-humidity',
  'best-fence-for-houston-weather',
  'gutter-size-for-houston-rain',
  'kitchen-backsplash-cinco-ranch-katy',
] as const;

export type NeighborhoodSlug = (typeof neighborhoodSlugs)[number];
export type HoustonPostSlug = (typeof houstonPostSlugs)[number];
