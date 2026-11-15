import type { InboundLead } from "@/server/leads/inbound-lead";
import { phoneLast10 } from "@/server/jobber/map";

/** Google Ads API version current as of November 2026. Developer tokens are not required. */
export const GOOGLE_ADS_API_VERSION = "v26";

export const LSA_CUSTOMER_ID = "8441992586";

export const ADS_TIME = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

export const LSA_LOOKBACK_MS = 2 * 24 * 60 * 60 * 1000;
export const LSA_OVERLAP_MS = 2 * 60 * 60 * 1000;

export function googleAdsSearchUrl(customerId = LSA_CUSTOMER_ID): string {
  return `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${customerId}/googleAds:search`;
}

/** `developer-token` is sent only when a token is configured. Google ignores it after the 2026 sunset. */
export function googleAdsRequestHeaders(accessToken: string, developerToken?: string): Record<string, string> {
  const headers: Record<string, string> = {
    authorization: `Bearer ${accessToken}`,
    "content-type": "application/json",
  };
  const token = developerToken?.trim();
  if (token) headers["developer-token"] = token;
  return headers;
}

export function adsDateTime(date: Date, timeZone = "America/Chicago"): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const pick = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "00";
  const hour = pick("hour") === "24" ? "00" : pick("hour");
  return `${pick("year")}-${pick("month")}-${pick("day")} ${hour}:${pick("minute")}:${pick("second")}`;
}

export function initialWatermark(now: Date): string {
  return adsDateTime(new Date(now.getTime() - LSA_LOOKBACK_MS));
}

/** After a clean run, keep a two-hour overlap so a lead written during the query is not skipped. */
export function nextWatermark(checkpoint: string | null, now: Date): string {
  const overlap = adsDateTime(new Date(now.getTime() - LSA_OVERLAP_MS));
  if (checkpoint && ADS_TIME.test(checkpoint) && checkpoint > overlap) return checkpoint;
  return overlap;
}

function assertAdsTime(since: string): void {
  if (!ADS_TIME.test(since)) throw new Error("Invalid watermark.");
}

export function leadQuery(since: string): string {
  assertAdsTime(since);
  return [
    "SELECT",
    "local_services_lead.id,",
    "local_services_lead.contact_details.consumer_name,",
    "local_services_lead.contact_details.phone_number,",
    "local_services_lead.contact_details.phone_number_extension,",
    "local_services_lead.category_id,",
    "local_services_lead.lead_type,",
    "local_services_lead.creation_date_time",
    "FROM local_services_lead",
    `WHERE local_services_lead.creation_date_time >= '${since}'`,
  ].join(" ");
}

export function conversationQuery(since: string): string {
  assertAdsTime(since);
  return [
    "SELECT",
    "local_services_lead_conversation.lead,",
    "local_services_lead_conversation.participant_type,",
    "local_services_lead_conversation.message_details.text",
    "FROM local_services_lead_conversation",
    `WHERE local_services_lead_conversation.event_date_time >= '${since}'`,
  ].join(" ");
}

export type LsaLead = {
  id: string;
  name: string;
  phone: string;
  phoneExtension: string;
  categoryId: string;
  leadType: string;
  creationDateTime: string;
};

export type LsaConversation = {
  leadId: string;
  participantType: string;
  text: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function asString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

/** True when a search row uses the v26 JSON names. A wiped contact still has the key. */
export function leadRowShapeOk(row: unknown): boolean {
  const lead = asRecord(asRecord(row)?.localServicesLead);
  if (!lead) return false;
  return "contactDetails" in lead || "leadType" in lead || "creationDateTime" in lead;
}

export function readLeadRow(row: unknown): LsaLead | null {
  const lead = asRecord(asRecord(row)?.localServicesLead);
  if (!lead) return null;
  const id = asString(lead.id);
  if (!/^\d+$/.test(id)) return null;
  const contact = asRecord(lead.contactDetails);
  const creationDateTime = asString(lead.creationDateTime);
  return {
    id,
    name: asString(contact?.consumerName),
    phone: asString(contact?.phoneNumber),
    phoneExtension: asString(contact?.phoneNumberExtension),
    categoryId: asString(lead.categoryId),
    leadType: asString(lead.leadType),
    creationDateTime: ADS_TIME.test(creationDateTime) ? creationDateTime : "",
  };
}

export function readConversationRow(row: unknown): LsaConversation | null {
  const conversation = asRecord(asRecord(row)?.localServicesLeadConversation);
  if (!conversation) return null;
  const leadId = asString(conversation.lead).match(/(\d+)\s*$/)?.[1] ?? "";
  if (!leadId) return null;
  const details = asRecord(conversation.messageDetails);
  return {
    leadId,
    participantType: asString(conversation.participantType).toUpperCase(),
    text: asString(details?.text),
  };
}

export function messageForLead(leadId: string, conversations: LsaConversation[]): string {
  const texts: string[] = [];
  for (const conversation of conversations) {
    if (conversation.leadId !== leadId) continue;
    if (conversation.participantType && conversation.participantType !== "CONSUMER") continue;
    if (!conversation.text) continue;
    texts.push(conversation.text);
  }
  return texts.join("\n\n").slice(0, 5000);
}

export function categoryLabel(categoryId: string): string {
  const raw = categoryId.trim();
  if (!raw) return "";
  if (/^\d+$/.test(raw)) return raw;
  const tail = raw.split(":").pop() ?? raw;
  const words = tail
    .replace(/^service_area_business_/, "")
    .replace(/[_-]+/g, " ")
    .trim();
  if (!words) return raw;
  return words.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

export function lsaSourceForLead(leadType: string, message: string): "lsa_phone" | "lsa_message" {
  const type = leadType.toUpperCase();
  if (type === "PHONE_CALL") return "lsa_phone";
  if (type === "MESSAGE" || type === "BOOKING") return "lsa_message";
  if (message.trim()) return "lsa_message";
  return "lsa_phone";
}

/** Null when Google has wiped the contact and there is no message to save. */
export function inboundFromLsa(lead: LsaLead, message: string, occurredAt: string): InboundLead | null {
  const text = message.trim();
  const name = lead.name.trim();
  const phone = lead.phone.trim();
  if (!name && !phoneLast10(phone) && !text) return null;
  const service = categoryLabel(lead.categoryId);
  const source = lsaSourceForLead(lead.leadType, text);
  return {
    source,
    externalId: `lsa:${lead.id}`,
    occurredAt: occurredAt.slice(0, 80) || "unknown",
    ...(name ? { name: name.slice(0, 200) } : {}),
    ...(phone ? { phone: phone.slice(0, 40) } : {}),
    ...(lead.phoneExtension ? { phoneExtension: lead.phoneExtension.slice(0, 20) } : {}),
    ...(service ? { service: service.slice(0, 200) } : {}),
    ...(text ? { message: text } : {}),
  };
}
