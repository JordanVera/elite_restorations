"use client";

import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

type MovingBorderButtonProps = {
  as?: React.ElementType;
  children: React.ReactNode;
  containerClassName?: string;
  borderClassName?: string;
  className?: string;
  duration?: number;
} & Record<string, unknown>;

export function MovingBorderButton({
  as: Component = "button",
  children,
  containerClassName,
  borderClassName,
  className,
  duration = 4200,
  ...otherProps
}: MovingBorderButtonProps) {
  return (
    <Component
      className={cn("group/mb relative block overflow-hidden bg-transparent p-px", containerClassName)}
      {...otherProps}
    >
      <div className="absolute inset-0">
        <MovingBorder duration={duration}>
          <div
            className={cn(
              "size-24 bg-[radial-gradient(var(--accent-ink)_35%,transparent_65%)] opacity-90",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center bg-background text-foreground transition-colors duration-500 group-hover/mb:bg-surface-2",
          className,
        )}
      >
        {children}
      </div>
    </Component>
  );
}

export function MovingBorder({
  children,
  duration = 3000,
}: {
  children: React.ReactNode;
  duration?: number;
}) {
  const pathRef = React.useRef<SVGRectElement>(null);
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    if (reduce) return;
    const length = pathRef.current?.getTotalLength();
    if (length) {
      progress.set(((time * length) / duration) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        aria-hidden
      >
        <rect fill="none" width="100%" height="100%" ref={pathRef} />
      </svg>
      <motion.div style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}>
        {children}
      </motion.div>
    </>
  );
}
