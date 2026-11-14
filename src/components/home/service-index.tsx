'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';

import { Photo } from '@/components/photo';
import { Reveal, SplitLines } from '@/components/motion';
import { serviceHref } from '@/lib/i18n';
import type { Img } from '@/lib/images';
import { cn } from '@/lib/utils';

export type IndexService = {
  slug: string;
  name: string;
  group: string;
  summary: string;
  image?: Img;
  emergency?: boolean;
};

export type CoreLink = {
  href: string;
  label: string;
};

const PREVIEW_COUNT = 6;

export function ServiceIndex({
  services,
  coreLinks = [],
  heading = ["Twenty-five trades.", "One team."],
  intro = "Planned remodels and unplanned emergencies use the same skills. That is why we do both. Pick a service to see how we approach it.",
  locale = "en",
  exploreLabel = "Explore",
  moreLabel,
  lessLabel = "Show fewer",
  indexLabel = "Services",
}: {
  services: IndexService[];
  coreLinks?: CoreLink[];
  heading?: readonly [string, string];
  intro?: string;
  locale?: "en" | "es";
  exploreLabel?: string;
  moreLabel?: string;
  lessLabel?: string;
  indexLabel?: string;
}) {
  const [activeSlug, setActiveSlug] = React.useState(services[0].slug);
  const [expanded, setExpanded] = React.useState(false);
  const listId = React.useId();
  const active = services.find((s) => s.slug === activeSlug) ?? services[0];
  const hrefFor = (slug: string) => serviceHref(slug, locale);
  const canToggle = services.length > PREVIEW_COUNT;
  const hiddenCount = Math.max(services.length - PREVIEW_COUNT, 0);
  const preview = services.slice(0, PREVIEW_COUNT);
  const rest = services.slice(PREVIEW_COUNT);

  const toggle = () => {
    if (expanded && !preview.some((service) => service.slug === activeSlug)) {
      setActiveSlug(preview[0].slug);
    }
    setExpanded((open) => !open);
  };

  return (
    <section
      aria-labelledby="services-heading"
      className="relative border-y border-border bg-surface py-28 md:py-40"
    >
      <div className="gutter mx-auto max-w-[120rem]">
        <div className="grid gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-muted-foreground">{indexLabel}</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="services-heading"
              className="t-xl mt-6"
              lines={[
                heading[0],
                <span key="b">
                  {heading[1].replace(" team.", "").replace(" equipo.", "")}{" "}
                  <em className="text-accent-ink">
                    {heading[1].includes("equipo") ? "equipo." : "team."}
                  </em>
                </span>,
              ]}
            />
          </div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.15}>
              <p className="text-muted-foreground">{intro}</p>
            </Reveal>
          </div>
        </div>

        {coreLinks.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {coreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:text-accent-ink hover:decoration-accent-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-20 grid gap-x-16 lg:grid-cols-12">
          <ul id={listId} className="lg:col-span-7">
            {preview.map((service, i) => (
              <li
                key={service.slug}
                className={cn(
                  'border-t border-border',
                  !canToggle && 'last:border-b',
                )}
              >
                <ServiceRow
                  service={service}
                  index={i}
                  active={service.slug === activeSlug}
                  onActivate={setActiveSlug}
                  hrefFor={hrefFor}
                />
              </li>
            ))}
            {expanded &&
              rest.map((service, i) => (
                <li key={service.slug}>
                  <div className="border-t border-border">
                    <ServiceRow
                      service={service}
                      index={i + PREVIEW_COUNT}
                      active={service.slug === activeSlug}
                      onActivate={setActiveSlug}
                      hrefFor={hrefFor}
                    />
                  </div>
                </li>
              ))}
            {canToggle && (
              <li className="border-t border-b border-border">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={listId}
                  onClick={toggle}
                  className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 py-5 text-left md:grid-cols-[3.5rem_1fr_auto] md:py-6"
                >
                  <span className="eyebrow text-muted-foreground" aria-hidden>
                    {expanded ? '–' : '+'}
                  </span>
                  <span className="eyebrow transition-transform duration-700 ease-out-expo group-hover:translate-x-3 group-focus-visible:translate-x-3">
                    {expanded ? lessLabel : (moreLabel ?? `Show ${hiddenCount} more`)}
                  </span>
                  <ChevronDown
                    className={cn(
                      'size-5 text-muted-foreground transition-transform duration-500 ease-out-expo group-hover:text-foreground',
                      expanded && 'rotate-180',
                    )}
                    aria-hidden
                  />
                </button>
              </li>
            )}
          </ul>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2">
                <div key={active.slug} className="absolute inset-0">
                  {active.image ? (
                    <Photo
                      image={active.image}
                      sizes="(min-width: 1024px) 36vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full items-end bg-foreground p-8 text-background">
                      <p className="font-display text-5xl leading-none">{active.name}</p>
                    </div>
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                  />
                </div>
                <p className="eyebrow absolute left-6 top-6 z-10 bg-background px-3 py-2">
                  {active.group}
                </p>
              </div>
              <div
                className="mt-6 flex items-start justify-between gap-8"
                aria-live="polite"
              >
                <p className="max-w-[34ch] text-muted-foreground">
                  {active.summary}
                </p>
                <Link
                  href={hrefFor(active.slug)}
                  className="eyebrow inline-flex shrink-0 items-center gap-2 border-b border-foreground/40 pb-1.5 transition-colors hover:border-accent-ink hover:text-accent-ink"
                >
                  {exploreLabel}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Link
            href="/services"
            className="eyebrow inline-flex items-center gap-3 border-b border-foreground/40 pb-2 transition-colors hover:border-accent-ink hover:text-accent-ink"
          >
            See how each service works
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
  active,
  onActivate,
  hrefFor,
}: {
  service: IndexService;
  index: number;
  active: boolean;
  onActivate: (slug: string) => void;
  hrefFor: (slug: string) => string;
}) {
  return (
    <Link
      href={hrefFor(service.slug)}
      data-active={active}
      onMouseEnter={() => onActivate(service.slug)}
      onFocus={() => onActivate(service.slug)}
      className="group grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-4 py-5 transition-opacity duration-500 md:grid-cols-[3.5rem_minmax(0,1fr)_auto] md:py-6 lg:opacity-40 lg:data-[active=true]:opacity-100"
    >
      <span className="eyebrow text-muted-foreground">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="flex min-w-0 items-center gap-5">
        <span className="relative block size-14 shrink-0 overflow-hidden bg-surface lg:hidden">
          {service.image ? (
            <Photo image={service.image} sizes="56px" quality={60} />
          ) : null}
        </span>
        <span
          className={cn(
            'min-w-0 font-display text-[clamp(1.45rem,5.4vw,2.15rem)] leading-[1.05] tracking-[-0.025em] transition-transform duration-700 ease-out-expo group-hover:translate-x-3 group-focus-visible:translate-x-3 lg:text-[clamp(2rem,4.6vw,4.25rem)] lg:leading-none',
            active && 'lg:translate-x-3',
          )}
        >
          {service.name}
        </span>
      </span>
      <span className="flex items-center gap-4">
        {service.emergency && (
          <span className="eyebrow hidden border border-accent-ink/60 px-2 py-1.5 text-accent-ink sm:inline-block">
            Emergency
          </span>
        )}
        <span className="eyebrow hidden text-muted-foreground md:inline">
          {service.group}
        </span>
        <ArrowUpRight
          className="size-5 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 max-lg:translate-x-0 max-lg:opacity-60"
          aria-hidden
        />
      </span>
    </Link>
  );
}
