#!/bin/bash

# AlphaAI StockX Deployment Script
# Deploys to Railway, Netlify, and GitHub

set -e

echo "🚀 Starting AlphaAI StockX Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project directory
PROJECT_DIR="/Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com/__tests__/components/AlphaAiStockX4"

cd "$PROJECT_DIR"

echo -e "${BLUE}📁 Working directory: $(pwd)${NC}"

# Step 1: Build and test the project
echo -e "\n${YELLOW}🔨 Building and testing project...${NC}"
npm run type-check
npm run lint
npm run build

echo -e "${GREEN}✅ Build completed successfully!${NC}"

# Step 2: Git operations
echo -e "\n${YELLOW}📝 Preparing Git repository...${NC}"
git add .
git commit -m "Production deployment: $(date)" || echo "No changes to commit"

# Step 3: GitHub deployment
echo -e "\n${YELLOW}🐙 Deploying to GitHub...${NC}"
if ! git remote get-url origin > /dev/null 2>&1; then
    echo -e "${RED}⚠️  No GitHub remote found. Please add GitHub remote manually:${NC}"
    echo "git remote add origin https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com.git"
    echo "git branch -M main"
    echo "git push -u origin main"
else
    git push origin main
    echo -e "${GREEN}✅ Deployed to GitHub!${NC}"
fi

# Step 4: Railway deployment
echo -e "\n${YELLOW}🚂 Deploying to Railway...${NC}"
if command -v railway >/dev/null 2>&1; then
    if railway login --check > /dev/null 2>&1; then
        railway deploy
        echo -e "${GREEN}✅ Deployed to Railway!${NC}"
    else
        echo -e "${RED}⚠️  Please login to Railway first: railway login${NC}"
    fi
else
    echo -e "${RED}⚠️  Railway CLI not found. Installing...${NC}"
    npm install -g @railway/cli
    echo -e "${YELLOW}Please run 'railway login' and then deploy with 'railway deploy'${NC}"
fi

# Step 5: Netlify deployment
echo -e "\n${YELLOW}🌐 Deploying to Netlify...${NC}"
if command -v netlify >/dev/null 2>&1; then
    if netlify status > /dev/null 2>&1; then
        netlify deploy --prod
        echo -e "${GREEN}✅ Deployed to Netlify!${NC}"
    else
        echo -e "${RED}⚠️  Please login to Netlify first: netlify login${NC}"
    fi
else
    echo -e "${RED}⚠️  Netlify CLI not found. Installing...${NC}"
    npm install -g netlify-cli
    echo -e "${YELLOW}Please run 'netlify login' and then deploy with 'netlify deploy --prod'${NC}"
fi

echo -e "\n${GREEN}🎉 Deployment process completed!${NC}"
echo -e "\n${BLUE}📊 Deployment Status:${NC}"
echo -e "🐙 GitHub: https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com"
echo -e "🚂 Railway: Check your Railway dashboard"
echo -e "🌐 Netlify: Check your Netlify dashboard"

echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Check deployment status in respective dashboards"
echo "2. Configure environment variables for production"
echo "3. Set up custom domains if needed"
echo "4. Configure monitoring and analytics"
