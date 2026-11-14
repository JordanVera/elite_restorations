import type { Metadata } from "next";

import { LongformPage } from "@/components/longform-page";
import { esStormFaqs } from "@/lib/faqs/es";
import { languageAlternates, pageMetadata } from "@/lib/seo";
import { tarps } from "@/lib/topic-photos";
import { latestStormUpdate } from "@/lib/storm-update";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Tormenta en Houston",
  description:
    "Ayuda por tormenta en Houston después de huracanes, granizo, viento o heladas. Lona, tablas en ventanas y secado. Llame al (713) 909-0034.",
  path: "/es/houston-storm-damage",
  locale: "es",
  languages: languageAlternates("/houston-storm-damage", "/es/houston-storm-damage"),
  image: "/images/projects/roofing/tarp-partial-roof.jpg",
});

export default function SpanishStormPage() {
  const update = latestStormUpdate;
  const dated = update.date.trim().length > 0;
  return (
    <LongformPage
      locale="es"
      eyebrow="Después de la tormenta"
      title={["Ayuda por tormenta", "en Houston."]}
      lede="Huracanes, granizo, viento y una helada fuerte dañan las casas de Houston de formas distintas. Esta página se queda aquí entre una tormenta y la siguiente. Si acaba de pegar una, siga los pasos y llame."
      crumbs={[{ name: "Tormenta", path: "/es/houston-storm-damage" }]}
      path="/es/houston-storm-damage"
      image={tarps.partial}
      claimHelp
      propertyScope
      sections={[
        {
          eyebrow: "Actualización",
          heading: dated ? `Actualización del ${update.date}` : "Ahora no hay una tormenta con nombre en esta página.",
          paragraphs: [
            dated
              ? update.text
              : "No hay una nota nueva de una tormenta con nombre. Si un huracán, una granizada o una helada acaba de pegar en Houston, los pasos de abajo sirven: cuide a las personas, detenga más agua si es seguro, tome fotos y llame al (713) 909-0034.",
          ],
        },
        {
          eyebrow: "Primero",
          heading: "El orden que sí importa.",
          paragraphs: [
            "Primero, las personas. No entre a un cuarto con el plafón caído, vidrio roto o agua junto a contactos. No se suba al techo. Si huele a gas, salga de la casa.",
            "Después, detenga más agua si puede hacerlo desde adentro. Tome fotos antes de tirar cosas o de cubrir la abertura. Llame al (713) 909-0034 y diga si es casa, apartamento o comercio, y si el techo está abierto.",
          ],
        },
        {
          eyebrow: "Temporada",
          heading: "Huracanes, granizo, viento y heladas.",
          paragraphs: [
            "La temporada de huracanes va del 1 de junio al 30 de noviembre. El granizo y el viento de primavera golpean techos desde Katy hasta The Woodlands. Una helada fuerte, que aquí es rara, revienta los tubos del ático y las llaves de la manguera. Eso no es lo mismo que un techo abierto, aunque las dos cosas pueden llegar la misma semana.",
            "La lona es para el techo. Las tablas son para ventanas y puertas. El secado es para lo que ya se mojó. Son trabajos distintos. Atendemos casas, apartamentos y edificios comerciales. La aseguradora decide si paga. Nosotros no somos ajustadores públicos.",
          ],
        },
      ]}
      faqs={[
        { q: "¿Qué hago primero después de una tormenta en Houston?", a: "No se suba al techo. Salga del cuarto si el plafón está caído o si hay agua junto a la electricidad. Tome fotos y llame al (713) 909-0034 si la casa está abierta o mojada." },
        { q: "¿Ponen lona y tablas en las ventanas?", a: "Sí, cuando es seguro. La lona cubre el techo. Las tablas cierran vidrios y puertas. Atendemos casas, apartamentos y comercios." },
        { q: "¿Suben durante la tormenta?", a: "No subimos si hay rayos o si el viento hace inseguro el techo. Le llamamos en cuanto podamos y le decimos el siguiente paso seguro." },
        { q: "¿La inundación es lo mismo que el viento?", a: "No es lo mismo. El agua que sube de la calle suele ser otra póliza. Revísela. El daño se queda con el nombre que tiene." },
        { q: "¿Atienden a administradores?", a: "Sí, a cualquier hora si la emergencia sigue. Tenga la dirección, cómo se entra y cuáles unidades están mojadas." },
        { q: "¿Ayudan con el reclamo?", a: "Sí, con fotos, con el trabajo para que no entre más agua, con un estimado y, si usted quiere, en la visita del ajustador. Usted presenta el reclamo. La aseguradora decide el pago." },
        { q: "¿Dónde están?", a: "En 511 Crestwater Ct, Houston, TX 77082. Somos una empresa familiar desde 1993. También puede enviar un texto al (713) 909-0034." },
        { q: "¿La oficina abre el domingo?", a: "El domingo la oficina está cerrada. Abre de lunes a sábado, de 8:00 AM a 6:00 PM. Las emergencias de agua y de tormenta se atienden por teléfono a cualquier hora." },
        { q: "¿Qué cuesta una lona?", a: "Como rango para planear, no como cotización, muchas aberturas en un techo donde se puede caminar andan de unos cientos de dólares a unos $2,000. Ese rango no es el precio de un techo nuevo." },
        { q: "¿Qué vecindarios cubren?", a: "El área de Houston, incluyendo Katy, Sugar Land, Memorial, The Woodlands, Clear Lake, Westchase y Alief. La visita es en la propiedad." },
        ...esStormFaqs,
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
      ctaBody={`Llame al ${site.phone.display} o envíe un texto. Cubrimos el techo, secamos y reparamos. La aseguradora decide el reclamo.`}
      serviceName="Ayuda por tormenta en Houston"
      description="Ayuda por tormenta en Houston después de huracanes, granizo, viento o heladas."
      emergency
    />
  );
}
