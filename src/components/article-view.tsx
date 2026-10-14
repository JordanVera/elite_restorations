import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { JsonLd } from '@/components/json-ld';
import { PageHero } from '@/components/page-hero';
import {
  articlePath,
  getArticle,
  type Article,
} from '@/lib/articles';
import { absoluteUrl } from '@/lib/seo';
import { getService, servicePath } from '@/lib/services';
import { site } from '@/lib/site';

export function ArticleView({ article }: { article: Article }) {
  const path = articlePath(article.slug);
  const service = article.service ? getService(article.service) : undefined;
  const related = article.related
    .map((slug) => getArticle(slug))
    .filter((item): item is Article => Boolean(item));

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.description,
          mainEntityOfPage: absoluteUrl(path),
          image: article.image ? absoluteUrl(article.image) : undefined,
          author: {
            '@type': 'Organization',
            name: site.name,
            url: site.url,
          },
          publisher: {
            '@type': 'Organization',
            name: site.name,
            url: site.url,
          },
        }}
      />
      <PageHero
        eyebrow="Guide"
        title={article.lines}
        lede={article.lede}
        crumbs={[
          { name: 'Blog', path: '/blog' },
          { name: article.crumb, path },
        ]}
      />
      <article className="pb-8 md:pb-14">
        <div className="gutter mx-auto max-w-[120rem]">
          <div className="max-w-[42rem] space-y-14">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-3xl tracking-[-0.03em] text-balance md:text-4xl">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {section.blocks.map((block, index) =>
                    block.type === 'p' ? (
                      <p key={index}>{block.text}</p>
                    ) : (
                      <ul key={index} className="list-disc space-y-2 pl-5">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>

          <aside className="mt-16 border-t border-border pt-10">
            <p className="eyebrow text-muted-foreground">Keep reading</p>
            <ul className="mt-6 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {service ? (
                <li className="bg-background">
                  <Link
                    href={servicePath(service.slug)}
                    className="group flex h-full flex-col p-6 transition-colors hover:text-accent-ink md:p-8"
                  >
                    <span className="eyebrow text-accent-ink">Service</span>
                    <span className="font-display mt-4 text-2xl tracking-[-0.03em]">
                      {service.name}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                      See the work
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </Link>
                </li>
              ) : null}
              {related.map((item) => (
                <li key={item.slug} className="bg-background">
                  <Link
                    href={articlePath(item.slug)}
                    className="group flex h-full flex-col p-6 transition-colors hover:text-accent-ink md:p-8"
                  >
                    <span className="eyebrow text-muted-foreground">Guide</span>
                    <span className="font-display mt-4 text-2xl tracking-[-0.03em]">
                      {item.crumb}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                      Read
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </article>
      <CtaBand
        title={article.ctaTitle}
        body={article.ctaBody}
        service={article.service}
        emergency={article.emergency}
      />
    </>
  );
}
