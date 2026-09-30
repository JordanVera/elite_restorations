"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star } from "lucide-react";

import { Parallax } from "@/components/motion";
import { Photo } from "@/components/photo";
import type { Img } from "@/lib/images";
import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialStage({
  testimonials,
  background,
}: {
  testimonials: Testimonial[];
  background: Img;
}) {
  const [index, setIndex] = React.useState(0);
  const current = testimonials[index];

  return (
    <section
      aria-labelledby="testimonial-heading"
      className="relative isolate overflow-hidden bg-black py-32 text-[#f4efe4] md:py-48"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Parallax offset={70} scale={1.15} className="size-full">
          <div className="relative size-full">
            <Photo image={background} sizes="100vw" quality={70} />
          </div>
        </Parallax>
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      <div className="gutter mx-auto max-w-[120rem]">
        <h2 id="testimonial-heading" className="eyebrow text-[#f4efe4]/70">
          What clients say
        </h2>

        <div className="relative mt-12 grid gap-y-14 lg:grid-cols-12">
          <span
            aria-hidden
            className="font-display outline-text pointer-events-none absolute -left-2 -top-16 select-none text-[16rem] leading-none text-[#f4efe4]/30 md:-top-24 md:text-[24rem]"
          >
            &ldquo;
          </span>

          <figure className="relative lg:col-span-10 lg:col-start-2">
            <div className="min-h-[18rem] md:min-h-[22rem]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(2rem,5.2vw,5.4rem)] leading-[1.02] tracking-[-0.025em]"
                >
                  {current.quote}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <figcaption className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div>
                <p className="text-lg">{current.author}</p>
                <p className="eyebrow mt-2 text-[#f4efe4]/70">{current.detail}</p>
              </div>
              <div className="flex items-center gap-1" role="img" aria-label="Five-star review">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-[#f2665d] text-[#f2665d]" aria-hidden />
                ))}
              </div>
            </figcaption>
          </figure>

          <div className="lg:col-span-10 lg:col-start-2">
            <div role="group" aria-label="Choose a review" className="flex items-center gap-3">
              {testimonials.map((t, i) => (
                <button
                  key={t.author}
                  type="button"
                  aria-pressed={i === index}
                  aria-label={`Review ${i + 1} of ${testimonials.length}, ${t.author}`}
                  onClick={() => setIndex(i)}
                  className="group flex h-11 items-center gap-3"
                >
                  <span
                    className={cn(
                      "eyebrow transition-colors",
                      i === index ? "text-[#f4efe4]" : "text-[#f4efe4]/50 group-hover:text-[#f4efe4]/80",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "block h-px transition-all duration-700 ease-out-expo",
                      i === index ? "w-16 bg-[#f2665d]" : "w-8 bg-[#f4efe4]/40 group-hover:w-12",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
