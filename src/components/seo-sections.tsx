import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { TextLink } from '@/lib/seo-sections';

const linkClass =
  'inline-flex items-center gap-2 text-sm underline decoration-foreground/30 underline-offset-[0.5em] transition-colors hover:decoration-accent-ink';

export function HomeRestorationSection({
  id,
  eyebrow,
  title,
  paragraphs,
  links,
}: {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  links: readonly TextLink[];
}) {
  return (
    <section aria-labelledby={id} className="border-b border-border py-20 md:py-28">
      <div className="gutter mx-auto grid max-w-[120rem] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-accent-ink">{eyebrow}</p>
          <h2 id={id} className="font-display t-lg mt-4 max-w-[16ch]">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="space-y-6">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function DiscoverLinks({
  id,
  heading,
  intro,
  links,
}: {
  id: string;
  heading: string;
  intro: string;
  links: readonly TextLink[];
}) {
  return (
    <section aria-labelledby={id} className="border-b border-border py-16 md:py-20">
      <div className="gutter mx-auto max-w-[120rem]">
        <h2 id={id} className="font-display text-3xl leading-tight md:text-4xl">
          {heading}
        </h2>
        <p className="measure mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass}>
                {link.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
