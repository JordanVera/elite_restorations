/** Product landing pages linked from the service menus and Spanish service pages. */

export const brandServiceLinks = [
  {
    group: "Roof & exterior" as const,
    href: "/certainteed-roofing-houston",
    esHref: "/es/certainteed-roofing-houston",
    label: "CertainTeed roofing",
    esLabel: "Techos CertainTeed",
    services: ["roofing", "roof-replacement", "roofing-emergency-tarp-repair"] as const,
  },
  {
    group: "Roof & exterior" as const,
    href: "/james-hardie-siding-houston",
    esHref: "/es/james-hardie-siding-houston",
    label: "James Hardie siding",
    esLabel: "Siding James Hardie",
    services: ["siding"] as const,
  },
  {
    group: "Recovery" as const,
    href: "/sherwin-williams-painting-houston",
    esHref: "/es/sherwin-williams-painting-houston",
    label: "Sherwin-Williams painting",
    esLabel: "Pintura Sherwin-Williams",
    services: [
      "painting-drywall-repair",
      "water-damage-restoration",
      "kitchen-remodeling",
      "bathroom-remodeling",
    ] as const,
  },
  {
    group: "Floors" as const,
    href: "/floor-and-decor-flooring-installation-houston",
    esHref: "/es/floor-and-decor-flooring-installation-houston",
    label: "Floor & Decor flooring",
    esLabel: "Pisos Floor & Decor",
    services: [
      "wood-flooring",
      "tile-flooring",
      "vinyl-flooring",
      "laminate-flooring",
      "water-damage-restoration",
      "kitchen-remodeling",
      "bathroom-remodeling",
    ] as const,
  },
  {
    group: "Interiors" as const,
    href: "/expo-stone-countertops-houston",
    esHref: "/es/expo-stone-countertops-houston",
    label: "Expo Stone countertops",
    esLabel: "Cubiertas Expo Stone",
    services: [
      "countertops",
      "backsplash",
      "kitchen-remodeling",
      "bathroom-remodeling",
      "water-damage-restoration",
    ] as const,
  },
];

export function brandLinksForService(slug: string, locale: "en" | "es") {
  return brandServiceLinks
    .filter((item) => (item.services as readonly string[]).includes(slug))
    .map((item) => ({
      href: locale === "es" ? item.esHref : item.href,
      label: locale === "es" ? item.esLabel : item.label,
    }));
}
