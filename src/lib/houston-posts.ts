import { houstonPostsA } from '@/lib/posts/en-a';
import { houstonPostsB } from '@/lib/posts/en-b';
import { houstonPostsC } from '@/lib/posts/en-c';
import { assertCopyAllowed } from '@/lib/copy-guards';
import { parseLocalLandingSlug } from '@/lib/local-paths';
import { neighborhoodSlugs } from '@/lib/locale-paths';
import { getNeighborhood } from '@/lib/neighborhoods';
import { titleFits } from '@/lib/seo';
import { getService } from '@/lib/services';
import { wordCount } from '@/lib/words';
import type { Article } from '@/lib/articles';

export const houstonPosts: Article[] = [...houstonPostsA, ...houstonPostsB, ...houstonPostsC];

const staticHrefs = new Set([
  '/emergency',
  '/contact',
  '/insurance-log',
  '/blog',
  '/houston-storm-damage',
  '/restoration',
  '/burst-frozen-pipe-water-damage-houston',
  '/water-heater-leak-damage-houston',
  '/dishwasher-leak-water-damage-houston',
  '/toilet-overflow-water-damage-houston',
  '/kitchen-remodel-cost-houston',
  '/bathroom-remodel-cost-houston',
  '/roof-replacement-cost-houston',
  '/what-to-do-after-water-damage-houston',
  '/storm-and-hail-roof-repair-houston',
  '/frozen-and-burst-pipes-in-houston',
  '/expo-stone-countertops-houston',
  '/floor-and-decor-flooring-installation-houston',
]);

const postSlugs = new Set(houstonPosts.map((article) => article.slug));

function articleWords(article: Article) {
  return wordCount([
    article.lede,
    ...article.sections.flatMap((section) =>
      section.blocks.flatMap((block) => {
        if (block.type === 'p') return [block.text];
        if (block.type === 'list') return [...block.items];
        return [];
      }),
    ),
    ...(article.faqs ?? []).flatMap((faq) => [faq.q, faq.a]),
  ]);
}

function linkOk(href: string) {
  if (staticHrefs.has(href)) return true;
  const slug = href.replace(/^\//, '');
  if (getService(slug) || getNeighborhood(slug) || postSlugs.has(slug)) return true;
  if ((neighborhoodSlugs as readonly string[]).includes(slug)) return true;
  if (parseLocalLandingSlug(slug)) return true;
  return false;
}

const errors: string[] = [];
const seenTitle = new Set<string>();

for (const article of houstonPosts) {
  if (!titleFits(article.metaTitle)) errors.push(`Meta title does not fit: ${article.metaTitle}`);
  if (article.description.length > 155) {
    errors.push(`${article.slug} description is ${article.description.length} characters`);
  }
  if (seenTitle.has(article.metaTitle)) errors.push(`Duplicate meta title: ${article.metaTitle}`);
  seenTitle.add(article.metaTitle);
  const words = articleWords(article);
  if (words < 900 || words > 1400) errors.push(`${article.slug} is ${words} words`);
  if (!article.ctaBody.includes('(713) 909-0034')) {
    errors.push(`${article.slug} CTA is missing the phone`);
  }
  if (!article.image?.startsWith('/images/')) errors.push(`${article.slug} is missing a site image`);
  const hrefs = article.sections.flatMap((section) =>
    section.blocks.flatMap((block) => (block.type === 'links' ? block.items.map((item) => item.href) : [])),
  );
  if (!hrefs.some((href) => getNeighborhood(href.slice(1)))) {
    errors.push(`${article.slug} does not link a neighborhood page`);
  }
  if (!hrefs.some((href) => getService(href.slice(1)))) {
    errors.push(`${article.slug} does not link a service page`);
  }
  for (const href of hrefs) {
    if (!linkOk(href)) errors.push(`${article.slug} links an unknown path: ${href}`);
  }
  const blob = [
    article.title,
    article.description,
    article.lede,
    article.ctaTitle,
    article.ctaBody,
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.blocks.flatMap((block) => {
        if (block.type === 'p') return [block.text];
        if (block.type === 'list') return [...block.items];
        return block.items.map((item) => item.label);
      }),
    ]),
    ...(article.faqs ?? []).flatMap((faq) => [faq.q, faq.a]),
  ].join('\n');
  try {
    assertCopyAllowed(article.slug, blob);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
  const phraseCount = blob.split('We are not public adjusters.').length - 1;
  if (phraseCount > 2) {
    errors.push(`${article.slug} says the insurance sentence ${phraseCount} times`);
  }
}

if (errors.length > 0) {
  throw new Error(errors.join('\n'));
}
