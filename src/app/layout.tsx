import fs from 'node:fs';
import path from 'node:path';
import type { Metadata, Viewport } from 'next';
import { Geist, Instrument_Serif } from 'next/font/google';
import ReactDOM from 'react-dom';

import { CallTextBar } from '@/components/call-text-bar';
import { HtmlDocument } from '@/components/html-document';
import { Providers } from '@/components/providers';
import { SiteChrome } from '@/components/site-chrome';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SkipLink } from '@/components/skip-link';
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

const FONT_URL = /\/_next\/static\/media\/[A-Za-z0-9_.~-]+\.woff2(?:\?[^)"'\\]*)?/g;

function cssText(raw: string) {
  return raw.replace(/\\u002f/gi, '/').replace(/\\\//g, '/').replace(/\\"/g, '"');
}

function hrefsInCss(raw: string, hrefs: Set<string>) {
  const css = cssText(raw);
  if (!/u\+0131/i.test(css)) return;
  for (const block of css.split(/@font-face/i).slice(1)) {
    if (!/u\+0131/i.test(block)) continue;
    for (const match of block.matchAll(FONT_URL)) hrefs.add(match[0]);
  }
}

function collectCssFiles(dir: string, files: string[]) {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectCssFiles(full, files);
      continue;
    }
    if (
      entry.name.endsWith('.css') ||
      entry.name.endsWith('client-reference-manifest.js') ||
      entry.name === 'next-font-manifest.json'
    ) {
      files.push(full);
    }
  }
}

/**
 * Latin subset files for the hero fonts. u+0131 is in the latin range and
 * not in latin-ext, so italic Instrument Serif is included and the other
 * subsets are not. inlineCss stores the font-face rules in the client
 * reference manifest instead of .next/static/css.
 */
function preloadableLatinFonts() {
  if (latinFontHrefs?.length) return latinFontHrefs;
  const hrefs = new Set<string>();
  const files: string[] = [];
  collectCssFiles(path.join(process.cwd(), '.next/static/css'), files);
  collectCssFiles(path.join(process.cwd(), '.next/server'), files);
  for (const file of files) {
    try {
      const stat = fs.statSync(file);
      if (stat.size > 8_000_000) continue;
      const raw = fs.readFileSync(file, 'utf8');
      if (!raw.includes('woff2')) continue;
      hrefsInCss(raw, hrefs);
    } catch {
      // Manifests are written when the client build finishes.
    }
  }
  const list = [...hrefs];
  if (list.length) latinFontHrefs = list;
  return list;
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  for (const href of preloadableLatinFonts()) {
    ReactDOM.preload(href, {
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
      // City and project pages paint a hero photograph. Keep the font files
      // from taking the high-priority connection the LCP image needs.
      fetchPriority: 'low',
    });
  }
  return (
    <HtmlDocument className={cn(display.variable, body.variable)}>
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
          <SkipLink />
          <SiteChrome header={<SiteHeader />} footer={<SiteFooter />} callBar={<CallTextBar />}>
            {children}
          </SiteChrome>
        </Providers>
        <JsonLd data={siteSchemaGraph()} />
      </body>
    </HtmlDocument>
  );
}
