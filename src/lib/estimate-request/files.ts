/** File rules for the project estimate request. Shared by the browser and the server. */

export const MAX_ROOMS = 15;
export const MAX_ROOM_FILES = 10;
export const MAX_ADJUSTER_FILES = 5;
export const MAX_VIDEO_BYTES = 25 * 1024 * 1024;
export const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
export const MAX_PDF_BYTES = 10 * 1024 * 1024;
export const MAX_SUBMISSION_FILES = MAX_ROOMS * MAX_ROOM_FILES + MAX_ROOMS + MAX_ADJUSTER_FILES;

export const ESTIMATE_EXTS = ["jpg", "png", "webp", "pdf", "mp4", "webm", "mov", "heic"] as const;
export type EstimateExt = (typeof ESTIMATE_EXTS)[number];
export type EstimateRole = "media" | "sketch" | "adjuster";

export const EXT_CONTENT_TYPE: Record<EstimateExt, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  pdf: "application/pdf",
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  heic: "image/heic",
};

export const MEDIA_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const;

export const DOC_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
] as const;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ACCESS_KEY = /^[0-9a-f]{32}$/;

const MEDIA_PATH =
  /^estimate-requests\/([0-9a-f-]{36})\/([0-9a-f]{32})\/rooms\/(\d{1,2})\/([0-9a-f-]{36})\.(jpg|png|webp|pdf|mp4|webm|mov|heic)$/i;
const SKETCH_PATH =
  /^estimate-requests\/([0-9a-f-]{36})\/([0-9a-f]{32})\/rooms\/(\d{1,2})\/sketch-([0-9a-f-]{36})\.(jpg|png|webp|pdf|heic)$/i;
const ADJUSTER_PATH =
  /^estimate-requests\/([0-9a-f-]{36})\/([0-9a-f]{32})\/adjuster\/([0-9a-f-]{36})\.(jpg|png|webp|pdf|heic)$/i;

export type ParsedEstimatePath = {
  submissionId: string;
  accessKey: string;
  role: EstimateRole;
  roomIndex: number | null;
  fileId: string;
  ext: EstimateExt;
};

export function isUuid(value: string): boolean {
  return UUID.test(value);
}

export function isAccessKey(value: string): boolean {
  return ACCESS_KEY.test(value);
}

export function maxBytesForExt(ext: EstimateExt): number {
  if (ext === "mp4" || ext === "webm" || ext === "mov") return MAX_VIDEO_BYTES;
  if (ext === "pdf") return MAX_PDF_BYTES;
  return MAX_IMAGE_BYTES;
}

export function isVideoExt(ext: EstimateExt): boolean {
  return ext === "mp4" || ext === "webm" || ext === "mov";
}

function asExt(value: string): EstimateExt | null {
  const ext = value.toLowerCase();
  return (ESTIMATE_EXTS as readonly string[]).includes(ext) ? (ext as EstimateExt) : null;
}

export function parseEstimatePath(pathname: string): ParsedEstimatePath | null {
  const media = MEDIA_PATH.exec(pathname);
  if (media) {
    const roomIndex = Number(media[3]);
    const ext = asExt(media[5]);
    if (!ext || roomIndex > MAX_ROOMS - 1 || !isUuid(media[1]) || !isUuid(media[4])) return null;
    return { submissionId: media[1].toLowerCase(), accessKey: media[2].toLowerCase(), role: "media", roomIndex, fileId: media[4].toLowerCase(), ext };
  }
  const sketch = SKETCH_PATH.exec(pathname);
  if (sketch) {
    const roomIndex = Number(sketch[3]);
    const ext = asExt(sketch[5]);
    if (!ext || roomIndex > MAX_ROOMS - 1 || !isUuid(sketch[1]) || !isUuid(sketch[4])) return null;
    return { submissionId: sketch[1].toLowerCase(), accessKey: sketch[2].toLowerCase(), role: "sketch", roomIndex, fileId: sketch[4].toLowerCase(), ext };
  }
  const adjuster = ADJUSTER_PATH.exec(pathname);
  if (adjuster) {
    const ext = asExt(adjuster[4]);
    if (!ext || !isUuid(adjuster[1]) || !isUuid(adjuster[3])) return null;
    return { submissionId: adjuster[1].toLowerCase(), accessKey: adjuster[2].toLowerCase(), role: "adjuster", roomIndex: null, fileId: adjuster[3].toLowerCase(), ext };
  }
  return null;
}

export function buildEstimatePath(input: {
  submissionId: string;
  accessKey: string;
  role: EstimateRole;
  roomIndex?: number;
  fileId: string;
  ext: EstimateExt;
}): string | null {
  const submissionId = input.submissionId.toLowerCase();
  const accessKey = input.accessKey.toLowerCase();
  const fileId = input.fileId.toLowerCase();
  if (!isUuid(submissionId) || !isAccessKey(accessKey) || !isUuid(fileId)) return null;
  if (input.role === "adjuster") {
    if (isVideoExt(input.ext)) return null;
    return `estimate-requests/${submissionId}/${accessKey}/adjuster/${fileId}.${input.ext}`;
  }
  if (input.roomIndex === undefined || input.roomIndex < 0 || input.roomIndex > MAX_ROOMS - 1) return null;
  const folder = `estimate-requests/${submissionId}/${accessKey}/rooms/${input.roomIndex}`;
  if (input.role === "sketch") {
    if (isVideoExt(input.ext)) return null;
    return `${folder}/sketch-${fileId}.${input.ext}`;
  }
  return `${folder}/${fileId}.${input.ext}`;
}

/** Public download link. The access key in the path is the secret. */
export function estimateFileUrl(origin: string, pathname: string): string | null {
  const parsed = parseEstimatePath(pathname);
  if (!parsed) return null;
  const prefix = `estimate-requests/${parsed.submissionId}/${parsed.accessKey}/`;
  if (!pathname.toLowerCase().startsWith(prefix)) return null;
  const suffix = pathname.slice(prefix.length);
  const base = origin.replace(/\/$/, "");
  return `${base}/api/estimate-files/${parsed.submissionId}/${parsed.accessKey}/${suffix}`;
}

function at(bytes: Uint8Array, offset: number, ...values: number[]) {
  if (offset + values.length > bytes.length) return false;
  return values.every((value, index) => bytes[offset + index] === value);
}

function ascii(bytes: Uint8Array, offset: number, text: string) {
  return at(bytes, offset, ...Array.from(text, (char) => char.charCodeAt(0)));
}

/** Detects the real type from the first bytes so a renamed file cannot pose as a photo. */
export function sniffEstimateExt(bytes: Uint8Array): EstimateExt | null {
  if (at(bytes, 0, 0xff, 0xd8, 0xff)) return "jpg";
  if (at(bytes, 0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return "png";
  if (ascii(bytes, 0, "RIFF") && ascii(bytes, 8, "WEBP")) return "webp";
  if (ascii(bytes, 0, "%PDF-")) return "pdf";
  if (at(bytes, 0, 0x1a, 0x45, 0xdf, 0xa3)) return "webm";
  if (!ascii(bytes, 4, "ftyp") || bytes.length < 12) return null;
  const brand = String.fromCharCode(...bytes.slice(8, 12)).toLowerCase();
  if (["heic", "heix", "heim", "heis", "hevc", "hevx", "mif1", "msf1", "heif"].includes(brand)) return "heic";
  if (brand.startsWith("qt")) return "mov";
  if (
    brand.startsWith("isom") ||
    brand.startsWith("iso") ||
    brand.startsWith("mp4") ||
    brand.startsWith("avc") ||
    brand.startsWith("m4v") ||
    brand.startsWith("dash") ||
    ["msnv", "ndsc", "ndsh"].includes(brand)
  ) {
    return "mp4";
  }
  return null;
}
