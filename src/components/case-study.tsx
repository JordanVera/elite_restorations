import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CtaBand } from '@/components/cta-band';
import { ImageReveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { Photo } from '@/components/photo';
import type { CaseStudy } from '@/lib/case-studies';
import { servicePath } from '@/lib/services';
import { site } from '@/lib/site';

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const serviceHref = servicePath(study.serviceSlug);
  const photos = study.jobPhotos.length > 0 ? study.jobPhotos : study.examplePhotos.map((item) => item.image);
  const usingExamples = study.jobPhotos.length === 0;

  return (
    <>
      <PageHero
        eyebrow="Case study"
        title={study.lines}
        lede={study.lede}
        crumbs={[
          { name: 'Services', path: '/services' },
          { name: study.serviceLabel, path: serviceHref },
          { name: 'Case study', path: study.path },
        ]}
      >
        <p className="mt-8 text-sm text-muted-foreground">
          Google review by {study.reviewer}.{' '}
          <Link
            href={serviceHref}
            className="text-foreground underline decoration-foreground/30 underline-offset-[0.4em] hover:decoration-accent-ink"
          >
            {study.serviceLabel}
          </Link>
        </p>
      </PageHero>

      <section aria-labelledby="case-quote-heading" className="py-16 md:py-24">
        <div className="gutter mx-auto max-w-[46rem]">
          <p className="eyebrow text-accent-ink">Google review</p>
          <h2 id="case-quote-heading" className="sr-only">
            {study.reviewer}&apos;s review
          </h2>
          <blockquote className="font-display mt-6 text-3xl leading-snug md:text-4xl">
            {study.quote}
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">
            {study.reviewer}. Google review. 5 stars.
          </p>
        </div>
      </section>

      <section aria-labelledby="case-steps-heading" className="border-t border-border bg-surface py-20 md:py-28">
        <div className="gutter mx-auto max-w-[120rem]">
          <p className="eyebrow text-accent-ink">The usual sequence</p>
          <h2 id="case-steps-heading" className="font-display t-lg mt-4 max-w-[18ch]">
            What this kind of job involves.
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-2">
            {study.steps.map((step, index) => (
              <li key={step.title} className="border-t border-border pt-6">
                <p className="eyebrow text-accent-ink">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="font-display mt-3 text-3xl">{step.title}</h3>
                <p className="mt-3 max-w-[48ch] leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="case-photos-heading" className="border-t border-border py-20 md:py-28">
        <div className="gutter mx-auto max-w-[120rem]">
          <p className="eyebrow text-accent-ink">Photographs</p>
          <h2 id="case-photos-heading" className="font-display t-lg mt-4">
            {usingExamples ? 'The kind of work.' : 'The job.'}
          </h2>
          {usingExamples ? (
            <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
              These are existing project photographs. They are not labeled as{' '}
              {study.reviewer}&apos;s house.
            </p>
          ) : null}
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {photos.map((image) => (
              <li key={image.src}>
                <ImageReveal className="relative aspect-[4/3]">
                  <Photo image={image} sizes="(min-width: 640px) 46vw, 92vw" />
                </ImageReveal>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link
              href={`/contact?service=${encodeURIComponent(study.serviceSlug)}`}
              className="inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] hover:decoration-accent-ink"
            >
              Request an estimate
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="A job like this one?"
        body={`Call ${site.phone.display}. We look at the house you have before we describe the scope.`}
        service={study.serviceSlug}
        emergency={study.slug === 'water-heater-flood'}
      />
    </>
  );
}
