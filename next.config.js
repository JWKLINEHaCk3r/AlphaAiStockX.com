// Convert to ESM syntax for Next.js config compatibility
import './global-setup.js';
import SelfPolyfillPlugin from './scripts/self-polyfill-plugin.js';
import path from 'path';

/** @type {import('next').NextConfig} */
// Setup global polyfills before anything else
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['alphaaistockx.com', 'cdn.alphaaistockx.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: false, // SSR: allow Next.js to optimize images
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
  poweredByHeader: false,
  turbopack: {
    root: path.resolve(__dirname),
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
    resolveAlias: {
      underscore: 'lodash',
      mocha: { browser: 'mocha/browser-entry.js' },
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
};

export default nextConfig;
