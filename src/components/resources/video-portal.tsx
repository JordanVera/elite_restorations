'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import { ProjectPlaylist } from '@/components/resources/project-playlist';
import {
  getCategory,
  getProject,
  videoCategories,
  type VideoCategory,
} from '@/lib/resource-videos';
import { cn } from '@/lib/utils';

type Audience = 'homeowner' | 'realtor';

function portalHref(basePath: string, category?: string, project?: string) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (project) params.set('project', project);
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function VideoCategoryGrid({
  basePath,
  categories = videoCategories,
}: {
  basePath: string;
  categories?: VideoCategory[];
}) {
  return (
    <ul className="grid gap-px bg-border sm:grid-cols-2">
      {categories.map((category, i) => (
        <li key={category.slug} className="bg-background">
          <Link
            href={portalHref(basePath, category.slug)}
            scroll={false}
            className="group flex h-full flex-col p-8 transition-colors hover:bg-surface md:p-10"
          >
            <span className="eyebrow text-muted-foreground">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="mt-8 flex items-start justify-between gap-4">
              <span className="font-display t-md transition-colors duration-500 group-hover:text-accent-ink">
                {category.name}
              </span>
              <ArrowUpRight
                aria-hidden
                className="mt-2 size-5 shrink-0 text-accent-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
            <span className="mt-4 max-w-[36ch] leading-relaxed text-muted-foreground">
              {category.summary}
            </span>
            <span className="eyebrow mt-10 text-accent-ink">
              {category.projects.length} project types
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ProjectTypeGrid({
  basePath,
  category,
}: {
  basePath: string;
  category: VideoCategory;
}) {
  return (
    <div>
      <Link
        href={portalHref(basePath)}
        scroll={false}
        className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All categories
      </Link>
      <h3 className="font-display t-md mt-6">{category.name}</h3>
      <p className="measure mt-4 text-muted-foreground">{category.summary}</p>
      <ul className="mt-10 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
        {category.projects.map((project, i) => (
          <li key={project.slug} className="bg-background">
            <Link
              href={portalHref(basePath, category.slug, project.slug)}
              scroll={false}
              className={cn(
                'group flex h-full flex-col p-8 transition-colors hover:bg-surface',
              )}
            >
              <span className="eyebrow text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display mt-6 text-3xl leading-tight transition-colors duration-500 group-hover:text-accent-ink">
                {project.name}
              </span>
              <span className="mt-4 leading-relaxed text-muted-foreground">
                {project.summary}
              </span>
              <span className="eyebrow mt-8 text-accent-ink">
                {project.steps.length} steps
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VideoPortal({
  basePath,
  audience,
}: {
  basePath: string;
  audience: Audience;
}) {
  const params = useSearchParams();
  const categorySlug = params.get('category') ?? '';
  const projectSlug = params.get('project') ?? '';
  const category = categorySlug ? getCategory(categorySlug) : undefined;
  const match =
    category && projectSlug ? getProject(category.slug, projectSlug) : undefined;

  return (
    <div className="mt-12 md:mt-16">
      {match ? (
        <ProjectPlaylist
          key={match.project.slug}
          category={match.category}
          project={match.project}
          audience={audience}
          categoryHref={portalHref(basePath, match.category.slug)}
        />
      ) : category ? (
        <ProjectTypeGrid basePath={basePath} category={category} />
      ) : (
        <VideoCategoryGrid basePath={basePath} />
      )}
    </div>
  );
}
