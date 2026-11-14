import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check, Phone } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { ImageReveal, Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { Photo } from '@/components/photo';
import { imagesForService, type ServiceGalleryItem } from '@/lib/projects';
import { cityHeroPools, pickFromPool } from '@/lib/topic-photos';
import {
  getArea,
  relatedCityLandings,
  type LocalLanding,
} from '@/lib/local-landings';
import { absoluteUrl } from '@/lib/seo';
import { getService, servicePath } from '@/lib/services';
import { emergencyHref, site } from '@/lib/site';

const galleryFallback: Record<string, readonly string[]> = {
  roofing: ['roof-replacement'],
  'insurance-claims': ['water-damage-restoration', 'roofing-emergency-tarp-repair'],
};

function landingPhotos(serviceSlug: string, heroSrc: string, shift: number) {
  const sources = [serviceSlug, ...(galleryFallback[serviceSlug] ?? [])];
  const seen = new Set<string>();
  const items: ServiceGalleryItem[] = [];
  for (const source of sources) {
    for (const item of imagesForService(source)) {
      if (item.image.placeholder || item.image.src === heroSrc || seen.has(item.image.src)) {
        continue;
      }
      seen.add(item.image.src);
      items.push(item);
    }
  }
  if (items.length === 0) return [];
  const start = shift % items.length;
  return [...items.slice(start), ...items.slice(0, start)].slice(0, 4);
}

export function LocalLandingView({ landing }: { landing: LocalLanding }) {
  const service = getService(landing.serviceSlug);
  const area = getArea(landing.areaSlug);
  if (!service || !area) notFound();

  const path = landing.path;
  const serviceHref = servicePath(service.slug);
  const galleryPool =
    cityHeroPools[service.slug] ??
    imagesForService(service.slug).map((item) => item.image);
  const hero =
    pickFromPool(
      galleryPool.length > 0
        ? galleryPool
        : service.image
          ? [service.image]
          : [],
      landing.photoShift,
      service.image,
    ) ?? service.image;
  const photos = landingPhotos(
    service.slug,
    hero?.src ?? '',
    landing.photoShift,
  );
  const nearby = landing.nearby;
  const related = relatedCityLandings(landing);
  const estimateHref = service.emergency
    ? emergencyHref
    : `/contact?service=${encodeURIComponent(service.slug)}`;

  return (
    <>
      <PageHero
        eyebrow={service.group}
        title={[service.name, `in ${area.name}, TX`]}
        lede={landing.lede}
        crumbs={[
          { name: 'Services', path: '/services' },
          { name: service.name, path: serviceHref },
          { name: area.name, path },
        ]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href={serviceHref}
            className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
          >
            Full {service.name.toLowerCase()} page
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <Link
            href={estimateHref}
            className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
          >
            {service.emergency ? 'Request help' : 'Request an estimate'}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
        {service.emergency && (
          <Reveal delay={0.2} className="mt-8">
            <a
              href={site.phone.href}
              className="group inline-flex items-center gap-4 border border-accent-ink px-5 py-4 transition-colors hover:bg-accent hover:text-white"
            >
              <Phone
                className="size-4 text-accent-ink group-hover:text-white"
                aria-hidden
              />
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.2em]">
                Active leak or storm damage? Call {site.phone.display}
              </span>
            </a>
          </Reveal>
        )}
      </PageHero>

      {hero && (
        <div className="gutter mx-auto max-w-[120rem] pt-8 md:pt-12">
          <ImageReveal
            immediate
            className="relative aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[21/9]"
          >
            <Photo
              image={hero}
              sizes="(min-width: 1920px) 1800px, 96vw"
              priority
            />
          </ImageReveal>
        </div>
      )}

      <section aria-labelledby="local-scope-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-accent-ink">{area.name}</p>
              <h2 id="local-scope-heading" className="sr-only">
                {service.name} in {area.name}, TX
              </h2>
            </Reveal>
            <div className="mt-6 space-y-7">
              {landing.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.06}>
                  <p
                    className={
                      index === 0
                        ? 'font-display text-3xl leading-snug md:text-4xl'
                        : 'measure text-lg leading-relaxed text-muted-foreground'
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="lg:col-span-5" delay={0.12}>
            <p className="eyebrow text-accent-ink">What is included</p>
            <ul className="mt-6 border-t border-border">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-b border-border py-4"
                >
                  <Check className="mt-1 size-4 shrink-0 text-accent-ink" aria-hidden />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            {service.links && service.links.length > 0 && (
              <ul className="mt-8 space-y-3">
                {service.links.map((link) => (
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
            )}
            {landing.costGuide &&
              !(service.links ?? []).some((link) => link.href === landing.costGuide?.href) && (
                <ul className="mt-8 space-y-3">
                  <li>
                    <Link
                      href={landing.costGuide.href}
                      className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
                    >
                      {landing.costGuide.label}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                  </li>
                </ul>
              )}
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="local-notes-heading"
        className="border-y border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">On the visit</p>
            <h2 id="local-notes-heading" className="font-display t-lg mt-4 max-w-[18ch]">
              What we look at in {area.name}.
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {landing.notes.map((note, index) => (
              <li key={note.title} className="border-t border-border pt-5">
                <p className="eyebrow text-accent-ink">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="font-display mt-3 text-2xl leading-snug">{note.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {photos.length > 0 && (
        <section aria-labelledby="local-photos-heading" className="py-20 md:py-28">
          <div className="gutter mx-auto max-w-[120rem]">
            <Reveal>
              <p className="eyebrow text-accent-ink">Project photographs</p>
              <h2 id="local-photos-heading" className="font-display t-lg mt-4">
                The kind of work.
              </h2>
              <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
                Photographs from our projects. They show the kind of{' '}
                {service.name.toLowerCase()} we do. They are not labeled as a
                house in {area.name}.
              </p>
            </Reveal>
            <ul className="mt-12 grid gap-8 sm:grid-cols-2">
              {photos.map((item) => (
                <li key={item.image.src}>
                  <Link href={`/projects/${item.project.slug}`} className="group block">
                    <ImageReveal className="relative aspect-[4/3]">
                      <Photo
                        image={item.image}
                        sizes="(min-width: 640px) 46vw, 92vw"
                        className="transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.02]"
                      />
                    </ImageReveal>
                    <p className="font-display mt-4 text-2xl leading-snug transition-colors group-hover:text-accent-ink">
                      {item.project.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {landing.faqs.length > 0 && (
        <section
          aria-labelledby="local-faq-heading"
          className="border-t border-border py-20 md:py-28"
        >
          <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-accent-ink">Questions</p>
              <h2 id="local-faq-heading" className="font-display t-lg mt-4">
                In {area.name}.
              </h2>
            </Reveal>
            <div className="lg:col-span-8">
              <Faq items={[...landing.faqs]} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section
          aria-labelledby="local-related-heading"
          className="border-t border-border py-16 md:py-20"
        >
          <div className="gutter mx-auto max-w-[120rem]">
            <h2 id="local-related-heading" className="eyebrow text-muted-foreground">
              Related work in {area.name}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
              {related.map((item) => {
                const relatedService = getService(item.serviceSlug);
                if (!relatedService) return null;
                return (
                  <li key={item.slug}>
                    <Link
                      href={item.path}
                      className="group inline-flex items-center gap-2 font-display text-3xl transition-colors hover:text-accent-ink"
                    >
                      {relatedService.name}
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 text-accent-ink transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {nearby.length > 0 && (
        <section
          aria-labelledby="nearby-heading"
          className="border-t border-border py-16 md:py-20"
        >
          <div className="gutter mx-auto max-w-[120rem]">
            <h2 id="nearby-heading" className="font-display text-3xl md:text-4xl">
              {service.name} nearby
            </h2>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {nearby.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`${serviceHref}#areas`}
                  className="text-sm underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
                >
                  All areas
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title={
          service.emergency
            ? `Need ${service.name.toLowerCase()} in ${area.name}?`
            : `${service.name} in ${area.name}`
        }
        body={
          service.emergency
            ? `Call ${site.phone.display} if water is coming in. We schedule this work in ${area.name} from our Houston office.`
            : `Call ${site.phone.display} to talk through ${service.name.toLowerCase()} in ${area.name}. The scope comes from a visit, not from the city name.`
        }
        service={service.slug}
        emergency={service.emergency}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${service.name} in ${area.name}, TX`,
          serviceType: service.name,
          description: landing.description,
          url: absoluteUrl(path),
          ...(hero ? { image: absoluteUrl(hero.src) } : {}),
          areaServed: {
            '@type': 'Place',
            name: `${area.name}, Texas`,
          },
          provider: { '@id': `${site.url}/#business` },
        }}
      />
    </>
  );
}
