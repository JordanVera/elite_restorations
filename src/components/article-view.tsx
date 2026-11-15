import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { PageHero } from '@/components/page-hero';
import {
  articlePath,
  getArticle,
  type Article,
} from '@/lib/articles';
import { esServiceNames, serviceHref } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/seo';
import { getService } from '@/lib/services';
import { site } from '@/lib/site';

export function ArticleView({
  article,
  locale = 'en',
  relatedArticles,
}: {
  article: Article;
  locale?: 'en' | 'es';
  relatedArticles?: readonly Article[];
}) {
  const es = locale === 'es';
  const path = es ? `/es/blog/${article.slug}` : articlePath(article.slug);
  const service = article.service ? getService(article.service) : undefined;
  const related = (relatedArticles ??
    article.related
      .map((slug) => getArticle(slug))
      .filter((item): item is Article => Boolean(item))) as Article[];
  const copy = es
    ? {
        eyebrow: 'Guía',
        blog: 'Blog',
        blogPath: '/es/blog',
        questions: 'Preguntas',
        faqTitle: 'Conviene saber.',
        keep: 'Siga leyendo',
        service: 'Servicio',
        see: 'Ver el trabajo',
        read: 'Leer',
        home: { name: 'Inicio', path: '/es' },
      }
    : {
        eyebrow: 'Guide',
        blog: 'Blog',
        blogPath: '/blog',
        questions: 'Questions',
        faqTitle: 'Good to know.',
        keep: 'Keep reading',
        service: 'Service',
        see: 'See the work',
        read: 'Read',
        home: undefined,
      };

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': ['BlogPosting', 'Article'],
          headline: article.title,
          description: article.description,
          inLanguage: es ? 'es-US' : 'en-US',
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
        eyebrow={copy.eyebrow}
        title={article.lines}
        lede={article.lede}
        crumbs={[
          { name: copy.blog, path: copy.blogPath },
          { name: article.crumb, path },
        ]}
        homeCrumb={copy.home}
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
                    ) : block.type === 'links' ? (
                      <ul key={index} className="space-y-3 pt-1">
                        {block.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="inline-flex items-center gap-2 text-foreground underline decoration-foreground/30 underline-offset-[0.45em] transition-colors hover:decoration-accent-ink"
                            >
                              {item.label}
                              <ArrowUpRight className="size-4" aria-hidden />
                            </Link>
                          </li>
                        ))}
                      </ul>
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

          {article.faqs && article.faqs.length > 0 ? (
            <section
              aria-labelledby="article-faq-heading"
              className="mt-16 border-t border-border pt-16 md:pt-20"
            >
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="eyebrow text-accent-ink">{copy.questions}</p>
                  <h2 id="article-faq-heading" className="font-display t-lg mt-4">
                    {copy.faqTitle}
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <Faq items={[...article.faqs]} inLanguage={es ? 'es' : 'en'} />
                </div>
              </div>
            </section>
          ) : null}

          <aside className="mt-16 border-t border-border pt-10">
            <p className="eyebrow text-muted-foreground">{copy.keep}</p>
            <ul className="mt-6 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {service ? (
                <li className="bg-background">
                  <Link
                    href={serviceHref(service.slug, es ? 'es' : 'en')}
                    className="group flex h-full flex-col p-6 transition-colors hover:text-accent-ink md:p-8"
                  >
                    <span className="eyebrow text-accent-ink">{copy.service}</span>
                    <span className="font-display mt-4 text-2xl tracking-[-0.03em]">
                      {es && service.slug in esServiceNames
                        ? esServiceNames[service.slug as keyof typeof esServiceNames]
                        : service.name}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                      {copy.see}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </Link>
                </li>
              ) : null}
              {related.map((item) => (
                <li key={item.slug} className="bg-background">
                  <Link
                    href={es ? `/es/blog/${item.slug}` : articlePath(item.slug)}
                    className="group flex h-full flex-col p-6 transition-colors hover:text-accent-ink md:p-8"
                  >
                    <span className="eyebrow text-muted-foreground">{copy.eyebrow}</span>
                    <span className="font-display mt-4 text-2xl tracking-[-0.03em]">
                      {item.crumb}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                      {copy.read}
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
        service={es ? undefined : article.service}
        emergency={article.emergency}
        href={es ? (article.emergency ? '/es/emergency' : '/es/contact') : undefined}
        buttonLabel={
          es ? (article.emergency ? 'Pedir ayuda de emergencia' : 'Pedir un estimado') : undefined
        }
        textLabel={es ? 'Envíanos un texto' : undefined}
      />
    </>
  );
}
