import { site } from "@/lib/site";

export const leadServices = [
  { value: "roof-repair", label: "Roof repair or replacement" },
  { value: "storm-hail", label: "Storm or hail damage" },
  { value: "water-damage", label: "Water damage" },
  { value: "fire-damage", label: "Fire damage" },
  { value: "kitchen-remodel", label: "Kitchen remodel" },
  { value: "bathroom-remodel", label: "Bathroom remodel" },
  { value: "flooring", label: "Flooring" },
  { value: "exterior", label: "Exterior (siding/gutters)" },
  { value: "outdoor", label: "Outdoor (decks/patios/fences)" },
  { value: "insurance-claim", label: "Insurance claim help" },
  { value: "other", label: "Other" },
] as const;

export type LeadService = (typeof leadServices)[number]["value"];

export const leadServiceLabelsEs: Record<LeadService, string> = {
  "roof-repair": "Reparación o reemplazo de techo",
  "storm-hail": "Daño por tormenta o granizo",
  "water-damage": "Daño por agua",
  "fire-damage": "Daño por fuego",
  "kitchen-remodel": "Remodelación de cocina",
  "bathroom-remodel": "Remodelación de baño",
  flooring: "Pisos",
  exterior: "Exterior (siding y canaletas)",
  outdoor: "Exterior (decks, patios y cercas)",
  "insurance-claim": "Ayuda con el reclamo del seguro",
  other: "Otro",
};

export const claimAnswers = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const claimAnswersEs = [
  { value: "yes", label: "Sí" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "No estoy seguro" },
] as const;

export type ClaimAnswer = (typeof claimAnswers)[number]["value"];

export const contactMethods = [
  { value: "phone", label: "Phone call" },
  { value: "text", label: "Text message" },
  { value: "email", label: "Email" },
] as const;

export const contactMethodsEs = [
  { value: "phone", label: "Llamada" },
  { value: "text", label: "Mensaje de texto" },
  { value: "email", label: "Correo" },
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
  "wood-flooring": "flooring",
  "tile-flooring": "flooring",
  "vinyl-flooring": "flooring",
  "laminate-flooring": "flooring",
  flooring: "flooring",
  carpentry: "other",
  "tile-fireplaces": "other",
  siding: "exterior",
  gutters: "exterior",
  "patios-decks": "outdoor",
  patios: "outdoor",
  gazebos: "outdoor",
  decks: "outdoor",
  "fence-installation-repair": "outdoor",
  "painting-drywall-repair": "other",
  painting: "other",
  "insurance-claims": "insurance-claim",
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

export const callbackPromiseEs = `Las solicitudes que llegan en horario de oficina (lunes a sábado, 8:00 a. m. a 6:00 p. m.) reciben una llamada el mismo día. Fuera de horario, llamamos a la mañana siguiente que abrimos.`;

export const emergencyCallback =
  "For water coming in now, call (713) 909-0034. We answer any time. Online requests sent after hours are returned the next morning.";

export const emergencyCallbackEs =
  "Si el agua está entrando ahora, llame al (713) 909-0034. Contestamos a cualquier hora. Las solicitudes en línea enviadas fuera de horario se responden a la mañana siguiente.";
