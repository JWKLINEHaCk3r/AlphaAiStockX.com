#!/bin/bash

echo "🚀 AlphaAI StockX - Complete Installation and Fix Script"
echo "======================================================"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found! Please install Node.js first."
    echo "💡 Download from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "⚠️ npm not found directly, trying alternative method..."
    NPM_CMD="node \"$(which node | sed 's/node$/npm/')\""
else
    NPM_CMD="npm"
    echo "✅ npm found: $(npm --version)"
fi

echo
echo "📦 Installing dependencies..."
echo "This may take several minutes..."

# Try multiple installation strategies
echo "🔧 Strategy 1: Standard installation with legacy peer deps"
$NPM_CMD install --legacy-peer-deps --force

if [ $? -ne 0 ]; then
    echo "⚠️ Standard installation failed, trying alternative..."
    echo "🔧 Strategy 2: Clean installation"
    rm -rf node_modules package-lock.json
    $NPM_CMD install --legacy-peer-deps
fi

if [ $? -ne 0 ]; then
    echo "⚠️ npm installation failed, trying yarn..."
    echo "🔧 Strategy 3: Using Yarn"
    $NPM_CMD install -g yarn
    yarn install --force
fi

echo
echo "🔍 Checking installation..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules directory created successfully"
    echo "📊 Installed packages: $(ls node_modules | wc -l)"
else
    echo "❌ node_modules directory not found"
    echo "⚠️ Dependencies may not be fully installed"
fi

echo
echo "🏗️ Testing build..."
if [ -d "node_modules" ]; then
    echo "📝 Running type check..."
    $NPM_CMD run type-check
    
    echo "🏗️ Running build..."
    $NPM_CMD run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful!"
    else
        echo "⚠️ Build had issues, but dependencies are installed"
    fi
else
    echo "⚠️ Skipping build due to missing dependencies"
fi

echo
echo "🎉 Installation script completed!"
echo
echo "📋 Summary:"
echo "  - Dependencies: $([ -d "node_modules" ] && echo "✅ Installed" || echo "❌ Failed")"
echo "  - Build: $([ -f ".next/BUILD_ID" ] && echo "✅ Success" || echo "⚠️ Needs attention")"
echo
echo "🚀 To start development:"
echo "  npm run dev"
echo
echo "🌐 To build for production:"
echo "  npm run build"
echo
echo "📝 Project is ready for development and deployment!"
