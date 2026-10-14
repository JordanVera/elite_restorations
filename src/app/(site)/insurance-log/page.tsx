import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

import { InsuranceLog } from "@/components/insurance-log";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Insurance Claim Packet for Water & Storm Damage",
  description:
    "A first-night checklist for an active leak or an open roof, then a room-by-room claim packet your adjuster can take. Free from Elite Restorations in Houston.",
  path: "/insurance-log",
  image: "/images/services/water-damage-restoration.jpg",
});

export default function InsuranceLogPage() {
  return (
    <>
      <PageHero
        eyebrow="Claim packet"
        title={["Document the damage,", "room by room."]}
        lede="A first-night list for an active leak or an open roof, then one PDF an adjuster can take. The photos continue into a recovery request."
        crumbs={[
          { name: "Emergency", path: "/emergency" },
          { name: "Claim packet", path: "/insurance-log" },
        ]}
      >
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm">
          <a
            href={site.phone.href}
            className="inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
          >
            <Phone className="size-4 text-accent-ink" aria-hidden />
            Water still coming in? Call {site.phone.display}
          </a>
          <Link
            href="/emergency"
            className="inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
          >
            Request help online
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </PageHero>

      <section aria-label="Photo log" className="py-16 md:py-24">
        <div className="gutter mx-auto max-w-[80rem]">
          <InsuranceLog />
        </div>
      </section>
    </>
  );
}
