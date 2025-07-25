// #!/usr/bin/env node
/**
 * Comprehensive TypeScript fixes for AlphaAiStockX
 * This script fixes 'any' types, unused variables, and other TypeScript issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Common any type replacements
const anyTypeReplacements = [
  // Component map functions
  {
    from: /\.map\(\(([^:]+): any\) =>/g,
    to: '.map(($1: any) =>',
    replacement: '.map(($1: Record<string, unknown>) =>'
  },
  
  // Prediction and signal types
  {
    from: /predictions\.map\(\(prediction: any\)/g,
    to: 'predictions.map((prediction: AIStockPrediction)'
  },
  
  // Event and opportunity types
  {
    from: /events\.map\(\(event: any\)/g,
    to: 'events.map((event: SportsEvent)'
  },
  
  {
    from: /opportunities\.map\(\(opportunity: any\)/g,
    to: 'opportunities.map((opportunity: TradingOpportunity)'
  },
  
  // Trade types
  {
    from: /trades\.map\(\(trade: any\)/g,
    to: 'trades.map((trade: Trade)'
  },
  
  // User and trader types
  {
    from: /traders\.map\(\(trader: any\)/g,
    to: 'traders.map((trader: Trader)'
  },
  
  // Model and analysis types
  {
    from: /models\.map\(\(model: any\)/g,
    to: 'models.map((model: VisionModel)'
  },
  
  {
    from: /results\.map\(\(result: any\)/g,
    to: 'results.map((result: AnalysisResult)'
  },
  
  // Stock and financial types
  {
    from: /stocks\.map\(\(stock: any\)/g,
    to: 'stocks.map((stock: StockData)'
  },
  
  {
    from: /accounts\.map\(\(account: any\)/g,
    to: 'accounts.map((account: BankAccount)'
  },
  
  {
    from: /transactions\.map\(\(transaction: any\)/g,
    to: 'transactions.map((transaction: Transaction)'
  },
  
  // Signal and pattern types
  {
    from: /signals\.map\(\(signal: any\)/g,
    to: 'signals.map((signal: TradingSignalData)'
  },
  
  {
    from: /patterns\.map\(\(pattern: any\)/g,
    to: 'patterns.map((pattern: ChartPattern)'
  },
  
  // Generic function parameters
  {
    from: /getPerformanceColor = \(perf: any\)/g,
    to: 'getPerformanceColor = (perf: { change?: number; value?: number })'
  },
  
  {
    from: /getReturnColor = \(value: any\)/g,
    to: 'getReturnColor = (value: number)'
  },
  
  {
    from: /executeTrade = \(conditions: any\)/g,
    to: 'executeTrade = (conditions: Record<string, unknown>)'
  },
  
  // Object property access
  {
    from: /assessTechnicalRisk\(technicals: any\)/g,
    to: 'assessTechnicalRisk(technicals: TechnicalIndicators)'
  },
  
  {
    from: /getRiskRecommendation\(analysis: any\)/g,
    to: 'getRiskRecommendation(analysis: { risk: RiskAnalysis; sentiment: any; technicals: TechnicalIndicators })'
  }
];

// Import statements to add to files
const importStatements = {
  'app/components': `import {
  AIStockPrediction,
  SportsEvent,
  TradingOpportunity,
  Trade,
  Trader,
  VisionModel,
  AnalysisResult,
  BankAccount,
  Transaction,
  TradingSignalData,
  ChartPattern,
  TechnicalIndicators,
  RiskAnalysis,
  SectorPerformance,
  BacktestStrategy,
  AIWhiteLabelMetrics,
  MarketClassification,
  TradingRecommendation,
  StockAnalysis,
  RealtimeData,
  VolumeProfile,
  AIAnalysisComponents,
  CryptoData,
  DeFiProtocol,
  NFTCollection,
  UserProfile,
  ThemeOption,
  AccentColor,
  SubscriptionPlan,
  TradingStrategy,
  ScanResult,
  SiteDiagnostic,
  Alert,
  NewsAnalysis,
  SocialPlatform,
  Influencer,
  SocialPost,
  DeepLearningModel,
  MarketPattern,
} from '../../types/trading-types';`,
  
  'app/services': `import {
  Position,
  TechnicalIndicators,
  VolumeProfile,
  BollingerBands,
  SupportResistance,
  OptimalAllocations,
  RebalanceAction,
} from '../types/trading-types';`
};

function findFilesToFix() {
  const extensions = ['.ts', '.tsx'];
  const excludeDirs = ['node_modules', '.next', 'out', '.git'];
  
  function scanDirectory(dir) {
    const files = [];
    
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
          files.push(...scanDirectory(fullPath));
        } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.log(`Skipping directory ${dir}: ${error.message}`);
    }
    
    return files;
  }
  
  return scanDirectory('app');
}

function hasAnyTypes(content) {
  return content.includes(': any') || 
         content.includes('any[]') || 
         content.includes('any|') ||
         content.includes('any,') ||
         content.includes('any)') ||
         content.includes('any>');
}

function addImportsIfNeeded(filePath, content) {
  // Check if file needs imports
  const needsImports = anyTypeReplacements.some(replacement => 
    replacement.to && content.includes(replacement.to.split('(')[0])
  );
  
  if (!needsImports) return content;
  
  // Determine which import set to use
  let importToAdd = '';
  if (filePath.includes('app/components')) {
    importToAdd = importStatements['app/components'];
  } else if (filePath.includes('app/services')) {
    importToAdd = importStatements['app/services'];
  }
  
  if (!importToAdd) return content;
  
  // Check if imports already exist
  if (content.includes('from \'../../types/trading-types\'') || 
      content.includes('from \'../types/trading-types\'')) {
    return content;
  }
  
  // Add imports after existing imports
  const importRegex = /^((?:import.*?;\\n)*)/m;
  const match = content.match(importRegex);
  
  if (match) {
    const existingImports = match[1];
    const restOfFile = content.slice(match[1].length);
    return existingImports + importToAdd + '\\n\\n' + restOfFile;
  }
  
  return importToAdd + '\\n\\n' + content;
}

function fixAnyTypes(content) {
  let fixed = content;
  
  // Apply all replacements
  for (const replacement of anyTypeReplacements) {
    if (replacement.from && replacement.to) {
      fixed = fixed.replace(replacement.from, replacement.to);
    } else if (replacement.from && replacement.replacement) {
      fixed = fixed.replace(replacement.from, replacement.replacement);
    }
  }
  
  // Generic fixes for remaining any types
  fixed = fixed.replace(/: any\[\]/g, ': Record<string, unknown>[]');
  fixed = fixed.replace(/\\[key: string\\]: any/g, '[key: string]: unknown');
  
  return fixed;
}

function removeUnusedImports(content) {
  // Remove unused React import for files using 'use client'
  if (content.includes("'use client'") && !content.includes('React.')) {
    content = content.replace(/import React,?\s*{([^}]*)}?\s*from\s*['"]react['"];?\\n?/g, 
      (match, destructured) => {
        if (destructured) {
          return `import {${destructured}} from 'react';\\n`;
        }
        return '';
      });
  }
  
  return content;
}

function fixFile(filePath) {
  try {
    console.log(`Fixing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Skip if no any types found
    if (!hasAnyTypes(content)) {
      console.log(`  ✓ No any types found in ${filePath}`);
      return;
    }
    
    // Add necessary imports
    content = addImportsIfNeeded(filePath, content);
    
    // Fix any types
    content = fixAnyTypes(content);
    
    // Remove unused imports
    content = removeUnusedImports(content);
    
    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Fixed ${filePath}`);
    } else {
      console.log(`  ℹ️  No changes needed for ${filePath}`);
    }
    
  } catch (error) {
    console.error(`  ❌ Error fixing ${filePath}:`, error.message);
  }
}

function main() {
  console.log('🔧 Starting comprehensive TypeScript fixes...');
  
  const files = findFilesToFix();
  console.log(`Found ${files.length} TypeScript files to check`);
  
  let fixedCount = 0;
  
  for (const file of files) {
    fixFile(file);
    fixedCount++;
    
    // Progress indicator
    if (fixedCount % 10 === 0) {
      console.log(`Progress: ${fixedCount}/${files.length} files processed`);
    }
  }
  
  console.log('\\n✅ TypeScript fixes completed!');
  console.log(`📊 Processed ${fixedCount} files`);
  
  // Run type check
  console.log('\\n🔍 Running TypeScript check...');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('✅ TypeScript check passed!');
  } catch (error) {
    console.log('ℹ️  TypeScript check found remaining issues - this is normal, continue with manual fixes');
  }
}

if (require.main === module) {
  main();
}

module.exports = { fixFile, findFilesToFix };
