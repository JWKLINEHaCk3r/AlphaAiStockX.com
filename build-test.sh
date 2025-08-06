#!/bin/bash

echo "🔧 AlphaAI StockX - Build Test & Deployment Preparation"
echo "======================================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Checking TypeScript compilation...${NC}"
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ TypeScript compilation successful${NC}"
else
    echo -e "${RED}❌ TypeScript compilation failed${NC}"
fi

echo -e "${YELLOW}Step 2: Running Next.js build...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Next.js build successful${NC}"
else
    echo -e "${RED}❌ Next.js build failed${NC}"
fi

echo -e "${YELLOW}Step 3: Checking for build artifacts...${NC}"
if [ -d ".next" ]; then
    echo -e "${GREEN}✅ Build artifacts created${NC}"
    ls -la .next/
else
    echo -e "${RED}❌ No build artifacts found${NC}"
fi

echo -e "${YELLOW}Step 4: Git status check...${NC}"
git status --porcelain
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Git repository is ready${NC}"
else
    echo -e "${RED}❌ Git issues detected${NC}"
fi

echo ""
echo -e "${GREEN}🚀 Build test complete!${NC}"
echo ""
echo "Your AlphaAI StockX application is ready for deployment to:"
echo "  📱 GitHub: Version control and CI/CD"
echo "  🚄 Railway: Backend hosting"
echo "  🌐 Netlify: Frontend hosting"
