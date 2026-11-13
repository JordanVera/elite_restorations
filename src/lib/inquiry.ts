import { site } from "@/lib/site";

export const leadServices = [
  { value: "roof-repair", label: "Roof repair or replacement" },
  { value: "storm-hail", label: "Storm or hail damage" },
  { value: "water-damage", label: "Water damage" },
  { value: "fire-damage", label: "Fire damage" },
  { value: "kitchen-remodel", label: "Kitchen remodel" },
  { value: "bathroom-remodel", label: "Bathroom remodel" },
  { value: "other", label: "Other" },
] as const;

export type LeadService = (typeof leadServices)[number]["value"];

export const claimAnswers = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure" },
] as const;

export type ClaimAnswer = (typeof claimAnswers)[number]["value"];

export const contactMethods = [
  { value: "phone", label: "Phone call" },
  { value: "text", label: "Text message" },
  { value: "email", label: "Email" },
] as const;

export type ContactMethod = (typeof contactMethods)[number]["value"];

/** Service-page and city-page slugs that should preselect the short lead list. */
const slugToService: Record<string, LeadService> = {
  "kitchen-remodeling": "kitchen-remodel",
  backsplash: "kitchen-remodel",
  countertops: "kitchen-remodel",
  "bathroom-remodeling": "bathroom-remodel",
  roofing: "roof-repair",
  "roof-replacement": "roof-repair",
  "roofing-emergency-tarp-repair": "storm-hail",
  "water-damage-restoration": "water-damage",
  "wood-flooring": "other",
  "tile-flooring": "other",
  "vinyl-flooring": "other",
  "laminate-flooring": "other",
  carpentry: "other",
  "tile-fireplaces": "other",
  siding: "other",
  "patios-decks": "other",
  "painting-drywall-repair": "other",
  "not-sure": "other",
};

export function serviceForSlug(value: string | undefined): LeadService | "" {
  if (!value) return "";
  if (leadServices.some((item) => item.value === value)) return value as LeadService;
  return slugToService[value] ?? "";
}

export function optionLabel(
  list: readonly { value: string; label: string }[],
  value: string,
) {
  return list.find((item) => item.value === value)?.label ?? value;
}

export const urgentServices: readonly LeadService[] = [
  "roof-repair",
  "storm-hail",
  "water-damage",
  "fire-damage",
];

export function isUrgentService(value: string): boolean {
  return (urgentServices as readonly string[]).includes(value);
}

const [officeHours] = site.hours;

export const callbackPromise = `Requests that reach us during office hours (${officeHours.days}, ${officeHours.time}) get a call back the same day. After hours, we call the next morning we are open.`;
