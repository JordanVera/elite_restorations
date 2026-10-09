'use client';

import * as React from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

import { Reveal } from '@/components/motion';
import { processSteps } from '@/lib/process';

export function ProcessRail() {
  const ref = React.useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 55%'],
  });
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  const scaleY = reduce ? scrollYProgress : spring;

  return (
    <section
      aria-labelledby="process-heading"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="gutter mx-auto max-w-[120rem]">
        <Reveal>
          <p className="eyebrow text-accent-ink">Process</p>
          <h2 id="process-heading" className="font-display t-lg mt-4">
            The same six steps, every time.
          </h2>
        </Reveal>

        <div className="relative mt-12">
          <div aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-border">
            <motion.div style={{ scaleY }} className="size-full origin-top bg-accent" />
          </div>
          <ol ref={ref} className="pl-8">
            {processSteps.map((step) => (
              <li
                key={step.title}
                className="grid gap-3 border-b border-border py-7 md:grid-cols-[4rem_14rem_1fr] md:items-baseline md:gap-8"
              >
                <span className="eyebrow text-muted-foreground">{step.index}</span>
                <h3 className="font-display text-3xl md:text-4xl">{step.title}</h3>
                <p className="max-w-[60ch] leading-relaxed text-muted-foreground">
                  {step.lead} {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
