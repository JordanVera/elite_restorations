import { googleReviews } from '@/lib/testimonials';

/** Quotes from the Nov 13, 2026 Google export. George has not approved these for the site yet. */
export type PublishedReview = {
  author: string;
  rating: number;
  quote: string;
  detail: string;
  source: 'Google review';
  services: readonly string[];
};

export const reviewSource = 'Google review' as const;

export const publishedReviews: readonly PublishedReview[] = [
  {
    author: 'Christopher B.',
    rating: 5,
    detail: 'Water heater flood',
    source: reviewSource,
    services: ['water-damage-restoration', 'insurance-claims'],
    quote:
      'Outstanding service from start to finish! When our water heater gave out and flooded our home, we were completely overwhelmed... They handled our entire insurance claim from start to finish, communicating directly with the adjuster and taking a massive weight off our shoulders. Their mitigation crew worked quickly and thoroughly to dry out the house... When it came time for the reconstruction, the craftsmanship blew us away. They didn\'t just restore our home; they rebuilt everything better than it was before the leak... They turned a stressful disaster into a seamless, positive experience, and we couldn\'t be happier with the results!',
  },
  {
    author: 'Catricia R.',
    rating: 5,
    detail: 'Burst pipes',
    source: reviewSource,
    services: ['water-damage-restoration', 'insurance-claims'],
    quote:
      'Elite Restorations truly came to my rescue during an emergency when all the water pipes burst at my Bryan property... They\'ve completed renovations on multiple properties for me in Galena Park, Bryan, and Marlin, Texas, and every single time the results have been phenomenal... If you\'re looking for a reliable, skilled, and trustworthy team, Elite Restorations is it.',
  },
  {
    author: 'Shronda A.',
    rating: 5,
    detail: 'Kitchen remodel',
    source: reviewSource,
    services: ['kitchen-remodeling'],
    quote:
      'I can\'t say enough about the great job that the Elite Restorations\' team did to my kitchen. Everyone from the beginning of the quote process to the completed job were phenomenal! Their customer service, communication, & promptness was by far the best experience I\'ve ever had during a home remodel job!... My kitchen doesn\'t look the same, I love it!!!',
  },
  {
    author: 'Doug S.',
    rating: 5,
    detail: 'Kitchen remodel',
    source: reviewSource,
    services: ['kitchen-remodeling'],
    quote:
      'They remodeled our kitchen. Work was completed on time and within budget. Last minute punch list items were addressed timely. Very happy with our new kitchen.',
  },
  {
    author: 'Patrick P.',
    rating: 5,
    detail: 'Bathroom remodel',
    source: reviewSource,
    services: ['bathroom-remodeling'],
    quote:
      'We recently completed a bathroom remodel and could not be happier with the experience. From the initial consultation to the final walkthrough, the team was professional, responsive, and genuinely cared about delivering a quality result... The craftsmanship and attention to detail were outstanding, and the finished bathroom exceeded what we had envisioned... Thank you for a great experience and a beautiful new bathroom.',
  },
  {
    author: 'Kathy D.',
    rating: 5,
    detail: 'Shower renovation',
    source: reviewSource,
    services: ['bathroom-remodeling'],
    quote:
      'George and his staff were wonderful to work with! They did a fantastic job on our shower renovation.',
  },
  {
    author: 'Sandy J.',
    rating: 5,
    detail: 'Deck replacement',
    source: reviewSource,
    services: ['patios-decks'],
    quote:
      'Elite provided fantastic professionals to remove my 1500 sq.ft. deck and replace it with the highest quality craftsmanship and materials available. This was a major project and it was done on time and we couldn\'t be happier with our beautiful new deck.',
  },
  {
    author: 'Margery R.',
    rating: 4,
    detail: 'LVT flooring',
    source: reviewSource,
    services: [
      'wood-flooring',
      'tile-flooring',
      'vinyl-flooring',
      'laminate-flooring',
    ],
    quote:
      'I am pleased with the new flooring job done by Elite Restorations! The team worked quickly and cleanly to replace my second floor with LVT and the staff returned calls quickly and sent quotes promptly! I would definitely use them again.',
  },
];

export const homepageReviews = publishedReviews;

export function reviewsForService(serviceSlug: string) {
  return publishedReviews.filter((review) => review.services.includes(serviceSlug));
}

export const googleReviewSummary = {
  score: googleReviews.score,
  count: googleReviews.count,
  href: googleReviews.href,
  readOn: 'November 13, 2026',
};
