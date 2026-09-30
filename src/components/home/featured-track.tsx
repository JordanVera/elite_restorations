"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Photo } from "@/components/photo";
import type { Img } from "@/lib/images";
import { cn } from "@/lib/utils";

export type TrackProject = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  cover: Img;
  count: number;
};

const layouts = [
  "lg:h-[62vh] lg:w-[30vw]",
  "lg:mt-[16vh] lg:h-[48vh] lg:w-[42vw]",
  "lg:h-[68vh] lg:w-[27vw]",
  "lg:mt-[10vh] lg:h-[50vh] lg:w-[40vw]",
  "lg:-mt-[6vh] lg:h-[60vh] lg:w-[30vw]",
];

const desktopQuery = "(min-width: 1024px)";
const reducedQuery = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(desktopQuery), window.matchMedia(reducedQuery)];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

function getPinned() {
  return window.matchMedia(desktopQuery).matches && !window.matchMedia(reducedQuery).matches;
}

export function FeaturedTrack({ projects }: { projects: TrackProject[] }) {
  const pinned = React.useSyncExternalStore(subscribe, getPinned, () => false);
  const sectionRef = React.useRef<HTMLElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const x = useTransform([smooth, distance], ([p, d]: number[]) => -p * d);

  React.useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!pinned || !track || !section) return;

    const measure = () => {
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      distance.set(d);
      section.style.setProperty("--dist", `${d}px`);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      distance.set(0);
      section.style.removeProperty("--dist");
    };
  }, [pinned, distance]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="featured-heading"
      className={cn("relative", pinned && "h-[calc(100dvh+var(--dist,150vw))]")}
    >
      <div
        className={cn(
          "flex flex-col justify-center py-24 md:py-32",
          pinned && "sticky top-0 h-dvh overflow-hidden py-0",
        )}
      >
        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={cn(
            "gutter flex items-center gap-6 md:gap-10",
            pinned
              ? "w-max will-change-transform"
              : "snap-x snap-mandatory overflow-x-auto pb-6 [scrollbar-width:none]",
          )}
        >
          <div
            className={cn(
              "flex shrink-0 flex-col justify-center pr-6 max-lg:w-[82vw] max-lg:snap-start lg:w-[34vw] lg:pr-16",
            )}
          >
            <p className="eyebrow text-muted-foreground">Selected work</p>
            <h2 id="featured-heading" className="t-xl mt-6">
              Rooms, roofs
              <br />
              and everything <em className="text-accent-ink">between.</em>
            </h2>
            <p className="mt-8 measure text-muted-foreground">
              A look across kitchens, baths, floors and exteriors, plus the urgent work that comes
              before any of it. Scroll sideways through some of what we build.
            </p>
            <p className="eyebrow mt-10 flex items-center gap-3 text-muted-foreground max-lg:hidden">
              <span aria-hidden className="h-px w-12 bg-foreground/40" />
              Keep scrolling
            </p>
          </div>

          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={cn(
                "group relative block shrink-0 overflow-hidden bg-surface-2 max-lg:aspect-[4/5] max-lg:w-[78vw] max-lg:snap-start",
                layouts[i % layouts.length],
              )}
            >
              <Photo
                image={project.cover}
                sizes="(min-width: 1024px) 42vw, 78vw"
                className="transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.06]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-[#f4efe4] md:p-8">
                <div>
                  <p className="eyebrow text-[#f4efe4]/70">
                    {String(i + 1).padStart(2, "0")}&nbsp;&nbsp;/&nbsp;&nbsp;{project.category}
                  </p>
                  <h3 className="t-md mt-3 max-w-[16ch]">{project.title}</h3>
                  <p className="mt-3 max-w-[30ch] translate-y-2 text-sm text-[#f4efe4]/75 opacity-0 transition-all duration-700 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
                    {project.tagline}
                  </p>
                </div>
                <span className="flex size-12 shrink-0 items-center justify-center border border-[#f4efe4]/50 transition-colors duration-500 group-hover:border-[#f4efe4] group-hover:bg-[#f4efe4] group-hover:text-black">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          ))}

          <Link
            href="/projects"
            className="group flex shrink-0 flex-col justify-center gap-6 max-lg:w-[70vw] max-lg:snap-start lg:w-[26vw] lg:pl-10 lg:pr-[8vw]"
          >
            <span className="t-xl transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
              All <em className="text-accent-ink">projects</em>
            </span>
            <span className="eyebrow inline-flex items-center gap-3">
              Browse the full portfolio
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        </motion.div>

        {pinned && (
          <div aria-hidden className="gutter absolute inset-x-0 bottom-8">
            <div className="h-px w-full bg-border">
              <motion.div style={{ scaleX: smooth }} className="h-px origin-left bg-accent" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
