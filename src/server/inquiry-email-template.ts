import "server-only";

import { randomUUID } from "node:crypto";

import { claimAnswers, contactMethods, leadServices, optionLabel } from "@/lib/inquiry";
import { site } from "@/lib/site";
import type { DeliverableLead } from "@/server/leads/types";

const label = optionLabel;

/** Short unique id so each inquiry opens its own inbox thread. */
export function inquiryReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  return `ER-${stamp}-${randomUUID().slice(0, 8).toUpperCase()}`;
}

export function inquirySubject(lead: DeliverableLead, reference: string): string {
  const kind = lead.path === "partner" ? "Partner referral" : label(leadServices, lead.service);
  return `[${site.name}] ${kind} · ${lead.name} · ${reference}`;
}

export function inquiryMessageId(reference: string): string {
  const host = new URL(site.url).hostname.replace(/^www\./, "");
  return `<inquiry-${reference.toLowerCase()}@${host}>`;
}

type DetailRow = { label: string; value: string };

function detailRows(lead: DeliverableLead): DetailRow[] {
  const rows: DetailRow[] = [
    { label: "Name", value: lead.name },
    { label: "Email", value: lead.email || "Not provided" },
    { label: "Phone", value: lead.phone },
  ];

  if (lead.path === "estimate") {
    rows.push(
      { label: "Address or ZIP", value: lead.address },
      { label: "Service", value: label(leadServices, lead.service) },
      { label: "Insurance claim", value: label(claimAnswers, lead.claim) },
    );
    if (lead.carrier) rows.push({ label: "Insurance carrier", value: lead.carrier });
    rows.push({ label: "Preferred contact", value: label(contactMethods, lead.contactMethod) });
  } else {
    rows.push(
      { label: "Company", value: lead.company },
      { label: "Preferred contact", value: label(contactMethods, lead.contactMethod) },
    );
  }

  if (lead.pageUrl) rows.push({ label: "Page", value: lead.pageUrl });
  if (lead.referrer) rows.push({ label: "Referrer", value: lead.referrer });
  const campaign = [
    lead.utmSource && `source ${lead.utmSource}`,
    lead.utmMedium && `medium ${lead.utmMedium}`,
    lead.utmCampaign && `campaign ${lead.utmCampaign}`,
    lead.utmTerm && `term ${lead.utmTerm}`,
    lead.utmContent && `content ${lead.utmContent}`,
  ].filter((part): part is string => Boolean(part));
  if (campaign.length > 0) rows.push({ label: "Campaign", value: campaign.join(" · ") });

  return rows;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("\n", "<br />");
}

const C = {
  page: "#ece6da",
  panel: "#f7f4ee",
  inset: "#e3dccd",
  line: "#d5ccbc",
  ink: "#16130f",
  muted: "#5c5548",
  accent: "#c0302b",
  accentDeep: "#a72620",
} as const;

function logoUrl(): string {
  return new URL('/images/logo/logo-main.png', site.url).href;
}

export function buildInquiryHtml(
  lead: DeliverableLead,
  reference: string,
  options: { photosAttached: number; photoFilenames: string[] },
): string {
  const pathTitle = lead.path === "partner" ? "Partner referral" : label(leadServices, lead.service);
  const rows = detailRows(lead);

  const details = rows
    .map(
      ({ label: rowLabel, value }, index) => `
        <tr>
          <td style="padding:14px 0;border-top:${index === 0 ? "0" : "1px"} solid ${C.line};font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${C.muted};width:148px;vertical-align:top;">${escapeHtml(rowLabel)}</td>
          <td style="padding:14px 0 14px 12px;border-top:${index === 0 ? "0" : "1px"} solid ${C.line};font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.45;color:${C.ink};vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const messageBlock = lead.message
    ? `
      <tr>
        <td colspan="2" style="padding:22px 0 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="${C.inset}" style="background:${C.inset};border-left:3px solid ${C.accent};">
            <tr>
              <td style="padding:18px 20px 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${C.accent};">Message</td>
            </tr>
            <tr>
              <td style="padding:0 20px 18px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.65;color:${C.ink};">${escapeHtml(lead.message)}</td>
            </tr>
          </table>
        </td>
      </tr>`
    : "";

  const photosBlock =
    options.photosAttached > 0
      ? `
      <tr>
        <td colspan="2" style="padding:18px 0 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid ${C.line};">
            <tr>
              <td bgcolor="${C.inset}" style="background:${C.inset};padding:16px 18px;font-family:Arial,Helvetica,sans-serif;">
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${C.accent};">${options.photosAttached} photo${options.photosAttached === 1 ? "" : "s"} attached</p>
                <p style="margin:0;font-size:13px;line-height:1.5;color:${C.muted};">${escapeHtml(options.photoFilenames.join("  ·  "))}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
      : lead.photosMissing > 0
        ? `
      <tr>
        <td colspan="2" style="padding:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${C.accent};">${lead.photosMissing} photo(s) could not be retrieved.</td>
      </tr>`
        : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
</head>
<body bgcolor="${C.page}" style="margin:0;padding:0;background:${C.page};color:${C.ink};color-scheme:light;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="${C.page}" style="background:${C.page};">
    <tr>
      <td align="center" style="padding:36px 14px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="${C.panel}" style="max-width:600px;background:${C.panel};border:1px solid ${C.line};">
          <tr>
            <td bgcolor="${C.panel}" style="background:${C.panel};padding:0;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="5" bgcolor="${C.accentDeep}" style="background:${C.accentDeep};font-size:0;line-height:0;">&nbsp;</td>
                  <td bgcolor="${C.panel}" style="background:${C.panel};padding:32px 32px 26px;text-align:center;">
                    <img src="${escapeHtml(logoUrl())}" width="168" alt="${escapeHtml(site.name)}" style="display:block;margin:0 auto;border:0;outline:none;text-decoration:none;max-width:168px;height:auto;" />
                    <div style="height:2px;line-height:2px;font-size:0;background:${C.accentDeep};margin:22px auto 0;width:72px;">&nbsp;</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="${C.panel}" style="background:${C.panel};padding:30px 32px 8px;">
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:${C.accent};">New website inquiry</p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:400;line-height:1.15;color:${C.ink};">${escapeHtml(pathTitle)}</h1>
              <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;color:${C.muted};">REF &nbsp;${escapeHtml(reference)}</p>
            </td>
          </tr>
          <tr>
            <td bgcolor="${C.panel}" style="background:${C.panel};padding:18px 32px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                ${details}
                ${messageBlock}
                ${photosBlock}
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="${C.inset}" style="background:${C.inset};padding:18px 32px 22px;border-top:1px solid ${C.line};">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:${C.muted};">
                Reply to reach <span style="color:${C.ink};">${escapeHtml(lead.name)}</span>
                ${
                  lead.email
                    ? `at <a href="mailto:${escapeHtml(lead.email)}" style="color:${C.accent};text-decoration:none;">${escapeHtml(lead.email)}</a>`
                    : `at ${escapeHtml(lead.phone)}`
                }.
              </p>
              <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${C.muted};">${escapeHtml(site.name)} &nbsp;·&nbsp; ${escapeHtml(site.phone.display)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
