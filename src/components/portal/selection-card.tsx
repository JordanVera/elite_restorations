'use client';

import { CalendarDays, Check, ChevronDown, ExternalLink, Loader2, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useState } from 'react';

import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { Badge, Button, Field, Notice, TextArea, TextInput } from '@/components/admin/ui';
import { AttachmentField, type UploadConfig } from '@/components/portal/attachment-field';
import { formatMoney } from '@/lib/activity-labels';
import { MAX_NOTES, MAX_PRODUCT_URLS, SELECTION_FIELDS, TEXT_FIELD_KEYS, type TextFieldKey } from '@/lib/selections/fields';
import { customerCanEdit, statusLabel, statusTone, type SelectionStatus } from '@/lib/selections/status';
import { cn } from '@/lib/utils';
import { saveSelectionAction } from '@/server/portal/customer-actions';
import type { CustomerAttachment, CustomerItem, CustomerSelection } from '@/server/portal/customer';

type FormValues = Record<TextFieldKey, string> & { productUrls: string[]; notes: string };

function formFrom(sel: CustomerSelection): FormValues {
  const values = { productUrls: sel.productUrls.length ? [...sel.productUrls] : [''], notes: sel.notes ?? '' } as FormValues;
  for (const key of TEXT_FIELD_KEYS) values[key] = sel[key] ?? '';
  return values;
}

function sameForm(a: FormValues, b: FormValues): boolean {
  const urls = (v: FormValues) => v.productUrls.map((u) => u.trim()).filter(Boolean).join('\n');
  return TEXT_FIELD_KEYS.every((key) => a[key].trim() === b[key].trim()) && a.notes.trim() === b.notes.trim() && urls(a) === urls(b);
}

function formatDue(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

function statusMessage(status: SelectionStatus): string | null {
  if (status === 'SUBMITTED') return 'Submitted. Our team is reviewing it. Contact us if you need to change something.';
  if (status === 'APPROVED') return 'Approved by our team. We’ll use this when ordering materials.';
  return null;
}

export function SelectionCard({
  token,
  item,
  index,
  uploads,
  defaultOpen,
  onStatus,
}: {
  token: string;
  item: CustomerItem;
  index: number;
  uploads: UploadConfig;
  defaultOpen: boolean;
  onStatus: (id: string, status: SelectionStatus) => void;
}) {
  const router = useRouter();
  const formId = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [sel, setSel] = useState(item.selection);
  const [prevSelection, setPrevSelection] = useState(item.selection);
  const [saved, setSaved] = useState(() => formFrom(item.selection));
  const [form, setForm] = useState(saved);
  const [pending, setPending] = useState<'draft' | 'submit' | null>(null);
  const [notice, setNotice] = useState<{ tone: 'success' | 'danger'; text: string; conflict?: boolean } | null>(null);
  const [confirming, setConfirming] = useState(false);

  const dirty = !sameForm(form, saved);

  // Fresh server data replaces local state unless the customer has unsaved typing.
  if (item.selection !== prevSelection) {
    setPrevSelection(item.selection);
    setSel(item.selection);
    if (!dirty) {
      const next = formFrom(item.selection);
      setSaved(next);
      setForm(next);
    }
  }

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const editable = customerCanEdit(sel.status);
  const enabled = new Set<string>(item.enabledFields);
  const textFields = SELECTION_FIELDS.filter(
    (f) => TEXT_FIELD_KEYS.includes(f.key as TextFieldKey) && enabled.has(f.key) && (editable || form[f.key as TextFieldKey].trim()),
  );

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setNotice(null);
  }

  async function save(intent: 'draft' | 'submit') {
    setConfirming(false);
    setPending(intent);
    setNotice(null);
    try {
      const values = { ...form, productUrls: form.productUrls.filter((u) => u.trim()) };
      const result = await saveSelectionAction(token, item.id, values, sel.version, intent);
      if (result.ok && result.status && result.version !== undefined) {
        setSel((s) => ({ ...s, status: result.status!, version: result.version!, feedback: result.status === 'CHANGES_REQUESTED' ? s.feedback : null }));
        setSaved(form);
        onStatus(item.id, result.status);
        setNotice({ tone: 'success', text: result.message });
        router.refresh();
      } else {
        setNotice({ tone: 'danger', text: result.message, conflict: result.conflict });
      }
    } catch {
      setNotice({ tone: 'danger', text: 'Something went wrong. Check your connection and try again.' });
    } finally {
      setPending(null);
    }
  }

  const meta = [item.area, item.categoryName].filter(Boolean).join(' · ');
  const message = statusMessage(sel.status);

  return (
    <li className="overflow-hidden rounded-[12px] border border-border bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={formId}
        className="flex w-full items-start gap-3 px-4 py-4 text-left sm:px-5"
      >
        <span
          className={cn(
            'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-semibold',
            sel.status === 'APPROVED' || sel.status === 'SUBMITTED' ? 'bg-emerald-600 text-white' : 'bg-surface-2 text-foreground/70',
          )}
          aria-hidden
        >
          {sel.status === 'APPROVED' || sel.status === 'SUBMITTED' ? <Check className="size-4" /> : index + 1}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-semibold">{item.title}</span>
            {!item.required ? <span className="text-xs text-muted-foreground">Optional</span> : null}
          </span>
          {meta ? <span className="mt-0.5 block text-sm text-muted-foreground">{meta}</span> : null}
          <span className="mt-2 flex flex-wrap items-center gap-2">
            <Badge tone={statusTone(sel.status)}>{statusLabel(sel.status)}</Badge>
            {item.dueDate && editable ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" aria-hidden /> Choose by {formatDue(item.dueDate)}
              </span>
            ) : null}
          </span>
        </span>
        <ChevronDown className={cn('mt-1 size-5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden />
      </button>

      <div id={formId} hidden={!open} className="border-t border-border px-4 pt-4 pb-5 sm:px-5">
        {sel.feedback && sel.status === 'CHANGES_REQUESTED' ? (
          <Notice tone="warning" title="Our team asked for a change" className="mb-4">
            <p className="whitespace-pre-line">{sel.feedback}</p>
          </Notice>
        ) : null}

        {item.instructions ? <p className="text-sm leading-relaxed whitespace-pre-line">{item.instructions}</p> : null}
        {item.customerGuidance ? <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">{item.customerGuidance}</p> : null}

        {item.quantity !== null || item.allowanceCents !== null ? (
          <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {item.quantity !== null ? (
              <div className="flex gap-1.5">
                <dt className="text-muted-foreground">Approximate quantity</dt>
                <dd className="font-medium">
                  {item.quantity.toLocaleString('en-US')} {item.unit ?? ''}
                </dd>
              </div>
            ) : null}
            {item.allowanceCents !== null ? (
              <div className="flex gap-1.5">
                <dt className="text-muted-foreground">Allowance</dt>
                <dd className="font-medium">{formatMoney(item.allowanceCents / 100)}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {item.preferredOptions.length ? (
          <div className="mt-3">
            <p className="text-[0.8rem] font-medium">Ideas to start with</p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {item.preferredOptions.map((option) => (
                <li key={option} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs">
                  {option}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {message ? (
          <Notice tone={sel.status === 'APPROVED' ? 'success' : 'info'} className="mt-4">
            {message}
          </Notice>
        ) : null}

        <form
          className="mt-5 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setConfirming(true);
          }}
        >
          {textFields.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {textFields.map((field) => {
                const key = field.key as TextFieldKey;
                return (
                  <Field key={key} label={field.label} htmlFor={`${formId}-${key}`}>
                    {editable ? (
                      <TextInput
                        id={`${formId}-${key}`}
                        value={form[key]}
                        maxLength={field.max}
                        placeholder={field.placeholder}
                        onChange={(e) => set(key, e.target.value)}
                        autoComplete="off"
                      />
                    ) : (
                      <p id={`${formId}-${key}`} className="text-sm">
                        {form[key]}
                      </p>
                    )}
                  </Field>
                );
              })}
            </div>
          ) : null}

          {enabled.has('productUrls') && (editable || saved.productUrls.some(Boolean)) ? (
            <div className="grid gap-2">
              <span className="text-[0.8rem] font-medium">Product links</span>
              {editable ? (
                <>
                  {form.productUrls.map((url, i) => (
                    <div key={i} className="flex gap-2">
                      <TextInput
                        type="url"
                        inputMode="url"
                        value={url}
                        maxLength={500}
                        placeholder="https://"
                        aria-label={`Product link ${i + 1}`}
                        onChange={(e) => set('productUrls', form.productUrls.map((u, j) => (j === i ? e.target.value : u)))}
                      />
                      {form.productUrls.length > 1 ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Remove link ${i + 1}`}
                          onClick={() => set('productUrls', form.productUrls.filter((_, j) => j !== i))}
                        >
                          <X />
                        </Button>
                      ) : null}
                    </div>
                  ))}
                  {form.productUrls.length < MAX_PRODUCT_URLS ? (
                    <Button variant="ghost" size="sm" className="justify-self-start" onClick={() => set('productUrls', [...form.productUrls, ''])}>
                      <Plus /> Add another link
                    </Button>
                  ) : null}
                </>
              ) : (
                <ul className="grid gap-1 text-sm">
                  {saved.productUrls.filter(Boolean).map((url) => (
                    <li key={url}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center gap-1 break-all underline">
                        {url} <ExternalLink className="size-3.5 shrink-0" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}

          {editable || form.notes.trim() ? (
            <Field label="Notes" htmlFor={`${formId}-notes`} hint={editable ? 'Anything else we should know, like where you saw it or a second choice.' : undefined}>
              {editable ? (
                <TextArea id={`${formId}-notes`} value={form.notes} maxLength={MAX_NOTES} onChange={(e) => set('notes', e.target.value)} />
              ) : (
                <p id={`${formId}-notes`} className="text-sm whitespace-pre-line">
                  {form.notes}
                </p>
              )}
            </Field>
          ) : null}

          {enabled.has('attachments') && (editable || sel.attachments.length) ? (
            <AttachmentField
              token={token}
              requirementId={item.id}
              uploads={uploads}
              attachments={sel.attachments}
              editable={editable}
              onChange={(next: CustomerAttachment[]) => setSel((s) => ({ ...s, attachments: next }))}
            />
          ) : null}

          {notice ? (
            <Notice tone={notice.tone}>
              {notice.text}
              {notice.conflict ? (
                <button type="button" className="ml-2 font-medium underline" onClick={() => window.location.reload()}>
                  Reload
                </button>
              ) : null}
            </Notice>
          ) : null}

          {editable ? (
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
              {dirty ? <span className="text-xs text-muted-foreground sm:mr-auto">Unsaved changes</span> : null}
              <Button variant="secondary" size="lg" className="sm:h-10 sm:text-sm" disabled={pending !== null} onClick={() => save('draft')}>
                {pending === 'draft' ? <Loader2 className="animate-spin" /> : null}
                Save draft
              </Button>
              <Button type="submit" size="lg" className="sm:h-10 sm:text-sm" disabled={pending !== null}>
                {pending === 'submit' ? <Loader2 className="animate-spin" /> : null}
                Submit for review
              </Button>
            </div>
          ) : null}
        </form>
      </div>

      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title={`Submit ${item.title}?`}
        description="Our team will review your choice. After you submit, you can't edit it unless we send it back with questions."
        confirmLabel="Submit"
        onConfirm={() => save('submit')}
      />
    </li>
  );
}
