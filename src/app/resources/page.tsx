import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Houston Remodeling Resources',
  description:
    'Step-by-step remodel notes for Houston homeowners, and a page for realtors who send work to Elite Restorations.',
  path: '/resources',
});

const portals = [
  {
    index: '01',
    href: '/resources/homeowners',
    eyebrow: 'Homeowners',
    title: 'Look at the project.',
    body: 'How a remodel moves, from the first visit through the walkthrough, and how to ask for an estimate.',
  },
  {
    index: '02',
    href: '/resources/realtors',
    eyebrow: 'Realtors',
    title: 'Send the work.',
    body: 'The same project steps, plus a direct way to send a flip or introduce a client.',
  },
];

export default function ResourcesPage() {
  return (
    <PageHero
      eyebrow="Resources"
      title={['Two places to start.']}
      lede="Homeowners looking at a remodel, and realtors who send us the work. The same crews. You just start in a different place."
      crumbs={[{ name: 'Resources', path: '/resources' }]}
      className="pb-20 md:pb-28"
    >
      <ul className="mt-14 grid gap-px bg-border md:grid-cols-2">
        {portals.map((portal) => (
          <li key={portal.href} className="bg-background">
            <Reveal>
              <Link
                href={portal.href}
                className="group flex h-full flex-col p-8 transition-colors hover:bg-surface md:p-10"
              >
                <span className="eyebrow text-muted-foreground">{portal.index}</span>
                <span className="eyebrow mt-8 text-accent-ink">{portal.eyebrow}</span>
                <span className="mt-4 flex items-start justify-between gap-4">
                  <span className="font-display t-md transition-colors duration-500 group-hover:text-accent-ink">
                    {portal.title}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-2 size-5 shrink-0 text-accent-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
                <span className="mt-4 max-w-[36ch] leading-relaxed text-muted-foreground">
                  {portal.body}
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </PageHero>
  );
}
