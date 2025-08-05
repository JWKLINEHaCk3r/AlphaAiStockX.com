#!/bin/bash

echo "🚀 Full Deployment: AlphaAI StockX to Netlify & Railway"
echo "================================================="

# Commit all changes first
echo "📝 Committing all changes..."
git add -A
git commit -m "🚀 Full Deployment: Added Netlify & Railway configs

✅ Netlify Configuration:
  - netlify.toml with Next.js plugin
  - Optimized build settings
  - Environment variables setup

✅ Railway Configuration:
  - railway.json with Nixpacks
  - Health check endpoints
  - Production environment

✅ Docker Support:
  - Dockerfile for containerized deployment
  - .dockerignore for optimized builds

✅ Deployment Scripts:
  - deploy-netlify.sh (automated Netlify deployment)
  - deploy-railway.sh (automated Railway deployment)
  - Environment variables template (.env.example)

🎯 Ready for production deployment on both platforms!"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

# Test build locally first
echo "🔨 Testing local build..."
pnpm install
pnpm build

if [ $? -eq 0 ]; then
    echo "✅ Local build successful!"
    
    # Deploy to Netlify
    echo ""
    echo "🌐 Starting Netlify deployment..."
    ./scripts/deploy-netlify.sh
    
    # Deploy to Railway
    echo ""
    echo "🚂 Starting Railway deployment..."
    ./scripts/deploy-railway.sh
    
    echo ""
    echo "🎉 Full deployment completed successfully!"
    echo "Your AlphaAI StockX platform is now live on both platforms!"
else
    echo "❌ Local build failed. Please fix errors before deploying."
    exit 1
fi
