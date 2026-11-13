'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { cn } from '@/lib/utils';

const subscribe = () => () => {};

export function SiteLogo({
  className,
  onDark = false,
}: {
  className?: string;
  /** Use the light logo on a photo or other dark surface, including before theme is known. */
  onDark?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const light = onDark || (mounted && resolvedTheme === 'dark');

  return (
    <Image
      src={light ? '/images/logo/logo-white.png' : '/images/logo/logo-main.png'}
      alt="Elite Restorations"
      width={light ? 880 : 743}
      height={light ? 398 : 336}
      sizes="220px"
      priority
      className={cn('h-11 w-auto', className)}
    />
  );
}
