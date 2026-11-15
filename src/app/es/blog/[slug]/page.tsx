import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleView } from '@/components/article-view';
import { esPosts, getEsPost } from '@/lib/es/posts';
import { languageAlternates, pageMetadata } from '@/lib/seo';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return esPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getEsPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.metaTitle,
    description: post.description,
    path: post.path,
    locale: 'es',
    image: post.image,
    languages: languageAlternates(`/${slug}`, post.path),
  });
}

export default async function SpanishPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getEsPost(slug);
  if (!post) notFound();
  const related = post.related
    .map((item) => getEsPost(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  return <ArticleView article={post} locale="es" relatedArticles={related} />;
}
