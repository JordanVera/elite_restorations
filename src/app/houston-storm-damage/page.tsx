import type { Metadata } from "next";

import { LongformPage } from "@/components/longform-page";
import { latestStormUpdate } from "@/lib/storm-update";
import { tarps } from "@/lib/topic-photos";
import { stormPage } from "@/lib/storm-page";
import { languageAlternates, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: stormPage.metaTitle,
  description: stormPage.description,
  path: "/houston-storm-damage",
  image: "/images/projects/roofing/tarp-aerial-complex-roof.jpg",
  languages: languageAlternates("/houston-storm-damage", "/es/houston-storm-damage"),
});

export default function HoustonStormDamagePage() {
  const update = latestStormUpdate;
  const dated = update.date.trim().length > 0;
  return (
    <LongformPage
      eyebrow={stormPage.eyebrow}
      title={stormPage.title}
      lede={stormPage.lede}
      crumbs={[{ name: "Storm damage", path: "/houston-storm-damage" }]}
      path="/houston-storm-damage"
      image={tarps.complex}
      claimHelp
      propertyScope
      sections={[
        {
          eyebrow: "Latest storm update",
          heading: dated ? `Update for ${update.date}` : "No named storm to report right now.",
          paragraphs: [update.text],
        },
        ...stormPage.sections,
      ]}
      faqs={stormPage.faqs}
      related={[
        { href: "/emergency", label: "Emergency help" },
        { href: "/roofing-emergency-tarp-repair", label: "Emergency roof tarping" },
        { href: "/emergency-board-up", label: "Boarding up broken windows and doors" },
        { href: "/water-damage-restoration", label: "Water damage restoration" },
        { href: "/roofing", label: "Roofing" },
        { href: "/commercial-storm-restoration", label: "Commercial and apartment buildings" },
        { href: "/insurance-claims", label: "Insurance claims help" },
        { href: "/how-to-build-an-insurance-photo-log", label: "Insurance photo log" },
        { href: "/burst-frozen-pipe-water-damage-houston", label: "Frozen or burst pipes" },
      ]}
      ctaTitle="Is the roof open, or is there water inside?"
      ctaBody={`Call ${site.phone.display} any time. Text the same number if you cannot talk. We can tarp the roof, board up broken windows and doors, and dry houses, apartments, and commercial buildings. Your insurer decides the claim.`}
      serviceName="Houston storm damage help"
      description={stormPage.description}
      emergency
    />
  );
}
