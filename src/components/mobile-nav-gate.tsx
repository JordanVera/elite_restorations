'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type MobileNavComponent = typeof import('./mobile-nav').MobileNav;

let panelPromise: Promise<MobileNavComponent> | null = null;

function loadPanel() {
  panelPromise ??= import('./mobile-nav').then((mod) => mod.MobileNav);
  return panelPromise;
}

export function MobileNavGate({ className }: { className?: string }) {
  const pathname = usePathname() || '/';
  const es = pathname === '/es' || pathname.startsWith('/es/');
  const [Panel, setPanel] = useState<MobileNavComponent | null>(null);

  const open = () => {
    void loadPanel().then((Comp) => setPanel(() => Comp));
  };

  if (Panel) return <Panel className={className} initialOpen />;

  return (
    <button
      type="button"
      aria-label={es ? 'Abrir el menú' : 'Open menu'}
      className={cn(
        'group inline-flex h-11 items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em]',
        className,
      )}
      onPointerDown={open}
      onClick={open}
    >
      {es ? 'Menú' : 'Menu'}
      <span aria-hidden className="flex w-6 flex-col gap-[6px]">
        <span className="h-px w-full bg-current transition-all group-hover:w-4" />
        <span className="h-px w-4 bg-current transition-all group-hover:w-full" />
      </span>
    </button>
  );
}
