import type { MetadataRoute } from "next";

import { projects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/services", "/projects", "/about", "/contact", "/emergency", "/insurance-log"];
  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      priority: path === "/" ? 1 : 0.8,
    })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), priority: 0.7 })),
    ...projects.map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`), priority: 0.6 })),
  ];
}
