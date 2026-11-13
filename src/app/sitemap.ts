import type { MetadataRoute } from 'next';

import { areaPages } from '@/lib/area-pages';
import { articlePath, articles } from '@/lib/articles';
import { caseStudies } from '@/lib/case-studies';
import { costGuides } from '@/lib/cost-guides';
import { legalEffectiveDate } from '@/lib/legal';
import { localLandings } from '@/lib/local-landings';
import { projects } from '@/lib/projects';
import { absoluteUrl } from '@/lib/seo';
import { servicePath, services } from '@/lib/services';

const MONTHS = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
} as const;

/**
 * Privacy and terms name an effective date. Everything else is stamped with
 * the time this sitemap is generated, which is the production build.
 */
function publishedDate(value: string) {
  const match = /^([A-Za-z]+) (\d{1,2}), (\d{4})$/.exec(value.trim());
  const month = match ? MONTHS[match[1] as keyof typeof MONTHS] : undefined;
  if (!match || month === undefined) {
    throw new Error(`Sitemap could not parse a published date: ${value}`);
  }
  return new Date(Date.UTC(Number(match[3]), month, Number(match[2])));
}

const datedPaths = new Map<string, Date>([
  ['/privacy', publishedDate(legalEffectiveDate)],
  ['/terms', publishedDate(legalEffectiveDate)],
]);

function entry(path: string, priority: number, builtAt: Date): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: datedPaths.get(path) ?? builtAt,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const builtAt = new Date();
  const staticRoutes = [
    '/',
    '/restoration',
    '/services',
    '/projects',
    '/resources',
    '/resources/homeowners',
    '/resources/realtors',
    '/about',
    '/testimonials',
    '/contact',
    '/emergency',
    '/insurance-log',
    '/blog',
  ];
  return [
    ...staticRoutes.map((path) =>
      entry(path, path === '/' ? 1 : path === '/restoration' ? 0.9 : 0.8, builtAt),
    ),
    ...services.map((s) => entry(servicePath(s.slug), 0.7, builtAt)),
    ...projects.map((p) => entry(`/projects/${p.slug}`, 0.6, builtAt)),
    ...articles.map((article) => entry(articlePath(article.slug), 0.5, builtAt)),
    entry('/privacy', 0.3, builtAt),
    entry('/terms', 0.3, builtAt),
    ...localLandings.map((page) => entry(page.path, 0.5, builtAt)),
    ...areaPages.map((page) => entry(page.path, 0.6, builtAt)),
    ...costGuides.map((guide) => entry(guide.path, 0.6, builtAt)),
    ...caseStudies.map((study) => entry(study.path, 0.6, builtAt)),
  ];
}
