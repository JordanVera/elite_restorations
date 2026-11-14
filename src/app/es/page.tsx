import type { Metadata } from "next";
import Link from "next/link";

import { ServiceIndex, type IndexService } from "@/components/home/service-index";
import { KitchenSlideshow } from "@/components/home/kitchen-slideshow";
import { languageAlternates, pageMetadata } from "@/lib/seo";
import { esHubs } from "@/lib/es/hubs";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

import "@/components/home/kitchen-hero.css";

export const metadata: Metadata = pageMetadata({
  title: "Restauración en Houston",
  description:
    "Restauración por agua y tormenta, remodelación y ayuda con su reclamo en Houston. Empresa familiar desde 1993. Llame al (713) 909-0034.",
  path: "/es",
  locale: "es",
  languages: languageAlternates("/", "/es"),
  image: "/images/projects/kitchens/coffered-ceiling-island.jpg",
});

export default function SpanishHomePage() {
  const names = new Map(esHubs.map((hub) => [hub.slug, hub.name]));
  const indexServices: IndexService[] = services.map((service) => ({
    slug: service.slug,
    name: names.get(service.slug as (typeof esHubs)[number]["slug"]) ?? service.name,
    group: names.has(service.slug as (typeof esHubs)[number]["slug"]) ? "Servicio" : service.group,
    summary: getEsHubSummary(service.slug) ?? service.summary,
    image: service.image,
    emergency: service.emergency,
  }));

  return (
    <>
      <section aria-labelledby="hero-heading" className="kitchen-hero">
        <KitchenSlideshow />
        <div className="kitchen-shade" />
        <div className="kitchen-copy gutter">
          <p className="kitchen-eyebrow">
            <span />
            Remodelación y restauración · Houston
          </p>
          <h1 id="hero-heading">
            Remodelación en Houston. <br />
            <em>Para vivir en ella.</em>
          </h1>
          <p className="kitchen-description">
            Remodelamos cocinas y baños en el área de Houston. Si está entrando
            agua, o acaba de pegar una tormenta, empiece por{" "}
            <Link href="/es/restoration">restauración en Houston</Link>. Después
            de un huracán, granizo o helada, vea{" "}
            <Link href="/es/houston-storm-damage">ayuda por tormenta</Link>.
          </p>
          <div className="kitchen-actions">
            <Link className="kitchen-primary" href="/es/contact">
              Pedir un estimado
            </Link>
            <a className="kitchen-secondary" href={site.phone.href}>
              Llamar {site.phone.display}
            </a>
          </div>
        </div>
        <div className="kitchen-footer gutter">
          <p>
            Empresa familiar <span> / </span> Desde {site.founded}
            <br />
            <small>{site.locality}</small>
          </p>
        </div>
      </section>
      <ServiceIndex
        services={indexServices}
        heading={["Veinticinco trabajos.", "Un solo equipo."]}
        intro="El mismo equipo hace la remodelación con cita y la emergencia. Elija el trabajo que necesita."
        indexLabel="Servicios"
        exploreLabel="Ver"
        lessLabel="Ver menos"
        moreLabel="Ver más"
        locale="es"
        coreLinks={[
          { href: "/es/kitchen-remodeling", label: "Cocinas" },
          { href: "/es/bathroom-remodeling", label: "Baños" },
          { href: "/es/roofing", label: "Techos" },
          { href: "/es/water-damage-restoration", label: "Daño de agua" },
          { href: "/es/insurance-claims", label: "Reclamos de seguro" },
          { href: "/es/houston-storm-damage", label: "Tormenta en Houston" },
          { href: "/commercial-storm-restoration", label: "Comercios y apartamentos" },
        ]}
      />
    </>
  );
}

function getEsHubSummary(slug: string) {
  return esHubs.find((hub) => hub.slug === slug)?.lede;
}
