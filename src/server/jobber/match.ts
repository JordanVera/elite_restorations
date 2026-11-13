import { phoneLast10 } from "@/server/jobber/map";

/** Office numbers. A lead that only has one of these gets a new client. */
export const COMPANY_PHONES = [
  "713-909-0034",
  "281-748-0227",
  "713-909-0032",
  "713-909-4031",
  "505-532-2516",
] as const;

/** Office mailboxes. Matching on these attached customer leads to the office client. */
export const COMPANY_EMAILS = [
  "admin@eliterestorations.com",
  "george@eliterestorations.com",
  "george@texaselitegroup.com",
] as const;

const COMPANY_PHONE_LAST10 = new Set(COMPANY_PHONES.map((phone) => phoneLast10(phone)));
const COMPANY_EMAIL_SET = new Set<string>(COMPANY_EMAILS);

export type LeadContact = { email?: string | null; phone?: string | null };

export type ClientContact = {
  emails?: { address?: string | null }[] | null;
  phones?: { number?: string | null; normalizedPhoneNumber?: string | null }[] | null;
};

export function isCompanyPhone(value: string): boolean {
  const phone = phoneLast10(value);
  return Boolean(phone) && COMPANY_PHONE_LAST10.has(phone);
}

export function isCompanyEmail(value: string): boolean {
  const email = value.trim().toLowerCase();
  return Boolean(email) && COMPANY_EMAIL_SET.has(email);
}

/** Empty when the email is blank or an office mailbox. */
export function customerEmail(value: string): string {
  const email = value.trim().toLowerCase();
  if (!email || COMPANY_EMAIL_SET.has(email)) return "";
  return email;
}

/** Last 10 digits, or empty when the number is short or an office line. */
export function customerPhoneLast10(value: string): string {
  const phone = phoneLast10(value);
  if (!phone || COMPANY_PHONE_LAST10.has(phone)) return "";
  return phone;
}

/**
 * Terms safe to send to Jobber's client search.
 * Office email and office phone are omitted. An empty list means "create a new client".
 */
export function clientSearchTerms(lead: LeadContact): string[] {
  const email = customerEmail(lead.email ?? "");
  const phone = customerPhoneLast10(lead.phone ?? "");
  if (!email && !phone) return [];
  const terms: string[] = [];
  if (email) terms.push(email);
  const raw = (lead.phone ?? "").trim();
  if (phone && raw && raw !== phone && !isCompanyPhone(raw)) terms.push(raw);
  if (phone) terms.push(phone);
  return terms;
}

export function hasMatchableContact(lead: LeadContact): boolean {
  return clientSearchTerms(lead).length > 0;
}

/**
 * Match a customer phone on the last 10 digits, or a non-office email.
 * Office identifiers never match, even when the Jobber client is the office.
 */
export function matchesLead(node: ClientContact, lead: LeadContact): boolean {
  const email = customerEmail(lead.email ?? "");
  const phone = customerPhoneLast10(lead.phone ?? "");
  if (!email && !phone) return false;
  if (email && node.emails?.some((item) => (item.address ?? "").trim().toLowerCase() === email)) return true;
  if (!phone) return false;
  return Boolean(
    node.phones?.some((item) => phoneLast10(item.normalizedPhoneNumber || item.number || "") === phone),
  );
}
