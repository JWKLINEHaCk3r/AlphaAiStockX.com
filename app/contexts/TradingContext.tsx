'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useWebSocket } from '@/app/hooks/useWebSocket';
import { apiClient } from '@/app/services/api-client';

interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  avatar?: string;
  tier: 'FREE' | 'BASIC' | 'PRO' | 'ULTIMATE' | 'OWNER';
  status: string;
  balance: number;
  portfolioValue: number;
  totalPnL: number;
  winRate: number;
  riskScore: number;
  tradingLevel: number;
  aiAccess: boolean;
  preferences: any;
  portfolios?: any[];
  social?: any;
  unreadNotifications?: number;
}

interface Portfolio {
  id: string;
  name: string;
  description: string;
  type: string;
  cashBalance: number;
  totalValue: number;
  totalMarketValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  dailyPnL: number;
  dailyPnLPercent: number;
  riskLevel: string;
  autoTrading: boolean;
  positions: Position[];
  positionsCount: number;
  lastUpdated: string;
}

interface Position {
  id: string;
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  side: 'LONG' | 'SHORT';
  lastUpdated: string;
}

interface Order {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT' | 'STOP' | 'STOP_LIMIT';
  quantity: number;
  price?: number;
  stopPrice?: number;
  status: string;
  submittedAt: string;
  filledAt?: string;
  executionPrice?: number;
  executedQuantity?: number;
}

interface AISignal {
  id: string;
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  currentPrice: number;
  targetPrice: number;
  stopLoss?: number;
  strategy: string;
  timeframe: string;
  riskLevel: string;
  aiModel: string;
  timestamp: string;
  analysis: any;
  reasoning: string[];
}

interface TradingContextType {
  // User & Authentication
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Portfolios & Positions
  portfolios: Portfolio[];
  activePortfolio: Portfolio | null;
  positions: Position[];
  orders: Order[];
  
  // Market Data
  marketData: Record<string, any>;
  subscribedSymbols: string[];
  
  // AI Trading
  aiSignals: AISignal[];
  aiModels: any[];
  
  // Social Trading
  socialFeed: any[];
  notifications: any[];
  
  // Real-time connections
  isConnected: boolean;
  
  // Actions
  refreshUserData: () => Promise<void>;
  refreshPortfolios: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  refreshAISignals: () => Promise<void>;
  placeOrder: (orderData: any) => Promise<boolean>;
  subscribeToSymbols: (symbols: string[]) => void;
  unsubscribeFromSymbols: (symbols: string[]) => void;
  setActivePortfolio: (portfolio: Portfolio) => void;
  
  // Real-time subscriptions
  subscribeToRealTimeData: () => void;
  unsubscribeFromRealTimeData: () => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const useTradingContext = () => {
  const context = useContext(TradingContext);
  if (context === undefined) {
    throw new Error('useTradingContext must be used within a TradingProvider');
  }
  return context;
};

interface TradingProviderProps {
  children: ReactNode;
}

export const TradingProvider: React.FC<TradingProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const {
    socket,
    isConnected,
    marketData,
    aiSignals: wsAISignals,
    portfolioData: wsPortfolioData,
    socialPosts,
    tradeNotifications,
    subscribeToMarketData,
    unsubscribeFromMarketData,
    subscribeToAISignals,
    subscribeToPortfolio,
    subscribeToSocialFeed,
    subscribeToTradeNotifications,
  } = useWebSocket(session?.user?.id);

  // State
  const [user, setUser] = useState<User | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [activePortfolio, setActivePortfolioState] = useState<Portfolio | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [aiSignals, setAISignals] = useState<AISignal[]>([]);
  const [aiModels, setAIModels] = useState<any[]>([]);
  const [socialFeed, setSocialFeed] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [subscribedSymbols, setSubscribedSymbols] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = status === 'authenticated' && !!session?.user;

  // Initialize user data
  useEffect(() => {
    if (isAuthenticated) {
      refreshUserData();
      subscribeToRealTimeData();
    } else {
      setUser(null);
      setPortfolios([]);
      setActivePortfolioState(null);
      setPositions([]);
      setOrders([]);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Update AI signals from WebSocket
  useEffect(() => {
    if (wsAISignals.length > 0) {
      setAISignals(wsAISignals);
    }
  }, [wsAISignals]);

  // Update portfolio data from WebSocket
  useEffect(() => {
    if (wsPortfolioData && activePortfolio) {
      setActivePortfolioState(prev => prev ? {
        ...prev,
        totalValue: wsPortfolioData.totalValue,
        dailyPnL: wsPortfolioData.dailyPnL,
        dailyPnLPercent: wsPortfolioData.dailyPnLPercent,
        cashBalance: wsPortfolioData.cashBalance,
        lastUpdated: wsPortfolioData.timestamp,
      } : null);
    }
  }, [wsPortfolioData, activePortfolio]);

  // Update social feed from WebSocket
  useEffect(() => {
    if (socialPosts.length > 0) {
      setSocialFeed(prev => [...socialPosts, ...prev].slice(0, 100));
    }
  }, [socialPosts]);

  // Update notifications from WebSocket
  useEffect(() => {
    if (tradeNotifications.length > 0) {
      setNotifications(prev => [...tradeNotifications, ...prev].slice(0, 50));
    }
  }, [tradeNotifications]);

  const refreshUserData = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getUserProfile();
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPortfolios = async () => {
    try {
      const response = await apiClient.getPortfolios();
      if (response.success && response.data) {
        setPortfolios(response.data.portfolios);
        if (response.data.portfolios.length > 0 && !activePortfolio) {
          setActivePortfolioState(response.data.portfolios[0]);
        }
        
        // Update positions from active portfolio
        const active = activePortfolio || response.data.portfolios[0];
        if (active) {
          setPositions(active.positions || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch portfolios:', error);
    }
  };

  const refreshOrders = async () => {
    try {
      const response = await apiClient.getOrders({
        portfolioId: activePortfolio?.id,
        limit: 50,
      });
      if (response.success && response.data) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const refreshAISignals = async () => {
    try {
      const response = await apiClient.getAISignals({ limit: 20 });
      if (response.success && response.data) {
        setAISignals(response.data.signals);
      }
    } catch (error) {
      console.error('Failed to fetch AI signals:', error);
    }
  };

  const placeOrder = async (orderData: any): Promise<boolean> => {
    try {
      const response = await apiClient.placeOrder({
        ...orderData,
        portfolioId: orderData.portfolioId || activePortfolio?.id,
      });
      
      if (response.success) {
        // Refresh orders and portfolios
        await Promise.all([refreshOrders(), refreshPortfolios()]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to place order:', error);
      return false;
    }
  };

  const subscribeToSymbols = (symbols: string[]) => {
    subscribeToMarketData(symbols);
    setSubscribedSymbols(prev => [...new Set([...prev, ...symbols])]);
  };

  const unsubscribeFromSymbols = (symbols: string[]) => {
    unsubscribeFromMarketData(symbols);
    setSubscribedSymbols(prev => prev.filter(s => !symbols.includes(s)));
  };

  const setActivePortfolio = (portfolio: Portfolio) => {
    setActivePortfolioState(portfolio);
    setPositions(portfolio.positions || []);
    refreshOrders();
  };

  const subscribeToRealTimeData = () => {
    if (isConnected && session?.user?.id) {
      subscribeToAISignals(session.user.id);
      subscribeToPortfolio(session.user.id);
      subscribeToSocialFeed(session.user.id);
      subscribeToTradeNotifications(session.user.id);
    }
  };

  const unsubscribeFromRealTimeData = () => {
    // WebSocket cleanup is handled by the hook
  };

  // Initial data loading
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      Promise.all([
        refreshPortfolios(),
        refreshAISignals(),
      ]);
    }
  }, [isAuthenticated, isLoading]);

  const contextValue: TradingContextType = {
    // User & Authentication
    user,
    isAuthenticated,
    isLoading,
    
    // Portfolios & Positions
    portfolios,
    activePortfolio,
    positions,
    orders,
    
    // Market Data
    marketData,
    subscribedSymbols,
    
    // AI Trading
    aiSignals,
    aiModels,
    
    // Social Trading
    socialFeed,
    notifications,
    
    // Real-time connections
    isConnected,
    
    // Actions
    refreshUserData,
    refreshPortfolios,
    refreshOrders,
    refreshAISignals,
    placeOrder,
    subscribeToSymbols,
    unsubscribeFromSymbols,
    setActivePortfolio,
    subscribeToRealTimeData,
    unsubscribeFromRealTimeData,
  };

  return (
    <TradingContext.Provider value={contextValue}>
      {children}
    </TradingContext.Provider>
  );
};

export default TradingProvider;
