'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { NavigationMenu } from 'radix-ui';
import { MobileNav } from '@/components/mobile-nav';
import { ScrollProgressLine } from '@/components/motion';
import { SiteLogo } from '@/components/site-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ctaHref, nav, site, type NavItem } from '@/lib/site';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [menuValue, setMenuValue] = React.useState('');

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > 480 && latest > previous);
  });

  return (
    <motion.header
      onFocusCapture={() => setHidden(false)}
      animate={{ y: hidden && !menuValue ? '-100%' : '0%' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500',
        scrolled
          ? 'border-b border-border bg-background/92 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="gutter mx-auto flex h-20 max-w-[120rem] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Elite Restorations, home"
          className="shrink-0"
        >
          <SiteLogo />
        </Link>

        <NavigationMenu.Root
          aria-label="Primary"
          delayDuration={120}
          value={menuValue}
          onValueChange={setMenuValue}
          className="relative hidden lg:block"
        >
          <NavigationMenu.List className="flex items-center gap-6 xl:gap-10">
            {nav.map((item, i) => (
              <NavEntry
                key={item.href}
                item={item}
                index={i}
                pathname={pathname}
              />
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex items-center gap-4">
          <a
            href={site.phone.href}
            className="hidden text-[0.8rem] tracking-wide text-muted-foreground transition-colors hover:text-foreground xl:block"
          >
            {site.phone.display}
          </a>
          <ThemeToggle className="hidden sm:inline-flex cursor-pointer" />
          <Button
            asChild
            variant="accent"
            size="default"
            className="hidden lg:inline-flex"
          >
            <Link href={ctaHref}>
              Request estimate
              <ArrowUpRight className="arrow" aria-hidden />
            </Link>
          </Button>
          <MobileNav className="lg:hidden" />
        </div>
      </div>
      <ScrollProgressLine className="absolute inset-x-0 bottom-0" />
    </motion.header>
  );
}

function NavEntry({
  item,
  index,
  pathname,
}: {
  item: NavItem;
  index: number;
  pathname: string;
}) {
  const active = pathname.startsWith(item.href);

  if (!item.children?.length) {
    return (
      <NavigationMenu.Item>
        <NavigationMenu.Link asChild active={active}>
          <Link
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className="group relative flex items-baseline gap-2 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em]"
          >
            <NavIndex index={index} />
            {item.label}
            <NavUnderline active={active} />
          </Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    );
  }

  return (
    <NavigationMenu.Item value={item.href} className="relative">
      <NavigationMenu.Trigger className="group relative flex items-baseline gap-2 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em]">
        <NavIndex index={index} />
        {item.label}
        <ChevronDown
          aria-hidden
          className="size-3 translate-y-px transition-transform duration-500 ease-out-expo group-data-[state=open]:rotate-180"
        />
        <NavUnderline active={active} openAware />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="absolute top-full left-1/2 z-50 w-44 -translate-x-1/2 pt-7">
        <ul className="border border-border bg-background p-1.5 shadow-[0_24px_50px_-28px_rgba(22,19,15,0.55)]">
          {item.children.map((child) => {
            const childActive = pathname.startsWith(child.href);
            return (
              <li key={child.href}>
                <NavigationMenu.Link asChild active={childActive}>
                  <Link
                    href={child.href}
                    aria-current={childActive ? 'page' : undefined}
                    className={cn(
                      'block px-3 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors hover:text-accent-ink',
                      childActive && 'text-accent-ink',
                    )}
                  >
                    {child.label}
                  </Link>
                </NavigationMenu.Link>
              </li>
            );
          })}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

function NavIndex({ index }: { index: number }) {
  return (
    <span className="hidden text-[0.6rem] text-muted-foreground transition-colors group-hover:text-accent-ink group-data-[state=open]:text-accent-ink xl:inline">
      {String(index + 1).padStart(2, '0')}
    </span>
  );
}

function NavUnderline({
  active,
  openAware = false,
}: {
  active: boolean;
  openAware?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute inset-x-0 -bottom-px h-px origin-left bg-accent-ink transition-transform duration-500 ease-out-expo',
        active
          ? 'scale-x-100'
          : openAware
            ? 'scale-x-0 group-hover:scale-x-100 group-data-[state=open]:scale-x-100'
            : 'scale-x-0 group-hover:scale-x-100',
      )}
    />
  );
}
