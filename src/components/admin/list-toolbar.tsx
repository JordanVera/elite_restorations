'use client';

import { LoaderCircle, Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';

import { SelectInput } from '@/components/admin/ui';

export type ToolbarSelect = {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
};

/** Search box and filter selects that keep their state in the URL. */
export function ListToolbar({ placeholder, query, selects }: { placeholder: string; query: string; selects: ToolbarSelect[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, start] = useTransition();
  const [text, setText] = useState(query);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const update = (changes: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    params.delete('page');
    const next = params.toString();
    start(() => router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false }));
  };

  const onSearch = (value: string) => {
    setText(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => update({ q: value.trim() }), 300);
  };

  return (
    <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center">
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search</span>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={text}
          onChange={(event) => onSearch(event.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-[8px] border border-input bg-white pr-9 pl-9 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-foreground/50 focus:ring-2 focus:ring-foreground/10 [&::-webkit-search-cancel-button]:hidden"
        />
        {pending ? (
          <LoaderCircle className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        ) : text ? (
          <button
            type="button"
            onClick={() => onSearch('')}
            className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </label>
      <div className="flex flex-wrap gap-2">
        {selects.map((select) => (
          <label key={select.name} className="flex items-center gap-2 text-[0.8rem] text-muted-foreground">
            <span className="whitespace-nowrap">{select.label}</span>
            <SelectInput
              value={select.value}
              onChange={(event) => update({ [select.name]: event.target.value })}
              className="h-9 w-auto min-w-32 text-foreground"
            >
              {select.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectInput>
          </label>
        ))}
      </div>
    </div>
  );
}
