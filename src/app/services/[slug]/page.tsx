import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, Phone } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { ImageReveal, Reveal } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { processSteps } from "@/lib/process";
import { projectsForService } from "@/lib/projects";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { getService, services } from "@/lib/services";
import { emergencyHref, site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: service.image.src,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const steps =
    service.process ?? processSteps.map((step) => ({ title: step.title, body: `${step.lead} ${step.body}` }));
  const related = service.related.map((s) => getService(s)).filter((s) => !!s);
  const relatedProjects = projectsForService(service.slug).slice(0, 3);
  const path = `/services/${service.slug}`;

  return (
    <>
      <PageHero
        eyebrow={service.group}
        title={[service.name]}
        lede={service.tagline}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path },
        ]}
      >
        {service.emergency && (
          <Reveal delay={0.5} className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
            <a
              href={site.phone.href}
              className="group inline-flex items-center gap-4 border border-accent-ink px-5 py-4 transition-colors hover:bg-accent hover:text-white"
            >
              <Phone className="size-4 text-accent-ink group-hover:text-white" aria-hidden />
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.2em]">
                Active leak or storm damage? Call {site.phone.display}
              </span>
            </a>
            <Link
              href={emergencyHref}
              className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
            >
              Request help online
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/insurance-log"
              className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink"
            >
              Insurance photo log
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        )}
      </PageHero>

      <div className="gutter mx-auto max-w-[120rem] pt-12 md:pt-16">
        <ImageReveal immediate className="relative aspect-[16/10] w-full md:aspect-[21/9]">
          <Photo image={service.image} sizes="(min-width: 1920px) 1800px, 96vw" priority />
        </ImageReveal>
      </div>

      <section aria-labelledby="scope-heading" className="py-20 md:py-28">
        <div className="gutter mx-auto grid max-w-[120rem] gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-accent-ink">The work</p>
              <h2 id="scope-heading" className="sr-only">
                About {service.name}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-7">
              {service.intro.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className={i === 0 ? "font-display text-3xl leading-snug md:text-4xl" : "measure text-lg leading-relaxed text-muted-foreground"}>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="eyebrow text-accent-ink">What is included</p>
            <ul className="mt-6 border-t border-border">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-4 border-b border-border py-4">
                  <Check className="mt-1 size-4 shrink-0 text-accent-ink" aria-hidden />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            {service.materials && (
              <div className="mt-10">
                <p className="eyebrow text-accent-ink">{service.materials.label}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {service.materials.items.join(" · ")}
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="steps-heading"
        className="border-y border-border bg-surface py-20 md:py-28"
      >
        <div className="gutter mx-auto max-w-[120rem]">
          <Reveal>
            <p className="eyebrow text-accent-ink">How it goes</p>
            <h2 id="steps-heading" className="font-display t-lg mt-4 max-w-[16ch]">
              What to expect, step by step.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={(i % 3) * 0.08} className="border-t border-border pt-6">
                  <span className="font-display text-5xl text-accent-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-4 text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-[42ch] leading-relaxed text-muted-foreground">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section aria-labelledby="projects-heading" className="py-20 md:py-28">
          <div className="gutter mx-auto max-w-[120rem]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal>
                <p className="eyebrow text-accent-ink">Related work</p>
                <h2 id="projects-heading" className="font-display t-lg mt-4">
                  Seen in the field.
                </h2>
              </Reveal>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.2em]"
              >
                All projects
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
            <ul className="mt-12 grid gap-8 md:grid-cols-3">
              {relatedProjects.map((project, i) => (
                <li key={project.slug} className={i === 1 ? "md:mt-16" : undefined}>
                  <Link href={`/projects/${project.slug}`} className="group block">
                    <ImageReveal className="relative aspect-[4/5]">
                      <Photo
                        image={project.cover}
                        sizes="(min-width: 768px) 30vw, 92vw"
                        className="transition-transform duration-[1400ms] ease-out-expo group-hover:scale-105"
                      />
                    </ImageReveal>
                    <p className="eyebrow mt-5 text-muted-foreground">{project.category}</p>
                    <p className="font-display mt-2 text-2xl leading-snug transition-colors group-hover:text-accent-ink md:text-3xl">
                      {project.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {service.faqs.length > 0 && (
        <section
          aria-labelledby="faq-heading"
          className="border-t border-border py-20 md:py-28"
        >
          <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-accent-ink">Questions</p>
              <h2 id="faq-heading" className="font-display t-lg mt-4">
                Good to know.
              </h2>
            </Reveal>
            <div className="lg:col-span-8">
              <Faq items={service.faqs} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-border py-16 md:py-20">
          <div className="gutter mx-auto max-w-[120rem]">
            <h2 id="related-heading" className="eyebrow text-muted-foreground">
              Often paired with
            </h2>
            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group inline-flex items-center gap-2 font-display text-3xl transition-colors hover:text-accent-ink"
                  >
                    {r.name}
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-accent-ink transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title={service.emergency ? "Water coming in or a roof open?" : `Planning ${service.name.toLowerCase()}?`}
        body={
          service.emergency
            ? "Call first if you can. Otherwise tell us what happened and we will call you back."
            : "Share a few details and we will follow up to schedule a walkthrough."
        }
        service={service.slug}
        emergency={service.emergency}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          serviceType: service.name,
          description: service.metaDescription,
          url: absoluteUrl(path),
          image: absoluteUrl(service.image.src),
          provider: { "@id": `${site.url}/#business` },
          areaServed: { "@type": "AdministrativeArea", name: "Greater Houston, Texas" },
        }}
      />
    </>
  );
}
