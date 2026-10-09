'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

const VB_W = 1000;
const VB_H = 980;

const L = 72;
const T = 86;
const R = 928;
const B = 910;
const VX = 468;

const Y_LIVING = 268;
const Y_VOID = 700;
const Y_KITCHEN = 300;
const Y_BATH = 520;

const WIDTH_FT = 42;
const DEPTH_FT = 36;

const drawEase = [0.65, 0, 0.35, 1] as const;

type Box = { x: number; y: number; w: number; h: number };

const rooms: readonly {
  id: string;
  href: string;
  index: string;
  name: string;
  hint: string;
  box: Box;
}[] = [
  {
    id: 'living',
    href: '/',
    index: '01',
    name: 'Living',
    hint: 'Back home',
    box: { x: L, y: T, w: VX - L, h: Y_LIVING - T },
  },
  {
    id: 'kitchen',
    href: '/services/kitchen-remodeling',
    index: '02',
    name: 'Kitchen',
    hint: 'Kitchen remodeling',
    box: { x: VX, y: T, w: R - VX, h: Y_KITCHEN - T },
  },
  {
    id: 'bath',
    href: '/services/bathroom-remodeling',
    index: '03',
    name: 'Bath',
    hint: 'Bathroom remodeling',
    box: { x: VX, y: Y_KITCHEN, w: R - VX, h: Y_BATH - Y_KITCHEN },
  },
  {
    id: 'gallery',
    href: '/projects',
    index: '04',
    name: 'Gallery',
    hint: 'Finished work',
    box: { x: VX, y: Y_BATH, w: R - VX, h: B - Y_BATH },
  },
  {
    id: 'entry',
    href: '/contact',
    index: '05',
    name: 'Entry',
    hint: 'Request a visit',
    box: { x: L, y: Y_VOID, w: VX - L, h: B - Y_VOID },
  },
];

const voidBox: Box = { x: L, y: Y_LIVING, w: VX - L, h: Y_VOID - Y_LIVING };

function boxStyle(box: Box): React.CSSProperties {
  return {
    left: `${(box.x / VB_W) * 100}%`,
    top: `${(box.y / VB_H) * 100}%`,
    width: `${(box.w / VB_W) * 100}%`,
    height: `${(box.h / VB_H) * 100}%`,
  };
}

function contains(box: Box, x: number, y: number) {
  return x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h;
}

function formatFeet(value: number) {
  const clamped = Math.max(0, value);
  let feet = Math.floor(clamped);
  let inches = Math.round((clamped - feet) * 12);
  if (inches === 12) {
    feet += 1;
    inches = 0;
  }
  return `${feet}'-${inches}"`;
}

function revisionCloud(x: number, y: number, w: number, h: number, bump = 28) {
  const edges: Array<[number, number, number, number]> = [
    [x, y, x + w, y],
    [x + w, y, x + w, y + h],
    [x + w, y + h, x, y + h],
    [x, y + h, x, y],
  ];
  const pts: Array<[number, number]> = [];
  for (const [x1, y1, x2, y2] of edges) {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const n = Math.max(2, Math.round(len / bump));
    for (let i = 0; i < n; i++) {
      const t = i / n;
      pts.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]);
    }
  }
  const r = (bump / 2).toFixed(2);
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < pts.length; i++) {
    const next = pts[(i + 1) % pts.length];
    d += ` A ${r} ${r} 0 0 1 ${next[0].toFixed(2)} ${next[1].toFixed(2)}`;
  }
  return `${d} Z`;
}

function horizontalWindow(x1: number, x2: number, y: number) {
  const o = 9;
  return `M ${x1} ${y - o} H ${x2} M ${x1} ${y + o} H ${x2} M ${x1} ${y - o} V ${y + o} M ${x2} ${y - o} V ${y + o} M ${x1} ${y} H ${x2}`;
}

function verticalWindow(y1: number, y2: number, x: number) {
  const o = 9;
  return `M ${x - o} ${y1} V ${y2} M ${x + o} ${y1} V ${y2} M ${x - o} ${y1} H ${x + o} M ${x - o} ${y2} H ${x + o} M ${x} ${y1} V ${y2}`;
}

const exterior = [
  `M ${L} ${T} H 640`,
  `M 820 ${T} H ${R}`,
  `M ${R} ${T} V 620`,
  `M ${R} 760 V ${B}`,
  `M ${R} ${B} H 270`,
  `M 150 ${B} H ${L}`,
  `M ${L} ${B} V 540`,
  `M ${L} 400 V ${T}`,
].join(' ');

const interior = [
  `M ${VX} ${T} V 140`,
  `M ${VX} 210 V ${B}`,
  `M ${L} ${Y_LIVING} H 170`,
  `M 280 ${Y_LIVING} H ${VX}`,
  `M ${L} ${Y_VOID} H 190`,
  `M 330 ${Y_VOID} H ${VX}`,
  `M ${VX} ${Y_KITCHEN} H 660`,
  `M 780 ${Y_KITCHEN} H ${R}`,
  `M ${VX} ${Y_BATH} H 640`,
  `M 760 ${Y_BATH} H ${R}`,
].join(' ');

const windows = [
  horizontalWindow(640, 820, T),
  verticalWindow(400, 540, L),
  verticalWindow(620, 760, R),
].join(' ');

const jambs = [
  `M ${VX - 8} 140 H ${VX + 8}`,
  `M ${VX - 8} 210 H ${VX + 8}`,
  `M 190 ${Y_VOID - 8} V ${Y_VOID + 8}`,
  `M 330 ${Y_VOID - 8} V ${Y_VOID + 8}`,
].join(' ');

const doors = [
  `M 280 ${Y_LIVING} A 110 110 0 0 0 170 ${Y_LIVING - 110}`,
  `M 170 ${Y_LIVING} V ${Y_LIVING - 110}`,
  `M 270 ${B} A 120 120 0 0 0 150 ${B - 120}`,
  `M 150 ${B} V ${B - 120}`,
  `M 780 ${Y_KITCHEN} A 120 120 0 0 1 660 ${Y_KITCHEN + 120}`,
  `M 660 ${Y_KITCHEN} V ${Y_KITCHEN + 120}`,
  `M 760 ${Y_BATH} A 120 120 0 0 1 640 ${Y_BATH + 120}`,
  `M 640 ${Y_BATH} V ${Y_BATH + 120}`,
].join(' ');

const cloud = revisionCloud(
  voidBox.x + 22,
  voidBox.y + 22,
  voidBox.w - 44,
  voidBox.h - 44,
  30,
);

function Ink({
  d,
  delay = 0,
  width = 3.5,
  cap = 'square',
  reduce,
  className,
}: {
  d: string;
  delay?: number;
  width?: number;
  cap?: 'square' | 'butt' | 'round';
  reduce?: boolean | null;
  className?: string;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap={cap}
      strokeLinejoin="miter"
      className={className}
      initial={{ pathLength: reduce ? 1 : 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: reduce ? 0 : 1.35,
        delay: reduce ? 0 : delay,
        ease: drawEase,
      }}
    />
  );
}

function FloorPlan({
  hatchId,
  reduce,
  planRef,
  onPointerMove,
  onPointerLeave,
}: {
  hatchId: string;
  reduce: boolean | null;
  planRef: React.RefObject<HTMLDivElement | null>;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
}) {
  return (
    <div
      ref={planRef}
      className="relative aspect-[1000/980] bg-surface"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <svg
        aria-hidden
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full text-foreground"
      >
        <defs>
          <pattern
            id={hatchId}
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(42)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="9"
              stroke="var(--accent)"
              strokeWidth="1.35"
            />
          </pattern>
        </defs>

        <rect
          x={voidBox.x + 6}
          y={voidBox.y + 6}
          width={voidBox.w - 12}
          height={voidBox.h - 12}
          fill="var(--accent)"
          opacity="0.08"
        />
        <rect
          x={voidBox.x + 6}
          y={voidBox.y + 6}
          width={voidBox.w - 12}
          height={voidBox.h - 12}
          fill={`url(#${hatchId})`}
          opacity="0.7"
        />

        <Ink d={exterior} width={8} reduce={reduce} />
        <Ink
          d={interior}
          delay={0.16}
          width={4}
          reduce={reduce}
          className="text-foreground/85"
        />
        <Ink
          d={windows}
          delay={0.42}
          width={1.4}
          cap="butt"
          reduce={reduce}
          className="text-foreground/70"
        />
        <Ink
          d={jambs}
          delay={0.42}
          width={1.4}
          cap="butt"
          reduce={reduce}
          className="text-foreground/70"
        />
        <Ink
          d={doors}
          delay={0.5}
          width={1.35}
          cap="butt"
          reduce={reduce}
          className="text-foreground/55"
        />

        <motion.g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="text-foreground/40"
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.75 }}
        >
          <rect x="384" y="118" width="42" height="108" />
          <path d="M392 128 v88 M384 128 h8 M384 216 h8" />
          <path d="M545 128 H888 V246" strokeWidth="5" />
          <rect x="630" y="156" width="148" height="50" />
          <rect x="512" y="348" width="28" height="72" />
          <circle cx="526" cy="372" r="6" />
          <ellipse cx="824" cy="408" rx="62" ry="32" />
          <ellipse cx="824" cy="408" rx="42" ry="16" />
          <rect x="600" y="848" width="200" height="16" />
        </motion.g>

        <motion.g
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.85 }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.15"
          className="text-muted-foreground"
        >
          <path d={`M ${L} 36 H ${R}`} />
          <path d={`M ${L} 28 l 8 8 l -8 8 M ${R} 28 l -8 8 l 8 8`} />
          <path d={`M ${L} 48 V 24 M ${R} 48 V 24`} />
          <path d={`M 30 ${T} V ${B}`} />
          <path d={`M 22 ${T} l 8 8 l 8 -8 M 22 ${B} l 8 -8 l 8 8`} />
          <path d={`M 18 ${T} H 42 M 18 ${B} H 42`} />
          <text
            x={(L + R) / 2}
            y="28"
            fill="currentColor"
            stroke="none"
            fontSize="20"
            textAnchor="middle"
            fontFamily="var(--font-body), sans-serif"
          >
            42&apos;-0&quot;
          </text>
          <text
            x="0"
            y="0"
            fill="currentColor"
            stroke="none"
            fontSize="20"
            textAnchor="middle"
            fontFamily="var(--font-body), sans-serif"
            transform={`translate(22 ${(T + B) / 2}) rotate(-90)`}
          >
            36&apos;-0&quot;
          </text>
          <g transform="translate(966 118)" strokeWidth="1.2">
            <circle r="20" />
            <path d="M 0 -12 L 6 8 H -6 Z" fill="currentColor" />
            <text
              y="-30"
              fill="currentColor"
              stroke="none"
              fontSize="15"
              textAnchor="middle"
              fontFamily="var(--font-body), sans-serif"
              letterSpacing="0.18em"
            >
              N
            </text>
          </g>
        </motion.g>

        <rect
          x={voidBox.x + 28}
          y={voidBox.y + 28}
          width={voidBox.w - 56}
          height={voidBox.h - 56}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.4"
          strokeDasharray="7 6"
          opacity="0.85"
        />
        <Ink
          d={cloud}
          delay={0.9}
          width={1.7}
          cap="round"
          reduce={reduce}
          className="text-accent"
        />
        <g className="text-accent" transform="translate(486 232)">
          <path
            d="M 11 0 L 22 26 H 0 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <text
            x="11"
            y="21"
            fill="currentColor"
            stroke="none"
            fontSize="15"
            textAnchor="middle"
            fontFamily="var(--font-body), sans-serif"
          >
            1
          </text>
        </g>
      </svg>

      <nav
        aria-label="Rooms still on the plans"
        className="absolute inset-0 z-10"
      >
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={room.href}
            aria-label={`${room.name}, ${room.hint}`}
            style={boxStyle(room.box)}
            className="group absolute flex items-start p-2 transition-colors duration-500 hover:bg-accent/12 focus-visible:bg-accent/12 sm:p-3"
          >
            <span className="max-w-[12ch]">
              <span className="eyebrow text-[0.58rem] text-muted-foreground sm:text-[0.62rem]">
                {room.index}
              </span>
              <span className="mt-1 block font-display text-lg leading-none tracking-tight transition-colors duration-500 group-hover:text-accent-ink group-focus-visible:text-accent-ink sm:text-2xl">
                {room.name}
              </span>
              <span className="mt-1.5 hidden text-[0.68rem] tracking-wide text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
                {room.hint}
              </span>
            </span>
            <ArrowUpRight
              aria-hidden
              className="absolute top-2 right-2 size-3.5 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          </Link>
        ))}
      </nav>

      <div
        aria-hidden
        style={boxStyle(voidBox)}
        className="pointer-events-none absolute z-30 flex flex-col items-center justify-center px-3 text-center"
      >
        <p className="eyebrow text-[0.58rem] text-accent sm:text-[0.68rem]">
          Unbuilt
        </p>
        <p className="font-display text-[clamp(3.1rem,7vw,6.4rem)] leading-[0.8] tracking-[-0.045em]">
          404
        </p>
        <motion.div
          className="mt-2 border-2 border-accent p-[3px] text-accent sm:mt-4"
          initial={
            reduce
              ? { opacity: 1, scale: 1, rotate: -12 }
              : { opacity: 0, scale: 1.5, rotate: -28 }
          }
          animate={{ opacity: 1, scale: 1, rotate: -12 }}
          transition={{
            duration: reduce ? 0 : 0.32,
            delay: reduce ? 0 : 1.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="border border-accent px-2 py-1 sm:px-2.5">
            <p className="eyebrow text-[0.52rem] leading-tight sm:text-[0.64rem]">
              Not in
              <br />
              scope
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SheetMeta({
  readoutRef,
}: {
  readoutRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="border-t border-foreground/15 bg-surface">
      <dl className="grid sm:grid-cols-3">
        <div className="px-3 py-3 sm:px-4">
          <dt className="eyebrow text-muted-foreground">Firm</dt>
          <dd className="mt-1.5 font-display text-xl leading-none tracking-tight sm:text-2xl">
            {site.name}
          </dd>
          <dd className="mt-1.5 text-xs text-muted-foreground">
            Since {site.founded}
          </dd>
        </div>
        <div className="border-t border-foreground/15 px-3 py-3 sm:border-t-0 sm:border-x sm:px-4">
          <dt className="eyebrow text-muted-foreground">Project</dt>
          <dd className="mt-1.5 font-display text-xl leading-none tracking-tight sm:text-2xl">
            Unbuilt room
          </dd>
          <dd className="mt-1.5 text-xs text-muted-foreground">
            {site.locality}
          </dd>
        </div>
        <div className="border-t border-foreground/15 px-3 py-3 sm:border-t-0 sm:px-4">
          <dt className="eyebrow text-muted-foreground">Sheet</dt>
          <dd className="mt-1.5 font-display text-4xl leading-none tracking-tight text-accent">
            A-404
          </dd>
          <dd className="mt-1.5 text-xs text-muted-foreground">
            Rev 1 — room omitted
          </dd>
        </div>
      </dl>
      <div className="flex items-baseline justify-between gap-4 border-t border-foreground/15 px-3 py-2.5 sm:px-4">
        <span className="eyebrow shrink-0 text-muted-foreground">Pointer</span>
        <span
          ref={readoutRef}
          className="truncate text-right font-display text-lg leading-none tracking-tight sm:text-2xl"
        >
          Cross the sheet
        </span>
      </div>
    </div>
  );
}

function Crop({ className }: { className: string }) {
  return (
    <span aria-hidden className={cn('absolute size-3.5', className)}>
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-foreground/50" />
      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-foreground/50" />
    </span>
  );
}

export function MissingRoom() {
  const reduce = useReducedMotion();
  const hatchId = React.useId().replace(/:/g, '');
  const planRef = React.useRef<HTMLDivElement>(null);
  const readoutRef = React.useRef<HTMLSpanElement>(null);

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const el = readoutRef.current;
      const plan = planRef.current;
      if (!el || !plan) return;

      const rect = plan.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * VB_W;
      const y = ((event.clientY - rect.top) / rect.height) * VB_H;
      const feetX = ((x - L) / (R - L)) * WIDTH_FT;
      const feetY = ((y - T) / (B - T)) * DEPTH_FT;
      const spot = `${formatFeet(feetX)}  ×  ${formatFeet(feetY)}`;

      if (contains(voidBox, x, y)) {
        el.textContent = `Unbuilt  ·  ${spot}`;
        return;
      }

      const room = rooms.find((item) => contains(item.box, x, y));
      if (room) {
        el.textContent = `${room.index}  ${room.name}  ·  ${spot}`;
        return;
      }

      el.textContent =
        x >= L && x <= R && y >= T && y <= B ? spot : 'In the margin';
    },
    [],
  );

  const onPointerLeave = React.useCallback(() => {
    if (readoutRef.current) readoutRef.current.textContent = 'Cross the sheet';
  }, []);

  return (
    <section
      aria-labelledby="missing-heading"
      className="relative overflow-x-clip pt-24 pb-16 sm:pt-28 sm:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '4.5rem 4.5rem',
          maskImage:
            'radial-gradient(ellipse at center, black 15%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 15%, transparent 72%)',
        }}
      />

      <div className="gutter relative mx-auto max-w-[120rem]">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-border pb-4">
          <p className="eyebrow text-muted-foreground">Sheet A-404</p>
          <p className="eyebrow text-accent-ink">Room omitted</p>
        </div>

        <div className="mt-8 grid items-start gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5 lg:pt-6">
            <h1 id="missing-heading" className="font-display t-lg">
              <span className="block overflow-hidden">
                <span className="anim-line-up block">This room</span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="anim-line-up block"
                  style={{ ['--d' as string]: '0.08s' }}
                >
                  <em>was never drawn.</em>
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-muted-foreground">
              The address is not on the set. It might be an old link, or a space
              we never built. The rest of the house is open.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button asChild variant="accent" size="lg">
                <Link href="/">
                  Back to the house
                  <ArrowUpRight className="arrow" aria-hidden />
                </Link>
              </Button>
              <Link
                href="/projects"
                className="underline underline-offset-[0.5em] hover:text-accent-ink"
              >
                See the work
              </Link>
              <a
                href={site.phone.href}
                className="underline underline-offset-[0.5em] hover:text-accent-ink"
              >
                {site.phone.display}
              </a>
            </div>
            <p className="sr-only">
              Interactive floor plan. Living returns home. Kitchen and Bath open
              those remodeling services. Gallery opens finished projects. Entry
              opens the contact page. The hatched room marked 404 was never
              drawn.
            </p>
          </div>

          <div className="relative lg:col-span-7">
            <Crop className="-top-2 -left-2" />
            <Crop className="-top-2 -right-2" />
            <Crop className="-bottom-2 -left-2" />
            <Crop className="-right-2 -bottom-2" />
            <div className="border border-foreground/30 p-1.5 sm:p-2">
              <div className="border border-foreground/15">
                <FloorPlan
                  hatchId={hatchId}
                  reduce={reduce}
                  planRef={planRef}
                  onPointerMove={onPointerMove}
                  onPointerLeave={onPointerLeave}
                />
                <SheetMeta readoutRef={readoutRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
