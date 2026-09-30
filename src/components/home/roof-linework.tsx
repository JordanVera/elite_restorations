"use client";

import { motion } from "motion/react";

export function RoofLinework({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 300"
      fill="none"
      aria-hidden
      focusable="false"
      className={className}
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    >
      {[
        "M10 290 240 30l230 260H10Z",
        "M62 290 240 92l178 198",
        "M114 290 240 154l126 136",
        "M332 92V30h44v106",
      ].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 2.2, delay: i * 0.25, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </svg>
  );
}
