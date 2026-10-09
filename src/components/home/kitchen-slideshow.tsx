'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

const slides = [
  { src: 'vaulted-waterfall-island.jpg', position: '60% 50%' },
  { src: 'crystal-pendants-marble-island.jpg', position: '55% 50%' },
  { src: 'lantern-pendants-beamed-kitchen.jpg', position: '55% 50%' },
  // { src: 'brass-dome-waterfall-island.jpg', position: '58% 50%' },
];

export function KitchenSlideshow() {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div
        className="kitchen-slideshow"
        data-paused={paused}
        aria-hidden="true"
      >
        {slides.map((slide, i) => (
          <div className={`kitchen-slide kitchen-slide-${i}`} key={slide.src}>
            <div className="kitchen-slide-image">
              <Image
                src={`/images/projects/kitchens/${slide.src}`}
                alt=""
                fill
                sizes="100vw"
                quality={85}
                priority={i === 0}
                loading={i === 0 ? undefined : 'eager'}
                style={{ objectFit: 'cover', objectPosition: slide.position }}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        className="kitchen-motion"
        type="button"
        aria-label={
          paused ? 'Resume background slideshow' : 'Pause background slideshow'
        }
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? (
          <Play size={13} aria-hidden />
        ) : (
          <Pause size={13} aria-hidden />
        )}
        <span>{paused ? 'Resume' : 'Pause'}</span>
      </button>
    </>
  );
}
