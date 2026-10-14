import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { ImageReveal, Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { Photo } from '@/components/photo';
import { pageMetadata } from '@/lib/seo';
import {
  serviceGroupBlurbs,
  serviceGroups,
  servicePath,
  services,
  servicesInGroup,
} from '@/lib/services';

export const metadata: Metadata = pageMetadata({
  title: 'Services',
  description:
    'Kitchen and bathroom remodeling, flooring, roofing, siding, carpentry and water-damage restoration across Greater Houston from one family-run team.',
  path: '/services',
  image: '/images/services/kitchen-remodeling.jpg',
});

export default function ServicesPage() {
  return (
    <>
      {/* <PageHero
        eyebrow="Services"
        title={["Fifteen trades.", "One family-run team."]}
        lede="Planned remodels and unplanned emergencies use the same skills. Browse by what you need, or start with the problem and we will work out the rest together."
        crumbs={[{ name: "Services", path: "/services" }]}
      /> */}

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
                        <ImageReveal className="relative hidden aspect-[4/3] sm:block">
                          <Photo
                            image={service.image}
                            sizes="14rem"
                            className="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105"
                          />
                        </ImageReveal>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      <CtaBand
        title="Not sure which one you need?"
        body="Describe what you are seeing or what you want to change. We will point you to the right starting place."
        service="not-sure"
      />
    </>
  );
}
