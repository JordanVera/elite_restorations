export const PHOTO_MAX_EDGE = 1600;
const PHOTO_QUALITY = 0.82;

async function decode(file: File): Promise<{ source: CanvasImageSource; width: number; height: number; release: () => void }> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    return { source: bitmap, width: bitmap.width, height: bitmap.height, release: () => bitmap.close() };
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      return {
        source: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        release: () => URL.revokeObjectURL(url),
      };
    } catch (error) {
      URL.revokeObjectURL(url);
      throw error;
    }
  }
}

/** Downscales a photo to a JPEG so uploads stay small on cellular connections. */
export async function resizeToJpeg(file: File, maxEdge = PHOTO_MAX_EDGE): Promise<Blob> {
  const { source, width, height, release } = await decode(file);
  try {
    const scale = Math.min(1, maxEdge / Math.max(width, height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not available.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(source, 0, 0, canvas.width, canvas.height);

    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not encode the photo."))), "image/jpeg", PHOTO_QUALITY),
    );
  } finally {
    release();
  }
}

export type PhotoUploadResult =
  | { ok: true; pathname: string }
  | { ok: false; reason: "not-configured" | "rate-limited" | "failed" };

export async function uploadLeadPhoto(photo: Blob): Promise<PhotoUploadResult> {
  const body = new FormData();
  body.append("file", photo, "photo.jpg");

  try {
    const response = await fetch("/api/lead-photos", { method: "POST", body });
    if (response.ok) {
      const data = (await response.json()) as { pathname: string };
      return { ok: true, pathname: data.pathname };
    }
    if (response.status === 503) return { ok: false, reason: "not-configured" };
    if (response.status === 429) return { ok: false, reason: "rate-limited" };
    return { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
