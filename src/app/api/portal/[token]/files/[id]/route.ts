import { db } from "@/server/db/client";
import { resolvePortal } from "@/server/portal/customer";
import { fileResponse } from "@/server/portal/serve-file";

export const runtime = "nodejs";

/** A customer can open only files attached to selections in their own portal. */
export async function GET(request: Request, ctx: RouteContext<"/api/portal/[token]/files/[id]">) {
  const { token, id } = await ctx.params;
  const resolved = await resolvePortal(token);
  if (resolved.access !== "open") return new Response("Not found", { status: 404 });
  const file = await db().attachment.findFirst({
    where: { id, selection: { requirement: { portalId: resolved.portal.id } } },
    select: { blobPathname: true, contentType: true, originalName: true, size: true },
  });
  if (!file) return new Response("Not found", { status: 404 });
  return fileResponse(file, new URL(request.url).searchParams.has("download"));
}
