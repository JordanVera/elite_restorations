import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { commercialHubPath, propertyScopeCopy } from "@/lib/property-scope";

export function PropertyScopeNote({
  locale = "en",
  showLink = true,
}: {
  locale?: "en" | "es";
  showLink?: boolean;
}) {
  const copy = propertyScopeCopy(locale);
  return (
    <section aria-labelledby="property-scope-heading" className="border-b border-border py-12 md:py-16">
      <div className="gutter mx-auto max-w-[120rem]">
        <p className="eyebrow text-accent-ink">{copy.eyebrow}</p>
        <h2 id="property-scope-heading" className="font-display mt-4 max-w-[22ch] text-4xl leading-tight md:text-5xl">
          {copy.title}
        </h2>
        <p className="measure mt-5 text-lg leading-relaxed text-muted-foreground">{copy.body}</p>
        {showLink ? (
          <Link
            href={commercialHubPath}
            className="mt-6 inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
          >
            {copy.linkLabel}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        ) : null}
      </div>
    </section>
  );
}
