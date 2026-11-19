import fs from 'node:fs';
import path from 'node:path';
import type { Metadata, Viewport } from 'next';
import { Geist, Instrument_Serif } from 'next/font/google';
import { headers } from 'next/headers';

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
  // Next's own preload adds ?dpl= to the link, which does not match the
  // inlined url(), so the file is downloaded twice. Preloads are emitted
  // below with the same path the stylesheet uses. Italic stays because the
  // homepage hero <em> is above the fold.
  preload: false,
});

const body = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: false,
});

let latinFontHrefs: string[] | null = null;

function preloadableLatinFonts() {
  if (latinFontHrefs) return latinFontHrefs;
  const hrefs: string[] = [];
  try {
    const dir = path.join(process.cwd(), '.next/static/css');
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith('.css')) continue;
      const css = fs.readFileSync(path.join(dir, name), 'utf8');
      for (const block of css.split('@font-face').slice(1)) {
        if (!block.includes('u+0131')) continue;
        const match = block.match(/url\((\/_next\/static\/media\/[^)]+\.woff2)\)/);
        if (match) hrefs.push(match[1]);
      }
    }
  } catch {
    // CSS is not on disk yet during the production build's page collection.
  }
  latinFontHrefs = hrefs;
  return hrefs;
}

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get('x-pathname') ?? '';
  const es = pathname === '/es' || pathname.startsWith('/es/');
  return (
    <html
      lang={es ? 'es' : 'en'}
      suppressHydrationWarning
      className={cn(display.variable, body.variable)}
    >
      <head>
        {preloadableLatinFonts().map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
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
            {es ? 'Saltar al contenido' : 'Skip to content'}
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter es={es} />
          <CallTextBar es={es} />
        </Providers>
        <JsonLd data={siteSchemaGraph()} />
      </body>
    </html>
  );
}
