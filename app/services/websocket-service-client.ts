import React from 'react';
// Client-side only WebSocket service;
('use client');

import { EventEmitter } from 'events';
import { io, Socket } from 'socket.io-client';
import { useState, useEffect } from 'react';

interface MarketDataPoint {

  symbol: string;
  price: number;
  volume: number;
  bid: number;
  ask: number;
  change: number;
  changePercent: number;
  timestamp: number;
  high: number;
  low: number;
  vwap?: number;
  rsi?: number;
  macd?: number;

}

interface AISignal {

  id: string;
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  currentPrice: number;
  targetPrice: number;
  stopLoss: number;
  strategy: string;
  reasoning: string;
  timestamp: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  timeframe: string;

}

interface TradingUpdate {

  type: 'POSITION' | 'ORDER' | 'EXECUTION' | 'PNL';
  data: any;
  timestamp: number;

}

interface SentimentData {

  symbol: string;
  overall: number;
  bullish: number;
  bearish: number;
  neutral: number;
  volume: number;
  sources: string[];
  timestamp: number;

}

export class EnhancedWebSocketService extends EventEmitter {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000;
  private isConnected = false;
  private subscriptions = new Set<string>();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  // Data caches;
  private marketDataCache = new Map<string, MarketDataPoint>();
  private aiSignalsCache: AISignal[] = [];
  private tradingUpdatesCache: TradingUpdate[] = [];
  private sentimentCache = new Map<string, SentimentData>();

  constructor() {
    super();
    this.setMaxListeners(100);
  }

  async connect(userId?: string): Promise<boolean> {
    if (this.socket && this.isConnected) {
      return true;
    }

    try {
      // Initialize socket.io endpoint;
      await fetch('/api/socketio');

      this.socket = io(;
        process.env.NODE_ENV === 'production';
          ? process.env.NEXT_PUBLIC_APP_URL || '';
          : 'http://localhost:3000',;
        {
          path: '/api/socketio',;
          addTrailingSlash: false,;
          transports: ['websocket', 'polling'],;
          timeout: 20000,;
          forceNew: true,;
        }
      );

      this.setupEventHandlers(userId);

      return new Promise(resolve => {
        this.socket!.on('connect', () => {
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          this.emit('connected');
          resolve(true);
        });

        this.socket!.on('connect_error', () => {
          resolve(false);
        });

        setTimeout(() => resolve(false), 5000);
      });
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      return false;
    }
  }

  private setupEventHandlers(userId?: string): void {
    if (!this.socket) return;

    // Connection events;
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

    // Market data events;
    this.socket.on('market-data', (data: MarketDataPoint) => {
      this.marketDataCache.set(data.symbol, data);
      this.emit('marketData', data);
    });

    // AI signals events;
    this.socket.on('new-ai-signal', (signal: AISignal) => {
      this.aiSignalsCache.unshift(signal);
      if (this.aiSignalsCache.length > 100) {
        this.aiSignalsCache = this.aiSignalsCache.slice(0, 100);
      }
      this.emit('aiSignal', signal);
    });

    this.socket.on('ai-signals', (signals: AISignal[]) => {
      this.aiSignalsCache = signals;
      this.emit('aiSignals', signals);
    });

    // Trading updates;
    this.socket.on('trading-update', (update: TradingUpdate) => {
      this.tradingUpdatesCache.unshift(update);
      if (this.tradingUpdatesCache.length > 200) {
        this.tradingUpdatesCache = this.tradingUpdatesCache.slice(0, 200);
      }
      this.emit('tradingUpdate', update);
    });

    // Portfolio updates;
    this.socket.on('portfolio-update', (data: any) => {
      this.emit('portfolioUpdate', data);
    });

    // Social feed;
    this.socket.on('new-social-post', (post: any) => {
      this.emit('socialPost', post);
    });

    // Trade notifications;
    this.socket.on('trade-notification', (notification: any) => {
      this.emit('tradeNotification', notification);
    });

    // Sentiment updates;
    this.socket.on('sentiment-update', (data: SentimentData) => {
      this.sentimentCache.set(data.symbol, data);
      this.emit('sentimentUpdate', data);
    });

    // Error handling;
    this.socket.on('error', (error: any) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    });
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.socket && this.isConnected) {
        this.socket.emit('ping');
      }
    }, 30000);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private async attemptReconnect(userId?: string): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.emit('maxReconnectAttemptsReached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    setTimeout(async () => {
      console.log(;
        `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`;
      );
      await this.connect(userId);
    }, delay);
  }

  private resubscribeAll(): void {
    this.subscriptions.forEach(subscription => {
      const [type, ...params] = subscription.split(':');
      switch (type) {
        case 'market':;
          this.subscribeToMarketData([params.join(':')]);
          break;
        case 'signals':;
          if (params[0]) this.subscribeToAISignals(params[0]);
          break;
        case 'portfolio':;
          if (params[0]) this.subscribeToPortfolio(params[0]);
          break;
        case 'social':;
          if (params[0]) this.subscribeToSocialFeed(params[0]);
          break;
        case 'notifications':;
          if (params[0]) this.subscribeToTradeNotifications(params[0]);
          break;
      }
    });
  }

  // Subscription methods;
  subscribeToMarketData(symbols: string[]): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('subscribe-market-data', symbols);
    symbols.forEach(symbol => {
      this.subscriptions.add(`market:${symbol}`);
    });
  }

  unsubscribeFromMarketData(symbols: string[]): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('unsubscribe-market-data', symbols);
    symbols.forEach(symbol => {
      this.subscriptions.delete(`market:${symbol}`);
    });
  }

  subscribeToAISignals(userId: string): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('subscribe-ai-signals', userId);
    this.subscriptions.add(`signals:${userId}`);
  }

  subscribeToPortfolio(userId: string): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('subscribe-portfolio', userId);
    this.subscriptions.add(`portfolio:${userId}`);
  }

  subscribeToSocialFeed(userId: string): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('subscribe-social-feed', userId);
    this.subscriptions.add(`social:${userId}`);
  }

  subscribeToTradeNotifications(userId: string): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('subscribe-trade-notifications', userId);
    this.subscriptions.add(`notifications:${userId}`);
  }

  // Data getters;
  getMarketData(symbol?: string): MarketDataPoint | undefined | Map<string, MarketDataPoint> {
    return symbol ? this.marketDataCache.get(symbol) : this.marketDataCache;
  }

  getAISignals(limit = 50): AISignal[] {
    return this.aiSignalsCache.slice(0, limit);
  }

  getTradingUpdates(limit = 100): TradingUpdate[] {
    return this.tradingUpdatesCache.slice(0, limit);
  }

  getSentimentData(symbol?: string): SentimentData | undefined | Map<string, SentimentData> {
    return symbol ? this.sentimentCache.get(symbol) : this.sentimentCache;
  }

  // Connection status;
  getConnectionStatus(): {
    connected: boolean;
    reconnectAttempts: number;
    subscriptions: number;
    dataPoints: {
      marketData: number;
      aiSignals: number;
      tradingUpdates: number;
      sentiment: number;
    };
  } {
    return {
      connected: this.isConnected,;
      reconnectAttempts: this.reconnectAttempts,;
      subscriptions: this.subscriptions.size,;
      dataPoints: {
        marketData: this.marketDataCache.size,;
        aiSignals: this.aiSignalsCache.length,;
        tradingUpdates: this.tradingUpdatesCache.length,;
        sentiment: this.sentimentCache.size,;
      },;
    };
  }

  // Cleanup;
  disconnect(): void {
    this.stopHeartbeat();
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.isConnected = false;
    this.subscriptions.clear();
    this.marketDataCache.clear();
    this.aiSignalsCache = [];
    this.tradingUpdatesCache = [];
    this.sentimentCache.clear();
  }
}

// React hook for easy usage;
export const useEnhancedWebSocket = (userId?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [websocketService] = useState(() => new EnhancedWebSocketService());
  const [connectionStatus, setConnectionStatus] = useState(websocketService.getConnectionStatus());

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    const handleReconnect = () => setIsConnected(true);

    websocketService.on('connected', handleConnect);
    websocketService.on('disconnected', handleDisconnect);
    websocketService.on('reconnected', handleReconnect);

    // Auto-connect if not connected;
    if (!websocketService.getConnectionStatus().connected) {
      websocketService.connect(userId);
    }

    // Update connection status periodically;
    const statusInterval = setInterval(() => {
      setConnectionStatus(websocketService.getConnectionStatus());
    }, 5000);

    return () => {
      websocketService.off('connected', handleConnect);
      websocketService.off('disconnected', handleDisconnect);
      websocketService.off('reconnected', handleReconnect);
      clearInterval(statusInterval);
    };
  }, [userId, websocketService]);

  return {
    websocketService,;
    isConnected,;
    connectionStatus,;
  };
};

// Type exports;
export type { MarketDataPoint, AISignal, TradingUpdate, SentimentData };
