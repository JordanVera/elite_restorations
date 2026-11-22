/** Rules for customer photo and spec sheet uploads. Pure, shared by routes, actions, the portal UI, and tests. */

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const MAX_ATTACHMENTS_PER_SELECTION = 10;

export const UPLOAD_TYPES = {
  "image/jpeg": ["jpg", "jpeg"],
  "image/png": ["png"],
  "image/webp": ["webp"],
  "image/heic": ["heic"],
  "image/heif": ["heif"],
  "application/pdf": ["pdf"],
} as const;

export type UploadType = keyof typeof UPLOAD_TYPES;

export const UPLOAD_CONTENT_TYPES = Object.keys(UPLOAD_TYPES) as UploadType[];

/** For <input accept>. Extensions too, because some phones report HEIC as an empty type. */
export const UPLOAD_ACCEPT = [...UPLOAD_CONTENT_TYPES, ...Object.values(UPLOAD_TYPES).flat().map((ext) => `.${ext}`)].join(",");

export function isUploadType(value: string): value is UploadType {
  return Object.hasOwn(UPLOAD_TYPES, value);
}

function extensionOf(name: string): string {
  const match = /\.([A-Za-z0-9]+)$/.exec(name);
  return match ? match[1].toLowerCase() : "";
}

/** The declared type, or one inferred from the extension when the browser left it blank. */
export function resolveUploadType(name: string, declared: string): UploadType | null {
  const type = declared.toLowerCase().trim();
  if (isUploadType(type)) return type;
  if (type && type !== "application/octet-stream") return null;
  const ext = extensionOf(name);
  for (const candidate of UPLOAD_CONTENT_TYPES) {
    if ((UPLOAD_TYPES[candidate] as readonly string[]).includes(ext)) return candidate;
  }
  return null;
}

export function describeUploadError(file: { name: string; size: number; type: string }): string | null {
  if (!resolveUploadType(file.name, file.type)) return `${file.name}: use a JPG, PNG, WebP, HEIC, or PDF file.`;
  if (file.size <= 0) return `${file.name} is empty.`;
  if (file.size > MAX_UPLOAD_BYTES) return `${file.name} is larger than 10 MB.`;
  return null;
}

/** Detects the real type from the first bytes so a renamed file can't pose as an image. */
export function sniffUploadType(bytes: Uint8Array): UploadType | null {
  const at = (offset: number, ...values: number[]) => values.every((value, i) => bytes[offset + i] === value);
  const ascii = (offset: number, text: string) => at(offset, ...Array.from(text, (c) => c.charCodeAt(0)));
  if (at(0, 0xff, 0xd8, 0xff)) return "image/jpeg";
  if (at(0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return "image/png";
  if (ascii(0, "RIFF") && ascii(8, "WEBP")) return "image/webp";
  if (ascii(0, "%PDF-")) return "application/pdf";
  if (ascii(4, "ftyp")) {
    const brand = String.fromCharCode(...bytes.slice(8, 12));
    if (["heic", "heix", "heim", "heis", "hevc", "hevx"].includes(brand)) return "image/heic";
    if (["mif1", "msf1", "heif"].includes(brand)) return "image/heif";
  }
  return null;
}

/** HEIC and HEIF are the same family; phones and browsers mix the labels. */
export function sameUploadFamily(a: UploadType, b: UploadType): boolean {
  const family = (t: UploadType) => (t === "image/heif" ? "image/heic" : t);
  return family(a) === family(b);
}

/** Display name only. Storage paths never use it. */
export function cleanFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "";
  const cleaned = base.replace(/[\u0000-\u001f\u007f"<>|*?:]/g, "").replace(/\s+/g, " ").trim();
  if (!cleaned) return "file";
  if (cleaned.length <= 120) return cleaned;
  const ext = extensionOf(cleaned);
  return ext ? `${cleaned.slice(0, 110 - ext.length)}….${ext}` : cleaned.slice(0, 120);
}

export function uploadPrefix(portalId: string, requirementId: string): string {
  return `portal-uploads/${portalId}/${requirementId}/`;
}

/** Random, extension from the verified type. The customer's file name never reaches storage. */
export function uploadPathname(portalId: string, requirementId: string, type: UploadType, id: string): string {
  return `${uploadPrefix(portalId, requirementId)}${id}.${UPLOAD_TYPES[type][0]}`;
}

/** Blob may append a random suffix, so only the prefix and extension are fixed. */
export function isUploadPathFor(pathname: string, portalId: string, requirementId: string): boolean {
  const prefix = uploadPrefix(portalId, requirementId);
  if (!pathname.startsWith(prefix)) return false;
  const rest = pathname.slice(prefix.length);
  return /^[A-Za-z0-9_-]{1,80}\.[a-z]{3,4}$/.test(rest);
}

export function isPreviewableImage(contentType: string): boolean {
  return contentType === "image/jpeg" || contentType === "image/png" || contentType === "image/webp";
}

export function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
