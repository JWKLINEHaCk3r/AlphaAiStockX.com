/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for better CDN performance
  output: "export",
  trailingSlash: true,

  // Image optimization for CDN
  images: {
    unoptimized: true,
    domains: ["alphaaistockx.com", "cdn.alphaaistockx.com", "images.unsplash.com", "via.placeholder.com"],
    formats: ["image/webp", "image/avif"],
  },

  // Build configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // CDN and performance optimizations
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },

  // Compress and optimize
  compress: true,
  poweredByHeader: false,

  // CDN asset prefix for production
  assetPrefix: process.env.NODE_ENV === "production" ? "https://cdn.alphaaistockx.com" : "",

  // Simplified experimental features
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      }
    }
    return config
  },
}

module.exports = nextConfig
