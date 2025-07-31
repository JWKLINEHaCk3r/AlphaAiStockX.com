import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Brain, DollarSign } from 'lucide-react';

interface Stock {
  symbol: string;
  price: number;
  change: number;
  aiConfidence: number;
  aiRecommendation: 'BUY' | 'SELL' | 'HOLD';
}

const mockStocks: Stock[] = [
  { symbol: 'AAPL', price: 178.42, change: 2.35, aiConfidence: 87, aiRecommendation: 'BUY' },
  { symbol: 'NVDA', price: 489.33, change: -5.67, aiConfidence: 94, aiRecommendation: 'SELL' },
  { symbol: 'TSLA', price: 245.67, change: 8.45, aiConfidence: 79, aiRecommendation: 'BUY' },
  { symbol: 'MSFT', price: 352.18, change: 1.89, aiConfidence: 91, aiRecommendation: 'HOLD' },
];

export default function AIStockScanner() {
  const [stocks] = useState<Stock[]>(mockStocks);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading new data
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">AI Stock Scanner</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stocks.map((stock) => {
          const isPositive = stock.change >= 0;
          const confidenceColor = stock.aiConfidence > 80 ? 'green' : stock.aiConfidence > 60 ? 'yellow' : 'red';
          return (
            <Card key={stock.symbol} className={[
              'relative overflow-hidden transition-all duration-500 hover:scale-105',
              loading ? 'animate-pulse' : '',
              stock.aiRecommendation === 'BUY' ? 'border-green-500/50 shadow-green-500/25' : 
              stock.aiRecommendation === 'SELL' ? 'border-red-500/50 shadow-red-500/25' : 
              'border-yellow-500/50 shadow-yellow-500/25',
              'shadow-lg'
            ].join(' ')}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">{stock.symbol}</CardTitle>
                  <div className="flex items-center">
                    <Brain className="w-3 h-3 mr-1" />
                    <span className={
                      'px-2 py-1 rounded text-xs font-semibold ' +
                      (stock.aiRecommendation === 'BUY' ? 'bg-green-100 text-green-700' :
                       stock.aiRecommendation === 'SELL' ? 'bg-red-100 text-red-700' :
                       'bg-yellow-100 text-yellow-700')
                    }>
                      {stock.aiRecommendation}
                    </span>
                  </div>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {'$' + stock.price.toFixed(2)}
                  <span className={[
                    'flex items-center',
                    isPositive ? 'text-green-500' : 'text-red-500'
                  ].join(' ')}>
                    {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>AI Confidence</span>
                      <span className="font-medium">{stock.aiConfidence}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className={
                          `h-2 rounded-full ${stock.aiConfidence > 80 ? 'bg-green-500' : stock.aiConfidence > 60 ? 'bg-yellow-500' : 'bg-red-500'} ` +
                          `w-[${Math.max(5, Math.min(stock.aiConfidence, 100))}%]`
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div className="text-center">
                      <div className="font-medium text-foreground">92%</div>
                      <div>Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">4.7s</div>
                      <div>Avg Speed</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">+12.4%</div>
                      <div>Today ROI</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="absolute top-2 right-2">
                <div className={[
                  'w-2 h-2 rounded-full',
                  confidenceColor === 'green' ? 'bg-green-500' : 
                  confidenceColor === 'yellow' ? 'bg-yellow-500' : 
                  'bg-red-500',
                  'animate-pulse'
                ].join(' ')}></div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
