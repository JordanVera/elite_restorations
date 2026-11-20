import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocalLandingView } from "@/components/local-landing";
import { CostGuideView } from "@/components/cost-guide";
import { AreaPageView } from "@/components/area-page";
import { WaterCauseView, waterCauseMetadata } from "@/components/water-cause-view";
import { LongformPage } from "@/components/longform-page";
import { NeighborhoodPageView } from "@/components/neighborhood-page";
import { WaterCauseSections } from "@/components/water-cause-sections";
import { brandLinksForService } from "@/lib/brand-nav";
import { esCityLandings, getEsCityLanding } from "@/lib/es/city-landings";
import { esCostGuides, getEsCostGuide } from "@/lib/es/cost-guides";
import { esAreaPages, getEsAreaPage } from "@/lib/es/area-pages";
import { esWaterCauses, getEsWaterCause } from "@/lib/es/water-causes";
import { editedPhotoSet } from "@/lib/edited-photos";
import { esNeighborhoods, getEsNeighborhood } from "@/lib/es/neighborhoods";
import { katyBathStoryEs, katyDeckStoryEs } from "@/lib/es/project-stories";
import { esHubs, getEsHub } from "@/lib/es/hubs";
import { readingForService } from "@/lib/related-reading";
import { getService } from "@/lib/services";
import { languageAlternates, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Params = { slug: string };

const claimSlugs = new Set([
  "water-damage-restoration",
  "roofing",
  "roofing-emergency-tarp-repair",
  "insurance-claims",
]);

export function generateStaticParams() {
  return [
    ...esHubs.map((hub) => ({ slug: hub.slug })),
    ...esNeighborhoods.map((page) => ({ slug: page.slug })),
    ...esCityLandings.map((page) => ({ slug: page.slug })),
    ...esCostGuides.map((guide) => ({ slug: guide.slug })),
    ...esWaterCauses.map((page) => ({ slug: page.slug })),
    ...esAreaPages.map((page) => ({ slug: page.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getEsCostGuide(slug);
  if (guide) {
    return pageMetadata({
      title: guide.title,
      description: guide.description,
      path: guide.path,
      locale: "es",
      languages: languageAlternates(guide.englishPath, guide.path),
    });
  }
  if (getEsWaterCause(slug)) return waterCauseMetadata(slug, "es");
  const area = getEsAreaPage(slug);
  if (area) {
    return pageMetadata({
      title: area.title,
      description: area.description,
      path: area.path,
      locale: "es",
      languages: languageAlternates(`/${slug}`, area.path),
    });
  }
  const neighborhood = getEsNeighborhood(slug);
  if (neighborhood) {
    return pageMetadata({
      title: neighborhood.title,
      description: neighborhood.description,
      path: neighborhood.path,
      locale: "es",
      languages: languageAlternates(`/${slug}`, neighborhood.path),
    });
  }
  const city = getEsCityLanding(slug);
  if (city) {
    return pageMetadata({
      title: city.title,
      description: city.description,
      path: city.path,
      locale: "es",
      image: editedPhotoSet(city.serviceSlug).hero.image.src,
      languages: languageAlternates(`/${slug}`, city.path),
    });
  }
  const hub = getEsHub(slug);
  const service = getService(slug);
  if (!hub) return {};
  return pageMetadata({
    title: hub.metaTitle,
    description: hub.description,
    path: `/es/${slug}`,
    locale: "es",
    languages: languageAlternates(`/${slug}`, `/es/${slug}`),
    image: service?.image?.src,
  });
}

export default async function SpanishServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const guide = getEsCostGuide(slug);
  if (guide) return <CostGuideView guide={guide} locale="es" />;
  if (getEsWaterCause(slug)) return <WaterCauseView slug={slug} locale="es" />;
  const area = getEsAreaPage(slug);
  if (area) return <AreaPageView page={area} locale="es" others={esAreaPages} />;
  const neighborhood = getEsNeighborhood(slug);
  if (neighborhood) {
    return (
      <NeighborhoodPageView
        page={neighborhood}
        others={esNeighborhoods.filter((item) => item.slug !== neighborhood.slug)}
        locale="es"
      />
    );
  }
  const city = getEsCityLanding(slug);
  if (city) {
    return <LocalLandingView landing={city} locale="es" />;
  }
  const hub = getEsHub(slug);
  const service = getService(slug);
  if (!hub || !service) notFound();
  const emergency = Boolean(service.emergency) || slug === "roofing-emergency-tarp-repair";
  return (
    <>
      <LongformPage
        locale="es"
        eyebrow={hub.eyebrow}
        title={
          slug === "laminate-flooring"
            ? ["Instalación de piso laminado", "en Houston"]
            : [hub.name, "en Houston"]
        }
        lede={hub.lede}
        crumbs={[
          { name: "Servicios", path: "/es" },
          { name: hub.name, path: `/es/${slug}` },
        ]}
        path={`/es/${slug}`}
        image={service.image}
        claimHelp={claimSlugs.has(slug)}
        propertyScope={slug === "water-damage-restoration" || slug === "roofing" || slug === "roofing-emergency-tarp-repair"}
        sections={hub.sections}
        faqs={hub.faqs}
        related={[
          ...readingForService(slug, "es"),
          ...service.related
            .map((related) => getEsHub(related))
            .filter((item) => item !== undefined)
            .map((item) => ({ href: `/es/${item.slug}`, label: item.name })),
          ...brandLinksForService(slug, "es"),
          ...(slug === "laminate-flooring"
            ? [
                {
                  href: "/es/projects/blackhorse-ranch-cypress",
                  label: "Pisos y cocina en BlackHorse Ranch, Cypress",
                },
              ]
            : []),
          ...(slug === "patios-decks" || slug === "carpentry"
            ? [
                {
                  href: katyDeckStoryEs.path,
                  label: katyDeckStoryEs.linkLabel,
                },
              ]
            : []),
          ...(slug === "carpentry"
            ? [
                {
                  href: "/es/projects/custom-walk-in-closet-katy",
                  label: "Clóset a medida en Katy",
                },
              ]
            : []),
          ...(slug === "bathroom-remodeling"
            ? [
                {
                  href: katyBathStoryEs.path,
                  label: katyBathStoryEs.linkLabel,
                },
              ]
            : []),
        ]}
        ctaTitle={emergency ? "¿Sigue entrando agua?" : `¿Planea ${hub.name.toLowerCase()}?`}
        ctaBody={
          emergency
            ? `Si sigue entrando agua, llame al ${site.phone.display}. Somos una empresa familiar en Houston desde 1993.`
            : `Somos una empresa familiar en Houston desde 1993. Llame al ${site.phone.display} para pedir un estimado, o envíe un texto.`
        }
        serviceName={`${hub.name} en Houston`}
        description={hub.description}
        emergency={emergency}
        insert={slug === "water-damage-restoration" ? <WaterCauseSections locale="es" /> : null}
      />
    </>
  );
}
