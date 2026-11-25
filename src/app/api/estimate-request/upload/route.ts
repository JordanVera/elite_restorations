import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import {
  DOC_CONTENT_TYPES,
  EXT_CONTENT_TYPE,
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES,
  MEDIA_CONTENT_TYPES,
  maxBytesForExt,
  parseEstimatePath,
  sniffEstimateExt,
} from "@/lib/estimate-request/files";
import { isRateLimited } from "@/server/rate-limit";
import { privateBlobToken } from "@/server/private-blob";
import { storageMode, storeFile, STORAGE_MISSING } from "@/server/portal/storage";
import { clientIp } from "@/server/trpc/init";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOADS_PER_WINDOW = 200;

function fail(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: Request) {
  if (isRateLimited(`estimate-upload:${clientIp(request)}`, { max: UPLOADS_PER_WINDOW })) {
    return fail("Too many files in a short time. Wait a few minutes, or call us.", 429);
  }

  const mode = storageMode();
  if (mode === "none") return fail(STORAGE_MISSING, 503);

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    if (mode !== "blob") return fail("Direct uploads are not available.", 400);
    let body: HandleUploadBody;
    try {
      body = (await request.json()) as HandleUploadBody;
    } catch {
      return fail("Invalid upload request.");
    }
    try {
      const result = await handleUpload({
        body,
        request,
        token: privateBlobToken(),
        onBeforeGenerateToken: async (pathname) => {
          const parsed = parseEstimatePath(pathname);
          if (!parsed) throw new Error("That file path is not valid.");
          const documents = parsed.role !== "media";
          return {
            allowedContentTypes: [...(documents ? DOC_CONTENT_TYPES : MEDIA_CONTENT_TYPES)],
            maximumSizeInBytes: documents ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES,
            addRandomSuffix: false,
            allowOverwrite: false,
          };
        },
        onUploadCompleted: async () => {},
      });
      return NextResponse.json(result);
    } catch (error) {
      return fail(error instanceof Error ? error.message : "The upload failed.");
    }
  }

  if (!contentType.includes("multipart/form-data")) return fail("Unsupported upload.", 415);
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_VIDEO_BYTES + 256 * 1024) return fail("That file is too large.", 413);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("The upload was interrupted. Try again.");
  }

  const file = form.get("file");
  const pathname = form.get("pathname");
  if (!(file instanceof File) || typeof pathname !== "string") return fail("Choose a file to upload.");
  const parsed = parseEstimatePath(pathname);
  if (!parsed) return fail("That file path is not valid.");
  if (file.size <= 0) return fail("That file is empty.");
  if (file.size > maxBytesForExt(parsed.ext)) return fail("That file is too large.", 413);

  const bytes = Buffer.from(await file.arrayBuffer());
  const sniffed = sniffEstimateExt(bytes);
  if (!sniffed || sniffed !== parsed.ext) return fail("That file does not match the kind of upload we can take.");
  if (parsed.role !== "media" && (sniffed === "mp4" || sniffed === "webm" || sniffed === "mov")) {
    return fail("Use a photo or a PDF for this upload.");
  }

  try {
    await storeFile(pathname, bytes, EXT_CONTENT_TYPE[sniffed]);
  } catch (error) {
    console.error("[estimate] upload store failed", error instanceof Error ? error.name : "error");
    return fail("The file could not be saved. Try again.", 500);
  }

  return NextResponse.json({ ok: true, pathname });
}
