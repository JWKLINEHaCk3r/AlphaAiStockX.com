/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Bypass ESLint during production builds
  },
  typescript: {
    ignoreBuildErrors: true, // Bypass TypeScript errors during production builds
  },
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
  },
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  
  // Handle static file optimization images: { domains: ['localhost', 'via.placeholder.com'],
    unoptimized: false,
  },
   // Output configuration for deployment output: 'standalone',
  trailingSlash: false,
  
  // Webpack configuration to handle module resolution
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Environment variables env: { CUSTOM_KEY: 'my-value',
  },
  
  // Redirects and rewrites for production
  async rewrites() {
    return [ { source: '/api/:path*', destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
