import { EXT_CONTENT_TYPE, maxBytesForExt, parseEstimatePath } from "@/lib/estimate-request/files";
import { isRateLimited } from "@/server/rate-limit";
import { fileResponse } from "@/server/portal/serve-file";
import { statFile } from "@/server/portal/storage";
import { clientIp } from "@/server/trpc/init";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ submissionId: string; accessKey: string; file: string[] }> };

export async function GET(request: Request, ctx: Ctx) {
  if (isRateLimited(`estimate-file:${clientIp(request)}`, { max: 120 })) {
    return new Response("Too many requests.", { status: 429 });
  }

  const { submissionId, accessKey, file } = await ctx.params;
  if (file.some((part) => part === "" || part === "." || part === ".." || part.includes("\\") || part.includes("/"))) {
    return new Response("Not found", { status: 404 });
  }

  const pathname = `estimate-requests/${submissionId}/${accessKey}/${file.join("/")}`;
  const parsed = parseEstimatePath(pathname);
  if (!parsed || parsed.submissionId !== submissionId.toLowerCase() || parsed.accessKey !== accessKey.toLowerCase()) {
    return new Response("Not found", { status: 404 });
  }

  const stat = await statFile(pathname);
  if (!stat || stat.size <= 0 || stat.size > maxBytesForExt(parsed.ext)) {
    return new Response("Not found", { status: 404 });
  }

  return fileResponse(
    {
      blobPathname: pathname,
      contentType: EXT_CONTENT_TYPE[parsed.ext],
      originalName: file.at(-1) ?? "file",
      size: stat.size,
    },
    new URL(request.url).searchParams.has("download"),
  );
}
