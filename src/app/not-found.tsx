import type { Metadata } from 'next';

import { MissingSheet } from '@/components/not-found/missing-sheet';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return <MissingSheet />;
}
