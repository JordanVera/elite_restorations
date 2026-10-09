import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Reveal, SplitLines } from '@/components/motion';
import { InfiniteReviewCards } from '@/components/ui/infinite-review-cards';
import {
  googleReviews,
  testimonials,
  type Testimonial,
} from '@/lib/testimonials';

const featuredAuthors = [
  'Catricia Roberson',
  'Patrick Polomsky',
  'Shronda Allen',
  'Amy Davidson',
  'Wanda Tezeno',
  'John Wilson',
];

function byAuthor(names: readonly string[]) {
  return names
    .map((name) => testimonials.find((item) => item.author === name))
    .filter((item): item is Testimonial => Boolean(item));
}

export function HomeTestimonials() {
  const lead = byAuthor(featuredAuthors);
  const rest = testimonials.filter(
    (item) => !featuredAuthors.includes(item.author),
  );

  return (
    <section
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden border-t border-border bg-surface py-28 md:py-40"
    >
      <div className="gutter mx-auto max-w-[120rem]">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-muted-foreground">Google reviews</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="reviews-heading"
              className="t-xl mt-6"
              lines={[<span key="b">{googleReviews.count} reviews.</span>]}
            />
          </div>
          <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9 lg:items-end">
            <Reveal delay={0.12}>
              <p className="max-w-[28ch] text-muted-foreground lg:text-right">
                Five-star notes from homeowners on Google.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/testimonials"
                className="group inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.2em]"
              >
                Read every review
                <ArrowUpRight
                  className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-4 md:mt-20">
        <InfiniteReviewCards items={lead} direction="left" speed="slow" />
        <InfiniteReviewCards items={rest} direction="right" speed="normal" />
      </div>
    </section>
  );
}
