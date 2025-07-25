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
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  serverExternalPackages: ['sharp'],
  generateBuildId: async () => 'development-build',
  output: undefined,
  images: {
    domains: ['alphaaistockx.com', 'cdn.alphaaistockx.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { isServer }) => {
    // ...existing webpack config from next.config.js...
    if (isServer) {
      // ...server-specific config...
    }
    return config;
  },
};

module.exports = nextConfig;
