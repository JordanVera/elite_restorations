import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { articlePath, articles } from '@/lib/articles';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Guides',
  description:
    'Practical guides from Elite Restorations on water damage, fire recovery, kitchens, bathrooms, and flooring in Greater Houston.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={['Notes from', 'the job site.']}
        lede="Short guides on restoration and remodeling, kept at the same addresses as the previous site."
        crumbs={[{ name: 'Blog', path: '/blog' }]}
      />
      <section aria-label="Guides" className="pb-20 md:pb-28">
        <div className="gutter mx-auto max-w-[120rem]">
          <ul className="divide-y divide-border border-y border-border">
            {articles.map((article, index) => (
              <li key={article.slug}>
                <Link
                  href={articlePath(article.slug)}
                  className="group grid gap-4 py-8 transition-colors hover:text-accent-ink md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
                >
                  <span className="eyebrow text-muted-foreground md:col-span-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl tracking-[-0.03em] text-balance md:col-span-5 md:text-4xl">
                    {article.title}
                  </span>
                  <span className="flex items-start justify-between gap-6 text-muted-foreground md:col-span-5">
                    <span className="max-w-[42ch] leading-relaxed">
                      {article.lede}
                    </span>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
