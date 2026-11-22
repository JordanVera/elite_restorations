/** Fields a customer can fill in for a selection. Categories choose which ones to show. */
export const SELECTION_FIELDS = [
  { key: "productName", label: "Product name", placeholder: "e.g. Calacatta Laza", max: 200 },
  { key: "manufacturer", label: "Brand or manufacturer", placeholder: "e.g. MSI", max: 200 },
  { key: "modelSku", label: "Model or SKU", placeholder: "From the tag or website", max: 120 },
  { key: "color", label: "Color", placeholder: "e.g. Agreeable Gray SW 7029", max: 120 },
  { key: "finish", label: "Finish", placeholder: "e.g. matte, polished, brushed nickel", max: 120 },
  { key: "dimensions", label: "Size or dimensions", placeholder: "e.g. 12 x 24 in", max: 120 },
  { key: "productUrls", label: "Product links", placeholder: "https://", max: 500 },
  { key: "attachments", label: "Photos or spec sheets", placeholder: "", max: 0 },
] as const;

export type SelectionFieldKey = (typeof SELECTION_FIELDS)[number]["key"];
export type TextFieldKey = Exclude<SelectionFieldKey, "productUrls" | "attachments">;

export const FIELD_KEYS: readonly SelectionFieldKey[] = SELECTION_FIELDS.map((field) => field.key);
export const TEXT_FIELD_KEYS: readonly TextFieldKey[] = ["productName", "manufacturer", "modelSku", "color", "finish", "dimensions"];

export const MAX_PRODUCT_URLS = 5;
export const MAX_NOTES = 2000;

export function sanitizeFieldKeys(keys: readonly string[]): SelectionFieldKey[] {
  const allowed = new Set<string>(FIELD_KEYS);
  return FIELD_KEYS.filter((key) => keys.includes(key) && allowed.has(key));
}

export function fieldLabel(key: string): string {
  return SELECTION_FIELDS.find((field) => field.key === key)?.label ?? key;
}
