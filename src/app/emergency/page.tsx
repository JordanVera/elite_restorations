import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';

import { LeadForm } from '@/components/lead-form';
import { Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { Faq } from '@/components/faq';
import { InsuranceClaimHelp } from '@/components/insurance-claim-help';
import { claimHelpFaqs } from '@/lib/claim-help';
import { PropertyScopeNote } from '@/components/property-scope-note';
import { languageAlternates, pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Emergency Roof & Water Help in Houston',
  description:
    'A roof leak, missing shingles, or water on the floor in Houston? Call (713) 909-0034. We can tarp the roof and help with the water damage.',
  path: '/emergency',
  image: '/images/services/roofing-emergency-tarp-repair.jpg',
  languages: languageAlternates('/emergency', '/es/emergency'),
});

const steps = [
  {
    title: 'Stop the water if it is safe',
    body: 'For a plumbing leak, shut off the main water valve. Stay out of standing water near outlets, appliances or the breaker panel, and stay off a wet or damaged roof. If you are unsure, call us.',
  },
  {
    title: 'Photograph before you clean up',
    body: 'A wide shot of each room, a close-up of the damage, and anything that is wet. Your insurer will ask for the pictures, and they show us what we are walking into.',
  },
  {
    title: 'Send a short note',
    body: "Tell us what happened and where. Photos are optional, and they help. We'll call you back as soon as we can and plan the tarp, the water removal, or the drying from there.",
  },
];

export default function EmergencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Water & storm damage"
        title={['Water coming in?', 'Start here.']}
        lede="The roof is open to the weather, a pipe burst, or there is water on the floor. Call first if you can. If you cannot, send the note below. We'll call you back as soon as we can."
        crumbs={[{ name: 'Emergency', path: '/emergency' }]}
      >
        <Reveal delay={0.5} className="mt-10">
          <a
            href={site.phone.href}
            className="group inline-flex items-center gap-4 bg-accent px-6 py-5 text-white transition-colors hover:bg-foreground hover:text-background"
          >
            <Phone className="size-5" aria-hidden />
            <span className="font-display text-3xl leading-none sm:text-4xl">
              {site.phone.display}
            </span>
          </a>
          <a
            href={site.phone.sms}
            className="mt-4 inline-flex text-sm underline decoration-foreground/30 underline-offset-[0.45em] hover:decoration-accent-ink"
          >
            Text us
          </a>
        </Reveal>
      </PageHero>
      <PropertyScopeNote />
      <InsuranceClaimHelp />
      <section className="border-b border-border py-16">
        <div className="gutter mx-auto max-w-[120rem]">
          <h2 className="font-display text-4xl">Claim questions</h2>
          <div className="mt-8">
            <Faq items={claimHelpFaqs("en")} />
          </div>
        </div>
      </section>

      <section
        aria-label="What to do and request form"
        className="py-16 md:py-24"
      >
        <div className="gutter mx-auto grid max-w-[120rem] gap-16 lg:grid-cols-12 lg:gap-24">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent-ink">Before we arrive</p>
            <ol className="mt-8 border-t border-border">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-6 border-b border-border py-7"
                >
                  <span className="eyebrow mt-2 w-6 shrink-0 text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-display text-3xl leading-tight">
                      {step.title}
                    </h2>
                    <p className="mt-3 max-w-[44ch] leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 border border-border p-6">
              <p className="font-display text-2xl">
                Text this list to whoever is at the house.
              </p>
              <p className="mt-2 max-w-[42ch] leading-relaxed text-muted-foreground">
                A short first-night list for a leak that is still going, or a
                roof that is open. It stays on the phone, and it becomes the
                packet you can hand to your adjuster.
              </p>
              <Link
                href="/insurance-log#first-night"
                className="mt-4 inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
              >
                Open the first-night list
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/frozen-and-burst-pipes-in-houston"
                className="mt-4 inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
              >
                Frozen or burst pipe: what to do first
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/what-to-do-after-a-roof-leak-in-houston"
                className="mt-4 block underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
              >
                What to do after a roof leak
              </Link>
              <Link
                href="/slab-moisture-after-a-supply-line-break-houston"
                className="mt-4 block underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
              >
                Moisture in the slab after a water line breaks
              </Link>
              <Link
                href="/houston-storm-damage"
                className="mt-4 block underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
              >
                Houston storm damage help
              </Link>
              <Link
                href="/commercial-storm-restoration"
                className="mt-4 block underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
              >
                Commercial and apartment buildings
              </Link>
              <Link
                href="/how-to-build-an-insurance-photo-log"
                className="mt-4 block underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
              >
                How to build an insurance photo log
              </Link>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="eyebrow text-accent-ink">Request help</p>
            <h2 className="font-display t-md mt-4 max-w-[20ch]">
              Tell us what happened.
            </h2>
            <div className="relative mt-10">
              <LeadForm
                idPrefix="emergency"
                defaultService="storm-hail"
                submitLabel="Request a call back"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-label="Planning a remodel instead"
        className="border-t border-border py-14"
      >
        <div className="gutter mx-auto flex max-w-[120rem] flex-wrap items-center justify-between gap-6">
          <p className="max-w-[46ch] text-muted-foreground">
            After the emergency is under control, we rebuild what was damaged.
            We also plan kitchens, baths, and floors.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
          >
            See all services
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
