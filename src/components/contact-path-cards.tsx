import Link from "next/link";

const copy = {
  en: {
    visitTitle: "Schedule a visit",
    visitBody:
      "Prefer we come to you? Leave your name and number and we'll set up a time to see the project in person.",
    visitAction: "Go to the form",
    detailsTitle: "Send us your project details",
    detailsBody:
      "Want to get a head start? Share rooms, measurements, and photos so we can prepare before we meet.",
    detailsAction: "Open the project form",
  },
  es: {
    visitTitle: "Programar una visita",
    visitBody:
      "¿Prefiere que vayamos a usted? Deje su nombre y teléfono y coordinamos un horario para ver el proyecto en persona.",
    visitAction: "Ir al formulario",
    detailsTitle: "Envíenos los detalles del proyecto",
    detailsBody:
      "¿Quiere adelantarse? Comparta las habitaciones, las medidas y las fotos para que preparemos antes de vernos.",
    detailsAction: "Abrir el formulario del proyecto",
  },
} as const;

export function ContactPathCards({ locale = "en" }: { locale?: "en" | "es" }) {
  const text = copy[locale];
  return (
    <section aria-label={locale === "es" ? "Cómo seguir" : "How to continue"} className="pb-4 pt-10 md:pb-6 md:pt-14">
      <div className="gutter mx-auto grid max-w-[120rem] gap-4 md:grid-cols-2 md:gap-6">
        <a
          href="#request"
          className="group flex min-h-44 flex-col border border-border bg-surface/60 p-6 transition-colors hover:border-foreground sm:p-8"
        >
          <p className="eyebrow text-accent-ink">01</p>
          <h2 className="font-display mt-4 text-[clamp(2rem,3vw,3rem)] leading-none">{text.visitTitle}</h2>
          <p className="mt-4 max-w-[40ch] leading-relaxed text-muted-foreground">{text.visitBody}</p>
          <span className="mt-8 text-[0.72rem] font-medium uppercase tracking-[0.18em] group-hover:text-accent-ink">
            {text.visitAction}
          </span>
        </a>
        <Link
          href="/estimate-request"
          className="group flex min-h-44 flex-col border border-border bg-background p-6 transition-colors hover:border-foreground sm:p-8"
        >
          <p className="eyebrow text-accent-ink">02</p>
          <h2 className="font-display mt-4 text-[clamp(2rem,3vw,3rem)] leading-none">{text.detailsTitle}</h2>
          <p className="mt-4 max-w-[40ch] leading-relaxed text-muted-foreground">{text.detailsBody}</p>
          <span className="mt-8 text-[0.72rem] font-medium uppercase tracking-[0.18em] group-hover:text-accent-ink">
            {text.detailsAction}
          </span>
        </Link>
      </div>
    </section>
  );
}
