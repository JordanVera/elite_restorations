import type { Metadata } from "next";

import { InsurerIndex } from "@/components/insurer-view";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Houston Insurer Claim Guides",
  description:
    "Houston guides for homeowners insured by major carriers. Elite Restorations is not affiliated with them. Call (713) 909-0034.",
  path: "/insurance-claims/companies",
});

export default function InsurerHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Insurance"
        title={["Houston guides for", "major insurers."]}
        lede="These pages are for homeowners, property managers, and building owners who already have a policy with one of these companies. Elite Restorations is not a partner, a preferred vendor, or an agent of any of them."
        crumbs={[
          { name: "Insurance claims", path: "/insurance-claims" },
          { name: "Insurers", path: "/insurance-claims/companies" },
        ]}
      />
      <section className="gutter mx-auto max-w-[120rem] py-16">
        <p className="measure text-lg leading-relaxed text-muted-foreground">
          We help document water, storm, and roof damage and we repair what you hire us to repair. The insurer decides coverage and payment. We do not use their logos. Call {site.phone.display} or text us if the building is open or wet.
        </p>
        <InsurerIndex />
      </section>
    </>
  );
}
