'use client';

import { ChevronDown, LoaderCircle, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useId, useState, useTransition } from 'react';

import { Badge, Button, Card, Field, Notice, TextArea, TextInput } from '@/components/admin/ui';
import { splitKeywords } from '@/lib/selections/categories';
import { fieldLabel, SELECTION_FIELDS } from '@/lib/selections/fields';
import { cn } from '@/lib/utils';
import { saveCategoryAction } from '@/server/portal/category-actions';

export type CategoryRow = {
  id: string;
  name: string;
  description: string | null;
  defaultInstructions: string | null;
  enabledFields: string[];
  keywords: string[];
  active: boolean;
  sortOrder: number;
  usage: number;
};

export function CategoryList({ categories }: { categories: CategoryRow[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const nextOrder = (categories.at(-1)?.sortOrder ?? 0) + 10;
  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          open={openId === category.id}
          onToggle={() => setOpenId(openId === category.id ? null : category.id)}
        />
      ))}
      <CategoryItem
        category={{
          id: '',
          name: '',
          description: '',
          defaultInstructions: '',
          enabledFields: SELECTION_FIELDS.map((f) => f.key),
          keywords: [],
          active: true,
          sortOrder: nextOrder,
          usage: 0,
        }}
        open={openId === 'new'}
        onToggle={() => setOpenId(openId === 'new' ? null : 'new')}
      />
    </div>
  );
}

function CategoryItem({ category, open, onToggle }: { category: CategoryRow; open: boolean; onToggle: () => void }) {
  const isNew = !category.id;
  const { include, exclude } = splitKeywords(category.keywords);
  return (
    <Card className={cn(!category.active && 'opacity-70')}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
      >
        {isNew ? <Plus className="size-4" /> : null}
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2 font-medium">
            {isNew ? 'Add a category' : category.name}
            {!isNew && !category.active ? <Badge>Hidden</Badge> : null}
            {category.usage ? <span className="text-[0.8rem] font-normal text-muted-foreground">used {category.usage}×</span> : null}
          </span>
          {!isNew ? (
            <span className="block truncate text-[0.8rem] text-muted-foreground">
              {include.slice(0, 8).join(', ')}
              {include.length > 8 ? '…' : ''}
            </span>
          ) : null}
        </span>
        <ChevronDown className={cn('size-4 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>
      {open ? <CategoryForm category={category} include={include} exclude={exclude} onDone={isNew ? onToggle : undefined} /> : null}
    </Card>
  );
}

function CategoryForm({
  category,
  include,
  exclude,
  onDone,
}: {
  category: CategoryRow;
  include: string[];
  exclude: string[];
  onDone?: () => void;
}) {
  const id = useId();
  const router = useRouter();
  const [values, setValues] = useState({
    name: category.name,
    description: category.description ?? '',
    defaultInstructions: category.defaultInstructions ?? '',
    enabledFields: category.enabledFields,
    keywords: include.join(', '),
    excludeKeywords: exclude.join(', '),
    active: category.active,
    sortOrder: String(category.sortOrder),
  });
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [pending, start] = useTransition();

  const save = () =>
    start(async () => {
      const next = await saveCategoryAction({ id: category.id || null, ...values });
      setResult(next);
      if (next.ok) {
        router.refresh();
        onDone?.();
      }
    });

  return (
    <div className="grid gap-4 border-t border-border p-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
        <Field label="Name" htmlFor={`${id}-name`}>
          <TextInput id={`${id}-name`} value={values.name} maxLength={60} onChange={(e) => setValues({ ...values, name: e.target.value })} />
        </Field>
        <Field label="Sort order" htmlFor={`${id}-order`}>
          <TextInput id={`${id}-order`} inputMode="numeric" value={values.sortOrder} onChange={(e) => setValues({ ...values, sortOrder: e.target.value })} />
        </Field>
      </div>
      <Field label="Description" htmlFor={`${id}-desc`} hint="Internal. Helps staff pick the right category.">
        <TextInput id={`${id}-desc`} value={values.description} maxLength={300} onChange={(e) => setValues({ ...values, description: e.target.value })} />
      </Field>
      <Field label="Default instructions for the customer" htmlFor={`${id}-instr`}>
        <TextArea
          id={`${id}-instr`}
          rows={3}
          maxLength={2000}
          value={values.defaultInstructions}
          onChange={(e) => setValues({ ...values, defaultInstructions: e.target.value })}
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Suggest when a line item mentions" htmlFor={`${id}-kw`} hint="Comma separated. Longer phrases count for more.">
          <TextArea id={`${id}-kw`} rows={3} value={values.keywords} onChange={(e) => setValues({ ...values, keywords: e.target.value })} />
        </Field>
        <Field label="But not when it mentions" htmlFor={`${id}-ex`} hint="Comma separated. Use to break ties with other categories.">
          <TextArea id={`${id}-ex`} rows={3} value={values.excludeKeywords} onChange={(e) => setValues({ ...values, excludeKeywords: e.target.value })} />
        </Field>
      </div>
      <fieldset>
        <legend className="mb-2 text-[0.8rem] font-medium">Fields the customer fills in by default</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SELECTION_FIELDS.map((field) => (
            <label key={field.key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="size-4 accent-foreground"
                checked={values.enabledFields.includes(field.key)}
                onChange={(e) =>
                  setValues({
                    ...values,
                    enabledFields: e.target.checked ? [...values.enabledFields, field.key] : values.enabledFields.filter((k) => k !== field.key),
                  })
                }
              />
              {fieldLabel(field.key)}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="size-4 accent-foreground" checked={values.active} onChange={(e) => setValues({ ...values, active: e.target.checked })} />
        Active (offered in suggestions and the builder)
      </label>
      {result ? <Notice tone={result.ok ? 'success' : 'danger'}>{result.message}</Notice> : null}
      <div>
        <Button onClick={save} disabled={pending || !values.name.trim()}>
          {pending ? <LoaderCircle className="animate-spin" /> : null}
          {category.id ? 'Save category' : 'Add category'}
        </Button>
      </div>
    </div>
  );
}
