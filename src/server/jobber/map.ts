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

export function buildClientInput(lead: EstimateForJobber) {
  const { firstName, lastName } = splitName(lead.name);
  const input: Record<string, unknown> = {
    firstName,
    lastName,
    isCompany: false,
    phones: [
      {
        number: lead.phone.trim(),
        description: "MAIN",
        primary: true,
        smsAllowed: lead.contactMethod === "text",
      },
    ],
    properties: [{ address: addressForJobber(lead.address) }],
  };
  if (lead.email.trim()) {
    input.emails = [{ address: lead.email.trim(), description: "MAIN", primary: true }];
  }
  return input;
}

type FormItem = { label: string; answerText: string };

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

  return {
    clientId,
    ...(propertyId ? { propertyId } : {}),
    title: `${WEBSITE_SOURCE} · ${optionLabel(leadServices, lead.service)}`,
    requestDetails: {
      form: {
        sections: [{ label: WEBSITE_SOURCE, items }],
      },
    },
  };
}
