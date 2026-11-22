'use client';

import { PartyPopper } from 'lucide-react';
import { useState } from 'react';

import { Notice } from '@/components/admin/ui';
import type { UploadConfig } from '@/components/portal/attachment-field';
import { SelectionCard } from '@/components/portal/selection-card';
import { customerCanEdit, progress, type SelectionStatus } from '@/lib/selections/status';
import type { CustomerItem } from '@/server/portal/customer';

export function PortalSelections({ token, items, uploads }: { token: string; items: CustomerItem[]; uploads: UploadConfig }) {
  const [overrides, setOverrides] = useState<Record<string, SelectionStatus>>({});
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setOverrides({});
  }

  const statuses = items.map((item) => overrides[item.id] ?? item.selection.status);
  const { done, total, percent } = progress(statuses);
  const [firstOpen] = useState(() => items.find((item) => customerCanEdit(item.selection.status))?.id);

  if (!total) {
    return (
      <Notice className="mt-8" title="Nothing to choose yet">
        We&apos;re still setting up your selections. Check back soon or contact us.
      </Notice>
    );
  }

  return (
    <section className="mt-8" aria-labelledby="selections-heading">
      <div className="sticky top-0 z-10 -mx-4 border-b border-border bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-[12px] sm:border sm:px-5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="selections-heading" className="font-semibold">
            Your selections
          </h2>
          <p className="text-sm tabular-nums text-muted-foreground" aria-live="polite">
            {done} of {total} completed
          </p>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={done}
          aria-label={`${done} of ${total} selections completed`}
        >
          <div className="h-full rounded-full bg-emerald-600 transition-[width] duration-500" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {done === total ? (
        <Notice tone="success" className="mt-4" title="All done. Thank you!">
          <span className="inline-flex items-center gap-1.5">
            <PartyPopper className="size-4" aria-hidden /> We&apos;ll review everything and reach out if anything needs a second look.
          </span>
        </Notice>
      ) : null}

      <ol className="mt-4 grid gap-3">
        {items.map((item, index) => (
          <SelectionCard
            key={item.id}
            token={token}
            item={item}
            index={index}
            uploads={uploads}
            defaultOpen={item.id === firstOpen}
            onStatus={(id, status) => setOverrides((o) => ({ ...o, [id]: status }))}
          />
        ))}
      </ol>
    </section>
  );
}
