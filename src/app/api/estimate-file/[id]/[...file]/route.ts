import { EXT_CONTENT_TYPE, isUuid, maxBytesForExt } from "@/lib/estimate-request/files";
import { canonicalFilePath, fileLinkSecret, verifyFileLink } from "@/lib/signed-file-link";
import { isRateLimited } from "@/server/rate-limit";
import { fileResponse } from "@/server/portal/serve-file";
import { statFile } from "@/server/portal/storage";
import { clientIp } from "@/server/trpc/init";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string; file: string[] }> };

export async function GET(request: Request, ctx: Ctx) {
  if (isRateLimited(`estimate-file-sig:${clientIp(request)}`, { max: 120 })) {
    return new Response("Too many requests.", { status: 429 });
  }

  const { id, file } = await ctx.params;
  if (!isUuid(id) || file.some((part) => part === "" || part === "." || part === ".." || part.includes("\\") || part.includes("/"))) {
    return new Response("Not found", { status: 404 });
  }

  const canonical = canonicalFilePath(`estimate-requests/${id}/${file.join("/")}`);
  const secret = fileLinkSecret();
  const url = new URL(request.url);
  if (!canonical || !secret || !verifyFileLink(canonical, url.searchParams.get("exp") ?? "", url.searchParams.get("sig") ?? "", secret)) {
    return new Response("Not found", { status: 404 });
  }

  const parsedPrefix = canonical.slice("estimate-requests/".length);
  const submissionId = parsedPrefix.slice(0, parsedPrefix.indexOf("/"));
  if (submissionId !== id.toLowerCase()) return new Response("Not found", { status: 404 });

  const stat = await statFile(canonical);
  const ext = canonical.slice(canonical.lastIndexOf(".") + 1).toLowerCase();
  if (!stat || stat.size <= 0 || !(ext in EXT_CONTENT_TYPE)) return new Response("Not found", { status: 404 });
  const contentType = EXT_CONTENT_TYPE[ext as keyof typeof EXT_CONTENT_TYPE];
  const limit = maxBytesForExt(ext as keyof typeof EXT_CONTENT_TYPE);
  if (stat.size > limit) return new Response("Not found", { status: 404 });

  return fileResponse(
    {
      blobPathname: canonical,
      contentType,
      originalName: file.at(-1) ?? "file",
      size: stat.size,
    },
    url.searchParams.has("download"),
  );
}
