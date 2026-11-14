import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import type { NeighborhoodPage } from '@/lib/neighborhood-types';
import { absoluteUrl } from '@/lib/seo';
import { site } from '@/lib/site';

export function NeighborhoodPageView({
  page,
  others,
  locale,
}: {
  page: NeighborhoodPage;
  others: readonly NeighborhoodPage[];
  locale: 'en' | 'es';
}) {
  const es = locale === 'es';
  const serviceName = es
    ? `Restauración y remodelación en ${page.name}`
    : `Restoration and remodeling in ${page.name}`;

  return (
    <>
      <PageHero
        eyebrow={es ? 'Vecindario de Houston' : 'Houston neighborhood'}
        title={[`${page.name},`, 'TX']}
        lede={page.lede}
        crumbs={[
          {
            name: es ? 'Servicios' : 'Services',
            path: es ? '/es' : '/services',
          },
          { name: page.name, path: page.path },
        ]}
        homeCrumb={es ? { name: 'Inicio', path: '/es' } : undefined}
      />

      <section aria-labelledby="neighborhood-about-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-accent-ink">{es ? 'La casa' : 'The houses'}</p>
              <h2 id="neighborhood-about-heading" className="sr-only">
                {es ? `Trabajar en ${page.name}` : `Working in ${page.name}`}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-7">
              {page.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? 'font-display text-3xl leading-snug md:text-4xl'
                      : 'measure text-lg leading-relaxed text-muted-foreground'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="eyebrow text-accent-ink">{es ? 'La oficina' : 'The office'}</p>
            <address className="mt-6 text-lg not-italic leading-relaxed">
              <p>{site.name}</p>
              <p className="text-muted-foreground">{site.address.streetAddress}</p>
              <p className="text-muted-foreground">
                {site.address.addressLocality}, {site.address.addressRegion}{' '}
                {site.address.postalCode}
              </p>
              <a
                href={site.phone.href}
                className="mt-4 inline-block underline decoration-foreground/30 underline-offset-[0.45em] hover:decoration-accent-ink"
              >
                {site.phone.display}
              </a>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {es
                  ? `Empresa familiar en Houston desde ${site.founded}. La visita es en la casa, no en un segundo local.`
                  : `Family-owned in Houston since ${site.founded}. The visit is at the house. There is not a second storefront in ${page.name}.`}
              </p>
            </address>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="neighborhood-services-heading"
        className="border-t border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">{es ? 'Servicios' : 'Services'}</p>
            <h2 id="neighborhood-services-heading" className="font-display t-lg mt-4 max-w-[18ch]">
              {es ? `Trabajos en ${page.name}.` : `Work we schedule in ${page.name}.`}
            </h2>
            <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
              {es
                ? 'Cada enlace abre el servicio. El alcance sale de la visita, no del nombre del vecindario.'
                : 'Each link opens that service. The scope still comes from a visit, not from the neighborhood name.'}
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {page.services.map((service) => (
              <li key={service.href} className="bg-background">
                <Link
                  href={service.href}
                  className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-surface"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-display text-2xl leading-tight transition-colors group-hover:text-accent-ink">
                      {service.label}
                    </span>
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-accent-ink" aria-hidden />
                  </span>
                  {service.note ? (
                    <span className="text-sm leading-relaxed text-muted-foreground">{service.note}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {page.faqs.length > 0 ? (
        <section aria-labelledby="neighborhood-faq-heading" className="border-t border-border py-20 md:py-28">
          <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-accent-ink">{es ? 'Preguntas' : 'Questions'}</p>
              <h2 id="neighborhood-faq-heading" className="font-display t-lg mt-4">
                {es ? `Sobre ${page.name}.` : `About ${page.name}.`}
              </h2>
            </Reveal>
            <div className="lg:col-span-8">
              <Faq items={[...page.faqs]} inLanguage={es ? 'es' : 'en'} />
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="neighborhood-also-heading" className="border-t border-border py-16 md:py-20">
        <div className="gutter mx-auto max-w-[120rem]">
          <h2 id="neighborhood-also-heading" className="eyebrow text-muted-foreground">
            {es ? 'Otras zonas de Houston' : 'Other Houston neighborhoods'}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.path}
                  className="font-display text-3xl transition-colors hover:text-accent-ink"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          {page.also.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {page.also.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <CtaBand
        title={page.ctaTitle}
        body={page.ctaBody}
        href={es ? '/es/contact' : '/contact'}
        buttonLabel={es ? 'Pedir un estimado' : 'Request a free estimate'}
        textLabel={es ? 'Envíanos un texto' : 'Text us'}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              name: `${page.name}, Texas`,
              description: page.description,
              url: absoluteUrl(page.path),
              inLanguage: es ? 'es-US' : 'en-US',
              about: { '@id': `${absoluteUrl(page.path)}#service` },
            },
            {
              '@type': 'Service',
              '@id': `${absoluteUrl(page.path)}#service`,
              name: serviceName,
              serviceType: es ? 'Restauración y remodelación' : 'Home restoration and remodeling',
              description: page.description,
              url: absoluteUrl(page.path),
              areaServed: {
                '@type': 'Place',
                name: `${page.name}, Texas`,
              },
              provider: {
                '@type': 'LocalBusiness',
                '@id': `${site.url}/#business`,
                name: site.name,
                telephone: site.phone.e164,
                url: site.url,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: site.address.streetAddress,
                  addressLocality: site.address.addressLocality,
                  addressRegion: site.address.addressRegion,
                  postalCode: site.address.postalCode,
                  addressCountry: site.address.addressCountry,
                },
              },
            },
          ],
        }}
      />
    </>
  );
}
