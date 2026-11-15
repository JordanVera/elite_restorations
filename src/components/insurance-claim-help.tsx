import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { claimHelpCopy } from "@/lib/claim-help";

export function InsuranceClaimHelp({
  locale = "en",
}: {
  locale?: "en" | "es";
}) {
  const copy = claimHelpCopy(locale);
  return (
    <section
      aria-labelledby="claim-help-heading"
      className="border-b border-border bg-surface py-14 md:py-20"
    >
      <div className="gutter mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-accent-ink">{copy.eyebrow}</p>
          <h2 id="claim-help-heading" className="font-display t-lg mt-4">
            {copy.title}
          </h2>
          <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
            {copy.lede}
          </p>
        </div>
        <div className="lg:col-span-7">
          <h3 className="font-display text-3xl">{copy.disastersTitle}</h3>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {copy.disasters.map((item) => (
              <li key={item.title} className="border-t border-border pt-4">
                <h4 className="font-display text-2xl">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <h3 className="font-display mt-10 text-3xl">{copy.helpTitle}</h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {copy.help.map((item) => (
              <li key={item} className="border-l border-accent-ink pl-4">
                {item}
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {copy.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
