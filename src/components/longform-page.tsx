import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { InsuranceClaimHelp } from "@/components/insurance-claim-help";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { PropertyScopeNote } from "@/components/property-scope-note";
import { ProseSections } from "@/components/prose-sections";
import { ImageReveal } from "@/components/motion";
import type { GuideSection } from "@/lib/guides/types";
import type { Img } from "@/lib/images";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

type LinkItem = { href: string; label: string };

export function LongformPage({
  eyebrow,
  title,
  lede,
  crumbs,
  path,
  image,
  claimHelp = false,
  propertyScope = false,
  propertyLink = true,
  sections,
  faqs,
  related,
  ctaTitle,
  ctaBody,
  serviceName,
  description,
  locale = "en",
  emergency = false,
  insert,
}: {
  eyebrow: string;
  title: readonly string[];
  lede: string;
  crumbs: { name: string; path: string }[];
  path: string;
  image?: Img;
  claimHelp?: boolean;
  propertyScope?: boolean;
  propertyLink?: boolean;
  sections: readonly GuideSection[];
  faqs: readonly { q: string; a: string }[];
  related: readonly LinkItem[];
  ctaTitle: string;
  ctaBody: string;
  serviceName: string;
  description: string;
  locale?: "en" | "es";
  emergency?: boolean;
  insert?: ReactNode;
}) {
  const es = locale === "es";
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        crumbs={crumbs}
        homeCrumb={es ? { name: "Inicio", path: "/es" } : undefined}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={site.phone.href}
            className="inline-flex items-center gap-3 border border-accent-ink px-4 py-3 text-sm hover:bg-accent hover:text-white"
          >
            <Phone className="size-4" aria-hidden />
            {es ? "Llamar" : "Call"} {site.phone.display}
          </a>
          <a
            href={site.phone.sms}
            className="text-sm underline decoration-foreground/30 underline-offset-[0.45em] hover:decoration-accent-ink"
          >
            {es ? "Envíanos un texto" : "Text us"}
          </a>
        </div>
      </PageHero>
      {image ? (
        <div className="gutter mx-auto max-w-[120rem] pt-6">
          <ImageReveal immediate className="relative aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[21/9]">
            <Photo image={image} sizes="(min-width: 1920px) 1800px, 96vw" priority />
          </ImageReveal>
        </div>
      ) : null}
      {propertyScope ? <PropertyScopeNote locale={locale} showLink={propertyLink} /> : null}
      {claimHelp ? <InsuranceClaimHelp locale={locale} /> : null}
      {insert}
      <ProseSections sections={sections} />
      {related.length > 0 ? (
        <section className="border-b border-border py-12">
          <div className="gutter mx-auto max-w-[120rem]">
            <h2 className="eyebrow text-muted-foreground">
              {es ? "También en el sitio" : "Related on this site"}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.45em] hover:decoration-accent-ink"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <section className="border-b border-border py-16 md:py-24">
        <div className="gutter mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-12">
          <h2 className="font-display t-lg lg:col-span-4">
            {es ? "Preguntas" : "Questions"}
          </h2>
          <div className="lg:col-span-8">
            <Faq items={[...faqs]} inLanguage={es ? "es" : undefined} />
          </div>
        </div>
      </section>
      <CtaBand
        title={ctaTitle}
        body={ctaBody}
        emergency={emergency}
        href={es ? (emergency ? "/es/emergency" : "/es/contact") : undefined}
        buttonLabel={
          es ? (emergency ? "Pedir ayuda de emergencia" : "Pedir un estimado") : undefined
        }
        textLabel={es ? "Envíanos un texto" : "Text us"}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: serviceName,
          serviceType: serviceName,
          description,
          url: absoluteUrl(path),
          inLanguage: es ? "es" : "en",
          ...(image ? { image: absoluteUrl(image.src) } : {}),
          provider: { "@id": `${site.url}/#business` },
          areaServed: { "@type": "AdministrativeArea", name: "Greater Houston, Texas" },
          telephone: site.phone.e164,
        }}
      />
    </>
  );
}
