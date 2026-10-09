import type { Metadata } from "next";

import { site } from "@/lib/site";
import { googleReviews } from "@/lib/testimonials";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const images = image ? [{ url: image }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      siteName: site.name,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    description: site.description,
    telephone: site.phone.e164,
    email: site.email,
    foundingDate: String(site.founded),
    image: absoluteUrl("/images/services/kitchen-remodeling.jpg"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Houston",
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: site.social.map((s) => s.href),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(googleReviews.score),
      reviewCount: String(googleReviews.count),
      bestRating: "5",
      worstRating: "1",
    },
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
