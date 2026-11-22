import { MAX_NOTES, MAX_PRODUCT_URLS, SELECTION_FIELDS, TEXT_FIELD_KEYS, type TextFieldKey } from "@/lib/selections/fields";

/** What the customer sends when saving or submitting one selection. */
export type SelectionInput = Partial<Record<TextFieldKey, string>> & {
  productUrls?: string[];
  notes?: string;
};

export type SelectionValues = Record<TextFieldKey, string | null> & {
  productUrls: string[];
  notes: string | null;
};

export type ParseResult = { ok: true; values: SelectionValues } | { ok: false; message: string };

function clean(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const text = value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
  return text || null;
}

/** Adds https:// to bare domains. Anything that isn't http(s) is rejected. */
export function normalizeProductUrl(raw: string): string | null {
  const text = raw.trim();
  if (!text) return null;
  const candidate = /^[a-z][a-z0-9+.-]*:/i.test(text) ? text : `https://${text}`;
  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  if (!url.hostname.includes(".") || url.username || url.password) return null;
  return url.toString();
}

/**
 * Validates what the customer typed. Fields the category doesn't use are
 * returned as null so the caller can leave stored values alone.
 */
export function parseSelectionInput(raw: SelectionInput, enabledFields: readonly string[]): ParseResult {
  const enabled = new Set(enabledFields);
  const values = { productUrls: [], notes: null } as unknown as SelectionValues;

  for (const key of TEXT_FIELD_KEYS) {
    const field = SELECTION_FIELDS.find((f) => f.key === key)!;
    const value = enabled.has(key) ? clean(raw[key]) : null;
    if (value && value.length > field.max) return { ok: false, message: `${field.label} must be ${field.max} characters or fewer.` };
    values[key] = value;
  }

  if (enabled.has("productUrls")) {
    const urls: string[] = [];
    for (const entry of raw.productUrls ?? []) {
      if (typeof entry !== "string" || !entry.trim()) continue;
      if (entry.length > 500) return { ok: false, message: "Product links must be 500 characters or fewer." };
      const url = normalizeProductUrl(entry);
      if (!url) return { ok: false, message: `“${entry.slice(0, 60)}” isn't a valid web link.` };
      if (!urls.includes(url)) urls.push(url);
    }
    if (urls.length > MAX_PRODUCT_URLS) return { ok: false, message: `Add up to ${MAX_PRODUCT_URLS} product links.` };
    values.productUrls = urls;
  }

  const notes = clean(raw.notes);
  if (notes && notes.length > MAX_NOTES) return { ok: false, message: `Notes must be ${MAX_NOTES} characters or fewer.` };
  values.notes = notes;

  return { ok: true, values };
}

/** A submission needs at least one detail, link, note, or file. */
export function hasSubmittableContent(values: SelectionValues, attachmentCount: number): boolean {
  return TEXT_FIELD_KEYS.some((key) => values[key]) || values.productUrls.length > 0 || Boolean(values.notes) || attachmentCount > 0;
}
