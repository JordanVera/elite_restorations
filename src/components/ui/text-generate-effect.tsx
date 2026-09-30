"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";

import { cn } from "@/lib/utils";

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.6,
  stepDelay = 0.07,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  stepDelay?: number;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, margin: "0px 0px -10% 0px" });
  const wordList = words.split(" ");

  useEffect(() => {
    if (!inView) return;
    animate(
      "span",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration, delay: stagger(stepDelay) },
    );
  }, [inView, animate, filter, duration, stepDelay]);

  return (
    <div ref={scope} className={cn(className)}>
      {wordList.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          data-reveal
          className="inline-block opacity-0"
          style={{ filter: filter ? "blur(10px)" : "none" }}
        >
          {word}
          {idx < wordList.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </div>
  );
}
