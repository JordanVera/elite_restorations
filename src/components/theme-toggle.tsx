'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

import './theme-toggle.css';

const subscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [ready, setReady] = React.useState(false);
  const isDark = !mounted || resolvedTheme !== 'light';

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      data-theme={isDark ? 'dark' : 'light'}
      data-ready={ready ? 'true' : 'false'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'theme-switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full',
        className,
      )}
    >
      <span className="theme-orb" aria-hidden />
    </button>
  );
}
