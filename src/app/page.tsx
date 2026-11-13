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
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Houston Restoration & Remodeling',
  description:
    'Water and storm damage restoration, remodeling, and insurance claims help in Houston. Family-owned since 1993. Call (713) 909-0034.',
  path: '/',
  image: '/images/projects/kitchens/coffered-ceiling-island.jpg',
});

export default function HomePage() {
  const coreLinks = [
    { href: '/kitchen-remodeling', label: 'Kitchen remodeling' },
    { href: '/bathroom-remodeling', label: 'Bathroom remodeling' },
    { href: '/roofing', label: 'Roofing' },
    { href: '/restoration', label: 'Houston restoration services' },
    { href: '/insurance-claims', label: 'Insurance claims help' },
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
