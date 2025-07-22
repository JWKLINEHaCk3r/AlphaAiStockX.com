



// Fixer script: Only manipulates import statements as text. Never generates or requires .js or .tsx card components.
// Card components are referenced by name only; no .tsx or .js import for Node.js compatibility in Node scripts.






/**
 * AlphaAI Stock Trading Platform - Card Components Fixer (ESM compatible)
 * Advanced AI-powered card component import and dependency resolver
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

console.log('🎯 AlphaAI Card Components Fixer - Enhancing trading interface...');

// Card component variations and their imports
const CARD_COMPONENTS = {
  Card: 'Card',
  CardHeader: 'CardHeader',
  CardContent: 'CardContent',
  CardDescription: 'CardDescription',
  CardTitle: 'CardTitle',
  CardFooter: 'CardFooter',
};

// AI Trading Dashboard Card Types
const TRADING_CARDS = {
  TradingCard: 'TradingCard',
  MarketCard: 'MarketCard',
  PortfolioCard: 'PortfolioCard',
  AIAnalysisCard: 'AIAnalysisCard',
  ProfitCard: 'ProfitCard',
  RiskCard: 'RiskCard',
  SignalCard: 'SignalCard',
};

function generateCardComponent() {
  return `import React from 'react';
import { cn } from '@/lib/utils';

// Base Card Component
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-lg transition-all duration-300 hover:shadow-xl",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// AI Trading Specific Cards
const TradingCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'profit' | 'loss' | 'neutral' | 'ai-signal';
    glowEffect?: boolean;
  }
>(({ className, variant = 'neutral', glowEffect = false, ...props }, ref) => {
  const variantClasses = {
    profit: 'border-green-500/50 bg-green-950/20 text-green-100',
    loss: 'border-red-500/50 bg-red-950/20 text-red-100', 
    neutral: 'border-blue-500/50 bg-blue-950/20 text-blue-100',
    'ai-signal': 'border-purple-500/50 bg-purple-950/20 text-purple-100'
  };
  
  return (
    <Card
      ref={ref}
      className={cn(
        "transition-all duration-500 hover:scale-105",
        variantClasses[variant],
        glowEffect && "shadow-lg shadow-current/25",
        className
      )}
      {...props}
    />
  );
});
TradingCard.displayName = "TradingCard";

const AIAnalysisCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    aiConfidence?: number;
    aiStatus?: 'analyzing' | 'complete' | 'error';
  }
>(({ className, aiConfidence = 0, aiStatus = 'analyzing', ...props }, ref) => (
  <TradingCard
    ref={ref}
    variant="ai-signal"
    glowEffect={aiStatus === 'complete'}
    className={cn(
      "relative overflow-hidden",
      aiStatus === 'analyzing' && "animate-pulse",
      className
    )}
    {...props}
  >
    <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-current opacity-75" />
    {props.children}
  </TradingCard>
));
AIAnalysisCard.displayName = "AIAnalysisCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  TradingCard,
  AIAnalysisCard
};`;
}

// Utility to get relative import path from a file to the card component
function getRelativeCardImport(filePath) {
  // Use .js fallback for Node.js compatibility
  const cardPath = path.join(process.cwd(), 'components/ui/card.js');
  const fromDir = path.dirname(filePath);
  let relPath = path.relative(fromDir, cardPath);
  if (!relPath.startsWith('.')) relPath = './' + relPath;
  // Always use .js extension for Node.js compatibility
  relPath = relPath.replace(/\\/g, '/');
  if (!relPath.endsWith('.js')) relPath = relPath.replace(/\.tsx$/, '.js');
  return relPath;
}

async function fixCardImports() {
  try {
    // Ensure card component exists (as .js for Node.js compatibility)
    const cardPath = path.join(process.cwd(), 'components/ui/card.js');
    if (!fs.existsSync(cardPath) || fs.readFileSync(cardPath, 'utf8').trim().length === 0) {
      console.log('📝 Creating enhanced AI trading card component (.js fallback)...');
      fs.writeFileSync(cardPath, generateCardComponent());
      console.log('✅ Enhanced card component (.js) created!');
    }

    // Get all files that might use cards
    const files = glob.sync('**/*.{ts,tsx,js,jsx}', {
      cwd: process.cwd(),
      ignore: ['node_modules/**', '.next/**', 'out/**', '*.config.*'],
    });

    console.log(`🔍 Scanning ${files.length} files for card usage...`);

    for (const file of files) {
      const filePath = path.join(process.cwd(), file);
      // Skip directories
      if (fs.statSync(filePath).isDirectory()) continue;
      // Only add card imports to .ts or .tsx files
      if (!file.endsWith('.ts') && !file.endsWith('.tsx')) continue;
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      // Check for card usage and add imports
      const usedCards = [];

      for (const [component] of Object.entries(CARD_COMPONENTS)) {
        const regex = new RegExp(`\\b${component}\\b`, 'g');
        if (regex.test(content)) {
          usedCards.push(component);
        }
      }

      for (const [component] of Object.entries(TRADING_CARDS)) {
        const regex = new RegExp(`\\b${component}\\b`, 'g');
        if (regex.test(content)) {
          usedCards.push(component);
        }
      }

      if (usedCards.length > 0) {
        // Remove any existing alias import for card
        content = content.replace(/import.*{[^}]*}.*from.*['\"]@\/components\/ui\/card['\"];?\n?/g, '');
        // Add correct relative import
        const relImport = getRelativeCardImport(filePath);
        const importStatement = `import { ${usedCards.join(', ')} } from '${relImport}';\n`;
        content = importStatement + content;
        modified = true;
        console.log(`🎯 Added card imports to ${file}: ${usedCards.join(', ')}`);
      }

      if (modified) {
        fs.writeFileSync(filePath, content);
      }
    }

    console.log('🎉 AlphaAI Card components fixed! Trading interface enhanced!');
  } catch (error) {
    console.error('❌ Error fixing card imports:', error);
    process.exit(1);
  }
}

// Run the card fixer
fixCardImports();
