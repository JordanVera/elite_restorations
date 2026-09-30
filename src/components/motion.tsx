"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  x = 0,
  duration = 1,
}: RevealProps) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

type SplitLinesProps = {
  lines: readonly React.ReactNode[];
  id?: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "div";
};

export function SplitLines({
  lines,
  id,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.11,
  immediate = false,
  as = "div",
}: SplitLinesProps) {
  const Tag = motion[as];
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: "shown" }
        : { whileInView: "shown", viewport })}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("block overflow-hidden pb-[0.12em] -mb-[0.12em]", lineClassName)}
        >
          <motion.span
            data-reveal
            className="block will-change-transform"
            variants={{
              hidden: { y: "115%", rotate: 2 },
              shown: {
                y: "0%",
                rotate: 0,
                transition: {
                  duration: 1.15,
                  delay: delay + i * stagger,
                  ease: easeOutExpo,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

type ImageRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "top" | "left" | "right";
  immediate?: boolean;
};

const insets = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
} as const;

export function ImageReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  immediate = false,
}: ImageRevealProps) {
  return (
    <motion.div
      data-reveal
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: insets[from] }}
      {...(immediate
        ? { animate: { clipPath: "inset(0% 0% 0% 0%)" } }
        : { whileInView: { clipPath: "inset(0% 0% 0% 0%)" }, viewport })}
      transition={{ duration: 1.4, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  scale?: number;
};

export function Parallax({ children, className, offset = 60, scale = 1 }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -offset, reduce ? 0 : offset]);
  const s = useTransform(scrollYProgress, [0, 1], [scale, 1]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y, scale: reduce ? 1 : s }} className="size-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgressLine({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={cn("h-px origin-left bg-accent", className)}
    />
  );
}
