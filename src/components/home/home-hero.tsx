import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { HeroPanels } from '@/components/home/hero-panels';
import { Button } from '@/components/ui/button';
import { img } from '@/lib/images';
import { ctaHref, site } from '@/lib/site';

const primary = {
  image: img(
    '/images/projects/kitchens/coffered-ceiling-island.jpg',
    'Kitchen with a coffered ceiling, twin marble islands and pendant lighting',
  ),
  label: 'Kitchens',
};

const secondary = {
  image: img(
    '/images/projects/bathrooms/beamed-primary-vanity.jpg',
    'White double vanity with marble counter, marble-tiled wall and three oval mirrors',
  ),
  label: 'Bathrooms',
};

const tertiary = {
  image: img(
    '/images/projects/flooring/encaustic-style-tile.jpg',
    'Espresso-toned plank flooring detail',
  ),
  label: 'Flooring',
};

const lines = ['From tired rooms', 'to spaces you', 'love living in.'];

function delay(seconds: number) {
  return { ['--d' as string]: `${seconds}s` };
}

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-dvh flex-col overflow-clip pt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px)] [background-size:25%_100%] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      />

      <div className="gutter relative mx-auto flex w-full max-w-[120rem] flex-1 flex-col">
        <div className="relative z-30 flex flex-1 flex-col justify-center pb-10 lg:pb-16">
          <p
            className="eyebrow anim-fade-up mb-8 flex items-center gap-4 text-muted-foreground"
            style={delay(0.15)}
          >
            <span aria-hidden className="h-px w-10 bg-accent-ink" />
            Remodeling &amp; restoration&nbsp;&middot;&nbsp;Greater
            Houston&nbsp;&middot;&nbsp;Since {site.founded}
          </p>

          <h1
            id="hero-heading"
            className="relative z-50 t-mega text-white mix-blend-difference lg:max-w-[66vw]"
          >
            {lines.map((line, i) => (
              <span
                key={line}
                className="block overflow-hidden pb-[0.1em] -mb-[0.1em]"
              >
                <span
                  className={
                    i === 2
                      ? 'anim-line-up block italic text-black dark:text-white'
                      : 'anim-line-up block text-black dark:text-white'
                  }
                  style={delay(0.25 + i * 0.12)}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="anim-fade-up mt-10 measure text-lg leading-relaxed text-muted-foreground lg:max-w-[30rem]"
            style={delay(0.95)}
          >
            Houston&apos;s premier remodeling and restoration company for
            kitchens, baths, flooring and whole-home remodels — planned
            carefully and built to last.
          </p>

          <div
            className="anim-fade-up mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            style={delay(1.1)}
          >
            <Button asChild size="xl" variant="accent">
              <Link href={ctaHref}>
                Start your project
                <ArrowUpRight className="arrow" aria-hidden />
              </Link>
            </Button>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-4 text-[0.72rem] font-medium uppercase tracking-[0.22em]"
            >
              <span className="relative flex size-12 items-center justify-center border border-foreground/35 transition-colors duration-500 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <ArrowRight
                  className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
              Walk through the work
            </Link>
          </div>
        </div>

        <HeroPanels
          primary={primary}
          secondary={secondary}
          tertiary={tertiary}
        />
      </div>

      <div className="gutter relative z-20 mx-auto flex w-full max-w-[120rem] items-end justify-between pb-8">
        <p
          className="eyebrow anim-fade-up text-muted-foreground"
          style={delay(1.6)}
        >
          Family owned&nbsp;&middot;&nbsp;{site.locality}
        </p>
        <a
          href="#manifesto"
          className="anim-fade-up group flex items-center gap-4"
          style={delay(1.7)}
        >
          <span className="eyebrow text-muted-foreground transition-colors group-hover:text-foreground">
            Scroll
          </span>
          <span
            aria-hidden
            className="relative block h-14 w-px overflow-hidden bg-border"
          >
            <span className="anim-scroll-cue absolute inset-0 bg-accent-ink" />
          </span>
        </a>
      </div>
    </section>
  );
}
