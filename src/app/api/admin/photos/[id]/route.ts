import { identifyStaff } from "@/server/trpc/staff";
import { getPrisma, databaseConfigured } from "@/server/db";
import { readPrivateImage } from "@/server/opportunities/blob";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await identifyStaff(request.headers.get("host") ?? "");
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!databaseConfigured()) return new Response("Database not configured", { status: 503 });
  const { id } = await context.params;
  const photo = await getPrisma().photo.findUnique({ where: { id } });
  const concept = photo ? null : await getPrisma().concept.findUnique({ where: { id } });
  const pathname = photo?.blobPath ?? concept?.blobPath;
  if (!pathname) return new Response("Not found", { status: 404 });
  const stored = await readPrivateImage(pathname);
  if (!stored || stored.statusCode !== 200 || !stored.stream) return new Response("Not found", { status: 404 });
  return new Response(stored.stream, {
    headers: {
      "content-type": stored.blob.contentType,
      "cache-control": "private, no-store",
      "x-content-type-options": "nosniff",
    },
  });
}
