import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Material selections', template: '%s | Elite Restorations' },
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default function PortalRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="app-ui min-h-dvh bg-surface-2/40">{children}</div>;
}
