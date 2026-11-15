import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LongformPage } from "@/components/longform-page";
import { NeighborhoodPageView } from "@/components/neighborhood-page";
import { WaterCauseSections } from "@/components/water-cause-sections";
import { brandLinksForService } from "@/lib/brand-nav";
import { esNeighborhoods, getEsNeighborhood } from "@/lib/es/neighborhoods";
import { esHubs, getEsHub } from "@/lib/es/hubs";
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
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
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
  const hub = getEsHub(slug);
  const service = getService(slug);
  if (!hub || !service) notFound();
  const emergency = Boolean(service.emergency) || slug === "roofing-emergency-tarp-repair";
  return (
    <>
      <LongformPage
        locale="es"
        eyebrow={hub.eyebrow}
        title={[hub.name, "en Houston"]}
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
          ...service.related
            .map((related) => getEsHub(related))
            .filter((item) => item !== undefined)
            .map((item) => ({ href: `/es/${item.slug}`, label: item.name })),
          ...brandLinksForService(slug, "es"),
        ]}
        ctaTitle={emergency ? "¿Sigue entrando agua?" : `¿Planea ${hub.name.toLowerCase()}?`}
        ctaBody={
          emergency
            ? `Si sigue entrando agua, llame al ${site.phone.display}. Somos una empresa familiar en Houston desde 1993.`
            : `Somos una empresa familiar en Houston desde 1993. El estimado es gratis. Llame al ${site.phone.display} o envíe un texto.`
        }
        serviceName={`${hub.name} en Houston`}
        description={hub.description}
        emergency={emergency}
        insert={slug === "water-damage-restoration" ? <WaterCauseSections locale="es" /> : null}
      />
    </>
  );
}
