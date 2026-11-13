import { claimAnswers, contactMethods, leadServices, optionLabel, type ClaimAnswer, type ContactMethod, type LeadService } from "@/lib/inquiry";

/** Shown on the Jobber request. requestCreate has no source argument, so this is a form answer. */
export const WEBSITE_SOURCE = "Website estimate form";

export type EstimateForJobber = {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: LeadService;
  claim: ClaimAnswer;
  carrier: string;
  contactMethod: ContactMethod;
  message: string;
  pageUrl: string;
};

export type JobberAddress = {
  street1?: string;
  postalCode?: string;
  country: "US";
};

export function splitName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "Website";
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName };
}

/** A ZIP goes in postalCode. Anything else stays in street1, unparsed. */
export function addressForJobber(value: string): JobberAddress {
  const trimmed = value.trim();
  if (/^\d{5}(?:-\d{4})?$/.test(trimmed)) return { postalCode: trimmed, country: "US" };
  return { street1: trimmed, country: "US" };
}

export function phoneLast10(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 ? digits.slice(-10) : "";
}

/** (713) 555-0100. Empty when the value does not have 10 digits. */
export function formatUsPhone(value: string): string {
  const digits = phoneLast10(value);
  if (!digits) return "";
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Pull a trailing extension off a phone so the last 10 digits stay the subscriber number. */
export function splitPhoneExtension(value: string): { phone: string; extension: string } {
  const trimmed = value.trim();
  const match = trimmed.match(/^(.*?)(?:\s*(?:ext\.?|extension|x)\s*(\d{1,8}))$/i);
  if (!match?.[1] || !match[2]) return { phone: trimmed, extension: "" };
  return { phone: match[1].trim(), extension: match[2] };
}

export type JobberContact = {
  name: string;
  email: string;
  phone: string;
  address: string;
  smsAllowed: boolean;
};

export function buildContactClientInput(contact: JobberContact) {
  const { firstName, lastName } = splitName(contact.name);
  const input: {
    firstName: string;
    lastName: string;
    isCompany: false;
    phones?: { number: string; description: "MAIN"; primary: true; smsAllowed: boolean }[];
    emails?: { address: string; description: "MAIN"; primary: true }[];
    properties?: { address: JobberAddress }[];
  } = {
    firstName,
    lastName,
    isCompany: false,
  };
  if (contact.phone.trim()) {
    input.phones = [
      {
        number: contact.phone.trim(),
        description: "MAIN",
        primary: true,
        smsAllowed: contact.smsAllowed,
      },
    ];
  }
  if (contact.email.trim()) {
    input.emails = [{ address: contact.email.trim(), description: "MAIN", primary: true }];
  }
  if (contact.address.trim()) {
    input.properties = [{ address: addressForJobber(contact.address) }];
  }
  return input;
}

export function buildClientInput(lead: EstimateForJobber) {
  return buildContactClientInput({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    address: lead.address,
    smsAllowed: lead.contactMethod === "text",
  });
}

export type FormItem = { label: string; answerText: string };

export type JobberIngestLead = {
  /** Used as-is. When empty, the formatted phone is the name. */
  name?: string;
  email?: string;
  phone?: string;
  /** Street, ZIP, or city. Omitted from the client when blank. */
  address?: string;
  smsAllowed?: boolean;
  sourceLabel: string;
  title: string;
  notes: FormItem[];
};

/** requestCreate has no source argument. The source is a form answer, same as the website form. */
export function buildRequestEnvelope(args: {
  clientId: string;
  propertyId?: string;
  title: string;
  sectionLabel: string;
  items: FormItem[];
}) {
  return {
    clientId: args.clientId,
    ...(args.propertyId ? { propertyId: args.propertyId } : {}),
    title: args.title,
    requestDetails: {
      form: {
        sections: [{ label: args.sectionLabel, items: args.items }],
      },
    },
  };
}

export function buildRequestInput(lead: EstimateForJobber, clientId: string, propertyId?: string) {
  const items: FormItem[] = [
    { label: "Service", answerText: optionLabel(leadServices, lead.service) },
    { label: "Message", answerText: lead.message.trim() || "No message" },
    { label: "Insurance claim", answerText: optionLabel(claimAnswers, lead.claim) },
  ];
  if (lead.carrier.trim()) items.push({ label: "Insurance carrier", answerText: lead.carrier.trim() });
  items.push({ label: "Source", answerText: WEBSITE_SOURCE });
  items.push({ label: "Preferred contact", answerText: optionLabel(contactMethods, lead.contactMethod) });
  if (lead.pageUrl.trim()) items.push({ label: "Page", answerText: lead.pageUrl.trim() });

  return buildRequestEnvelope({
    clientId,
    propertyId,
    title: `${WEBSITE_SOURCE} · ${optionLabel(leadServices, lead.service)}`,
    sectionLabel: WEBSITE_SOURCE,
    items,
  });
}

/** Inbound leads do not use the website service, claim, or contact-method enums. */
export function buildInboundRequestInput(args: {
  clientId: string;
  propertyId?: string;
  title: string;
  sourceLabel: string;
  notes: FormItem[];
}) {
  const items = args.notes.filter((item) => item.label !== "Source" && item.answerText.trim());
  items.push({ label: "Source", answerText: args.sourceLabel });
  return buildRequestEnvelope({
    clientId: args.clientId,
    propertyId: args.propertyId,
    title: args.title,
    sectionLabel: args.sourceLabel,
    items,
  });
}
