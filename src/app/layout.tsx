import type { Metadata, Viewport } from 'next';
import { Geist, Instrument_Serif } from 'next/font/google';

import { CallTextBar } from '@/components/call-text-bar';
import { Providers } from '@/components/providers';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { JsonLd } from '@/components/json-ld';
import { documentTitle, siteSchemaGraph } from '@/lib/seo';
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

const defaultTitle = documentTitle('Houston Restoration & Remodeling');

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: '%s | Elite Restorations',
  },
  description: site.description,
  applicationName: site.name,
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
  verification: {
    google: 'adPxeKjsZSuzogI-35QH0lGetZO3S8hMRbJ5uFgyotg',
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
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var p=location.pathname;if(p==="/es"||p.indexOf("/es/")===0)document.documentElement.lang="es"}catch(e){}',
          }}
        />
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
          <CallTextBar />
        </Providers>
        <JsonLd data={siteSchemaGraph()} />
      </body>
    </html>
  );
}
