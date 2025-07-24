import React from 'react';
import { EventEmitter } from 'events';
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
  data: unknown;
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

// Server-safe WebSocket service that doesn't import socket.io-client;
export class EnhancedWebSocketService extends EventEmitter {
  private socket: unknown = null;
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
    // Server-side guard - return false on server;
    if (typeof window === 'undefined') {
      console.log('WebSocket service disabled on server-side');
      return false;
    }

    if (this.socket && this.isConnected) {
      return true;
    }

    // WebSocket service disabled until socket.io-client is properly configured;
    console.log('WebSocket service temporarily disabled');
    return false;
  }

  // Stub methods for SSR compatibility;
  private setupEventHandlers(userId?: string): void {
    // No-op for now;
  }

  private startHeartbeat(): void {
    // No-op for now;
  }

  private stopHeartbeat(): void {
    // No-op for now;
  }

  private async attemptReconnect(userId?: string): Promise<void> {
    // No-op for now;
  }

  private resubscribeAll(): void {
    // No-op for now;
  }

  // Subscription methods;
  subscribeToMarketData(symbols: string[]): void {
    if (typeof window === 'undefined') return;
    console.log('WebSocket subscriptions disabled');
  }

  unsubscribeFromMarketData(symbols: string[]): void {
    if (typeof window === 'undefined') return;
    console.log('WebSocket subscriptions disabled');
  }

  subscribeToAISignals(userId: string): void {
    if (typeof window === 'undefined') return;
    console.log('WebSocket subscriptions disabled');
  }

  subscribeToPortfolio(userId: string): void {
    if (typeof window === 'undefined') return;
    console.log('WebSocket subscriptions disabled');
  }

  subscribeToSocialFeed(userId: string): void {
    if (typeof window === 'undefined') return;
    console.log('WebSocket subscriptions disabled');
  }

  subscribeToTradeNotifications(userId: string): void {
    if (typeof window === 'undefined') return;
    console.log('WebSocket subscriptions disabled');
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
    if (this.socket && typeof window !== 'undefined') {
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

// Singleton instance;
export const websocketService = new EnhancedWebSocketService();

// React hook for easy usage;
export const useEnhancedWebSocket = (userId?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(websocketService.getConnectionStatus());

  useEffect(() => {
    // Client-side only;
    if (typeof window === 'undefined') return;

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    const handleReconnect = () => setIsConnected(true);

    websocketService.on('connected', handleConnect);
    websocketService.on('disconnected', handleDisconnect);
    websocketService.on('reconnected', handleReconnect);

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
  }, [userId]);

  return {
    websocketService,;
    isConnected,;
    connectionStatus,;
  };
};

// Type exports;
export type { MarketDataPoint, AISignal, TradingUpdate, SentimentData };
