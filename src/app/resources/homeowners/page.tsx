import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { VideoPortal } from '@/components/resources/video-portal';
import { Button } from '@/components/ui/button';
import { hasRealVideos } from '@/lib/resource-videos';
import { pageMetadata } from '@/lib/seo';
import { ctaHref } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Homeowner Remodel Help in Houston',
  description:
    'How Elite Restorations sequences bathroom, kitchen, and whole-home remodels in Houston, then how to request an estimate.',
  path: '/resources/homeowners',
});

const howWeWork = [
  {
    index: '01',
    title: 'Consult',
    body: 'We come to the house, look closely, and listen to what you want the room to do.',
  },
  {
    index: '02',
    title: 'Plan',
    body: 'Materials, budget, and scope are settled before any demolition begins.',
  },
  {
    index: '03',
    title: 'Build',
    body: 'Our crew does the work, with one point of contact for questions along the way.',
  },
  {
    index: '04',
    title: 'Walk through',
    body: 'We clean up and walk the finished space with you before the job is closed.',
  },
];

export default function HomeownersResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="For homeowners"
        title={['See the sequence', 'before you hire.']}
        lede="How a bathroom, kitchen, or whole-home remodel proceeds, step by step, before you ask for an estimate."
        crumbs={[
          { name: 'Resources', path: '/resources' },
          { name: 'Homeowners', path: '/resources/homeowners' },
        ]}
      >
        <Reveal delay={0.45} className="mt-10">
          <Button asChild size="xl" variant="accent">
            <Link href={ctaHref}>
              Get a Free Estimate
              <ArrowUpRight className="arrow" aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </PageHero>

      {hasRealVideos() ? (
        <section aria-labelledby="library-heading" className="py-20 md:py-28">
          <div className="gutter mx-auto max-w-[120rem]">
            <Reveal>
              <p className="eyebrow text-accent-ink">Project library</p>
              <h2
                id="library-heading"
                className="font-display t-lg mt-4 max-w-[16ch]"
              >
                See how the work <span className="italic">actually</span> goes.
              </h2>
              <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
                Choose a category, then a project type. Each step is the sequence
                our crews follow on that kind of work.
              </p>
            </Reveal>
            <Suspense
              fallback={
                <p className="mt-12 text-muted-foreground" aria-live="polite">
                  Loading project library…
                </p>
              }
            >
              <VideoPortal
                basePath="/resources/homeowners"
                audience="homeowner"
              />
            </Suspense>
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="process-heading"
        className="border-t border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-muted-foreground">How we work</p>
            <h2
              id="process-heading"
              className="font-display t-lg mt-4 max-w-[14ch]"
            >
              Four steps. Then the walkthrough.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {howWeWork.map((step) => (
              <li key={step.index} className="bg-background p-8 md:p-10">
                <p className="eyebrow text-accent-ink">{step.index}</p>
                <h3 className="font-display mt-6 text-3xl">{step.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Ready for an estimate?"
        body="Tell us which project you have in mind, or describe the room as it is. We will take it from there."
      />
    </>
  );
}
