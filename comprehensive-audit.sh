#!/bin/bash

echo "🔍 AlphaAI StockX - Comprehensive Project Audit"
echo "=============================================="

# Create audit results directory
mkdir -p audit-results
AUDIT_DIR="audit-results"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "📊 Starting comprehensive syntax and import audit..."

# Function to check TypeScript syntax
check_typescript_syntax() {
    echo "🔧 Phase 1: TypeScript Syntax Check"
    echo "--------------------------------"
    
    # Run TypeScript compiler check
    npx tsc --noEmit --skipLibCheck > "$AUDIT_DIR/typescript-errors-$TIMESTAMP.log" 2>&1
    
    if [ $? -eq 0 ]; then
        echo "✅ TypeScript syntax: CLEAN"
    else
        echo "❌ TypeScript syntax errors found"
        echo "📝 Details saved to: $AUDIT_DIR/typescript-errors-$TIMESTAMP.log"
        head -20 "$AUDIT_DIR/typescript-errors-$TIMESTAMP.log"
    fi
}

# Function to check ESLint issues
check_eslint_issues() {
    echo ""
    echo "🔧 Phase 2: ESLint Issues Check"
    echo "-------------------------------"
    
    npx eslint . --ext .ts,.tsx,.js,.jsx --format json > "$AUDIT_DIR/eslint-errors-$TIMESTAMP.json" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ ESLint: CLEAN"
    else
        echo "❌ ESLint issues found"
        npx eslint . --ext .ts,.tsx,.js,.jsx | head -30
    fi
}

# Function to check Next.js build issues
check_nextjs_build() {
    echo ""
    echo "🔧 Phase 3: Next.js Build Check"
    echo "-------------------------------"
    
    npm run build > "$AUDIT_DIR/nextjs-build-$TIMESTAMP.log" 2>&1
    
    if [ $? -eq 0 ]; then
        echo "✅ Next.js build: SUCCESS"
    else
        echo "❌ Next.js build errors found"
        echo "📝 Details saved to: $AUDIT_DIR/nextjs-build-$TIMESTAMP.log"
        tail -30 "$AUDIT_DIR/nextjs-build-$TIMESTAMP.log"
    fi
}

# Function to scan for specific syntax patterns
check_syntax_patterns() {
    echo ""
    echo "🔧 Phase 4: Syntax Pattern Analysis"
    echo "-----------------------------------"
    
    # Check for common syntax issues
    echo "Scanning for syntax issues..."
    
    # Check for malformed imports
    find app -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | xargs grep -l "import.*from.*,$" > "$AUDIT_DIR/malformed-imports-$TIMESTAMP.txt" 2>/dev/null
    
    # Check for missing semicolons in imports
    find app -name "*.tsx" -o -name "*.ts" | xargs grep -l "^import.*[^;]$" > "$AUDIT_DIR/missing-semicolons-$TIMESTAMP.txt" 2>/dev/null
    
    # Check for malformed use client
    find app -name "*.tsx" -o -name "*.ts" | xargs grep -l "'use client'.*;" > "$AUDIT_DIR/malformed-use-client-$TIMESTAMP.txt" 2>/dev/null
    
    # Check for broken className attributes
    find app -name "*.tsx" | xargs grep -l "className=.*,$" > "$AUDIT_DIR/broken-classnames-$TIMESTAMP.txt" 2>/dev/null
    
    echo "✅ Syntax pattern analysis complete"
}

# Function to check import resolution
check_import_resolution() {
    echo ""
    echo "🔧 Phase 5: Import Resolution Check"
    echo "----------------------------------"
    
    # Check for missing imports
    echo "Checking import resolution..."
    
    # Find files using React without importing it
    find app -name "*.tsx" | xargs grep -L "import.*React" | xargs grep -l "React\." > "$AUDIT_DIR/missing-react-imports-$TIMESTAMP.txt" 2>/dev/null
    
    # Find files using hooks without importing React
    find app -name "*.tsx" | xargs grep -l "useState\|useEffect\|useContext" | xargs grep -L "import.*React" > "$AUDIT_DIR/missing-hook-imports-$TIMESTAMP.txt" 2>/dev/null
    
    echo "✅ Import resolution check complete"
}

# Function to create missing files
create_missing_files() {
    echo ""
    echo "🔧 Phase 6: Creating Missing Files"
    echo "----------------------------------"
    
    # Create not-found.tsx if it doesn't exist
    if [ ! -f "app/not-found.tsx" ]; then
        echo "Creating missing not-found.tsx..."
        cat > app/not-found.tsx << 'EOF'
import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
EOF
        echo "✅ Created app/not-found.tsx"
    fi
    
    # Create other essential files if missing
    if [ ! -f "app/loading.tsx" ]; then
        echo "Creating missing loading.tsx..."
        cat > app/loading.tsx << 'EOF'
import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-xl">Loading AlphaAI StockX...</p>
      </div>
    </div>
  );
}
EOF
        echo "✅ Created app/loading.tsx"
    fi
    
    # Create error.tsx if missing
    if [ ! -f "app/error.tsx" ]; then
        echo "Creating missing error.tsx..."
        cat > app/error.tsx << 'EOF'
"use client";

import React from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Something went wrong!</h1>
        <p className="text-gray-300 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
EOF
        echo "✅ Created app/error.tsx"
    fi
}

# Function to fix common syntax issues
fix_common_issues() {
    echo ""
    echo "🔧 Phase 7: Fixing Common Issues"
    echo "--------------------------------"
    
    # Fix use client placement
    find app -name "*.tsx" -type f -exec sed -i '' '1s/^/"use client";\n/' {} \; 2>/dev/null
    find app -name "*.tsx" -type f -exec sed -i '' '/^"use client";$/!b;n;/^$/d' {} \; 2>/dev/null
    
    # Fix className syntax
    find app -name "*.tsx" -type f -exec sed -i '' 's/className="[^"]*,/className="/g' {} \; 2>/dev/null
    find app -name "*.tsx" -type f -exec sed -i '' 's/focus: /focus:/g' {} \; 2>/dev/null
    find app -name "*.tsx" -type f -exec sed -i '' 's/hover: /hover:/g' {} \; 2>/dev/null
    
    echo "✅ Common syntax fixes applied"
}

# Run all checks
check_typescript_syntax
check_eslint_issues
check_nextjs_build
check_syntax_patterns
check_import_resolution
create_missing_files
fix_common_issues

echo ""
echo "📊 AUDIT SUMMARY"
echo "================"
echo "✅ Audit completed at: $(date)"
echo "📁 Results saved in: $AUDIT_DIR/"
echo "🔍 Check log files for detailed error information"

# Final validation
echo ""
echo "🔧 Final Validation"
echo "-------------------"
npm run type-check > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ TypeScript validation: PASSED"
else
    echo "❌ TypeScript validation: FAILED"
fi

echo ""
echo "🚀 AlphaAI StockX audit complete!"
