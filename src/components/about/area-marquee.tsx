import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Reveal } from '@/components/motion';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { site } from '@/lib/site';

export function AreaMarquee() {
  return (
    <section
      aria-labelledby="area-heading"
      className="overflow-hidden border-t border-border bg-surface py-20 md:py-28"
    >
      <div className="gutter mx-auto grid max-w-[120rem] gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-accent-ink">Where we work</p>
          <h2 id="area-heading" className="font-display t-lg mt-4">
            Greater Houston.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:justify-self-end">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.2em]"
          >
            Check your neighborhood
            <ArrowRight
              className="size-4 transition-transform duration-500 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <InfiniteMovingCards
          items={site.serviceArea}
          itemClassName="font-display whitespace-nowrap text-[clamp(1.85rem,3.4vw,3.4rem)] leading-none tracking-[-0.03em]"
        />
      </div>
    </section>
  );
}
