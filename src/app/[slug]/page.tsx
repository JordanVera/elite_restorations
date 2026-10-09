import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Check, Phone } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { ImageReveal, Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { Photo } from '@/components/photo';
import { processSteps } from '@/lib/process';
import { imagesForService } from '@/lib/projects';
import { absoluteUrl, pageMetadata } from '@/lib/seo';
import {
  getService,
  servicePath,
  services,
  type Service,
} from '@/lib/services';
import { emergencyHref, site } from '@/lib/site';

type Params = { slug: string };

export const dynamicParams = false;

const galleryShift: Record<string, number> = {
  'tile-flooring': 3,
  'vinyl-flooring': 6,
  'laminate-flooring': 9,
};

function photographsFor(service: Service) {
  const all = imagesForService(service.slug);
  const count = all.length;
  const shift = count === 0 ? 0 : (galleryShift[service.slug] ?? 0) % count;
  const rotated =
    shift === 0 ? all : [...all.slice(shift), ...all.slice(0, shift)];
  const rest = rotated.filter((item) => item.image.src !== service.image.src);
  const overlap = rest[0];
  const localPhoto = rest.find((item) => item !== overlap);
  const used = new Set(
    [service.image.src, overlap?.image.src, localPhoto?.image.src].filter(
      (src): src is string => Boolean(src),
    ),
  );
  const masonry = rest.filter((item) => !used.has(item.image.src)).slice(0, 6);
  return { overlap, localPhoto, masonry };
}

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const path = servicePath(service.slug);
  return pageMetadata({
    title: `${service.name} in Houston, TX`,
    description: service.metaDescription,
    path,
    image: service.image.src,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const steps =
    service.process ??
    processSteps.map((step) => ({
      title: step.title,
      body: `${step.lead} ${step.body}`,
    }));
  const related = service.related.map((s) => getService(s)).filter((s) => !!s);
  const { overlap, localPhoto, masonry } = photographsFor(service);
  const path = servicePath(service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.group}
        title={[service.name]}
        lede={service.tagline}
        crumbs={[
          { name: 'Services', path: '/services' },
          { name: service.name, path },
        ]}
      >
        {service.emergency && (
          <Reveal
            delay={0.5}
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5"
          >
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
            <Link
              href={emergencyHref}
              className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
            >
              Request help online
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/insurance-log"
              className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
            >
              Insurance photo log
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        )}
      </PageHero>

      <div className="gutter mx-auto max-w-[120rem] pt-8 md:pt-12">
        <div className="relative">
          <ImageReveal
            immediate
            className="relative aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[21/9]"
          >
            <Photo
              image={service.image}
              sizes="(min-width: 1920px) 1800px, 96vw"
              priority
            />
          </ImageReveal>
          {overlap && (
            <Link
              href={`/projects/${overlap.project.slug}`}
              className="absolute bottom-3 right-3 w-[38%] sm:bottom-5 sm:right-5 sm:w-[26%] md:bottom-8 md:right-8 md:w-[17%]"
            >
              <div className="border-4 border-background bg-background">
                <ImageReveal
                  immediate
                  delay={0.12}
                  className="relative aspect-[3/4]"
                >
                  <Photo
                    image={overlap.image}
                    sizes="(min-width: 768px) 18vw, 40vw"
                  />
                </ImageReveal>
              </div>
            </Link>
          )}
        </div>
      </div>

      <section aria-labelledby="scope-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-accent-ink">The work</p>
              <h2 id="scope-heading" className="sr-only">
                About {service.name}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-7">
              {service.intro.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p
                    className={
                      i === 0
                        ? 'font-display text-3xl leading-snug md:text-4xl'
                        : 'measure text-lg leading-relaxed text-muted-foreground'
                    }
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="eyebrow text-accent-ink">What is included</p>
            <ul className="mt-6 border-t border-border">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-b border-border py-4"
                >
                  <Check
                    className="mt-1 size-4 shrink-0 text-accent-ink"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            {service.materials && (
              <div className="mt-10">
                <p className="eyebrow text-accent-ink">
                  {service.materials.label}
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {service.materials.items.join(' · ')}
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="houston-heading"
        className="border-y border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto grid max-w-[120rem] items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {localPhoto && (
            <ImageReveal className="relative aspect-[16/10] lg:col-span-5 lg:mt-16 lg:aspect-[4/5]">
              <Photo
                image={localPhoto.image}
                sizes="(min-width: 1024px) 38vw, 92vw"
              />
            </ImageReveal>
          )}
          <div className={localPhoto ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <Reveal>
              <p className="eyebrow text-accent-ink">Built for Houston</p>
              <h2
                id="houston-heading"
                className="font-display t-lg mt-4 max-w-[16ch]"
              >
                {service.local.heading}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-6">
              {service.local.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="measure text-lg leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="mt-12 grid gap-8 sm:grid-cols-3">
              {service.local.conditions.map((condition, i) => (
                <li
                  key={condition.title}
                  className="border-t border-border pt-5"
                >
                  <p className="eyebrow text-accent-ink">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display mt-3 text-2xl leading-snug">
                    {condition.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {condition.body}
                  </p>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-12 text-muted-foreground">In and around</p>
            <p className="mt-3 max-w-[48ch] text-lg leading-relaxed">
              {service.local.neighborhoods.join(' · ')}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="steps-heading"
        className="border-b border-border py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">How it goes</p>
            <h2
              id="steps-heading"
              className="font-display t-lg mt-4 max-w-[16ch]"
            >
              What to expect, step by step.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Reveal
                  delay={(i % 3) * 0.08}
                  className="border-t border-border pt-6"
                >
                  <span className="font-display text-5xl text-accent-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display mt-4 text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-[42ch] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {masonry.length > 0 && (
        <section aria-labelledby="projects-heading" className="py-20 md:py-28">
          <div className="gutter mx-auto max-w-[120rem]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal>
                <p className="eyebrow text-accent-ink">Related work</p>
                <h2 id="projects-heading" className="font-display t-lg mt-4">
                  Seen in the field.
                </h2>
              </Reveal>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.2em]"
              >
                All projects
                <ArrowRight
                  className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
            <ul className="mt-12 gap-x-6 sm:columns-2 xl:columns-3">
              {masonry.map((item, i) => (
                <li key={item.image.src} className="mb-8 break-inside-avoid">
                  <Link
                    href={`/projects/${item.project.slug}`}
                    className="group block"
                  >
                    <ImageReveal delay={(i % 3) * 0.08}>
                      <Photo
                        image={item.image}
                        intrinsic
                        sizes="(min-width: 1280px) 31vw, (min-width: 640px) 48vw, 94vw"
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

      {service.faqs.length > 0 && (
        <section
          aria-labelledby="faq-heading"
          className="border-t border-border py-20 md:py-28"
        >
          <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-accent-ink">Questions</p>
              <h2 id="faq-heading" className="font-display t-lg mt-4">
                Good to know.
              </h2>
            </Reveal>
            <div className="lg:col-span-8">
              <Faq items={service.faqs} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="border-t border-border py-16 md:py-20"
        >
          <div className="gutter mx-auto max-w-[120rem]">
            <h2 id="related-heading" className="eyebrow text-muted-foreground">
              Often paired with
            </h2>
            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={servicePath(r.slug)}
                    className="group inline-flex items-center gap-2 font-display text-3xl transition-colors hover:text-accent-ink"
                  >
                    {r.name}
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-accent-ink transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title={
          service.emergency
            ? 'Water coming in or a roof open?'
            : `Planning ${service.name.toLowerCase()}?`
        }
        body={
          service.emergency
            ? 'Call first if you can. Otherwise tell us what happened and we will call you back.'
            : 'Share a few details and we will follow up to schedule a walkthrough.'
        }
        service={service.slug}
        emergency={service.emergency}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          serviceType: service.name,
          description: service.metaDescription,
          url: absoluteUrl(path),
          image: absoluteUrl(service.image.src),
          provider: { '@id': `${site.url}/#business` },
          areaServed: [
            { '@type': 'AdministrativeArea', name: 'Greater Houston, Texas' },
            ...service.local.neighborhoods.map((name) => ({
              '@type': 'Place',
              name,
            })),
          ],
        }}
      />
    </>
  );
}
