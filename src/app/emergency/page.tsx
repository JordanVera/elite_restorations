import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Emergency Roof Leak & Water Damage Repair in Houston",
  description:
    "Roof leak, missing shingles, burst pipe or flooding in Houston? Call Elite Restorations at (713) 909-0034, learn what to do first, and request emergency tarping or water-damage help.",
  path: "/emergency",
  image: "/images/services/roofing-emergency-tarp-repair.jpg",
});

const steps = [
  {
    title: "Stop the water if it is safe",
    body: "For a plumbing leak, shut off the main water valve. Stay out of standing water near outlets, appliances or the breaker panel, and stay off a wet or damaged roof. If you are unsure, call us.",
  },
  {
    title: "Photograph before you clean up",
    body: "Wide shots of each room, close-ups of the damage, and anything that is wet. Your insurer will ask for them, and they show us what we are walking into.",
  },
  {
    title: "Send the short request",
    body: "Tell us what happened and where. Photos are optional but help. We call you back and plan the tarp, extraction or drying from there.",
  },
];

export default function EmergencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Water & storm damage"
        title={["Water coming in?", "Start here."]}
        lede="Roof open to the weather, a burst pipe, or water on the floor. Call first if you can. Otherwise, send the request below and we will call you back."
        crumbs={[{ name: "Emergency", path: "/emergency" }]}
      >
        <Reveal delay={0.5} className="mt-10">
          <a
            href={site.phone.href}
            className="group inline-flex items-center gap-4 bg-accent px-6 py-5 text-white transition-colors hover:bg-foreground hover:text-background"
          >
            <Phone className="size-5" aria-hidden />
            <span className="font-display text-3xl leading-none sm:text-4xl">{site.phone.display}</span>
          </a>
        </Reveal>
      </PageHero>

      <section aria-label="What to do and request form" className="py-16 md:py-24">
        <div className="gutter mx-auto grid max-w-[120rem] gap-16 lg:grid-cols-12 lg:gap-24">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent-ink">Before we arrive</p>
            <ol className="mt-8 border-t border-border">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-6 border-b border-border py-7">
                  <span className="eyebrow mt-2 w-6 shrink-0 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="font-display text-3xl leading-tight">{step.title}</h2>
                    <p className="mt-3 max-w-[44ch] leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 border border-border p-6">
              <p className="font-display text-2xl">Need something for your insurer?</p>
              <p className="mt-2 max-w-[42ch] leading-relaxed text-muted-foreground">
                Build a room-by-room photo record and download it as a PDF you can hand to an adjuster.
              </p>
              <Link
                href="/insurance-log"
                className="mt-4 inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
              >
                Start the insurance photo log
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="eyebrow text-accent-ink">Request help</p>
            <h2 className="font-display t-md mt-4 max-w-[20ch]">Tell us what happened.</h2>
            <div className="relative mt-10">
              <LeadForm lockPath="recovery" />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Planning a remodel instead" className="border-t border-border py-14">
        <div className="gutter mx-auto flex max-w-[120rem] flex-wrap items-center justify-between gap-6">
          <p className="max-w-[46ch] text-muted-foreground">
            Once the emergency is handled, we rebuild what was damaged, and we also plan kitchens, baths and floors.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
          >
            See all services
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
