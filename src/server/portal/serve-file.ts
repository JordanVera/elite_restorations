import "server-only";

import { isPreviewableImage } from "@/lib/selections/uploads";
import { readFileStream } from "@/server/portal/storage";

/**
 * Streams a private upload. Content types come from the allow-list, nosniff
 * stops the browser from guessing otherwise, and the sandbox CSP keeps any
 * file that slipped through from running script on this origin.
 */
export async function fileResponse(
  file: { blobPathname: string; contentType: string; originalName: string; size: number },
  download: boolean,
): Promise<Response> {
  const stream = await readFileStream(file.blobPathname);
  if (!stream) return new Response("Not found", { status: 404 });
  const inline = !download && (isPreviewableImage(file.contentType) || file.contentType === "application/pdf");
  const asciiName = file.originalName.replace(/[^\x20-\x7e]/g, "_").replace(/["\\]/g, "_");
  const disposition = `${inline ? "inline" : "attachment"}; filename="${asciiName}"; filename*=UTF-8''${encodeURIComponent(file.originalName)}`;
  const headers: Record<string, string> = {
    "Content-Type": file.contentType,
    "Content-Disposition": disposition,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    "Cross-Origin-Resource-Policy": "same-origin",
  };
  if (file.contentType !== "application/pdf") headers["Content-Security-Policy"] = "default-src 'none'; sandbox";
  return new Response(stream, { headers });
}
