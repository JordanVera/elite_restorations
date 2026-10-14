import type { Metadata } from 'next';

import { AboutHero } from '@/components/about/about-hero';
import { AreaMarquee } from '@/components/about/area-marquee';
import { FamilyEssay } from '@/components/about/family-essay';
import { HabitCards } from '@/components/about/habit-cards';
import { ProcessRail } from '@/components/about/process-rail';
import { TeamGrid } from '@/components/about/team-grid';
import { WorkHighlights } from '@/components/about/work-highlights';
import { CtaBand } from '@/components/cta-band';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Elite Restorations is a family-owned remodeling and restoration company serving Greater Houston since 1993. Meet the people who answer the phone and do the work.',
  path: '/about',
  image: '/images/about/george_family.jpeg',
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FamilyEssay />
      <HabitCards />
      <TeamGrid />
      <WorkHighlights />
      <ProcessRail />
      <AreaMarquee />
      <CtaBand
        title="Let us look at your project."
        body="Whether it is a planned remodel or something that went wrong overnight, the first step is a conversation."
      />
    </>
  );
}
