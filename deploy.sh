#!/bin/bash

# AlphaAIStockX Deployment Script for Netlify
# This script prepares the project for deployment

echo "🚀 Starting AlphaAIStockX deployment preparation..."

# Check Node.js version
NODE_VERSION=$(node --version)
echo "Current Node.js version: $NODE_VERSION"

# Create necessary directories
mkdir -p public
mkdir -p netlify/functions

# Copy static files to public directory if they exist
if [ -f "favicon.ico" ]; then
    cp favicon.ico public/
fi

if [ -f "robots.txt" ]; then
    cp robots.txt public/
fi

if [ -f "sitemap.xml" ]; then
    cp sitemap.xml public/
fi

if [ -f "site.webmanifest" ]; then
    cp site.webmanifest public/
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Run build
echo "🔨 Building application..."
npm run build

echo "✅ Deployment preparation complete!"
echo "📁 Build output is in the 'out' directory"
echo "🌐 Ready for Netlify deployment"
