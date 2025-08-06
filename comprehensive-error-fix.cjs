#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 COMPREHENSIVE ERROR FIX & COMPONENT CREATION');
console.log('===============================================');

const projectRoot = process.cwd();
let totalIssuesFixed = 0;

// Create essential directories if they don't exist
function createDirectories() {
    console.log('\n📁 Creating Missing Directories...');
    
    const dirs = [
        'app',
        'app/components',
        'app/ai-trading',
        'app/contact',
        'app/portfolio',
        'app/analytics',
        'components/ui',
        'components/trading',
        'lib',
        'hooks',
        'types',
        'public'
    ];
    
    dirs.forEach(dir => {
        const dirPath = path.join('../../..', dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`✅ Created: ${dir}`);
            totalIssuesFixed++;
        }
    });
}

// Create essential files that are missing
function createEssentialFiles() {
    console.log('\n📝 Creating Essential Files...');
    
    const essentialFiles = [
        {
            path: '../../../app/layout.tsx',
            content: `import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}`
        },
        {
            path: '../../../app/page.tsx',
            content: `import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TradingCard } from '@/components/trading/TradingCard'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            AlphaAI StockX
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Advanced AI-Powered Trading Platform with Quantum Analytics and Neural Networks
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            <Link href="/ai-trading">Start Trading</Link>
          </Button>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <TradingCard
            title="🤖 AI Trading"
            description="Leverage advanced machine learning algorithms for intelligent trading decisions with real-time market analysis."
            href="/ai-trading"
          />
          <TradingCard
            title="📊 Analytics"
            description="Real-time market analysis with quantum-powered insights and predictive modeling."
            href="/analytics"
          />
          <TradingCard
            title="💼 Portfolio"
            description="Manage your investments with AI-driven portfolio optimization and risk management."
            href="/portfolio"
          />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <p className="text-3xl font-bold text-blue-400 mb-2">99.9%</p>
            <p className="text-gray-400">Uptime</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <p className="text-3xl font-bold text-green-400 mb-2">$2.5B+</p>
            <p className="text-gray-400">Volume Traded</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <p className="text-3xl font-bold text-purple-400 mb-2">10,000+</p>
            <p className="text-gray-400">Active Users</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <p className="text-3xl font-bold text-cyan-400 mb-2">24/7</p>
            <p className="text-gray-400">AI Monitoring</p>
          </div>
        </div>
      </div>
    </div>
  )
}`
        },
        {
            path: '../../../app/globals.css',
            content: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}`
        },
        {
            path: '../../../lib/utils.ts',
            content: `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Null safety utilities
export function isNull(value: any): value is null {
  return value === null;
}

export function isUndefined(value: any): value is undefined {
  return value === undefined;
}

export function isNullOrUndefined(value: any): value is null | undefined {
  return isNull(value) || isUndefined(value);
}

export function safeGet<T>(obj: any, path: string, defaultValue?: T): T {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (isNullOrUndefined(result) || !(key in result)) {
      return defaultValue as T;
    }
    result = result[key];
  }
  
  return result;
}

// Environment utilities
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';

// Format utilities
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}

export function formatPercentage(value: number, decimals = 2): string {
  return \`$\{(value * 100).toFixed(decimals)}%\`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}`
        },
        {
            path: '../../../components/ui/button.tsx',
            content: `'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }`
        },
        {
            path: '../../../components/trading/TradingCard.tsx',
            content: `import Link from 'next/link'

interface TradingCardProps {
  title: string
  description: string
  href: string
}

export function TradingCard({ title, description, href }: TradingCardProps) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:bg-gray-800/70">
      <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>
      <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
      <Link 
        href={href} 
        className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
      >
        Learn More →
      </Link>
    </div>
  )
}`
        }
    ];
    
    essentialFiles.forEach(file => {
        const filePath = file.path;
        const dir = path.dirname(filePath);
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, file.content);
            console.log(`✅ Created: ${file.path}`);
            totalIssuesFixed++;
        }
    });
}

// Create additional UI components
function createUIComponents() {
    console.log('\n🎨 Creating UI Components...');
    
    const components = [
        {
            path: '../../../components/ui/card.tsx',
            content: `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }`
        }
    ];
    
    components.forEach(component => {
        const filePath = component.path;
        const dir = path.dirname(filePath);
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, component.content);
            console.log(`✅ Created: ${component.path}`);
            totalIssuesFixed++;
        }
    });
}

// Fix TypeScript configuration
function fixTypeScriptConfig() {
    console.log('\n⚙️ Fixing TypeScript Configuration...');
    
    const tsConfigPath = '../../../tsconfig.json';
    const tsConfig = {
        compilerOptions: {
            target: "es5",
            lib: ["dom", "dom.iterable", "es6"],
            allowJs: true,
            skipLibCheck: true,
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            module: "esnext",
            moduleResolution: "bundler",
            resolveJsonModule: true,
            isolatedModules: true,
            jsx: "preserve",
            incremental: true,
            plugins: [
                {
                    name: "next"
                }
            ],
            paths: {
                "@/*": ["./*"]
            }
        },
        include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
        exclude: ["node_modules"]
    };
    
    if (!fs.existsSync(tsConfigPath)) {
        fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
        console.log(`✅ Created: tsconfig.json`);
        totalIssuesFixed++;
    }
}

// Run all fixes
try {
    createDirectories();
    createEssentialFiles();
    createUIComponents();
    fixTypeScriptConfig();
    
    console.log(`\n🎉 COMPREHENSIVE FIX COMPLETE!`);
    console.log(`✅ Total Issues Fixed: ${totalIssuesFixed}`);
    console.log(`🚀 AlphaAI StockX is now ready for development!`);
    
} catch (error) {
    console.error(`❌ Error during fix: ${error.message}`);
    process.exit(1);
}
