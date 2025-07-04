#!/bin/bash

# Netlify Configuration Validation Script
# This script validates that all configuration files are properly set up for Netlify deployment

echo "🔍 Validating Netlify deployment configuration..."
echo ""

# Check if netlify.toml exists and has required sections
echo "📋 Checking netlify.toml..."
if [ -f "netlify.toml" ]; then
    echo "✅ netlify.toml exists"
    
    if grep -q "\[build\]" netlify.toml; then
        echo "✅ [build] section found"
    else
        echo "❌ [build] section missing"
        exit 1
    fi
    
    if grep -q "command.*npm run build" netlify.toml; then
        echo "✅ Build command configured"
    else
        echo "❌ Build command missing or incorrect"
        exit 1
    fi
    
    if grep -q "publish.*out" netlify.toml; then
        echo "✅ Publish directory configured"
    else
        echo "❌ Publish directory missing or incorrect"
        exit 1
    fi
    
    if grep -q "NODE_VERSION.*18" netlify.toml; then
        echo "✅ Node.js version configured"
    else
        echo "❌ Node.js version missing or incorrect"
        exit 1
    fi
else
    echo "❌ netlify.toml not found"
    exit 1
fi

echo ""

# Check next.config.js
echo "📋 Checking next.config.js..."
if [ -f "next.config.js" ]; then
    echo "✅ next.config.js exists"
    
    if grep -q "output.*export" next.config.js; then
        echo "✅ Static export enabled"
    else
        echo "❌ Static export not configured"
        exit 1
    fi
    
    if grep -q "distDir.*out" next.config.js; then
        echo "✅ Output directory configured"
    else
        echo "❌ Output directory missing or incorrect"
        exit 1
    fi
    
    if grep -q "unoptimized.*true" next.config.js; then
        echo "✅ Image optimization disabled for static hosting"
    else
        echo "❌ Image optimization not properly configured"
        exit 1
    fi
else
    echo "❌ next.config.js not found"
    exit 1
fi

echo ""

# Check package.json
echo "📋 Checking package.json..."
if [ -f "package.json" ]; then
    echo "✅ package.json exists"
    
    if grep -q '"build".*"next build"' package.json; then
        echo "✅ Build script configured"
    else
        echo "❌ Build script missing or incorrect"
        exit 1
    fi
    
    if grep -q '"next".*"15\.' package.json; then
        echo "✅ Next.js 15+ detected"
    else
        echo "⚠️  Next.js version may be outdated"
    fi
else
    echo "❌ package.json not found"
    exit 1
fi

echo ""
echo "🎉 All configuration files are properly set up for Netlify deployment!"
echo ""
echo "🚀 Ready to deploy to Netlify:"
echo "   1. Go to https://netlify.com"
echo "   2. Import your GitHub repository"
echo "   3. Netlify will auto-detect the configuration"
echo "   4. Click 'Deploy site'"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
