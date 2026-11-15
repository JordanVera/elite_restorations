import Link from "next/link";
import { Phone } from "lucide-react";

import { DeferredLeadForm } from "@/components/deferred-lead-form";
import { RoofLinework } from "@/components/home/roof-linework";
import { Reveal, SplitLines } from "@/components/motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { site } from "@/lib/site";

export function HomeFinalCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-[#0a0a0b] py-24 text-[#efe9dd] md:py-36"
    >
      <BackgroundBeams className="-z-10 text-[#efe9dd]" />
      <Spotlight className="-top-40 left-0 md:-left-32 md:-top-20" fill="#d93e39" />
      <RoofLinework className="pointer-events-none absolute -bottom-10 -right-16 -z-10 w-[36rem] text-[#efe9dd]/20 md:-right-10 md:w-[52rem]" />

      <div className="gutter relative mx-auto max-w-[120rem]">
        <Reveal>
          <p className="eyebrow flex items-center gap-4 text-[#efe9dd]/70">
            <span aria-hidden className="h-px w-10 bg-[#f2665d]" />
            Start here
          </p>
        </Reveal>

        <SplitLines
          as="h2"
          id="cta-heading"
          className="mt-8 font-display text-[clamp(3rem,9.5vw,9.5rem)] leading-[0.9] tracking-[-0.035em]"
          lines={[
            "Tell us what happened,",
            <span key="b">
              or what you are <em className="text-[#f2665d]">imagining.</em>
            </span>,
          ]}
        />

        <div className="mt-20 grid gap-y-16 lg:grid-cols-12">
          <div className="dark text-[#efe9dd] lg:col-span-7">
            <DeferredLeadForm
              idPrefix="home"
              density="compact"
              showPhotos={false}
              submitLabel="Request an estimate"
            />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <p className="eyebrow text-[#efe9dd]/70">Prefer to talk?</p>
              <a
                href={site.phone.href}
                className="group mt-5 inline-flex items-center gap-4 font-display text-[clamp(2rem,3.4vw,3.25rem)] leading-none transition-colors hover:text-[#f2665d]"
              >
                <Phone className="size-7 shrink-0 text-[#f2665d]" aria-hidden />
                {site.phone.display}
              </a>
              <dl className="mt-8 space-y-2 text-sm text-[#efe9dd]/65">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex gap-3">
                    <dt className="min-w-[10.5rem]">{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 max-w-[34ch] text-sm text-[#efe9dd]/65">
                Roof or water emergency? Call, then{" "}
                <Link
                  href="/emergency"
                  className="underline underline-offset-[0.4em] transition-colors hover:text-[#f2665d]"
                >
                  tell us what happened
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
