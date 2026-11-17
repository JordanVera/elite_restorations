import type { Article } from '@/lib/articles';
import { assertCopyAllowed } from '@/lib/copy-guards';
import { esPostsA } from '@/lib/es/posts-a';
import { esPostsB } from '@/lib/es/posts-b';
import { esPostsC } from '@/lib/es/posts-c';
import { houstonPostSlugs, neighborhoodSlugs } from '@/lib/locale-paths';
import { parseLocalLandingSlug } from '@/lib/local-paths';
import { spanishServiceSlugs } from '@/lib/i18n';
import { titleFits } from '@/lib/seo';
import { wordCount } from '@/lib/words';

export type EsPost = Article & { path: string };

const spanishServices = new Set<string>(spanishServiceSlugs);
const neighborhoods = new Set<string>(neighborhoodSlugs);
const postSlugs = new Set<string>(houstonPostSlugs);

const extraHrefs = new Set([
  '/es',
  '/es/blog',
  '/es/emergency',
  '/es/contact',
  '/es/houston-storm-damage',
  '/es/restoration',
  '/emergency-board-up',
  // English hubs that do not have a Spanish page.
  '/fence-installation-repair',
  '/gutters',
  '/decks',
  '/patios',
  '/gazebos',
  '/es/expo-stone-countertops-houston',
  '/es/floor-and-decor-flooring-installation-houston',
]);

function withPath(article: Article): EsPost {
  return { ...article, path: `/es/blog/${article.slug}` };
}

export const esPosts: readonly EsPost[] = [...esPostsA, ...esPostsB, ...esPostsC].map(withPath);

const bySlug = new Map(esPosts.map((post) => [post.slug, post]));

export function getEsPost(slug: string) {
  return bySlug.get(slug);
}

function postWords(article: Article) {
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
  if (extraHrefs.has(href)) return true;
  if (href.startsWith('/es/blog/')) return postSlugs.has(href.slice('/es/blog/'.length));
  if (parseLocalLandingSlug(href.replace(/^\//, ''))) return true;
  if (!href.startsWith('/es/')) return href === '/emergency-board-up';
  const slug = href.slice(4);
  return spanishServices.has(slug) || neighborhoods.has(slug);
}

const errors: string[] = [];

if (esPosts.length !== houstonPostSlugs.length) {
  errors.push('Spanish posts are out of sync with the English slug list');
}

for (const slug of houstonPostSlugs) {
  if (!bySlug.has(slug)) errors.push(`Missing Spanish post ${slug}`);
}

for (const post of esPosts) {
  if (!titleFits(post.metaTitle)) errors.push(`Meta title does not fit: ${post.metaTitle}`);
  if (post.description.length > 155) {
    errors.push(`${post.slug} description is ${post.description.length} characters`);
  }
  const words = postWords(post);
  if (words < 900 || words > 1400) errors.push(`${post.path} is ${words} words`);
  if (!post.ctaBody.includes('(713) 909-0034')) errors.push(`${post.slug} CTA missing phone`);
  const hrefs = post.sections.flatMap((section) =>
    section.blocks.flatMap((block) => (block.type === 'links' ? block.items.map((item) => item.href) : [])),
  );
  const linkedNeighborhood = hrefs.some(
    (href) => href.startsWith('/es/') && neighborhoods.has(href.slice(4)),
  );
  const linkedService = hrefs.some(
    (href) => href.startsWith('/es/') && spanishServices.has(href.slice(4)),
  );
  if (!linkedNeighborhood) errors.push(`${post.slug} does not link a Spanish neighborhood`);
  if (!linkedService) errors.push(`${post.slug} does not link a Spanish service`);
  for (const href of hrefs) {
    if (!linkOk(href)) errors.push(`${post.slug} links an unknown path: ${href}`);
  }
  const blob = [
    post.title,
    post.description,
    post.lede,
    post.ctaBody,
    ...post.sections.flatMap((section) =>
      section.blocks.flatMap((block) => {
        if (block.type === 'p') return [block.text];
        if (block.type === 'list') return [...block.items];
        return block.items.map((item) => item.label);
      }),
    ),
    ...(post.faqs ?? []).flatMap((faq) => [faq.q, faq.a]),
  ].join('\n');
  try {
    assertCopyAllowed(post.path, blob);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
  const phraseCount = blob.split('No somos ajustadores públicos.').length - 1;
  if (phraseCount < 1 || phraseCount > 2) {
    errors.push(`${post.path} uses the insurance sentence ${phraseCount} times`);
  }
}

if (errors.length > 0) {
  throw new Error(errors.join('\n'));
}
