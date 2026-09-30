import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageHero
      eyebrow="Error 404"
      title={["This page", "is not here."]}
      lede="The link may be old, or the address mistyped. Try one of these instead."
      className="min-h-[80dvh]"
    >
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button asChild variant="accent" size="lg">
          <Link href="/">
            Back to home
            <ArrowUpRight className="arrow" aria-hidden />
          </Link>
        </Button>
        <Link href="/services" className="underline underline-offset-[0.5em] hover:text-accent-ink">
          Services
        </Link>
        <Link href="/projects" className="underline underline-offset-[0.5em] hover:text-accent-ink">
          Projects
        </Link>
        <a href={site.phone.href} className="underline underline-offset-[0.5em] hover:text-accent-ink">
          {site.phone.display}
        </a>
      </div>
    </PageHero>
  );
}
