import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { nav, site } from '@/lib/site';
import { serviceGroups, servicesInGroup } from '@/lib/services';
import { SiteLogo } from './site-logo';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="gutter mx-auto max-w-[120rem] pt-20 pb-10 md:pt-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-muted-foreground">
              Start a conversation
            </p>
            <a
              href={site.phone.href}
              className="t-xl mt-6 inline-block transition-colors hover:text-accent-ink"
            >
              {site.phone.display}
            </a>
            <p className="mt-6 measure text-muted-foreground">
              Call, email or send a request. Estimates for remodeling and
              restoration across Greater Houston.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
              >
                {site.email}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
              >
                Request an estimate
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-3">
            {serviceGroups.map((group) => (
              <nav key={group} aria-label={group}>
                <h2 className="eyebrow text-muted-foreground">{group}</h2>
                <ul className="mt-5 space-y-3 text-sm">
                  {servicesInGroup(group).map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="transition-colors hover:text-accent-ink"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <nav aria-label="Company">
              <h2 className="eyebrow text-muted-foreground">Company</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-accent-ink"
                    >
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
                  <Link
                    href="/testimonials"
                    className="transition-colors hover:text-accent-ink"
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-border pt-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="inline-block p-3">
              <SiteLogo />
            </div>
          </div>
          <div className="text-sm text-muted-foreground md:col-span-4">
            <p className="eyebrow text-foreground">Hours</p>
            <ul className="mt-4 space-y-1.5">
              {site.hours.map((h) => (
                <li key={h.days}>
                  {h.days}: {h.time}
                </li>
              ))}
            </ul>
            <p className="mt-4">Serving Greater Houston, Texas</p>
          </div>
          <div className="text-sm text-muted-foreground md:col-span-4">
            <p className="eyebrow text-foreground">Elsewhere</p>
            <ul className="mt-4 space-y-1.5">
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
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {year} {site.name}. Family owned and operated in Houston
            since {site.founded}.
          </p>
        </div>
      </div>
    </footer>
  );
}
