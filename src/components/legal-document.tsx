import { PageHero } from '@/components/page-hero';
import type { LegalSection } from '@/lib/legal';
import { site } from '@/lib/site';

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function RichText({ text }: { text: string }) {
  const parts = text.split(
    new RegExp(`(${escapeRegExp(site.email)}|${escapeRegExp(site.phone.display)})`),
  );
  return (
    <p className="text-lg leading-relaxed text-muted-foreground">
      {parts.map((part, index) => {
        if (part === site.email) {
          return (
            <a
              key={index}
              href={`mailto:${site.email}`}
              className="text-foreground underline decoration-foreground/30 underline-offset-[0.35em] hover:decoration-accent-ink"
            >
              {part}
            </a>
          );
        }
        if (part === site.phone.display) {
          return (
            <a
              key={index}
              href={site.phone.href}
              className="text-foreground underline decoration-foreground/30 underline-offset-[0.35em] hover:decoration-accent-ink"
            >
              {part}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
}

export function LegalDocument({
  eyebrow,
  title,
  lede,
  path,
  sections,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  path: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={[title]}
        lede={lede}
        crumbs={[{ name: eyebrow, path }]}
      />
      <article className="pb-24 md:pb-32">
        <div className="gutter mx-auto max-w-3xl">
          {sections.map((section) => (
            <section key={section.heading} className="border-t border-border py-10">
              <h2 className="font-display text-3xl tracking-[-0.03em]">{section.heading}</h2>
              <div className="mt-5 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <RichText key={paragraph} text={paragraph} />
                ))}
                {section.items && (
                  <ul className="space-y-2 border-l border-border pl-5">
                    {section.items.map((item) => (
                      <li key={item} className="leading-relaxed text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
