import { NextResponse } from "next/server";

import { estimateTiming } from "@/lib/estimate-request/timing";
import { isHoneypotWebsite } from "@/lib/estimate-request/spam";
import { validateSubmission } from "@/lib/estimate-request/schema";
import { isRateLimited } from "@/server/rate-limit";
import { deliverEstimateRequest } from "@/server/estimate-request/deliver";
import { rejectBadFile } from "@/server/estimate-request/files";
import { clientIp } from "@/server/trpc/init";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 1_000_000;

function fail(message: string, status = 400, errors?: Record<string, string>) {
  return NextResponse.json({ ok: false, message, errors }, { status });
}

export async function POST(request: Request) {
  if (isRateLimited(`estimate-submit:${clientIp(request)}`)) {
    return fail("Too many requests. Please wait a few minutes or call us.", 429);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) return fail("That request is too large.", 413);

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY) return fail("That request is too large.", 413);
    raw = JSON.parse(text) as unknown;
  } catch {
    return fail("We could not read that request.");
  }

  if (isHoneypotWebsite(raw)) {
    console.info("[estimate] dropped honeypot submission");
    return NextResponse.json({ ok: true });
  }

  const parsed = validateSubmission(raw);
  if (!parsed.ok) {
    return fail("Check the form and try again.", 400, parsed.errors);
  }

  const timing = estimateTiming(parsed.data.startedAt);
  if (timing !== "ok") {
    return fail(
      timing === "too-fast"
        ? "Give it a moment, then send it again."
        : "This page has been open a while. Refresh it and send the form again. Your draft should still be here.",
      400,
    );
  }

  const badFile = await rejectBadFile(parsed.data);
  if (badFile) {
    return fail(`${badFile} did not save. Remove it and add it again.`, 400);
  }

  const result = await deliverEstimateRequest(parsed.data, request);
  if (result.status === "sent") return NextResponse.json({ ok: true });
  if (result.status === "unconfigured") {
    return fail("The online form is not available yet. Call us and we will take it from there.", 503);
  }
  return fail("We could not send this request. Nothing else was emailed. Call us and we will take it from there.", 502);
}
