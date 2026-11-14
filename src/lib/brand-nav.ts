/** Product landing pages linked from the roofing and siding service lists. */

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
];

export function brandLinksForService(slug: string, locale: "en" | "es") {
  return brandServiceLinks
    .filter((item) => (item.services as readonly string[]).includes(slug))
    .map((item) => ({
      href: locale === "es" ? item.esHref : item.href,
      label: locale === "es" ? item.esLabel : item.label,
    }));
}
