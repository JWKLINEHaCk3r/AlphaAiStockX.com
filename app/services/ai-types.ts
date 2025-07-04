// Extended types for AI trading engine historical data points

export interface HistoricalDataPoint {
  price: number;
  volume: number;
  technicals?: {
    rsi?: number;
    macd?: { line?: number };
    atr?: number;
    adx?: number;
  };
  sentiment?: {
    overall?: number;
  };
  fundamentals?: {
    pe?: number;
  };
  options?: {
    impliedVolatility?: number;
  };
  change?: number;
}
