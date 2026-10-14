import { createHook } from "workflow";

export async function opportunityWorkflow(runId: string) {
  "use workflow";
  try {
    await discoverStep(runId);
    await screenStep(runId);
    await analyzeStep(runId);
    const mode = await modeStep(runId);
    if (mode === "review") {
      const hook = createHook<{ approved: boolean }>({ token: `opportunity-review:${runId}` });
      await rememberReview(runId, hook.token);
      const decision = await hook;
      hook.dispose();
      if (!decision.approved) {
        await cancelStep(runId);
        return { status: "cancelled" as const };
      }
    }
    await generateStep(runId);
    await finalizeStep(runId);
    return { status: "finished" as const };
  } catch (error) {
    await failStep(runId, failureMessage(error));
    throw error;
  }
}

function failureMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "object" && error && "message" in error && typeof error.message === "string" && error.message) {
    return error.message;
  }
  return "The background run failed.";
}

async function discoverStep(runId: string) {
  "use step";
  const { discoverListings } = await import("@/server/opportunities/repository");
  await discoverListings(runId);
}

async function screenStep(runId: string) {
  "use step";
  const { screenListings } = await import("@/server/opportunities/repository");
  await screenListings(runId);
}

async function analyzeStep(runId: string) {
  "use step";
  const { analyzeRun } = await import("@/server/opportunities/pipeline-run");
  await analyzeRun(runId);
}

async function generateStep(runId: string) {
  "use step";
  const { generateRun } = await import("@/server/opportunities/pipeline-run");
  await generateRun(runId);
}

async function finalizeStep(runId: string) {
  "use step";
  const { finalizeRun } = await import("@/server/opportunities/pipeline-run");
  await finalizeRun(runId);
}

async function modeStep(runId: string) {
  "use step";
  const { getPrisma } = await import("@/server/db");
  const run = await getPrisma().opportunityRun.findUnique({ where: { id: runId } });
  const settings = run?.settings as { mode?: string } | null;
  return settings?.mode === "automatic" ? "automatic" : "review";
}

async function rememberReview(runId: string, token: string) {
  "use step";
  const { getPrisma } = await import("@/server/db");
  await getPrisma().opportunityRun.update({
    where: { id: runId },
    data: { status: "awaiting_review", reviewToken: token },
  });
}

async function cancelStep(runId: string) {
  "use step";
  const { getPrisma } = await import("@/server/db");
  await getPrisma().opportunityRun.update({ where: { id: runId }, data: { status: "cancelled" } });
}

async function failStep(runId: string, message: string) {
  "use step";
  const { getPrisma } = await import("@/server/db");
  const current = await getPrisma().opportunityRun.findUnique({ where: { id: runId } });
  if (!current || current.status === "cancelled" || current.status === "failed") return;
  await getPrisma().opportunityRun.update({
    where: { id: runId },
    data: { status: "failed", partial: true, error: current.error || message },
  });
}
