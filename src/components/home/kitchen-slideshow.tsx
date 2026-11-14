'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

const slides = [
  { src: 'kitchens/vaulted-waterfall-island.jpg', position: '60% 50%' },
  { src: 'kitchens/crystal-pendants-marble-island.jpg', position: '55% 50%' },
  { src: 'fireplaces/linear-marble-wall.jpg', position: '55% 50%' },
  // { src: 'brass-dome-waterfall-island.jpg', position: '58% 50%' },
];

export function KitchenSlideshow() {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div className="kitchen-slideshow" data-paused={paused}>
        {slides.map((slide, i) => (
          <div
            className={`kitchen-slide kitchen-slide-${i}`}
            key={slide.src}
            {...(i === 0 ? {} : { 'aria-hidden': true })}
          >
            <div className="kitchen-slide-image">
              <Image
                src={`/images/projects/${slide.src}`}
                alt={
                  i === 0
                    ? 'Kitchen remodel in Houston: vaulted waterfall island'
                    : ''
                }
                fill
                sizes="100vw"
                quality={75}
                priority={i === 0}
                fetchPriority={i === 0 ? 'high' : 'low'}
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
