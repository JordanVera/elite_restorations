import { databaseConfigured, getPrisma } from "@/server/db";
import { exportAllowed } from "@/server/opportunities/export-auth";
import { repliersStatus } from "@/server/opportunities/providers";
import { loadRun } from "@/server/opportunities/repository";
import { propertyCsv, propertyPdf } from "@/server/opportunities/report";
import { identifyStaff } from "@/server/trpc/staff";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await identifyStaff(request.headers.get("host") ?? "");
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!databaseConfigured()) return new Response("Database not configured", { status: 503 });
  const { id } = await context.params;
  const run = await loadRun(id);
  if (!run) return new Response("Not found", { status: 404 });
  const permission = exportAllowed(run.origin, repliersStatus().capabilities.export);
  if (!permission.allowed) return new Response(permission.reason, { status: 403 });
  const format = new URL(request.url).searchParams.get("format");
  await getPrisma().reportArtifact.create({ data: { runId: run.id, kind: format === "csv" ? "csv" : "pdf" } });
  if (format === "csv") {
    return new Response(propertyCsv(run), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="opportunities-${run.id}.csv"`,
        "cache-control": "private, no-store",
      },
    });
  }
  const pdf = await propertyPdf(run);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="opportunities-${run.id}.pdf"`,
      "cache-control": "private, no-store",
    },
  });
}
