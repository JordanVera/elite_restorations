import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { areaPages, type AreaPage } from '@/lib/area-pages';
import { absoluteUrl } from '@/lib/seo';
import { site } from '@/lib/site';

export function AreaPageView({
  page,
  locale = 'en',
  others,
}: {
  page: AreaPage;
  locale?: 'en' | 'es';
  others?: readonly AreaPage[];
}) {
  const es = locale === 'es';
  const nearby = (others ?? areaPages).filter((item) => item.slug !== page.slug);
  const copy = es
    ? {
        eyebrow: 'Cerca de la oficina',
        services: 'Servicios',
        areas: 'Zonas',
        working: `El trabajo en ${page.name}`,
        office: 'La oficina',
        servicesEyebrow: 'Servicios',
        servicesTitle: `Trabajo que agendamos en ${page.name}.`,
        servicesBody: `Cada enlace abre la página de ese servicio en ${page.name}. El alcance sale de la visita, no del nombre del lugar.`,
        inName: `En ${page.name}`,
        questions: 'Preguntas',
        about: `Sobre ${page.name}.`,
        also: 'También junto a la oficina',
        company: 'La empresa de restauración en Houston',
        companyBody: 'lista cada servicio y las páginas de ciudad fuera de este distrito.',
        companyHref: '/es/restoration-company-houston',
        ctaTitle: `¿Planea un trabajo en ${page.name}?`,
        ctaBody: `Llame al ${site.phone.display} para pedir un estimado. Trabajamos desde nuestra oficina en el oeste de Houston (77082).`,
        servicesPath: '/es',
        areasPath: '/es',
        home: { name: 'Inicio', path: '/es' } as const,
      }
    : {
        eyebrow: 'Near the office',
        services: 'Services',
        areas: 'Areas we serve',
        working: `Working in ${page.name}`,
        office: 'The office',
        servicesEyebrow: 'Services',
        servicesTitle: `Work we schedule in ${page.name}.`,
        servicesBody: `Each link opens the page for that service in ${page.name}. The scope still comes from a visit, not from the neighborhood name.`,
        inName: `In ${page.name}`,
        questions: 'Questions',
        about: `About ${page.name}.`,
        also: 'Also beside the office',
        company: 'Restoration company in Houston',
        companyBody: 'lists every service and the city pages outside this district.',
        companyHref: '/restoration-company-houston',
        ctaTitle: `Planning work in ${page.name}?`,
        ctaBody: `Call ${site.phone.display} to schedule an estimate. We work from our office in west Houston (77082).`,
        servicesPath: '/services',
        areasPath: '/services#areas',
        home: undefined,
      };

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={[`${page.name},`, 'TX']}
        lede={page.lede}
        homeCrumb={copy.home}
        crumbs={[
          { name: copy.services, path: copy.servicesPath },
          { name: copy.areas, path: copy.areasPath },
          { name: page.name, path: page.path },
        ]}
      />

      <section aria-labelledby="area-about-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-accent-ink">77082</p>
              <h2 id="area-about-heading" className="sr-only">
                {copy.working}
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
            <p className="eyebrow text-accent-ink">{copy.office}</p>
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
            <p className="eyebrow text-accent-ink">{copy.servicesEyebrow}</p>
            <h2 id="area-services-heading" className="font-display t-lg mt-4 max-w-[18ch]">
              {copy.servicesTitle}
            </h2>
            <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
              {copy.servicesBody}
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
                      {copy.inName}
                    </span>
                  </span>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-accent-ink" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {page.also.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {page.faqs.length > 0 && (
        <section aria-labelledby="area-faq-heading" className="border-t border-border py-20 md:py-28">
          <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-accent-ink">{copy.questions}</p>
              <h2 id="area-faq-heading" className="font-display t-lg mt-4">
                {copy.about}
              </h2>
            </Reveal>
            <div className="lg:col-span-8">
              <Faq items={[...page.faqs]} />
            </div>
          </div>
        </section>
      )}

      {nearby.length > 0 && (
        <section aria-labelledby="nearby-office-heading" className="border-t border-border py-16 md:py-20">
          <div className="gutter mx-auto max-w-[120rem]">
            <h2 id="nearby-office-heading" className="eyebrow text-muted-foreground">
              {copy.also}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {nearby.map((item) => (
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
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              <Link
                href={copy.companyHref}
                className="underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
              >
                {copy.company}
              </Link>{' '}
              {copy.companyBody}
            </p>
          </div>
        </section>
      )}

      <CtaBand
        title={copy.ctaTitle}
        body={copy.ctaBody}
        href={es ? '/es/contact' : undefined}
        buttonLabel={es ? 'Pedir un estimado' : undefined}
        textLabel={es ? 'Envíanos un texto' : undefined}
        sectionLabel={es ? 'Pedir un estimado' : undefined}
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
          mainEntity: { '@id': `${site.url}/#business` },
        }}
      />
    </>
  );
}
