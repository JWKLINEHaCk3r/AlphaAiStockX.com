import {
  Position,
  TechnicalIndicators,
  VolumeProfile,
  BollingerBands,
  SupportResistance,
  OptimalAllocations,
  RebalanceAction,
} from '../types/trading-types';

// Reinforcement Learning Service for advanced trading strategies
export class ReinforcementLearningService {
  private static instance: ReinforcementLearningService;
  private models: Map<string, any> = new Map();
  private environments: Map<string, any> = new Map();
  private agents: Map<string, any> = new Map();
  private trainingHistory: Map<string, any> = new Map();
  private isTraining = false;
  private trainingProgress: Map<string, any> = new Map();

  static getInstance(): ReinforcementLearningService {
    if (!ReinforcementLearningService.instance) {
      ReinforcementLearningService.instance = new ReinforcementLearningService();
    }
    return ReinforcementLearningService.instance;
  }

  async initialize() {
    console.log('Initializing Reinforcement Learning Service...');
    await this.initializeModels();
    await this.initializeEnvironments();
    await this.initializeAgents();
    console.log('Reinforcement Learning Service initialized');
    return true;
  }

  private async initializeModels() {
    // Initialize RL models
    const models = [
      {
        id: 'dqn_trader',
        name: 'Deep Q-Network Trader',
        type: 'DQN',
        architecture: 'CNN + LSTM + Dense',
        stateSpace: 256,
        actionSpace: 5, // Buy, Sell, Hold, Buy More, Sell More
        learningRate: 0.001,
        epsilon: 0.1,
        gamma: 0.95,
        batchSize: 32,
        memorySize: 100000,
        targetUpdateFreq: 1000,
        performance: {
          sharpeRatio: 2.8,
          maxDrawdown: 0.12,
          winRate: 0.67,
          totalReturn: 0.45,
        },
      },
      {
        id: 'ppo_portfolio',
        name: 'PPO Portfolio Manager',
        type: 'PPO',
        architecture: 'Actor-Critic with Attention',
        stateSpace: 512,
        actionSpace: 100, // Portfolio weights for 100 assets
        learningRate: 0.0003,
        clipRatio: 0.2,
        valueCoeff: 0.5,
        entropyCoeff: 0.01,
        batchSize: 64,
        performance: {
          sharpeRatio: 3.2,
          maxDrawdown: 0.08,
          winRate: 0.72,
          totalReturn: 0.52,
        },
      },
      {
        id: 'a3c_multiasset',
        name: 'A3C Multi-Asset Trader',
        type: 'A3C',
        architecture: 'Asynchronous Actor-Critic',
        stateSpace: 1024,
        actionSpace: 15, // Multiple actions across asset classes
        learningRate: 0.0001,
        gamma: 0.99,
        tau: 1.0,
        beta: 0.01,
        workers: 16,
        performance: {
          sharpeRatio: 3.5,
          maxDrawdown: 0.06,
          winRate: 0.75,
          totalReturn: 0.58,
        },
      },
      {
        id: 'sac_options',
        name: 'SAC Options Trader',
        type: 'SAC',
        architecture: 'Soft Actor-Critic',
        stateSpace: 384,
        actionSpace: 20, // Options strategies
        learningRate: 0.0003,
        alpha: 0.2,
        tau: 0.005,
        gamma: 0.99,
        batchSize: 256,
        performance: {
          sharpeRatio: 4.1,
          maxDrawdown: 0.15,
          winRate: 0.69,
          totalReturn: 0.72,
        },
      },
      {
        id: 'td3_crypto',
        name: 'TD3 Crypto Trader',
        type: 'TD3',
        architecture: 'Twin Delayed DDPG',
        stateSpace: 256,
        actionSpace: 10, // Crypto trading actions
        learningRate: 0.001,
        tau: 0.005,
        gamma: 0.99,
        policyDelay: 2,
        noiseClip: 0.5,
        performance: {
          sharpeRatio: 2.9,
          maxDrawdown: 0.25,
          winRate: 0.63,
          totalReturn: 0.85,
        },
      },
    ];

    models.forEach(model => {
      this.models.set(model.id, model);
    });
  }

  private async initializeEnvironments() {
    // Initialize trading environments
    const environments = [
      {
        id: 'stock_trading_env',
        name: 'Stock Trading Environment',
        type: 'continuous',
        assets: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX', 'AMD', 'CRM'],
        features: [
          'price',
          'volume',
          'rsi',
          'macd',
          'bollinger_bands',
          'moving_averages',
          'volatility',
          'momentum',
          'support_resistance',
          'market_sentiment',
        ],
        rewardFunction: 'sharpe_ratio_based',
        transactionCosts: 0.001,
        slippage: 0.0005,
        maxPosition: 1.0,
        lookbackWindow: 60,
        episodeLength: 252, // Trading days in a year
      },
      {
        id: 'portfolio_env',
        name: 'Portfolio Management Environment',
        type: 'continuous',
        assets: 100, // Top 100 stocks
        features: [
          'returns',
          'volatility',
          'correlation',
          'beta',
          'alpha',
          'momentum',
          'value_factors',
          'quality_factors',
          'size_factors',
          'profitability',
        ],
        rewardFunction: 'risk_adjusted_return',
        transactionCosts: 0.002,
        slippage: 0.001,
        maxPosition: 0.1, // Max 10% in any single asset
        lookbackWindow: 120,
        episodeLength: 504, // 2 years
      },
      {
        id: 'options_env',
        name: 'Options Trading Environment',
        type: 'discrete',
        underlyings: ['SPY', 'QQQ', 'IWM', 'AAPL', 'TSLA', 'NVDA', 'AMZN'],
        strategies: [
          'long_call',
          'long_put',
          'covered_call',
          'protective_put',
          'straddle',
          'strangle',
          'iron_condor',
          'butterfly',
          'calendar_spread',
        ],
        features: [
          'underlying_price',
          'strike',
          'expiry',
          'iv',
          'delta',
          'gamma',
          'theta',
          'vega',
          'rho',
          'volume',
          'open_interest',
        ],
        rewardFunction: 'profit_loss_ratio',
        transactionCosts: 0.65, // Per contract
        maxContracts: 100,
        lookbackWindow: 30,
        episodeLength: 63, // Quarter
      },
      {
        id: 'crypto_env',
        name: 'Cryptocurrency Trading Environment',
        type: 'continuous',
        assets: ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP', 'DOT', 'DOGE', 'AVAX', 'MATIC'],
        features: [
          'price',
          'volume',
          'market_cap',
          'social_sentiment',
          'on_chain_metrics',
          'technical_indicators',
          'funding_rates',
          'perpetual_basis',
          'fear_greed_index',
        ],
        rewardFunction: 'calmar_ratio',
        transactionCosts: 0.001,
        slippage: 0.002,
        maxPosition: 1.0,
        lookbackWindow: 168, // 1 week in hours
        episodeLength: 8760, // 1 year in hours
      },
      {
        id: 'forex_env',
        name: 'Forex Trading Environment',
        type: 'continuous',
        pairs: ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'USDCAD', 'NZDUSD'],
        features: [
          'price',
          'spread',
          'volume',
          'volatility',
          'carry',
          'momentum',
          'mean_reversion',
          'economic_indicators',
          'central_bank_policy',
        ],
        rewardFunction: 'sortino_ratio',
        transactionCosts: 0.0001, // 1 pip
        slippage: 0.00005,
        maxPosition: 10.0, // 10x leverage
        lookbackWindow: 720, // 30 days in hours
        episodeLength: 8760, // 1 year in hours
      },
    ];

    environments.forEach(env => {
      this.environments.set(env.id, env);
    });
  }

  private async initializeAgents() {
    // Initialize RL agents
    const agents = [
      {
        id: 'alpha_trader',
        name: 'Alpha Trader Agent',
        model: 'dqn_trader',
        environment: 'stock_trading_env',
        status: 'trained',
        trainingEpisodes: 10000,
        currentEpisode: 10000,
        bestReward: 2.85,
        averageReward: 1.92,
        explorationRate: 0.05,
        lastUpdated: new Date(),
        performance: {
          backtestPeriod: '2020-2023',
          totalReturn: 0.45,
          sharpeRatio: 2.8,
          maxDrawdown: 0.12,
          winRate: 0.67,
          profitFactor: 1.85,
        },
      },
      {
        id: 'portfolio_master',
        name: 'Portfolio Master Agent',
        model: 'ppo_portfolio',
        environment: 'portfolio_env',
        status: 'training',
        trainingEpisodes: 5000,
        currentEpisode: 3200,
        bestReward: 3.45,
        averageReward: 2.18,
        explorationRate: 0.1,
        lastUpdated: new Date(),
        performance: {
          backtestPeriod: '2019-2023',
          totalReturn: 0.52,
          sharpeRatio: 3.2,
          maxDrawdown: 0.08,
          winRate: 0.72,
          profitFactor: 2.15,
        },
      },
      {
        id: 'multi_asset_pro',
        name: 'Multi-Asset Pro Agent',
        model: 'a3c_multiasset',
        environment: 'stock_trading_env',
        status: 'trained',
        trainingEpisodes: 15000,
        currentEpisode: 15000,
        bestReward: 4.12,
        averageReward: 2.87,
        explorationRate: 0.02,
        lastUpdated: new Date(),
        performance: {
          backtestPeriod: '2018-2023',
          totalReturn: 0.58,
          sharpeRatio: 3.5,
          maxDrawdown: 0.06,
          winRate: 0.75,
          profitFactor: 2.45,
        },
      },
      {
        id: 'options_wizard',
        name: 'Options Wizard Agent',
        model: 'sac_options',
        environment: 'options_env',
        status: 'training',
        trainingEpisodes: 8000,
        currentEpisode: 5500,
        bestReward: 5.23,
        averageReward: 3.41,
        explorationRate: 0.15,
        lastUpdated: new Date(),
        performance: {
          backtestPeriod: '2020-2023',
          totalReturn: 0.72,
          sharpeRatio: 4.1,
          maxDrawdown: 0.15,
          winRate: 0.69,
          profitFactor: 2.85,
        },
      },
      {
        id: 'crypto_alpha',
        name: 'Crypto Alpha Agent',
        model: 'td3_crypto',
        environment: 'crypto_env',
        status: 'trained',
        trainingEpisodes: 12000,
        currentEpisode: 12000,
        bestReward: 3.78,
        averageReward: 2.34,
        explorationRate: 0.08,
        lastUpdated: new Date(),
        performance: {
          backtestPeriod: '2021-2023',
          totalReturn: 0.85,
          sharpeRatio: 2.9,
          maxDrawdown: 0.25,
          winRate: 0.63,
          profitFactor: 1.95,
        },
      },
    ];

    agents.forEach(agent => {
      this.agents.set(agent.id, agent);
    });
  }

  async startTraining(agentId: string, episodes = 1000): Promise<any> {
    if (this.isTraining) {
      throw new Error('Training is already in progress');
    }

    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    this.isTraining = true;
    agent.status = 'training';

    console.log(`Starting training for agent ${agent.name}...`);

    // Initialize training progress
    this.trainingProgress.set(agentId, {
      startTime: new Date(),
      targetEpisodes: episodes,
      currentEpisode: 0,
      bestReward: agent.bestReward,
      recentRewards: [],
      averageReward: agent.averageReward,
      explorationRate: agent.explorationRate,
      losses: [],
      convergence: false,
    });

    // Simulate training process
    await this.simulateTraining(agentId, episodes);

    this.isTraining = false;
    agent.status = 'trained';

    return {
      agentId,
      success: true,
      finalEpisode: episodes,
      finalReward: this.trainingProgress.get(agentId).bestReward,
      trainingTime: Date.now() - this.trainingProgress.get(agentId).startTime.getTime(),
    };
  }

  private async simulateTraining(agentId: string, episodes: number): Promise<void> {
    const progress = this.trainingProgress.get(agentId);
    const agent = this.agents.get(agentId);

    for (let episode = 1; episode <= episodes; episode++) {
      // Simulate episode training
      const reward = this.simulateEpisode(agent, episode);

      // Update progress
      progress.currentEpisode = episode;
      progress.recentRewards.push(reward);
      if (progress.recentRewards.length > 100) {
        progress.recentRewards.shift();
      }

      // Update best reward
      if (reward > progress.bestReward) {
        progress.bestReward = reward;
      }

      // Update average reward
      progress.averageReward =
        progress.recentRewards.reduce((a: number, b: number) => a + b, 0) /
        progress.recentRewards.length;

      // Update exploration rate (epsilon decay)
      progress.explorationRate = Math.max(0.01, progress.explorationRate * 0.9995);

      // Simulate loss
      const loss = Math.random() * 0.1 + 0.01;
      progress.losses.push(loss);
      if (progress.losses.length > 100) {
        progress.losses.shift();
      }

      // Check for convergence
      if (episode > 500 && progress.recentRewards.length >= 100) {
        const recentAvg =
          progress.recentRewards.slice(-50).reduce((a: number, b: number) => a + b, 0) / 50;
        const olderAvg =
          progress.recentRewards.slice(-100, -50).reduce((a: number, b: number) => a + b, 0) / 50;
        if (Math.abs(recentAvg - olderAvg) < 0.01) {
          progress.convergence = true;
        }
      }

      // Update agent
      agent.currentEpisode = episode;
      agent.bestReward = progress.bestReward;
      agent.averageReward = progress.averageReward;
      agent.explorationRate = progress.explorationRate;
      agent.lastUpdated = new Date();

      // Simulate training delay
      await new Promise(resolve => setTimeout(resolve, 10));

      // Break if converged early
      if (progress.convergence && episode > 1000) {
        console.log(`Training converged early at episode ${episode}`);
        break;
      }
    }
  }

  private simulateEpisode(agent: any, episode: number): number {
    // Simulate a training episode and return reward
    const model = this.models.get(agent.model);
    const environment = this.environments.get(agent.environment);

    // Base reward with some randomness and improvement over time
    const baseReward = model.performance.sharpeRatio * (0.8 + Math.random() * 0.4);

    // Improvement over time (learning curve)
    const learningProgress = Math.min(episode / 5000, 1.0);
    const improvementFactor = 0.5 + 0.5 * learningProgress;

    // Add some noise and occasional spikes/dips
    const noise = (Math.random() - 0.5) * 0.5;
    const spike = Math.random() > 0.95 ? (Math.random() - 0.5) * 2 : 0;

    return baseReward * improvementFactor + noise + spike;
  }

  async getAgentPrediction(agentId: string, marketData: any): Promise<any> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    if (agent.status !== 'trained') {
      throw new Error(`Agent ${agentId} is not trained yet`);
    }

    // Simulate agent prediction
    const model = this.models.get(agent.model);
    const environment = this.environments.get(agent.environment);

    // Generate prediction based on agent type
    let prediction;

    if (model.type === 'DQN') {
      // Discrete actions
      const actions = ['STRONG_BUY', 'BUY', 'HOLD', 'SELL', 'STRONG_SELL'];
      const actionProbs = [0.15, 0.25, 0.3, 0.2, 0.1].map(p => p * (0.8 + Math.random() * 0.4));
      const maxIndex = actionProbs.indexOf(Math.max(...actionProbs));

      prediction = {
        action: actions[maxIndex],
        confidence: actionProbs[maxIndex],
        actionProbabilities: actions.reduce(
          (acc: Record<string, number>, action: string, i: number) => {
            acc[action] = actionProbs[i];
            return acc;
          },
          {} as Record<string, number>
        ),
        qValues: actionProbs.map(p => p * 10),
      };
    } else if (model.type === 'PPO' || model.type === 'A3C') {
      // Portfolio weights or continuous actions
      const numAssets = environment.assets?.length || 10;
      const weights = Array.from({ length: numAssets }, () => Math.random());
      const sum = weights.reduce((a, b) => a + b, 0);
      const normalizedWeights = weights.map(w => w / sum);

      prediction = {
        portfolioWeights: normalizedWeights,
        expectedReturn: 0.08 + Math.random() * 0.12,
        expectedVolatility: 0.12 + Math.random() * 0.08,
        confidence: 0.7 + Math.random() * 0.25,
        rebalanceSignal: Math.random() > 0.7,
      };
    } else if (model.type === 'SAC' || model.type === 'TD3') {
      // Continuous actions
      const action = (Math.random() - 0.5) * 2; // -1 to 1
      const position = Math.tanh(action); // Squash to valid range

      prediction = {
        position,
        confidence: 0.6 + Math.random() * 0.3,
        expectedReturn: position * (0.05 + Math.random() * 0.1),
        riskScore: Math.abs(position) * (0.1 + Math.random() * 0.1),
        actionValue: action,
      };
    }

    return {
      agentId,
      agentName: agent.name,
      timestamp: new Date(),
      prediction,
      modelType: model.type,
      environment: environment.name,
      performance: agent.performance,
    };
  }

  async runBacktest(agentId: string, startDate: string, endDate: string): Promise<any> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    console.log(`Running backtest for agent ${agent.name} from ${startDate} to ${endDate}...`);

    // Simulate backtest results
    const tradingDays = 252; // Approximate trading days per year
    const returns = [];
    let cumulativeReturn = 0;
    let maxDrawdown = 0;
    let currentDrawdown = 0;
    let wins = 0;
    let losses = 0;

    // Generate daily returns
    for (let i = 0; i < tradingDays; i++) {
      const dailyReturn = (Math.random() - 0.45) * 0.03; // Slightly positive bias
      returns.push(dailyReturn);
      cumulativeReturn += dailyReturn;

      // Calculate drawdown
      if (cumulativeReturn < 0) {
        currentDrawdown = Math.abs(cumulativeReturn);
        maxDrawdown = Math.max(maxDrawdown, currentDrawdown);
      } else {
        currentDrawdown = 0;
      }

      // Count wins/losses
      if (dailyReturn > 0) wins++;
      else if (dailyReturn < 0) losses++;
    }

    const totalReturn = cumulativeReturn;
    const volatility =
      Math.sqrt(returns.reduce((sum, r) => sum + r * r, 0) / returns.length) * Math.sqrt(252);
    const sharpeRatio = totalReturn / volatility;
    const winRate = wins / (wins + losses);
    const profitFactor = wins > 0 && losses > 0 ? (wins * 0.01) / (losses * 0.01) : 1.0;

    const backtest = {
      agentId,
      agentName: agent.name,
      period: { startDate, endDate },
      results: {
        totalReturn,
        annualizedReturn: totalReturn,
        volatility,
        sharpeRatio,
        maxDrawdown,
        winRate,
        profitFactor,
        totalTrades: wins + losses,
        winningTrades: wins,
        losingTrades: losses,
        averageWin: 0.012,
        averageLoss: -0.008,
        largestWin: 0.045,
        largestLoss: -0.032,
      },
      dailyReturns: returns,
      equityCurve: returns.reduce((acc: number[], ret: number, i: number) => {
        const prevValue = i === 0 ? 100000 : acc[i - 1];
        acc.push(prevValue * (1 + ret));
        return acc;
      }, [] as number[]),
      timestamp: new Date(),
    };

    // Store backtest results
    this.trainingHistory.set(`backtest_${agentId}_${Date.now()}`, backtest);

    return backtest;
  }

  async getTrainingProgress(agentId: string): Promise<any> {
    const progress = this.trainingProgress.get(agentId);
    if (!progress) {
      return null;
    }

    return {
      ...progress,
      elapsedTime: Date.now() - progress.startTime.getTime(),
      progressPercent: (progress.currentEpisode / progress.targetEpisodes) * 100,
      estimatedTimeRemaining:
        progress.currentEpisode > 0
          ? ((Date.now() - progress.startTime.getTime()) / progress.currentEpisode) *
            (progress.targetEpisodes - progress.currentEpisode)
          : null,
    };
  }

  getModels(): Record<string, unknown>[] {
    return Array.from(this.models.values());
  }

  getEnvironments(): Record<string, unknown>[] {
    return Array.from(this.environments.values());
  }

  getAgents(): Record<string, unknown>[] {
    return Array.from(this.agents.values());
  }

  getAgent(agentId: string): any {
    return this.agents.get(agentId);
  }

  getTrainingHistory(limit = 10): Record<string, unknown>[] {
    return Array.from(this.trainingHistory.values()).slice(-limit);
  }

  isCurrentlyTraining(): boolean {
    return this.isTraining;
  }
}

export const reinforcementLearningService = ReinforcementLearningService.getInstance();
