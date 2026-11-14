import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { languageAlternates, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contacto en Houston",
  description:
    "Llame al (713) 909-0034 para restauración o remodelación en Houston. La oficina está en 511 Crestwater Ct, Houston, TX 77082, o pida un estimado.",
  path: "/es/contact",
  locale: "es",
  languages: languageAlternates("/contact", "/es/contact"),
});

export default function SpanishContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title={["Hablemos de su casa en Houston."]}
        lede="Llame, escriba o envíe la solicitud. Si está entrando agua o el techo está abierto, llame primero. El formulario es el mismo de la página en inglés y llega al mismo lugar."
        crumbs={[{ name: "Contacto", path: "/es/contact" }]}
        homeCrumb={{ name: "Inicio", path: "/es" }}
      />
      <section className="py-16 md:py-24">
        <div className="gutter mx-auto grid max-w-[120rem] gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent-ink">Teléfono</p>
            <a href={site.phone.href} className="font-display mt-4 block text-5xl hover:text-accent-ink">
              {site.phone.display}
            </a>
            <a href={site.phone.sms} className="mt-4 inline-flex text-sm underline underline-offset-4">
              Envíenos un texto
            </a>
            <dl className="mt-10 space-y-6 text-sm">
              <div className="flex gap-3">
                <Mail className="size-4 text-accent-ink" aria-hidden />
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div className="flex gap-3">
                <Clock className="size-4 text-accent-ink" aria-hidden />
                <dd>
                  De lunes a sábado, de 8:00 AM a 6:00 PM. El domingo la oficina está cerrada. Si es una emergencia de agua o de tormenta, llame a cualquier hora.
                </dd>
              </div>
              <div className="flex gap-3">
                <MapPin className="size-4 text-accent-ink" aria-hidden />
                <dd>
                  {site.name}
                  <br />
                  {site.address.streetAddress}
                  <br />
                  Houston, TX 77082
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-accent-ink">Estimado</p>
            <h2 className="font-display mt-4 text-4xl">Cuéntenos qué necesita.</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              El formulario está en inglés, el mismo de la página de contacto en inglés, y su solicitud llega al mismo lugar.
            </p>
            <div className="relative mt-8">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
