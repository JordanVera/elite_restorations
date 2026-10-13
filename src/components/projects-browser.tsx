'use client';

import * as React from 'react';
import { useReducedMotion } from 'motion/react';
import { useTheme } from 'next-themes';

import { Photo } from '@/components/photo';
import { Button } from '@/components/ui/button';
import { ChromaticImage } from '@/components/ui/chromatic-image';
import type { Img } from '@/lib/images';
import { cn } from '@/lib/utils';

export type BrowserPhoto = {
  id: string;
  category: string;
  image: Img;
};

const ALL = 'All';
const BATCH = 24;

export function ProjectsBrowser({
  photos,
  categories,
}: {
  photos: BrowserPhoto[];
  categories: string[];
}) {
  const [active, setActive] = React.useState(ALL);
  const [visibleCount, setVisibleCount] = React.useState(BATCH);
  const [liveId, setLiveId] = React.useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const pointer = React.useRef({ x: 0.5, y: 0.5 });
  const hideTimer = React.useRef<number | undefined>(undefined);
  const visible =
    active === ALL ? photos : photos.filter((p) => p.category === active);
  const displayed = visible.slice(0, visibleCount);
  const hasMore = visibleCount < visible.length;
  const counts = React.useMemo(() => {
    const map = new Map<string, number>([[ALL, photos.length]]);
    for (const p of photos) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, [photos]);

  React.useEffect(() => {
    setVisibleCount(BATCH);
    setLiveId(null);
  }, [active]);

  React.useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  const rememberPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    pointer.current = {
      x: (event.clientX - bounds.left) / bounds.width,
      y: 1 - (event.clientY - bounds.top) / bounds.height,
    };
  };

  const activate = (id: string) => {
    if (reduceMotion) return;
    window.clearTimeout(hideTimer.current);
    setLiveId((current) => (current === id ? current : id));
  };

  const deactivate = (id: string) => {
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      setLiveId((current) => (current === id ? null : current));
    }, 520);
  };

  return (
    <div>
      <div
        role="group"
        aria-label="Filter photos by category"
        className="flex flex-wrap gap-x-8 gap-y-3 border-b border-border pb-6"
      >
        {[ALL, ...categories].map((category) => {
          const selected = category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(category)}
              className={cn(
                'group relative py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-colors',
                selected
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {category}
              <sup className="ml-1.5 text-[0.6rem] text-accent-ink">
                {counts.get(category) ?? 0}
              </sup>
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-0 -bottom-px h-px origin-left bg-accent-ink transition-transform duration-500 ease-out-expo',
                  selected
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100',
                )}
              />
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {displayed.length} of {visible.length}{' '}
        {visible.length === 1 ? 'photo' : 'photos'}
        {active === ALL ? '' : ` in ${active}`}
      </p>

      <ul
        key={active}
        className="mt-10 gap-2 sm:columns-2 lg:columns-3 xl:columns-4"
      >
        {displayed.map((photo, i) => (
          <li
            key={photo.id}
            className="anim-fade-up mb-2 break-inside-avoid"
            style={{ ['--d' as string]: `${Math.min(i, 12) * 0.04}s` }}
          >
            <div
              className="relative"
              onPointerEnter={(event) => {
                rememberPointer(event);
                activate(photo.id);
              }}
              onPointerMove={(event) => {
                rememberPointer(event);
                activate(photo.id);
              }}
              onPointerLeave={() => deactivate(photo.id)}
            >
              <Photo
                image={photo.image}
                intrinsic
                sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 94vw"
              />
              {liveId === photo.id ? (
                <ChromaticImage
                  src={photo.image.src}
                  alt={photo.image.alt}
                  seedPointer={pointer}
                  backgroundColor={
                    resolvedTheme === 'dark' ? '#0a0a0b' : '#ece6da'
                  }
                  className="absolute inset-0 size-full bg-transparent dark:bg-transparent"
                />
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="mt-14 flex flex-col items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setVisibleCount((n) => n + BATCH)}
          >
            Load more
          </Button>
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
            {visible.length - visibleCount} more{' '}
            {visible.length - visibleCount === 1 ? 'photo' : 'photos'}
          </p>
        </div>
      )}
    </div>
  );
}
