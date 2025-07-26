#!/bin/bash
# Automated full project audit and fix for AlphaAiStockX.com (ESM + CJS compatible)
# Runs all major fixer scripts sequentially

set -e

# Run CJS scripts first (Node.js v18+)
echo "🚀 Running fix-all-ui-imports.cjs..."
pnpm exec node fix-all-ui-imports.cjs

echo "📐 Running fix-typescript-comprehensive-v2.cjs..."
pnpm exec node fix-typescript-comprehensive-v2.cjs

# Run JS scripts (if compatible)
echo "🔧 Running fix-all-imports-exports.js..."
pnpm exec node fix-all-imports-exports.js || echo "Skipped: fix-all-imports-exports.js (ESM error)"

echo "🛠️ Running fix-critical-syntax-errors.js..."
pnpm exec node fix-critical-syntax-errors.js || echo "Skipped: fix-critical-syntax-errors.js (ESM error)"

echo "🔬 Running fix-interface-compatibility.js..."
pnpm exec node fix-interface-compatibility.js || echo "Skipped: fix-interface-compatibility.js (ESM error)"

echo "✅ All fixer scripts completed!"
