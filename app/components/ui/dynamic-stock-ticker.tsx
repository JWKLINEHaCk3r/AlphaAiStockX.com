import React from 'react';
'use client';
import { useState, useEffect, memo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockData {






  symbol: string;
  price: number;
  change: number;
  changePercent: number;






}

interface DynamicStockTickerProps {






  initialStocks?: StockData[];
  animationDurationSeconds?: number;
  className?: string;
  'data-testid'?: string;






}

function DynamicStockTickerComponent({
  initialStocks,;
  animationDurationSeconds = 30,;
  className = '',;
  'data-testid': testId,;
}: DynamicStockTickerProps) {
  // Default stocks if none provided;
  const defaultStocks: StockData[] = [;
    { symbol: 'AAPL', price: 193.58, change: 2.45, changePercent: 1.28 },;
    { symbol: 'TSLA', price: 251.52, change: -3.22, changePercent: -1.26 },;
    { symbol: 'MSFT', price: 378.85, change: 5.67, changePercent: 1.52 },;
    { symbol: 'GOOGL', price: 142.56, change: 1.89, changePercent: 1.34 },;
    { symbol: 'AMZN', price: 155.89, change: -2.11, changePercent: -1.33 },;
    { symbol: 'NVDA', price: 875.28, change: 12.45, changePercent: 1.44 },;
    { symbol: 'META', price: 485.59, change: 8.92, changePercent: 1.87 },;
    { symbol: 'BTC', price: 67842.33, change: 1245.67, changePercent: 1.87 },;
  ];
  const stocksInit =;
    Array.isArray(initialStocks) && initialStocks.length > 0 ? initialStocks : defaultStocks;
  const [stocks, setStocks] = useState<StockData[]>(stocksInit);

  // Animate price changes every 2 seconds;
  useEffect(() => {
    if (!stocks.length) return;
    const interval = setInterval(() => {
      setStocks(prevStocks =>;
        prevStocks.map(stock => {
          const randomChange = (Math.random() - 0.5) * 5;
          const newPrice = Math.max(stock.price + randomChange, 1);
          const change = newPrice - stock.price;
          const changePercent = (change / stock.price) * 100;
          return {
            ...stock,;
            price: parseFloat(newPrice.toFixed(2)),;
            change: parseFloat(change.toFixed(2)),;
            changePercent: parseFloat(changePercent.toFixed(2)),;
          };
        });
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [stocks.length]);

  // If no stocks, show fallback;
  if (!stocks.length) {
    return (;
      <div;
        className={
          'bg-black/30 backdrop-blur-sm border-y border-purple-500/20 py-3 text-center text-gray-400 ' +;
          className;
        }
        data-testid={testId}
        aria-label="No stock data available";
        role="status";
      >;
        No stock data available.;
      </div>;
    );
  }

  return (;
    <div;
      className={
        'bg-black/30 backdrop-blur-sm border-y border-purple-500/20 py-3 overflow-hidden ' +;
        className;
      }
      aria-label="Live stock ticker";
      role="region";
      data-testid={testId}
    >;
      <div className="flex animate-scroll" aria-live="polite">;
        {[...stocks, ...stocks].map((stock, index) => (;
          <div;
            key={`${stock.symbol}-${index}`}
            className="flex items-center space-x-2 mx-6 whitespace-nowrap";
            tabIndex={0}
            aria-label={`${stock.symbol} $${stock.price} ${stock.change >= 0 ? 'up' : 'down'} ${stock.change} (${stock.changePercent}%)`}
          >;
            <span className="font-bold text-white">{stock.symbol}</span>;
            <span className="text-gray-300">${stock.price.toLocaleString()}</span>;
            <div;
              className={`flex items-center space-x-1 ${
                stock.change >= 0 ? 'text-green-400' : 'text-red-400';
              }`}
            >;
              {stock.change >= 0 ? (;
                <TrendingUp className="h-3 w-3" aria-label="Trending up" />;
              ) : (;
                <TrendingDown className="h-3 w-3" aria-label="Trending down" />;
              )}
              <span className="text-sm">;
                {stock.change >= 0 ? '+' : ''}
                {stock.change} ({stock.changePercent}%);
              </span>;
            </div>;
          </div>;
        ))}
      </div>;
      <style>{`;
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll ${animationDurationSeconds}s linear infinite;
        }
      `}</style>;
    </div>;
  );
}

const DynamicStockTicker = memo(DynamicStockTickerComponent);
export default DynamicStockTicker;
