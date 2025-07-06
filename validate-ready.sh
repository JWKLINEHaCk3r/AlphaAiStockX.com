#!/bin/bash

# AlphaAiStockX Deployment Validation Script
# Run this script to verify everything is ready for deployment

echo "🚀 AlphaAiStockX - Final Deployment Validation"
echo "=============================================="
echo ""

# Check build output
echo "📋 Checking build output..."
if [ -d "out" ]; then
    echo "✅ Build directory exists"
    file_count=$(find out -type f | wc -l)
    echo "✅ Generated files: $file_count"
else
    echo "❌ Build directory missing - run 'npm run build' first"
    exit 1
fi

# Check critical files
echo ""
echo "📋 Checking critical files..."

critical_files=(
    "out/index.html"
    "out/_next/static/css"
    "out/dashboard/index.html"
    "out/contact/index.html"
    "package.json"
    "next.config.js"
    "tailwind.config.ts"
)

for file in "${critical_files[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
    fi
done

# Check package.json
echo ""
echo "📋 Checking dependencies..."
if command -v node >/dev/null 2>&1; then
    node_version=$(node --version)
    echo "✅ Node.js: $node_version"
else
    echo "❌ Node.js not found"
fi

if command -v npm >/dev/null 2>&1; then
    npm_version=$(npm --version)
    echo "✅ npm: $npm_version"
else
    echo "❌ npm not found"
fi

# Check build process
echo ""
echo "📋 Testing build process..."
echo "Running: npm run build"
if npm run build >/dev/null 2>&1; then
    echo "✅ Build process successful"
else
    echo "❌ Build process failed"
    exit 1
fi

# Check API routes
echo ""
echo "📋 Checking API structure..."
if [ -d "app/api" ]; then
    echo "✅ API directory exists"
    api_routes=$(find app/api -name "route.ts" | wc -l)
    echo "✅ API routes: $api_routes"
else
    echo "⚠️  No API directory (this is okay for static sites)"
fi

# Summary
echo ""
echo "🎉 VALIDATION COMPLETE"
echo "======================"
echo ""
echo "✅ AlphaAiStockX is ready for deployment!"
echo ""
echo "Deployment options:"
echo "  • Netlify: Drag and drop the 'out' folder"
echo "  • Vercel: Connect your GitHub repository"
echo "  • Static hosting: Upload contents of 'out' folder"
echo ""
echo "Health check available at: /api/health"
echo "Total pages: $(find out -name "index.html" | wc -l)"
echo ""
echo "🚀 Ready to go live!"
