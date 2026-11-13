"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

import { cn } from "@/lib/utils";

type Segment = { text: string; emphasis?: boolean };

function Word({
  children,
  progress,
  range,
  emphasis,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  emphasis?: boolean;
}) {
  const fill = useTransform(progress, range, [0, 1]);
  return (
    <motion.span
      data-reveal
      style={{
        ["--w" as string]: fill,
        ["--ink" as string]: emphasis ? "var(--accent-ink)" : "var(--foreground)",
      }}
      className={cn(
        "relative mr-[0.22em] inline-block text-[color-mix(in_srgb,var(--ink)_calc(var(--w)*100%),var(--muted-foreground))]",
        emphasis && "italic",
      )}
    >
      {children}
      <span className="absolute size-0 overflow-hidden"> </span>
    </motion.span>
  );
}

export function ScrollWords({
  segments,
  className,
  as: Tag = "p",
  id,
}: {
  segments: Segment[];
  className?: string;
  as?: "p" | "h2";
  id?: string;
}) {
  const ref = React.useRef<HTMLParagraphElement | HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 82%", "end 52%"] });

  const words = segments.flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, emphasis: segment.emphasis })),
  );

  if (reduce) {
    return (
      <Tag ref={ref as React.Ref<HTMLHeadingElement>} id={id} className={className}>
        {segments.map((s, i) => (
          <span key={i} className={cn(s.emphasis && "italic text-accent-ink")}>
            {s.text}{" "}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} id={id} className={className}>
      {words.map(({ word, emphasis }, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]} emphasis={emphasis}>
            {word}
          </Word>
        );
      })}
    </Tag>
  );
}
