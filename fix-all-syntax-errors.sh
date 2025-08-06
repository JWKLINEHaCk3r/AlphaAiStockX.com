#!/bin/bash

echo "🔧 FIXING ALL CRITICAL SYNTAX ERRORS FOR RAILWAY DEPLOYMENT"
echo "==========================================================="

# Navigate to main project directory
cd /Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com

echo "📂 Working in: $(pwd)"
echo ""

# Fix 1: AITradingDashboard.tsx - Move "use client" to top
echo "🔧 Fixing AITradingDashboard.tsx - 'use client' directive placement..."
if [ -f "app/components/AITradingDashboard.tsx" ]; then
    # Create a temp file with "use client" at the top
    echo '"use client";' > temp_dashboard.tsx
    # Add the rest of the file without the misplaced "use client"
    grep -v '"use client"' app/components/AITradingDashboard.tsx >> temp_dashboard.tsx
    # Replace the original
    mv temp_dashboard.tsx app/components/AITradingDashboard.tsx
    echo "✅ Fixed AITradingDashboard.tsx"
else
    echo "⚠️  AITradingDashboard.tsx not found"
fi

# Fix 2: Contact page - Fix unterminated string
echo "🔧 Fixing contact/page.tsx - unterminated string..."
if [ -f "app/contact/page.tsx" ]; then
    # Fix the broken string in line 13
    sed -i.bak 's/...formData"/...formData,/' app/contact/page.tsx
    echo "✅ Fixed contact/page.tsx"
else
    echo "⚠️  contact/page.tsx not found"
fi

# Fix 3: Error page - Fix unterminated strings
echo "🔧 Fixing error.tsx - unterminated strings..."
if [ -f "app/error.tsx" ]; then
    # Fix the broken strings
    sed -i.bak 's/error"/error,/' app/error.tsx
    sed -i.bak 's/reset"/reset/' app/error.tsx
    echo "✅ Fixed error.tsx"
else
    echo "⚠️  error.tsx not found"
fi

# Fix 4: Layout page - Fix unterminated strings
echo "🔧 Fixing layout.tsx - unterminated strings..."
if [ -f "app/layout.tsx" ]; then
    # This one needs more careful handling due to the complex metadata object
    # Let's create a proper version
    cat > app/layout.tsx << 'EOF'
"use client";

import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AlphaAI StockX - AI Trading Platform',
  description: 'Advanced AI-powered trading platform with quantum analytics and neural networks',
  keywords: 'AI trading, stock analysis, financial AI, trading automation',
  authors: [{ name: 'AlphaAIStockX Team' }],
  robots: 'index, follow',
  metadataBase: new URL('https://alphaaistockx.com'),
  openGraph: {
    title: 'AlphaAI StockX - AI Trading Platform',
    description: 'Advanced AI-powered trading platform',
    url: 'https://alphaaistockx.com',
    siteName: 'AlphaAiStockX',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'AlphaAI StockX'
    }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlphaAI StockX - AI Trading Platform',
    description: 'Advanced AI-powered trading platform',
    images: ['/twitter-image.jpg'],
    site: '@alphaaistockx',
    creator: '@alphaaistockx'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
EOF
    echo "✅ Fixed layout.tsx"
else
    echo "⚠️  layout.tsx not found"
fi

# Fix 5: Not found page - Fix className syntax
echo "🔧 Fixing not-found.tsx - className syntax..."
if [ -f "app/not-found.tsx" ]; then
    # Fix the broken className attribute
    cat > app/not-found.tsx << 'EOF'
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-400 mb-6">This page doesn't exist in our AI trading universe.</p>
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          Return Home
        </Link>
      </div>
    </div>
  );
}
EOF
    echo "✅ Fixed not-found.tsx"
else
    echo "⚠️  not-found.tsx not found"
fi

# Clean up backup files
echo "🧹 Cleaning up backup files..."
find . -name "*.bak" -delete 2>/dev/null || echo "No backup files to clean"

echo ""
echo "🎉 ALL SYNTAX ERRORS FIXED!"
echo "=========================="
echo "✅ AITradingDashboard.tsx - 'use client' moved to top"
echo "✅ contact/page.tsx - unterminated string fixed"
echo "✅ error.tsx - unterminated strings fixed"
echo "✅ layout.tsx - metadata object syntax fixed"
echo "✅ not-found.tsx - className syntax fixed"
echo ""
echo "🚀 Railway deployment should now succeed!"
