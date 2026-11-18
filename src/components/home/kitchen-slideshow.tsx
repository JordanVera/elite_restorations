'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const slides = [
  {
    src: 'kitchens/vaulted-waterfall-island.jpg',
    position: '60% 50%',
    alt: 'Kitchen remodel in Houston with a vaulted ceiling and a waterfall island',
  },
  {
    src: 'kitchens/crystal-pendants-marble-island.jpg',
    position: '55% 50%',
    alt: 'Houston kitchen remodel with a marble island and crystal pendants',
  },
  {
    src: 'fireplaces/linear-marble-wall.jpg',
    position: '55% 50%',
    alt: 'Linear marble fireplace wall in a Houston living room',
  },
];

export function KitchenSlideshow({ locale = "en" }: { locale?: "en" | "es" }) {
  const [paused, setPaused] = useState(false);
  const [restAt, setRestAt] = useState<number | null>(null);
  const es = locale === "es";

  useEffect(() => {
    let timeout = 0;
    let idle = 0;
    let cancelled = false;
    const reveal = () => {
      if (cancelled) return;
      const start = () => {
        if (!cancelled) setRestAt(performance.now() / 1000);
      };
      const idleWindow = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      };
      if (idleWindow.requestIdleCallback) {
        idle = idleWindow.requestIdleCallback(start, { timeout: 1500 });
      } else {
        timeout = window.setTimeout(start, 1);
      }
    };
    if (document.readyState === 'complete') reveal();
    else window.addEventListener('load', reveal, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', reveal);
      if (timeout) window.clearTimeout(timeout);
      if (idle) window.cancelIdleCallback(idle);
    };
  }, []);

  return (
    <>
      <div
        className="kitchen-slideshow"
        data-paused={paused}
        style={{ ['--slide-shift' as string]: `${restAt ?? 0}s` }}
      >
        {slides.map((slide, i) => {
          if (i > 0 && restAt === null) return null;
          return (
            <div
              className={`kitchen-slide kitchen-slide-${i}`}
              key={slide.src}
              {...(i === 0 ? {} : { 'aria-hidden': true })}
            >
              <div className="kitchen-slide-image">
                <Image
                  src={`/images/projects/${slide.src}`}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  quality={75}
                  priority={i === 0}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  loading={i === 0 ? undefined : 'lazy'}
                  style={{ objectFit: 'cover', objectPosition: slide.position }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="kitchen-motion"
        type="button"
        aria-label={
          paused
            ? es
              ? "Reanudar el carrusel de fondo"
              : "Resume background slideshow"
            : es
              ? "Pausar el carrusel de fondo"
              : "Pause background slideshow"
        }
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? (
          <Play size={13} aria-hidden />
        ) : (
          <Pause size={13} aria-hidden />
        )}
        <span>{paused ? (es ? "Reanudar" : "Resume") : es ? "Pausa" : "Pause"}</span>
      </button>
    </>
  );
}
