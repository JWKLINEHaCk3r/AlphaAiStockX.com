import { NextConfig } from 'next';

// Production optimization configuration for Next.js 15.3.5+
const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    // Enable Turbo Mode for faster builds
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: 'resource',
        },
      },
    },
    // Enable React 18 server components
    appDir: true,
    // Enable server actions
    serverActions: true,
    // Optimize bundle analyzer
    bundlePagesRouterDependencies: true,
    // Enable optimized package imports
    optimizePackageImports: ['@radix-ui/react-*', 'lucide-react'],
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    // React optimizations
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    // Styled-jsx optimizations
    styledComponents: true,
  },

  // Output configuration
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: [
      'images.unsplash.com',
      'assets.example.com',
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '0', // Disabled as modern browsers handle this better
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
          // Modern security headers
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://api.alpaca.markets wss://stream.data.alpaca.markets https://paper-api.alpaca.markets wss://stream.data.sandbox.alpaca.markets",
              "media-src 'self'",
              "object-src 'none'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
              "block-all-mixed-content"
            ].join('; '),
          },
          // HSTS (only in production with HTTPS)
          ...(process.env.NODE_ENV === 'production' ? [{
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          }] : []),
        ],
      },
      // API-specific headers
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, private',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      // Static assets caching
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for SEO and security
  async redirects() {
    return [
      // Force HTTPS in production
      ...(process.env.NODE_ENV === 'production' ? [
        {
          source: '/:path*',
          has: [
            {
              type: 'header',
              key: 'x-forwarded-proto',
              value: 'http',
            },
          ],
          destination: 'https://alphaaistockx.com/:path*',
          permanent: true,
        },
      ] : []),
      // Redirect old paths
      {
        source: '/dashboard/trading',
        destination: '/trading',
        permanent: true,
      },
      {
        source: '/dashboard/portfolio',
        destination: '/portfolio',
        permanent: true,
      },
    ];
  },

  // Rewrites for API optimization
  async rewrites() {
    return [
      // API versioning
      {
        source: '/api/v1/:path*',
        destination: '/api/:path*',
      },
      // Health check endpoint
      {
        source: '/health',
        destination: '/api/health',
      },
    ];
  },

  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Production optimizations
    if (!dev) {
      // Bundle analyzer
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: '../analyze/client.html',
          })
        );
      }

      // Optimize chunks
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier());
              },
              name(module) {
                const hash = crypto.createHash('sha1');
                hash.update(module.libIdent({ context: config.context }));
                return hash.digest('hex').substring(0, 8);
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name: 'shared',
              minChunks: 2,
              chunks: 'async',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // Module concatenation
      config.optimization.concatenateModules = true;
    }

    // Custom module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').join(__dirname, '.'),
    };

    // Optimize imports
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    return config;
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    BUILD_TIME: new Date().toISOString(),
    BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['app', 'lib', 'components', 'hooks'],
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },

  // PoweredByHeader
  poweredByHeader: false,

  // Generate ETags
  generateEtags: true,

  // HTTP Agent Keep Alive
  httpAgentOptions: {
    keepAlive: true,
  },

  // API middleware
  async middleware() {
    return [
      // Performance monitoring
      {
        source: '/api/:path*',
        middleware: ['performance-monitor'],
      },
      // Rate limiting
      {
        source: '/api/:path*',
        middleware: ['rate-limiter'],
      },
      // Security validation
      {
        source: '/api/:path*',
        middleware: ['security-validator'],
      },
    ];
  },
};

// Development-specific optimizations
if (process.env.NODE_ENV === 'development') {
  nextConfig.experimental = {
    ...nextConfig.experimental,
    // Faster refresh
    turbo: {
      rules: {
        '*.tsx': {
          loaders: [
            {
              loader: '@next/react-refresh-utils/loader',
              options: {},
            },
          ],
        },
      },
    },
  };
}

// Production-specific optimizations
if (process.env.NODE_ENV === 'production') {
  nextConfig.compiler = {
    ...nextConfig.compiler,
    // Remove development-only code
    removeConsole: {
      exclude: ['error', 'warn'],
    },
    // Minify
    minify: true,
  };

  // Compression
  nextConfig.compress = true;

  // Static optimization
  nextConfig.staticPageGenerationTimeout = 1000;
}

module.exports = nextConfig;
