import type { Metadata } from "next";

import { LongformPage } from "@/components/longform-page";
import { getBrandPage } from "@/lib/brand-pages";
import { languageAlternates, pageMetadata } from "@/lib/seo";

export function brandPageMetadata(slug: string, locale: "en" | "es"): Metadata {
  const page = getBrandPage(slug, locale);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.description,
    path: page.path,
    locale,
    image: page.image,
    languages: languageAlternates(page.enPath, page.esPath),
  });
}

export function BrandPageView({ slug, locale }: { slug: string; locale: "en" | "es" }) {
  const page = getBrandPage(slug, locale);
  if (!page) return null;
  return (
    <LongformPage
      locale={locale}
      eyebrow={page.eyebrow}
      title={page.title}
      lede={page.lede}
      crumbs={[...page.crumbs]}
      path={page.path}
      sections={page.sections}
      faqs={page.faqs}
      related={page.related}
      relatedHeading={page.relatedHeading}
      ctaTitle={page.ctaTitle}
      ctaBody={page.ctaBody}
      serviceName={page.serviceName}
      description={page.description}
    />
  );
}
