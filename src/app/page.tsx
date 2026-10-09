import type { Metadata } from 'next';

import {
  FeaturedTrack,
  type TrackProject,
} from '@/components/home/featured-track';
import { HomeFinalCta } from '@/components/home/home-final-cta';
import { HomeHero } from '@/components/home/home-hero';
import { HomeManifesto } from '@/components/home/home-manifesto';
import { HomeProcess } from '@/components/home/home-process';
import { HomeTestimonials } from '@/components/home/home-testimonials';
import {
  ServiceIndex,
  type IndexService,
} from '@/components/home/service-index';
import { projects } from '@/lib/projects';
import { services } from '@/lib/services';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Elite Restorations | Remodeling & Restoration in Houston, TX',
  description:
    'Family-owned remodeling and restoration contractor serving Greater Houston since 1993. From emergency roof and water-damage response to kitchens, baths and floors.',
  path: '/',
  image: '/images/projects/kitchens/coffered-ceiling-island.jpg',
});

export default function HomePage() {
  const featured: TrackProject[] = projects
    .filter((p) => p.featured)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      tagline: p.tagline,
      cover: p.cover,
      count: p.gallery.length,
    }));

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
      {/* <FeaturedTrack projects={featured} /> */}
      <ServiceIndex services={indexServices} />
      <HomeProcess />
      <HomeTestimonials />
      <HomeFinalCta />
    </>
  );
}
