#!/bin/bash

# Netlify Build Script for AlphaAIStockX
# This script ensures proper dependency installation and build process

set -e  # Exit on any error

echo "🚀 Starting AlphaAIStockX build process..."

# Print Node.js and npm versions
echo "📋 Environment Information:"
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo "Current directory: $(pwd)"

# Clean any existing installations
echo "🧹 Cleaning previous installations..."
rm -rf node_modules package-lock.json

# Install dependencies with legacy peer deps to handle React version conflicts
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps --no-audit --prefer-offline

# Verify critical dependencies are installed
echo "🔍 Verifying critical dependencies..."
if [ ! -d "node_modules/@radix-ui/react-slider" ]; then
    echo "❌ Critical dependency @radix-ui/react-slider not found"
    exit 1
fi

if [ ! -d "node_modules/next" ]; then
    echo "❌ Critical dependency next not found"
    exit 1
fi

echo "✅ All critical dependencies verified"

# Run the build
echo "🏗️ Building the application..."
npm run build

# Verify build output
echo "🔍 Verifying build output..."
if [ ! -d "out" ]; then
    echo "❌ Build output directory 'out' not found"
    exit 1
fi

if [ ! -f "out/index.html" ]; then
    echo "❌ Main index.html not found in build output"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build output directory: out/"
echo "📄 Generated files:"
ls -la out/ | head -10

echo "🎉 AlphaAIStockX build process completed successfully!"
