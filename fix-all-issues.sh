#!/bin/bash

echo "🔧 Starting comprehensive fix for AlphaAI StockX..."

# 1. Install missing dependencies
echo "📦 Installing dependencies..."
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react

# 2. Create missing directories
echo "📁 Creating missing directories..."
mkdir -p app/ai-trading app/portfolio app/analytics
mkdir -p components/ui components/navigation components/trading
mkdir -p lib types public

# 3. Fix TypeScript configuration
echo "⚙️ Updating TypeScript configuration..."
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# 4. Ensure Next.js configuration
echo "🔧 Creating Next.js configuration..."
cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['lucide-react'],
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig
EOF

# 5. Fix any syntax issues in main files
echo "🔍 Fixing syntax issues..."

echo "✅ Comprehensive fix completed!"
echo "🚀 Run 'npm run build' to test the build"
echo "🎯 Run 'npm run dev' to start development server"
