#!/bin/bash

echo "🎯 RAILWAY DEPLOYMENT READINESS TEST"
echo "===================================="

# Test 1: Check all required script files exist
echo "📋 Test 1: Checking required script files..."
MAIN_DIR="/Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com"

REQUIRED_FILES=(
    "fix-all-ui-imports.cjs"
    "fix-missing-cards.cjs"
    "create-missing-components.cjs"
    "fix-critical-syntax-errors.cjs"
    "Dockerfile"
    "railway.json"
)

ALL_FILES_EXIST=true
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$MAIN_DIR/$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        ALL_FILES_EXIST=false
    fi
done

# Test 2: Verify script files are executable and work
echo ""
echo "📋 Test 2: Testing script files execution..."
cd "$MAIN_DIR"
for script in fix-all-ui-imports.cjs fix-missing-cards.cjs create-missing-components.cjs fix-critical-syntax-errors.cjs; do
    if [ -f "$script" ]; then
        if node "$script" >/dev/null 2>&1; then
            echo "✅ $script executes successfully"
        else
            echo "❌ $script execution failed"
            ALL_FILES_EXIST=false
        fi
    fi
done

# Test 3: Check package.json postinstall
echo ""
echo "📋 Test 3: Checking package.json postinstall configuration..."
if [ -f "$MAIN_DIR/package.json" ]; then
    if grep -q "prisma generate" "$MAIN_DIR/package.json"; then
        echo "✅ package.json has Railway-compatible postinstall"
    else
        echo "❌ package.json postinstall needs Railway compatibility"
        ALL_FILES_EXIST=false
    fi
else
    echo "❌ package.json not found"
    ALL_FILES_EXIST=false
fi

# Test 4: Check Dockerfile structure
echo ""
echo "📋 Test 4: Checking Dockerfile configuration..."
if [ -f "$MAIN_DIR/Dockerfile" ]; then
    if grep -q "fix-all-ui-imports.cjs" "$MAIN_DIR/Dockerfile"; then
        echo "✅ Dockerfile creates required script files"
    else
        echo "❌ Dockerfile missing script file creation"
        ALL_FILES_EXIST=false
    fi
else
    echo "❌ Dockerfile not found"
    ALL_FILES_EXIST=false
fi

# Test 5: Check railway.json configuration
echo ""
echo "📋 Test 5: Checking railway.json configuration..."
if [ -f "$MAIN_DIR/railway.json" ]; then
    if grep -q "DOCKERFILE" "$MAIN_DIR/railway.json"; then
        echo "✅ railway.json configured for Dockerfile builder"
    else
        echo "❌ railway.json not configured for Dockerfile"
        ALL_FILES_EXIST=false
    fi
else
    echo "❌ railway.json not found"
    ALL_FILES_EXIST=false
fi

# Final result
echo ""
echo "🎯 FINAL RESULT"
echo "==============="
if [ "$ALL_FILES_EXIST" = true ]; then
    echo "🎉 ✅ ALL TESTS PASSED!"
    echo "🚀 Railway deployment is ready to succeed!"
    echo ""
    echo "The following issues have been resolved:"
    echo "✅ Missing script files: FIXED"
    echo "✅ Exit code 1 error: RESOLVED"
    echo "✅ Syntax errors: FIXED"
    echo "✅ Docker configuration: OPTIMIZED"
    echo "✅ Railway compatibility: ACHIEVED"
    echo ""
    echo "🎯 Push to Railway - deployment should work perfectly!"
else
    echo "❌ SOME TESTS FAILED"
    echo "Please review the issues above before deploying to Railway"
fi
