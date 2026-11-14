import type { Metadata } from "next";
import Link from "next/link";

import { LongformPage } from "@/components/longform-page";
import { getInsurer, insurers } from "@/lib/insurers";
import { pageMetadata } from "@/lib/seo";
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

export function insurerMetadata(slug: string): Metadata {
  const page = getInsurer(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.description,
    path: `/insurance-claims/companies/${page.slug}`,
    image: insurerImages[slug as keyof typeof insurerImages]?.src,
  });
}

export function InsurerView({ slug }: { slug: string }) {
  const page = getInsurer(slug);
  if (!page) return null;
  const path = `/insurance-claims/companies/${page.slug}`;
  return (
    <LongformPage
      eyebrow="Not affiliated"
      title={["Houston homeowners", `insured by ${page.name}.`]}
      lede={page.lede}
      crumbs={[
        { name: "Insurance claims", path: "/insurance-claims" },
        { name: "Insurers", path: "/insurance-claims/companies" },
        { name: page.name, path },
      ]}
      path={path}
      image={insurerImages[page.slug as keyof typeof insurerImages]}
      claimHelp
      propertyScope
      sections={page.sections}
      faqs={page.faqs}
      related={[
        { href: "/insurance-claims", label: "Insurance claims help" },
        { href: "/how-insurance-claims-work-texas-restoration", label: "How Texas restoration claims usually move" },
        { href: "/how-to-build-an-insurance-photo-log", label: "How to build an insurance photo log" },
        { href: "/water-damage-restoration", label: "Water damage restoration" },
        { href: "/roofing", label: "Roofing" },
        { href: "/houston-storm-damage", label: "Houston storm damage help" },
        { href: "/insurance-claims/companies", label: "All insurer guides" },
      ]}
      ctaTitle={`Damage in a ${page.name} household?`}
      ctaBody={`Call ${site.phone.display} or text us. We help document and repair. ${page.name} decides the claim. We are not ${page.name}.`}
      serviceName={`Houston storm and water documentation for ${page.name} policyholders`}
      description={page.description}
      emergency
    />
  );
}

export function InsurerIndex() {
  return (
    <ul className="mt-10 border-t border-border">
      {insurers.map((insurer) => (
        <li key={insurer.slug} className="border-b border-border">
          <Link
            href={`/insurance-claims/companies/${insurer.slug}`}
            className="flex items-baseline justify-between gap-6 py-6 font-display text-3xl hover:text-accent-ink"
          >
            {insurer.name}
            <span className="text-sm text-muted-foreground">Homeowners we work with</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
