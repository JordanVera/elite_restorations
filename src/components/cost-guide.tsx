import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { Faq } from '@/components/faq';
import { Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import {
  estimateHref,
  formatPublishedRange,
  rangesArePublishable,
  type CostGuide,
} from '@/lib/cost-guides';
import { servicePath } from '@/lib/services';
import { site } from '@/lib/site';

export function CostGuideView({ guide }: { guide: CostGuide }) {
  const publishRanges = rangesArePublishable(guide.ranges);
  const serviceHref = servicePath(guide.serviceSlug);
  const contactHref = estimateHref(guide.serviceSlug);

  return (
    <>
      <PageHero
        eyebrow="Cost guide"
        title={guide.lines}
        lede={guide.lede}
        crumbs={[
          { name: 'Services', path: '/services' },
          { name: guide.serviceLabel, path: serviceHref },
          { name: 'Cost', path: guide.path },
        ]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href={serviceHref}
            className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
          >
            {guide.serviceLabel}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <Link
            href={contactHref}
            className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
          >
            Request an estimate
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </PageHero>

      <section aria-labelledby="cost-factors-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">What changes the price</p>
            <h2 id="cost-factors-heading" className="font-display t-lg mt-4 max-w-[16ch]">
              The factors, not a flat rate.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-2">
            {guide.factors.map((factor, index) => (
              <li key={factor.title} className="border-t border-border pt-6">
                <p className="eyebrow text-accent-ink">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display mt-3 text-3xl">{factor.title}</h3>
                <p className="mt-3 max-w-[48ch] leading-relaxed text-muted-foreground">
                  {factor.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="cost-ranges-heading"
        className="border-t border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">Ranges</p>
            <h2 id="cost-ranges-heading" className="font-display t-lg mt-4">
              {publishRanges ? 'Typical planning ranges.' : 'Call for a free estimate.'}
            </h2>
          </Reveal>
          {publishRanges ? (
            <ul className="mt-12 max-w-3xl border-t border-border">
              {guide.ranges.map((range) => (
                <li
                  key={range.label}
                  className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border py-5"
                >
                  <span className="font-display text-2xl">{range.label}</span>
                  <span className="text-muted-foreground">{formatPublishedRange(range)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
              <a
                href={site.phone.href}
                className="inline-flex items-center gap-3 font-display text-4xl transition-colors hover:text-accent-ink"
              >
                <Phone className="size-6 text-accent-ink" aria-hidden />
                {site.phone.display}
              </a>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
              >
                Request an estimate
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          )}
          <p className="measure mt-8 text-sm leading-relaxed text-muted-foreground">
            {publishRanges
              ? 'These are typical planning ranges, not quotes. The final price comes from an on-site estimate.'
              : 'We do not publish a citywide price list. The number comes from the house, after a visit.'}
          </p>
        </div>
      </section>

      {guide.sections.length > 0 && (
        <section aria-labelledby="cost-read-heading" className="border-t border-border py-20 md:py-28">
          <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-accent-ink">In Houston</p>
              <h2 id="cost-read-heading" className="font-display t-lg mt-4">
                How the number gets built.
              </h2>
            </Reveal>
            <div className="space-y-12 lg:col-span-8">
              {guide.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="font-display text-3xl leading-snug">{section.heading}</h3>
                  <div className="mt-4 space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="measure text-lg leading-relaxed text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="cost-faq-heading" className="border-t border-border py-20 md:py-28">
        <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-accent-ink">Questions</p>
            <h2 id="cost-faq-heading" className="font-display t-lg mt-4">
              Good to know.
            </h2>
          </Reveal>
          <div className="lg:col-span-8">
            <Faq items={[...guide.faqs]} />
          </div>
        </div>
      </section>

      {guide.related.length > 0 && (
        <section
          aria-labelledby="cost-related-heading"
          className="border-t border-border py-16 md:py-20"
        >
          <div className="gutter mx-auto max-w-[120rem]">
            <h2 id="cost-related-heading" className="eyebrow text-muted-foreground">
              Related guides
            </h2>
            <ul className="mt-6 max-w-2xl space-y-3">
              {guide.related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
                  >
                    {link.label}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title={`Planning ${guide.serviceLabel.toLowerCase()}?`}
        body={`Call ${site.phone.display} for a free estimate. We price the scope after we see the house.`}
        service={guide.serviceSlug}
      />
    </>
  );
}
