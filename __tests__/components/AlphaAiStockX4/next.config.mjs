/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
