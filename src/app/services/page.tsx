import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { ImageReveal, Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { Photo } from '@/components/photo';
import { areaPages } from '@/lib/area-pages';
import { pageMetadata } from '@/lib/seo';
import {
  serviceGroupBlurbs,
  serviceGroups,
  servicePath,
  services,
  servicesInGroup,
} from '@/lib/services';

export const metadata: Metadata = pageMetadata({
  title: 'Houston Remodeling & Restoration',
  description:
    'Restoration and remodeling in Houston: water and storm damage, kitchens, baths, roofs, and floors. Call (713) 909-0034.',
  path: '/services',
  image: '/images/services/kitchen-remodeling.jpg',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={['Services in Houston.']}
        lede="Kitchens, bathrooms, roofs, water and storm restoration, and help writing down an insurance claim. Family-owned since 1993."
        crumbs={[{ name: 'Services', path: '/services' }]}
      >
        <Link
          href="/restoration"
          className="mt-8 inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
        >
          Houston restoration services
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </PageHero>

      {serviceGroups.map((group) => {
        const items = servicesInGroup(group);
        return (
          <section
            key={group}
            aria-labelledby={`group-${group}`}
            className="border-b border-border py-20 md:py-28"
          >
            <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-20">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <Reveal>
                  {/* <p className="eyebrow text-accent-ink">
                    {String(items.length).padStart(2, '0')} services
                  </p> */}
                  <h2 id={`group-${group}`} className="font-display t-lg mt-4">
                    {group}
                  </h2>
                  <p className="mt-5 max-w-[32ch] leading-relaxed text-muted-foreground">
                    {serviceGroupBlurbs[group]}
                  </p>
                </Reveal>
              </div>

              <ul className="border-t border-border">
                {items.map((service) => {
                  const number = services.indexOf(service) + 1;
                  return (
                    <li key={service.slug} className="border-b border-border">
                      <Link
                        href={servicePath(service.slug)}
                        className="group grid items-center gap-6 py-8 sm:grid-cols-[3rem_1fr_minmax(0,14rem)] md:py-10"
                      >
                        <span className="eyebrow text-muted-foreground">
                          {String(number).padStart(2, '0')}
                        </span>
                        <span>
                          <span className="flex items-start gap-3">
                            <span className="font-display text-3xl leading-tight transition-colors duration-500 group-hover:text-accent-ink md:text-4xl">
                              {service.name}
                            </span>
                            <ArrowUpRight
                              aria-hidden
                              className="mt-2 size-5 shrink-0 -translate-x-2 text-accent-ink opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                            />
                            {service.emergency && (
                              <span className="eyebrow mt-2 border border-accent-ink px-2 py-1 text-accent-ink">
                                Emergency
                              </span>
                            )}
                          </span>
                          <span className="mt-3 block max-w-[46ch] leading-relaxed text-muted-foreground">
                            {service.summary}
                          </span>
                        </span>
                        {service.image ? (
                          <ImageReveal className="relative hidden aspect-[4/3] sm:block">
                            <Photo
                              image={service.image}
                              sizes="14rem"
                              className="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105"
                            />
                          </ImageReveal>
                        ) : (
                          <div className="relative hidden aspect-[4/3] items-end border border-border bg-surface p-4 sm:flex">
                            <p className="font-display text-2xl leading-none">
                              {service.name}
                            </p>
                          </div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      <section
        id="areas"
        aria-labelledby="services-areas-heading"
        className="scroll-mt-28 border-b border-border py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <p className="eyebrow text-accent-ink">77082</p>
          <h2 id="services-areas-heading" className="font-display t-lg mt-4 max-w-[14ch]">
            Areas we serve
          </h2>
          <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
            The office is at 511 Crestwater Ct, Houston, TX 77082. Westchase,
            Alief, and the Energy Corridor are next door. Each service page
            also covers the wider Houston area.
          </p>
          <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {areaPages.map((area) => (
              <li key={area.slug}>
                <Link
                  href={area.path}
                  className="group inline-flex items-center gap-2 font-display text-4xl transition-colors hover:text-accent-ink"
                >
                  {area.name}
                  <ArrowUpRight className="size-5 text-accent-ink" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Not sure which one you need?"
        body="Describe what you are seeing, or what you want to change. We will help you find the right place to start."
        service="not-sure"
      />
    </>
  );
}
