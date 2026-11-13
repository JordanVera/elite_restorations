import Link from 'next/link';

import { landingsForService } from '@/lib/local-landings';
import { getService } from '@/lib/services';

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
          {service.name} is scheduled from our Houston office. Choose a
          community to read how this work is scoped there.
        </p>
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
