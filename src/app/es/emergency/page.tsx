import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

import { Faq } from "@/components/faq";
import { InsuranceClaimHelp } from "@/components/insurance-claim-help";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { PropertyScopeNote } from "@/components/property-scope-note";
import { claimHelpFaqs } from "@/lib/claim-help";
import { languageAlternates, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Emergencia en Houston",
  description:
    "¿Goteras o techo abierto en Houston? Llame al (713) 909-0034. Casas, comercios y apartamentos. Lona, tablas en ventanas y secado.",
  path: "/es/emergency",
  locale: "es",
  languages: languageAlternates("/emergency", "/es/emergency"),
  image: "/images/services/roofing-emergency-tarp-repair.jpg",
});

const steps = [
  {
    title: "Detenga el agua si es seguro",
    body: "Si es una fuga de plomería, cierre la llave principal. No camine en agua que esté junto a contactos. No se suba a un techo mojado.",
  },
  {
    title: "Fotografie antes de limpiar",
    body: "Tome fotos amplias de cada cuarto y detalles del daño. Su aseguradora las va a pedir. A nosotros también nos sirven para ver a qué llegamos.",
  },
  {
    title: "Envíe la solicitud",
    body: "Cuéntenos qué pasó y dónde. El formulario es el de la página en inglés y llega al mismo lugar. Si puede, llame primero.",
  },
];

export default function SpanishEmergencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Agua y tormenta"
        title={["¿Está entrando agua", "en Houston?"]}
        lede="Techo abierto, un tubo reventado o agua en el piso. Llame si puede. Si no, envíe la solicitud. Le llamamos en cuanto podamos. Atendemos casas, edificios comerciales y apartamentos."
        crumbs={[{ name: "Emergencia", path: "/es/emergency" }]}
        homeCrumb={{ name: "Inicio", path: "/es" }}
      >
        <a href={site.phone.href} className="mt-8 inline-flex items-center gap-3 bg-accent px-5 py-4 text-white">
          <Phone className="size-5" aria-hidden />
          <span className="font-display text-3xl">{site.phone.display}</span>
        </a>
        <a href={site.phone.sms} className="mt-4 block text-sm underline underline-offset-4">
          Envíenos un texto
        </a>
      </PageHero>
      <PropertyScopeNote locale="es" />
      <InsuranceClaimHelp locale="es" />
      <section className="py-16">
        <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
          <ol className="lg:col-span-5">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-border py-6">
                <h2 className="font-display text-3xl">{step.title}</h2>
                <p className="mt-2 text-muted-foreground">{step.body}</p>
                <span className="sr-only">{index + 1}</span>
              </li>
            ))}
            <li className="border-t border-border py-6 text-sm">
              <Link href="/houston-storm-damage" className="underline underline-offset-4">
                Ayuda por tormenta en Houston (inglés)
              </Link>
            </li>
          </ol>
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl">Cuéntenos qué pasó.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              El formulario está en inglés, el mismo de la página en inglés, y la solicitud llega al mismo lugar.
            </p>
            <div className="mt-8">
              <LeadForm idPrefix="es-emergency" defaultService="storm-hail" submitLabel="Pedir que me llamen" />
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-border py-16">
        <div className="gutter mx-auto max-w-[120rem]">
          <Faq items={claimHelpFaqs("es")} inLanguage="es" />
        </div>
      </section>
    </>
  );
}
