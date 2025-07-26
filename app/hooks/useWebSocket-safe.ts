import { useEffect, useRef, useState } from 'react';
import type {
  ClientToServerEvents,;
  ServerToClientEvents,;
  MarketDataUpdate,;
  AISignal,;
  PortfolioUpdate,;
  SocialPost,;
  TradeNotification,;
} from '@/app/types/socket';

type SocketType = any; // We'll use any since we're importing dynamically;
interface UseWebSocketReturn {






















  socket: SocketType | null;
  isConnected: boolean;
  marketData: Record<string, MarketDataUpdate>;
  aiSignals: AISignal[];
  portfolioData: PortfolioUpdate | null;
  socialPosts: SocialPost[];
  tradeNotifications: TradeNotification[];
  subscribeToMarketData: (symbols: string[]) => void;
  unsubscribeFromMarketData: (symbols: string[]) => void;
  subscribeToAISignals: (userId: string) => void;
  subscribeToPortfolio: (userId: string) => void;
  subscribeToSocialFeed: (userId: string) => void;
  subscribeToTradeNotifications: (userId: string) => void;
  clearNotifications: () => void;






















}

export const useWebSocket = (userId?: string): UseWebSocketReturn => {
  const socketRef = useRef<SocketType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [marketData, setMarketData] = useState<Record<string, MarketDataUpdate>>({});
  const [aiSignals, setAISignals] = useState<AISignal[]>([]);
  const [portfolioData, setPortfolioData] = useState<PortfolioUpdate | null>(null);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [tradeNotifications, setTradeNotifications] = useState<TradeNotification[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializeSocket = async () => {
      try {
        // Dynamic import for client-side only;
        const { io } = await import('socket.io-client');

        await fetch('/api/socketio');

        socketRef.current = io(;
          process.env.NODE_ENV === 'production';
            ? process.env.NEXT_PUBLIC_APP_URL || '';
            : 'http://localhost:3000',;
          {
            path: '/api/socketio',;
            addTrailingSlash: false,;
          }
        );

        const socket = socketRef.current;

        socket.on('connect', () => {
          console.log('Connected to WebSocket server');
          setIsConnected(true);
        });

        socket.on('disconnect', () => {
          console.log('Disconnected from WebSocket server');
          setIsConnected(false);
        });

        // Market data handler;
        socket.on('market-data', (data: MarketDataUpdate) => {
          setMarketData(prev => ({
            ...prev,;
            [data.symbol]: data,;
          }));
        });

        // AI signals handlers;
        socket.on('ai-signals', (signals: AISignal[]) => {
          setAISignals(signals);
        });

        socket.on('new-ai-signal', (signal: AISignal) => {
          setAISignals(prev => [signal, ...prev].slice(0, 50)); // Keep last 50 signals;
        });

        // Portfolio updates handler;
        socket.on('portfolio-update', (data: PortfolioUpdate) => {
          setPortfolioData(data);
        });

        // Social feed handlers;
        socket.on('new-social-post', (post: SocialPost) => {
          setSocialPosts(prev => [post, ...prev].slice(0, 100)); // Keep last 100 posts;
        });

        // Trade notifications handler;
        socket.on('trade-notification', (notification: TradeNotification) => {
          setTradeNotifications(prev => [notification, ...prev].slice(0, 20)); // Keep last 20 notifications;
        });
      } catch (error) {
        console.error('Failed to initialize WebSocket:', error);
      }
    };

    initializeSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const subscribeToMarketData = (symbols: string[]) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('subscribe-market-data', symbols);
    }
  };

  const unsubscribeFromMarketData = (symbols: string[]) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('unsubscribe-market-data', symbols);
    }
  };

  const subscribeToAISignals = (userId: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('subscribe-ai-signals', userId);
    }
  };

  const subscribeToPortfolio = (userId: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('subscribe-portfolio', userId);
    }
  };

  const subscribeToSocialFeed = (userId: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('subscribe-social-feed', userId);
    }
  };

  const subscribeToTradeNotifications = (userId: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('subscribe-trade-notifications', userId);
    }
  };

  const clearNotifications = () => {
    setTradeNotifications([]);
  };

  return {
    socket: socketRef.current,;
    isConnected,;
    marketData,;
    aiSignals,;
    portfolioData,;
    socialPosts,;
    tradeNotifications,;
    subscribeToMarketData,;
    unsubscribeFromMarketData,;
    subscribeToAISignals,;
    subscribeToPortfolio,;
    subscribeToSocialFeed,;
    subscribeToTradeNotifications,;
    clearNotifications,;
  };
};
