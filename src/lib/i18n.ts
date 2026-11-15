import { houstonPostSlugs, neighborhoodSlugs } from "@/lib/locale-paths";

/** English paths that have a Spanish page. City pages are not in this set. */

export const spanishServiceSlugs = [
  "kitchen-remodeling",
  "bathroom-remodeling",
  "backsplash",
  "countertops",
  "wood-flooring",
  "tile-flooring",
  "vinyl-flooring",
  "laminate-flooring",
  "carpentry",
  "tile-fireplaces",
  "roofing",
  "roof-replacement",
  "roofing-emergency-tarp-repair",
  "siding",
  "patios-decks",
  "water-damage-restoration",
  "insurance-claims",
  "painting-drywall-repair",
] as const;

const spanishServiceSlugSet = new Set<string>(spanishServiceSlugs);
const neighborhoodSlugSet = new Set<string>(neighborhoodSlugs);
const houstonPostSlugSet = new Set<string>(houstonPostSlugs);

const staticSpanishPaths: Record<string, string> = {
  "/": "/es",
  "/restoration": "/es/restoration",
  "/emergency": "/es/emergency",
  "/contact": "/es/contact",
  "/houston-storm-damage": "/es/houston-storm-damage",
  "/certainteed-roofing-houston": "/es/certainteed-roofing-houston",
  "/james-hardie-siding-houston": "/es/james-hardie-siding-houston",
  "/sherwin-williams-painting-houston": "/es/sherwin-williams-painting-houston",
  "/floor-and-decor-flooring-installation-houston":
    "/es/floor-and-decor-flooring-installation-houston",
  "/expo-stone-countertops-houston": "/es/expo-stone-countertops-houston",
  "/abc-supply-roofing-siding-houston": "/es/abc-supply-roofing-siding-houston",
  "/ferguson-plumbing-fixtures-installation-houston":
    "/es/ferguson-plumbing-fixtures-installation-houston",
};

export function isSpanishPath(pathname: string) {
  return pathname === "/es" || pathname.startsWith("/es/");
}

export function spanishPathFor(pathname: string) {
  const path = pathname.split("?")[0] || "/";
  if (staticSpanishPaths[path]) return staticSpanishPaths[path];
  if (path === "/blog") return "/es/blog";
  const slug = path.slice(1);
  if (spanishServiceSlugSet.has(slug)) return `/es/${slug}`;
  if (neighborhoodSlugSet.has(slug)) return `/es/${slug}`;
  if (houstonPostSlugSet.has(slug)) return `/es/blog/${slug}`;
  return null;
}

export function englishPathFor(pathname: string) {
  const path = pathname.split("?")[0] || "/";
  if (path === "/es") return "/";
  if (path === "/es/blog") return "/blog";
  if (path.startsWith("/es/blog/")) {
    const slug = path.slice("/es/blog/".length);
    if (houstonPostSlugSet.has(slug)) return `/${slug}`;
  }
  if (path.startsWith("/es/")) {
    const rest = path.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return path;
}

export function localeSwitch(pathname: string) {
  const path = pathname.split("?")[0] || "/";
  if (isSpanishPath(path)) {
    return { current: "es" as const, en: englishPathFor(path), es: path };
  }
  return { current: "en" as const, en: path, es: spanishPathFor(path) ?? "/es" };
}

export const esGroupNames: Record<string, string> = {
  Interiors: "Interiores",
  Floors: "Pisos",
  "Roof & exterior": "Techo y exterior",
  Recovery: "Restauración",
};

export const esServiceNames: Record<(typeof spanishServiceSlugs)[number], string> = {
  "kitchen-remodeling": "Remodelación de cocinas",
  "bathroom-remodeling": "Remodelación de baños",
  backsplash: "Backsplash",
  countertops: "Cubiertas de cocina",
  "wood-flooring": "Pisos de madera",
  "tile-flooring": "Pisos de loseta",
  "vinyl-flooring": "Pisos de vinil",
  "laminate-flooring": "Pisos laminados",
  carpentry: "Carpintería",
  "tile-fireplaces": "Chimeneas de loseta",
  roofing: "Techos",
  "roof-replacement": "Reemplazo de techo",
  "roofing-emergency-tarp-repair": "Lona de emergencia para techos",
  siding: "Siding",
  "patios-decks": "Patios y decks",
  "water-damage-restoration": "Restauración por daño de agua",
  "insurance-claims": "Ayuda con reclamos de seguro",
  "painting-drywall-repair": "Pintura y reparación de drywall",
};

export function serviceHref(slug: string, locale: "en" | "es") {
  if (locale === "es" && spanishServiceSlugSet.has(slug)) return `/es/${slug}`;
  return `/${slug}`;
}
