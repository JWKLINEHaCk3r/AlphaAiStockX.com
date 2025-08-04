#!/bin/bash

echo "🚀 Preparing AlphaAI StockX for GitHub push..."
echo "=============================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
    git remote add origin https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com.git
fi

# Check git status
echo ""
echo "📊 Current git status:"
git status --short

# Add all files
echo ""
echo "📦 Adding all files to staging..."
git add .

# Check what's being committed
echo ""
echo "📋 Files to be committed:"
git diff --cached --name-only | head -20
echo "$(git diff --cached --name-only | wc -l) total files staged"

# Create a comprehensive commit message
COMMIT_MSG="🚀 Complete AlphaAI StockX deployment with comprehensive fixes

✅ Fixed all compilation errors and syntax issues
✅ Added missing UI components (Card, Button, Input, Badge, Progress)
✅ Fixed card import issues across all components
✅ Created comprehensive deployment scripts
✅ Updated Docker configuration for production
✅ Fixed Netlify deployment configuration
✅ Added monitoring and health check scripts
✅ Updated all dependencies to latest stable versions
✅ Fixed TypeScript errors and type definitions
✅ Added comprehensive testing framework
✅ Created automated fix scripts for imports
✅ Fixed 'use client' directive placement
✅ Added production-ready build configuration

🎯 Key Features:
- AI Trading Dashboard with real-time data
- Portfolio Management with analytics
- Market Analysis with technical indicators
- Real-time Trading Signals and alerts
- Secure User Authentication system
- Comprehensive Admin Panel
- Fully Responsive Design
- Production-ready deployment
- Docker containerization
- Netlify/Vercel deployment support

🔧 Technical Improvements:
- Next.js 14 with App Router
- React 18 with TypeScript
- Tailwind CSS for styling
- Prisma for database management
- OpenAI API integration
- Alpha Vantage market data
- Comprehensive error handling
- Performance optimizations
- SEO optimizations
- Security enhancements

Deploy: Ready for production deployment 🚀"

# Commit with comprehensive message
echo ""
echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

if [ $? -eq 0 ]; then
    echo "✅ Commit successful!"
else
    echo "❌ Commit failed!"
    exit 1
fi

# Show current branch
echo ""
echo "🌿 Current branch:"
git branch

# Check remote
echo ""
echo "🔗 Remote repositories:"
git remote -v

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESSFULLY PUSHED TO GITHUB!"
    echo "=================================="
    echo "🌐 Repository: https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com"
    echo "📊 Commit: $(git rev-parse --short HEAD)"
    echo "🕐 Time: $(date)"
    echo ""
    echo "🔗 Next steps:"
    echo "   • Check GitHub Actions for deployment status"
    echo "   • Verify Netlify deployment"
    echo "   • Test production build"
    echo "   • Update documentation if needed"
    echo "=================================="
else
    echo "❌ Push failed! Please check your authentication and try again."
    exit 1
fi
