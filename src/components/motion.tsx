import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
};

/**
 * Below-the-fold entrance. CSS only, so the animation library stays off the
 * first load. `data-reveal` is forced visible when motion is reduced.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div
      data-reveal=""
      className={className}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

type SplitLinesProps = {
  lines: readonly ReactNode[];
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
  as: Tag = "div",
}: SplitLinesProps) {
  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("block", lineClassName)}
          {...(immediate
            ? {}
            : {
                "data-reveal": "",
                style: { animationDelay: `${delay + i * stagger}s` },
              })}
        >
          {line}
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "top" | "left" | "right";
  immediate?: boolean;
};

export function ImageReveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: ImageRevealProps) {
  if (immediate) {
    return <div className={cn("overflow-hidden", className)}>{children}</div>;
  }
  return (
    <div
      data-reveal=""
      className={cn("overflow-hidden", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
