import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
  // Airo's sandbox denies the loopback port Turbopack uses for PostCSS child
  // processes, which crashes compilation of globals.css. Worker threads stay
  // inside this process. Requires Next.js 16.4+.
  experimental: {
    turbopackPluginRuntimeStrategy: 'workerThreads',
    // Tailwind CSS is one render-blocking request. Inlining it removes that
    // round trip for a first visit. Returning visitors still get <link> tags
    // on client navigations.
    inlineCss: true,
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Next always imports polyfill-module into the main app chunk (the
      // numbered chunk Lighthouse calls out). package.json browserslist
      // matches Next's own modern target, which already has these APIs.
      // URL.canParse is only called from dev and server helpers, not this
      // client chunk.
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /[\\/]next[\\/]dist[\\/]build[\\/]polyfills[\\/]polyfill-module(?:\.js)?$/,
          path.join(__dirname, 'src/lib/empty-polyfill.js'),
        ),
      );
      // Next also copies a nomodule core-js bundle. The browsers in
      // package.json (Chrome/Edge/Firefox 111+, Safari 16.4+) already have
      // those features, so the file is dead weight on every page.
      const stage = webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT;
      config.plugins.push({
        apply(compiler: {
          hooks: {
            thisCompilation: {
              tap: (
                name: string,
                fn: (compilation: {
                  hooks: {
                    processAssets: {
                      tap: (
                        options: { name: string; stage: number },
                        callback: () => void,
                      ) => void;
                    };
                  };
                  getAssets: () => { name: string }[];
                  updateAsset: (name: string, source: unknown) => void;
                }) => void,
              ) => void;
            };
          };
        }) {
          compiler.hooks.thisCompilation.tap('ModernBrowsersPolyfill', (compilation) => {
            const source = new webpack.sources.RawSource(
              '/* Legacy core-js polyfill omitted: browserslist targets already support these APIs. */\n',
            );
            compilation.hooks.processAssets.tap(
              { name: 'ModernBrowsersPolyfill', stage },
              () => {
                for (const asset of compilation.getAssets()) {
                  if (/static\/chunks\/polyfills(?:-|\.)/.test(asset.name)) {
                    compilation.updateAsset(asset.name, source);
                  }
                }
              },
            );
          });
        },
      });
    }
    return config;
  },
  // Preview is served from *.preview.c36.airoapp.ai, not localhost.
  allowedDevOrigins: ['**.airoapp.ai'],
  agentRules: false,
  trailingSlash: false,
  // Own the slash redirect so legacy paths can jump straight to the new address.
  skipTrailingSlashRedirect: true,
  async redirects() {
    // http:// and www. are not redirected here. Vercel already sends
    // http://eliterestorations.com and https://www.eliterestorations.com to
    // https://eliterestorations.com in one hop. http://www still takes two
    // hops, because the platform upgrades TLS on the same host before the
    // www rule. That cannot be collapsed in this file.
    //
    // Each legacy URL, with and without a trailing slash, points at the final
    // page. The slash form is listed here so it does not stop at the
    // slash-stripping rule and then redirect again.
    const permanent = (source: string, destination: string) => ({
      source,
      destination,
      permanent: true as const,
    });
    const both = (source: string, destination: string) => [
      permanent(source, destination),
      permanent(`${source}/`, destination),
    ];

    return [
      ...both('/portfolio', '/projects'),
      ...both('/water-restoration', '/water-damage-restoration'),
      ...both('/countertop', '/countertops'),
      ...both('/siding-services', '/siding'),
      ...both('/refund-policy', '/privacy'),
      ...both('/privacy-policy', '/privacy'),
      ...both(
        '/top-5-benefits-of-remodeling-your-kitchen-in-2025',
        '/kitchen-remodel-benefits',
      ),
      permanent('/services/:slug', '/:slug'),
      permanent('/services/:slug/', '/:slug'),
      // WordPress author archives, search, and feeds.
      permanent('/author/:slug*', '/about'),
      permanent('/author/:slug*/', '/about'),
      permanent('/search/:rest*', '/'),
      permanent('/search/:rest*/', '/'),
      permanent('/feed/:rest*', '/'),
      permanent('/feed/:rest*/', '/'),
      permanent('/:prefix+/feed/:rest*', '/'),
      permanent('/:prefix+/feed/:rest*/', '/'),
      // One-hop slash strip. wp-admin, wp-*.php, and xmlrpc.php are excluded
      // so proxy.ts can answer 410 without a redirect in front of it.
      {
        source:
          '/:path((?!wp-admin(?:/|$)|wp-[^/]*\\.php(?:/|$)|xmlrpc\\.php(?:/|$)).+)/',
        destination: '/:path',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // 1080 and 1200 stop a phone at ~2.6x (about 1080px) from jumping
    // 1024 → 1440. 1200 also covers a full-bleed 100vw hero.
    deviceSizes: [480, 768, 1024, 1080, 1200, 1440, 1920, 2560],
    qualities: [60, 70, 75, 78, 80, 85],
  },
  poweredByHeader: false,
};

export default nextConfig;
