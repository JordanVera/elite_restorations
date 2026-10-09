import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

type Opening = {
  id: string;
  mark: string;
  name: string;
  note: string;
  schedule: string;
  href: string | null;
  compact?: boolean;
  swing?: 'bl' | 'br';
  className: string;
};

const openings: readonly Opening[] = [
  {
    id: 'entry',
    mark: 'D-01',
    name: 'Entry',
    note: 'Front door',
    schedule: 'Back to the front of the house',
    href: '/',
    swing: 'bl',
    className: 'col-start-1 col-span-3 row-start-1 row-span-2',
  },
  {
    id: 'kitchen',
    mark: 'D-02',
    name: 'Kitchen',
    note: 'Gather here',
    schedule: 'Kitchen remodeling',
    href: '/services/kitchen-remodeling',
    swing: 'bl',
    className: 'col-start-4 col-span-5 row-start-1 row-span-3',
  },
  {
    id: 'bath',
    mark: 'D-03',
    name: 'Bath',
    note: 'Tile and light',
    schedule: 'Bathroom remodeling',
    href: '/services/bathroom-remodeling',
    swing: 'br',
    className: 'col-start-9 col-span-4 row-start-1 row-span-2',
  },
  {
    id: 'living',
    mark: 'D-04',
    name: 'Living',
    note: 'Finished work',
    schedule: 'Projects we have closed out',
    href: '/projects',
    swing: 'bl',
    className: 'col-start-1 col-span-3 row-start-3 row-span-3',
  },
  {
    id: 'omit',
    mark: '—',
    name: '404',
    note: 'Not on the drawings',
    schedule: 'This page is not on the drawings',
    href: null,
    className: 'col-start-4 col-span-5 row-start-4 row-span-2',
  },
  {
    id: 'study',
    mark: 'D-05',
    name: 'Study',
    note: `Since ${site.founded}`,
    schedule: 'The family behind the work',
    href: '/about',
    swing: 'br',
    className: 'col-start-9 col-span-4 row-start-3 row-span-3',
  },
  {
    id: 'porch',
    mark: 'D-06',
    name: 'Porch',
    note: 'Start a project',
    schedule: 'Tell us about the job',
    href: '/contact',
    compact: true,
    className: 'col-start-1 col-span-8 row-start-6',
  },
  {
    id: 'hall',
    mark: 'D-07',
    name: 'Hall',
    note: 'All services',
    schedule: 'Every trade under one roof',
    href: '/services',
    compact: true,
    className: 'col-start-9 col-span-4 row-start-6',
  },
];

const linkedIds = openings
  .filter((opening) => opening.href)
  .map((opening) => opening.id);

const planHoverCss = linkedIds
  .map(
    (id) => `
.missing-sheet:is(:has([data-room="${id}"]:hover), :has([data-room="${id}"]:focus-visible)) [data-room="${id}"] {
  background-color: var(--surface);
}
.missing-sheet:is(:has([data-room="${id}"]:hover), :has([data-room="${id}"]:focus-visible)) [data-room="${id}"] .room-rule {
  transform: scaleX(1);
}
.missing-sheet:is(:has([data-room="${id}"]:hover), :has([data-room="${id}"]:focus-visible)) [data-room="${id}"] .room-name {
  color: var(--accent-ink);
}
.missing-sheet:is(:has([data-room="${id}"]:hover), :has([data-room="${id}"]:focus-visible)) [data-room="${id}"] .room-arrow {
  opacity: 1;
  transform: translateX(0.25rem);
}
.missing-sheet:is(:has([data-room="${id}"]:hover), :has([data-room="${id}"]:focus-visible)) [data-room="${id}"] .room-swing {
  color: var(--accent-ink);
}
`,
  )
  .join('\n');

function Line({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: string;
}) {
  return (
    <span className="block overflow-hidden">
      <span className="anim-line-up block" style={{ ['--d' as string]: delay }}>
        {children}
      </span>
    </span>
  );
}

function NorthMark() {
  return (
    <div className="flex items-center gap-2 text-muted-foreground" aria-hidden>
      <svg viewBox="0 0 20 32" className="h-7 w-4">
        <polygon points="10,1 15,16 10,13 5,16" fill="currentColor" />
        <polygon
          points="10,31 15,16 10,19 5,16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <span className="eyebrow">North</span>
    </div>
  );
}

function DoorSwing({ corner, delay }: { corner: 'bl' | 'br'; delay: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className={cn(
        'room-swing pointer-events-none absolute size-16 text-foreground/40 md:size-24',
        corner === 'br' ? 'right-0 bottom-0 -scale-x-100' : 'bottom-0 left-0',
      )}
    >
      <path d="M4 60 V8" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 8 A52 52 0 0 1 56 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        style={{
          animation: `draw 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
        }}
      />
    </svg>
  );
}

function RoomLabel({
  opening,
  compact,
}: {
  opening: Opening;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        'relative z-10 flex gap-3',
        compact ? 'items-baseline' : 'flex-col',
      )}
    >
      <span className="eyebrow text-muted-foreground" aria-hidden>
        {opening.mark}
      </span>
      <span>
        <span
          className={cn(
            'room-name font-display block leading-none transition-colors duration-500',
            compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-[1.85rem]',
          )}
        >
          {opening.name}
        </span>
        <span className="mt-1 block text-[0.68rem] tracking-wide text-muted-foreground uppercase">
          {opening.note}
        </span>
      </span>
    </span>
  );
}

function OmitRoom({ opening }: { opening: Opening }) {
  return (
    <div
      data-room={opening.id}
      className={cn(
        'relative flex h-full flex-col items-center justify-center overflow-hidden bg-background px-3 text-center',
        opening.className,
      )}
      style={{
        backgroundImage:
          'repeating-linear-gradient(-45deg, transparent 0 7px, color-mix(in oklab, var(--accent) 16%, transparent) 7px 8px)',
      }}
    >
      <span
        aria-hidden
        className="omit-frame pointer-events-none absolute inset-2 border border-dashed border-accent md:inset-3"
      />
      <span className="font-display text-[clamp(2.8rem,5vw,4.75rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_var(--accent)]">
        404
      </span>
      <span className="eyebrow mt-3 text-accent-ink">Not on the drawings</span>
    </div>
  );
}

function PlanRoom({ opening, index }: { opening: Opening; index: number }) {
  if (!opening.href) return <OmitRoom opening={opening} />;

  return (
    <Link
      href={opening.href}
      data-room={opening.id}
      aria-label={`${opening.name}, ${opening.schedule}`}
      className={cn(
        'group relative flex h-full overflow-hidden bg-background p-3 text-foreground transition-colors duration-500 md:p-4',
        opening.compact
          ? 'items-center justify-between gap-4'
          : 'flex-col justify-between',
        opening.className,
      )}
    >
      <span
        aria-hidden
        className="room-rule absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo"
      />
      <RoomLabel opening={opening} compact={opening.compact} />
      {opening.swing && (
        <DoorSwing corner={opening.swing} delay={0.35 + index * 0.07} />
      )}
      <ArrowUpRight
        aria-hidden
        className="room-arrow absolute right-3 bottom-3 size-4 opacity-0 transition-all duration-500 ease-out-expo"
      />
    </Link>
  );
}

function TitleBlock() {
  const cells = [
    { label: 'Project', value: site.name, detail: site.locality },
    { label: 'Sheet', value: 'A-404', detail: 'Floor plan' },
    { label: 'Scale', value: 'Not to scale', detail: 'North is up' },
    {
      label: 'Revision',
      value: '1 — Omitted',
      detail: `Since ${site.founded}`,
    },
  ];

  return (
    <dl className="mt-4 grid grid-cols-2 border border-foreground/25 sm:grid-cols-4">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="border-foreground/20 px-4 py-3 max-sm:odd:border-r max-sm:[&:nth-child(-n+2)]:border-b sm:[&:not(:last-child)]:border-r"
        >
          <dt className="eyebrow text-muted-foreground">{cell.label}</dt>
          <dd className="font-display mt-2 text-xl leading-none md:text-2xl">
            {cell.value}
          </dd>
          <dd className="mt-1.5 text-xs text-muted-foreground">
            {cell.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function MissingSheet() {
  const omitted = openings.find((opening) => !opening.href);
  const schedule = omitted
    ? [omitted, ...openings.filter((opening) => opening.href)]
    : openings.filter((opening) => opening.href);

  return (
    <section
      aria-labelledby="missing-heading"
      className="missing-sheet pt-24 pb-16 sm:pt-28 md:pb-28"
    >
      <style>{planHoverCss}</style>
      <div className="gutter mx-auto max-w-[120rem]">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-border pb-4">
          <p className="eyebrow text-muted-foreground">Sheet A-404</p>
          <p className="eyebrow inline-flex items-center gap-2 text-accent-ink">
            <span
              aria-hidden
              className="inline-block size-0 border-x-[5px] border-b-[9px] border-x-transparent border-b-accent"
            />
            Rev 1 · Page omitted
          </p>
          <p className="eyebrow hidden text-muted-foreground sm:block">
            {site.locality} · Since {site.founded}
          </p>
        </div>

        <div className="mt-8 grid items-end gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-x-16">
          <h1
            id="missing-heading"
            className="font-display text-[clamp(3.1rem,6.4vw,6.5rem)] leading-[0.9] tracking-[-0.035em] lg:col-span-7"
          >
            <Line delay="0s">This room</Line>
            <Line delay="0.08s">
              <em className="text-accent-ink">was never</em>
            </Line>
            <Line delay="0.16s">framed.</Line>
          </h1>

          <div
            className="anim-fade-up lg:col-span-5 lg:pb-3"
            style={{ ['--d' as string]: '0.28s' }}
          >
            <p className="max-w-[36ch] text-lg leading-relaxed text-muted-foreground">
              The address you followed is not on the drawings. Every other room
              is. Walk through one.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button asChild variant="accent" size="lg">
                <Link href="/">
                  Start at the front door
                  <ArrowUpRight className="arrow" aria-hidden />
                </Link>
              </Button>
              <a
                href={site.phone.href}
                className="text-lg tracking-wide underline underline-offset-[0.5em] transition-colors hover:text-accent-ink"
              >
                {site.phone.display}
              </a>
            </div>
            <p className="mt-6 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
              If water is coming in, skip the sheet and{' '}
              <Link
                href="/emergency"
                className="underline underline-offset-[0.5em] transition-colors hover:text-accent-ink"
              >
                start with emergency
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          <div className="mb-4 flex items-end justify-between gap-6">
            <p className="eyebrow text-muted-foreground">
              Floor plan · Greater Houston
            </p>
            <NorthMark />
          </div>

          <div className="overflow-x-auto pb-1">
            <div className="min-w-[44rem]">
              <nav aria-label="Floor plan" className="bg-foreground p-[7px]">
                <div className="grid h-[32rem] grid-cols-12 grid-rows-6 gap-[6px] bg-foreground md:h-[40rem]">
                  {openings.map((opening, index) => (
                    <PlanRoom
                      key={opening.id}
                      opening={opening}
                      index={index}
                    />
                  ))}
                </div>
              </nav>
              <div
                className="mt-3 flex items-center gap-3 text-muted-foreground"
                aria-hidden
              >
                <span className="h-2 w-px bg-current opacity-50" />
                <span className="h-px flex-1 bg-current opacity-35" />
                <span className="eyebrow">Not to scale</span>
                <span className="h-px flex-1 bg-current opacity-35" />
                <span className="h-2 w-px bg-current opacity-50" />
              </div>
            </div>
          </div>
          <p className="eyebrow mt-3 text-muted-foreground lg:hidden">
            Slide to read the plan
          </p>

          <TitleBlock />
        </div>

        <nav aria-label="Room schedule" className="mt-16 md:mt-24">
          <p className="eyebrow text-muted-foreground">Room schedule</p>
          <ul className="mt-6">
            {schedule.map((opening) => (
              <li
                key={opening.id}
                className="border-t border-border last:border-b"
              >
                {opening.href ? (
                  <Link
                    href={opening.href}
                    data-room={opening.id}
                    aria-label={`${opening.name}, ${opening.schedule}`}
                    className="grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-4 py-4 transition-colors duration-500 md:grid-cols-[5rem_10rem_1fr_auto] md:py-5"
                  >
                    <span className="eyebrow text-muted-foreground" aria-hidden>
                      {opening.mark}
                    </span>
                    <span className="room-name font-display text-2xl leading-none transition-colors duration-500 md:text-3xl">
                      {opening.name}
                    </span>
                    <span className="hidden text-muted-foreground md:block">
                      {opening.schedule}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="room-arrow size-4 opacity-40 transition-all duration-500"
                    />
                  </Link>
                ) : (
                  <div
                    data-room={opening.id}
                    className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 py-4 text-accent-ink md:grid-cols-[5rem_10rem_1fr] md:py-5"
                  >
                    <span className="eyebrow" aria-hidden>
                      {opening.mark}
                    </span>
                    <span className="font-display text-2xl leading-none md:text-3xl">
                      Omit
                    </span>
                    <span className="col-start-2 text-sm md:col-start-3 md:text-base">
                      {opening.schedule}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
