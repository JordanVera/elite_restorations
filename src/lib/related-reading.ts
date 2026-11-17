import { articlePath, articles, type Article } from "@/lib/articles";
import { esPosts } from "@/lib/es/posts";

/**
 * Posts that belong on more than the single `article.service` hub.
 * A flooring guide matches every floor we install. A fire guide matches
 * the trades that secure and dry the building.
 */
const alsoOn: Record<string, readonly string[]> = {
  "signs-its-time-to-replace-your-homes-flooring": [
    "wood-flooring",
    "tile-flooring",
    "vinyl-flooring",
    "laminate-flooring",
  ],
  "what-to-do-after-a-fire-your-first-5-steps": [
    "emergency-board-up",
    "roofing-emergency-tarp-repair",
    "water-damage-restoration",
  ],
  "emergency-tarp-and-board-up-houston": [
    "emergency-board-up",
    "roofing-emergency-tarp-repair",
    "commercial-storm-restoration",
  ],
  "hurricane-season-prep-houston": [
    "roofing",
    "siding",
    "commercial-storm-restoration",
  ],
  "storm-and-hail-roof-repair-houston": ["roofing", "siding", "roof-replacement"],
};

function matches(article: Pick<Article, "slug" | "service">, slug: string) {
  return article.service === slug || (alsoOn[article.slug]?.includes(slug) ?? false);
}

export function readingForService(slug: string, locale: "en" | "es" = "en") {
  if (locale === "es") {
    return esPosts
      .filter((post) => matches(post, slug))
      .map((post) => ({ href: post.path, label: post.title }));
  }
  return articles
    .filter((article) => matches(article, slug))
    .map((article) => ({ href: articlePath(article.slug), label: article.title }));
}
