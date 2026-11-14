import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { LanguageSwitch } from '@/components/language-switch';
import { waterCauses } from '@/lib/water-causes';
import { googleReviews } from '@/lib/testimonials';
import { nav, site } from '@/lib/site';
import { serviceGroups, servicePath, servicesInGroup } from '@/lib/services';
import { SiteLogo } from './site-logo';

const linkClass = 'transition-colors hover:text-accent-ink';

const footerName: Record<string, string> = {
  'roofing-emergency-tarp-repair': 'Emergency Tarping',
  'water-damage-restoration': 'Water Damage',
  'painting-drywall-repair': 'Painting & Drywall',
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="gutter mx-auto max-w-[120rem] pt-16 pb-8 md:pt-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-muted-foreground">
              Start a conversation
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
              Call, email or send a request. Estimates for remodeling and
              restoration across Greater Houston.
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
                href="/contact"
                className="inline-flex items-center gap-1.5 underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
              >
                Request an estimate
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-10 sm:grid-cols-3 lg:grid-cols-5">
          {serviceGroups.map((group) => (
            <nav key={group} aria-label={group}>
              <h2 className="eyebrow text-muted-foreground">{group}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {servicesInGroup(group).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={servicePath(service.slug)}
                      className={linkClass}
                    >
                      {footerName[service.slug] ?? service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="Company">
            <h2 className="eyebrow text-muted-foreground">Company</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                  {item.children ? (
                    <ul className="mt-2 space-y-2 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-muted-foreground transition-colors hover:text-accent-ink"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
              <li>
                <Link href="/restoration" className={linkClass}>
                  Houston restoration services
                </Link>
              </li>
              <li>
                <Link href="/houston-storm-damage" className={linkClass}>
                  Storm damage
                </Link>
              </li>
              <li>
                <Link href="/commercial-storm-restoration" className={linkClass}>
                  Commercial and apartments
                </Link>
              </li>
              <li>
                <Link href="/insurance-claims/companies" className={linkClass}>
                  Insurer guides
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
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className={linkClass}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={linkClass}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  Terms
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
            <p className="eyebrow text-foreground">Hours</p>
            <ul className="mt-3 space-y-2">
              {site.hours.map((h) => (
                <li key={h.days}>
                  <span className="block">{h.days}</span>
                  <span className="block text-foreground/80">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="eyebrow text-foreground">Elsewhere</p>
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
                    <span className="sr-only"> (opens in a new tab)</span>
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
                  Leave us a Google review
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="text-xs leading-relaxed text-muted-foreground lg:text-right">
            <p>
              &copy; {year} {site.name}. Family owned and operated in Houston
              since {site.founded}. Serving Greater Houston, Texas.
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-end">
              <LanguageSwitch />
              <Link href="/privacy" className={linkClass}>
                Privacy
              </Link>
              <Link href="/terms" className={linkClass}>
                Terms
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
