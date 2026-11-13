import { ArrowUpRight } from 'lucide-react';

import { Reveal, SplitLines } from '@/components/motion';
import { InfiniteReviewCards } from '@/components/ui/infinite-review-cards';
import { googleReviewSummary, homepageReviews } from '@/lib/published-reviews';

export function HomeTestimonials() {
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
              lines={[
                <span key="score">{googleReviewSummary.score} stars.</span>,
              ]}
            />
          </div>
          <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9 lg:items-end">
            <Reveal delay={0.12}>
              <p className="max-w-[32ch] text-muted-foreground lg:text-right">
                {googleReviewSummary.score} stars from {googleReviewSummary.count}{' '}
                Google reviews, read {googleReviewSummary.readOn}.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href={googleReviewSummary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.2em]"
              >
                See them on Google
                <ArrowUpRight
                  className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <InfiniteReviewCards items={homepageReviews} direction="left" speed="slow" />
      </div>
    </section>
  );
}
