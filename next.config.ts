import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
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
