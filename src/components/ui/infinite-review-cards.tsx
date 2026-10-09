"use client";

import { useReducedMotion } from "motion/react";
import { Star } from "lucide-react";

import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

const durationForSpeed = {
  fast: "25s",
  normal: "45s",
  slow: "75s",
} as const;

/**
 * Aceternity infinite moving cards, set in this site's type and color.
 * https://ui.aceternity.com/components/infinite-moving-cards
 */
export function InfiniteReviewCards({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: readonly Testimonial[];
  direction?: "left" | "right";
  speed?: keyof typeof durationForSpeed;
  pauseOnHover?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <ul className={cn("grid gap-4 sm:grid-cols-2", className)}>
        {items.map((item) => (
          <li key={item.author}>
            <ReviewCard item={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      className={cn(
        "group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
      style={{
        ["--animation-duration" as string]: durationForSpeed[speed],
        ["--animation-direction" as string]:
          direction === "left" ? "forwards" : "reverse",
      }}
    >
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.author}>
            {item.author}: {item.quote}
          </li>
        ))}
      </ul>
      <ul
        aria-hidden
        className={cn(
          "flex w-max min-w-full shrink-0 gap-4 py-2 animate-scroll",
          pauseOnHover &&
            "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]",
        )}
      >
        {[0, 1].map((copy) => (
          <li key={copy} className="flex shrink-0 gap-4" aria-hidden>
            <ul className="flex shrink-0 gap-4">
              {items.map((item) => (
                <li key={`${copy}-${item.author}`} className="w-[min(82vw,26rem)] shrink-0">
                  <ReviewCard item={item} clamped />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReviewCard({
  item,
  clamped = false,
}: {
  item: Testimonial;
  clamped?: boolean;
}) {
  return (
    <figure className="flex h-full flex-col border border-border bg-background px-6 py-6 md:px-7 md:py-7">
      <div className="flex items-center justify-between gap-4">
        <Stars rating={item.rating} />
        <p className="eyebrow text-muted-foreground">{item.source}</p>
      </div>
      <blockquote
        className={cn(
          "mt-5 font-display text-[1.35rem] leading-[1.25] tracking-[-0.02em] whitespace-pre-line",
          clamped && "line-clamp-6 whitespace-normal",
        )}
      >
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <p className="text-sm">{item.author}</p>
        <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
      </figcaption>
    </figure>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "size-3.5",
            i < rating ? "fill-accent text-accent" : "text-border",
          )}
        />
      ))}
    </div>
  );
}
