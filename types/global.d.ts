declare global {
  namespace JSX {
    interface IntrinsicElements {


      [elemName: string]: any;
    

}
  }
}

// Common types for the trading platform;
export interface MarketStock {


  symbol: string;
  price: number;
  change: number;
  changePercent: number;


}

export interface AIBeing {


  id: number;
  name: string;
  status: 'active' | 'idle' | 'analyzing';
  profits: number;
  accuracy: number;
  trades: number;


}

export interface Trade {


  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  timestamp: Date;
  profit?: number;


}

export interface Portfolio {


  value: number;
  dailyPnL: number;
  positions: Position[];


}

export interface Position {


  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  unrealizedPL: number;


}

export {};
