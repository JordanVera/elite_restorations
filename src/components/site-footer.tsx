import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

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
              className="font-display mt-4 inline-block text-[clamp(2.4rem,4.5vw,3.75rem)] leading-none tracking-[-0.03em] transition-colors hover:text-accent-ink"
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
                <Link href="/testimonials" className={linkClass}>
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className={linkClass}>
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          <SiteLogo className="h-10" />
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
            </ul>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground lg:text-right">
            &copy; {year} {site.name}. Family owned and operated in Houston
            since {site.founded}. Serving Greater Houston, Texas.
          </p>
        </div>
      </div>
    </footer>
  );
}
