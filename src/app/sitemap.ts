import type { MetadataRoute } from 'next';

import { areaPages } from '@/lib/area-pages';
import { articlePath, articles } from '@/lib/articles';
import { caseStudies } from '@/lib/case-studies';
import { costGuides } from '@/lib/cost-guides';
import { localLandings } from '@/lib/local-landings';
import { projects } from '@/lib/projects';
import { absoluteUrl } from '@/lib/seo';
import { servicePath, services } from '@/lib/services';

/**
 * Prefer a real publish or update date on the content record.
 * Articles, projects, cost guides, and case studies have none today, so those
 * entries — and every page without a date — use the time this sitemap is built.
 */
function contentDate(entry: object, buildTime: Date): Date {
  const record = entry as Record<string, unknown>;
  const raw =
    record.updated ??
    record.updatedAt ??
    record.dateModified ??
    record.published ??
    record.publishedAt ??
    record.datePublished ??
    record.date;
  if (raw instanceof Date && !Number.isNaN(raw.getTime())) return raw;
  if (typeof raw === 'string' || typeof raw === 'number') {
    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return buildTime;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const buildTime = new Date();
  const staticRoutes = [
    '/',
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
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: buildTime,
      priority: path === '/' ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(servicePath(service.slug)),
      lastModified: buildTime,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: contentDate(project, buildTime),
      priority: 0.6,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(articlePath(article.slug)),
      lastModified: contentDate(article, buildTime),
      priority: 0.5,
    })),
    { url: absoluteUrl('/privacy'), lastModified: buildTime, priority: 0.3 },
    { url: absoluteUrl('/terms'), lastModified: buildTime, priority: 0.3 },
    ...localLandings.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: buildTime,
      priority: 0.5,
    })),
    ...areaPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: buildTime,
      priority: 0.6,
    })),
    ...costGuides.map((guide) => ({
      url: absoluteUrl(guide.path),
      lastModified: contentDate(guide, buildTime),
      priority: 0.6,
    })),
    ...caseStudies.map((study) => ({
      url: absoluteUrl(study.path),
      lastModified: contentDate(study, buildTime),
      priority: 0.6,
    })),
  ];
}
