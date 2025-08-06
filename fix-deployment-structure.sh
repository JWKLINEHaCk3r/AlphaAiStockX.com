#!/bin/bash

echo "🔧 Fixing AlphaAI StockX Deployment Structure"
echo "============================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Navigate to the root repository directory${NC}"
cd /Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com

echo -e "${YELLOW}Step 2: Remove problematic files from root${NC}"
rm -f package.json package-lock.json

echo -e "${YELLOW}Step 3: Copy our working project files to root${NC}"
cp -r __tests__/components/AlphaAiStockX4/* .

echo -e "${YELLOW}Step 4: Remove the nested directory${NC}"
rm -rf __tests__

echo -e "${YELLOW}Step 5: Initialize git repository in root${NC}"
git init
git add .
git commit -m "Deploy AlphaAI StockX v2.0 - Production Ready Trading Platform

🚀 Features:
- Complete Next.js 15.4.4 with TypeScript
- Responsive design with mobile navigation
- Accessibility compliance (WCAG 2.1 AA)  
- Real-time trading dashboard
- Portfolio management system
- Comprehensive error handling

🔧 Infrastructure:
- Railway deployment configuration
- Netlify deployment with Next.js plugin
- GitHub Actions CI/CD pipeline
- Environment variables setup

🎨 UI/UX Enhancements:
- Modern card-based design
- Smooth animations and transitions
- Mobile-first responsive layout
- Accessibility features throughout"

echo -e "${YELLOW}Step 6: Add GitHub remote${NC}"
git remote add origin https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com.git

echo -e "${YELLOW}Step 7: Push to GitHub${NC}"
git branch -M main
git push -u origin main --force

echo -e "${GREEN}✅ Repository structure fixed!${NC}"
echo ""
echo "Your AlphaAI StockX is now properly configured for deployment!"
echo ""
echo "Next steps:"
echo "1. Check GitHub repository: https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com"
echo "2. Deploy to Railway: railway deploy"
echo "3. Deploy to Netlify: netlify deploy --prod"
