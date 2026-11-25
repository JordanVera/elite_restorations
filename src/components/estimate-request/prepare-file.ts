import { cleanFileName } from "@/lib/selections/uploads";
import {
  EXT_CONTENT_TYPE,
  MAX_IMAGE_BYTES,
  MAX_PDF_BYTES,
  MAX_VIDEO_BYTES,
  type EstimateExt,
  type EstimateRole,
} from "@/lib/estimate-request/files";
import { resizeToJpeg } from "@/lib/photos-client";

export type PreparedFile = {
  blob: Blob;
  name: string;
  contentType: string;
  ext: EstimateExt;
};

const VIDEO_EXT: Record<string, EstimateExt> = {
  mp4: "mp4",
  webm: "webm",
  mov: "mov",
};

const IMAGE_EXT: Record<string, EstimateExt> = {
  jpg: "jpg",
  jpeg: "jpg",
  png: "png",
  webp: "webp",
  heic: "heic",
  heif: "heic",
};

function extension(name: string) {
  const match = /\.([A-Za-z0-9]+)$/.exec(name);
  return match ? match[1].toLowerCase() : "";
}

function withExt(name: string, ext: string) {
  const base = name.replace(/\.[^.]+$/, "").trim() || "file";
  return `${base}.${ext}`;
}

function isVideo(file: File) {
  return file.type.startsWith("video/") || extension(file.name) in VIDEO_EXT;
}

function isPdf(file: File) {
  return file.type === "application/pdf" || extension(file.name) === "pdf";
}

export async function prepareEstimateFile(file: File, role: EstimateRole): Promise<PreparedFile> {
  if (file.size <= 0) throw new Error("That file is empty.");

  if (isVideo(file)) {
    if (role !== "media") throw new Error("Use a photo or a PDF for this upload.");
    const ext = VIDEO_EXT[extension(file.name)] ?? (file.type === "video/webm" ? "webm" : file.type === "video/quicktime" ? "mov" : file.type === "video/mp4" ? "mp4" : null);
    if (!ext) throw new Error("Use an MP4, WebM, or MOV video.");
    if (file.size > MAX_VIDEO_BYTES) throw new Error("Videos need to be 25 MB or smaller. Trim it and try again.");
    return { blob: file, name: withExt(cleanFileName(file.name), ext), contentType: EXT_CONTENT_TYPE[ext], ext };
  }

  if (isPdf(file)) {
    if (file.size > MAX_PDF_BYTES) throw new Error("PDFs need to be 10 MB or smaller.");
    return { blob: file, name: withExt(cleanFileName(file.name), "pdf"), contentType: "application/pdf", ext: "pdf" };
  }

  if (file.size > MAX_VIDEO_BYTES) throw new Error("That photo is too large. Try a smaller one.");

  try {
    const blob = await resizeToJpeg(file);
    if (blob.size > MAX_IMAGE_BYTES) throw new Error("That photo is still too large after reducing it.");
    return { blob, name: withExt(cleanFileName(file.name), "jpg"), contentType: "image/jpeg", ext: "jpg" };
  } catch (error) {
    if (error instanceof Error && /too large/.test(error.message)) throw error;
    const ext = IMAGE_EXT[extension(file.name)];
    if (!ext || file.size > MAX_IMAGE_BYTES) throw new Error("We could not read that photo. Try a JPEG or PNG.");
    return { blob: file, name: withExt(cleanFileName(file.name), ext), contentType: EXT_CONTENT_TYPE[ext], ext };
  }
}
