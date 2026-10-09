'use client';

import * as React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

import { ImageReveal } from '@/components/motion';
import { Photo } from '@/components/photo';
import type { Img } from '@/lib/images';
import { cn } from '@/lib/utils';

export function DriftPhoto({
  image,
  offset = 3,
  className,
  delay = 0,
  sizes,
  priority = false,
  imageClassName,
}: {
  image: Img;
  /** Vertical travel, as a percentage of the frame. Kept under the 6% bleed. */
  offset?: number;
  className?: string;
  delay?: number;
  sizes: string;
  priority?: boolean;
  imageClassName?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${offset}%`, `${offset}%`]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={{ y: reduce ? 0 : y }}
        className="absolute -inset-[6%] will-change-transform"
      >
        <ImageReveal delay={delay} className="relative size-full">
          <Photo
            image={image}
            sizes={sizes}
            priority={priority}
            className={imageClassName}
          />
        </ImageReveal>
      </motion.div>
    </div>
  );
}
