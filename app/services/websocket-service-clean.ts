import { EventEmitter } from 'events';

// Interface definitions
export interface MarketDataPoint {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: Date;
}

export interface AISignal {
  id: string;
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  price: number;
  timestamp: Date;
}

export interface TradingUpdate {
  id: string;
  type: 'ORDER' | 'TRADE' | 'PORTFOLIO';
  data: any;
  timestamp: Date;
}

export interface SentimentData {
  symbol: string;
  sentiment: number;
  volume: number;
  timestamp: Date;
}

export class EnhancedWebSocketService extends EventEmitter {
  private socket: any = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private subscriptions = new Set<string>();

  // Data caches
  private marketDataCache = new Map<string, MarketDataPoint>();
  private aiSignalsCache: AISignal[] = [];
  private tradingUpdatesCache: TradingUpdate[] = [];
  private sentimentCache = new Map<string, SentimentData>();

  constructor() {
    super();
    this.setMaxListeners(100);
  }

  async connect(userId?: string): Promise<boolean> {
    // Server-side guard - return false on server
    if (typeof window === 'undefined') {
      return false;
    }

    if (this.socket && this.isConnected) {
      return true;
    }

    try {
      // Dynamic import for client-side only - temporarily return false since socket.io-client is not installed
      console.log('WebSocket service disabled until socket.io-client is properly configured');
      return false;
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      return false;
    }
  }

  private setupEventHandlers(userId?: string): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on('disconnect', () => {
      this.isConnected = false;
      this.stopHeartbeat();
      this.emit('disconnected');
      this.attemptReconnect(userId);
    });

    this.socket.on('reconnect', () => {
      this.isConnected = true;
      this.emit('reconnected');
      this.resubscribeAll();
    });

    // Market data events
    this.socket.on('market-data', (data: MarketDataPoint) => {
      this.marketDataCache.set(data.symbol, data);
      this.emit('marketData', data);
    });

    // AI signals events
    this.socket.on('ai-signal', (signal: AISignal) => {
      this.aiSignalsCache.unshift(signal);
      if (this.aiSignalsCache.length > 100) {
        this.aiSignalsCache = this.aiSignalsCache.slice(0, 100);
      }
      this.emit('aiSignal', signal);
    });

    // Trading updates
    this.socket.on('trading-update', (update: TradingUpdate) => {
      this.tradingUpdatesCache.unshift(update);
      if (this.tradingUpdatesCache.length > 200) {
        this.tradingUpdatesCache = this.tradingUpdatesCache.slice(0, 200);
      }
      this.emit('tradingUpdate', update);
    });

    // Portfolio updates
    this.socket.on('portfolio-update', (data: any) => {
      this.emit('portfolioUpdate', data);
    });

    // Sentiment updates
    this.socket.on('sentiment-update', (data: SentimentData) => {
      this.sentimentCache.set(data.symbol, data);
      this.emit('sentimentUpdate', data);
    });

    // Error handling
    this.socket.on('error', (error: any) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    });
  }

  private startHeartbeat(): void {
    if (typeof window === 'undefined') return;
    
    this.heartbeatInterval = setInterval(() => {
      if (this.socket && this.isConnected) {
        this.socket.emit('ping');
      }
    }, 30000); // 30 seconds
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private async attemptReconnect(userId?: string): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    setTimeout(async () => {
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      await this.connect(userId);
    }, delay);
  }

  private resubscribeAll(): void {
    this.subscriptions.forEach(subscription => {
      const [type, ...params] = subscription.split(':');
      switch (type) {
        case 'market':
          this.subscribeToMarketData([params.join(':')]);
          break;
        case 'signals':
          if (params[0]) this.subscribeToAISignals(params[0]);
          break;
        case 'portfolio':
          if (params[0]) this.subscribeToPortfolio(params[0]);
          break;
        case 'notifications':
          if (params[0]) this.subscribeToTradeNotifications(params[0]);
          break;
      }
    });
  }

  // Subscription methods
  subscribeToMarketData(symbols: string[]): void {
    if (!this.socket || !this.isConnected || typeof window === 'undefined') return;
    
    this.socket.emit('subscribe-market-data', symbols);
    symbols.forEach(symbol => {
      this.subscriptions.add(`market:${symbol}`);
    });
  }

  unsubscribeFromMarketData(symbols: string[]): void {
    if (!this.socket || !this.isConnected || typeof window === 'undefined') return;
    
    this.socket.emit('unsubscribe-market-data', symbols);
    symbols.forEach(symbol => {
      this.subscriptions.delete(`market:${symbol}`);
    });
  }

  subscribeToAISignals(userId: string): void {
    if (!this.socket || !this.isConnected || typeof window === 'undefined') return;
    
    this.socket.emit('subscribe-ai-signals', userId);
    this.subscriptions.add(`signals:${userId}`);
  }

  subscribeToPortfolio(userId: string): void {
    if (!this.socket || !this.isConnected || typeof window === 'undefined') return;
    
    this.socket.emit('subscribe-portfolio', userId);
    this.subscriptions.add(`portfolio:${userId}`);
  }

  subscribeToTradeNotifications(userId: string): void {
    if (!this.socket || !this.isConnected || typeof window === 'undefined') return;
    
    this.socket.emit('subscribe-notifications', userId);
    this.subscriptions.add(`notifications:${userId}`);
  }

  subscribeToSocialFeed(userId: string): void {
    if (!this.socket || !this.isConnected || typeof window === 'undefined') return;
    
    this.socket.emit('subscribe-social', userId);
    this.subscriptions.add(`social:${userId}`);
  }

  // Data getters
  getMarketData(symbol?: string): MarketDataPoint | undefined | Map<string, MarketDataPoint> {
    return symbol ? this.marketDataCache.get(symbol) : this.marketDataCache;
  }

  getAISignals(limit: number = 50): AISignal[] {
    return this.aiSignalsCache.slice(0, limit);
  }

  getTradingUpdates(limit: number = 100): TradingUpdate[] {
    return this.tradingUpdatesCache.slice(0, limit);
  }

  getSentimentData(symbol?: string): SentimentData | undefined | Map<string, SentimentData> {
    return symbol ? this.sentimentCache.get(symbol) : this.sentimentCache;
  }

  getConnectionStatus() {
    return {
      connected: this.isConnected,
      subscriptions: this.subscriptions.size,
      marketData: this.marketDataCache.size,
      aiSignals: this.aiSignalsCache.length,
      tradingUpdates: this.tradingUpdatesCache.length,
      reconnectAttempts: this.reconnectAttempts,
    };
  }

  disconnect(): void {
    if (this.socket && typeof window !== 'undefined') {
      this.stopHeartbeat();
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.subscriptions.clear();
      this.emit('disconnected');
    }
  }

  // Cleanup method
  cleanup(): void {
    if (typeof window === 'undefined') return;
    
    this.disconnect();
    this.removeAllListeners();
    this.marketDataCache.clear();
    this.aiSignalsCache = [];
    this.tradingUpdatesCache = [];
    this.sentimentCache.clear();
  }
}

// Singleton instance
export const websocketService = new EnhancedWebSocketService();
export default websocketService;
