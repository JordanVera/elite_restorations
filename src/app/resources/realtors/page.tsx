import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { PartnerForm } from '@/components/resources/partner-form';
import { ReferralTierTable } from '@/components/resources/referral-tier-table';
import { VideoPortal } from '@/components/resources/video-portal';
import { Button } from '@/components/ui/button';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Realtor resources',
  description:
    'Partner benefits, referral tiers, and project walkthroughs for realtors and investors who refer remodeling work to Elite Restorations.',
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
    title: 'Preferred partner pricing',
    body: 'Partners are priced as repeat work, not as a one-off homeowner who found us once.',
  },
  {
    index: '05',
    title: 'Priority scheduling',
    body: 'Higher referral tiers move to the front of the schedule when a closing date is real.',
  },
  {
    index: '06',
    title: 'A project manager',
    body: 'From the dedicated-manager tier up, one person owns the timeline, the trades, and the walkthrough.',
  },
];

const quotes = [
  {
    quote: 'They treated the listing date like it was their own.',
    name: 'Placeholder partner',
    role: 'Realtor, Houston',
  },
  {
    quote: 'The estimate matched the walkthrough, and the walkthrough matched the invoice.',
    name: 'Placeholder partner',
    role: 'Investor, Greater Houston',
  },
  {
    quote: 'My clients heard from someone before I had to ask.',
    name: 'Placeholder partner',
    role: 'Broker, Memorial',
  },
];

export default function RealtorsResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="For realtors"
        title={['A partner for', 'the work you refer.']}
        lede="The same project library your clients can watch, plus referral tiers and a direct way to send a flip or an introduction."
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
              Use the same films homeowners see. Every clip is a placeholder until real job
              footage replaces it.
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

      <section aria-labelledby="tiers-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto max-w-[120rem]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-accent-ink">Referral tiers</p>
              <h2 id="tiers-heading" className="font-display t-lg mt-4">
                Fees that follow the volume.
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Annual referred revenue sets the fee and the scheduling priority. The figures
                below are placeholders and are easy to replace.
              </p>
            </Reveal>
            <div className="lg:col-span-8">
              <ReferralTierTable />
            </div>
          </div>
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
              Tell us who you are and the kind of work you send. We will follow up with how the
              partnership actually runs.
            </p>
          </Reveal>
          <div className="lg:col-span-7">
            <PartnerForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="trust-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Why partners choose us</p>
            <h2 id="trust-heading" className="font-display t-lg mt-4 max-w-[16ch]">
              A crew that answers.
            </h2>
            <p className="measure mt-6 text-muted-foreground">
              Placeholder notes until partner quotes are approved for the site.
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-px bg-border md:grid-cols-3">
            {quotes.map((item) => (
              <li key={item.quote} className="bg-background p-8 md:p-10">
                <p className="eyebrow text-accent-ink">Placeholder quote</p>
                <blockquote className="font-display mt-6 text-2xl leading-snug">
                  “{item.quote}”
                </blockquote>
                <footer className="mt-8 text-sm text-muted-foreground">
                  <p>{item.name}</p>
                  <p>{item.role}</p>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
