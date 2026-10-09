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
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      data-reveal
      style={{ opacity }}
      className={cn("mr-[0.22em] inline-block", emphasis && "italic text-accent-ink")}
    >
      {children}
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
