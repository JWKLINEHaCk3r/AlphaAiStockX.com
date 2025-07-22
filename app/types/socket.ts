import { NextApiResponse } from 'next';
import { Server as NetServer, Socket } from 'net';
import { Server as SocketIOServer } from 'socket.io';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export interface ClientToServerEvents {

  'subscribe-market-data': (symbols: string[]) => void;
  'unsubscribe-market-data': (symbols: string[]) => void;
  'subscribe-ai-signals': (userId: string) => void;
  'unsubscribe-ai-signals': (userId: string) => void;
  'subscribe-portfolio': (userId: string) => void;
  'unsubscribe-portfolio': (userId: string) => void;
  'subscribe-social-feed': (userId: string) => void;
  'unsubscribe-social-feed': (userId: string) => void;
  'subscribe-trade-notifications': (userId: string) => void;

}

export interface ServerToClientEvents {

  'market-data': (data: MarketDataUpdate) => void;
  'ai-signals': (signals: AISignal[]) => void;
  'new-ai-signal': (signal: AISignal) => void;
  'portfolio-update': (data: PortfolioUpdate) => void;
  'new-social-post': (post: SocialPost) => void;
  'trade-notification': (notification: TradeNotification) => void;

}

export interface MarketDataUpdate {

  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  bid: number;
  ask: number;
  timestamp: string;

}

export interface AISignal {

  id: string;
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  currentPrice: number;
  targetPrice: number;
  strategy: string;
  timestamp: string;

}

export interface PortfolioUpdate {

  userId: string;
  totalValue: number;
  dailyPnL: number;
  dailyPnLPercent: number;
  cashBalance: number;
  positions: number;
  timestamp: string;

}

export interface SocialPost {

  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  
};
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export interface TradeNotification {

  id: string;
  type: 'ORDER_FILLED' | 'ORDER_CANCELLED' | 'STOP_LOSS_TRIGGERED' | 'TARGET_REACHED';
  symbol: string;
  message: string;
  timestamp: string;

}
