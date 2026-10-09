'use client';

import { Reveal, SplitLines } from '@/components/motion';
import { Photo } from '@/components/photo';
import { Tabs, type TabItem } from '@/components/ui/tabs';
import { img, type Img } from '@/lib/images';
import { processSteps, type ProcessStep } from '@/lib/process';

const visuals = [
  img(
    '/images/projects/kitchens/gray-cabinets-marble-backsplash.jpg',
    'Roofer working on a brick and cream-siding home on a sunny day',
  ),
  img(
    '/images/projects/fireplaces/linear-marble-wall.jpg',
    'Close detail of dark espresso wood plank flooring',
  ),
  img(
    '/images/projects/siding/rear-deck-glass-doors.jpg',
    'Home exterior mid-project with ladders and new siding going up',
  ),
  img(
    '/images/projects/bathrooms/charcoal-bath-patterned-shower.jpg',
    'Roofer on a ladder installing underlayment on a roof deck',
  ),
  img(
    '/images/projects/backsplash/gold-faucet-detail.webp',
    'Detail of a gold faucet against tile in a finished kitchen',
  ),
  img(
    '/images/projects/bathrooms/freestanding-tub-window.jpg',
    'Finished bathroom with a freestanding tub beside a window',
  ),
];

function ProcessCard({ step, image }: { step: ProcessStep; image: Img }) {
  return (
    <article className="grid overflow-hidden border border-border bg-surface shadow-[0_28px_70px_-40px_rgba(0,0,0,0.7)] lg:grid-cols-12">
      <div className="relative aspect-[5/4] lg:col-span-5 lg:aspect-auto lg:min-h-80">
        <Photo image={image} sizes="(min-width: 1024px) 38vw, 92vw" />
      </div>
      <div className="flex flex-col justify-center px-6 py-8 sm:px-10 lg:col-span-7 lg:px-14 lg:py-12">
        <p className="eyebrow text-accent-ink">Step {step.index}</p>
        <h3 className="font-display mt-3 text-[clamp(2.5rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.03em]">
          {step.title}
        </h3>
        <p className="mt-5 max-w-[34ch] font-display text-[clamp(1.25rem,1.8vw,1.7rem)] leading-snug text-foreground/90">
          {step.lead}
        </p>
        <p className="mt-4 max-w-[48ch] leading-relaxed text-muted-foreground">{step.body}</p>
      </div>
    </article>
  );
}

export function HomeProcess() {
  const tabs: TabItem[] = processSteps.map((step, index) => ({
    value: step.index,
    title: (
      <span className="flex min-w-0 flex-col items-start gap-2">
        <span className="eyebrow text-muted-foreground transition-colors group-data-[active]:text-accent-ink">
          {step.index}
        </span>
        <span className="font-display text-[clamp(1.15rem,1.55vw,1.85rem)] leading-none whitespace-nowrap text-muted-foreground transition-colors group-hover:text-foreground group-data-[active]:text-foreground">
          {step.title}
        </span>
      </span>
    ),
    content: <ProcessCard step={step} image={visuals[index]} />,
  }));

  return (
    <section aria-labelledby="process-heading" className="relative py-28 md:py-40">
      <div className="gutter mx-auto max-w-[120rem]">
        <div className="grid gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-muted-foreground">Process</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="process-heading"
              className="t-xl mt-6"
              lines={[
                'Six steps.',
                <span key="b">
                  No <em className="text-accent-ink">guesswork.</em>
                </span>,
              ]}
            />
          </div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.15}>
              <p className="text-muted-foreground">
                Whether it is a bathroom or a roof, the sequence is the same:
                look closely, agree on the plan, prepare, build, finish, and
                walk it together.
              </p>
            </Reveal>
          </div>
        </div>

        <Tabs
          tabs={tabs}
          className="mt-14 md:mt-20"
          containerClassName="grid grid-cols-2 gap-x-4 sm:grid-cols-3 lg:grid-cols-6"
          tabClassName="border-b border-border px-1 pt-2 pb-4"
        />
      </div>
    </section>
  );
}
