"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export function InfiniteMovingCards({
  items,
  className,
  itemClassName,
  duration = 55,
}: {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <ul className={cn("flex flex-wrap gap-x-8 gap-y-3", className)}>
        {items.map((item) => (
          <li key={item} className={itemClassName}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <motion.div
        aria-hidden
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className={cn("flex items-center", itemClassName)}
              >
                {item}
                <span className="px-[0.85em] text-accent">·</span>
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
}
