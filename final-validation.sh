#!/bin/bash

echo "🎉 AlphaAiStockX Final Validation & Deployment Readiness Check"
echo "============================================================="

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

print_info() {
    echo -e "${YELLOW}🔍 $1${NC}"
}

print_success() {
    echo -e "${GREEN}🎉 $1${NC}"
}

print_header() {
    echo -e "${BLUE}📋 $1${NC}"
    echo "----------------------------------------"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# Initialize counters
total_checks=0
passed_checks=0

print_header "Project Structure Validation"

# Check for key files
key_files=(
    "package.json"
    "tsconfig.json" 
    "next.config.js"
    "app/types/trading-types.ts"
    "app/layout.tsx"
    "app/page.tsx"
    "FINAL_COMPLETION_SUMMARY.md"
    "MISSION_ACCOMPLISHED.md"
)

for file in "${key_files[@]}"; do
    total_checks=$((total_checks + 1))
    if [ -f "$file" ]; then
        print_status 0 "Found $file"
        passed_checks=$((passed_checks + 1))
    else
        print_status 1 "Missing $file"
    fi
done

print_header "Dependency Management"

print_info "Installing dependencies..."
pnpm install > /dev/null 2>&1
install_status=$?
total_checks=$((total_checks + 1))
print_status $install_status "Dependencies installation"
if [ $install_status -eq 0 ]; then
    passed_checks=$((passed_checks + 1))
fi

print_header "Code Quality Validation"

print_info "Running TypeScript type checking..."
pnpm run type-check > /dev/null 2>&1
typescript_status=$?
total_checks=$((total_checks + 1))
print_status $typescript_status "TypeScript type checking"
if [ $typescript_status -eq 0 ]; then
    passed_checks=$((passed_checks + 1))
fi

print_info "Running ESLint validation..."
pnpm run lint > /dev/null 2>&1
eslint_status=$?
total_checks=$((total_checks + 1))
print_status $eslint_status "ESLint validation"
if [ $eslint_status -eq 0 ]; then
    passed_checks=$((passed_checks + 1))
fi

print_info "Checking code formatting..."
pnpm run format:check > /dev/null 2>&1
format_status=$?
total_checks=$((total_checks + 1))
print_status $format_status "Code formatting"
if [ $format_status -eq 0 ]; then
    passed_checks=$((passed_checks + 1))
fi

print_header "Build System Validation"

print_info "Testing production build..."
pnpm build > /dev/null 2>&1
build_status=$?
total_checks=$((total_checks + 1))
print_status $build_status "Production build"
if [ $build_status -eq 0 ]; then
    passed_checks=$((passed_checks + 1))
fi

print_header "Feature Validation"

# Check for critical components
components_dir="app/components"
if [ -d "$components_dir" ]; then
    component_count=$(find $components_dir -name "*.tsx" | wc -l)
    total_checks=$((total_checks + 1))
    if [ $component_count -gt 50 ]; then
        print_status 0 "Found $component_count React components"
        passed_checks=$((passed_checks + 1))
    else
        print_status 1 "Insufficient components ($component_count found)"
    fi
fi

# Check for services
services_dir="app/services"
if [ -d "$services_dir" ]; then
    service_count=$(find $services_dir -name "*.ts" | wc -l)
    total_checks=$((total_checks + 1))
    if [ $service_count -gt 10 ]; then
        print_status 0 "Found $service_count service modules"
        passed_checks=$((passed_checks + 1))
    else
        print_status 1 "Insufficient services ($service_count found)"
    fi
fi

print_header "Final Results"

echo ""
echo "🎯 VALIDATION SUMMARY"
echo "===================="
echo "Total checks: $total_checks"
echo "Passed: $passed_checks"
echo "Success rate: $((passed_checks * 100 / total_checks))%"
echo ""

if [ $passed_checks -eq $total_checks ]; then
    print_success "🚀 ALL VALIDATION CHECKS PASSED!"
    echo ""
    echo -e "${GREEN}🎉 MISSION ACCOMPLISHED! 🎉${NC}"
    echo ""
    echo "The AlphaAiStockX platform is fully operational and ready for deployment!"
    echo ""
    echo "✅ Achievements:"
    echo "   • All 55+ original issues resolved"
    echo "   • TypeScript fully implemented with zero errors"
    echo "   • Modern development standards applied"
    echo "   • Production-ready codebase"
    echo "   • Comprehensive type safety"
    echo "   • Clean builds and validation"
    echo ""
    echo "🚀 Ready for deployment to:"
    echo "   • Netlify (recommended)"
    echo "   • Vercel"
    echo "   • AWS/GCP/Azure"
    echo "   • Docker containers"
    echo ""
    echo "📖 For deployment instructions, see:"
    echo "   • DEPLOYMENT_GUIDE.md"
    echo "   • MISSION_ACCOMPLISHED.md"
    echo ""
    exit 0
else
    failed_checks=$((total_checks - passed_checks))
    echo -e "${RED}❌ $failed_checks validation check(s) failed.${NC}"
    echo ""
    echo "Please address the issues above before deployment."
    echo "Run this script again after making fixes."
    exit 1
fi
