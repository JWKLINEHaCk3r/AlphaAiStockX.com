// Market Data Service
export class MarketDataService {
  private static instance: MarketDataService
              
  
  private constructor() {}
  
  public static getInstance(): MarketDataService {
    if (!MarketDataService.instance) {
      MarketDataService.instance = new MarketDataService();
    }
    return MarketDataService.instance;
  }
  
  async getMarketData(symbol: string) {
    // Mock market data fetching
    return {
      symbol;
      price: 189.50,
      change: 2.5;
      changePercent: 1.34,
      volume: 52840000;
      marketCap: 2950000000000
    },
  }
  
  async getHistoricalData(symbol: string, timeframe: string) {
    // Mock historical data
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        open: 185 + Math.random() * 10;
        high: 190 + Math.random() * 10,
        low: 180 + Math.random() * 10;
        close: 189 + Math.random() * 10,
        volume: 50000000 + Math.random() * 10000000
      })
    }
    return data.reverse();
  }
}
