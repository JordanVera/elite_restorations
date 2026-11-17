import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { LanguageSwitch } from '@/components/language-switch';
import { brandServiceLinks } from '@/lib/brand-nav';
import { esGroupNames, esServiceNames, serviceHref } from '@/lib/i18n';
import { waterCauses } from '@/lib/water-causes';
import { googleReviews } from '@/lib/testimonials';
import { nav, site } from '@/lib/site';
import { serviceGroups, servicesInGroup } from '@/lib/service-nav';
import { SiteLogo } from './site-logo';

const linkClass = 'transition-colors hover:text-accent-ink';

const footerName: Record<string, string> = {
  'roofing-emergency-tarp-repair': 'Emergency Tarping',
  'water-damage-restoration': 'Water Damage',
  'painting-drywall-repair': 'Painting & Drywall',
};

const hourDayEs: Record<string, string> = {
  'Monday through Saturday': 'Lunes a sábado',
  Sunday: 'Domingo',
};

const hourTimeEs: Record<string, string> = {
  Closed: 'Cerrado',
  '8:00 AM to 6:00 PM': '8:00 a. m. a 6:00 p. m.',
};

const esNav: Record<string, { href: string; label: string }> = {
  '/services': { href: '/es', label: 'Servicios' },
  '/projects': { href: '/projects', label: 'Proyectos' },
  '/resources': { href: '/resources', label: 'Recursos' },
  '/resources/homeowners': { href: '/resources/homeowners', label: 'Propietarios' },
  '/resources/realtors': { href: '/resources/realtors', label: 'Agentes inmobiliarios' },
  '/about': { href: '/about', label: 'Nosotros' },
  '/blog': { href: '/es/blog', label: 'Blog' },
  '/contact': { href: '/es/contact', label: 'Contacto' },
  '/emergency': { href: '/es/emergency', label: 'Emergencia' },
};

export function SiteFooter({ es }: { es: boolean }) {
  const year = new Date().getFullYear();
  const newTab = es ? ' (se abre en una pestaña nueva)' : ' (opens in a new tab)';

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="gutter mx-auto max-w-[120rem] pt-16 pb-8 md:pt-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-muted-foreground">
              {es ? 'Empecemos' : 'Start a conversation'}
            </p>
            <a
              href={site.phone.href}
              className="font-display mt-4 inline-block text-[clamp(1.7rem,8vw,3.75rem)] leading-none tracking-[-0.03em] transition-colors hover:text-accent-ink"
            >
              {site.phone.display}
            </a>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
              {es
                ? 'Llame, escriba o envíe una solicitud. Estimados de remodelación y restauración en el área de Houston.'
                : 'Call, email or send a request. Estimates for remodeling and restoration across Greater Houston.'}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-1.5 underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
              >
                {site.email}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
              <Link
                href={es ? '/es/contact' : '/contact'}
                className="inline-flex items-center gap-1.5 underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
              >
                {es ? 'Pedir un estimado' : 'Request an estimate'}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-10 sm:grid-cols-3 lg:grid-cols-5">
          {serviceGroups.map((group) => (
            <nav key={group} aria-label={es ? (esGroupNames[group] ?? group) : group}>
              <h2 className="eyebrow text-muted-foreground">{es ? (esGroupNames[group] ?? group) : group}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {servicesInGroup(group).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={es ? serviceHref(service.slug, 'es') : `/${service.slug}`}
                      className={linkClass}
                    >
                      {es && service.slug in esServiceNames
                        ? esServiceNames[service.slug as keyof typeof esServiceNames]
                        : (footerName[service.slug] ?? service.name)}
                    </Link>
                  </li>
                ))}
                {brandServiceLinks
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <li key={item.href}>
                      <Link href={es ? item.esHref : item.href} className={linkClass}>
                        {es ? item.esLabel : item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          ))}
          <nav aria-label={es ? 'Empresa' : 'Company'}>
            <h2 className="eyebrow text-muted-foreground">{es ? 'Empresa' : 'Company'}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={es ? (esNav[item.href]?.href ?? item.href) : item.href} className={linkClass}>
                    {es ? (esNav[item.href]?.label ?? item.label) : item.label}
                  </Link>
                  {item.children ? (
                    <ul className="mt-2 space-y-2 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={es ? (esNav[child.href]?.href ?? child.href) : child.href}
                            className="text-muted-foreground transition-colors hover:text-accent-ink"
                          >
                            {es ? (esNav[child.href]?.label ?? child.label) : child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
              <li>
                <Link href={es ? '/es/restoration' : '/restoration'} className={linkClass}>
                  {es ? 'Restauración en Houston' : 'Houston restoration services'}
                </Link>
              </li>
              <li>
                <Link href={es ? '/es/houston-storm-damage' : '/houston-storm-damage'} className={linkClass}>
                  {es ? 'Daño por tormenta' : 'Storm damage'}
                </Link>
              </li>
              <li>
                <Link href="/commercial-storm-restoration" className={linkClass}>
                  {es ? 'Comercios y apartamentos' : 'Commercial and apartments'}
                </Link>
              </li>
              <li>
                <Link href="/insurance-claims/companies" className={linkClass}>
                  {es ? 'Guías de aseguradoras' : 'Insurer guides'}
                </Link>
              </li>
              {waterCauses.map((cause) => (
                <li key={cause.slug}>
                  <Link href={cause.path} className={linkClass}>
                    {cause.hubHeading}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/testimonials" className={linkClass}>
                  {es ? 'Reseñas' : 'Reviews'}
                </Link>
              </li>
              <li>
                <Link href="/blog" className={linkClass}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/es/blog" className={linkClass}>
                  Blog en español
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={linkClass}>
                  {es ? 'Privacidad' : 'Privacy'}
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  {es ? 'Términos' : 'Terms'}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          <div>
            <SiteLogo className="h-10" />
            <address className="mt-4 text-sm not-italic leading-relaxed text-muted-foreground">
              <p className="text-foreground">{site.name}</p>
              <p>{site.address.streetAddress}</p>
              <p>
                {site.address.addressLocality}, {site.address.addressRegion}{' '}
                {site.address.postalCode}
              </p>
              <a
                href={site.phone.href}
                className="mt-2 inline-block text-foreground transition-colors hover:text-accent-ink"
              >
                {site.phone.display}
              </a>
            </address>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="eyebrow text-foreground">{es ? 'Horario' : 'Hours'}</p>
            <ul className="mt-3 space-y-2">
              {site.hours.map((h) => (
                <li key={h.days}>
                  <span className="block">{es ? (hourDayEs[h.days] ?? h.days) : h.days}</span>
                  <span className="block text-foreground/80">{es ? (hourTimeEs[h.time] ?? h.time) : h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="eyebrow text-foreground">{es ? 'En otros lugares' : 'Elsewhere'}</p>
            <ul className="mt-3 space-y-1">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {s.label}
                    <span className="sr-only">{newTab}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={googleReviews.reviewHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {es ? 'Déjenos una reseña en Google' : 'Leave us a Google review'}
                  <span className="sr-only">{newTab}</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="text-xs leading-relaxed text-muted-foreground lg:text-right">
            <p>
              {es
                ? `© ${year} ${site.name}. Empresa familiar en Houston desde ${site.founded}. Servimos el área de Houston, Texas.`
                : `© ${year} ${site.name}. Family owned and operated in Houston since ${site.founded}. Serving Greater Houston, Texas.`}
            </p>
            {/* div, not p: LanguageSwitch renders a nav, which cannot nest in a p. */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-end">
              <LanguageSwitch />
              <Link href="/privacy" className={linkClass}>
                {es ? 'Privacidad' : 'Privacy'}
              </Link>
              <Link href="/terms" className={linkClass}>
                {es ? 'Términos' : 'Terms'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
