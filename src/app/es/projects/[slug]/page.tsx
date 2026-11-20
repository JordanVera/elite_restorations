import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { ImageReveal, Reveal } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { bleedPhotoSizes, Photo } from "@/components/photo";
import { ProjectGallery, ProjectPhotoButton } from "@/components/project-gallery";
import { StoryCopy } from "@/components/story-copy";
import { esProjectPages, getEsProjectPage } from "@/lib/es/project-pages";
import { getProject } from "@/lib/projects";
import { languageAlternates, pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return esProjectPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getEsProjectPage(slug);
  const project = getProject(slug);
  if (!page || !project) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.description,
    path: page.path,
    image: project.cover.src,
    locale: "es",
    languages: languageAlternates(page.englishPath, page.path),
  });
}

export default async function SpanishProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getEsProjectPage(slug);
  const project = getProject(slug);
  if (!page || !project) notFound();

  const images = project.gallery.map((image, index) => ({
    ...image,
    alt: page.alts?.[index] ?? `${page.title}. Foto del trabajo de Elite Restorations en Houston.`,
  }));
  const cover = images.find((image) => image.src === project.cover.src) ?? images[0];
  const coverIndex = images.findIndex((image) => image.src === cover?.src);

  return (
    <>
      <PageHero
        eyebrow={page.category}
        title={[page.title]}
        lede={page.tagline}
        homeCrumb={{ name: "Inicio", path: "/es" }}
        crumbs={[
          { name: "Proyectos", path: "/es/projects" },
          { name: page.title, path: page.path },
        ]}
      />

      <ProjectGallery images={images}>
        <div className="gutter mx-auto max-w-[120rem] pt-12 md:pt-16">
          <ImageReveal immediate className="relative aspect-[4/3] w-full md:aspect-[21/9]">
            {cover && coverIndex >= 0 ? (
              <ProjectPhotoButton index={coverIndex} alt={cover.alt} className="absolute inset-0">
                <Photo image={cover} sizes={bleedPhotoSizes} priority />
              </ProjectPhotoButton>
            ) : cover ? (
              <Photo image={cover} sizes={bleedPhotoSizes} priority />
            ) : null}
          </ImageReveal>
        </div>

        <section aria-labelledby="story-heading" className="py-20 md:py-28">
          <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-accent-ink">Sobre este trabajo</p>
                <h2 id="story-heading" className="sr-only">
                  Sobre {page.title}
                </h2>
              </Reveal>
              <div className="mt-6 space-y-7">
                {page.summary.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={index * 0.08}>
                    <p
                      className={
                        index === 0
                          ? "font-display text-3xl leading-snug md:text-4xl"
                          : "measure text-lg leading-relaxed text-muted-foreground"
                      }
                    >
                      <StoryCopy text={paragraph} />
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal className="lg:col-span-5" delay={0.15}>
              <p className="eyebrow text-accent-ink">En las fotos</p>
              <ul className="mt-6 border-t border-border">
                {page.notes.map((note) => (
                  <li key={note} className="border-b border-border py-4 leading-relaxed">
                    {note}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <p className="eyebrow text-accent-ink">Servicios relacionados</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {page.services.map((service) => (
                    <li key={service.href}>
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-1.5 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:text-accent-ink hover:decoration-accent-ink"
                      >
                        {service.label}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {page.reading && page.reading.length > 0 && (
                <div className="mt-10">
                  <p className="eyebrow text-accent-ink">Lectura relacionada</p>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {page.reading.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-1.5 underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:text-accent-ink hover:decoration-accent-ink"
                        >
                          {link.label}
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

        <section aria-label={`Fotos de ${page.title}`} className="pb-20 md:pb-28">
          <div className="gutter mx-auto max-w-[120rem]">
            <ul className="gap-6 sm:columns-2 xl:columns-3">
              {images.map((image, index) => (
                <li key={image.src} className="mb-6 break-inside-avoid">
                  <ImageReveal delay={(index % 3) * 0.08}>
                    <ProjectPhotoButton index={index} alt={image.alt}>
                      <Photo
                        image={image}
                        intrinsic
                        sizes="(min-width: 1280px) 31vw, (min-width: 640px) 48vw, 94vw"
                      />
                    </ProjectPhotoButton>
                  </ImageReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ProjectGallery>

      <section aria-label="Todos los proyectos" className="border-t border-border">
        <Link
          href="/es/projects"
          className="group gutter mx-auto flex max-w-[120rem] items-center justify-between gap-8 py-16 md:py-24"
        >
          <span>
            <span className="eyebrow text-muted-foreground">Proyectos</span>
            <span className="font-display t-lg mt-3 block transition-colors duration-500 group-hover:text-accent-ink">
              Todos los proyectos
            </span>
          </span>
          <ArrowRight
            aria-hidden
            className="size-10 shrink-0 text-accent-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-2"
          />
        </Link>
      </section>

      <CtaBand
        title={page.ctaTitle}
        body={page.cta}
        href="/es/contact"
        buttonLabel="Pedir un estimado"
        textLabel="Envíanos un texto"
      />
    </>
  );
}
