import { Reveal } from '@/components/motion';
import type { GuideSection } from '@/lib/guides/types';

function sectionId(heading: string, index: number) {
  const slug = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `guide-${index}-${slug}`;
}

export function ProseSections({ sections }: { sections: readonly GuideSection[] }) {
  return (
    <>
      {sections.map((section, index) => {
        const id = sectionId(section.heading, index);
        return (
          <section
            key={id}
            aria-labelledby={id}
            className="border-b border-border py-20 md:py-28"
          >
            <div className="gutter mx-auto max-w-[120rem]">
              <Reveal>
                <p className="eyebrow text-accent-ink">{section.eyebrow}</p>
                <h2 id={id} className="font-display t-lg mt-4 max-w-[20ch]">
                  {section.heading}
                </h2>
              </Reveal>
              <div className="mt-8 space-y-6">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="measure text-lg leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.points && section.points.length > 0 && (
                <ol className="mt-14 grid gap-10 md:grid-cols-2">
                  {section.points.map((point, pointIndex) => (
                    <li key={point.title} className="border-t border-border pt-6">
                      <p className="eyebrow text-accent-ink">
                        {String(pointIndex + 1).padStart(2, '0')}
                      </p>
                      <h3 className="font-display mt-3 text-3xl">{point.title}</h3>
                      <p className="mt-3 max-w-[48ch] leading-relaxed text-muted-foreground">
                        {point.body}
                      </p>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
