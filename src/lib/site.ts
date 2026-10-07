export const site = {
  name: 'Elite Restorations',
  tagline: 'Remodeling and restoration for Greater Houston',
  description:
    'Family-owned remodeling and restoration contractor serving Greater Houston since 1993. Kitchens, bathrooms, flooring, roofing, siding, carpentry and water-damage recovery under one roof.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eliterestorations.com',
  founded: 1993,
  phone: {
    display: '(713) 909-0034',
    href: 'tel:+17139090034',
    e164: '+17139090034',
  },
  email: 'admin@eliterestorations.com',
  locality: 'Houston, TX',
  hours: [
    { days: 'Monday to Saturday', time: '8:00 AM to 6:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  social: [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/Elite-Restorations-Inc-208965145793039/',
    },
    {
      label: 'Yelp',
      href: 'https://www.yelp.com/biz/elite-restorations-houston',
    },
  ],
  serviceArea: [
    'Houston',
    'The Heights',
    'River Oaks',
    'Memorial',
    'Bellaire',
    'West University',
    'Galleria Area',
    'Upper Kirby',
    'Rice Village',
    'Medical Center',
    'Spring Branch',
    'Bunker Hill',
    'Piney Point',
    'Hunter Creek',
    'Bear Creek',
    'Katy',
    'Cinco Ranch',
    'Sugar Land',
    'Stafford',
    'Richmond',
    'Pearland',
    'Clear Lake',
    'Baytown',
    'Galveston',
    'Texas City',
    'The Woodlands',
    'Magnolia',
  ],
} as const;

export const nav = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/emergency', label: 'Emergency' },
] as const;

export const ctaHref = '/contact';
export const emergencyHref = '/emergency';
