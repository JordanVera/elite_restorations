"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const PATH_COUNT = 26;

function pathFor(i: number) {
  const dx = i * 14;
  const dy = i * -16;
  return `M${-380 + dx} ${-189 + dy}C${-380 + dx} ${-189 + dy} ${-312 + dx} ${216 + dy} ${152 + dx} ${343 + dy}C${616 + dx} ${470 + dy} ${684 + dx} ${875 + dy} ${684 + dx} ${875 + dy}`;
}

// Deterministic pseudo-random values keep server and client renders identical.
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const paths = Array.from({ length: PATH_COUNT }, (_, i) => ({
  d: pathFor(i),
  duration: 12 + seeded(i, 1) * 10,
  delay: seeded(i, 2) * 8,
  end: 93 + seeded(i, 3) * 8,
}));

export const BackgroundBeams = React.memo(function BackgroundBeams({
  className,
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 flex size-full items-center justify-center", className)}
    >
      <svg
        className="absolute z-0 size-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => (
          <path
            key={`base-${index}`}
            d={path.d}
            stroke="currentColor"
            strokeOpacity="0.09"
            strokeWidth="0.5"
          />
        ))}
        {!reduce &&
          paths.map((path, index) => (
            <path
              key={`beam-${index}`}
              d={path.d}
              stroke={`url(#beam-${index})`}
              strokeOpacity="0.55"
              strokeWidth="0.6"
            />
          ))}
        <defs>
          {paths.map((path, index) => (
            <motion.linearGradient
              id={`beam-${index}`}
              key={`gradient-${index}`}
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", `${path.end}%`],
              }}
              transition={{
                duration: path.duration,
                ease: "easeInOut",
                repeat: Infinity,
                delay: path.delay,
              }}
            >
              <stop stopColor="#d93e39" stopOpacity="0" />
              <stop stopColor="#f2665d" />
              <stop offset="35%" stopColor="#efe9dd" />
              <stop offset="100%" stopColor="#efe9dd" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
});
