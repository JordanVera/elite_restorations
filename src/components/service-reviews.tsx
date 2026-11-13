import { ArrowUpRight } from 'lucide-react';

import { ReviewCard } from '@/components/ui/infinite-review-cards';
import { googleReviewSummary, reviewsForService } from '@/lib/published-reviews';

export function ServiceReviews({ serviceSlug }: { serviceSlug: string }) {
  const reviews = reviewsForService(serviceSlug);
  if (reviews.length === 0) return null;

  return (
    <section
      aria-labelledby={`${serviceSlug}-reviews`}
      className="border-t border-border py-16 md:py-20"
    >
      <div className="gutter mx-auto max-w-[120rem]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-accent-ink">Google reviews</p>
            <h2 id={`${serviceSlug}-reviews`} className="font-display t-lg mt-4">
              In their words.
            </h2>
          </div>
          <p className="max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
            {googleReviewSummary.score} stars from {googleReviewSummary.count} Google
            reviews, read {googleReviewSummary.readOn}.{' '}
            <a
              href={googleReviewSummary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground underline decoration-foreground/30 underline-offset-[0.35em] hover:decoration-accent-ink"
            >
              See the Google profile
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </p>
        </div>
        <ul className="mt-10 grid gap-4 lg:grid-cols-2">
          {reviews.map((review) => (
            <li key={review.author}>
              <ReviewCard item={review} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
