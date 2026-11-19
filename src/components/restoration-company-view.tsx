import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { ImageReveal, Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { bleedPhotoSizes, Photo } from '@/components/photo';
import { esGroupNames, serviceHref } from '@/lib/i18n';
import { img } from '@/lib/images';
import { cityPageLinks, serviceAreaPageLinks } from '@/lib/restoration-company-links';
import type { RestorationCompanyCopy } from '@/lib/restoration-company-types';
import { absoluteUrl, localBusinessSchema } from '@/lib/seo';
import { serviceGroups } from '@/lib/service-nav';
import { servicePath, services } from '@/lib/services';
import { site } from '@/lib/site';

const linkClass =
  'inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink';

const hourDayEs: Record<string, string> = {
  'Monday through Saturday': 'Lunes a sábado',
  Sunday: 'Domingo',
};

const hourTimeEs: Record<string, string> = {
  Closed: 'Cerrado',
  '8:00 AM to 6:00 PM': '8:00 a. m. a 6:00 p. m.',
};

export function RestorationCompanyView({ copy }: { copy: RestorationCompanyCopy }) {
  const es = copy.locale === 'es';
  const photo = img('/images/projects/restoration/air-movers-drying.jpg', copy.imageAlt);
  const cities = cityPageLinks(copy.locale);
  const areas = serviceAreaPageLinks(copy.locale);
  const offered = services.map((service) => ({
    slug: service.slug,
    group: service.group,
    href: es ? serviceHref(service.slug, 'es') : servicePath(service.slug),
    label: copy.serviceLabels?.[service.slug] ?? service.name,
    blurb: copy.serviceBlurbs[service.slug],
  }));
  const business = localBusinessSchema({
    description: copy.description,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: copy.catalogName,
      itemListElement: offered.map((item, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: item.label,
          url: absoluteUrl(item.href),
        },
      })),
    },
  });

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        lede={copy.lede}
        crumbs={[{ name: copy.crumb, path: copy.path }]}
        homeCrumb={es ? { name: 'Inicio', path: '/es' } : undefined}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={site.phone.href}
            className="inline-flex items-center gap-3 border border-accent-ink px-4 py-3 text-sm hover:bg-accent hover:text-white"
          >
            <Phone className="size-4" aria-hidden />
            {copy.callLabel}
          </a>
          <a
            href={site.phone.sms}
            className="text-sm underline decoration-foreground/30 underline-offset-[0.45em] hover:decoration-accent-ink"
          >
            {copy.textLabel}
          </a>
        </div>
      </PageHero>

      <div className="gutter mx-auto max-w-[120rem] pt-6 md:pt-8">
        <ImageReveal immediate className="relative aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[21/9]">
          <Photo image={photo} sizes={bleedPhotoSizes} priority />
        </ImageReveal>
      </div>

      {copy.sections.map((section) => (
        <section key={section.id} aria-labelledby={`${section.id}-heading`} className="border-b border-border py-16 md:py-24">
          <div className="gutter mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-accent-ink">{section.eyebrow}</p>
              <h2 id={`${section.id}-heading`} className="font-display t-lg mt-4">
                {section.heading}
              </h2>
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.id === 'company' ? (
                <address className="mt-8 text-base not-italic leading-relaxed">
                  <p>{site.name}</p>
                  <p className="text-muted-foreground">{site.address.streetAddress}</p>
                  <p className="text-muted-foreground">
                    {site.address.addressLocality}, {site.address.addressRegion} {site.address.postalCode}
                  </p>
                  <a href={site.phone.href} className="mt-3 inline-block underline decoration-foreground/30 underline-offset-[0.45em] hover:decoration-accent-ink">
                    {site.phone.display}
                  </a>
                  <p className="mt-3">
                    <a href={site.url} className="underline decoration-foreground/30 underline-offset-[0.45em] hover:decoration-accent-ink">
                      {site.url.replace('https://', '')}
                    </a>
                  </p>
                  <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                    {site.hours.map((hour) => (
                      <li key={hour.days}>
                        {es ? (hourDayEs[hour.days] ?? hour.days) : hour.days}
                        {': '}
                        {es ? (hourTimeEs[hour.time] ?? hour.time) : hour.time}
                      </li>
                    ))}
                  </ul>
                </address>
              ) : null}
              {section.links && section.links.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                        <ArrowUpRight className="size-4" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="hub-services-heading" className="border-b border-border py-16 md:py-24">
        <div className="gutter mx-auto max-w-[120rem]">
          <p className="eyebrow text-accent-ink">{copy.servicesEyebrow}</p>
          <h2 id="hub-services-heading" className="font-display t-lg mt-4 max-w-[18ch]">
            {copy.servicesHeading}
          </h2>
          <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">{copy.servicesIntro}</p>
          <div className="mt-12 space-y-14">
            {serviceGroups.map((group) => (
              <div key={group}>
                <h3 className="font-display text-3xl">
                  {es ? (esGroupNames[group] ?? group) : group}
                </h3>
                <p className="measure mt-3 text-muted-foreground">{copy.groupIntros[group]}</p>
                <ul className="mt-6 border-t border-border">
                  {offered
                    .filter((service) => service.group === group)
                    .map((service) => (
                      <li key={service.slug} className="border-b border-border">
                        <Link
                          href={service.href}
                          className="group grid gap-2 py-6 md:grid-cols-[minmax(0,22rem)_1fr_auto] md:items-baseline md:gap-10"
                        >
                          <span className="font-display text-2xl leading-tight transition-colors group-hover:text-accent-ink md:text-3xl">
                            {service.label}
                          </span>
                          <span className="leading-relaxed text-muted-foreground">{service.blurb}</span>
                          <ArrowUpRight className="size-5 text-accent-ink" aria-hidden />
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="hub-process-heading" className="border-b border-border py-16 md:py-24">
        <div className="gutter mx-auto max-w-[120rem]">
          <p className="eyebrow text-accent-ink">{copy.processEyebrow}</p>
          <h2 id="hub-process-heading" className="font-display t-lg mt-4 max-w-[16ch]">
            {copy.processHeading}
          </h2>
          <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">{copy.processIntro}</p>
          <ol className="mt-12 grid gap-px bg-border md:grid-cols-2">
            {copy.steps.map((step) => (
              <li key={step.index} className="bg-background p-6 md:p-8">
                <p className="eyebrow text-accent-ink">{step.index}</p>
                <h3 className="font-display mt-3 text-3xl leading-tight">{step.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="areas" aria-labelledby="hub-areas-heading" className="border-b border-border py-16 md:py-24">
        <div className="gutter mx-auto max-w-[120rem]">
          <p className="eyebrow text-accent-ink">{copy.areasEyebrow}</p>
          <h2 id="hub-areas-heading" className="font-display t-lg mt-4 max-w-[18ch]">
            {copy.areasHeading}
          </h2>
          <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">{copy.areasIntro}</p>
          <h3 className="eyebrow mt-12 text-muted-foreground">{copy.citiesLabel}</h3>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {cities.map((city) => (
              <li key={city.href}>
                <Link href={city.href} className="font-display text-3xl transition-colors hover:text-accent-ink">
                  {city.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="eyebrow mt-12 text-muted-foreground">{copy.areasLabel}</h3>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {areas.map((area) => (
              <li key={area.href}>
                <Link
                  href={area.href}
                  className="text-sm underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
                >
                  {area.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="hub-faq-heading" className="border-b border-border py-16 md:py-24">
        <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-accent-ink">{copy.faqEyebrow}</p>
            <h2 id="hub-faq-heading" className="font-display t-lg mt-4">
              {copy.faqHeading}
            </h2>
          </Reveal>
          <div className="lg:col-span-8">
            <Faq items={[...copy.faqs]} inLanguage={es ? 'es' : 'en'} />
          </div>
        </div>
      </section>

      <section className="border-b border-border py-12">
        <div className="gutter mx-auto max-w-[120rem]">
          <h2 className="eyebrow text-muted-foreground">{copy.relatedHeading}</h2>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {copy.related.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={copy.ctaTitle}
        body={copy.ctaBody}
        href={copy.ctaHref}
        buttonLabel={copy.ctaButton}
        textLabel={copy.textLabel}
      />

      <JsonLd
        data={{
          ...business,
          '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'RoofingContractor', 'GeneralContractor'],
        }}
      />
    </>
  );
}
