"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

export type StickyScrollItem = {
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  visual: React.ReactNode;
};

export function StickyScroll({
  items,
  className,
}: {
  items: StickyScrollItem[];
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 55%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(items.length - 1, Math.max(0, Math.floor(value * items.length)));
    setActive(next);
  });

  return (
    <div ref={ref} className={cn("relative grid gap-x-16 lg:grid-cols-12", className)}>
      <div className="relative lg:col-span-6 lg:pl-10">
        <div aria-hidden className="absolute bottom-0 left-0 top-0 hidden w-px bg-border lg:block">
          <motion.div style={{ scaleY: fill }} className="size-full origin-top bg-accent" />
        </div>
        <ol>
          {items.map((item, index) => (
            <li
              key={item.title}
              aria-current={active === index ? "step" : undefined}
              className="flex flex-col justify-center py-14 lg:min-h-[75vh] lg:py-0"
            >
              <motion.div
                animate={{ opacity: active === index ? 1 : 0.32 }}
                transition={{ duration: 0.5 }}
                className="max-lg:opacity-100!"
              >
                <p className="eyebrow text-accent-ink">
                  Step {item.eyebrow}
                </p>
                <h3 className="t-xl mt-5">{item.title}</h3>
                <p className="t-md mt-6 text-foreground/90">{item.lead}</p>
                <p className="mt-5 measure text-muted-foreground">{item.body}</p>
              </motion.div>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden lg:hidden">{item.visual}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-28 h-[calc(100dvh-8rem)] max-h-[46rem] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 0.999 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {items[active].visual}
            </motion.div>
          </AnimatePresence>
          <span
            aria-hidden
            className="font-display pointer-events-none absolute bottom-4 right-6 z-10 text-[8rem] leading-none text-white/90 mix-blend-difference"
          >
            {items[active].eyebrow}
          </span>
        </div>
      </div>
    </div>
  );
}
