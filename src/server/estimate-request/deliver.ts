import "server-only";

import nodemailer from "nodemailer";

import { FILE_LINK_TTL_DAYS } from "@/lib/file-link-ttl";
import {
  buildEstimateDocument,
  chicagoTimestamp,
  estimateRecipient,
  leadSubject,
  machineJsonFilename,
} from "@/lib/lead-machine";
import type { EstimateSubmission } from "@/lib/estimate-request/schema";
import { estimateReference, quantitiesToCsv, sectionsToHtml, sectionsToText, staffSections } from "@/lib/estimate-request/summary";
import { fileLinkSecret, signedFileUrl } from "@/lib/signed-file-link";
import { websiteFromHeader } from "@/lib/website-from";
import { site } from "@/lib/site";
import { sendEmail } from "@/server/email";
import { emailTransportPlan } from "@/server/mail-plan";

export { DEFAULT_ESTIMATE_EMAIL, estimateRecipient, isTestName } from "@/lib/lead-machine";

export type EstimateSendResult = { status: "sent" } | { status: "unconfigured" } | { status: "failed" };

/** A name that starts with TEST marks the subject so a trial request is easy to spot. */
export function estimateSubject(firstName: string, lastName: string, reference: string): string {
  return leadSubject("estimate", firstName, lastName, reference);
}

function smtpConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim().replace(/\s+/g, "");
  if (!user || !pass) return null;
  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT?.trim() || "587");
  return { user, pass, host, port };
}

export function fileLinkMap(
  submission: EstimateSubmission,
  origin: string,
  env: Record<string, string | undefined> = process.env,
  now = Date.now(),
): Record<string, string> {
  const links: Record<string, string> = {};
  const add = (file: { pathname: string } | null) => {
    if (!file) return;
    const url = signedFileUrl(origin, file.pathname, env, now);
    if (url) links[file.pathname] = url;
  };
  for (const room of submission.rooms) {
    for (const file of room.files) add(file);
    add(room.sketch);
  }
  for (const file of submission.adjusterFiles) add(file);
  return links;
}

function publicOrigin(request: Request): string {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  if (/^[a-z0-9.-]+(?::\d+)?$/i.test(host)) return `${proto}://${host}`;
  return site.url;
}

export async function deliverEstimateRequest(submission: EstimateSubmission, request: Request): Promise<EstimateSendResult> {
  const plan = emailTransportPlan(process.env);
  if (plan === "unconfigured") {
    console.error("[estimate] Request was not sent. Set SMTP_USER and SMTP_PASS.");
    return { status: "unconfigured" };
  }

  const reference = estimateReference(submission.submissionId);
  const links = fileLinkMap(submission, publicOrigin(request));
  if (!fileLinkSecret() && (submission.rooms.some((room) => room.files.length > 0 || room.sketch) || submission.adjusterFiles.length > 0)) {
    console.error("[estimate] File links were left blank. Set ESTIMATE_LINK_SECRET or APP_ENCRYPTION_KEY.");
  }
  const sections = staffSections(submission, links);
  const name = `${submission.firstName} ${submission.lastName}`.trim();
  const text = sectionsToText(sections, reference);
  const html = sectionsToHtml(sections, reference, name);
  const document = buildEstimateDocument(submission, links, {
    id: reference,
    submittedAt: chicagoTimestamp(new Date()),
  });
  const json = Buffer.from(JSON.stringify(document, null, 2), "utf8");
  const csv = Buffer.from(quantitiesToCsv(submission), "utf8");
  const attachments = [
    { filename: machineJsonFilename("estimate", reference), content: json, contentType: "application/json" },
    { filename: `${reference}.csv`, content: csv, contentType: "text/csv" },
  ];
  const subject = estimateSubject(submission.firstName, submission.lastName, reference);
  const to = estimateRecipient(process.env, submission);
  const from = process.env.SMTP_USER?.trim() ? websiteFromHeader(process.env.SMTP_USER) : undefined;

  try {
    if (plan === "gateway-then-smtp") {
      try {
        const { messageId } = await sendEmail({
          to,
          replyTo: submission.email,
          subject,
          text,
          html,
          attachments,
          ...(from ? { from } : {}),
        });
        console.info("[estimate] sent via platform gateway", reference, messageId);
        return { status: "sent" };
      } catch (error) {
        console.error("[estimate] gateway failed; trying SMTP", error instanceof Error ? error.message : "unknown");
        if (!smtpConfig()) return { status: "failed" };
      }
    }

    const config = smtpConfig();
    if (!config) return { status: "unconfigured" };
    const transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
      connectionTimeout: 8_000,
      greetingTimeout: 8_000,
      socketTimeout: 20_000,
    });
    await transport.sendMail({
      from: websiteFromHeader(config.user),
      to,
      replyTo: submission.email,
      subject,
      text,
      html,
      attachments: attachments.map((file) => ({
        filename: file.filename,
        content: file.content,
        contentType: file.contentType,
        contentDisposition: "attachment" as const,
      })),
    });
    console.info("[estimate] sent", reference, `${FILE_LINK_TTL_DAYS}d links`);
    return { status: "sent" };
  } catch (error) {
    console.error("[estimate] send failed", error instanceof Error ? error.message : "unknown");
    return { status: "failed" };
  }
}
