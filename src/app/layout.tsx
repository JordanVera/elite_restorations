import type { Metadata, Viewport } from 'next';
import { Geist, Instrument_Serif } from 'next/font/google';

import { Providers } from '@/components/providers';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { JsonLd } from '@/components/json-ld';
import { documentTitle, localBusinessSchema } from '@/lib/seo';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

import './globals.css';

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const defaultTitle = documentTitle('Remodeling & Roofing in Houston, TX');

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: '%s | Elite Restorations',
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    url: site.url,
    title: defaultTitle,
    description: site.description,
    images: [
      {
        url: '/images/projects/kitchens/coffered-ceiling-island.jpg',
        alt: 'Houston kitchen remodel by Elite Restorations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: site.description,
    images: ['/images/projects/kitchens/coffered-ceiling-island.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#ece6da',
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(display.variable, body.variable)}
    >
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important;visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh antialiased">
        <Providers>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[100] -translate-y-24 bg-foreground px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-background transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </Providers>
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
