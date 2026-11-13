import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { PartnerForm } from '@/components/resources/partner-form';
import { VideoPortal } from '@/components/resources/video-portal';
import { Button } from '@/components/ui/button';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Realtor Partners in Houston, TX',
  description:
    'How Houston realtors and investors can refer remodeling work to Elite Restorations, and the steps a typical project follows.',
  path: '/resources/realtors',
});

const benefits = [
  {
    index: '01',
    title: 'Consistent quality',
    body: 'The same crew standards on a listing refresh and a full remodel, so the work you refer looks like the work you saw.',
  },
  {
    index: '02',
    title: 'Fast turnaround',
    body: 'Scopes are written to the calendar a sale or a flip actually has, not an open-ended start date.',
  },
  {
    index: '03',
    title: 'Reliable communication',
    body: 'One point of contact for you and your client, with updates that do not require a chase.',
  },
  {
    index: '04',
    title: 'A direct line',
    body: 'Partners reach the office directly, instead of starting over as a one-time web lead.',
  },
  {
    index: '05',
    title: 'A real closing date',
    body: 'Tell us the date. We schedule around it when the crew can.',
  },
  {
    index: '06',
    title: 'One person on the job',
    body: 'One person owns the timeline, the trades, and the walkthrough.',
  },
];

export default function RealtorsResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="For realtors"
        title={['A partner for', 'the work you refer.']}
        lede="The same project steps your clients can read, and a direct way to send a flip or an introduction."
        crumbs={[
          { name: 'Resources', path: '/resources' },
          { name: 'Realtors', path: '/resources/realtors' },
        ]}
      >
        <Reveal delay={0.45} className="mt-10">
          <Button asChild size="xl" variant="accent">
            <Link href="#partner-form">
              Become a partner
              <ArrowUpRight className="arrow" aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </PageHero>

      <section aria-labelledby="library-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">Project library</p>
            <h2 id="library-heading" className="font-display t-lg mt-4 max-w-[18ch]">
              Show a client the sequence.
            </h2>
            <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
              The same step-by-step sequences homeowners see, so you can walk a client through
              the work.
            </p>
          </Reveal>
          <Suspense
            fallback={
              <p className="mt-12 text-muted-foreground" aria-live="polite">
                Loading project library…
              </p>
            }
          >
            <VideoPortal basePath="/resources/realtors" audience="realtor" />
          </Suspense>
        </div>
      </section>

      <section
        aria-labelledby="benefits-heading"
        className="border-t border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Partner benefits</p>
            <h2 id="benefits-heading" className="font-display t-lg mt-4 max-w-[16ch]">
              What you get for sending the work.
            </h2>
          </Reveal>
          <ul className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <li key={benefit.index} className="bg-background p-8 md:p-10">
                <p className="eyebrow text-accent-ink">{benefit.index}</p>
                <h3 className="font-display mt-6 text-3xl">{benefit.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{benefit.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="partner-form"
        aria-labelledby="partner-heading"
        className="scroll-mt-28 border-t border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent-ink">Become a partner</p>
            <h2 id="partner-heading" className="font-display t-lg mt-4">
              Refer a project.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Tell us who you are and the kind of work you send. We will follow up with how a
              partnership would actually run. We do not publish a fee schedule.
            </p>
          </Reveal>
          <div className="lg:col-span-7">
            <PartnerForm />
          </div>
        </div>
      </section>

    </>
  );
}
