import type { Metadata } from "next";

import { LongformPage } from "@/components/longform-page";
import { getWaterCause, waterCauses } from "@/lib/water-causes";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const related = [
  { href: "/water-damage-restoration", label: "Water damage restoration" },
  { href: "/insurance-claims", label: "Insurance claims help" },
  { href: "/how-to-build-an-insurance-photo-log", label: "How to build an insurance photo log" },
  { href: "/slab-moisture-after-a-supply-line-break-houston", label: "Slab moisture after a supply-line break" },
  { href: "/commercial-storm-restoration", label: "Commercial and apartment water damage" },
  { href: "/houston-storm-damage", label: "Houston storm damage help" },
];

export function waterCauseMetadata(slug: string): Metadata {
  const page = getWaterCause(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.description,
    path: page.path,
    image: page.image.src,
  });
}

export function WaterCauseView({ slug }: { slug: string }) {
  const page = getWaterCause(slug);
  if (!page) return null;
  return (
    <LongformPage
      eyebrow={page.eyebrow}
      title={page.title}
      lede={page.lede}
      crumbs={[{ name: page.eyebrow, path: page.path }]}
      path={page.path}
      image={page.image}
      claimHelp
      propertyScope
      sections={page.sections}
      faqs={page.faqs}
      related={related.filter((link) => link.href !== page.path)}
      ctaTitle="Water still moving?"
      ctaBody={`Call ${site.phone.display} any time for an active leak in a house, apartment, or commercial building. Text the same number if you cannot talk. We dry and repair. We do not decide the claim.`}
      serviceName={page.metaTitle}
      description={page.description}
      emergency
    />
  );
}

export const waterCauseSlugs = waterCauses.map((page) => page.slug);
