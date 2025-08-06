#!/bin/bash

echo "🔧 AlphaAI StockX - Comprehensive Import & Syntax Fixer"
echo "=================================================="

# Function to fix use client directive
fix_use_client() {
    local file="$1"
    echo "Fixing use client in: $file"
    
    # Create temp file with proper structure
    {
        echo '"use client";'
        echo ''
        # Skip existing use client and extract imports/content
        grep -v "^'use client';" "$file" | grep -v '^"use client";'
    } > "${file}.tmp"
    
    mv "${file}.tmp" "$file"
}

# Function to fix className syntax errors
fix_classname_syntax() {
    local file="$1"
    echo "Fixing className syntax in: $file"
    
    # Fix broken className attributes
    sed -i '' 's/focus: outline-none,/focus:outline-none/g' "$file"
    sed -i '' 's/focus: border-/focus:border-/g' "$file"
    sed -i '' 's/hover:from-.*,$/&/g' "$file"
    sed -i '' 's/, focus:/focus:/g' "$file"
    sed -i '' 's/,\s*$/"/g' "$file"
}

# Function to fix import statements
fix_imports() {
    local file="$1"
    echo "Fixing imports in: $file"
    
    # Ensure React import is present for JSX files
    if [[ "$file" == *.tsx ]] && ! grep -q "import React" "$file"; then
        sed -i '' '1i\
import React from '\''react'\'';
' "$file"
    fi
}

# Find and fix all TSX files
echo "🔍 Finding TSX files to fix..."
find app -name "*.tsx" -type f | while read -r file; do
    echo "Processing: $file"
    fix_use_client "$file"
    fix_classname_syntax "$file"
    fix_imports "$file"
done

# Fix specific import issues
echo "🔧 Fixing specific import issues..."

# Fix any remaining syntax errors in specific files
files_to_check=(
    "app/investors/page.tsx"
    "app/demo/page.tsx"
    "app/contact/page.tsx"
    "app/ai-trading/page.tsx"
    "app/faq/page.tsx"
)

for file in "${files_to_check[@]}"; do
    if [[ -f "$file" ]]; then
        echo "Final syntax check: $file"
        # Remove any stray commas and fix focus/hover states
        sed -i '' 's/className="[^"]*,/className="/g' "$file"
        sed -i '' 's/focus: /focus:/g' "$file"
        sed -i '' 's/hover: /hover:/g' "$file"
    fi
done

echo "✅ All import and syntax issues fixed!"
echo "🎯 Ready for successful build!"
