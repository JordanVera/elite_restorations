import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { ImageReveal, Reveal } from '@/components/motion';
import { Photo } from '@/components/photo';
import { projects } from '@/lib/projects';
import { cn } from '@/lib/utils';

export function WorkHighlights() {
  const highlights = projects.filter((project) => project.featured);

  return (
    <section
      aria-labelledby="work-heading"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="gutter mx-auto max-w-[120rem]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="eyebrow text-accent-ink">The work</p>
            <h2 id="work-heading" className="font-display t-lg mt-4 max-w-[16ch]">
              Finished rooms, real houses.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.2em]"
            >
              See the projects
              <ArrowUpRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-12">
          {highlights.map((project, index) => (
            <li key={project.slug} className={index % 2 === 1 ? 'md:mt-20' : undefined}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block focus-visible:outline-none"
              >
                <ImageReveal
                  delay={index * 0.05}
                  className={cn(
                    'relative aspect-[4/5] bg-surface',
                    index % 2 === 1 && 'md:aspect-[5/4]',
                  )}
                >
                  <Photo
                    image={project.cover}
                    sizes="(min-width: 768px) 46vw, 92vw"
                    className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/15 to-transparent p-5 opacity-100 transition-opacity duration-500 md:p-7 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100">
                    <div>
                      <p className="eyebrow text-white/75">{project.category}</p>
                      <h3 className="font-display mt-2 text-3xl text-white md:text-4xl">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </ImageReveal>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
