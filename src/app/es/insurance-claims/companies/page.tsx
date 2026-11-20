import type { Metadata } from "next";

import { InsurerIndex } from "@/components/insurer-view";
import { PageHero } from "@/components/page-hero";
import { languageAlternates, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Guías de aseguradoras en Houston",
  description:
    "Guías en Houston para dueños asegurados por compañías grandes. Elite Restorations no está afiliado a ellas. Llame al (713) 909-0034.",
  path: "/es/insurance-claims/companies",
  locale: "es",
  languages: languageAlternates("/insurance-claims/companies", "/es/insurance-claims/companies"),
});

export default function SpanishInsurerHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Seguro"
        title={["Guías de Houston", "para aseguradoras grandes."]}
        lede="Estas páginas son para dueños de casa, administradores y dueños de edificios que ya tienen una póliza con una de estas compañías. Elite Restorations es un contratista independiente y no está afiliado a ninguna de ellas. Salimos de nuestra oficina en el oeste de Houston (77082)."
        homeCrumb={{ name: "Inicio", path: "/es" }}
        crumbs={[
          { name: "Reclamos", path: "/es/insurance-claims" },
          { name: "Aseguradoras", path: "/es/insurance-claims/companies" },
        ]}
      />
      <section className="gutter mx-auto max-w-[120rem] py-16">
        <p className="measure text-lg leading-relaxed text-muted-foreground">
          Ayudamos a documentar daño de agua, de tormenta y de techo, y reparamos lo que usted nos contrata. La aseguradora decide la cobertura y el pago. No usamos sus logotipos. No somos ajustadores públicos. Llame al {site.phone.display} o envíe un texto si el edificio está abierto o mojado.
        </p>
        <InsurerIndex locale="es" />
      </section>
    </>
  );
}
