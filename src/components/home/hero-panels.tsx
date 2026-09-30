'use client';

import * as React from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

import { Photo } from '@/components/photo';
import type { Img } from '@/lib/images';

type Panel = { image: Img; label: string };

const desktopQuery = '(min-width: 1024px)';

function subscribeToDesktop(onChange: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getIsDesktop() {
  return window.matchMedia(desktopQuery).matches;
}

export function HeroPanels({
  primary,
  secondary,
  tertiary,
}: {
  primary: Panel;
  secondary: Panel;
  tertiary: Panel;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isDesktop = React.useSyncExternalStore(
    subscribeToDesktop,
    getIsDesktop,
    () => false,
  );
  const reduce = useReducedMotion();
  const parallaxEnabled = isDesktop && !reduce;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const yPrimary = useTransform(
    scrollYProgress,
    [0, 1],
    [0, parallaxEnabled ? -48 : 0],
  );
  const ySecondary = useTransform(
    scrollYProgress,
    [0, 1],
    [0, parallaxEnabled ? 52 : 0],
  );
  const yTertiary = useTransform(
    scrollYProgress,
    [0, 1],
    [0, parallaxEnabled ? -24 : 0],
  );

  return (
    <div
      ref={containerRef}
      aria-hidden={false}
      className="relative z-10 mt-14 h-[112vw] min-h-96 max-h-152 w-full lg:absolute lg:top-28 lg:right-[max(1.25rem,4vw)] lg:mt-0 lg:h-[clamp(27rem,calc(100dvh-13rem),46rem)] lg:min-h-0 lg:max-h-none lg:w-[min(41vw,46rem)]"
    >
      <motion.figure
        style={{ y: yPrimary }}
        className="absolute right-0 top-0 z-10 h-[76%] w-[62%]"
      >
        <div
          className="anim-clip-up size-full overflow-hidden"
          style={{ ['--d' as string]: '0.35s' }}
        >
          <div
            className="anim-settle relative size-full"
            style={{ ['--d' as string]: '0.35s' }}
          >
            <Photo
              image={primary.image}
              priority
              sizes="(min-width: 1024px) 26vw, 62vw"
              quality={80}
            />
          </div>
        </div>
        <figcaption
          className="eyebrow anim-fade-up absolute -bottom-7 right-0 text-muted-foreground"
          style={{ ['--d' as string]: '1.5s' }}
        >
          {primary.label}
        </figcaption>
      </motion.figure>

      <motion.figure
        style={{ y: ySecondary }}
        className="absolute bottom-[4%] left-0 z-20 h-[46%] w-[44%]"
      >
        <div
          className="anim-clip-up size-full overflow-hidden border-[6px] border-background"
          style={{ ['--d' as string]: '0.65s' }}
        >
          <div
            className="anim-settle relative size-full"
            style={{ ['--d' as string]: '0.65s' }}
          >
            <Photo
              image={secondary.image}
              sizes="(min-width: 1024px) 18vw, 44vw"
            />
          </div>
        </div>
        <figcaption
          className="eyebrow anim-fade-up absolute -bottom-7 left-1.5 text-muted-foreground"
          style={{ ['--d' as string]: '1.7s' }}
        >
          {secondary.label}
        </figcaption>
      </motion.figure>

      <motion.figure
        style={{ y: yTertiary }}
        className="absolute bottom-[12%] right-[-4%] z-20 hidden h-[24%] w-[36%] lg:block"
      >
        <div
          className="anim-clip-left size-full overflow-hidden border-[6px] border-background"
          style={{ ['--d' as string]: '0.95s' }}
        >
          <div
            className="anim-settle relative size-full"
            style={{ ['--d' as string]: '0.95s' }}
          >
            <Photo
              image={tertiary.image}
              sizes="(min-width: 1024px) 15vw, 36vw"
            />
          </div>
        </div>
        <figcaption
          className="eyebrow anim-fade-up absolute -bottom-7 right-1.5 text-muted-foreground"
          style={{ ['--d' as string]: '1.9s' }}
        >
          {tertiary.label}
        </figcaption>
      </motion.figure>
    </div>
  );
}
