/**
 * Live Facebook page. The slug is spelled eliterestorartions on purpose.
 * Do not swap it for a numeric page id.
 */
export const facebookUrl =
  'https://www.facebook.com/eliterestorartions' as const;

export const site = {
  name: 'Elite Restorations',
  tagline: 'Remodeling and restoration for Greater Houston',
  description:
    'Family-owned Houston restoration and remodeling company since 1993. Water, storm, and fire damage, insurance claims help, kitchens, baths, and roofs.',
  url: 'https://eliterestorations.com',
  founded: 1993,
  phone: {
    display: '(713) 909-0034',
    href: 'tel:+17139090034',
    sms: 'sms:+17139090034',
    e164: '+17139090034',
  },
  email: 'admin@eliterestorations.com',
  locality: 'Houston, TX',
  address: {
    streetAddress: '511 Crestwater Ct',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77082',
    addressCountry: 'US',
  },
  geo: {
    latitude: 29.715333,
    longitude: -95.677575,
  },
  hours: [
    { days: 'Monday through Saturday', time: '8:00 AM to 6:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  sameAs: [
    facebookUrl,
    'https://www.instagram.com/elite_restorations_/',
    'https://www.tiktok.com/@eliterestorationstx',
    'https://www.youtube.com/@eliterestorationstx',
    'https://www.pinterest.com/eliterestorationstx/',
    'https://nextdoor.com/page/elite-restorations-houston-tx/',
  ],
  social: [
    {
      label: 'Facebook',
      href: facebookUrl,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/elite_restorations_/',
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@eliterestorationstx',
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@eliterestorationstx',
    },
    {
      label: 'Pinterest',
      href: 'https://www.pinterest.com/eliterestorationstx/',
    },
    {
      label: 'Nextdoor',
      href: 'https://nextdoor.com/page/elite-restorations-houston-tx/',
    },
    {
      label: 'BBB',
      href: 'https://www.bbb.org/us/tx/houston/profile/general-contractor/elite-restorations-0915-58002706',
    },
  ],
  serviceArea: [
    'Houston',
    'Westchase',
    'Alief',
    'Energy Corridor',
    'Katy',
    'Sugar Land',
    'Bellaire',
    'Memorial',
    'Spring Branch',
    'The Heights',
    'River Oaks',
    'West University',
    'Galleria Area',
    'Upper Kirby',
    'Rice Village',
    'Medical Center',
    'Bunker Hill',
    'Piney Point',
    'Hunters Creek',
    'Bear Creek',
    'Cinco Ranch',
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

export type NavLink = {
  href: string;
  label: string;
};

export type NavItem = NavLink & {
  children?: readonly NavLink[];
};

export const nav: readonly NavItem[] = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  {
    href: '/resources',
    label: 'Resources',
    children: [
      { href: '/resources/homeowners', label: 'Homeowners' },
      { href: '/resources/realtors', label: 'Realtors' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/emergency', label: 'Emergency' },
];

export const ctaHref = '/contact';
export const emergencyHref = '/emergency';
