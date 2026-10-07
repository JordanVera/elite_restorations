'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  PLACEHOLDER_LABEL,
  isPlaceholderClip,
  stepVideo,
  type ProjectType,
  type VideoCategory,
} from '@/lib/resource-videos';
import { ctaHref } from '@/lib/site';
import { cn } from '@/lib/utils';

type Audience = 'homeowner' | 'realtor';

export function ProjectPlaylist({
  category,
  project,
  audience,
  categoryHref,
}: {
  category: VideoCategory;
  project: ProjectType;
  audience: Audience;
  categoryHref: string;
}) {
  const [index, setIndex] = React.useState(0);
  const buttonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const steps = project.steps;
  const step = steps[index] ?? steps[0];
  const video = stepVideo(step);
  const placeholder = isPlaceholderClip(step);
  const total = steps.length;

  function selectStep(next: number, focus = false) {
    const clamped = Math.min(total - 1, Math.max(0, next));
    setIndex(clamped);
    if (focus) buttonRefs.current[clamped]?.focus();
  }

  function onStepKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, current: number) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      selectStep(current + 1, true);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      selectStep(current - 1, true);
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectStep(0, true);
    } else if (event.key === 'End') {
      event.preventDefault();
      selectStep(total - 1, true);
    }
  }

  const estimateHref = `${ctaHref}?note=${encodeURIComponent(`Interested in ${project.name}.`)}`;

  return (
    <div>
      <Link
        href={categoryHref}
        className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {category.name}
      </Link>

      <h3 className="font-display t-md mt-6">{project.name}</h3>
      <p className="measure mt-4 text-muted-foreground">{project.summary}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:gap-12">
        <ol
          aria-label={`${project.name} steps`}
          className="border-t border-border"
        >
          {steps.map((item, i) => {
            const selected = i === index;
            return (
              <li key={item.title} className="border-b border-border">
                <button
                  ref={(node) => {
                    buttonRefs.current[i] = node;
                  }}
                  type="button"
                  aria-current={selected ? 'step' : undefined}
                  onClick={() => setIndex(i)}
                  onKeyDown={(event) => onStepKeyDown(event, i)}
                  className={cn(
                    'flex w-full items-baseline gap-4 py-4 text-left transition-colors',
                    selected ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span className="eyebrow shrink-0 text-accent-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-xl leading-tight">{item.title}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div>
          <div className="relative border border-border bg-surface">
            {placeholder && (
              <p className="eyebrow absolute top-4 left-4 z-10 bg-background/92 px-3 py-2 text-accent-ink">
                {PLACEHOLDER_LABEL}
              </p>
            )}
            {video.kind === 'youtube' ? (
              <iframe
                key={video.src + step.title}
                className="aspect-video w-full"
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.src)}`}
                title={placeholder ? `${step.title}. ${PLACEHOLDER_LABEL}` : step.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                key={video.src + step.title}
                className="aspect-video w-full bg-black"
                controls
                playsInline
                preload="metadata"
                src={video.src}
                aria-label={placeholder ? `${step.title}. ${PLACEHOLDER_LABEL}` : step.title}
              />
            )}
          </div>

          <p className="mt-6 text-lg leading-relaxed">{step.description}</p>
          <p className="eyebrow mt-4 text-muted-foreground" aria-live="polite">
            Step {index + 1} of {total}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => selectStep(index - 1)}
              disabled={index === 0}
            >
              <ArrowLeft className="size-4" aria-hidden />
              Previous
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={() => selectStep(index + 1)}
              disabled={index === total - 1}
            >
              Next
              <ArrowRight className="arrow" aria-hidden />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-8">
        {audience === 'homeowner' ? (
          <p className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground">
              Interested in this type of work?
            </span>
            <Button asChild variant="accent">
              <Link href={estimateHref}>
                Get a free estimate
                <ArrowRight className="arrow" aria-hidden />
              </Link>
            </Button>
          </p>
        ) : (
          <p className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground">
              Have a client who needs this type of work?
            </span>
            <Button asChild variant="outline">
              <Link href="#partner-form">
                Refer this type of work
                <ArrowRight className="arrow" aria-hidden />
              </Link>
            </Button>
          </p>
        )}
      </div>
    </div>
  );
}
