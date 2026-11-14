import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LongformPage } from "@/components/longform-page";
import { WaterCauseSections } from "@/components/water-cause-sections";
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
  return esHubs.map((hub) => ({ slug: hub.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
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
  const hub = getEsHub(slug);
  const service = getService(slug);
  if (!hub || !service) notFound();
  const emergency = Boolean(service.emergency) || slug === "roofing-emergency-tarp-repair";
  return (
    <>
      <LongformPage
        locale="es"
        eyebrow={hub.eyebrow}
        title={["Houston", hub.name]}
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
        related={service.related
          .map((related) => getEsHub(related))
          .filter((item) => item !== undefined)
          .map((item) => ({ href: `/es/${item.slug}`, label: item.name }))}
        ctaTitle={emergency ? "¿Sigue entrando agua?" : `¿Planea ${hub.name.toLowerCase()}?`}
        ctaBody={`Empresa familiar en Houston desde 1993. Llame al ${site.phone.display} o envíe un texto.`}
        serviceName={`${hub.name} en Houston`}
        description={hub.description}
        emergency={emergency}
        insert={slug === "water-damage-restoration" ? <WaterCauseSections locale="es" /> : null}
      />
    </>
  );
}
