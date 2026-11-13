import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { areaPages, type AreaPage } from '@/lib/area-pages';
import { absoluteUrl } from '@/lib/seo';
import { site } from '@/lib/site';

export function AreaPageView({ page }: { page: AreaPage }) {
  const others = areaPages.filter((item) => item.slug !== page.slug);

  return (
    <>
      <PageHero
        eyebrow="Near the office"
        title={[page.name, 'TX']}
        lede={page.lede}
        crumbs={[
          { name: 'Services', path: '/services' },
          { name: 'Areas we serve', path: '/services#areas' },
          { name: page.name, path: page.path },
        ]}
      />

      <section aria-labelledby="area-about-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-accent-ink">77082</p>
              <h2 id="area-about-heading" className="sr-only">
                Working in {page.name}
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
            <p className="eyebrow text-accent-ink">The office</p>
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
            </address>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="area-services-heading"
        className="border-t border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">Services</p>
            <h2 id="area-services-heading" className="font-display t-lg mt-4 max-w-[18ch]">
              Work we schedule in {page.name}.
            </h2>
            <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
              Each link opens the page for that service in {page.name}. The
              scope still comes from a visit, not from the neighborhood name.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {page.services.map((service) => (
              <li key={service.cityHref} className="bg-background">
                <Link
                  href={service.cityHref}
                  className="group flex h-full items-start justify-between gap-4 p-6 transition-colors hover:bg-surface"
                >
                  <span>
                    <span className="font-display text-2xl leading-tight transition-colors group-hover:text-accent-ink">
                      {service.label}
                    </span>
                    <span className="mt-2 block text-sm text-muted-foreground">
                      In {page.name}
                    </span>
                  </span>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-accent-ink" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {others.length > 0 && (
        <section aria-labelledby="nearby-office-heading" className="border-t border-border py-16 md:py-20">
          <div className="gutter mx-auto max-w-[120rem]">
            <h2 id="nearby-office-heading" className="eyebrow text-muted-foreground">
              Also beside the office
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
          </div>
        </section>
      )}

      <CtaBand
        title={`Planning work in ${page.name}?`}
        body={`Call ${site.phone.display}. We schedule from ${site.address.streetAddress}, Houston, TX ${site.address.postalCode}.`}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${page.name}, Texas`,
          description: page.description,
          url: absoluteUrl(page.path),
          about: {
            '@type': 'Place',
            name: `${page.name}, Texas`,
          },
          mainEntity: {
            '@type': 'HomeAndConstructionBusiness',
            '@id': `${site.url}/#business`,
            name: site.name,
            telephone: site.phone.e164,
            address: {
              '@type': 'PostalAddress',
              streetAddress: site.address.streetAddress,
              addressLocality: site.address.addressLocality,
              addressRegion: site.address.addressRegion,
              postalCode: site.address.postalCode,
              addressCountry: site.address.addressCountry,
            },
            areaServed: {
              '@type': 'Place',
              name: `${page.name}, Texas`,
            },
          },
        }}
      />
    </>
  );
}
