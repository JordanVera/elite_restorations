import type { Metadata } from "next";

import { site } from "@/lib/site";

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;
const BRAND_SUFFIX = " | Elite Restorations";
const DEFAULT_IMAGE = "/images/projects/kitchens/coffered-ceiling-island.jpg";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

/**
 * Absolute URL on https://eliterestorations.com.
 * The homepage is the origin with no trailing slash. Next.js emits that
 * form as the canonical for `/`, and the sitemap uses the same string.
 */
export function absoluteUrl(path: string) {
  const url = new URL(path, site.url);
  if (url.pathname === "/" && url.search === "" && url.hash === "") {
    return url.origin;
  }
  return url.toString();
}

/**
 * These service pages pass a finished title lead. Each lead names Houston
 * in a different word order from the "{service} in Houston" city page, so the
 * two document titles stay different.
 */
const serviceLedTitleSlugs = new Set([
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
  "painting-drywall-repair",
  "water-damage-restoration",
  "insurance-claims",
]);

/** Lead passed to `pageMetadata`. City pages keep a Houston title. */
export function servicePageTitle(service: {
  slug: string;
  name: string;
  metaTitle?: string;
}) {
  const lead = service.metaTitle ?? service.name;
  if (serviceLedTitleSlugs.has(service.slug)) return lead;
  return localTitle(lead);
}

/** True when `lead` plus the business name fits the 60-character title. */
export function titleFits(lead: string) {
  const text = lead.replace(/\s+/g, " ").trim();
  if (text.includes("Elite Restorations")) {
    return documentTitle(text) === text;
  }
  return documentTitle(text) === `${text}${BRAND_SUFFIX}`;
}

/** Document title, 60 characters or fewer, with the business name. */
export function documentTitle(lead: string) {
  const text = lead.replace(/\s+/g, " ").trim();
  if (text.includes("Elite Restorations")) {
    return text.length <= TITLE_MAX ? text : text.slice(0, TITLE_MAX).trim();
  }
  const full = `${text}${BRAND_SUFFIX}`;
  if (full.length <= TITLE_MAX) return full;
  const room = TITLE_MAX - BRAND_SUFFIX.length;
  const cut = text.slice(0, room).replace(/[\s,|–—:&-]+$/u, "").trim();
  return `${cut}${BRAND_SUFFIX}`;
}

/** Prefer a Houston local title that still fits the 60-character limit. */
export function localTitle(name: string) {
  const candidates = [`${name} in Houston, TX`, `${name} in Houston`, name];
  for (const candidate of candidates) {
    const titled = `${candidate}${BRAND_SUFFIX}`;
    if (titled.length <= TITLE_MAX) return titled;
  }
  return documentTitle(name);
}

export function fitDescription(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= DESCRIPTION_MAX) return clean;
  const slice = clean.slice(0, DESCRIPTION_MAX);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).replace(
    /[.,;: ]+$/,
    "",
  );
  return cut.endsWith(".") ? cut : `${cut}.`;
}

export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetaInput): Metadata {
  const fullTitle = documentTitle(title);
  const desc = fitDescription(description);
  const canonical = absoluteUrl(path);
  const ogImage = image ?? DEFAULT_IMAGE;
  return {
    title: { absolute: fullTitle },
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: canonical,
      type: "website",
      siteName: site.name,
      locale: "en_US",
      images: [{ url: ogImage, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
  };
}

export function localBusinessSchema(extra?: Record<string, unknown>) {
  return {
    "@context": "https://schema.org",
    "@type": [
      "HomeAndConstructionBusiness",
      "RoofingContractor",
      "GeneralContractor",
    ],
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    description: site.description,
    telephone: site.phone.e164,
    email: site.email,
    foundingDate: String(site.founded),
    image: absoluteUrl("/images/services/kitchen-remodeling.jpg"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/logo/logo-main.png"),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.addressLocality,
      addressRegion: site.address.addressRegion,
      postalCode: site.address.postalCode,
      addressCountry: site.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [...site.sameAs],
    ...extra,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
