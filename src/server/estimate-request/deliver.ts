import "server-only";

import nodemailer from "nodemailer";

import { estimateFileUrl } from "@/lib/estimate-request/files";
import type { EstimateSubmission } from "@/lib/estimate-request/schema";
import {
  estimateReference,
  quantitiesToCsv,
  sectionsToHtml,
  sectionsToText,
  staffSections,
  submissionDocument,
} from "@/lib/estimate-request/summary";
import { site } from "@/lib/site";
import { sendEmail } from "@/server/email";
import { emailTransportPlan } from "@/server/mail-plan";

export const DEFAULT_ESTIMATE_EMAIL = "george@eliterestorations.com";

export type EstimateSendResult = { status: "sent" } | { status: "unconfigured" } | { status: "failed" };

export function isTestName(firstName: string, lastName: string): boolean {
  return [firstName, lastName].some((part) => /^test/i.test(part.trim()));
}

/** A name that starts with TEST marks the subject so a trial request is easy to spot. */
export function estimateSubject(firstName: string, lastName: string, reference: string): string {
  const name = `${firstName} ${lastName}`.trim();
  const prefix = isTestName(firstName, lastName) ? "TEST - " : "";
  return `${prefix}[${site.name}] Project estimate · ${name} · ${reference}`;
}

export function estimateRecipient(
  env: Record<string, string | undefined> = process.env,
  names?: { firstName: string; lastName: string },
): string {
  // TEMP test routing - remove after test
  if (names && isTestName(names.firstName, names.lastName)) return "michael@eliterestorations.com";
  const value = env.ESTIMATE_REQUEST_EMAIL_TO?.trim();
  if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return value;
  return DEFAULT_ESTIMATE_EMAIL;
}

function smtpConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim().replace(/\s+/g, "");
  if (!user || !pass) return null;
  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT?.trim() || "587");
  return { user, pass, host, port };
}

export function fileLinkMap(submission: EstimateSubmission, origin: string): Record<string, string> {
  const links: Record<string, string> = {};
  const add = (file: { pathname: string } | null) => {
    if (!file) return;
    const url = estimateFileUrl(origin, file.pathname);
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
  const sections = staffSections(submission, links);
  const name = `${submission.firstName} ${submission.lastName}`.trim();
  const text = sectionsToText(sections, reference);
  const html = sectionsToHtml(sections, reference, name);
  const json = Buffer.from(JSON.stringify(submissionDocument(submission, links, reference), null, 2), "utf8");
  const csv = Buffer.from(quantitiesToCsv(submission), "utf8");
  const attachments = [
    { filename: `${reference}.json`, content: json, contentType: "application/json" },
    { filename: `${reference}.csv`, content: csv, contentType: "text/csv" },
  ];
  const subject = estimateSubject(submission.firstName, submission.lastName, reference);
  const to = estimateRecipient(process.env, submission);

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
    const fromName = (process.env.SMTP_FROM_NAME?.trim() || site.name).replace(/["\r\n]/g, "");
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
      from: `"${fromName}" <${config.user}>`,
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
    console.info("[estimate] sent", reference);
    return { status: "sent" };
  } catch (error) {
    console.error("[estimate] send failed", error instanceof Error ? error.message : "unknown");
    return { status: "failed" };
  }
}
