import type { Metadata } from 'next';

import { AboutHero } from '@/components/about/about-hero';
import { AreaMarquee } from '@/components/about/area-marquee';
import { FamilyEssay } from '@/components/about/family-essay';
import { HabitCards } from '@/components/about/habit-cards';
import { ProcessRail } from '@/components/about/process-rail';
import { TeamGrid } from '@/components/about/team-grid';
import { WorkHighlights } from '@/components/about/work-highlights';
import { CtaBand } from '@/components/cta-band';
import { FaqSection } from '@/components/faq-section';
import { homeownerEn } from '@/lib/faqs/homeowner';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About Our Houston Restoration Team',
  description:
    'Family-owned restoration company in Houston, Texas, since 1993. Water, storm, and remodeling. Call (713) 909-0034.',
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
      <FaqSection
        id="about-faq-heading"
        title="Good to know."
        items={[homeownerEn.areas, homeownerEn.years, homeownerEn.spanish]}
      />
      <CtaBand
        title="Let us look at the house with you."
        body="A kitchen you have been planning, or a leak that showed up overnight. Either way, it starts with a conversation."
      />
    </>
  );
}
