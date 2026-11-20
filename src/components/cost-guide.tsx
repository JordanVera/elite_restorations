import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { Faq } from '@/components/faq';
import { ProseSections } from '@/components/prose-sections';
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

export function CostGuideView({ guide, locale = 'en' }: { guide: CostGuide; locale?: 'en' | 'es' }) {
  const es = locale === 'es';
  const publishRanges = rangesArePublishable(guide.ranges);
  const serviceHref = es ? `/es/${guide.serviceSlug}` : servicePath(guide.serviceSlug);
  const contactHref = es
    ? `/es/contact?service=${encodeURIComponent(guide.serviceSlug)}`
    : estimateHref(guide.serviceSlug);
  const copy = es
    ? {
        eyebrow: 'Guía de costo',
        services: 'Servicios',
        cost: 'Costo',
        estimate: 'Pedir un estimado',
        factorsEyebrow: 'Qué cambia el precio',
        factorsTitle: 'Los factores, no una tarifa fija.',
        ranges: 'Rangos',
        rangesTitle: publishRanges
          ? 'Rangos típicos para planear.'
          : 'Llame al (713) 909-0034 para pedir un estimado.',
        rangesNote: 'Estos son rangos típicos para planear, no cotizaciones. El precio final sale de un estimado en la casa.',
        unpublished: 'No publicamos una lista de precios para toda la ciudad. El número sale de la casa, después de una visita.',
        questions: 'Preguntas',
        good: 'Conviene saber.',
        related: 'Guías relacionadas',
        ctaTitle: `¿Planea ${guide.serviceLabel.toLowerCase()}?`,
        ctaBody: `Llame al ${site.phone.display} para pedir un estimado. El precio sale después de ver la casa.`,
        home: { name: 'Inicio', path: '/es' },
      }
    : {
        eyebrow: 'Cost guide',
        services: 'Services',
        cost: 'Cost',
        estimate: 'Request an estimate',
        factorsEyebrow: 'What changes the price',
        factorsTitle: 'The factors, not a flat rate.',
        ranges: 'Ranges',
        rangesTitle: publishRanges
          ? 'Typical planning ranges.'
          : 'Call (713) 909-0034 to schedule an estimate.',
        rangesNote: 'These are typical planning ranges, not quotes. The final price comes from an on-site estimate.',
        unpublished: 'We do not publish a citywide price list. The number comes from the house, after a visit.',
        questions: 'Questions',
        good: 'Good to know.',
        related: 'Related guides',
        ctaTitle: `Planning ${guide.serviceLabel.toLowerCase()}?`,
        ctaBody: `Call ${site.phone.display} to schedule an estimate. We price the scope after we see the house.`,
        home: undefined,
      };

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={guide.lines}
        lede={guide.lede}
        homeCrumb={copy.home}
        crumbs={[
          { name: copy.services, path: es ? '/es' : '/services' },
          { name: guide.serviceLabel, path: serviceHref },
          { name: copy.cost, path: guide.path },
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
            {copy.estimate}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </PageHero>

      <section aria-labelledby="cost-factors-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">{copy.factorsEyebrow}</p>
            <h2 id="cost-factors-heading" className="font-display t-lg mt-4 max-w-[16ch]">
              {copy.factorsTitle}
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
            <p className="eyebrow text-accent-ink">{copy.ranges}</p>
            <h2 id="cost-ranges-heading" className="font-display t-lg mt-4">
              {copy.rangesTitle}
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
                  <span className="text-muted-foreground">{formatPublishedRange(range, locale)}</span>
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
                {copy.estimate}
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          )}
          <p className="measure mt-8 text-sm leading-relaxed text-muted-foreground">
            {publishRanges ? copy.rangesNote : copy.unpublished}
          </p>
        </div>
      </section>

      <ProseSections sections={guide.sections} />

      <section aria-labelledby="cost-faq-heading" className="border-t border-border py-20 md:py-28">
        <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-accent-ink">{copy.questions}</p>
            <h2 id="cost-faq-heading" className="font-display t-lg mt-4">
              {copy.good}
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
              {copy.related}
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
        title={copy.ctaTitle}
        body={copy.ctaBody}
        href={es ? contactHref : undefined}
        service={es ? undefined : guide.serviceSlug}
        buttonLabel={es ? 'Pedir un estimado' : undefined}
        textLabel={es ? 'Envíanos un texto' : undefined}
        sectionLabel={es ? 'Pedir un estimado' : undefined}
      />
    </>
  );
}
