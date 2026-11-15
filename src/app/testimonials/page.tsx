import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { ReviewCard } from "@/components/ui/infinite-review-cards";
import { pageMetadata } from "@/lib/seo";
import { getService, servicePath } from "@/lib/services";
import { googleReviews, testimonials, type Testimonial } from "@/lib/testimonials";

function linksFor(item: Testimonial) {
  return item.services.flatMap((slug) => {
    const service = getService(slug);
    return service ? [{ href: servicePath(service.slug), label: service.name }] : [];
  });
}

export const metadata: Metadata = pageMetadata({
  title: "Houston Remodeling Reviews",
  description: `Google reviews for Elite Restorations in Houston. ${googleReviews.score} stars across ${googleReviews.count} reviews.`,
  path: "/testimonials",
  image: "/images/projects/kitchens/coffered-ceiling-island.jpg",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        headingId="reviews-page-heading"
        title={["Five stars,", "in their words."]}
        lede={`${googleReviews.score} stars across ${googleReviews.count} Google reviews. Homeowners wrote these five-star notes, from kitchens and baths to the night the pipes burst.`}
        crumbs={[{ name: "Reviews", path: "/testimonials" }]}
      >
        <p className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href={googleReviews.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
          >
            See all {googleReviews.count} on Google
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
          <a
            href={googleReviews.reviewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
          >
            Leave us a Google review
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </p>
      </PageHero>

      <section aria-label="Five-star Google reviews" className="pb-24 md:pb-32">
        <div className="gutter mx-auto max-w-[120rem]">
          <ul className="columns-1 gap-4 md:columns-2 xl:columns-3">
            {testimonials.map((item) => (
              <li key={item.author} className="mb-4 break-inside-avoid">
                <ReviewCard item={item} links={linksFor(item)} />
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted-foreground">
            These are the {testimonials.length} five-star reviews. The Google
            listing also has a few lower ratings, which is why the overall
            score is {googleReviews.score}.{" "}
            <Link href="/contact" className="underline decoration-foreground/30 underline-offset-[0.4em] hover:decoration-accent-ink">
              Start a project
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="If this sounds like your house, call."
        body="Tell us what happened, or what you want the house to become. We will look at it with you."
      />
    </>
  );
}
