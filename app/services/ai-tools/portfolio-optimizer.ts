// AI Portfolio Optimizer - Modern Portfolio Theory + GPT Insights
import { OpenAI } from 'openai';

interface Asset {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  marketCap: number;
  beta: number;
  expectedReturn: number;
  volatility: number;
  dividend: number;
  peRatio: number;
  expense?: number; // For ETFs
}

interface PortfolioConstraints {
  minWeight: number;
  maxWeight: number;
  maxSectorAllocation: number;
  minDiversification: number;
  excludeSymbols?: string[];
  requireSymbols?: string[];
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentGoals: string[];
  timeHorizon: 'short' | 'medium' | 'long';
  esgPreference?: boolean;
}

interface OptimizedPortfolio {
  id: string;
  allocations: { [symbol: string]: number };
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
  diversificationScore: number;
  riskScore: number;
  totalValue: number;
  assets: Asset[];
  reasoning: string;
  rebalanceRecommendations: RebalanceRecommendation[];
  riskAnalysis: RiskAnalysis;
  timestamp: string;
}

interface RebalanceRecommendation {
  symbol: string;
  currentWeight: number;
  targetWeight: number;
  action: 'BUY' | 'SELL' | 'HOLD';
  amount: number;
  reasoning: string;
}

interface RiskAnalysis {
  varAtRisk: number; // Value at Risk (95% confidence)
  maxDrawdown: number;
  correlationMatrix: { [pair: string]: number };
  sectorConcentration: { [sector: string]: number };
  riskContribution: { [symbol: string]: number };
}

interface OptimizationResult {
  weights: number[];
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
}

export class AIPortfolioOptimizer {
  private openai: OpenAI;
  private assetUniverse: Map<string, Asset> = new Map();
  private correlationMatrix: Map<string, Map<string, number>> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.initializeAssetUniverse();
  }

  private initializeAssetUniverse() {
    const assets: Asset[] = [
      // Large Cap Stocks
      { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', price: 178.25, marketCap: 2800000000000, beta: 1.2, expectedReturn: 0.12, volatility: 0.24, dividend: 0.005, peRatio: 28.5 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', price: 365.50, marketCap: 2700000000000, beta: 0.9, expectedReturn: 0.11, volatility: 0.22, dividend: 0.007, peRatio: 32.1 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', price: 138.75, marketCap: 1750000000000, beta: 1.1, expectedReturn: 0.10, volatility: 0.26, dividend: 0, peRatio: 25.8 },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Discretionary', price: 155.20, marketCap: 1600000000000, beta: 1.3, expectedReturn: 0.13, volatility: 0.28, dividend: 0, peRatio: 48.2 },
      { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Consumer Discretionary', price: 248.50, marketCap: 790000000000, beta: 2.0, expectedReturn: 0.15, volatility: 0.45, dividend: 0, peRatio: 65.4 },
      { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Financial Services', price: 175.80, marketCap: 510000000000, beta: 1.1, expectedReturn: 0.09, volatility: 0.25, dividend: 0.025, peRatio: 12.8 },
      { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', price: 162.30, marketCap: 425000000000, beta: 0.7, expectedReturn: 0.07, volatility: 0.16, dividend: 0.028, peRatio: 15.6 },
      { symbol: 'V', name: 'Visa Inc.', sector: 'Financial Services', price: 275.40, marketCap: 580000000000, beta: 0.8, expectedReturn: 0.10, volatility: 0.20, dividend: 0.012, peRatio: 35.2 },
      
      // ETFs for diversification
      { symbol: 'SPY', name: 'SPDR S&P 500 ETF', sector: 'Broad Market', price: 468.50, marketCap: 480000000000, beta: 1.0, expectedReturn: 0.08, volatility: 0.18, dividend: 0.015, peRatio: 21.5, expense: 0.0009 },
      { symbol: 'QQQ', name: 'Invesco QQQ ETF', sector: 'Technology', price: 385.20, marketCap: 180000000000, beta: 1.2, expectedReturn: 0.10, volatility: 0.22, dividend: 0.008, peRatio: 28.3, expense: 0.0020 },
      { symbol: 'VTI', name: 'Vanguard Total Stock Market', sector: 'Broad Market', price: 245.80, marketCap: 320000000000, beta: 1.0, expectedReturn: 0.08, volatility: 0.17, dividend: 0.018, peRatio: 20.8, expense: 0.0003 },
      { symbol: 'VXUS', name: 'Vanguard Total International', sector: 'International', price: 58.40, marketCap: 350000000000, beta: 0.8, expectedReturn: 0.07, volatility: 0.19, dividend: 0.022, peRatio: 16.2, expense: 0.0008 },
      { symbol: 'BND', name: 'Vanguard Total Bond Market', sector: 'Fixed Income', price: 82.15, marketCap: 280000000000, beta: 0.1, expectedReturn: 0.04, volatility: 0.06, dividend: 0.025, peRatio: 0, expense: 0.0003 },
      { symbol: 'VEA', name: 'Vanguard FTSE Developed Markets', sector: 'International', price: 47.90, marketCap: 110000000000, beta: 0.9, expectedReturn: 0.06, volatility: 0.18, dividend: 0.025, peRatio: 15.8, expense: 0.0005 },
      { symbol: 'VWO', name: 'Vanguard Emerging Markets', sector: 'Emerging Markets', price: 42.30, marketCap: 75000000000, beta: 1.1, expectedReturn: 0.08, volatility: 0.25, dividend: 0.032, peRatio: 13.5, expense: 0.0008 },
      
      // Sector ETFs
      { symbol: 'XLK', name: 'Technology Select Sector', sector: 'Technology', price: 195.60, marketCap: 48000000000, beta: 1.2, expectedReturn: 0.11, volatility: 0.24, dividend: 0.008, peRatio: 29.1, expense: 0.0010 },
      { symbol: 'XLF', name: 'Financial Select Sector', sector: 'Financial Services', price: 38.75, marketCap: 15000000000, beta: 1.2, expectedReturn: 0.09, volatility: 0.26, dividend: 0.020, peRatio: 14.2, expense: 0.0010 },
      { symbol: 'XLE', name: 'Energy Select Sector', sector: 'Energy', price: 85.20, marketCap: 12000000000, beta: 1.4, expectedReturn: 0.12, volatility: 0.35, dividend: 0.035, peRatio: 11.8, expense: 0.0010 },
      { symbol: 'XLV', name: 'Health Care Select Sector', sector: 'Healthcare', price: 134.80, marketCap: 28000000000, beta: 0.8, expectedReturn: 0.08, volatility: 0.18, dividend: 0.015, peRatio: 18.5, expense: 0.0010 },
      { symbol: 'XLRE', name: 'Real Estate Select Sector', sector: 'Real Estate', price: 38.95, marketCap: 7000000000, beta: 0.9, expectedReturn: 0.07, volatility: 0.22, dividend: 0.028, peRatio: 22.4, expense: 0.0010 }
    ];

    assets.forEach(asset => this.assetUniverse.set(asset.symbol, asset));
    this.generateCorrelationMatrix();
  }

  private generateCorrelationMatrix() {
    const symbols = Array.from(this.assetUniverse.keys());
    
    symbols.forEach(symbol1 => {
      const correlations = new Map<string, number>();
      symbols.forEach(symbol2 => {
        if (symbol1 === symbol2) {
          correlations.set(symbol2, 1.0);
        } else {
          // Generate realistic correlations based on sectors
          const asset1 = this.assetUniverse.get(symbol1)!;
          const asset2 = this.assetUniverse.get(symbol2)!;
          correlations.set(symbol2, this.calculateCorrelation(asset1, asset2));
        }
      });
      this.correlationMatrix.set(symbol1, correlations);
    });
  }

  private calculateCorrelation(asset1: Asset, asset2: Asset): number {
    // Base correlation
    let correlation = 0.3;

    // Same sector correlation
    if (asset1.sector === asset2.sector) {
      correlation += 0.4;
    }

    // Market cap similarity
    const capRatio = Math.min(asset1.marketCap, asset2.marketCap) / Math.max(asset1.marketCap, asset2.marketCap);
    correlation += (capRatio - 0.5) * 0.2;

    // Beta similarity
    const betaDiff = Math.abs(asset1.beta - asset2.beta);
    correlation -= betaDiff * 0.1;

    // Add some randomness
    correlation += (Math.random() - 0.5) * 0.2;

    return Math.max(-0.5, Math.min(0.9, correlation));
  }

  async optimizePortfolio(
    investmentAmount: number,
    constraints: PortfolioConstraints,
    currentHoldings?: { [symbol: string]: number }
  ): Promise<OptimizedPortfolio> {
    try {
      // Filter eligible assets
      const eligibleAssets = this.filterAssets(constraints);
      
      // Run optimization algorithm
      const optimization = await this.runOptimization(
        eligibleAssets,
        investmentAmount,
        constraints
      );

      // Generate AI insights
      const aiInsights = await this.generateAIInsights(
        optimization,
        eligibleAssets,
        constraints
      );

      // Calculate portfolio metrics
      const portfolioMetrics = this.calculatePortfolioMetrics(
        optimization.weights,
        eligibleAssets
      );

      // Generate rebalance recommendations
      const rebalanceRecs = currentHoldings 
        ? this.generateRebalanceRecommendations(currentHoldings, optimization.weights, eligibleAssets)
        : [];

      // Risk analysis
      const riskAnalysis = this.calculateRiskAnalysis(optimization.weights, eligibleAssets);

      const optimizedPortfolio: OptimizedPortfolio = {
        id: `portfolio_${Date.now()}`,
        allocations: this.createAllocationMap(optimization.weights, eligibleAssets),
        expectedReturn: portfolioMetrics.expectedReturn,
        volatility: portfolioMetrics.volatility,
        sharpeRatio: portfolioMetrics.sharpeRatio,
        diversificationScore: this.calculateDiversificationScore(optimization.weights, eligibleAssets),
        riskScore: this.calculateRiskScore(portfolioMetrics.volatility, constraints.riskTolerance),
        totalValue: investmentAmount,
        assets: eligibleAssets,
        reasoning: aiInsights.reasoning,
        rebalanceRecommendations: rebalanceRecs,
        riskAnalysis,
        timestamp: new Date().toISOString()
      };

      return optimizedPortfolio;

    } catch (error) {
      console.error('Portfolio optimization error:', error);
      throw new Error('Failed to optimize portfolio');
    }
  }

  private filterAssets(constraints: PortfolioConstraints): Asset[] {
    const assets = Array.from(this.assetUniverse.values());
    
    return assets.filter(asset => {
      // Exclude specific symbols
      if (constraints.excludeSymbols?.includes(asset.symbol)) {
        return false;
      }

      // Risk tolerance filtering
      if (constraints.riskTolerance === 'conservative' && asset.volatility > 0.25) {
        return false;
      }
      if (constraints.riskTolerance === 'conservative' && asset.beta > 1.3) {
        return false;
      }

      // ESG filtering (simplified)
      if (constraints.esgPreference && ['Energy', 'Tobacco'].includes(asset.sector)) {
        return false;
      }

      return true;
    });
  }

  private async runOptimization(
    assets: Asset[],
    investmentAmount: number,
    constraints: PortfolioConstraints
  ): Promise<OptimizationResult> {
    const numAssets = assets.length;
    
    // Simple mean-variance optimization using quadratic programming approximation
    const riskAversion = this.getRiskAversionParameter(constraints.riskTolerance);
    
    // Generate initial weights
    let weights = this.generateInitialWeights(numAssets, constraints);
    
    // Iterative optimization (simplified)
    for (let iteration = 0; iteration < 100; iteration++) {
      const newWeights = this.optimizeStep(weights, assets, riskAversion, constraints);
      
      if (this.hasConverged(weights, newWeights)) {
        weights = newWeights;
        break;
      }
      
      weights = newWeights;
    }

    // Normalize weights
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    weights = weights.map(w => w / totalWeight);

    // Calculate portfolio metrics
    const expectedReturn = this.calculatePortfolioReturn(weights, assets);
    const volatility = this.calculatePortfolioVolatility(weights, assets);
    const sharpeRatio = expectedReturn / volatility;

    return {
      weights,
      expectedReturn,
      volatility,
      sharpeRatio
    };
  }

  private getRiskAversionParameter(riskTolerance: string): number {
    switch (riskTolerance) {
      case 'conservative': return 8.0;
      case 'moderate': return 4.0;
      case 'aggressive': return 2.0;
      default: return 4.0;
    }
  }

  private generateInitialWeights(numAssets: number, constraints: PortfolioConstraints): number[] {
    // Start with equal weighting, then adjust
    const equalWeight = 1 / numAssets;
    let weights = new Array(numAssets).fill(equalWeight);

    // Apply constraints
    weights = weights.map(w => Math.max(constraints.minWeight, Math.min(constraints.maxWeight, w)));

    // Normalize
    const total = weights.reduce((sum, w) => sum + w, 0);
    return weights.map(w => w / total);
  }

  private optimizeStep(
    currentWeights: number[],
    assets: Asset[],
    riskAversion: number,
    constraints: PortfolioConstraints
  ): number[] {
    const learningRate = 0.01;
    const newWeights = [...currentWeights];

    for (let i = 0; i < assets.length; i++) {
      // Calculate gradient (simplified)
      const gradient = this.calculateGradient(i, currentWeights, assets, riskAversion);
      
      // Update weight
      newWeights[i] = Math.max(
        constraints.minWeight,
        Math.min(constraints.maxWeight, currentWeights[i] + learningRate * gradient)
      );
    }

    // Apply sector constraints
    return this.applySectorConstraints(newWeights, assets, constraints);
  }

  private calculateGradient(
    assetIndex: number,
    weights: number[],
    assets: Asset[],
    riskAversion: number
  ): number {
    const asset = assets[assetIndex];
    
    // Expected return component
    let gradient = asset.expectedReturn;

    // Risk penalty component
    for (let j = 0; j < assets.length; j++) {
      const correlation = this.getCorrelation(asset.symbol, assets[j].symbol);
      const riskContribution = riskAversion * weights[j] * asset.volatility * assets[j].volatility * correlation;
      gradient -= riskContribution;
    }

    return gradient;
  }

  private applySectorConstraints(
    weights: number[],
    assets: Asset[],
    constraints: PortfolioConstraints
  ): number[] {
    const sectorWeights = new Map<string, number>();
    
    // Calculate current sector weights
    assets.forEach((asset, i) => {
      const currentWeight = sectorWeights.get(asset.sector) || 0;
      sectorWeights.set(asset.sector, currentWeight + weights[i]);
    });

    // Adjust if any sector exceeds max allocation
    const adjustedWeights = [...weights];
    sectorWeights.forEach((weight, sector) => {
      if (weight > constraints.maxSectorAllocation) {
        const scaleFactor = constraints.maxSectorAllocation / weight;
        assets.forEach((asset, i) => {
          if (asset.sector === sector) {
            adjustedWeights[i] *= scaleFactor;
          }
        });
      }
    });

    // Renormalize
    const total = adjustedWeights.reduce((sum, w) => sum + w, 0);
    return adjustedWeights.map(w => w / total);
  }

  private hasConverged(oldWeights: number[], newWeights: number[]): boolean {
    const threshold = 0.0001;
    for (let i = 0; i < oldWeights.length; i++) {
      if (Math.abs(oldWeights[i] - newWeights[i]) > threshold) {
        return false;
      }
    }
    return true;
  }

  private calculatePortfolioReturn(weights: number[], assets: Asset[]): number {
    return weights.reduce((sum, weight, i) => sum + weight * assets[i].expectedReturn, 0);
  }

  private calculatePortfolioVolatility(weights: number[], assets: Asset[]): number {
    let variance = 0;
    
    for (let i = 0; i < assets.length; i++) {
      for (let j = 0; j < assets.length; j++) {
        const correlation = this.getCorrelation(assets[i].symbol, assets[j].symbol);
        variance += weights[i] * weights[j] * assets[i].volatility * assets[j].volatility * correlation;
      }
    }
    
    return Math.sqrt(variance);
  }

  private getCorrelation(symbol1: string, symbol2: string): number {
    return this.correlationMatrix.get(symbol1)?.get(symbol2) || 0.3;
  }

  private calculatePortfolioMetrics(weights: number[], assets: Asset[]) {
    const expectedReturn = this.calculatePortfolioReturn(weights, assets);
    const volatility = this.calculatePortfolioVolatility(weights, assets);
    const sharpeRatio = expectedReturn / volatility;

    return { expectedReturn, volatility, sharpeRatio };
  }

  private createAllocationMap(weights: number[], assets: Asset[]): { [symbol: string]: number } {
    const allocations: { [symbol: string]: number } = {};
    assets.forEach((asset, i) => {
      if (weights[i] > 0.001) { // Only include meaningful allocations
        allocations[asset.symbol] = weights[i];
      }
    });
    return allocations;
  }

  private calculateDiversificationScore(weights: number[], assets: Asset[]): number {
    // Herfindahl-Hirschman Index based diversification
    const hhi = weights.reduce((sum, weight) => sum + weight * weight, 0);
    const maxDiversification = 1 / assets.length;
    const diversificationRatio = maxDiversification / hhi;
    
    return Math.min(100, diversificationRatio * 100);
  }

  private calculateRiskScore(volatility: number, riskTolerance: string): number {
    const baseScore = volatility * 100; // Convert to percentage
    
    const toleranceMultiplier = {
      'conservative': 1.5,
      'moderate': 1.0,
      'aggressive': 0.7
    };

    return Math.min(100, baseScore * toleranceMultiplier[riskTolerance]);
  }

  private generateRebalanceRecommendations(
    currentHoldings: { [symbol: string]: number },
    targetWeights: number[],
    assets: Asset[]
  ): RebalanceRecommendation[] {
    const recommendations: RebalanceRecommendation[] = [];
    
    assets.forEach((asset, i) => {
      const currentWeight = currentHoldings[asset.symbol] || 0;
      const targetWeight = targetWeights[i];
      const difference = targetWeight - currentWeight;
      
      if (Math.abs(difference) > 0.01) { // Only recommend if difference > 1%
        recommendations.push({
          symbol: asset.symbol,
          currentWeight,
          targetWeight,
          action: difference > 0 ? 'BUY' : 'SELL',
          amount: Math.abs(difference),
          reasoning: `${difference > 0 ? 'Increase' : 'Decrease'} allocation to reach target weight`
        });
      }
    });

    return recommendations;
  }

  private calculateRiskAnalysis(weights: number[], assets: Asset[]): RiskAnalysis {
    // Value at Risk (simplified)
    const portfolioReturn = this.calculatePortfolioReturn(weights, assets);
    const portfolioVolatility = this.calculatePortfolioVolatility(weights, assets);
    const varAtRisk = portfolioReturn - 1.645 * portfolioVolatility; // 95% confidence

    // Sector concentration
    const sectorConcentration: { [sector: string]: number } = {};
    assets.forEach((asset, i) => {
      const current = sectorConcentration[asset.sector] || 0;
      sectorConcentration[asset.sector] = current + weights[i];
    });

    // Risk contribution
    const riskContribution: { [symbol: string]: number } = {};
    assets.forEach((asset, i) => {
      let contribution = 0;
      assets.forEach((otherAsset, j) => {
        const correlation = this.getCorrelation(asset.symbol, otherAsset.symbol);
        contribution += weights[j] * asset.volatility * otherAsset.volatility * correlation;
      });
      riskContribution[asset.symbol] = (weights[i] * contribution) / (portfolioVolatility * portfolioVolatility);
    });

    return {
      varAtRisk,
      maxDrawdown: portfolioVolatility * 2.5, // Simplified calculation
      correlationMatrix: this.getRelevantCorrelations(assets),
      sectorConcentration,
      riskContribution
    };
  }

  private getRelevantCorrelations(assets: Asset[]): { [pair: string]: number } {
    const correlations: { [pair: string]: number } = {};
    
    for (let i = 0; i < assets.length; i++) {
      for (let j = i + 1; j < assets.length; j++) {
        const symbol1 = assets[i].symbol;
        const symbol2 = assets[j].symbol;
        const correlation = this.getCorrelation(symbol1, symbol2);
        correlations[`${symbol1}-${symbol2}`] = correlation;
      }
    }

    return correlations;
  }

  private async generateAIInsights(
    optimization: OptimizationResult,
    assets: Asset[],
    constraints: PortfolioConstraints
  ) {
    const allocations = this.createAllocationMap(optimization.weights, assets);
    const topHoldings = Object.entries(allocations)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    const prompt = `
    Analyze this optimized portfolio allocation:

    Investment Profile:
    - Risk Tolerance: ${constraints.riskTolerance}
    - Time Horizon: ${constraints.timeHorizon}
    - Investment Goals: ${constraints.investmentGoals.join(', ')}

    Portfolio Metrics:
    - Expected Return: ${(optimization.expectedReturn * 100).toFixed(2)}%
    - Volatility: ${(optimization.volatility * 100).toFixed(2)}%
    - Sharpe Ratio: ${optimization.sharpeRatio.toFixed(3)}

    Top Holdings:
    ${topHoldings.map(([symbol, weight]) => {
      const asset = assets.find(a => a.symbol === symbol);
      return `- ${symbol} (${asset?.name}): ${(weight * 100).toFixed(1)}% - ${asset?.sector}`;
    }).join('\n')}

    Sector Distribution:
    ${this.getSectorDistribution(optimization.weights, assets)}

    Provide professional portfolio analysis including:
    1. Overall portfolio assessment
    2. Alignment with investment goals
    3. Risk-return profile evaluation
    4. Diversification quality
    5. Specific recommendations for improvement
    6. Market outlook considerations

    Be specific, actionable, and educational.
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert portfolio manager and investment advisor with deep knowledge of modern portfolio theory and market dynamics.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.3
      });

      return {
        reasoning: response.choices[0].message.content || 'Portfolio analysis unavailable'
      };

    } catch (error) {
      return {
        reasoning: `This ${constraints.riskTolerance} portfolio achieves a ${(optimization.expectedReturn * 100).toFixed(1)}% expected return with ${(optimization.volatility * 100).toFixed(1)}% volatility. The allocation provides balanced exposure across sectors with emphasis on ${this.getTopSector(optimization.weights, assets)}.`
      };
    }
  }

  private getSectorDistribution(weights: number[], assets: Asset[]): string {
    const sectorWeights = new Map<string, number>();
    
    assets.forEach((asset, i) => {
      const current = sectorWeights.get(asset.sector) || 0;
      sectorWeights.set(asset.sector, current + weights[i]);
    });

    return Array.from(sectorWeights.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([sector, weight]) => `- ${sector}: ${(weight * 100).toFixed(1)}%`)
      .join('\n');
  }

  private getTopSector(weights: number[], assets: Asset[]): string {
    const sectorWeights = new Map<string, number>();
    
    assets.forEach((asset, i) => {
      const current = sectorWeights.get(asset.sector) || 0;
      sectorWeights.set(asset.sector, current + weights[i]);
    });

    const topSector = Array.from(sectorWeights.entries())
      .sort(([,a], [,b]) => b - a)[0];

    return topSector ? topSector[0] : 'Technology';
  }

  // Public API methods
  async getAssetRecommendations(
    riskTolerance: string,
    investmentGoals: string[]
  ): Promise<Asset[]> {
    const filtered = Array.from(this.assetUniverse.values()).filter(asset => {
      if (riskTolerance === 'conservative') {
        return asset.volatility < 0.25 && asset.beta < 1.3;
      } else if (riskTolerance === 'aggressive') {
        return asset.expectedReturn > 0.10;
      }
      return true;
    });

    return filtered.slice(0, 20); // Return top 20 recommendations
  }

  async backtestPortfolio(
    allocations: { [symbol: string]: number },
    timeframe: string
  ): Promise<any> {
    // Simplified backtest - in production, use historical data
    const annualReturn = Object.entries(allocations).reduce((sum, [symbol, weight]) => {
      const asset = this.assetUniverse.get(symbol);
      return sum + (weight * (asset?.expectedReturn || 0.08));
    }, 0);

    return {
      annualReturn,
      maxDrawdown: annualReturn * -0.3, // Simplified
      sharpeRatio: annualReturn / 0.15,
      winRate: 0.65,
      totalReturn: annualReturn * (timeframe === '1Y' ? 1 : timeframe === '3Y' ? 3 : 5)
    };
  }

  getAvailableAssets(): Asset[] {
    return Array.from(this.assetUniverse.values());
  }

  addCustomAsset(asset: Asset): void {
    this.assetUniverse.set(asset.symbol, asset);
  }
}

export default AIPortfolioOptimizer;
