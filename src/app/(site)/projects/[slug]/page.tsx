import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { ImageReveal, Reveal } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { getProject, projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { getService, servicePath } from "@/lib/services";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: `${project.tagline} ${project.summary[0]}`.slice(0, 200),
    path: `/projects/${project.slug}`,
    image: project.cover.src,
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const linkedServices = project.services.map((s) => getService(s)).filter((s) => !!s);
  const path = `/projects/${project.slug}`;

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={[project.title]}
        lede={project.tagline}
        crumbs={[
          { name: "Projects", path: "/projects" },
          { name: project.title, path },
        ]}
      />

      <div className="gutter mx-auto max-w-[120rem] pt-12 md:pt-16">
        <ImageReveal immediate className="relative aspect-[4/3] w-full md:aspect-[21/9]">
          <Photo image={project.cover} sizes="(min-width: 1920px) 1800px, 96vw" priority />
        </ImageReveal>
      </div>

      <section aria-labelledby="story-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-accent-ink">About this study</p>
              <h2 id="story-heading" className="sr-only">
                About {project.title}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-7">
              {project.summary.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p
                    className={
                      i === 0
                        ? "font-display text-3xl leading-snug md:text-4xl"
                        : "measure text-lg leading-relaxed text-muted-foreground"
                    }
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="eyebrow text-accent-ink">In the photographs</p>
            <ul className="mt-6 border-t border-border">
              {project.notes.map((note) => (
                <li key={note} className="border-b border-border py-4 leading-relaxed">
                  {note}
                </li>
              ))}
            </ul>
            {linkedServices.length > 0 && (
              <div className="mt-10">
                <p className="eyebrow text-accent-ink">Related services</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {linkedServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={servicePath(s.slug)}
                        className="inline-flex items-center gap-1.5 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:text-accent-ink hover:decoration-accent-ink"
                      >
                        {s.name}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section aria-label={`${project.title} gallery`} className="pb-20 md:pb-28">
        <div className="gutter mx-auto max-w-[120rem]">
          <ul className="gap-6 sm:columns-2 xl:columns-3">
            {project.gallery.map((image, i) => (
              <li key={image.src} className="mb-6 break-inside-avoid">
                <ImageReveal delay={(i % 3) * 0.08}>
                  <Photo
                    image={image}
                    intrinsic
                    sizes="(min-width: 1280px) 31vw, (min-width: 640px) 48vw, 94vw"
                  />
                </ImageReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Next project" className="border-t border-border">
        <Link
          href={`/projects/${next.slug}`}
          className="group gutter mx-auto flex max-w-[120rem] items-center justify-between gap-8 py-16 md:py-24"
        >
          <span>
            <span className="eyebrow text-muted-foreground">Next project</span>
            <span className="font-display t-lg mt-3 block transition-colors duration-500 group-hover:text-accent-ink">
              {next.title}
            </span>
          </span>
          <ArrowRight
            aria-hidden
            className="size-10 shrink-0 text-accent-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-2"
          />
        </Link>
      </section>

      <CtaBand
        title="Want something like this?"
        body="Tell us what caught your eye and we will talk through what it would take."
        service={project.services[0]}
      />
    </>
  );
}
