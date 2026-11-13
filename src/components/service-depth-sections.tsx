import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/motion';
import type { DepthLink, ServiceDepth } from '@/lib/service-depth-types';

function DetailGrid({
  items,
  columns,
}: {
  items: { title: string; body: string }[];
  columns: 'two' | 'three';
}) {
  return (
    <ul
      className={
        columns === 'three'
          ? 'mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3'
          : 'mt-12 grid gap-8 md:grid-cols-2'
      }
    >
      {items.map((item) => (
        <li key={item.title} className="border-t border-border pt-5">
          <h3 className="font-display text-2xl leading-snug">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

function GuideLinks({ links }: { links: DepthLink[] }) {
  if (links.length === 0) return null;
  return (
    <ul className="mt-8 space-y-3">
      {links.map((link) => (
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
  );
}

export function HoustonFactors({ depth }: { depth: ServiceDepth }) {
  return (
    <section aria-labelledby="houston-factors-heading" className="border-b border-border py-20 md:py-28">
      <div className="gutter mx-auto max-w-[120rem]">
        <Reveal>
          <p className="eyebrow text-accent-ink">Houston</p>
          <h2 id="houston-factors-heading" className="font-display t-lg mt-4 max-w-[18ch]">
            {depth.factorsHeading}
          </h2>
          <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
            {depth.factorsIntro}
          </p>
        </Reveal>
        <DetailGrid items={depth.factors} columns="two" />
      </div>
    </section>
  );
}

export function ServiceGuide({
  depth,
  costLinks,
}: {
  depth: ServiceDepth;
  costLinks: DepthLink[];
}) {
  return (
    <>
      <section aria-labelledby="signs-heading" className="border-b border-border bg-surface py-20 md:py-28">
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">Signs</p>
            <h2 id="signs-heading" className="font-display t-lg mt-4 max-w-[16ch]">
              {depth.signsHeading}
            </h2>
          </Reveal>
          <DetailGrid items={depth.signs} columns="two" />
        </div>
      </section>

      <section aria-labelledby="materials-heading" className="border-b border-border py-20 md:py-28">
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">Materials</p>
            <h2 id="materials-heading" className="font-display t-lg mt-4 max-w-[18ch]">
              {depth.materialsHeading}
            </h2>
            <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
              {depth.materialsIntro}
            </p>
          </Reveal>
          <DetailGrid items={depth.materials} columns="two" />
        </div>
      </section>

      <section
        aria-labelledby="price-heading"
        className="border-b border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">Cost</p>
            <h2 id="price-heading" className="font-display t-lg mt-4 max-w-[18ch]">
              {depth.costHeading}
            </h2>
          </Reveal>
          <div className="mt-8 max-w-3xl space-y-6">
            {depth.costIntro.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="mt-10 max-w-3xl border-t border-border">
            {depth.ranges.map((range) => (
              <li
                key={range.label}
                className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border py-5"
              >
                <span className="font-display text-2xl">{range.label}</span>
                <span className="text-muted-foreground">{range.range}</span>
              </li>
            ))}
          </ul>
          <p className="measure mt-6 text-sm leading-relaxed text-muted-foreground">
            {depth.rangeNote}
          </p>
          <DetailGrid items={depth.costFactors} columns="three" />
          <GuideLinks links={costLinks} />
        </div>
      </section>

      {depth.insurance && (
        <section aria-labelledby="insurance-heading" className="border-b border-border py-20 md:py-28">
          <div className="gutter mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-accent-ink">Insurance</p>
              <h2 id="insurance-heading" className="font-display t-lg mt-4">
                {depth.insurance.heading}
              </h2>
            </Reveal>
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {depth.insurance.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
              <GuideLinks links={depth.insurance.links ?? []} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
