import { Plus } from "lucide-react";

import { JsonLd } from "@/components/json-ld";

type Item = { q: string; a: string };

export function Faq({ items }: { items: Item[] }) {
  if (items.length === 0) return null;
  return (
    <>
      <div className="border-t border-border">
        {items.map((item) => (
          <details key={item.q} className="group border-b border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-display text-2xl leading-snug marker:hidden [&::-webkit-details-marker]:hidden md:text-3xl">
              {item.q}
              <Plus
                aria-hidden
                className="size-5 shrink-0 text-accent-ink transition-transform duration-500 ease-out-expo group-open:rotate-45"
              />
            </summary>
            <p className="measure pb-8 leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
    </>
  );
}
