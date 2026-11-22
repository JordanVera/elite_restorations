'use client';

import { CircleHelp, LoaderCircle, Plus, Trash2 } from 'lucide-react';
import { unstable_rethrow } from 'next/navigation';
import { useId, useState, useTransition } from 'react';

import { Badge, Button, Card, CardHeader, Field, Notice, SelectInput, TextArea, TextInput } from '@/components/admin/ui';
import { formatMoney } from '@/lib/activity-labels';
import type { Suggestion } from '@/lib/selections/suggest';
import { cn } from '@/lib/utils';
import { createPortalAction } from '@/server/portal/admin-actions';

type Category = { id: string; name: string };
type LineItem = { id: string; name: string; description: string | null; quantity: number | null; totalPrice: number | null };

type Row = {
  key: string;
  approved: boolean;
  title: string;
  categoryId: string;
  area: string;
  lineItemId: string | null;
  quantity: number | null;
  unit: string | null;
  allowance: number | null;
  confidence: number | null;
  reason: string | null;
  alternative: string | null;
};

function confidenceTone(confidence: number) {
  if (confidence >= 0.8) return 'success' as const;
  if (confidence >= 0.6) return 'info' as const;
  return 'warning' as const;
}

export function NewPortalForm({
  quote,
  suggestions,
  categories,
  lineItems,
  defaultTitle,
  defaultWelcome,
  canSeeMoney,
}: {
  quote: { id: string; quoteNumber: string };
  suggestions: Suggestion[];
  categories: Category[];
  lineItems: LineItem[];
  defaultTitle: string;
  defaultWelcome: string;
  canSeeMoney: boolean;
}) {
  const formId = useId();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(defaultTitle);
  const [welcome, setWelcome] = useState(defaultWelcome);
  const [showAllowances, setShowAllowances] = useState(false);
  const [expiresAt, setExpiresAt] = useState('');
  const [rows, setRows] = useState<Row[]>(() =>
    suggestions.map((s) => ({
      key: s.lineItemId,
      approved: s.confidence >= 0.6,
      title: s.title,
      categoryId: s.categoryId,
      area: s.area ?? '',
      lineItemId: s.lineItemId,
      quantity: s.quantity,
      unit: s.unit,
      allowance: s.allowanceCents !== null ? s.allowanceCents / 100 : null,
      confidence: s.confidence,
      reason: s.reason,
      alternative: s.alternative,
    })),
  );

  const suggestedIds = new Set(rows.map((row) => row.lineItemId).filter(Boolean));
  const otherLineItems = lineItems.filter((item) => !suggestedIds.has(item.id));
  const otherCategory = categories.find((c) => c.name === 'Other') ?? categories[0];
  const approvedCount = rows.filter((row) => row.approved).length;

  const update = (key: string, patch: Partial<Row>) => setRows((all) => all.map((row) => (row.key === key ? { ...row, ...patch } : row)));

  const addRow = (lineItem?: LineItem) =>
    setRows((all) => [
      ...all,
      {
        key: `custom-${Date.now()}-${all.length}`,
        approved: true,
        title: lineItem?.name ?? '',
        categoryId: otherCategory?.id ?? '',
        area: '',
        lineItemId: lineItem?.id ?? null,
        quantity: null,
        unit: null,
        allowance: null,
        confidence: null,
        reason: lineItem ? 'Added from a line item' : null,
        alternative: null,
      },
    ]);

  const submit = () => {
    setError(null);
    const requirements = rows
      .filter((row) => row.approved)
      .map((row) => ({
        title: row.title,
        categoryId: row.categoryId || null,
        lineItemId: row.lineItemId,
        area: row.area,
        quantity: row.quantity,
        unit: row.unit ?? '',
        allowance: row.allowance,
        required: true,
      }));
    start(async () => {
      try {
        const result = await createPortalAction({
          quoteId: quote.id,
          settings: { title, welcomeMessage: welcome, showAllowances, expiresAt: expiresAt || null },
          requirements,
        });
        if (result && !result.ok) setError(result.message);
      } catch (err) {
        unstable_rethrow(err);
        setError(err instanceof Error ? err.message : 'Could not create the portal.');
      }
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
      <Card>
        <CardHeader
          title="Suggested selections"
          description="Suggestions come from the quote's line items. Check each one you want the customer to fill out; nothing is added until you approve it."
        />
        {rows.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted-foreground">
            No line items looked like customer selections. Add selections below.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((row) => (
              <li key={row.key} className={cn('grid gap-3 p-4 md:grid-cols-[auto_1fr]', !row.approved && 'bg-surface-2/40')}>
                <label className="flex items-center gap-2 pt-2 md:items-start">
                  <input
                    type="checkbox"
                    checked={row.approved}
                    onChange={(event) => update(row.key, { approved: event.target.checked })}
                    className="size-4 accent-foreground"
                    aria-label={`Include ${row.title || 'selection'}`}
                  />
                  <span className="text-sm md:sr-only">Include</span>
                </label>
                <div className={cn('grid gap-3', !row.approved && 'opacity-60')}>
                  <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr]">
                    <Field label="Title" htmlFor={`${formId}-${row.key}-title`}>
                      <TextInput
                        id={`${formId}-${row.key}-title`}
                        value={row.title}
                        maxLength={120}
                        onChange={(event) => update(row.key, { title: event.target.value })}
                      />
                    </Field>
                    <Field label="Category" htmlFor={`${formId}-${row.key}-cat`}>
                      <SelectInput
                        id={`${formId}-${row.key}-cat`}
                        value={row.categoryId}
                        onChange={(event) => update(row.key, { categoryId: event.target.value })}
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </SelectInput>
                    </Field>
                    <Field label="Area" htmlFor={`${formId}-${row.key}-area`}>
                      <TextInput
                        id={`${formId}-${row.key}-area`}
                        value={row.area}
                        placeholder="e.g. Kitchen"
                        maxLength={80}
                        onChange={(event) => update(row.key, { area: event.target.value })}
                      />
                    </Field>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[0.8rem] text-muted-foreground">
                    {row.confidence !== null ? (
                      <Badge tone={confidenceTone(row.confidence)}>{Math.round(row.confidence * 100)}% match</Badge>
                    ) : (
                      <Badge>Added manually</Badge>
                    )}
                    {row.reason ? (
                      <span className="inline-flex items-center gap-1">
                        <CircleHelp className="size-3.5" />
                        {row.reason}
                      </span>
                    ) : null}
                    {row.lineItemId ? (
                      <span>· From “{lineItems.find((item) => item.id === row.lineItemId)?.name}”</span>
                    ) : null}
                    {canSeeMoney && row.allowance !== null ? <span>· Allowance {formatMoney(row.allowance)}</span> : null}
                    {row.confidence === null ? (
                      <button
                        type="button"
                        onClick={() => setRows((all) => all.filter((r) => r.key !== row.key))}
                        className="ml-auto inline-flex items-center gap-1 text-accent-ink hover:underline"
                      >
                        <Trash2 className="size-3.5" /> Remove
                      </button>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap items-center gap-2 border-t border-border p-4">
          <Button variant="secondary" size="sm" onClick={() => addRow()}>
            <Plus /> Add a selection
          </Button>
          {otherLineItems.length ? (
            <SelectInput
              value=""
              onChange={(event) => {
                const item = otherLineItems.find((i) => i.id === event.target.value);
                if (item) addRow(item);
              }}
              className="h-8 w-auto max-w-72 text-[0.8rem]"
              aria-label="Add from another line item"
            >
              <option value="">Add from another line item…</option>
              {otherLineItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </SelectInput>
          ) : null}
        </div>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader title="Portal settings" description={`Quote #${quote.quoteNumber}`} />
          <div className="grid gap-4 p-5">
            <Field label="Title the customer sees" htmlFor={`${formId}-title`}>
              <TextInput id={`${formId}-title`} value={title} maxLength={120} onChange={(event) => setTitle(event.target.value)} />
            </Field>
            <Field label="Welcome message" htmlFor={`${formId}-welcome`}>
              <TextArea
                id={`${formId}-welcome`}
                value={welcome}
                maxLength={2000}
                rows={5}
                onChange={(event) => setWelcome(event.target.value)}
              />
            </Field>
            <Field label="Link expires" htmlFor={`${formId}-expires`} hint="Optional. Leave blank to keep the link working until revoked.">
              <TextInput id={`${formId}-expires`} type="date" value={expiresAt} onChange={(event) => setExpiresAt(event.target.value)} />
            </Field>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={showAllowances}
                onChange={(event) => setShowAllowances(event.target.checked)}
                className="mt-0.5 size-4 accent-foreground"
              />
              <span>
                Show allowance amounts to the customer
                <span className="block text-[0.8rem] text-muted-foreground">Off by default. Quote totals are never shown.</span>
              </span>
            </label>
          </div>
        </Card>

        {error ? <Notice tone="danger">{error}</Notice> : null}
        <Button size="lg" className="w-full" onClick={submit} disabled={pending || !title.trim()}>
          {pending ? <LoaderCircle className="animate-spin" /> : null}
          Create draft portal with {approvedCount} selection{approvedCount === 1 ? '' : 's'}
        </Button>
        <p className="text-center text-[0.8rem] text-muted-foreground">
          The portal starts as a draft. The customer can&apos;t see it until you publish.
        </p>
      </div>
    </div>
  );
}
