import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
  // Airo's sandbox denies the loopback port Turbopack uses for PostCSS child
  // processes, which crashes compilation of globals.css. Worker threads stay
  // inside this process. Requires Next.js 16.4+.
  experimental: {
    turbopackPluginRuntimeStrategy: 'workerThreads',
  },
  // Preview is served from *.preview.c36.airoapp.ai, not localhost.
  allowedDevOrigins: ['**.airoapp.ai'],
  agentRules: false,
  trailingSlash: false,
  // Own the slash redirect so legacy paths can jump straight to the new address.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/portfolio/',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/water-restoration',
        destination: '/water-damage-restoration',
        permanent: true,
      },
      {
        source: '/water-restoration/',
        destination: '/water-damage-restoration',
        permanent: true,
      },
      {
        source: '/services/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/services/:slug/',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/privacy-policy/',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/top-5-benefits-of-remodeling-your-kitchen-in-2025',
        destination: '/kitchen-remodel-benefits',
        permanent: true,
      },
      {
        source: '/top-5-benefits-of-remodeling-your-kitchen-in-2025/',
        destination: '/kitchen-remodel-benefits',
        permanent: true,
      },
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 768, 1024, 1440, 1920, 2560],
    qualities: [60, 70, 75, 78, 80, 85],
  },
  poweredByHeader: false,
};

export default nextConfig;
