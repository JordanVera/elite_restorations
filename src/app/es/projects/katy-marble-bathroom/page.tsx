import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { ImageReveal, Reveal } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { ProjectGallery, ProjectPhotoButton } from "@/components/project-gallery";
import { StoryCopy } from "@/components/story-copy";
import { katyBathStoryEs } from "@/lib/es/project-stories";
import { languageAlternates, pageMetadata } from "@/lib/seo";

const story = katyBathStoryEs;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: story.metaTitle,
    description: story.description,
    path: story.path,
    image: story.cover.src,
    locale: "es",
    languages: languageAlternates(story.englishPath, story.path),
  });
}

export default function SpanishKatyBathStoryPage() {
  const coverIndex = story.gallery.findIndex((image) => image.src === story.cover.src);

  return (
    <>
      <PageHero
        eyebrow={story.category}
        title={[story.title]}
        lede={story.tagline}
        homeCrumb={{ name: "Inicio", path: "/es" }}
        crumbs={[
          { name: "Proyectos", path: "/projects" },
          { name: story.title, path: story.path },
        ]}
      />

      <ProjectGallery images={story.gallery}>
        <div className="gutter mx-auto max-w-[120rem] pt-12 md:pt-16">
          <ImageReveal immediate className="relative aspect-[4/3] w-full md:aspect-[21/9]">
            {coverIndex >= 0 ? (
              <ProjectPhotoButton index={coverIndex} alt={story.cover.alt} className="absolute inset-0">
                <Photo image={story.cover} sizes="(min-width: 1920px) 1800px, 96vw" priority />
              </ProjectPhotoButton>
            ) : (
              <Photo image={story.cover} sizes="(min-width: 1920px) 1800px, 96vw" priority />
            )}
          </ImageReveal>
        </div>

        <section aria-labelledby="story-heading" className="py-20 md:py-28">
          <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-accent-ink">Sobre este trabajo</p>
                <h2 id="story-heading" className="sr-only">
                  Sobre {story.title}
                </h2>
              </Reveal>
              <div className="mt-6 space-y-7">
                {story.summary.map((paragraph, index) => (
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
                {story.notes.map((note) => (
                  <li key={note} className="border-b border-border py-4 leading-relaxed">
                    {note}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <p className="eyebrow text-accent-ink">Servicios relacionados</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {story.services.map((service) => (
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
              {story.reading && story.reading.length > 0 && (
                <div className="mt-10">
                  <p className="eyebrow text-accent-ink">Lectura relacionada</p>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {story.reading.map((link) => (
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

        <section aria-label={`Fotos de ${story.title}`} className="pb-20 md:pb-28">
          <div className="gutter mx-auto max-w-[120rem]">
            <ul className="gap-6 sm:columns-2 xl:columns-3">
              {story.gallery.map((image, index) => (
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
          href="/projects"
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
        title={story.ctaTitle}
        body={story.cta}
        href="/es/contact"
        buttonLabel="Pedir un estimado"
        textLabel="Envíanos un texto"
      />
    </>
  );
}
