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

function rotate<T>(items: readonly T[], amount: number) {
  if (items.length === 0) return [];
  const start = amount % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

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
  const layout = landing.layout;
  const facts = rotate(landing.facts, layout);
  const scopeHeading = [
    `What changes in ${area.name}.`,
    `${service.name} for a house in ${area.name}.`,
    `Houses in ${area.name}, then the job.`,
    `${area.name}: the address, not the city name.`,
  ][layout];
  const notesHeading = [
    `What we look at in ${area.name}.`,
    `Checked at the house in ${area.name}.`,
    `Before anything is ordered in ${area.name}.`,
    `What the lot changes in ${area.name}.`,
  ][layout];
  const factHeading = [
    `Where ${area.name} sits.`,
    `County, weather, and the drive.`,
    `The map around ${area.name}.`,
    `From the Houston office to ${area.name}.`,
  ][layout];
  const splitAt = Math.max(3, Math.min(5, Math.ceil(landing.paragraphs.length / 2)));
  const leadParagraphs = layout === 2 ? landing.paragraphs.slice(0, splitAt) : landing.paragraphs;
  const restParagraphs = layout === 2 ? landing.paragraphs.slice(splitAt) : [];

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
          {landing.areaSlug === 'katy' && landing.serviceSlug === 'patios-decks' && (
            <Link
              href="/projects/katy-composite-deck"
              className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
            >
              Composite deck in Katy
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          )}
          {landing.areaSlug === 'katy' && landing.serviceSlug === 'bathroom-remodeling' && (
            <Link
              href="/projects/katy-marble-bathroom"
              className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
            >
              Marble-look bathroom in Katy
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          )}
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

      {layout === 1 && (
        <FactBand id="local-facts-heading" heading={factHeading} facts={facts} />
      )}

      <section aria-labelledby="local-scope-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12 lg:gap-20">
          <div className={layout === 1 ? 'lg:col-span-10' : 'lg:col-span-7'}>
            <Reveal>
              <p className="eyebrow text-accent-ink">{area.name}</p>
              <h2 id="local-scope-heading" className="font-display t-lg mt-4 max-w-[16ch]">
                {scopeHeading}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-7">
              {leadParagraphs.map((paragraph, index) => (
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
          {layout !== 1 && (
          <Reveal className="lg:col-span-5" delay={0.12}>
            {layout === 3 ? (
              <>
                <p className="eyebrow text-accent-ink">The place</p>
                <h2 className="font-display mt-4 text-3xl leading-snug">{factHeading}</h2>
                <FactList facts={facts} />
              </>
            ) : (
            <>
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
            </>
            )}
          </Reveal>
          )}
        </div>
      </section>

      {layout === 2 && restParagraphs.length > 0 && (
        <FactBand id="local-facts-mid-heading" heading={factHeading} facts={facts} />
      )}

      {restParagraphs.length > 0 && (
        <section aria-labelledby="local-rest-heading" className="pb-20 md:pb-28">
          <div className="gutter mx-auto max-w-[120rem] lg:max-w-[70rem]">
            <h2 id="local-rest-heading" className="font-display text-3xl leading-snug md:text-4xl">
              The rest of the visit in {area.name}.
            </h2>
            <div className="mt-6 space-y-7">
              {restParagraphs.map((paragraph) => (
                <p key={paragraph} className="measure text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {layout === 0 && (
        <FactBand id="local-facts-heading" heading={factHeading} facts={facts} />
      )}

      <section
        aria-labelledby="local-notes-heading"
        className="border-y border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">
              {layout === 1 ? 'At the address' : layout === 3 ? 'Before the order' : 'On the visit'}
            </p>
            <h2 id="local-notes-heading" className="font-display t-lg mt-4 max-w-[18ch]">
              {notesHeading}
            </h2>
          </Reveal>
          <ul
            className={
              layout === 1
                ? 'mt-12 grid gap-10'
                : layout === 2
                  ? 'mt-12 grid gap-8 md:grid-cols-2'
                  : 'mt-12 grid gap-8 md:grid-cols-3'
            }
          >
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
                Photos from our past {service.name.toLowerCase()} projects around Houston.
              </p>
              <p className="font-display mt-8 text-3xl leading-snug">
                {photos.every((item) => item.project.title === photos[0]?.project.title)
                  ? photos[0]?.project.title
                  : service.name}
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
                {layout === 1
                  ? `Questions about ${area.name}.`
                  : layout === 2
                    ? `Before the visit in ${area.name}.`
                    : layout === 3
                      ? `${area.name} questions.`
                      : `In ${area.name}.`}
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
              {layout % 2 === 0 ? `Related work in ${area.name}` : `Other services in ${area.name}`}
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
              {layout === 3 ? `The same trade near ${area.name}` : `${service.name} nearby`}
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

function FactList({ facts }: { facts: readonly { label: string; value: string }[] }) {
  return (
    <dl className="mt-6 border-t border-border">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="grid gap-1 border-b border-border py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
        >
          <dt className="eyebrow text-accent-ink">{fact.label}</dt>
          <dd className="text-sm leading-relaxed">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function FactBand({
  id,
  heading,
  facts,
}: {
  id: string;
  heading: string;
  facts: readonly { label: string; value: string }[];
}) {
  return (
    <section aria-labelledby={id} className="border-y border-border bg-surface py-16 md:py-20">
      <div className="gutter mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-12">
        <h2 id={id} className="font-display text-3xl leading-snug md:text-4xl lg:col-span-4">
          {heading}
        </h2>
        <div className="lg:col-span-8">
          <FactList facts={facts} />
        </div>
      </div>
    </section>
  );
}
