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
  return (
    <section
      aria-labelledby={headingId}
      className={cn("relative border-b border-border pt-36 pb-14 sm:pt-44 md:pb-20", className)}
    >
      <div className="gutter mx-auto max-w-[120rem]">
        {crumbs && (
          <div className="mb-10">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <p className="eyebrow flex items-center gap-4 text-muted-foreground">
          <span aria-hidden className="h-px w-10 bg-accent-ink" />
          {eyebrow}
        </p>
        <SplitLines
          as="h1"
          id={headingId}
          immediate
          lines={title}
          className="font-display t-xl mt-8 max-w-[18ch] text-balance"
        />
        {lede && (
          <Reveal delay={0.35} className="mt-8">
            <p className="measure text-lg leading-relaxed text-muted-foreground">{lede}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
