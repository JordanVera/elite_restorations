import type { Metadata } from "next";
import Link from "next/link";

import { LongformPage } from "@/components/longform-page";
import { esInsurers, getEsInsurer } from "@/lib/es/insurers";
import { getInsurer, insurers } from "@/lib/insurers";
import { languageAlternates, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { roofs, tarps } from "@/lib/topic-photos";

const insurerImages = {
  "state-farm": roofs.missingShingles,
  allstate: tarps.partial,
  usaa: roofs.finishedBrick,
  farmers: roofs.stoneGable,
  "liberty-mutual": roofs.twoStoryStone,
  travelers: roofs.underlayment,
  nationwide: roofs.whiteSiding,
  progressive: roofs.multiGable,
} as const;

export function insurerMetadata(slug: string, locale: "en" | "es" = "en"): Metadata {
  if (locale === "es") {
    const page = getEsInsurer(slug);
    if (!page) return {};
    return pageMetadata({
      title: page.metaTitle,
      description: page.description,
      path: page.path,
      locale: "es",
      image: insurerImages[slug as keyof typeof insurerImages]?.src,
      languages: languageAlternates(page.englishPath, page.path),
    });
  }
  const page = getInsurer(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.description,
    path: `/insurance-claims/companies/${page.slug}`,
    image: insurerImages[slug as keyof typeof insurerImages]?.src,
    languages: languageAlternates(
      `/insurance-claims/companies/${page.slug}`,
      `/es/insurance-claims/companies/${page.slug}`,
    ),
  });
}

export function InsurerView({ slug, locale = "en" }: { slug: string; locale?: "en" | "es" }) {
  const es = locale === "es";
  const page = es ? getEsInsurer(slug) : getInsurer(slug);
  if (!page) return null;
  const path = es
    ? `/es/insurance-claims/companies/${page.slug}`
    : `/insurance-claims/companies/${page.slug}`;
  return (
    <LongformPage
      locale={locale}
      eyebrow={es ? "Sin afiliación" : "Not affiliated"}
      title={es ? ["Dueños en Houston", `asegurados por ${page.name}.`] : ["Houston homeowners", `insured by ${page.name}.`]}
      lede={page.lede}
      crumbs={
        es
          ? [
              { name: "Reclamos", path: "/es/insurance-claims" },
              { name: "Aseguradoras", path: "/es/insurance-claims/companies" },
              { name: page.name, path },
            ]
          : [
              { name: "Insurance claims", path: "/insurance-claims" },
              { name: "Insurers", path: "/insurance-claims/companies" },
              { name: page.name, path },
            ]
      }
      path={path}
      image={insurerImages[page.slug as keyof typeof insurerImages]}
      claimHelp
      propertyScope
      sections={page.sections}
      faqs={page.faqs}
      related={
        es
          ? [
              { href: "/es/insurance-claims", label: "Ayuda con reclamos de seguro" },
              {
                href: "/es/blog/how-insurance-claims-work-texas-restoration",
                label: "Cómo suele avanzar un reclamo en Texas",
              },
              {
                href: "/es/blog/how-to-build-an-insurance-photo-log",
                label: "Cómo armar un registro de fotos",
              },
              { href: "/es/water-damage-restoration", label: "Restauración por daño de agua" },
              { href: "/es/roofing", label: "Techos" },
              { href: "/es/houston-storm-damage", label: "Ayuda por tormenta en Houston" },
              { href: "/es/insurance-claims/companies", label: "Todas las guías de aseguradoras" },
            ]
          : [
              { href: "/insurance-claims", label: "Insurance claims help" },
              { href: "/how-insurance-claims-work-texas-restoration", label: "How Texas restoration claims usually move" },
              { href: "/how-to-build-an-insurance-photo-log", label: "How to build an insurance photo log" },
              { href: "/water-damage-restoration", label: "Water damage restoration" },
              { href: "/roofing", label: "Roofing" },
              { href: "/houston-storm-damage", label: "Houston storm damage help" },
              { href: "/insurance-claims/companies", label: "All insurer guides" },
            ]
      }
      ctaTitle={es ? `¿Daño en una casa con ${page.name}?` : `Damage in a ${page.name} household?`}
      ctaBody={
        es
          ? `Llame al ${site.phone.display} o envíe un texto. Ayudamos a documentar y a reparar. ${page.name} decide el reclamo. No somos ${page.name}.`
          : `Call ${site.phone.display} or text us. We help document and repair. ${page.name} decides the claim. We are not ${page.name}.`
      }
      serviceName={
        es
          ? `Documentación de tormenta y agua en Houston para asegurados de ${page.name}`
          : `Houston storm and water documentation for ${page.name} policyholders`
      }
      description={page.description}
      emergency
    />
  );
}

export function InsurerIndex({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  const items = es ? esInsurers : insurers;
  return (
    <ul className="mt-10 border-t border-border">
      {items.map((insurer) => (
        <li key={insurer.slug} className="border-b border-border">
          <Link
            href={es ? `/es/insurance-claims/companies/${insurer.slug}` : `/insurance-claims/companies/${insurer.slug}`}
            className="flex items-baseline justify-between gap-6 py-6 font-display text-3xl hover:text-accent-ink"
          >
            {insurer.name}
            <span className="text-sm text-muted-foreground">
              {es ? "Dueños con los que trabajamos" : "Homeowners we work with"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
