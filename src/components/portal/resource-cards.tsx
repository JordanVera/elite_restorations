import { ExternalLink } from 'lucide-react';

import { SupplierMark } from '@/components/portal/supplier-mark';
import type { PortalResource } from '@/lib/selections/resources';
import { cn } from '@/lib/utils';

export function ResourceCards({
  resources,
  heading,
  description,
  compact = false,
}: {
  resources: readonly PortalResource[];
  heading?: string;
  description?: string;
  compact?: boolean;
}) {
  if (resources.length === 0) return null;

  return (
    <section
      className={cn(heading ? 'mt-8' : compact && 'mt-4')}
      aria-labelledby={heading ? 'portal-resources-heading' : undefined}
    >
      {heading ? (
        <div className="mb-3">
          <h2 id="portal-resources-heading" className="font-semibold">
            {heading}
          </h2>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
      <ul
        className={cn(
          'grid gap-3',
          compact ? 'sm:grid-cols-1' : 'sm:grid-cols-2',
        )}
      >
        {resources.map((resource) => (
          <li key={resource.slug}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full gap-3 rounded-[12px] border border-border bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:border-foreground/25 hover:bg-surface-2/40"
            >
              <SupplierMark resource={resource} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 font-medium">
                  {resource.name}
                  <ExternalLink
                    className="size-3.5 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {resource.recommendedFor}
                </span>
                {resource.location ? (
                  <span className="mt-1.5 block text-xs text-muted-foreground">
                    {resource.location}
                  </span>
                ) : null}
              </span>
            </a>
          </li>
        ))}
      </ul>
      {heading ? (
        <p className="mt-3 text-xs text-muted-foreground">
          Supplier names are trademarks of their owners. Elite Restorations is
          an independent contractor.
        </p>
      ) : null}
    </section>
  );
}

export function ResourceChips({
  resources,
}: {
  resources: readonly PortalResource[];
}) {
  if (resources.length === 0) return null;
  return (
    <div className="mt-4">
      <p className="text-[0.8rem] font-medium">Where to look</p>
      <ul className="mt-1.5 grid gap-1.5">
        {resources.map((resource) => (
          <li key={resource.slug}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex max-w-full items-center gap-2 rounded-[8px] border border-border bg-surface-2/50 px-2.5 py-1.5 text-sm hover:bg-surface-2"
            >
              <SupplierMark
                resource={resource}
                className="size-6 rounded-[6px]"
              />
              <span className="min-w-0 truncate font-medium">
                {resource.name}
              </span>
              <ExternalLink
                className="size-3.5 shrink-0 text-muted-foreground"
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
