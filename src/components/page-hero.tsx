import * as React from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal, SplitLines } from "@/components/motion";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: readonly string[];
  lede?: string;
  crumbs?: { name: string; path: string }[];
  headingId?: string;
  className?: string;
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  headingId = "page-heading",
  className,
  children,
}: PageHeroProps) {
  const current = crumbs?.[crumbs.length - 1]?.name;
  const showEyebrow =
    !current || current.toLowerCase() !== eyebrow.toLowerCase();

  return (
    <section
      aria-labelledby={headingId}
      className={cn("relative pt-24 pb-8 sm:pt-28 md:pb-10", className)}
    >
      <div className="gutter mx-auto max-w-[120rem]">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-border pb-4">
          {crumbs ? (
            <Breadcrumbs items={crumbs} />
          ) : (
            <p className="eyebrow text-muted-foreground">{eyebrow}</p>
          )}
          {crumbs && showEyebrow && (
            <p className="eyebrow text-accent-ink">{eyebrow}</p>
          )}
        </div>

        <div className="mt-6 grid gap-4 md:mt-7 md:grid-cols-12 md:items-start md:gap-x-16">
          <SplitLines
            as="h1"
            id={headingId}
            immediate
            stagger={0.06}
            lines={title}
            className="font-display text-[clamp(2.15rem,4vw,3.5rem)] leading-[0.98] tracking-[-0.03em] text-balance md:col-span-7"
          />
          {lede && (
            <Reveal delay={0.15} className="md:col-span-5 md:col-start-8">
              <p className="max-w-[40ch] text-base leading-relaxed text-muted-foreground md:ml-auto md:pb-1">
                {lede}
              </p>
            </Reveal>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
