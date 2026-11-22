'use client';

import { LoaderCircle } from 'lucide-react';
import { Dialog } from 'radix-ui';
import { useId, useState, useTransition } from 'react';

import { Button, Field, Notice, SelectInput, TextArea, TextInput } from '@/components/admin/ui';
import { SELECTION_FIELDS } from '@/lib/selections/fields';
import { saveRequirementAction } from '@/server/portal/admin-actions';

export type CategoryOption = { id: string; name: string; active: boolean; enabledFields: string[]; defaultInstructions: string | null };
export type LineItemOption = { id: string; name: string };

export type RequirementDraft = {
  id?: string;
  categoryId: string | null;
  lineItemId: string | null;
  title: string;
  area: string;
  instructions: string;
  customerGuidance: string;
  required: boolean;
  quantity: string;
  unit: string;
  allowance: string;
  preferredOptions: string;
  enabledFields: string[];
  dueDate: string;
};

export function emptyDraft(category?: CategoryOption): RequirementDraft {
  return {
    categoryId: category?.id ?? null,
    lineItemId: null,
    title: '',
    area: '',
    instructions: '',
    customerGuidance: '',
    required: true,
    quantity: '',
    unit: '',
    allowance: '',
    preferredOptions: '',
    enabledFields: category?.enabledFields ?? [],
    dueDate: '',
  };
}

export function RequirementDialog({
  portalId,
  open,
  onOpenChange,
  initial,
  categories,
  lineItems,
  canSeeMoney,
  onSaved,
}: {
  portalId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: RequirementDraft;
  categories: CategoryOption[];
  lineItems: LineItemOption[];
  canSeeMoney: boolean;
  onSaved: (message: string) => void;
}) {
  const id = useId();
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const category = categories.find((c) => c.id === draft.categoryId);
  const set = <K extends keyof RequirementDraft>(key: K, value: RequirementDraft[K]) => setDraft((d) => ({ ...d, [key]: value }));

  const changeCategory = (categoryId: string) => {
    const next = categories.find((c) => c.id === categoryId);
    setDraft((d) => ({ ...d, categoryId: categoryId || null, enabledFields: next ? next.enabledFields : d.enabledFields }));
  };

  const save = () => {
    setError(null);
    start(async () => {
      const result = await saveRequirementAction(portalId, {
        id: draft.id ?? null,
        categoryId: draft.categoryId,
        lineItemId: draft.lineItemId,
        title: draft.title,
        area: draft.area,
        instructions: draft.instructions,
        customerGuidance: draft.customerGuidance,
        required: draft.required,
        quantity: draft.quantity,
        unit: draft.unit,
        allowance: canSeeMoney ? draft.allowance : null,
        preferredOptions: draft.preferredOptions.split('\n'),
        enabledFields: draft.enabledFields,
        dueDate: draft.dueDate || null,
      });
      if (result.ok) {
        onOpenChange(false);
        onSaved(result.message);
      } else setError(result.message);
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/40" />
        <Dialog.Content className="app-ui fixed inset-x-0 bottom-0 z-[101] flex max-h-[92dvh] flex-col rounded-t-[16px] border border-border bg-white shadow-2xl sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-[min(44rem,calc(100vw-2rem))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[14px]">
          <div className="border-b border-border px-6 py-4">
            <Dialog.Title className="text-lg font-semibold tracking-tight">{draft.id ? 'Edit selection' : 'Add selection'}</Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              What the customer needs to choose, and what you need from them.
            </Dialog.Description>
          </div>
          <div className="grid gap-4 overflow-y-auto px-6 py-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title" htmlFor={`${id}-title`}>
                <TextInput
                  id={`${id}-title`}
                  value={draft.title}
                  maxLength={120}
                  placeholder="e.g. Kitchen countertops"
                  onChange={(e) => set('title', e.target.value)}
                  autoFocus
                />
              </Field>
              <Field label="Category" htmlFor={`${id}-cat`}>
                <SelectInput id={`${id}-cat`} value={draft.categoryId ?? ''} onChange={(e) => changeCategory(e.target.value)}>
                  <option value="">Custom</option>
                  {categories
                    .filter((c) => c.active || c.id === draft.categoryId)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </SelectInput>
              </Field>
              <Field label="Area or room" htmlFor={`${id}-area`}>
                <TextInput id={`${id}-area`} value={draft.area} maxLength={80} placeholder="e.g. Primary bathroom" onChange={(e) => set('area', e.target.value)} />
              </Field>
              <Field label="Quote line item" htmlFor={`${id}-li`}>
                <SelectInput id={`${id}-li`} value={draft.lineItemId ?? ''} onChange={(e) => set('lineItemId', e.target.value || null)}>
                  <option value="">None</option>
                  {lineItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </SelectInput>
              </Field>
            </div>

            <Field
              label="Instructions for the customer"
              htmlFor={`${id}-instr`}
              hint={category?.defaultInstructions && !draft.instructions ? `Blank uses the category default: “${category.defaultInstructions}”` : undefined}
            >
              <TextArea id={`${id}-instr`} value={draft.instructions} maxLength={2000} rows={3} onChange={(e) => set('instructions', e.target.value)} />
            </Field>
            <Field label="Guidance or tips" htmlFor={`${id}-guide`} hint="Optional. Shown under the instructions, e.g. lead times or what to avoid.">
              <TextArea id={`${id}-guide`} value={draft.customerGuidance} maxLength={2000} rows={2} onChange={(e) => set('customerGuidance', e.target.value)} />
            </Field>
            <Field label="Suggested options" htmlFor={`${id}-opts`} hint="Optional. One per line. Shown to the customer as ideas, not requirements.">
              <TextArea
                id={`${id}-opts`}
                value={draft.preferredOptions}
                rows={2}
                placeholder={'MSI Calacatta Laza\nCambria Brittanicca'}
                onChange={(e) => set('preferredOptions', e.target.value)}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-4">
              <Field label="Quantity" htmlFor={`${id}-qty`}>
                <TextInput id={`${id}-qty`} inputMode="decimal" value={draft.quantity} onChange={(e) => set('quantity', e.target.value)} />
              </Field>
              <Field label="Unit" htmlFor={`${id}-unit`}>
                <TextInput id={`${id}-unit`} value={draft.unit} maxLength={20} placeholder="sq ft" onChange={(e) => set('unit', e.target.value)} />
              </Field>
              <Field label="Due date" htmlFor={`${id}-due`}>
                <TextInput id={`${id}-due`} type="date" value={draft.dueDate} onChange={(e) => set('dueDate', e.target.value)} />
              </Field>
              {canSeeMoney ? (
                <Field label="Allowance ($)" htmlFor={`${id}-allow`}>
                  <TextInput id={`${id}-allow`} inputMode="decimal" value={draft.allowance} onChange={(e) => set('allowance', e.target.value)} />
                </Field>
              ) : null}
            </div>

            <fieldset className="grid gap-2">
              <legend className="mb-1 text-[0.8rem] font-medium">Fields the customer fills in</legend>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                {SELECTION_FIELDS.map((field) => (
                  <label key={field.key} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="size-4 accent-foreground"
                      checked={draft.enabledFields.includes(field.key)}
                      onChange={(e) =>
                        set(
                          'enabledFields',
                          e.target.checked ? [...draft.enabledFields, field.key] : draft.enabledFields.filter((k) => k !== field.key),
                        )
                      }
                    />
                    {field.label}
                  </label>
                ))}
              </div>
              <p className="text-[0.8rem] text-muted-foreground">Notes are always available.</p>
            </fieldset>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="size-4 accent-foreground" checked={draft.required} onChange={(e) => set('required', e.target.checked)} />
              Required
            </label>
            {error ? <Notice tone="danger">{error}</Notice> : null}
          </div>
          <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
            <Dialog.Close asChild>
              <Button variant="secondary">Cancel</Button>
            </Dialog.Close>
            <Button onClick={save} disabled={pending || !draft.title.trim()}>
              {pending ? <LoaderCircle className="animate-spin" /> : null}
              {draft.id ? 'Save changes' : 'Add selection'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
