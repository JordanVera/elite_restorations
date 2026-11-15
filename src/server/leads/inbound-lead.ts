import { z } from "zod";

import {
  buildInboundRequestInput,
  formatUsPhone,
  splitPhoneExtension,
  type FormItem,
  type JobberIngestLead,
} from "@/server/jobber/map";

export const INBOUND_SOURCES = [
  "google_voice_text",
  "google_voice_voicemail",
  "google_voice_missed_call",
  "lsa_message",
  "lsa_phone",
] as const;

export type InboundSource = (typeof INBOUND_SOURCES)[number];

export type InboundLead = {
  source: InboundSource;
  externalId: string;
  occurredAt: string;
  name?: string;
  phone?: string;
  phoneExtension?: string;
  email?: string;
  address?: string;
  service?: string;
  message?: string;
  replyTo?: string;
  rawSubject?: string;
};

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => {
      const trimmed = value?.trim() ?? "";
      return trimmed ? trimmed : undefined;
    });

export const inboundLeadSchema = z
  .object({
    source: z.enum(INBOUND_SOURCES),
    externalId: z
      .string()
      .trim()
      .min(1)
      .max(500)
      .refine((value) => !/[\r\n]/.test(value), "Invalid id."),
    occurredAt: z.string().trim().min(1).max(80),
    name: optionalText(200),
    phone: optionalText(40),
    phoneExtension: optionalText(20),
    email: optionalText(200),
    address: optionalText(300),
    service: optionalText(200),
    message: optionalText(5000),
    replyTo: optionalText(500),
    rawSubject: optionalText(500),
  })
  .superRefine((lead, ctx) => {
    if (!lead.source.startsWith("google_voice")) return;
    const digits = (lead.phone ?? "").replace(/\D/g, "");
    const last10 = digits.length >= 10 ? digits.slice(-10) : "";
    if (!last10) {
      ctx.addIssue({ code: "custom", message: "Voice leads require a phone.", path: ["phone"] });
    }
  });

export function bearerToken(header: string | null): string {
  if (!header) return "";
  const match = /^Bearer\s+(\S+)\s*$/i.exec(header.trim());
  return match?.[1] ?? "";
}

export function sourceLabelFor(source: InboundSource): string {
  switch (source) {
    case "google_voice_text":
      return "Google Voice text";
    case "google_voice_voicemail":
      return "Google Voice voicemail";
    case "google_voice_missed_call":
      return "Google Voice missed call";
    case "lsa_message":
      return "Google LSA message";
    case "lsa_phone":
      return "Google LSA phone lead";
  }
}

export function titleFor(source: InboundSource, service?: string): string {
  if (source === "lsa_message") {
    const label = service?.trim();
    return label ? `Google LSA message · ${label}` : "Google LSA message";
  }
  return sourceLabelFor(source);
}

export function leadDisplayName(name: string | undefined, phone: string | undefined): string {
  const trimmed = name?.trim() ?? "";
  if (trimmed) return trimmed;
  return formatUsPhone(phone ?? "") || "New lead";
}

function note(label: string, value: string | undefined): FormItem | null {
  const text = value?.trim() ?? "";
  if (!text) return null;
  return { label, answerText: text };
}

export function notesForInbound(lead: InboundLead, phone: string, extension: string | undefined): FormItem[] {
  return [
    note("Message", lead.message),
    note("Service", lead.service),
    note("Phone", phone),
    note("Phone extension", extension),
    note("Email", lead.email),
    note("Address", lead.address),
    note("Received", lead.occurredAt),
    note("Reply-To", lead.replyTo),
    note("Subject", lead.rawSubject),
    note("Reference", lead.externalId),
  ].filter((item): item is FormItem => item !== null);
}

/** Maps an inbound lead onto the generic Jobber helper. Service stays free text. */
export function jobberLeadFromInbound(lead: InboundLead): JobberIngestLead {
  const split = splitPhoneExtension(lead.phone ?? "");
  const extension = lead.phoneExtension?.trim() || split.extension || undefined;
  return {
    name: lead.name,
    email: lead.email,
    phone: split.phone,
    address: lead.address,
    smsAllowed: lead.source === "google_voice_text",
    sourceLabel: sourceLabelFor(lead.source),
    title: titleFor(lead.source, lead.service),
    notes: notesForInbound(lead, split.phone, extension),
  };
}

/** Used by tests to confirm the request shape without calling Jobber. */
export function inboundRequestPreview(lead: InboundLead) {
  const mapped = jobberLeadFromInbound(lead);
  return buildInboundRequestInput({
    clientId: "client",
    title: mapped.title,
    sourceLabel: mapped.sourceLabel,
    notes: mapped.notes,
  });
}
