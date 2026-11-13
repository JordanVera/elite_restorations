import type { MetadataRoute } from 'next';

import { areaPages } from '@/lib/area-pages';
import { articlePath, articles } from '@/lib/articles';
import { localLandings } from '@/lib/local-landings';
import { projects } from '@/lib/projects';
import { absoluteUrl } from '@/lib/seo';
import { servicePath, services } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
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
      priority: path === '/' ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(servicePath(s.slug)),
      priority: 0.7,
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      priority: 0.6,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(articlePath(article.slug)),
      priority: 0.5,
    })),
    { url: absoluteUrl('/privacy'), priority: 0.3 },
    { url: absoluteUrl('/terms'), priority: 0.3 },
    ...localLandings.map((page) => ({
      url: absoluteUrl(page.path),
      priority: 0.5,
    })),
    ...areaPages.map((page) => ({
      url: absoluteUrl(page.path),
      priority: 0.6,
    })),
  ];
}
