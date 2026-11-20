'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HeaderChrome } from '@/components/header-chrome';
import { IconArrowUpRight, IconChevronDown, IconPhone } from '@/components/icons';
import { LanguageSwitch } from '@/components/language-switch';
import { MobileNavGate } from '@/components/mobile-nav-gate';
import { ScrollProgressLine } from '@/components/scroll-progress';
import { SiteLogo } from '@/components/site-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button-variants';
import { brandServiceLinks } from '@/lib/brand-nav';
import { esGroupNames, esServiceNames, isSpanishPath, serviceHref } from '@/lib/i18n';
import { isLocalLandingPath } from '@/lib/local-paths';
import {
  isServicePagePath,
  serviceGroups,
  servicesInGroup,
} from '@/lib/service-nav';
import { ctaHref, nav, site, type NavItem } from '@/lib/site';
import { cx } from '@/lib/cx';

import './site-header.css';

export function SiteHeader() {
  const pathname = usePathname() || '/';
  const es = isSpanishPath(pathname);

  return (
    <HeaderChrome home={pathname === '/'}>
      <div className="gutter mx-auto flex h-20 max-w-[120rem] items-center justify-between gap-3 sm:gap-6">
        <Link
          href={es ? '/es' : '/'}
          aria-label="Elite Restorations, home"
          className="shrink-0"
        >
          <SiteLogo onDark={pathname === '/'} eager />
        </Link>

        <nav aria-label="Primary" className="relative hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-10">
            {nav.map((item, i) => (
              <NavEntry
                key={item.href}
                item={es ? localizeNavItem(item) : item}
                index={i}
                pathname={pathname}
              />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={site.phone.href}
            className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap text-[0.8rem] tracking-wide transition-colors hover:text-accent-ink lg:hidden 2xl:inline-flex 2xl:min-w-0 2xl:justify-start"
          >
            <IconPhone className="size-4 2xl:hidden" />
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
          <LanguageSwitch className="inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex cursor-pointer" />
          <Link
            href={es ? '/es/contact' : ctaHref}
            data-slot="button"
            data-variant="accent"
            data-size="default"
            className={cx(buttonVariants({ variant: 'accent' }), 'hidden lg:inline-flex')}
          >
            {es ? 'Pedir un estimado' : 'Request estimate'}
            <IconArrowUpRight className="arrow" />
          </Link>
          <MobileNavGate className="lg:hidden" />
        </div>
      </div>
      <ScrollProgressLine className="absolute inset-x-0 bottom-0" />
    </HeaderChrome>
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
      <li>
        <Link
          href={item.href}
          aria-current={active ? 'page' : undefined}
          className="group relative flex items-baseline gap-2 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em]"
        >
          <NavIndex index={index} />
          {item.label}
          <NavUnderline active={active} />
        </Link>
      </li>
    );
  }

  return (
    <li className="site-nav-item group relative" data-nav-item="">
      <button
        type="button"
        data-nav-trigger=""
        aria-expanded="false"
        aria-haspopup="true"
        className="relative flex items-baseline gap-2 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] after:absolute after:inset-x-0 after:top-full after:h-8 after:content-['']"
      >
        <NavIndex index={index} />
        {item.label}
        <IconChevronDown className="site-nav-chevron size-3 translate-y-px transition-transform duration-500 ease-out-expo" />
        <NavUnderline active={active} openAware />
      </button>
      <div className="site-nav-panel absolute top-full left-1/2 z-50 w-44 -translate-x-1/2 pt-7">
        <ul className="border border-border bg-background p-1.5 shadow-[0_24px_50px_-28px_rgba(22,19,15,0.55)]">
          {item.children.map((child) => {
            const childActive = pathname.startsWith(child.href);
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  aria-current={childActive ? 'page' : undefined}
                  className={cx(
                    'block px-3 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors hover:text-accent-ink',
                    childActive && 'text-accent-ink',
                  )}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

const esNavLabels: Record<string, string> = {
  '/services': 'Servicios',
  '/projects': 'Proyectos',
  '/resources': 'Recursos',
  '/resources/homeowners': 'Propietarios',
  '/resources/realtors': 'Agentes inmobiliarios',
  '/about': 'Nosotros',
  '/blog': 'Blog',
  '/contact': 'Contacto',
  '/emergency': 'Emergencia',
};

function localizeNavItem(item: NavItem): NavItem {
  const href =
    item.href === '/contact'
      ? '/es/contact'
      : item.href === '/emergency'
        ? '/es/emergency'
        : item.href === '/blog'
          ? '/es/blog'
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
    (es && isServicePagePath(bare)) ||
    brandServiceLinks.some((item) => pathname === item.href || pathname === item.esHref);

  return (
    <li className="site-nav-item group relative" data-nav-item="">
      <button
        type="button"
        data-nav-trigger=""
        aria-expanded="false"
        aria-haspopup="true"
        className="relative flex items-baseline gap-2 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] after:absolute after:inset-x-0 after:top-full after:h-8 after:content-['']"
      >
        <NavIndex index={index} />
        {es ? 'Servicios' : 'Services'}
        <IconChevronDown className="site-nav-chevron size-3 translate-y-px transition-transform duration-500 ease-out-expo" />
        <NavUnderline active={active} openAware />
      </button>
      <div className="site-nav-panel fixed inset-x-0 top-20 z-50">
        <div className="border-b border-border bg-background shadow-[0_28px_50px_-32px_rgba(22,19,15,0.7)]">
          <div className="gutter mx-auto max-w-[120rem] py-8">
            <div className="flex items-center justify-between gap-6">
              <p className="eyebrow text-muted-foreground">{es ? 'Todos los servicios' : 'All services'}</p>
              <Link
                href={es ? '/es' : '/services'}
                className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors hover:text-accent-ink"
              >
                {es ? 'Ver la lista' : 'View the full list'}
                <IconArrowUpRight className="size-3.5" />
              </Link>
            </div>
            <div className="mt-7 grid grid-cols-4 gap-x-10 gap-y-8">
              {serviceGroups.map((group) => (
                <div key={group}>
                  <p className="eyebrow text-accent-ink">{es ? (esGroupNames[group] ?? group) : group}</p>
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
                          <Link
                            href={href}
                            aria-current={current ? 'page' : undefined}
                            className={cx(
                              'block py-1.5 text-sm leading-snug transition-colors hover:text-accent-ink',
                              current && 'text-accent-ink',
                            )}
                          >
                            {label}
                          </Link>
                        </li>
                      );
                    })}
                    {brandServiceLinks
                      .filter((item) => item.group === group)
                      .map((item) => {
                        const href = es ? item.esHref : item.href;
                        const current = pathname === href;
                        return (
                          <li key={item.href}>
                            <Link
                              href={href}
                              aria-current={current ? 'page' : undefined}
                              className={cx(
                                'block py-1.5 text-sm leading-snug transition-colors hover:text-accent-ink',
                                current && 'text-accent-ink',
                              )}
                            >
                              {es ? item.esLabel : item.label}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function NavIndex({ index }: { index: number }) {
  return (
    <span className="hidden text-[0.6rem] text-accent-ink transition-colors group-hover:text-accent-ink group-data-[open]:text-accent-ink xl:inline">
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
      className={cx(
        'absolute inset-x-0 -bottom-px h-px origin-left bg-accent-ink transition-transform duration-500 ease-out-expo',
        openAware && 'site-nav-underline',
        active
          ? 'scale-x-100'
          : openAware
            ? 'scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 group-data-[open]:scale-x-100'
            : 'scale-x-0 group-hover:scale-x-100',
      )}
    />
  );
}
