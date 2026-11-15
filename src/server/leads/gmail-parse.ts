import type { InboundLead, InboundSource } from "@/server/leads/inbound-lead";

export type GmailLeadInput = {
  from: string;
  subject: string;
  body: string;
  messageId: string;
  occurredAt: string;
  replyTo?: string;
};

export type GmailSkipReason =
  | "follow-up"
  | "lsa-call"
  | "marketing"
  | "not-a-lead"
  | "missing-phone"
  | "missing-id";

export type GmailParseResult = { action: "skip"; reason: GmailSkipReason } | { action: "lead"; lead: InboundLead };

const PHONE_PATTERN = /(?:\+?1[\s.-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}/;

const FOOTER = [
  /^--\s*$/,
  /^to respond to this text/i,
  /^reply to this email/i,
  /^your account\b/i,
  /^help center\b/i,
  /^view (the |this )?(conversation|message|request)/i,
  /^google voice\b/i,
  /^this email was sent/i,
  /^you received this/i,
  /^get the app\b/i,
];

const BLOCK_LABELS = ["Name", "Location", "Service type", "Message"] as const;

function decodeBasic(value: string): string {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"');
}

function addressOf(from: string): string {
  const match = from.match(/<([^>]+)>/);
  return (match?.[1] ?? from).trim().toLowerCase();
}

function firstPhone(value: string): string {
  return value.match(PHONE_PATTERN)?.[0] ?? "";
}

function textWithoutPhone(value: string): string {
  return value
    .replace(PHONE_PATTERN, " ")
    .replace(/[|()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanName(value: string): string | undefined {
  const name = value.replace(/^from\s+/i, "").replace(/^["']+|["']+$/g, "").trim();
  if (name.length < 2) return undefined;
  if (/^(new text message|new voicemail|voicemail|missed call|google voice|potential customer)$/i.test(name)) {
    return undefined;
  }
  return name.slice(0, 200);
}

function callerName(subjectRest: string, fromHeader: string): string | undefined {
  const fromSubject = cleanName(textWithoutPhone(subjectRest));
  if (fromSubject) return fromSubject;
  const display = fromHeader.split("<")[0] ?? "";
  return cleanName(textWithoutPhone(display));
}

function cutFooter(body: string): string {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const kept: string[] = [];
  for (const line of lines) {
    if (FOOTER.some((pattern) => pattern.test(line.trim()))) break;
    kept.push(line);
  }
  return kept.join("\n").trim();
}

function extensionNear(value: string, phone: string): string | undefined {
  const index = phone ? value.indexOf(phone) : -1;
  const slice = index >= 0 ? value.slice(index, index + phone.length + 24) : "";
  const match = slice.match(/(?:ext\.?|extension|x)\s*(\d{1,8})\b/i);
  return match?.[1];
}

function leadPhone(subject: string, fromHeader: string, body: string): string {
  return firstPhone(subject) || firstPhone(fromHeader) || firstPhone(cutFooter(body).slice(0, 500));
}

function voiceMessage(kind: "text" | "voicemail" | "missed", body: string, subject: string): string {
  const clipped = cutFooter(body);
  const transcript = clipped.match(/transcript:\s*([\s\S]+)/i);
  if (transcript?.[1]) return transcript[1].trim().slice(0, 5000);
  if (kind !== "text") return "";
  const lines = clipped
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  while (lines.length && /^new text message from\b/i.test(lines[0] ?? "")) lines.shift();
  if (lines[0] && lines[0].toLowerCase() === subject.trim().toLowerCase()) lines.shift();
  return lines.join("\n").trim().slice(0, 5000);
}

function subjectRest(subject: string, prefix: RegExp): string {
  const match = subject.match(prefix);
  return match?.[1]?.trim() ?? "";
}

function blocks(body: string): Partial<Record<(typeof BLOCK_LABELS)[number], string>> {
  const lines = cutFooter(body).replace(/\r\n/g, "\n").split("\n");
  const found: Partial<Record<(typeof BLOCK_LABELS)[number], string[]>> = {};
  let current: (typeof BLOCK_LABELS)[number] | null = null;
  const labelFor = (value: string) => BLOCK_LABELS.find((label) => label.toLowerCase() === value.toLowerCase());

  for (const line of lines) {
    const trimmed = line.trim();
    const inline = trimmed.match(/^-\s*([^:]+?)\s*:\s*(.+)$/);
    if (inline?.[1] && inline[2]) {
      const label = labelFor(inline[1].trim());
      if (label) {
        found[label] = [inline[2].trim()];
        current = null;
        continue;
      }
    }
    const heading = trimmed.match(/^-\s*([^:]+?)\s*:?\s*$/);
    if (heading?.[1]) {
      const label = labelFor(heading[1].trim());
      if (label) {
        current = label;
        found[label] = [];
        continue;
      }
    }
    if (!current) continue;
    if (!trimmed) {
      if ((found[current] ?? []).length) current = null;
      continue;
    }
    found[current] = [...(found[current] ?? []), trimmed];
  }

  const result: Partial<Record<(typeof BLOCK_LABELS)[number], string>> = {};
  for (const label of BLOCK_LABELS) {
    const text = (found[label] ?? []).join("\n").trim();
    if (text) result[label] = text.slice(0, label === "Message" ? 5000 : 300);
  }
  return result;
}

function lsaSubject(subject: string): { followUp: boolean; request: boolean; name?: string } {
  const cleaned = subject.replace(/^re:\s*/i, "").trim();
  if (/sent you a message/i.test(cleaned)) return { followUp: true, request: false };
  if (/^potential customer['’]s new request$/i.test(cleaned)) return { followUp: false, request: true };
  const named = cleaned.match(/^(.+?)['’]s new request$/i);
  if (named?.[1]) return { followUp: false, request: true, name: cleanName(named[1]) };
  return { followUp: false, request: false };
}

function optional(value: string | undefined): string | undefined {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed : undefined;
}

function voiceLead(
  source: InboundSource,
  kind: "text" | "voicemail" | "missed",
  input: GmailLeadInput,
  subjectPrefix: RegExp,
): GmailParseResult {
  const messageId = input.messageId.trim();
  if (!messageId) return { action: "skip", reason: "missing-id" };
  const phone = leadPhone(input.subject, input.from, input.body);
  if (!phone) return { action: "skip", reason: "missing-phone" };
  const extension = extensionNear(`${input.subject}\n${input.from}`, phone);
  const message = voiceMessage(kind, input.body, input.subject);
  const name = callerName(subjectRest(input.subject, subjectPrefix), input.from);
  return {
    action: "lead",
    lead: {
      source,
      externalId: messageId.slice(0, 500),
      occurredAt: input.occurredAt.trim().slice(0, 80) || "unknown",
      name,
      phone: phone.slice(0, 40),
      phoneExtension: extension,
      message: optional(message),
      replyTo: optional(input.replyTo)?.slice(0, 500),
      rawSubject: optional(input.subject)?.slice(0, 500),
    },
  };
}

/**
 * Turns one Gmail notification into an inbound lead.
 * The returned lead never includes the raw email body.
 */
export function parseGmailLead(input: GmailLeadInput): GmailParseResult {
  const from = addressOf(decodeBasic(input.from));
  const subject = decodeBasic(input.subject).trim();
  const body = decodeBasic(input.body).slice(0, 20000);
  const forVoice: GmailLeadInput = { ...input, from: decodeBasic(input.from), subject, body };

  if (from === "localservices-noreply@google.com" || from.endsWith("@localservices-noreply.google.com")) {
    if (/new call from a potential customer/i.test(subject)) return { action: "skip", reason: "lsa-call" };
    return { action: "skip", reason: "marketing" };
  }

  const lsa = from.match(/^customer-request-(\d+)@awexpress\.google\.com$/);
  if (lsa?.[1]) {
    const parsedSubject = lsaSubject(subject);
    if (parsedSubject.followUp) return { action: "skip", reason: "follow-up" };
    if (!parsedSubject.request) return { action: "skip", reason: "marketing" };
    const fields = blocks(body);
    const name = cleanName(fields.Name ?? "") ?? parsedSubject.name;
    return {
      action: "lead",
      lead: {
        source: "lsa_message",
        externalId: `lsa:${lsa[1]}`,
        occurredAt: input.occurredAt.trim().slice(0, 80) || "unknown",
        name,
        address: optional(fields.Location)?.slice(0, 300),
        service: optional(fields["Service type"])?.slice(0, 200),
        message: optional(fields.Message),
        rawSubject: optional(subject)?.slice(0, 500),
      },
    };
  }

  if (from.endsWith("@txt.voice.google.com")) {
    if (!/new text message from\b/i.test(subject)) return { action: "skip", reason: "not-a-lead" };
    return voiceLead("google_voice_text", "text", forVoice, /^new text message from\s+(.+)$/i);
  }

  if (from === "voice-noreply@google.com") {
    if (/voicemail/i.test(subject)) {
      return voiceLead("google_voice_voicemail", "voicemail", forVoice, /^(?:new )?voicemail from\s+(.+)$/i);
    }
    if (/missed call/i.test(subject)) {
      return voiceLead("google_voice_missed_call", "missed", forVoice, /^missed call from\s+(.+)$/i);
    }
    return { action: "skip", reason: "not-a-lead" };
  }

  if (from.endsWith("@awexpress.google.com") || from.endsWith("@google.com")) {
    return { action: "skip", reason: "marketing" };
  }
  return { action: "skip", reason: "not-a-lead" };
}
