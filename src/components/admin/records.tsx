import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Badge, buttonClass } from '@/components/admin/ui';
import { PAGE_SIZE } from '@/lib/admin/list-params';
import { cn } from '@/lib/utils';

export function Pagination({
  page,
  total,
  href,
}: {
  page: number;
  total: number;
  href: (page: number) => string;
}) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(total, page * PAGE_SIZE);
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 text-[0.8rem] text-muted-foreground">
      <span>
        {from}–{to} of {total}
      </span>
      {pages > 1 ? (
        <div className="flex gap-1">
          <PageLink disabled={page <= 1} href={href(page - 1)} label="Previous page">
            <ChevronLeft />
          </PageLink>
          <span className="flex items-center px-2 tabular-nums">
            {page} / {pages}
          </span>
          <PageLink disabled={page >= pages} href={href(page + 1)} label="Next page">
            <ChevronRight />
          </PageLink>
        </div>
      ) : null}
    </div>
  );
}

function PageLink({ disabled, href, label, children }: { disabled: boolean; href: string; label: string; children: React.ReactNode }) {
  if (disabled) {
    return (
      <span aria-disabled className={cn(buttonClass('secondary', 'icon'), 'size-8 opacity-40')}>
        {children}
      </span>
    );
  }
  return (
    <Link href={href} aria-label={label} className={cn(buttonClass('secondary', 'icon'), 'size-8')}>
      {children}
    </Link>
  );
}

export type PortalSummary = {
  id: string;
  status: 'DRAFT' | 'PUBLISHED' | 'REVOKED';
  expired: boolean;
  done: number;
  submitted: number;
  total: number;
} | null;

export function PortalStatusBadge({ portal }: { portal: PortalSummary }) {
  if (!portal) return <span className="text-[0.8rem] text-muted-foreground">No portal</span>;
  if (portal.status === 'DRAFT') return <Badge tone="neutral">Draft portal</Badge>;
  if (portal.expired) return <Badge tone="danger">Link expired</Badge>;
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <Badge tone={portal.total > 0 && portal.done === portal.total ? 'success' : 'info'}>
        {portal.done}/{portal.total} selected
      </Badge>
      {portal.submitted ? <Badge tone="warning">{portal.submitted} to review</Badge> : null}
    </span>
  );
}

export function SourceBadge({ source }: { source: 'JOBBER' | 'MOCK' }) {
  return source === 'MOCK' ? <Badge tone="warning">Demo</Badge> : null;
}
