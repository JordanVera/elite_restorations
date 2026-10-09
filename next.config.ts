import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
  async redirects() {
    return [
      {
        source: '/services/:slug',
        destination: '/:slug',
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
