import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { waterCauses } from "@/lib/water-causes";

const esHub: Record<string, { heading: string; body: string; first: string; dry: string; claim: string }> = {
  "burst-frozen-pipe-water-damage-houston": {
    heading: "Tuberías congeladas o reventadas",
    body: "Una helada fuerte rompe líneas del ático, de la pared exterior y llaves de manguera. En una losa de Houston el agua ya está en el plafón o en el piso cuando se ve.",
    first: "Cierre la llave principal si puede hacerlo sin riesgo. Abra un grifo para que la línea drene. No descongele con fuego.",
    dry: "Localizamos por dónde corrió el agua, extraemos lo que está encharcado y secamos con ventiladores y deshumidificadores hasta que las lecturas permitan reparar.",
    claim: "Muchas pólizas distinguen un reventón repentino de una fuga que siguió por semanas. Revise su póliza. Documentamos el daño. No decidimos la cobertura ni prometemos un pago.",
  },
  "water-heater-leak-damage-houston": {
    heading: "Fugas del calentador de agua",
    body: "El tanque falla en las conexiones, en la válvula de alivio o en el propio tanque. En una losa el agua se queda. En un clóset de arriba se vuelve el plafón de abajo.",
    first: "Cierre la válvula de agua fría del calentador si gira. Si no, cierre la principal. Corte el breaker si es eléctrico. Si huele a gas, salga y llame.",
    dry: "Seguimos el agua fuera del clóset, la extraemos y secamos los huecos. Un charco en la charola no es lo mismo que un tanque que se abrió.",
    claim: "Un tanque que se vacía en un día y un goteo de meses son hechos distintos. Revise su póliza. No escogemos la frase ni prometemos el pago.",
  },
  "dishwasher-leak-water-damage-houston": {
    heading: "Fugas y derrames del lavavajillas",
    body: "Falla la línea de suministro, el empaque de la puerta o la manguera de drenaje. El piso del gabinete y el cuarto de al lado suelen estar más mojados de lo que se ve.",
    first: "Detenga el ciclo. Cierre la válvula debajo del fregadero si puede hacerlo sin meterse en agua junto a un contacto. No lo vuelva a correr para probar.",
    dry: "Revisamos el zoclo y las bases de los gabinetes, secamos la losa y reparamos lo que se hinchó. Un goteo lento y una línea que se zafó se anotan distinto.",
    claim: "Una línea que se zafa de golpe no es un empaque que lleva meses. Revise su póliza. Fotografiamos la manguera y el piso. No prometemos que paguen los gabinetes.",
  },
  "toilet-overflow-water-damage-houston": {
    heading: "Desbordamiento del inodoro",
    body: "Un tapón, una línea de suministro que se rompe y un sello de cera que lleva tiempo filtrando no son la misma reparación ni la misma historia de seguro.",
    first: "Cierre la válvula de la pared, en sentido de las manecillas. No vuelva a jalar la palanca. Si la válvula no corta, cierre la principal.",
    dry: "Vemos hasta dónde llegó el agua bajo el piso y en la pared, la extraemos y secamos la losa. Un desborde con aguas negras se limpia con más cuidado que una línea de agua limpia.",
    claim: "Un desborde repentino no es una filtración de meses en la base. Revise su póliza. Documentamos lo que vemos. No prometemos cobertura.",
  },
};

export function WaterCauseSections({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  return (
    <section aria-labelledby="water-causes-heading" className="border-b border-border py-16 md:py-24">
      <div className="gutter mx-auto max-w-[120rem]">
        <p className="eyebrow text-accent-ink">{es ? "Causas de agua" : "Common water losses"}</p>
        <h2 id="water-causes-heading" className="font-display t-lg mt-4 max-w-[18ch]">
          {es ? "Cuatro fugas que vemos en Houston." : "Four leaks we see in Houston."}
        </h2>
        <div className="mt-12 grid gap-12">
          {waterCauses.map((cause) => {
            const copy = es ? esHub[cause.slug] : null;
            return (
              <article key={cause.slug} className="border-t border-border pt-8">
                <h3 className="font-display text-4xl">{copy?.heading ?? cause.hubHeading}</h3>
                <p className="measure mt-4 text-lg leading-relaxed text-muted-foreground">
                  {copy?.body ?? cause.hubBody}
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div>
                    <h4 className="font-display text-2xl">{es ? "Qué hacer primero" : "What to do first"}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy?.first ?? cause.firstSteps}</p>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl">{es ? "Cómo secamos y reparamos" : "How we dry and repair"}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy?.dry ?? cause.drying}</p>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl">{es ? "El reclamo" : "The claim"}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy?.claim ?? cause.claim}</p>
                  </div>
                </div>
                <Link
                  href={cause.path}
                  className="mt-6 inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.45em]"
                >
                  {es ? `${cause.hubHeading} (en inglés)` : cause.hubHeading}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
