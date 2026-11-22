import type { MetadataRoute } from 'next';

import { areaPages } from '@/lib/area-pages';
import { esNeighborhoods } from '@/lib/es/neighborhoods';
import { esPosts } from '@/lib/es/posts';
import { neighborhoods } from '@/lib/neighborhoods';
import { brandPages } from '@/lib/brand-pages';
import { articlePath, articles, type Article } from '@/lib/articles';
import { contentUpdated } from '@/lib/content-dates';
import { caseStudies } from '@/lib/case-studies';
import { costGuides } from '@/lib/cost-guides';
import { legalEffectiveDate } from '@/lib/legal';
import { esCityLandings } from '@/lib/es/city-landings';
import { localLandings } from '@/lib/local-landings';
import { esCostGuides } from '@/lib/es/cost-guides';
import { esInsurers } from '@/lib/es/insurers';
import { esLegacyArticles } from '@/lib/es/legacy-articles';
import { esAreaPages } from '@/lib/es/area-pages';
import { esWaterCauses } from '@/lib/es/water-causes';
import { esProjectPages } from '@/lib/es/project-pages';
import { esProjectStories } from '@/lib/es/project-stories';
import { projects } from '@/lib/projects';
import { absoluteUrl } from '@/lib/seo';
import { insurers } from '@/lib/insurers';
import { spanishServiceSlugs } from '@/lib/i18n';
import {
  brandSourceFiles,
  esLandingSourceFiles,
  esPostSourceFile,
  landingSourceFiles,
  lastModified,
} from '@/lib/sitemap-dates';
import { servicePath, services } from '@/lib/services';
import { waterCauses } from '@/lib/water-causes';

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
 * Privacy and terms name an effective date. Blog posts and projects use a
 * date written in the copy when they have one. Other pages use the git
 * last-commit date of their source file. A fixed date is the last resort.
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

const staticFiles: Record<string, readonly string[]> = {
  '/': ['src/app/page.tsx', 'src/components/home/home-hero.tsx'],
  '/restoration': ['src/app/restoration/page.tsx'],
  '/services': ['src/app/services/page.tsx'],
  '/projects': ['src/app/projects/page.tsx'],
  '/resources': ['src/app/resources/page.tsx'],
  '/resources/homeowners': ['src/app/resources/homeowners/page.tsx'],
  '/resources/realtors': ['src/app/resources/realtors/page.tsx'],
  '/about': ['src/app/about/page.tsx'],
  '/testimonials': ['src/app/testimonials/page.tsx', 'src/lib/testimonials.ts'],
  '/contact': ['src/app/contact/page.tsx'],
  '/emergency': ['src/app/emergency/page.tsx'],
  '/insurance-log': ['src/app/insurance-log/page.tsx'],
  '/blog': ['src/app/blog/page.tsx', 'src/lib/articles.ts'],
  '/es/blog': ['src/app/es/blog/page.tsx', 'src/lib/es/posts.ts'],
  '/houston-storm-damage': ['src/app/houston-storm-damage/page.tsx'],
  '/restoration-company-houston': [
    'src/app/restoration-company-houston/page.tsx',
    'src/lib/restoration-company-page.ts',
    'src/components/restoration-company-view.tsx',
  ],
  '/insurance-claims/companies': ['src/app/insurance-claims/companies/page.tsx', 'src/lib/insurers.ts'],
  '/es': ['src/app/es/page.tsx'],
  '/es/restoration': ['src/app/es/restoration/page.tsx'],
  '/es/emergency': ['src/app/es/emergency/page.tsx'],
  '/es/contact': ['src/app/es/contact/page.tsx'],
  '/es/projects': ['src/app/es/projects/page.tsx', 'src/lib/es/project-pages.ts'],
  '/es/insurance-claims/companies': [
    'src/app/es/insurance-claims/companies/page.tsx',
    'src/lib/es/insurers.ts',
  ],
  '/es/houston-storm-damage': ['src/app/es/houston-storm-damage/page.tsx'],
  '/es/restoration-company-houston': [
    'src/app/es/restoration-company-houston/page.tsx',
    'src/lib/es/restoration-company-page.ts',
    'src/components/restoration-company-view.tsx',
  ],
  '/privacy': ['src/app/privacy/page.tsx', 'src/lib/legal.ts'],
  '/terms': ['src/app/terms/page.tsx', 'src/lib/legal.ts'],
};

function entry(
  path: string,
  priority: number,
  files: readonly string[],
  modified?: Date,
): MetadataRoute.Sitemap[number] {
  const pageFile = path === '/' ? 'src/app/page.tsx' : `src/app${path}/page.tsx`;
  return {
    url: absoluteUrl(path),
    lastModified: lastModified([pageFile, ...files], modified ?? datedPaths.get(path)),
    priority,
  };
}

function articleText(article: Article) {
  return [
    article.title,
    article.lede,
    article.description,
    ...article.sections.flatMap((section) =>
      section.blocks.flatMap((block) => {
        if (block.type === 'p') return [block.text];
        if (block.type === 'list') return [...block.items];
        return block.items.map((item) => item.label);
      }),
    ),
    ...(article.faqs ?? []).flatMap((faq) => [faq.q, faq.a]),
  ].join('\n');
}

function projectText(project: {
  tagline: string;
  description?: string;
  summary: readonly string[];
  notes: readonly string[];
}) {
  return [project.tagline, project.description ?? '', ...project.summary, ...project.notes].join('\n');
}

export default function sitemap(): MetadataRoute.Sitemap {
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
    '/es/blog',
    '/houston-storm-damage',
    '/restoration-company-houston',
    '/insurance-claims/companies',
  ];
  const spanishRoutes = [
    '/es',
    '/es/restoration',
    '/es/emergency',
    '/es/contact',
    '/es/projects',
    '/es/insurance-claims/companies',
    '/es/houston-storm-damage',
    '/es/restoration-company-houston',
    ...spanishServiceSlugs.map((slug) => `/es/${slug}`),
  ];
  return [
    ...staticRoutes.map((path) =>
      entry(
        path,
        path === '/' ? 1 : path === '/restoration' ? 0.9 : 0.8,
        staticFiles[path] ?? [`src/app${path}/page.tsx`],
      ),
    ),
    ...services.map((s) => entry(servicePath(s.slug), 0.7, ['src/lib/services.ts', 'src/lib/service-depth.ts'])),
    ...spanishRoutes.map((path) =>
      entry(
        path,
        0.6,
        spanishServiceSlugs.some((slug) => path === `/es/${slug}`)
          ? ['src/lib/es/hubs.ts', 'src/lib/services.ts', 'src/app/es/[slug]/page.tsx']
          : (staticFiles[path] ?? [`src/app${path}/page.tsx`]),
      ),
    ),
    ...waterCauses.map((cause) => entry(cause.path, 0.7, ['src/lib/water-causes.ts'])),
    ...insurers.map((insurer) =>
      entry(`/insurance-claims/companies/${insurer.slug}`, 0.6, [
        'src/lib/insurers.ts',
        'src/app/insurance-claims/companies/[slug]/page.tsx',
      ]),
    ),
    ...projects.map((p) =>
      entry(`/projects/${p.slug}`, 0.6, ['src/lib/projects.ts'], contentUpdated(projectText(p))),
    ),
    ...esProjectStories.map((story) =>
      entry(story.path, 0.6, ['src/lib/es/project-stories.ts'], contentUpdated(projectText(story))),
    ),
    ...esProjectPages.map((page) => entry(page.path, 0.6, ['src/lib/es/project-pages.ts'])),
    ...esLegacyArticles.map((post) =>
      entry(post.path, 0.5, ['src/lib/es/legacy-articles.ts'], contentUpdated(articleText(post))),
    ),
    ...esInsurers.map((page) =>
      entry(page.path, 0.6, ['src/lib/es/insurers.ts', 'src/app/es/insurance-claims/companies/[slug]/page.tsx']),
    ),
    ...esCostGuides.map((guide) => entry(guide.path, 0.6, ['src/lib/es/cost-guides.ts'])),
    ...esWaterCauses.map((page) => entry(page.path, 0.7, ['src/lib/es/water-causes.ts'])),
    ...esAreaPages.map((page) => entry(page.path, 0.6, ['src/lib/es/area-pages.ts', 'src/components/area-page.tsx'])),
    ...articles.map((article) =>
      entry(articlePath(article.slug), 0.5, ['src/lib/articles.ts'], contentUpdated(articleText(article))),
    ),
    entry('/privacy', 0.3, staticFiles['/privacy'] ?? []),
    entry('/terms', 0.3, staticFiles['/terms'] ?? []),
    ...localLandings.map((page) => entry(page.path, 0.5, landingSourceFiles(page.serviceSlug))),
    ...esCityLandings.map((page) => entry(page.path, 0.5, esLandingSourceFiles(page.areaSlug))),
    ...areaPages.map((page) => entry(page.path, 0.6, ['src/lib/area-pages.ts', 'src/components/area-page.tsx'])),
    ...neighborhoods.map((page) =>
      entry(page.path, 0.6, ['src/lib/neighborhoods.ts', 'src/components/neighborhood-page.tsx']),
    ),
    ...esNeighborhoods.map((page) =>
      entry(page.path, 0.6, ['src/lib/es/neighborhoods.ts', 'src/components/neighborhood-page.tsx']),
    ),
    ...esPosts.map((post) =>
      entry(post.path, 0.5, [esPostSourceFile(post.slug)], contentUpdated(articleText(post))),
    ),
    ...costGuides.map((guide) =>
      entry(guide.path, 0.6, ['src/lib/cost-guides.ts', 'src/lib/cost-guide-copy.ts']),
    ),
    ...brandPages.map((page) =>
      entry(page.path, page.locale === 'es' ? 0.6 : 0.7, brandSourceFiles(page.slug)),
    ),
    ...caseStudies.map((study) => entry(study.path, 0.6, ['src/lib/case-studies.ts'])),
  ];
}
