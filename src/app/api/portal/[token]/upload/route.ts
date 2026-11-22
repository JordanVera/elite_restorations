import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import {
  describeUploadError,
  isUploadPathFor,
  MAX_UPLOAD_BYTES,
  sniffUploadType,
  UPLOAD_CONTENT_TYPES,
  uploadPathname,
} from "@/lib/selections/uploads";
import { privateBlobToken } from "@/server/private-blob";
import { isRateLimited } from "@/server/rate-limit";
import { resolvePortal } from "@/server/portal/customer";
import { deleteFiles, storageMode, storeFile, STORAGE_MISSING } from "@/server/portal/storage";
import { checkUploadTarget, recordAttachment } from "@/server/portal/uploads";
import { randomToken } from "@/server/security/crypto";

export const runtime = "nodejs";

function fail(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

/**
 * Two upload paths, one gate. With the private Blob store the browser asks
 * here for a short-lived token scoped to one selection's folder and uploads
 * directly. Without it (local development) the file comes here as form data.
 */
export async function POST(request: Request, ctx: RouteContext<"/api/portal/[token]/upload">) {
  const { token } = await ctx.params;
  const resolved = await resolvePortal(token);
  if (resolved.access !== "open") return fail("This link is no longer active.", 404);
  const portal = resolved.portal;
  if (isRateLimited(`portal-upload:${portal.id}`, { max: 60 })) return fail("Too many uploads in a short time. Wait a few minutes.", 429);

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
        onBeforeGenerateToken: async (pathname, clientPayload) => {
          const { requirementId } = JSON.parse(clientPayload ?? "{}") as { requirementId?: unknown };
          if (typeof requirementId !== "string" || !isUploadPathFor(pathname, portal.id, requirementId)) {
            throw new Error("That upload doesn't belong to this selection.");
          }
          const check = await checkUploadTarget(portal, requirementId);
          if (!check.ok) throw new Error(check.message);
          return {
            allowedContentTypes: UPLOAD_CONTENT_TYPES,
            maximumSizeInBytes: MAX_UPLOAD_BYTES,
            addRandomSuffix: false,
            allowOverwrite: false,
            validUntil: Date.now() + 10 * 60 * 1000,
          };
        },
      });
      return NextResponse.json(result);
    } catch (error) {
      return fail(error instanceof Error ? error.message : "Upload failed.");
    }
  }

  if (!contentType.includes("multipart/form-data")) return fail("Unsupported upload.", 415);
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_UPLOAD_BYTES + 64 * 1024) return fail("Files must be 10 MB or smaller.", 413);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("The upload was interrupted. Try again.");
  }
  const file = form.get("file");
  const requirementId = form.get("requirementId");
  if (!(file instanceof File) || typeof requirementId !== "string") return fail("Choose a file to upload.");

  const problem = describeUploadError(file);
  if (problem) return fail(problem);
  const check = await checkUploadTarget(portal, requirementId);
  if (!check.ok) return fail(check.message, 409);

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > MAX_UPLOAD_BYTES) return fail("Files must be 10 MB or smaller.", 413);
  const type = sniffUploadType(bytes);
  if (!type) return fail(`${file.name} doesn't look like a JPG, PNG, WebP, HEIC, or PDF file.`);

  const pathname = uploadPathname(portal.id, requirementId, type, randomToken(16));
  try {
    await storeFile(pathname, bytes, type);
  } catch (error) {
    console.error("[portal] upload store failed", error instanceof Error ? error.name : "error");
    return fail("The file couldn't be saved. Try again.", 500);
  }
  const result = await recordAttachment(portal, requirementId, { pathname, contentType: type, size: bytes.length, originalName: file.name });
  if (!result.ok) {
    await deleteFiles([pathname]);
    return fail(result.message, 409);
  }
  return NextResponse.json({ ok: true, attachment: result.attachment });
}
