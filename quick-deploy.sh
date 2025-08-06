#!/bin/bash

# Quick Deployment Script for AlphaAI StockX
# Run this script from your project directory

echo "🚀 AlphaAI StockX - Quick Deploy Script"
echo "======================================"

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: package.json not found. Please run from project root."
    exit 1
fi

echo "✅ Project directory confirmed"

# Step 1: Build verification
echo "📦 Building project..."
npm run build

if [[ $? -ne 0 ]]; then
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

# Step 2: Git setup and push
echo "📤 Preparing GitHub deployment..."

# Add all files
git add .

# Check if there are changes
if git diff --staged --quiet; then
    echo "ℹ️  No new changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Deploy AlphaAI StockX v2.0 - Production Ready

🚀 Features:
- Complete Next.js 15.4.4 with TypeScript
- Responsive design with mobile navigation
- Accessibility compliance (WCAG 2.1 AA)
- Real-time trading dashboard
- Portfolio management system
- Comprehensive error handling
- Loading states and animations

🔧 Infrastructure:
- Railway deployment configuration
- Netlify deployment with Next.js plugin
- GitHub Actions CI/CD pipeline
- Docker containerization
- Environment variables setup

🎨 UI/UX Enhancements:
- Modern card-based design
- Smooth animations and transitions
- Dark/light theme support
- Mobile-first responsive layout
- Accessibility features throughout"
fi

# Check if remote exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "✅ GitHub remote configured"
    echo "📤 Pushing to GitHub..."
    git push origin main
else
    echo "⚠️  GitHub remote not configured"
    echo "Please run: git remote add origin YOUR_GITHUB_REPO_URL"
    echo "Then run: git push -u origin main"
fi

echo ""
echo "🎉 GitHub deployment ready!"
echo ""

# Step 3: Railway deployment
echo "🚄 Railway Deployment"
echo "===================="
echo "To deploy to Railway:"
echo "1. Install Railway CLI: npm install -g @railway/cli"
echo "2. Login: railway login"
echo "3. Deploy: railway deploy"
echo ""

# Step 4: Netlify deployment  
echo "🌐 Netlify Deployment"
echo "==================="
echo "To deploy to Netlify:"
echo "1. Install Netlify CLI: npm install -g netlify-cli"
echo "2. Login: netlify login"
echo "3. Deploy: netlify deploy --prod"
echo ""

echo "📋 Quick Commands:"
echo "=================="
echo "# Railway deploy:"
echo "railway deploy"
echo ""
echo "# Netlify deploy:"
echo "netlify deploy --prod"
echo ""

echo "✨ All configuration files are ready!"
echo "Your project includes:"
echo "- railway.toml (Railway config)"
echo "- netlify.toml (Netlify config)"
echo "- .github/workflows/deploy.yml (CI/CD)"
echo "- Dockerfile.railway (Container config)"
echo ""

echo "🔗 After deployment, your app will be available at:"
echo "- GitHub: https://github.com/YOUR_USERNAME/AlphaAiStockX.com"
echo "- Railway: https://YOUR_APP.railway.app"
echo "- Netlify: https://YOUR_APP.netlify.app"
echo ""

echo "✅ Deployment preparation complete! 🚀"
