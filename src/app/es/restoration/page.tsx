import type { Metadata } from "next";
import Link from "next/link";

import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { languageAlternates, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Restauración en Houston, TX",
  description:
    "Restauración en Houston por agua, tormenta, granizo y fuego, y ayuda con su reclamo. Empresa familiar desde 1993. Llame al (713) 909-0034.",
  path: "/es/restoration",
  locale: "es",
  languages: languageAlternates("/restoration", "/es/restoration"),
  image: "/images/services/water-damage-restoration.jpg",
});

const links = [
  { href: "/es/water-damage-restoration", label: "Daño de agua" },
  { href: "/es/roofing-emergency-tarp-repair", label: "Lona de emergencia" },
  { href: "/es/roofing", label: "Techos" },
  { href: "/es/insurance-claims", label: "Reclamos de seguro" },
  { href: "/es/houston-storm-damage", label: "Ayuda por tormenta" },
  { href: "/commercial-storm-restoration", label: "Comercios y apartamentos" },
  { href: "/emergency-board-up", label: "Tablas en ventanas y puertas" },
];

export default function SpanishRestorationPage() {
  return (
    <>
      <PageHero
        eyebrow="Restauración"
        title={["Restauración en Houston, TX"]}
        lede="Agua, viento, granizo y fuego, y después la reparación. Empresa familiar en Houston desde 1993. Atendemos casas, comercios y apartamentos."
        crumbs={[{ name: "Restauración", path: "/es/restoration" }]}
        homeCrumb={{ name: "Inicio", path: "/es" }}
      >
        <a href={site.phone.href} className="mt-8 inline-flex border border-accent-ink px-4 py-3 text-sm">
          Llamar {site.phone.display}
        </a>
      </PageHero>
      <section className="gutter mx-auto max-w-[120rem] py-16">
        <p className="measure text-lg leading-relaxed text-muted-foreground">
          Restaurar es dejar el edificio seco y listo para usarse otra vez. Un tubo de agua, un techo que dejó pasar la tormenta, granizo, humo, o el agua que usaron para apagar un fuego. Remodelar es otra decisión, y puede esperar a que la casa esté seca. La oficina está en {site.address.streetAddress}, Houston, TX 77082. La visita es en la propiedad.
        </p>
        <ul className="mt-10 flex flex-wrap gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="underline underline-offset-4">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <Faq
            inLanguage="es"
            items={[
              {
                q: "¿Qué hace una empresa de restauración en Houston?",
                a: "Daño de agua, tormenta, viento, granizo, y la reparación que sigue. También ponemos tablas en ventanas y una lona cuando el edificio está abierto. La aseguradora decide la cobertura.",
              },
              {
                q: "¿Atienden apartamentos y comercios?",
                a: "Sí. Administradores, la asociación de propietarios y los dueños pueden llamar al (713) 909-0034 a cualquier hora si la emergencia de agua o tormenta sigue.",
              },
              {
                q: "¿Hablan por la aseguradora?",
                a: "Fotografiamos y reparamos lo que usted contrata. La aseguradora decide el pago. Nosotros no somos ajustadores públicos y no lo prometemos.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
