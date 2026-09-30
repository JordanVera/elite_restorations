import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const NOT_SURE = "not-sure";

export const inquiryServiceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.name, group: s.group as string })),
  { value: NOT_SURE, label: "Not sure yet", group: "Other" },
];

export const quickPicks = [
  { value: "kitchen-remodeling", label: "Kitchen" },
  { value: "bathroom-remodeling", label: "Bathroom" },
  { value: "wood-flooring", label: "Floors" },
  { value: "roof-replacement", label: "Roof" },
  { value: "water-damage-restoration", label: "Water damage" },
  { value: NOT_SURE, label: "Something else" },
] as const;

export function isKnownService(value: string | undefined): value is string {
  return !!value && inquiryServiceOptions.some((o) => o.value === value);
}

export const leadPaths = ["remodel", "recovery"] as const;
export type LeadPath = (typeof leadPaths)[number];

export function isLeadPath(value: string | undefined): value is LeadPath {
  return !!value && (leadPaths as readonly string[]).includes(value);
}

export const rooms = [
  { value: "kitchen", label: "Kitchen" },
  { value: "bathroom", label: "Bathroom" },
  { value: "floors", label: "Floors" },
  { value: "exterior", label: "Siding or exterior" },
  { value: "several", label: "More than one space" },
  { value: "other", label: "Something else" },
] as const;
export type Room = (typeof rooms)[number]["value"];

export const timelines = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "In the next 1 to 3 months" },
  { value: "this-year", label: "Sometime this year" },
  { value: "exploring", label: "Just exploring" },
] as const;
export type Timeline = (typeof timelines)[number]["value"];

export const incidents = [
  { value: "storm-roof", label: "Storm or roof damage" },
  { value: "leak", label: "Leak or burst pipe" },
  { value: "flood", label: "Flooding or standing water" },
  { value: "other", label: "Something else" },
] as const;
export type Incident = (typeof incidents)[number]["value"];

export const yesNo = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export const insurerAnswers = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure" },
] as const;

const recoveryServices: Record<string, Incident | ""> = {
  "roofing-emergency-tarp-repair": "storm-roof",
  "roof-replacement": "storm-roof",
  "water-damage-restoration": "",
};

const roomByService: Record<string, Room> = {
  "kitchen-remodeling": "kitchen",
  backsplash: "kitchen",
  countertops: "kitchen",
  "bathroom-remodeling": "bathroom",
  "wood-flooring": "floors",
  "tile-flooring": "floors",
  "vinyl-flooring": "floors",
  "laminate-flooring": "floors",
  siding: "exterior",
  carpentry: "other",
  "tile-fireplaces": "other",
  "painting-drywall-repair": "other",
};

export function pathForService(service: string | undefined): LeadPath {
  return service && service in recoveryServices ? "recovery" : "remodel";
}

export function roomForService(service: string | undefined): Room | "" {
  return (service && roomByService[service]) || "";
}

export function incidentForService(service: string | undefined): Incident | "" {
  return (service && recoveryServices[service]) || "";
}

const [officeHours] = site.hours;

export const callbackPromise = `Requests that reach us during office hours (${officeHours.days}, ${officeHours.time}) get a call back the same day. After hours, we call the next morning we are open.`;
