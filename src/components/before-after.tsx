import { Photo } from '@/components/photo';
import type { Img } from '@/lib/images';

export function BeforeAfter({
  before,
  after,
  title,
  caption,
}: {
  before: Img;
  after: Img;
  title: string;
  caption: string;
}) {
  return (
    <section aria-labelledby="before-after-heading" className="border-t border-border py-20 md:py-28">
      <div className="gutter mx-auto max-w-[120rem]">
        <p className="eyebrow text-accent-ink">Before and after</p>
        <h2 id="before-after-heading" className="font-display t-lg mt-4 max-w-[18ch]">
          {title}
        </h2>
        <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">{caption}</p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-6">
          <figure>
            <div className="relative aspect-[4/3]">
              <Photo image={before} sizes="(min-width: 768px) 46vw, 92vw" />
            </div>
            <figcaption className="eyebrow mt-4">Before</figcaption>
          </figure>
          <figure>
            <div className="relative aspect-[4/3]">
              <Photo image={after} sizes="(min-width: 768px) 46vw, 92vw" />
            </div>
            <figcaption className="eyebrow mt-4">After</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
