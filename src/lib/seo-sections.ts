import { assertCopyAllowed } from '@/lib/copy-guards';

export type TextLink = { href: string; label: string };

export const homeRestorationEn = {
  eyebrow: 'Recovery',
  title: 'Home restoration in Houston',
  paragraphs: [
    'Home restoration is the work that follows water, a storm, or a roof that let rain in. The aim is a dry house you can use again. A remodel can wait until the structure is dry.',
    'Elite Restorations is a family-owned restoration company in Houston, Texas, serving Houston since 1993. A restore company in Houston should dry the structure before anyone talks about new finishes. Restoration companies in Houston do not all do the same job. We dry water damage, cover an open roof, board up a broken opening, and repair what the water ruined. The office is at 511 Crestwater Ct. Call (713) 909-0034.',
    'A house in Crosby had water damage found in January 2025. The kitchen floor came out down to a stained subfloor, and dehumidifiers and air movers dried the kitchen and bathroom. Drying and repairs ran from February to March 2025, and the kitchen and bath were rebuilt by April 2025.',
  ],
  links: [
    { href: '/restoration', label: 'Houston restoration services' },
    { href: '/houston-storm-damage', label: 'Houston storm damage' },
    { href: '/water-damage-restoration', label: 'Water damage restoration' },
    { href: '/water-damage-restoration-houston-tx', label: 'Water damage in Houston' },
    { href: '/water-damage-restoration-katy-tx', label: 'Water damage in Katy' },
    { href: '/roofing-houston-tx', label: 'Roofing in Houston' },
    { href: '/roofing-sugar-land-tx', label: 'Roofing in Sugar Land' },
    { href: '/missouri-city-tx', label: 'Missouri City' },
    { href: '/fulshear-tx', label: 'Fulshear' },
    { href: '/burst-frozen-pipe-water-damage-houston', label: 'Freeze and burst pipes' },
    { href: '/water-heater-leak-damage-houston', label: 'Water heater leaks' },
    { href: '/dishwasher-leak-water-damage-houston', label: 'Dishwasher leaks' },
    { href: '/toilet-overflow-water-damage-houston', label: 'Toilet overflow' },
    { href: '/emergency-board-up', label: 'Emergency board-up' },
    { href: '/roofing-emergency-tarp-repair', label: 'Emergency roof tarping' },
    { href: '/roofing', label: 'Roofing' },
    { href: '/roof-replacement', label: 'Roof replacement' },
    { href: '/projects/crosby-water-damage', label: 'Water damage repair in Crosby' },
  ] satisfies TextLink[],
};

export const homeRestorationEs = {
  eyebrow: 'Restauración',
  title: 'Restauración de casas en Houston',
  paragraphs: [
    'La restauración de una casa es el trabajo que sigue al agua, a una tormenta o a un techo que dejó pasar la lluvia. La meta es una casa seca que se pueda usar otra vez. Remodelar puede esperar a que la estructura esté seca.',
    'Elite Restorations es una empresa familiar en Houston desde 1993. Secamos el daño de agua, cubrimos un techo abierto, ponemos tablas en una ventana o una puerta rota, y reparamos lo que el agua dañó. La oficina está en 511 Crestwater Ct. Llame al (713) 909-0034.',
    'En una casa de Crosby se encontró daño de agua en enero de 2025. El piso de la cocina salió hasta un contrapiso manchado, y deshumidificadores y ventiladores de secado secaron la cocina y el baño. El secado y la reparación fueron de febrero a marzo de 2025, y la cocina y el baño quedaron listos en abril de 2025.',
  ],
  links: [
    { href: '/es/houston-storm-damage', label: 'Daño por tormenta en Houston' },
    { href: '/es/water-damage-restoration', label: 'Restauración por daño de agua' },
    { href: '/burst-frozen-pipe-water-damage-houston', label: 'Tubos congelados y reventados' },
    { href: '/water-heater-leak-damage-houston', label: 'Fugas de calentador' },
    { href: '/dishwasher-leak-water-damage-houston', label: 'Fugas de lavavajillas' },
    { href: '/toilet-overflow-water-damage-houston', label: 'Desborde del inodoro' },
    { href: '/emergency-board-up', label: 'Tablas de emergencia' },
    { href: '/es/roofing-emergency-tarp-repair', label: 'Lona de emergencia para techos' },
    { href: '/es/roofing', label: 'Techos' },
    { href: '/es/roof-replacement', label: 'Reemplazo de techo' },
    { href: '/projects/crosby-water-damage', label: 'Reparación por agua en Crosby' },
  ] satisfies TextLink[],
};

export const discoverEn = {
  heading: 'City pages, insurance notes, and guides.',
  intro:
    'Neighborhood pages, city service pages, insurer notes, and job-site guides sit deeper on the site. These links are a short way in.',
  links: [
    { href: '/cypress-tx', label: 'Cypress' },
    { href: '/missouri-city-tx', label: 'Missouri City' },
    { href: '/fulshear-tx', label: 'Fulshear' },
    { href: '/kingwood-tx', label: 'Kingwood' },
    { href: '/spring-tx', label: 'Spring' },
    { href: '/humble-tx', label: 'Humble' },
    { href: '/friendswood-tx', label: 'Friendswood' },
    { href: '/tomball-tx', label: 'Tomball' },
    { href: '/meyerland-tx', label: 'Meyerland' },
    { href: '/westchase-tx', label: 'Westchase' },
    { href: '/laminate-flooring-katy-tx', label: 'Laminate flooring in Katy' },
    { href: '/water-damage-restoration-houston-tx', label: 'Water damage in Houston' },
    { href: '/roofing-the-woodlands-tx', label: 'Roofing in The Woodlands' },
    { href: '/insurance-claims/companies', label: 'Insurer guides' },
    { href: '/insurance-claims/companies/state-farm', label: 'State Farm claims notes' },
    { href: '/water-damage-insurance-claims-in-texas', label: 'Water-damage claim checklist' },
    { href: '/houston-flooring-for-humidity', label: 'Flooring and Houston humidity' },
    { href: '/first-24-hours-water-damage-houston', label: 'The first day after water damage' },
    { href: '/houston-flood-damage-repair', label: 'Flood damage repair' },
    { href: '/blog', label: 'All guides' },
  ] satisfies TextLink[],
};

/** Services hub already lists neighborhoods. These links reach pages that list does not. */
export const discoverServicesEn = {
  heading: 'Insurance notes, guides, and city service pages.',
  intro:
    'The neighborhood list above is the map. These links open insurer notes, job-site guides, and a service page for one city.',
  links: [
    { href: '/laminate-flooring-houston-tx', label: 'Laminate flooring in Houston' },
    { href: '/laminate-flooring-katy-tx', label: 'Laminate flooring in Katy' },
    { href: '/vinyl-flooring-pearland-tx', label: 'Vinyl flooring in Pearland' },
    { href: '/water-damage-restoration-houston-tx', label: 'Water damage in Houston' },
    { href: '/roofing-magnolia-tx', label: 'Roofing in Magnolia' },
    { href: '/kitchen-remodeling-the-heights-tx', label: 'Kitchens in The Heights' },
    { href: '/insurance-claims/companies', label: 'Insurer guides' },
    { href: '/insurance-claims/companies/allstate', label: 'Allstate claims notes' },
    { href: '/insurance-claims/companies/usaa', label: 'USAA claims notes' },
    { href: '/water-damage-insurance-claims-in-texas', label: 'Water-damage claim checklist' },
    { href: '/houston-flooring-for-humidity', label: 'Flooring and Houston humidity' },
    { href: '/houston-storm-damage', label: 'Houston storm damage' },
    { href: '/first-24-hours-water-damage-houston', label: 'The first day after water damage' },
    { href: '/blog', label: 'All guides' },
  ] satisfies TextLink[],
};

export const discoverEs = {
  heading: 'Vecindarios, guías y notas de seguro.',
  intro:
    'Estas páginas van más adentro: vecindarios, guías del trabajo y notas sobre aseguradoras.',
  links: [
    { href: '/es/cypress-tx', label: 'Cypress' },
    { href: '/es/kingwood-tx', label: 'Kingwood' },
    { href: '/es/spring-tx', label: 'Spring' },
    { href: '/es/humble-tx', label: 'Humble' },
    { href: '/es/friendswood-tx', label: 'Friendswood' },
    { href: '/es/tomball-tx', label: 'Tomball' },
    { href: '/es/meyerland-tx', label: 'Meyerland' },
    { href: '/es/laminate-flooring', label: 'Pisos laminados' },
    { href: '/es/blog/houston-flooring-for-humidity', label: 'Pisos y humedad' },
    { href: '/es/blog/first-24-hours-water-damage-houston', label: 'Las primeras 24 horas con agua' },
    { href: '/es/blog/houston-flood-damage-repair', label: 'Reparación por inundación' },
    { href: '/es/blog', label: 'Guías en español' },
    { href: '/insurance-claims/companies', label: 'Guías de aseguradoras' },
    { href: '/water-damage-insurance-claims-in-texas', label: 'Lista para un reclamo de agua' },
  ] satisfies TextLink[],
};

function blob(paragraphs: readonly string[], links: readonly TextLink[]) {
  return [...paragraphs, ...links.map((link) => link.label)].join('\n');
}

assertCopyAllowed(
  '/services#home-restoration',
  [homeRestorationEn.title, blob(homeRestorationEn.paragraphs, homeRestorationEn.links)].join('\n'),
);
assertCopyAllowed(
  '/es#home-restoration',
  [homeRestorationEs.title, blob(homeRestorationEs.paragraphs, homeRestorationEs.links)].join('\n'),
);
assertCopyAllowed(
  '/#discover',
  [discoverEn.heading, discoverEn.intro, blob([], discoverEn.links)].join('\n'),
);
assertCopyAllowed(
  '/services#discover',
  [discoverServicesEn.heading, discoverServicesEn.intro, blob([], discoverServicesEn.links)].join('\n'),
);
assertCopyAllowed(
  '/es#discover',
  [discoverEs.heading, discoverEs.intro, blob([], discoverEs.links)].join('\n'),
);
