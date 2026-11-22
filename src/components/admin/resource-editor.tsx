'use client';

import { ChevronDown, LoaderCircle, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useId, useRef, useState, useTransition } from 'react';

import { Badge, Button, Card, Field, Notice, TextArea, TextInput } from '@/components/admin/ui';
import { SupplierMark } from '@/components/portal/supplier-mark';
import { cn } from '@/lib/utils';
import { deleteResourceAction, saveResourceAction } from '@/server/portal/resource-actions';

export type ResourceRow = {
  id: string;
  slug: string;
  name: string;
  url: string;
  recommendedFor: string;
  location: string | null;
  logoPath: string | null;
  categorySlugs: string[];
  active: boolean;
  sortOrder: number;
};

export type CategoryOption = { slug: string; name: string };

export function ResourceList({ resources, categories }: { resources: ResourceRow[]; categories: CategoryOption[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const nextOrder = (resources.at(-1)?.sortOrder ?? 0) + 10;
  return (
    <div className="space-y-3">
      {resources.map((resource) => (
        <ResourceItem
          key={resource.id}
          resource={resource}
          categories={categories}
          open={openId === resource.id}
          onToggle={() => setOpenId(openId === resource.id ? null : resource.id)}
        />
      ))}
      <ResourceItem
        resource={{
          id: '',
          slug: '',
          name: '',
          url: '',
          recommendedFor: '',
          location: '',
          logoPath: null,
          categorySlugs: [],
          active: true,
          sortOrder: nextOrder,
        }}
        categories={categories}
        open={openId === 'new'}
        onToggle={() => setOpenId(openId === 'new' ? null : 'new')}
      />
    </div>
  );
}

function ResourceItem({
  resource,
  categories,
  open,
  onToggle,
}: {
  resource: ResourceRow;
  categories: CategoryOption[];
  open: boolean;
  onToggle: () => void;
}) {
  const isNew = !resource.id;
  return (
    <Card className={cn(!resource.active && 'opacity-70')}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
      >
        {isNew ? <Plus className="size-4" /> : <SupplierMark resource={resource} className="size-10 rounded-[8px]" />}
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2 font-medium">
            {isNew ? 'Add a resource' : resource.name}
            {!isNew && !resource.active ? <Badge>Hidden</Badge> : null}
          </span>
          {!isNew ? (
            <span className="block truncate text-[0.8rem] text-muted-foreground">{resource.recommendedFor}</span>
          ) : null}
        </span>
        <ChevronDown className={cn('size-4 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>
      {open ? <ResourceForm resource={resource} categories={categories} onDone={isNew ? onToggle : undefined} /> : null}
    </Card>
  );
}

function ResourceForm({
  resource,
  categories,
  onDone,
}: {
  resource: ResourceRow;
  categories: CategoryOption[];
  onDone?: () => void;
}) {
  const id = useId();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({
    name: resource.name,
    url: resource.url,
    recommendedFor: resource.recommendedFor,
    location: resource.location ?? '',
    categorySlugs: resource.categorySlugs,
    active: resource.active,
    sortOrder: String(resource.sortOrder),
    removeLogo: false,
  });
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [pending, start] = useTransition();

  const save = () =>
    start(async () => {
      const form = new FormData();
      form.set('id', resource.id);
      form.set('name', values.name);
      form.set('url', values.url);
      form.set('recommendedFor', values.recommendedFor);
      form.set('location', values.location);
      form.set('active', values.active ? 'true' : 'false');
      form.set('sortOrder', values.sortOrder);
      form.set('removeLogo', values.removeLogo ? 'true' : 'false');
      for (const slug of values.categorySlugs) form.append('categorySlugs', slug);
      const file = fileRef.current?.files?.[0];
      if (file) form.set('logo', file);
      const next = await saveResourceAction(form);
      setResult(next);
      if (next.ok) {
        router.refresh();
        onDone?.();
      }
    });

  const remove = () =>
    start(async () => {
      if (!resource.id) return;
      if (!window.confirm(`Remove “${resource.name}” from the catalog? Portals that already list it will drop the link.`)) return;
      const next = await deleteResourceAction(resource.id);
      setResult(next);
      if (next.ok) router.refresh();
    });

  return (
    <div className="grid gap-4 border-t border-border p-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
        <Field label="Name" htmlFor={`${id}-name`}>
          <TextInput id={`${id}-name`} value={values.name} maxLength={80} onChange={(e) => setValues({ ...values, name: e.target.value })} />
        </Field>
        <Field label="Sort order" htmlFor={`${id}-order`}>
          <TextInput id={`${id}-order`} inputMode="numeric" value={values.sortOrder} onChange={(e) => setValues({ ...values, sortOrder: e.target.value })} />
        </Field>
      </div>
      <Field label="Website" htmlFor={`${id}-url`} hint="Opens in a new tab for the customer.">
        <TextInput id={`${id}-url`} type="url" value={values.url} maxLength={300} placeholder="https://" onChange={(e) => setValues({ ...values, url: e.target.value })} />
      </Field>
      <Field label="We recommend them for" htmlFor={`${id}-rec`}>
        <TextArea
          id={`${id}-rec`}
          rows={3}
          maxLength={400}
          value={values.recommendedFor}
          onChange={(e) => setValues({ ...values, recommendedFor: e.target.value })}
        />
      </Field>
      <Field label="Location (optional)" htmlFor={`${id}-loc`} hint="Shown under the recommendation, for Houston yards.">
        <TextInput id={`${id}-loc`} value={values.location} maxLength={200} onChange={(e) => setValues({ ...values, location: e.target.value })} />
      </Field>
      <fieldset>
        <legend className="mb-2 text-[0.8rem] font-medium">Suggest when the portal includes</legend>
        {categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">Add selection categories first, then come back to match this supplier.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {categories.map((category) => (
              <label key={category.slug} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="size-4 accent-foreground"
                  checked={values.categorySlugs.includes(category.slug)}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      categorySlugs: e.target.checked
                        ? [...values.categorySlugs, category.slug]
                        : values.categorySlugs.filter((slug) => slug !== category.slug),
                    })
                  }
                />
                {category.name}
              </label>
            ))}
          </div>
        )}
      </fieldset>
      <Field label="Logo" htmlFor={`${id}-logo`} hint="PNG, JPEG, WebP, or SVG, up to 2 MB. We keep a copy on this site.">
        <div className="flex flex-wrap items-center gap-3">
          {resource.logoPath && !values.removeLogo ? <SupplierMark resource={resource} /> : null}
          <input
            ref={fileRef}
            id={`${id}-logo`}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,.svg,.png,.jpg,.jpeg,.webp"
            className="text-sm file:mr-3 file:rounded-[8px] file:border file:border-input file:bg-white file:px-3 file:py-1.5 file:text-sm"
          />
        </div>
        {resource.logoPath ? (
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-foreground"
              checked={values.removeLogo}
              onChange={(e) => setValues({ ...values, removeLogo: e.target.checked })}
            />
            Remove current logo
          </label>
        ) : null}
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="size-4 accent-foreground" checked={values.active} onChange={(e) => setValues({ ...values, active: e.target.checked })} />
        Active (offered on new portals; hidden ones stay on portals that already picked them)
      </label>
      {result ? <Notice tone={result.ok ? 'success' : 'danger'}>{result.message}</Notice> : null}
      <div className="flex flex-wrap gap-2">
        <Button onClick={save} disabled={pending || !values.name.trim() || !values.url.trim()}>
          {pending ? <LoaderCircle className="animate-spin" /> : null}
          {resource.id ? 'Save resource' : 'Add resource'}
        </Button>
        {resource.id ? (
          <Button variant="danger-outline" onClick={remove} disabled={pending}>
            Remove
          </Button>
        ) : null}
      </div>
    </div>
  );
}
