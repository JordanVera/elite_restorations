import type { Metadata } from "next";

import { LongformPage } from "@/components/longform-page";
import { getEsWaterCause } from "@/lib/es/water-causes";
import { getWaterCause, waterCauses } from "@/lib/water-causes";
import { languageAlternates, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const relatedEn = [
  { href: "/water-damage-restoration", label: "Water damage restoration" },
  { href: "/insurance-claims", label: "Insurance claims help" },
  { href: "/how-to-build-an-insurance-photo-log", label: "How to build an insurance photo log" },
  { href: "/slab-moisture-after-a-supply-line-break-houston", label: "Slab moisture after a supply-line break" },
  { href: "/commercial-storm-restoration", label: "Commercial and apartment water damage" },
  { href: "/houston-storm-damage", label: "Houston storm damage help" },
];

const relatedEs = [
  { href: "/es/water-damage-restoration", label: "Restauración por daño de agua" },
  { href: "/es/insurance-claims", label: "Ayuda con reclamos de seguro" },
  { href: "/es/blog/how-to-build-an-insurance-photo-log", label: "Cómo armar un registro de fotos" },
  { href: "/es/blog/slab-moisture-after-a-supply-line-break-houston", label: "Humedad en la losa después de una rotura" },
  { href: "/es/commercial-storm-restoration", label: "Daño de agua en comercios y apartamentos" },
  { href: "/es/houston-storm-damage", label: "Ayuda por tormenta en Houston" },
];

export function waterCauseMetadata(slug: string, locale: "en" | "es" = "en"): Metadata {
  const image = getWaterCause(slug)?.image.src;
  if (locale === "es") {
    const page = getEsWaterCause(slug);
    if (!page) return {};
    return pageMetadata({
      title: page.metaTitle,
      description: page.description,
      path: page.path,
      locale: "es",
      image,
      languages: languageAlternates(page.englishPath, page.path),
    });
  }
  const page = getWaterCause(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.description,
    path: page.path,
    image,
    languages: languageAlternates(page.path, `/es/${slug}`),
  });
}

export function WaterCauseView({ slug, locale = "en" }: { slug: string; locale?: "en" | "es" }) {
  const es = locale === "es";
  const english = getWaterCause(slug);
  const spanish = es ? getEsWaterCause(slug) : undefined;
  const page = es ? spanish : english;
  if (!page || !english) return null;
  const path = es ? `/es/${slug}` : english.path;
  const links = (es ? relatedEs : relatedEn).filter((link) => link.href !== path);
  return (
    <LongformPage
      locale={locale}
      eyebrow={page.eyebrow}
      title={page.title}
      lede={page.lede}
      crumbs={[{ name: page.eyebrow, path }]}
      path={path}
      image={english.image}
      claimHelp
      propertyScope
      sections={page.sections}
      faqs={page.faqs}
      related={links}
      ctaTitle={es ? "¿Sigue corriendo el agua?" : "Water still moving?"}
      ctaBody={
        es
          ? `Llame al ${site.phone.display} a cualquier hora si hay una fuga activa en una casa, un apartamento o un comercio. Envíe un texto al mismo número si no puede hablar. Secamos y reparamos. No decidimos el reclamo.`
          : `Call ${site.phone.display} any time for an active leak in a house, apartment, or commercial building. Text the same number if you cannot talk. We dry and repair. We do not decide the claim.`
      }
      serviceName={page.metaTitle}
      description={page.description}
      emergency
    />
  );
}

export const waterCauseSlugs = waterCauses.map((page) => page.slug);
