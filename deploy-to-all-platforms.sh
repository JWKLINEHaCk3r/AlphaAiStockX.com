#!/bin/bash

# AlphaAI StockX - Complete Deployment Script
# Deploys to GitHub, Railway, and Netlify

set -e

echo "🚀 Starting AlphaAI StockX deployment to all platforms..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_status "Checking project dependencies..."

# Install dependencies if needed
if [[ ! -d "node_modules" ]]; then
    print_status "Installing dependencies..."
    npm install
fi

# Build the project to ensure everything works
print_status "Building project..."
npm run build

if [[ $? -ne 0 ]]; then
    print_error "Build failed! Please fix build errors before deployment."
    exit 1
fi

print_success "Build successful!"

# 1. GITHUB DEPLOYMENT
print_status "=== GITHUB DEPLOYMENT ==="

# Check if git is initialized
if [[ ! -d ".git" ]]; then
    print_status "Initializing git repository..."
    git init
fi

# Add all files
print_status "Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    print_warning "No changes to commit"
else
    print_status "Committing changes..."
    git commit -m "Deploy AlphaAI StockX v2.0 - Production ready with full UI/UX enhancements

- Complete Next.js 15.4.4 application with TypeScript
- Accessibility-compliant UI components (WCAG 2.1 AA)
- Responsive design with mobile navigation
- Comprehensive error handling and loading states
- Railway, Netlify, and GitHub Actions CI/CD configurations
- SEO optimization and performance enhancements
- Real-time trading dashboard with portfolio management"
fi

# Add GitHub remote if it doesn't exist
if ! git remote get-url origin >/dev/null 2>&1; then
    print_status "Setting up GitHub remote..."
    echo "Please enter your GitHub repository URL (e.g., https://github.com/username/AlphaAiStockX.com.git):"
    read -r GITHUB_URL
    git remote add origin "$GITHUB_URL"
else
    print_status "GitHub remote already configured"
fi

# Push to GitHub
print_status "Pushing to GitHub..."
git branch -M main
git push -u origin main

if [[ $? -eq 0 ]]; then
    print_success "Successfully pushed to GitHub!"
else
    print_error "Failed to push to GitHub. Please check your credentials and repository settings."
fi

# 2. RAILWAY DEPLOYMENT
print_status "=== RAILWAY DEPLOYMENT ==="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    print_warning "Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Check if logged in to Railway
if ! railway whoami >/dev/null 2>&1; then
    print_status "Please login to Railway..."
    railway login
fi

# Deploy to Railway
print_status "Deploying to Railway..."
railway deploy

if [[ $? -eq 0 ]]; then
    print_success "Successfully deployed to Railway!"
    railway status
else
    print_error "Railway deployment failed. Please check the logs."
fi

# 3. NETLIFY DEPLOYMENT
print_status "=== NETLIFY DEPLOYMENT ==="

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    print_warning "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Check if logged in to Netlify
if ! netlify status >/dev/null 2>&1; then
    print_status "Please login to Netlify..."
    netlify login
fi

# Deploy to Netlify
print_status "Deploying to Netlify..."
netlify deploy --prod

if [[ $? -eq 0 ]]; then
    print_success "Successfully deployed to Netlify!"
    netlify status
else
    print_error "Netlify deployment failed. Please check the logs."
fi

print_success "🎉 Deployment complete!"
print_status "Your AlphaAI StockX application is now live on:"
print_status "📱 GitHub: https://github.com/[your-username]/AlphaAiStockX.com"
print_status "🚄 Railway: Check your Railway dashboard for the live URL"
print_status "🌐 Netlify: Check your Netlify dashboard for the live URL"

echo ""
print_status "Next steps:"
echo "1. Configure any environment variables needed for production"
echo "2. Set up custom domains (optional)"
echo "3. Monitor application performance and logs"
echo "4. Set up monitoring and alerts"

print_success "AlphaAI StockX deployment completed successfully! 🚀"
