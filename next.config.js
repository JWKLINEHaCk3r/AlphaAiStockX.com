// Convert to ESM syntax for Next.js config compatibility
import './global-setup.js';
import SelfPolyfillPlugin from './scripts/self-polyfill-plugin.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

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
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Moved from experimental
  serverExternalPackages: ['sharp'],
  // Force all pages to be dynamic to avoid static generation issues
  generateBuildId: async () => {
    return 'development-build'
  },
  // Disable static optimization
  output: undefined,
  images: {
    domains: ['alphaaistockx.com', 'cdn.alphaaistockx.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },
  // SSR configuration
  env: {
    CUSTOM_KEY: 'my-value',
  },
  // Improved webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Inject webpack polyfill at the beginning of server-side bundles
    if (isServer) {
      const originalEntry = config.entry;
      
      config.entry = async () => {
        const entries = await originalEntry();
        const polyfillPath = require.resolve('./runtime-polyfills.js');
        
        // Add polyfill to all server-side entry points
        Object.keys(entries).forEach((entryName) => {
          if (Array.isArray(entries[entryName])) {
            entries[entryName].unshift(polyfillPath);
          } else if (typeof entries[entryName] === 'string') {
            entries[entryName] = [polyfillPath, entries[entryName]];
          } else if (typeof entries[entryName] === 'object') {
            if (Array.isArray(entries[entryName].import)) {
              entries[entryName].import.unshift(polyfillPath);
            } else if (typeof entries[entryName].import === 'string') {
              entries[entryName].import = [polyfillPath, entries[entryName].import];
            }
          }
        });
        
        return entries;
      };
      
      // Ensure self is defined in server context using DefinePlugin
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.browser': false,
          'typeof self': JSON.stringify('object'),
          'self.webpackChunk_N_E': 'global.webpackChunk_N_E',
          'self': 'global',
        })
      );

      // Add custom plugin to handle document access during SSR
      config.plugins.push(
        new webpack.ProvidePlugin({
          document: [require.resolve('./runtime-polyfills.js'), 'documentPolyfill']
        })
      );
    }

    // Fix for webpack 5 compatibility and SSR issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    };

    // Add DefinePlugin for server-side builds
    if (isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          'typeof window': JSON.stringify('undefined'),
          'typeof self': JSON.stringify('object'),
        })
      );
    }

    // Exclude service worker files from server-side processing
    if (isServer) {
      config.module.rules.push({
        test: /sw\.js$/,
        loader: 'ignore-loader'
      });
    }

    // Fix SSR issues with browser globals
    if (isServer) {
      // Add custom plugin to fix webpack chunk loading
      config.plugins.push(new SelfPolyfillPlugin());
      
      // Simple global definitions for server-side rendering
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.browser': false,
          'typeof self': JSON.stringify('object'),
        })
      );

      // Provide polyfills for browser globals in server environment
      config.resolve.alias = {
        ...config.resolve.alias,
      };
      
      // Replace problematic browser globals with safe alternatives in source code
      config.module.rules.push({
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'string-replace-loader',
        options: {
          multiple: [
            {
              search: /\bself\.webpackChunk/g,
              replace: 'global.webpackChunk',
              flags: 'g',
            },
            {
              search: /\(self\.webpackChunk/g,
              replace: '(global.webpackChunk',
              flags: 'g',
            },
          ]
        }
      });
    }

    // Exclude problematic packages from server-side rendering
    if (isServer) {
      config.externals = [...(config.externals || [])];
      config.externals.push({
        'socket.io-client': 'commonjs socket.io-client',
      });

      // Additional fixes for service worker globals
      config.module.rules.push({
        test: /sw\.js$/,
        use: 'null-loader'
      });
    }

    // SVG optimization
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Bundle optimization
    if (isServer) {
      // Disable chunk splitting for server build to avoid self reference issues
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
      };
    } else {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
            },
          },
        },
      };
    }

    // Minimize bundle size in production
    if (!dev && !isServer) {
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 5,
        })
      );
    }

    return config;
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    webVitalsAttribution: ['CLS', 'LCP'],
    // Additional settings to help with CSS processing
    // turbo: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Remove headers for export mode
  poweredByHeader: false,
};

export { nextConfig as default };
