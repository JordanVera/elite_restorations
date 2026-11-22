'use client';

import {
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  SquareStack,
  Users,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';

import { cn } from '@/lib/utils';
import { logoutAction } from '@/server/auth/actions';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/quotes', label: 'Quotes', icon: FileText },
  { href: '/admin/portals', label: 'Customer Portals', icon: SquareStack },
  { href: '/admin/selections', label: 'Material Selections', icon: ClipboardCheck },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
] as const;

const STORAGE_KEY = 'er-admin-sidebar';
const listeners = new Set<() => void>();

function readCollapsed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'collapsed';
  } catch {
    return false;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setCollapsed(value: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, value ? 'collapsed' : 'expanded');
  } catch {}
  listeners.forEach((listener) => listener());
}

type ShellUser = { name: string; email: string; role: 'ADMIN' | 'STAFF' };

export function AdminShell({
  user,
  demoData,
  children,
}: {
  user: ShellUser;
  demoData: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const collapsed = useSyncExternalStore(subscribe, readCollapsed, () => false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const nav = (compact: boolean, onNavigate?: () => void) => (
    <nav className="flex flex-1 flex-col gap-0.5 px-3" aria-label="Admin">
      {NAV.map((item) => {
        const active = 'exact' in item ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            title={compact ? item.label : undefined}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex h-10 items-center gap-3 rounded-[8px] px-3 text-sm text-white/65 transition-colors hover:bg-white/[0.07] hover:text-white',
              active && 'bg-white/[0.1] text-white',
              compact && 'justify-center px-0',
            )}
          >
            <Icon className="size-[18px] shrink-0" aria-hidden />
            {compact ? <span className="sr-only">{item.label}</span> : <span className="truncate">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );

  const footer = (compact: boolean) => (
    <div className="border-t border-white/10 p-3">
      {!compact ? (
        <div className="mb-2 px-3 py-1">
          <p className="truncate text-sm font-medium text-white">{user.name}</p>
          <p className="truncate text-xs text-white/50">
            {user.email} · {user.role === 'ADMIN' ? 'Admin' : 'Staff'}
          </p>
        </div>
      ) : null}
      <form action={logoutAction}>
        <button
          type="submit"
          title={compact ? 'Log out' : undefined}
          className={cn(
            'flex h-10 w-full items-center gap-3 rounded-[8px] px-3 text-sm text-white/65 transition-colors hover:bg-white/[0.07] hover:text-white',
            compact && 'justify-center px-0',
          )}
        >
          <LogOut className="size-[18px]" aria-hidden />
          {compact ? <span className="sr-only">Log out</span> : 'Log out'}
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-dvh lg:flex">
      <aside
        className={cn(
          'sticky top-0 hidden h-dvh shrink-0 flex-col bg-[#141414] text-white transition-[width] duration-300 ease-out lg:flex',
          collapsed ? 'w-[72px]' : 'w-64',
        )}
      >
        <div className={cn('flex h-16 items-center px-5', collapsed && 'justify-center px-0')}>
          {collapsed ? (
            <span className="font-display text-2xl">E</span>
          ) : (
            <Link href="/admin" className="block">
              <Image src="/images/logo/logo-white.png" alt="Elite Restorations" width={110} height={50} className="h-auto w-[104px]" />
            </Link>
          )}
        </div>
        {nav(collapsed)}
        <div className="px-3 pb-2">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'flex h-9 w-full items-center gap-3 rounded-[8px] px-3 text-xs text-white/45 hover:bg-white/[0.07] hover:text-white',
              collapsed && 'justify-center px-0',
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
            {collapsed ? null : 'Collapse'}
          </button>
        </div>
        {footer(collapsed)}
      </aside>

      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-[#141414] px-4 text-white lg:hidden">
        <Link href="/admin">
          <Image src="/images/logo/logo-white.png" alt="Elite Restorations" width={88} height={40} className="h-auto w-[84px]" />
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex size-10 items-center justify-center rounded-[8px] hover:bg-white/10"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="size-5" />
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Admin menu">
          <button type="button" className="absolute inset-0 bg-black/50" aria-label="Close menu" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-[#141414] text-white shadow-2xl">
            <div className="flex h-14 items-center justify-between px-4">
              <Image src="/images/logo/logo-white.png" alt="Elite Restorations" width={88} height={40} className="h-auto w-[84px]" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex size-10 items-center justify-center rounded-[8px] hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            {nav(false, () => setMobileOpen(false))}
            {footer(false)}
          </div>
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        {demoData ? (
          <div className="border-b border-amber-700/20 bg-amber-50 px-4 py-2 text-center text-[0.8rem] text-amber-900 md:px-8">
            Demo data, not from Jobber. Customers and quotes shown here are mock records until Jobber is connected and synced.
          </div>
        ) : null}
        <main id="main" className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
