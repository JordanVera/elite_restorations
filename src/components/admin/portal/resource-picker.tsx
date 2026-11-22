"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { Button, Card, CardHeader, Notice } from "@/components/admin/ui";
import { ResourceCards } from "@/components/portal/resource-cards";
import { SupplierMark } from "@/components/portal/supplier-mark";
import { suggestedResourceSlugs, type PortalResource } from "@/lib/selections/resources";
import { cn } from "@/lib/utils";
import { updatePortalResourcesAction } from "@/server/portal/admin-actions";

export function ResourcePicker({
  portalId,
  editable,
  customized,
  savedSlugs,
  categorySlugs,
  catalog,
}: {
  portalId: string;
  editable: boolean;
  customized: boolean;
  savedSlugs: string[];
  categorySlugs: string[];
  catalog: PortalResource[];
}) {
  const router = useRouter();
  const suggested = useMemo(() => suggestedResourceSlugs(catalog, categorySlugs), [catalog, categorySlugs]);
  const initial = customized ? savedSlugs : suggested;
  const [selected, setSelected] = useState<string[]>(initial);
  const [prev, setPrev] = useState({ customized, savedSlugs, suggested });
  const [pending, start] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  if (prev.customized !== customized || prev.savedSlugs !== savedSlugs || prev.suggested !== suggested) {
    setPrev({ customized, savedSlugs, suggested });
    setSelected(customized ? savedSlugs : suggested);
  }

  const suggestedSet = new Set(suggested);
  const selectedSet = new Set(selected);
  const same = (a: readonly string[], b: readonly string[]) => a.length === b.length && a.every((slug, i) => slug === b[i]);
  const dirty = customized ? !same(selected, savedSlugs) : !same(selected, suggested);
  const preview = catalog.filter((resource) => selectedSet.has(resource.slug));
  const options = catalog.filter((resource) => resource.active !== false || selectedSet.has(resource.slug));

  const toggle = (slug: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return catalog.filter((resource) => next.has(resource.slug)).map((resource) => resource.slug);
    });
    setResult(null);
  };

  const save = (slugs: string[], useSuggested: boolean) =>
    start(async () => {
      const next = await updatePortalResourcesAction(portalId, { slugs, useSuggested });
      setResult(next);
      if (next.ok) router.refresh();
    });

  return (
    <Card>
      <CardHeader
        title="Shopping resources"
        description="Customers see these logos and links on their portal, matched to the materials they need to choose. Add more suppliers under Settings."
      />
      <div className="grid gap-3 p-5">
        {options.length === 0 ? (
          <p className="text-sm text-muted-foreground">No shopping resources yet. Add them under Settings → Shopping resources.</p>
        ) : (
          options.map((resource) => {
            const checked = selectedSet.has(resource.slug);
            const isSuggested = suggestedSet.has(resource.slug);
            return (
              <label
                key={resource.slug}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-[10px] border p-3",
                  checked ? "border-foreground/20 bg-surface-2/40" : "border-border bg-white",
                  !editable && "cursor-default opacity-80",
                )}
              >
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-foreground"
                  checked={checked}
                  disabled={!editable}
                  onChange={() => editable && toggle(resource.slug)}
                />
                <SupplierMark resource={resource} className="mt-0.5 size-9 rounded-[8px]" />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{resource.name}</span>
                    {isSuggested ? <span className="text-[0.7rem] font-medium text-emerald-800">Suggested</span> : null}
                    {resource.active === false ? <span className="text-[0.7rem] text-muted-foreground">Hidden</span> : null}
                  </span>
                  <span className="mt-0.5 block text-[0.8rem] leading-relaxed text-muted-foreground">{resource.recommendedFor}</span>
                </span>
              </label>
            );
          })
        )}

        {result ? <Notice tone={result.ok ? "success" : "danger"}>{result.message}</Notice> : null}

        {editable ? (
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => save(selected, false)} disabled={pending || !dirty}>
              {pending ? <LoaderCircle className="animate-spin" /> : null}
              Save resources
            </Button>
            {customized ? (
              <Button variant="secondary" onClick={() => save(suggested, true)} disabled={pending}>
                Use suggested
              </Button>
            ) : null}
          </div>
        ) : null}

        {preview.length ? (
          <div className="border-t border-border pt-4">
            <p className="text-[0.8rem] font-medium text-muted-foreground">Customer preview</p>
            <ResourceCards resources={preview} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Add a selection such as paint or flooring, or check a supplier, to show shopping links on the customer portal.
          </p>
        )}
      </div>
    </Card>
  );
}
