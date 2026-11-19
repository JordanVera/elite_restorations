'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { cn } from '@/lib/utils';

const subscribe = () => () => {};

export function SiteLogo({
  className,
  onDark = false,
}: {
  className?: string;
  /** Light wordmark before theme and scroll are known. The header passes this on the homepage. */
  onDark?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const ref = useRef<HTMLSpanElement>(null);
  const [overHero, setOverHero] = useState(onDark);

  useEffect(() => {
    const header = ref.current?.closest('header');
    if (!header) return;
    const sync = () => {
      const home = header.getAttribute('data-home') === 'true';
      const scrolled = header.getAttribute('data-scrolled') === 'true';
      const menu = !!header.querySelector(
        '[data-nav-item]:is(:hover, :focus-within, [data-open])',
      );
      setOverHero(home && !scrolled && !menu);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(header, {
      attributes: true,
      attributeFilter: ['data-scrolled', 'data-home'],
    });
    header.addEventListener('pointerover', sync);
    header.addEventListener('pointerout', sync);
    header.addEventListener('focusin', sync);
    header.addEventListener('focusout', sync);
    return () => {
      observer.disconnect();
      header.removeEventListener('pointerover', sync);
      header.removeEventListener('pointerout', sync);
      header.removeEventListener('focusin', sync);
      header.removeEventListener('focusout', sync);
    };
  }, []);

  const light = overHero || (mounted && resolvedTheme === 'dark');

  return (
    <span ref={ref} className="inline-flex">
      <Image
        src={light ? '/images/logo/logo-white.png' : '/images/logo/logo-main.png'}
        alt="Elite Restorations"
        width={light ? 880 : 743}
        height={light ? 398 : 336}
        sizes="220px"
        className={cn('h-11 w-auto', className)}
      />
    </span>
  );
}
