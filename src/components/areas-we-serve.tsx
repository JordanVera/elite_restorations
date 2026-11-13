import Link from 'next/link';

import { areaPages } from '@/lib/area-pages';
import { landingsForService } from '@/lib/local-landings';
import { getService } from '@/lib/services';
import { site } from '@/lib/site';

export function AreasWeServe({ serviceSlug }: { serviceSlug: string }) {
  const service = getService(serviceSlug);
  const pages = landingsForService(serviceSlug);
  if (!service || pages.length === 0) return null;

  return (
    <section
      id="areas"
      aria-labelledby="areas-heading"
      className="scroll-mt-28 border-t border-border py-16 md:py-20"
    >
      <div className="gutter mx-auto max-w-[120rem]">
        <p className="eyebrow text-accent-ink">Greater Houston</p>
        <h2 id="areas-heading" className="font-display t-lg mt-4 max-w-[16ch]">
          Areas we serve
        </h2>
        <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
          {service.name} is scheduled from our Houston office at{' '}
          {site.address.streetAddress}, {site.address.postalCode}. The closest
          neighborhoods have their own pages. Every community below has a page
          for this service.
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {areaPages.map((area) => (
            <li key={area.slug}>
              <Link
                href={area.path}
                className="font-display text-3xl transition-colors hover:text-accent-ink"
              >
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {pages.map((page) => (
            <li key={page.slug}>
              <Link
                href={page.path}
                className="text-sm underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
              >
                {page.areaName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
