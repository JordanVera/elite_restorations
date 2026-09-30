import { services } from "@/lib/services";

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
