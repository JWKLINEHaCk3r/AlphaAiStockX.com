#!/bin/bash
# Automated full project audit and fix for AlphaAiStockX.com
# Runs all major fixer scripts sequentially

set -e

echo "🔧 Running fix-all-imports-exports.js..."
pnpm exec node fix-all-imports-exports.js


echo "🛠️ Running fix-critical-syntax-errors.js..."
pnpm exec node fix-critical-syntax-errors.js

echo "📐 Running fix-typescript-comprehensive-v2.js..."
pnpm exec node fix-typescript-comprehensive-v2.js

echo "🔬 Running fix-interface-compatibility.js..."
pnpm exec node fix-interface-compatibility.js

echo "✅ All fixer scripts completed!"
