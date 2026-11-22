import { getAdmin } from "@/server/auth/session";
import { can } from "@/server/auth/policy";
import { db } from "@/server/db/client";
import { fileResponse } from "@/server/portal/serve-file";

export const runtime = "nodejs";

export async function GET(request: Request, ctx: RouteContext<"/api/admin/files/[id]">) {
  const admin = await getAdmin();
  if (!admin || !can(admin.role, "review_selections")) return new Response("Not found", { status: 404 });
  const { id } = await ctx.params;
  const file = await db().attachment.findUnique({
    where: { id },
    select: { blobPathname: true, contentType: true, originalName: true, size: true },
  });
  if (!file) return new Response("Not found", { status: 404 });
  return fileResponse(file, new URL(request.url).searchParams.has("download"));
}
