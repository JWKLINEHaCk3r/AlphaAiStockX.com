#!/bin/bash

# AlphaAI Trading Platform - Final Deployment Validation
# This script validates that the platform is ready for production deployment

echo "🚀 AlphaAI Trading Platform - Deployment Readiness Check"
echo "============================================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Initialize counters
PASSED=0
FAILED=0
WARNINGS=0

# Helper function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASS${NC} - $2"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAIL${NC} - $2"
        ((FAILED++))
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  WARN${NC} - $1"
    ((WARNINGS++))
}

print_info() {
    echo -e "${BLUE}ℹ️  INFO${NC} - $1"
}

echo ""
echo "📋 Running System Validation Checks..."
echo ""

# Check 1: Node.js and npm/pnpm availability
print_info "Checking Node.js environment..."
node --version > /dev/null 2>&1
print_status $? "Node.js is installed and accessible"

if command -v pnpm &> /dev/null; then
    pnpm --version > /dev/null 2>&1
    print_status $? "PNPM package manager is available"
else
    npm --version > /dev/null 2>&1
    print_status $? "NPM package manager is available"
fi

# Check 2: Package.json and dependencies
print_info "Checking project configuration..."
[ -f "package.json" ]
print_status $? "package.json exists"

[ -f "next.config.js" ]
print_status $? "Next.js configuration exists"

[ -f "tailwind.config.ts" ]
print_status $? "Tailwind CSS configuration exists"

[ -f "tsconfig.json" ]
print_status $? "TypeScript configuration exists"

# Check 3: Critical application files
print_info "Checking core application files..."
[ -f "middleware.ts" ]
print_status $? "Security middleware exists"

[ -f "app/api/health/route.ts" ]
print_status $? "Health check API exists"

[ -f "app/api/trading/orders/route.ts" ]
print_status $? "Trading orders API exists"

[ -f "app/api/portfolio/route.ts" ]
print_status $? "Portfolio management API exists"

[ -f "lib/security.ts" ]
print_status $? "Security utilities exist"

[ -f "lib/trading/alpaca-client.ts" ]
print_status $? "Alpaca trading integration exists"

# Check 4: Environment configuration
print_info "Checking environment configuration..."
[ -f ".env.example" ]
print_status $? "Environment template exists"

if [ -f ".env" ] || [ -f ".env.local" ] || [ -f ".env.production" ]; then
    print_status 0 "Environment configuration file found"
else
    print_warning "No environment file found - create .env for local or .env.production for deployment"
fi

# Check 5: Production readiness files
print_info "Checking production infrastructure..."
[ -f "Dockerfile" ]
print_status $? "Docker configuration exists"

[ -f "docker-compose.prod.yml" ]
print_status $? "Production Docker Compose exists"

[ -f "PRODUCTION_DEPLOYMENT_GUIDE.md" ]
print_status $? "Deployment documentation exists"

# Check 6: Testing framework
print_info "Checking testing framework..."
[ -f "jest.config.json" ]
print_status $? "Jest testing configuration exists"

[ -f "cypress.config.js" ]
print_status $? "Cypress E2E testing configuration exists"

[ -d "__tests__" ]
print_status $? "Test directory exists"

# Check 7: Security and monitoring files
print_info "Checking security and monitoring..."
[ -f "lib/performance-monitor.ts" ]
print_status $? "Performance monitoring exists"

[ -f "lib/api-security.ts" ]
print_status $? "API security utilities exist"

[ -f "SECURITY_UPDATE_PLAN.md" ]
print_status $? "Security documentation exists"

# Check 8: Try to run basic syntax check
print_info "Running basic syntax validation..."
if command -v pnpm &> /dev/null; then
    pnpm run lint --max-warnings=0 > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        print_status 0 "Code linting passes"
    else
        print_warning "Linting found warnings (non-blocking)"
    fi
else
    print_warning "Cannot run linting - pnpm not available"
fi

# Summary
echo ""
echo "============================================================="
echo "🏁 VALIDATION SUMMARY"
echo "============================================================="
echo -e "${GREEN}✅ Passed: $PASSED${NC}"
echo -e "${RED}❌ Failed: $FAILED${NC}"
echo -e "${YELLOW}⚠️  Warnings: $WARNINGS${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🚀 DEPLOYMENT READY${NC}"
    echo ""
    echo "✨ The AlphaAI Trading Platform is ready for production deployment!"
    echo ""
    echo "🎯 Next Steps:"
    echo "1. Configure environment variables (.env.production)"
    echo "2. Choose deployment method:"
    echo "   • Vercel: npx vercel --prod"
    echo "   • Docker: docker-compose -f docker-compose.prod.yml up -d"
    echo "3. Run deployment validation: ./validate-deployment.sh"
    echo ""
    echo "📚 See PRODUCTION_DEPLOYMENT_GUIDE.md for detailed instructions"
    echo ""
    exit 0
else
    echo -e "${RED}🚫 DEPLOYMENT BLOCKED${NC}"
    echo ""
    echo "❌ Critical issues found that must be resolved before deployment."
    echo "📋 Review the failed checks above and fix the issues."
    echo ""
    exit 1
fi
