import { getArticle } from '@/lib/articles';
import { getAreaPage } from '@/lib/area-pages';
import { getCostGuide } from '@/lib/cost-guides';
import { img, type Img } from '@/lib/images';
import { parseLocalLandingSlug } from '@/lib/local-paths';
import { titleFits } from '@/lib/seo';
import { getService } from '@/lib/services';

export type CasePhoto = {
  image: Img;
  /** TODO-GEORGE: these are existing project photos, not confirmed as this customer's house. */
  todo: 'TODO-GEORGE';
};

export type CaseStudy = {
  slug: string;
  path: string;
  title: string;
  /** Document title lead, 60 characters or fewer once the business name is added. */
  metaTitle: string;
  description: string;
  lines: readonly string[];
  lede: string;
  serviceSlug: string;
  serviceLabel: string;
  reviewer: string;
  quote: string;
  steps: readonly { title: string; body: string }[];
  /** TODO-GEORGE: swap in photos of this job. Empty until George supplies them. */
  jobPhotos: readonly Img[];
  examplePhotos: readonly CasePhoto[];
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'water-heater-flood',
    path: '/water-heater-flood',
    title: 'Water Heater Flood: Drying, the Claim, and the Rebuild',
    metaTitle: 'Water Heater Flood in Houston',
    description:
      'Christopher B. wrote about a water heater flood, the drying, and the rebuild. His words, plus the usual steps. No address, date, or cost.',
    lines: ['A water heater', 'flooded the house.'],
    lede: 'Christopher B. described a water heater that gave out and flooded the home, then drying, and then a rebuild. This page uses his words and the usual sequence for that kind of loss. It does not add details he did not write.',
    serviceSlug: 'water-damage-restoration',
    serviceLabel: 'Water damage restoration',
    reviewer: 'Christopher B.',
    quote:
      'Outstanding service from start to finish! When our water heater gave out and flooded our home, we were completely overwhelmed... They handled our entire insurance claim from start to finish, communicating directly with the adjuster and taking a massive weight off our shoulders. Their mitigation crew worked quickly and thoroughly to dry out the house... When it came time for the reconstruction, the craftsmanship blew us away. They didn\'t just restore our home; they rebuilt everything better than it was before the leak... They turned a stressful disaster into a seamless, positive experience, and we couldn\'t be happier with the results!',
    steps: [
      {
        title: 'Stop the water',
        body: 'A failed water heater is a supply of water that does not stop on its own. The first job is to shut it off and keep people clear of wet electrical equipment.',
      },
      {
        title: 'Dry the structure',
        body: 'Christopher wrote that a crew dried the house. On this kind of loss that means finding where the water traveled, pulling up what is standing, and drying with air movers and dehumidifiers before anyone closes the walls.',
      },
      {
        title: 'A record for the insurer',
        body: 'He wrote that the team communicated with the adjuster. That is his account. Your insurer still decides what the policy pays. We photograph conditions and the work. A public adjuster is a different license, and the claim stays with the insurer.',
      },
      {
        title: 'Rebuild after it is dry',
        body: 'He wrote that the reconstruction came after the drying, and that the finished work replaced what the leak had damaged. Drywall, flooring, and the water heater itself are typical of that kind of rebuild. His review does not list the pieces in this house, so this page stays with his words.',
      },
    ],
    jobPhotos: [],
    examplePhotos: [
      {
        todo: 'TODO-GEORGE',
        image: img(
          '/images/projects/restoration/air-movers-drying.jpg',
          'Air movers drying a water-damaged room in a Houston home',
        ),
      },
      {
        todo: 'TODO-GEORGE',
        image: img(
          '/images/services/water-damage-restoration.jpg',
          'Air movers drying a Houston home during water damage restoration',
        ),
      },
    ],
  },
  {
    slug: 'kitchen-remodel-case-study',
    path: '/kitchen-remodel-case-study',
    title: 'Kitchen Remodel',
    metaTitle: 'Kitchen Remodel Case Study',
    description:
      'Shronda A. wrote about her kitchen remodel, from the quote to a room that looks different. No layout, cost, or address is added.',
    lines: ['A kitchen,', 'in her words.'],
    lede: 'Shronda A. wrote that the team remodeled her kitchen, from the quote to a room that does not look the same. She did not describe the layout or the materials. This page does not invent them.',
    serviceSlug: 'kitchen-remodeling',
    serviceLabel: 'Kitchen remodeling',
    reviewer: 'Shronda A.',
    quote:
      'I can\'t say enough about the great job that the Elite Restorations\' team did to my kitchen. Everyone from the beginning of the quote process to the completed job were phenomenal! Their customer service, communication, & promptness was by far the best experience I\'ve ever had during a home remodel job!... My kitchen doesn\'t look the same, I love it!!!',
    steps: [
      {
        title: 'The quote',
        body: 'She wrote that the job started with the quote. On a kitchen that means measuring the room you have and talking through how you cook before anyone orders cabinets or stone.',
      },
      {
        title: 'One sequence',
        body: 'A kitchen can touch cabinets, counters, tile, flooring, electrical, and plumbing. Those are planned as one project. Shronda did not list which of those her kitchen included, so this page stays with what she wrote.',
      },
      {
        title: 'The walkthrough',
        body: 'She wrote that the completed kitchen does not look the same, and that she loves it. The usual close of a remodel is a walkthrough of the finished room. Her review is the record for this one.',
      },
    ],
    jobPhotos: [],
    examplePhotos: [
      {
        todo: 'TODO-GEORGE',
        image: img(
          '/images/services/kitchen-remodeling.jpg',
          'Houston kitchen remodel with a coffered ceiling, marble island and pendant lighting',
        ),
      },
      {
        todo: 'TODO-GEORGE',
        image: img(
          '/images/projects/kitchens/coffered-ceiling-island.jpg',
          'Houston kitchen remodel with a coffered ceiling, twin marble islands and pendant lighting',
        ),
      },
    ],
  },
];

const bySlug = new Map(caseStudies.map((study) => [study.slug, study]));

export function getCaseStudy(slug: string) {
  return bySlug.get(slug);
}

for (const study of caseStudies) {
  if (!titleFits(study.metaTitle)) {
    throw new Error(`Case study meta title does not fit: ${study.metaTitle}`);
  }
  if (study.description.length > 155) {
    throw new Error(`Case study description too long: ${study.slug}`);
  }
  if (
    getService(study.slug) ||
    getArticle(study.slug) ||
    getAreaPage(study.slug) ||
    getCostGuide(study.slug) ||
    parseLocalLandingSlug(study.slug)
  ) {
    throw new Error(`Case study slug collides: ${study.slug}`);
  }
  if (study.jobPhotos.length > 0) {
    throw new Error(`TODO-GEORGE: ${study.slug} job photos should stay empty until George supplies them.`);
  }
}
