#!/bin/bash

echo "🔧 CREATING ALL COMPONENTS AND FIXING IMPORTS"
echo "============================================="

# Create directory structure
mkdir -p app/{portfolio,analytics} components/{ui,trading} lib types

# Create Button component
mkdir -p components/ui
cat > components/ui/button.tsx << 'BUTTON_EOF'
'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  asChild?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const Component = asChild ? 'span' : 'button'
    
    return (
      <Component
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'border border-input hover:bg-accent hover:text-accent-foreground': variant === 'outline',
          },
          {
            'h-10 py-2 px-4': size === 'default',
            'h-9 px-3 rounded-md': size === 'sm',
            'h-11 px-8 rounded-md': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Button.displayName = 'Button'
BUTTON_EOF

# Create TradingCard component
cat > components/trading/TradingCard.tsx << 'CARD_EOF'
'use client'

import React from 'react'

interface TradingCardProps {
  symbol?: string
  name?: string
  price?: number
  change?: number
  volume?: string
  title?: string
  description?: string
  href?: string
}

export function TradingCard({ 
  symbol, 
  name, 
  price, 
  change, 
  volume, 
  title, 
  description, 
  href 
}: TradingCardProps) {
  if (title && description) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105">
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
        {href && (
          <a 
            href={href} 
            className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors"
          >
            Learn More →
          </a>
        )}
      </div>
    )
  }

  const changeColor = change && change > 0 ? 'text-green-400' : 'text-red-400'
  const changePrefix = change && change > 0 ? '+' : ''

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{symbol}</h3>
          <p className="text-gray-400 text-sm">{name}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">${price?.toFixed(2)}</p>
          <p className={cn('text-sm font-medium', changeColor)}>
            {changePrefix}{change?.toFixed(2)}%
          </p>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>Volume</span>
        <span>{volume}</span>
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
CARD_EOF

# Create lib/utils.ts
cat > lib/utils.ts << 'UTILS_EOF'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
UTILS_EOF

# Create app/layout.tsx
cat > app/layout.tsx << 'LAYOUT_EOF'
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AlphaAI StockX - AI Trading Platform',
  description: 'Advanced AI-powered trading platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
LAYOUT_EOF

# Create app/page.tsx
cat > app/page.tsx << 'PAGE_EOF'
'use client'

import Link from 'next/link'
import { TradingCard } from '@/components/trading/TradingCard'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            🚀 AlphaAI StockX
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Next-Generation AI-Powered Trading Platform
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/portfolio">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                View Portfolio
              </Button>
            </Link>
            <Link href="/analytics">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Market Analytics
              </Button>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TradingCard
            symbol="AAPL"
            name="Apple Inc."
            price={150.25}
            change={2.5}
            volume="45.2M"
          />
          <TradingCard
            symbol="TSLA"
            name="Tesla, Inc."
            price={245.80}
            change={-1.2}
            volume="32.1M"
          />
          <TradingCard
            symbol="MSFT"
            name="Microsoft Corporation"
            price={378.90}
            change={0.8}
            volume="28.5M"
          />
        </div>
      </div>
    </div>
  )
}
PAGE_EOF

# Create app/globals.css
cat > app/globals.css << 'CSS_EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
CSS_EOF

echo "✅ All components created successfully!"
echo "📦 Testing imports..."

