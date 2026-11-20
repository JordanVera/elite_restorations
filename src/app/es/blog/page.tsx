import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { esLegacyArticles } from '@/lib/es/legacy-articles';
import { esPosts } from '@/lib/es/posts';
import { languageAlternates, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Guías de remodelación en Houston',
  description:
    'Guías en español de Elite Restorations sobre granizo, agua, inundación, cocinas, baños, pisos y techos en Houston.',
  path: '/es/blog',
  locale: 'es',
  languages: languageAlternates('/blog', '/es/blog'),
  image: '/images/services/kitchen-remodeling.jpg',
});

export default function SpanishBlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={['Notas desde', 'la obra.']}
        lede="Guías claras sobre restauración y remodelación en Houston: agua, tormenta, cocinas, baños, pisos y techos."
        crumbs={[{ name: 'Blog', path: '/es/blog' }]}
        homeCrumb={{ name: 'Inicio', path: '/es' }}
      />
      <section aria-label="Guías" className="pb-20 md:pb-28">
        <div className="gutter mx-auto max-w-[120rem]">
          <ul className="divide-y divide-border border-y border-border">
            {[...esPosts, ...esLegacyArticles].map((article, index) => (
              <li key={article.slug}>
                <Link
                  href={article.path}
                  className="group grid gap-4 py-8 transition-colors hover:text-accent-ink md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
                >
                  <span className="eyebrow text-muted-foreground md:col-span-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl tracking-[-0.03em] text-balance md:col-span-5 md:text-4xl">
                    {article.title}
                  </span>
                  <span className="flex items-start justify-between gap-6 text-muted-foreground md:col-span-5">
                    <span className="max-w-[42ch] leading-relaxed">{article.lede}</span>
                    <ArrowUpRight className="mt-1 size-5 shrink-0" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand
        title="¿Quiere que veamos la casa?"
        body="Llame al (713) 909-0034. Empresa familiar en Houston desde 1993."
        href="/es/contact"
        buttonLabel="Pedir un estimado"
        textLabel="Envíanos un texto"
      />
    </>
  );
}
