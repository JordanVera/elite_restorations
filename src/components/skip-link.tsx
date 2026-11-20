'use client';

import { usePathname } from 'next/navigation';

import { isSpanishPath } from '@/lib/i18n';

export function SkipLink() {
  const pathname = usePathname() || '/';
  const es = isSpanishPath(pathname);
  return (
    <a
      href="#main"
      className="fixed left-4 top-4 z-[100] -translate-y-24 bg-foreground px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-background transition-transform focus:translate-y-0"
    >
      {es ? 'Saltar al contenido' : 'Skip to content'}
    </a>
  );
}
