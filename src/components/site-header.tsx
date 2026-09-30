'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { MobileNav } from '@/components/mobile-nav';
import { ScrollProgressLine } from '@/components/motion';
import { SiteLogo } from '@/components/site-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ctaHref, emergencyHref, nav, site } from '@/lib/site';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > 480 && latest > previous);
  });

  return (
    <motion.header
      onFocusCapture={() => setHidden(false)}
      animate={{ y: hidden ? '-100%' : '0%' }}
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

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {nav.map((item, i) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'group relative flex items-baseline gap-2 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em]',
                    )}
                  >
                    <span className="text-[0.6rem] text-muted-foreground transition-colors group-hover:text-accent-ink">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-x-0 -bottom-px h-px origin-left bg-accent-ink transition-transform duration-500 ease-out-expo',
                        active
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={site.phone.href}
            className="hidden text-[0.8rem] tracking-wide text-muted-foreground transition-colors hover:text-foreground xl:block"
          >
            {site.phone.display}
          </a>
          <ThemeToggle className="hidden sm:inline-flex" />
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
