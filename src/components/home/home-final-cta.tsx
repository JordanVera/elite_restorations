import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

import { RoofLinework } from "@/components/home/roof-linework";
import { Magnetic, Reveal, SplitLines } from "@/components/motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { Spotlight } from "@/components/ui/spotlight";
import { quickPicks } from "@/lib/inquiry";
import { site } from "@/lib/site";

export function HomeFinalCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-[#0a0a0b] py-32 text-[#efe9dd] md:py-48"
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
          <form
            action="/contact"
            method="get"
            className="lg:col-span-7"
            aria-label="Start an estimate request"
          >
            <fieldset>
              <legend className="eyebrow text-[#efe9dd]/70">What is it about?</legend>
              <div className="mt-5 flex flex-wrap gap-3">
                {quickPicks.map((pick, i) => (
                  <label key={pick.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="service"
                      value={pick.value}
                      defaultChecked={i === 0}
                      className="peer sr-only"
                    />
                    <span className="inline-flex h-11 items-center border border-[#efe9dd]/30 px-5 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:border-[#efe9dd] peer-checked:border-[#f2665d] peer-checked:bg-[#d93e39] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#f2665d]">
                      {pick.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-12">
              <label htmlFor="cta-note" className="eyebrow text-[#efe9dd]/70">
                In a sentence
              </label>
              <input
                id="cta-note"
                name="note"
                type="text"
                maxLength={160}
                autoComplete="off"
                placeholder="The roof leaked in last night's storm."
                className="mt-3 h-16 w-full border-0 border-b border-[#efe9dd]/40 bg-transparent font-display text-[clamp(1.5rem,3vw,2.5rem)] text-[#efe9dd] outline-none transition-colors placeholder:text-[#efe9dd]/35 focus-visible:border-[#f2665d]"
              />
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
              <Magnetic>
                <MovingBorderButton
                  as="button"
                  type="submit"
                  containerClassName="h-16 w-72"
                  className="gap-3 bg-[#0a0a0b] text-[0.78rem] font-medium uppercase tracking-[0.2em] text-[#efe9dd] group-hover/mb:bg-[#1b1b1d]"
                >
                  Continue to estimate
                  <ArrowUpRight className="size-4" aria-hidden />
                </MovingBorderButton>
              </Magnetic>
              <p className="max-w-[24ch] text-sm text-[#efe9dd]/65">
                You can review and adjust everything on the next page.
              </p>
            </div>
          </form>

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
