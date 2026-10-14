import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/motion';
import { PageHero } from '@/components/page-hero';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Resources',
  description:
    'Project walkthroughs for homeowners planning a remodel, and a partner portal for realtors who refer work to Elite Restorations.',
  path: '/resources',
});

const portals = [
  {
    index: '01',
    href: '/resources/homeowners',
    eyebrow: 'Homeowners',
    title: 'Research the project.',
    body: 'Watch how a shower, kitchen, or whole-home remodel actually proceeds, then ask for an estimate.',
  },
  {
    index: '02',
    href: '/resources/realtors',
    eyebrow: 'Realtors',
    title: 'Refer the work.',
    body: 'The same project library, plus partner benefits, referral tiers, and a way to send a project.',
  },
];

export default function ResourcesPage() {
  return (
    <PageHero
      eyebrow="Resources"
      title={['Two ways in.']}
      lede="Homeowners researching a remodel, and realtors who refer the work. Same crews. A different starting point."
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
