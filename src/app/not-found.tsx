import type { Metadata } from 'next';

import { MissingRoom } from '@/components/not-found/missing-room';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <MissingRoom />
      </main>
      <SiteFooter />
    </>
  );
}
