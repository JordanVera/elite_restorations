/** Parses list-page search params. Unknown values fall back to defaults so URLs can't produce invalid queries. */

export const PAGE_SIZE = 25;

type Raw = Record<string, string | string[] | undefined>;

function one(raw: Raw, key: string): string {
  const value = raw[key];
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

function pick<T extends string>(value: string, allowed: readonly T[], fallback: T): T {
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

function pageNumber(value: string): number {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 && n < 10_000 ? n : 1;
}

export const CUSTOMER_SORTS = ["name", "recent", "quotes"] as const;
export type CustomerSort = (typeof CUSTOMER_SORTS)[number];

export function customerListParams(raw: Raw) {
  return {
    q: one(raw, "q").slice(0, 100),
    sort: pick(one(raw, "sort"), CUSTOMER_SORTS, "name"),
    page: pageNumber(one(raw, "page")),
  };
}

export const QUOTE_SORTS = ["newest", "oldest", "total"] as const;
export type QuoteSort = (typeof QUOTE_SORTS)[number];
export const PORTAL_FILTERS = ["any", "none", "draft", "published"] as const;
export type PortalFilter = (typeof PORTAL_FILTERS)[number];

export function quoteListParams(raw: Raw, statuses: readonly string[], canSeeTotals: boolean) {
  const sort = pick(one(raw, "sort"), QUOTE_SORTS, "newest");
  return {
    q: one(raw, "q").slice(0, 100),
    status: pick(one(raw, "status"), ["", ...statuses], ""),
    portal: pick(one(raw, "portal"), PORTAL_FILTERS, "any"),
    sort: sort === "total" && !canSeeTotals ? ("newest" as const) : sort,
    page: pageNumber(one(raw, "page")),
  };
}

/** Builds a URL for the same list with some params changed. Resets to page 1 unless page is set. */
export function listHref(path: string, current: Record<string, string | number>, changes: Record<string, string | number | null>) {
  const params = new URLSearchParams();
  const merged: Record<string, string | number | null> = { ...current, page: 1, ...changes };
  for (const [key, value] of Object.entries(merged)) {
    if (value === null || value === "" || (key === "page" && value === 1)) continue;
    params.set(key, String(value));
  }
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}
