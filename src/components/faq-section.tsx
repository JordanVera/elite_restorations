import { Faq } from "@/components/faq";

export function FaqSection({
  id = "faq-heading",
  eyebrow = "Questions",
  title,
  items,
  inLanguage,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  items: readonly { q: string; a: string }[];
  inLanguage?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={id} className="border-t border-border py-20 md:py-28">
      <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-accent-ink">{eyebrow}</p>
          <h2 id={id} className="font-display t-lg mt-4">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-8">
          <Faq items={[...items]} inLanguage={inLanguage} />
        </div>
      </div>
    </section>
  );
}
