'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Phone } from 'lucide-react';
import * as NavigationMenu from 'radix-ui/navigation-menu';
import { MobileNav } from '@/components/mobile-nav';
import { ScrollProgressLine } from '@/components/scroll-progress';
import { SiteLogo } from '@/components/site-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { esServiceNames, isSpanishPath, serviceHref } from '@/lib/i18n';
import { LanguageSwitch } from '@/components/language-switch';
import { isLocalLandingPath } from '@/lib/local-paths';
import {
  isServicePagePath,
  serviceGroups,
  servicesInGroup,
} from '@/lib/services';
import { ctaHref, nav, site, type NavItem } from '@/lib/site';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname() || '/';
  const es = isSpanishPath(pathname);
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [menuValue, setMenuValue] = React.useState('');
  const overHomeHero = pathname === '/' && !scrolled && !menuValue;

  React.useEffect(() => {
    let previous = window.scrollY;
    const onScroll = () => {
      const latest = window.scrollY;
      setScrolled(latest > 40);
      setHidden(latest > 480 && latest > previous);
      previous = latest;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={cn(
        'transition-transform duration-500 ease-out-expo',
        hidden && !menuValue && '-translate-y-full',
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500',
        menuValue
          ? 'border-b border-border bg-background'
          : scrolled
            ? 'border-b border-border bg-background/92 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        overHomeHero && 'text-white dark:text-foreground',
      )}
    >
      <div className="gutter mx-auto flex h-20 max-w-[120rem] items-center justify-between gap-6">
        <Link
          href={es ? '/es' : '/'}
          aria-label="Elite Restorations, home"
          className="shrink-0"
        >
          <SiteLogo onDark={overHomeHero} />
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
                item={es ? localizeNavItem(item) : item}
                index={i}
                pathname={pathname}
              />
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex items-center gap-4">
          <a
            href={site.phone.href}
            className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap text-[0.8rem] tracking-wide transition-colors hover:text-accent-ink lg:hidden 2xl:inline-flex 2xl:min-w-0 2xl:justify-start"
          >
            <Phone className="size-4 2xl:hidden" aria-hidden />
            <span className="hidden 2xl:inline">{site.phone.display}</span>
            <span className="sr-only 2xl:hidden">
              {es ? 'Llamar' : 'Call'} {site.phone.display}
            </span>
          </a>
          <a
            href={site.phone.sms}
            className="hidden text-[0.72rem] font-medium uppercase tracking-[0.16em] hover:text-accent-ink sm:inline"
          >
            {es ? 'Envíanos un texto' : 'Text us'}
          </a>
          <LanguageSwitch className="hidden sm:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex cursor-pointer" />
          <Button
            asChild
            variant="accent"
            size="default"
            className="hidden lg:inline-flex"
          >
            <Link href={es ? '/es/contact' : ctaHref}>
              {es ? 'Pedir un estimado' : 'Request estimate'}
              <ArrowUpRight className="arrow" aria-hidden />
            </Link>
          </Button>
          <MobileNav className="lg:hidden" />
        </div>
      </div>
      <ScrollProgressLine className="absolute inset-x-0 bottom-0" />
    </header>
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

  if (item.href === '/services') {
    return <ServicesNav index={index} pathname={pathname} />;
  }

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

const esNavLabels: Record<string, string> = {
  '/services': 'Servicios',
  '/projects': 'Proyectos',
  '/resources': 'Recursos',
  '/resources/homeowners': 'Propietarios',
  '/resources/realtors': 'Agentes inmobiliarios',
  '/about': 'Nosotros',
  '/contact': 'Contacto',
  '/emergency': 'Emergencia',
};

function localizeNavItem(item: NavItem): NavItem {
  const href =
    item.href === '/contact'
      ? '/es/contact'
      : item.href === '/emergency'
        ? '/es/emergency'
        : item.href;
  return {
    ...item,
    href,
    label: esNavLabels[item.href] ?? item.label,
    children: item.children?.map((child) => ({
      ...child,
      label: esNavLabels[child.href] ?? child.label,
    })),
  };
}

function ServicesNav({ index, pathname }: { index: number; pathname: string }) {
  const es = isSpanishPath(pathname);
  const bare = es && pathname.startsWith('/es/') ? pathname.slice(3) : pathname;
  const active =
    bare.startsWith('/services') ||
    isServicePagePath(bare) ||
    isLocalLandingPath(bare) ||
    (es && isServicePagePath(bare));

  return (
    <NavigationMenu.Item value="/services">
      <NavigationMenu.Trigger className="group relative flex items-baseline gap-2 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] after:absolute after:inset-x-0 after:top-full after:h-8 after:content-['']">
        <NavIndex index={index} />
        {es ? 'Servicios' : 'Services'}
        <ChevronDown
          aria-hidden
          className="size-3 translate-y-px transition-transform duration-500 ease-out-expo group-data-[state=open]:rotate-180"
        />
        <NavUnderline active={active} openAware />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="fixed inset-x-0 top-20 z-50">
        <div className="border-b border-border bg-background shadow-[0_28px_50px_-32px_rgba(22,19,15,0.7)]">
          <div className="gutter mx-auto max-w-[120rem] py-8">
            <div className="flex items-center justify-between gap-6">
              <p className="eyebrow text-muted-foreground">All services</p>
              <NavigationMenu.Link asChild>
                <Link
                  href={es ? '/es' : '/services'}
                  className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors hover:text-accent-ink"
                >
                  {es ? 'Ver la lista' : 'View the full list'}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </NavigationMenu.Link>
            </div>
            <div className="mt-7 grid grid-cols-4 gap-x-10 gap-y-8">
              {serviceGroups.map((group) => (
                <div key={group}>
                  <p className="eyebrow text-accent-ink">{group}</p>
                  <ul className="mt-4">
                    {servicesInGroup(group).map((service) => {
                      const href = serviceHref(service.slug, es ? 'es' : 'en');
                      const current = pathname === href;
                      const label =
                        es && service.slug in esServiceNames
                          ? esServiceNames[service.slug as keyof typeof esServiceNames]
                          : service.name;
                      return (
                        <li key={service.slug}>
                          <NavigationMenu.Link asChild active={current}>
                            <Link
                              href={href}
                              aria-current={current ? 'page' : undefined}
                              className={cn(
                                'block py-1.5 text-sm leading-snug transition-colors hover:text-accent-ink',
                                current && 'text-accent-ink',
                              )}
                            >
                              {label}
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

function NavIndex({ index }: { index: number }) {
  return (
    <span className="hidden text-[0.6rem] text-accent-ink transition-colors group-hover:text-accent-ink group-data-[state=open]:text-accent-ink xl:inline">
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
