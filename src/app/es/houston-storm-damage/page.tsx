import type { Metadata } from "next";

import { LongformPage } from "@/components/longform-page";
import { img } from "@/lib/images";
import { languageAlternates, pageMetadata } from "@/lib/seo";
import { latestStormUpdate } from "@/lib/storm-update";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Tormenta en Houston",
  description:
    "Ayuda por tormenta en Houston después de huracanes, granizo, viento o heladas. Lona, board-up y secado. Llame al (713) 909-0034.",
  path: "/es/houston-storm-damage",
  locale: "es",
  languages: languageAlternates("/houston-storm-damage", "/es/houston-storm-damage"),
  image: "/images/services/roofing-emergency-tarp-repair.jpg",
});

export default function SpanishStormPage() {
  const update = latestStormUpdate;
  const dated = update.date.trim().length > 0;
  return (
    <LongformPage
      locale="es"
      eyebrow="Después de la tormenta"
      title={["Ayuda por tormenta", "en Houston."]}
      lede="Huracanes, granizo, viento y una helada fuerte dañan los edificios de Houston de formas distintas. Esta página se queda entre tormentas. Si acaba de pegar una, use los pasos y llame."
      crumbs={[{ name: "Tormenta", path: "/es/houston-storm-damage" }]}
      path="/es/houston-storm-damage"
      image={img(
        "/images/services/roofing-emergency-tarp-repair.jpg",
        "Emergency roof tarp secured on a Houston home after storm damage",
      )}
      claimHelp
      propertyScope
      sections={[
        {
          eyebrow: "Actualización",
          heading: dated ? `Actualización ${update.date}` : "Sin tormenta con nombre en esta página.",
          paragraphs: [
            dated
              ? update.text
              : "No hay una actualización de una tormenta con nombre. Si un huracán, una granizada o una helada acaba de pegar en Houston, los pasos de abajo sirven: cuide a las personas, detenga más agua si es seguro, fotografíe y llame al (713) 909-0034.",
          ],
        },
        {
          eyebrow: "Primero",
          heading: "El orden que importa.",
          paragraphs: [
            "Primero las personas. No entre a un cuarto con el plafón caído, vidrio roto o agua junto a contactos. No se suba al techo. Si huele a gas, salga.",
            "Después detenga más agua si puede hacerlo desde adentro. Fotografíe antes de tirar cosas o de cubrir la abertura. Llame al (713) 909-0034 y diga si es casa, apartamento o comercio, y si el techo está abierto.",
          ],
        },
        {
          eyebrow: "Temporada",
          heading: "Huracanes, granizo, viento y heladas.",
          paragraphs: [
            "La temporada de huracanes va del 1 de junio al 30 de noviembre. El granizo y el viento de primavera marcan techos de Katy a The Woodlands. Una helada fuerte, que aquí es rara, revienta líneas del ático y llaves de manguera. No es lo mismo que un techo abierto, aunque pueden llegar la misma semana.",
            "La lona es para el techo. El board-up es para ventanas y puertas. El secado es para lo que ya se mojó. Son trabajos distintos. Atendemos casas, apartamentos y edificios comerciales. No somos ajustadores públicos y no prometemos que el seguro pague.",
          ],
        },
      ]}
      faqs={[
        { q: "¿Qué hago primero después de una tormenta en Houston?", a: "No se suba al techo. Saque a la gente de plafones caídos y de agua con electricidad. Fotografíe y llame al (713) 909-0034 si el edificio está abierto o mojado." },
        { q: "¿Ponen lona y board-up?", a: "Sí, cuando es seguro. La lona cubre el techo. El board-up cierra vidrio y puertas. Casas, apartamentos y comercios." },
        { q: "¿Suben durante la tormenta?", a: "No con rayos ni con viento inseguro. Llamar no promete que ya vamos en camino. Decimos el siguiente paso seguro." },
        { q: "¿La inundación es lo mismo que el viento?", a: "No. El agua que sube de la calle suele ser otra póliza. Revísela. No le cambiamos el nombre." },
        { q: "¿Atienden a administradores?", a: "Sí, a cualquier hora si la emergencia sigue. Tenga la dirección, el acceso y qué unidades están mojadas." },
        { q: "¿Ayudan con el reclamo?", a: "Con fotos, mitigación, un estimado y, si usted quiere, en la visita del ajustador. No presentamos el reclamo ni prometemos el pago." },
        { q: "¿Dónde están?", a: "511 Crestwater Ct, Houston, TX 77082. Familia desde 1993. También puede enviar un texto al (713) 909-0034." },
        { q: "¿La oficina abre el domingo?", a: "No. La oficina abre de lunes a sábado, de 8:00 AM a 6:00 PM. Las emergencias de agua y tormenta se atienden por teléfono a cualquier hora." },
        { q: "¿Qué cuesta una lona?", a: "Como rango, no como cotización, muchas aberturas en un techo donde se puede caminar andan de unos cientos de dólares a unos $2,000. No es el precio de un techo nuevo." },
        { q: "¿Qué vecindarios cubren?", a: "El área de Houston, incluyendo Katy, Sugar Land, Memorial, The Woodlands, Clear Lake, Westchase y Alief. La visita es en la propiedad." },
      ]}
      related={[
        { href: "/es/emergency", label: "Emergencia" },
        { href: "/es/roofing-emergency-tarp-repair", label: "Lona de techo" },
        { href: "/es/water-damage-restoration", label: "Daño de agua" },
        { href: "/es/roofing", label: "Techos" },
        { href: "/es/insurance-claims", label: "Reclamos" },
        { href: "/commercial-storm-restoration", label: "Comercios y apartamentos" },
      ]}
      ctaTitle="¿El techo está abierto?"
      ctaBody={`Llame al ${site.phone.display} o envíe un texto. Cubrimos, secamos y reparamos. No decidimos el reclamo.`}
      serviceName="Ayuda por tormenta en Houston"
      description="Ayuda por tormenta en Houston después de huracanes, granizo, viento o heladas."
      emergency
    />
  );
}
