'use client';
import React from 'react';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function DynamicStockTicker() {
  const [stocks, setStocks] = useState<StockData[]>([
    { symbol: 'AAPL', price: 193.58, change: 2.45, changePercent: 1.28 },
    { symbol: 'TSLA', price: 251.52, change: -3.22, changePercent: -1.26 },
    { symbol: 'MSFT', price: 378.85, change: 5.67, changePercent: 1.52 },
    { symbol: 'GOOGL', price: 142.56, change: 1.89, changePercent: 1.34 },
    { symbol: 'AMZN', price: 155.89, change: -2.11, changePercent: -1.33 },
    { symbol: 'NVDA', price: 875.28, change: 12.45, changePercent: 1.44 },
    { symbol: 'META', price: 485.59, change: 8.92, changePercent: 1.87 },
    { symbol: 'BTC', price: 67842.33, change: 1245.67, changePercent: 1.87 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const randomChange = (Math.random() - 0.5) * 5;
          const newPrice = Math.max(stock.price + randomChange, 1);
          const change = newPrice - stock.price;
          const changePercent = (change / stock.price) * 100;

          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat(changePercent.toFixed(2)),
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/30 backdrop-blur-sm border-y border-purple-500/20 py-3 overflow-hidden">
      <div className="flex animate-scroll">
        {[...stocks, ...stocks].map((stock, index) => (
          <div
            key={`${stock.symbol}-${index}`}
            className="flex items-center space-x-2 mx-6 whitespace-nowrap"
          >
            <span className="font-bold text-white">{stock.symbol}</span>
            <span className="text-gray-300">${stock.price.toLocaleString()}</span>
            <div
              className={`flex items-center space-x-1 ${
                stock.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {stock.change >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span className="text-sm">
                {stock.change >= 0 ? '+' : ''}
                {stock.change} ({stock.changePercent}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
