import type { Metadata } from 'next';

import { HomeFinalCta } from '@/components/home/home-final-cta';
import { HomeHero } from '@/components/home/home-hero';
import { HomeManifesto } from '@/components/home/home-manifesto';
import { HomeProcess } from '@/components/home/home-process';
import { HomeTestimonials } from '@/components/home/home-testimonials';
import {
  ServiceIndex,
  type IndexService,
} from '@/components/home/service-index';
import { services } from '@/lib/services';
import { languageAlternates, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Houston Restoration & Remodeling',
  description:
    'Water and storm damage, remodeling, and help with an insurance claim in Houston. Family-owned since 1993. Call (713) 909-0034.',
  path: '/',
  image: '/images/projects/kitchens/coffered-ceiling-island.jpg',
  languages: languageAlternates('/', '/es'),
});

export default function HomePage() {
  const coreLinks = [
    { href: '/kitchen-remodeling', label: 'Kitchen remodeling' },
    { href: '/bathroom-remodeling', label: 'Bathroom remodeling' },
    { href: '/roofing', label: 'Roofing' },
    { href: '/restoration', label: 'Houston restoration services' },
    { href: '/insurance-claims', label: 'Help with an insurance claim' },
    { href: '/houston-storm-damage', label: 'Houston storm damage help' },
    { href: '/commercial-storm-restoration', label: 'Emergencies at apartments and businesses' },
  ];

  const indexServices: IndexService[] = services.map((s) => ({
    slug: s.slug,
    name: s.name,
    group: s.group,
    summary: s.summary,
    image: s.image,
    emergency: s.emergency,
  }));

  return (
    <>
      <HomeHero />
      <HomeManifesto />
      <ServiceIndex services={indexServices} coreLinks={coreLinks} />
      <HomeProcess />
      <HomeTestimonials />
      <HomeFinalCta />
    </>
  );
}
