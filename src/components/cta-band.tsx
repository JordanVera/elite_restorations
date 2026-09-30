import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { ctaHref, emergencyHref, site } from "@/lib/site";

type CtaBandProps = {
  title?: string;
  body?: string;
  service?: string;
  emergency?: boolean;
};

export function CtaBand({
  title = "Ready to talk it through?",
  body = "Tell us what you have in mind, or what went wrong. We will take it from there.",
  service,
  emergency,
}: CtaBandProps) {
  const href = emergency
    ? emergencyHref
    : service
      ? `${ctaHref}?service=${encodeURIComponent(service)}`
      : ctaHref;
  return (
    <section
      aria-label="Request an estimate"
      className="relative overflow-hidden border-t border-border bg-surface py-24 md:py-32"
    >
      <div className="gutter mx-auto grid max-w-[120rem] gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
        <Reveal>
          <h2 className="font-display t-lg text-balance">{title}</h2>
          <p className="measure mt-6 text-lg text-muted-foreground">{body}</p>
        </Reveal>
        <Reveal delay={0.15} className="flex flex-col items-start gap-6 md:items-end">
          <Button asChild size="xl" variant="accent">
            <Link href={href}>
              {emergency ? "Request emergency help" : "Request an estimate"}
              <ArrowUpRight className="arrow" aria-hidden />
            </Link>
          </Button>
          <a
            href={site.phone.href}
            className="inline-flex items-center gap-3 text-lg tracking-wide transition-colors hover:text-accent-ink"
          >
            <Phone className="size-4" aria-hidden />
            {site.phone.display}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
