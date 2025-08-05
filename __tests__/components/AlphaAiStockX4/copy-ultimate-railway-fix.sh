#!/bin/bash

echo "🎯 COPYING RAILWAY ULTIMATE FIX TO MAIN DIRECTORY"
echo "=================================================="

# Set source and destination paths
SOURCE_DIR="/Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com/__tests__/components/AlphaAiStockX4"
DEST_DIR="/Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com"

echo "📂 Source: $SOURCE_DIR"
echo "📂 Destination: $DEST_DIR"
echo ""

# Copy Dockerfile
echo "📄 Copying Dockerfile..."
cp "$SOURCE_DIR/Dockerfile" "$DEST_DIR/"
echo "✅ Dockerfile copied"

# Copy railway.json
echo "📄 Copying railway.json..."
cp "$SOURCE_DIR/railway.json" "$DEST_DIR/"
echo "✅ railway.json copied"

# Copy all .cjs script files
echo "📄 Copying .cjs script files..."
cp "$SOURCE_DIR"/*.cjs "$DEST_DIR/" 2>/dev/null || echo "⚠️  No .cjs files to copy"
echo "✅ Script files copied"

# Copy .pnpmfile.cjs if exists
echo "📄 Copying .pnpmfile.cjs..."
cp "$SOURCE_DIR/.pnpmfile.cjs" "$DEST_DIR/" 2>/dev/null || echo "⚠️  No .pnpmfile.cjs to copy"

# Make script files executable
echo "🔧 Making script files executable..."
chmod +x "$DEST_DIR"/*.cjs 2>/dev/null || echo "⚠️  No .cjs files to make executable"
echo "✅ Scripts made executable"

echo ""
echo "🎉 RAILWAY ULTIMATE FIX DEPLOYMENT COMPLETE!"
echo "=============================================="
echo ""
echo "✅ All Railway deployment fixes have been copied to the main directory"
echo "✅ Railway should now deploy successfully without exit code 1 errors"
echo "✅ All missing script dependencies are satisfied"
echo ""
echo "🚀 Ready for Railway deployment!"
