import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ReviewCard } from "@/components/ui/infinite-review-cards";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { googleReviews, testimonials } from "@/lib/testimonials";

export const metadata: Metadata = pageMetadata({
  title: "Reviews",
  description: `Five-star Google reviews for Elite Restorations in Houston. ${googleReviews.score} stars across ${googleReviews.count} reviews.`,
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          name: site.name,
          url: site.url,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(googleReviews.score),
            reviewCount: String(googleReviews.count),
            bestRating: "5",
            worstRating: "1",
          },
          review: testimonials.map((item) => ({
            "@type": "Review",
            author: { "@type": "Person", name: item.author },
            reviewBody: item.quote,
            reviewRating: {
              "@type": "Rating",
              ratingValue: String(item.rating),
              bestRating: "5",
            },
            publisher: { "@type": "Organization", name: "Google" },
          })),
        }}
      />
      <PageHero
        eyebrow="Reviews"
        headingId="reviews-page-heading"
        title={["Five stars,", "in their words."]}
        lede={`${googleReviews.score} stars across ${googleReviews.count} Google reviews. These are the five-star notes, from kitchens and baths to the night the pipes burst.`}
        crumbs={[{ name: "Reviews", path: "/testimonials" }]}
      >
        <p className="mt-8">
          <a
            href={googleReviews.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
          >
            See all {googleReviews.count} on Google
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </p>
      </PageHero>

      <section aria-label="Five-star Google reviews" className="pb-24 md:pb-32">
        <div className="gutter mx-auto max-w-[120rem]">
          <ul className="columns-1 gap-4 md:columns-2 xl:columns-3">
            {testimonials.map((item) => (
              <li key={item.author} className="mb-4 break-inside-avoid">
                <ReviewCard item={item} />
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted-foreground">
            Showing {testimonials.length} five-star reviews. The Google listing
            also includes a handful of lower ratings, which is why the overall
            score is {googleReviews.score}.{" "}
            <Link href="/contact" className="underline decoration-foreground/30 underline-offset-[0.4em] hover:decoration-accent-ink">
              Start a project
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="If the reviews sound like the job you have, call."
        body="Tell us what happened, or what you want the house to become. We will look at it with you."
      />
    </>
  );
}
