import { get } from "@vercel/blob";

import { isUuid } from "@/lib/estimate-request/files";
import { canonicalFilePath, fileLinkSecret, verifyFileLink } from "@/lib/signed-file-link";
import { isRateLimited } from "@/server/rate-limit";
import { clientIp } from "@/server/trpc/init";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, ctx: Ctx) {
  if (isRateLimited(`visit-file:${clientIp(request)}`, { max: 120 })) {
    return new Response("Too many requests.", { status: 429 });
  }

  const { id } = await ctx.params;
  if (!isUuid(id)) return new Response("Not found", { status: 404 });

  const canonical = canonicalFilePath(`lead-photos/${id}.jpg`);
  const secret = fileLinkSecret();
  const url = new URL(request.url);
  if (!canonical || !secret || !verifyFileLink(canonical, url.searchParams.get("exp") ?? "", url.searchParams.get("sig") ?? "", secret)) {
    return new Response("Not found", { status: 404 });
  }

  let stream: ReadableStream<Uint8Array> | null = null;
  try {
    const result = await get(canonical, { access: "public", useCache: false });
    if (result && result.statusCode === 200 && result.stream) stream = result.stream;
  } catch {
    stream = null;
  }
  if (!stream) return new Response("Not found", { status: 404 });

  return new Response(stream, {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": 'inline; filename="visit-photo.jpg"',
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "Cross-Origin-Resource-Policy": "same-origin",
    },
  });
}
