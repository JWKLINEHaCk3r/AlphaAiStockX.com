import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Settings, BarChart3, Eye, Target, Shield, Zap, PieChart, Activity, ArrowUp, ArrowDown } from 'lucide-react';

// Advanced Trading Interface - Professional Chart & Order Entry;
// Type definitions;
interface MarketData {




















  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  open: number;




















}

interface ChartData {




















  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;




















}

// Implementation code moved into the main component below;
const AdvancedTradingInterface: React.FC = () => {
  // State and refs;
  const [symbol, setSymbol] = useState<string>('AAPL');
  const [marketData, setMarketData] = useState<MarketData | null>(null);
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, BarChart3, Eye, Target, Shield, Zap, PieChart, Activity, ArrowUp, ArrowDown } from "lucide-react";
  return (;
    <div className="advanced-trading-interface-root">;
      <div className="h-screen bg-slate-900 text-white">;
        {/* Trading Header */}
        <div className="h-16 bg-slate-800 border-b border-slate-700 flex items-center px-6">;
          <div className="flex items-center space-x-6">;
            <Select value={symbol} onValueChange={onSymbolChange}>;
              <SelectTrigger className="w-32 bg-slate-700 border-slate-600">;
                <SelectValue placeholder="Select symbol" />;
              </SelectTrigger>;
              <SelectContent>;
                <SelectItem value="AAPL">AAPL</SelectItem>;
                <SelectItem value="TSLA">TSLA</SelectItem>;
                <SelectItem value="NVDA">NVDA</SelectItem>;
                <SelectItem value="MSFT">MSFT</SelectItem>;
                <SelectItem value="GOOGL">GOOGL</SelectItem>;
              </SelectContent>;
            </Select>;
            {/* ...rest of the JSX... */}
          </div>;
        </div>;
        {/* Technical Indicators Panel */}
        {/* ...rest of the JSX... */}
        {/* Order Entry Panel */}
        {/* ...rest of the JSX... */}
      </div>;
    </div>;
  );

interface ChartData {




















  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;




















}

const AdvancedTradingInterface: React.FC = () => {
  const [symbol, setSymbol] = useState<string>("AAPL");
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [technicalIndicators, setTechnicalIndicators] = useState<any[]>([]);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [timeframe, setTimeframe] = useState<string>("1m");
  const [chartType, setChartType] = useState<string>("candlestick");
  const [showIndicators, setShowIndicators] = useState<boolean>(true);
  const [orderData, setOrderData] = useState<any>({
    side: "BUY",;
    orderType: "MARKET",;
    quantity: 1,;
    price: undefined,;
    stopPrice: undefined,;
    timeInForce: "DAY",;
  });
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMarketData({
      symbol,;
      price: 178.23,;
      change: 1.12,;
      changePercent: 0.63,;
      volume: 1234567,;
      bid: 178.2,;
      ask: 178.25,;
      high: 180.0,;
      low: 177.5,;
      open: 178.0,;
    });
  }, [symbol]);

  useEffect(() => {
    loadChartData();
    loadTechnicalIndicators();
    let interval: NodeJS.Timeout | undefined;
    if (autoRefresh) {
      interval = setInterval(() => {
        loadChartData();
        loadTechnicalIndicators();
      }, 10000);
    }
    return () => interval && clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps;
  }, [symbol, timeframe, autoRefresh]);

  const loadChartData = async () => {
    try {
      const response = await fetch(`/api/chart-data/${symbol}?timeframe=${timeframe}`);
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      const mockData: ChartData[] = [];
      const now = Date.now();
      for (let i = 100; i >= 0; i--) {
        const timestamp = now - i * 60000;
        const basePrice = 178 + Math.sin(i / 10) * 5;
        mockData.push({
          timestamp,;
          open: basePrice + Math.random() * 2 - 1,;
          high: basePrice + Math.random() * 3,;
          low: basePrice - Math.random() * 3,;
          close: basePrice + Math.random() * 2 - 1,;
          volume: Math.floor(Math.random() * 1000000),;
        });
      }
      setChartData(mockData);
    }
  };

  const loadTechnicalIndicators = async () => {
    try {
      const response = await fetch(`/api/technical-indicators/${symbol}`);
      const data = await response.json();
      setTechnicalIndicators(data);
    } catch (error) {
      setTechnicalIndicators([;
        { name: "RSI(14)", value: 67.3, signal: "NEUTRAL" },;
        { name: "MACD", value: 1.24, signal: "BUY" },;
        { name: "BB Upper", value: 182.45, signal: "SELL" },;
        { name: "SMA(20)", value: 176.8, signal: "BUY" },;
        { name: "Volume", value: 1.25, signal: "BUY" },;
      ]);
    }
  };

  const executeOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",;
        headers: { "Content-Type": "application/json" },;
        body: JSON.stringify(orderData),;
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Order executed:", result);
      } else {
        throw new Error("Order execution failed");
      }
    } catch (error) {
      console.error("Failed to execute order:", error);
    }
  };

  const calculateOrderValue = () => {
    if (!marketData) return 0;
    const price = orderData.orderType === "MARKET" ? marketData.price : orderData.price || 0;
    return price * orderData.quantity;
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "BUY":;
        return "text-green-400";
      case "SELL":;
        return "text-red-400";
      default:;
        return "text-yellow-400";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",;
      currency: "USD",;
      minimumFractionDigits: 2;
    }).format(amount);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const onSymbolChange = (value: string) => setSymbol(value);

  return (;
    <div className="h-screen bg-slate-900 text-white">;
      {/* Trading Header */}
      <div className="h-16 bg-slate-800 border-b border-slate-700 flex items-center px-6">;
        <div className="flex items-center space-x-6">;
          <Select value={symbol} onValueChange={onSymbolChange}>;
            <SelectTrigger className="w-32 bg-slate-700 border-slate-600">;
              <SelectValue placeholder="Select symbol" />;
            </SelectTrigger>;
            <SelectContent>;
              <SelectItem value="AAPL">AAPL</SelectItem>;
              <SelectItem value="TSLA">TSLA</SelectItem>;
              <SelectItem value="NVDA">NVDA</SelectItem>;
              <SelectItem value="MSFT">MSFT</SelectItem>;
              <SelectItem value="GOOGL">GOOGL</SelectItem>;
            </SelectContent>;
          </Select>;
          {marketData && (;
            <>;
              <div className="flex items-center space-x-4">;
                <span className="text-2xl font-bold">{formatCurrency(marketData.price)}</span>;
                <div className={`flex items-center space-x-1 ${marketData.change >= 0 ? "text-green-400" : "text-red-400"}`}>;
                  {marketData.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  <span>{formatCurrency(Math.abs(marketData.change))}</span>;
                  <span>({marketData.changePercent.toFixed(2)}%)</span>;
                </div>;
              </div>;
              <div className="flex items-center space-x-6 text-sm text-slate-400">;
                <div>Bid: <span className="text-white">{formatCurrency(marketData.bid)}</span></div>;
                <div>Ask: <span className="text-white">{formatCurrency(marketData.ask)}</span></div>;
                <div>Volume: <span className="text-white">{formatVolume(marketData.volume)}</span></div>;
                <div>High: <span className="text-white">{formatCurrency(marketData.high)}</span></div>;
                <div>Low: <span className="text-white">{formatCurrency(marketData.low)}</span></div>;
              </div>;
            </>;
          )}
        </div>;
        <div className="ml-auto flex items-center space-x-4">;
          <div className="flex items-center space-x-2">;
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />;
            <span className="text-sm">Auto Refresh</span>;
          </div>;
          <Select value={timeframe} onValueChange={setTimeframe}>;
            <SelectTrigger className="w-20 bg-slate-700 border-slate-600">;
              <SelectValue placeholder="Select timeframe" />;
            </SelectTrigger>;
            <SelectContent>;
              <SelectItem value="1m">1m</SelectItem>;
              <SelectItem value="5m">5m</SelectItem>;
              <SelectItem value="15m">15m</SelectItem>;
              <SelectItem value="1H">1H</SelectItem>;
              <SelectItem value="1D">1D</SelectItem>;
            </SelectContent>;
          </Select>;
        </div>;
      </div>;
      {/* Main Trading Interface */}
      <div className="flex h-[calc(100vh-4rem)]">;
        {/* Chart Area */}
        <div className="flex-1 flex flex-col">;
          {/* Chart Controls */}
          <div className="h-12 bg-slate-800 border-b border-slate-700 flex items-center px-4">;
            <div className="flex items-center space-x-4">;
              <Button variant={chartType === "candlestick" ? "default" : "ghost"} size="sm" onClick={() => setChartType("candlestick")}>Candlestick</Button>;
              <Button variant={chartType === "line" ? "default" : "ghost"} size="sm" onClick={() => setChartType("line")}>Line</Button>;
              <Button variant={chartType === "bar" ? "default" : "ghost"} size="sm" onClick={() => setChartType("bar")}>Bar</Button>;
              <div className="h-6 w-px bg-slate-600" />;
              <div className="flex items-center space-x-2">;
                <Switch checked={showIndicators} onCheckedChange={setShowIndicators} />;
                <span className="text-sm">Indicators</span>;
              </div>;
            </div>;
          </div>;
          {/* Chart Container */}
          <div className="flex-1 bg-slate-900 p-4">;
            <div ref={chartRef} className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center">;
              <div className="text-center">;
                <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />;
                <h3 className="text-xl font-semibold text-slate-300 mb-2">Professional Trading Chart</h3>;
                <p className="text-slate-400">Advanced TradingView-style chart integration</p>;
                <p className="text-slate-500 text-sm mt-2">Symbol: {symbol} • Timeframe: {timeframe}</p>;
              </div>;
            </div>;
          </div>;
          {/* Technical Indicators Panel */}
          {showIndicators && (;
            <div className="h-32 bg-slate-800 border-t border-slate-700 p-4">;
              <div className="flex items-center justify-between mb-3">;
                <h4 className="font-semibold">Technical Indicators</h4>;
                <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>;
              </div>;
              <div className="grid grid-cols-5 gap-4">;
                {technicalIndicators.map((indicator, index) => (;
                  <div key={index} className="bg-slate-700 rounded-lg p-3">;
                    <div className="text-sm text-slate-400">{indicator.name}</div>;
                    <div className={`font-semibold ${getSignalColor(indicator.signal)}`}>{indicator.value.toFixed(2)}</div>;
                    <div className={`text-xs ${getSignalColor(indicator.signal)}`}>{indicator.signal}</div>;
                  </div>;
                ))}
              </div>;
            </div>;
          )}
        </div>;
        {/* Order Entry Panel */}
        <div className="w-80 bg-slate-800 border-l border-slate-700">;
          <Tabs defaultValue="order" className="h-full">;
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">;
              <TabsTrigger value="order">Order</TabsTrigger>;
              <TabsTrigger value="positions">Positions</TabsTrigger>;
              <TabsTrigger value="orders">Orders</TabsTrigger>;
            </TabsList>;
            <TabsContent value="order" className="p-4 space-y-4">;
              <Card className="bg-slate-700 border-slate-600">;
                <CardHeader className="pb-3"><CardTitle className="text-lg">Place Order</CardTitle></CardHeader>;
                <CardContent className="space-y-4">;
                  {/* Buy/Sell Toggle */}
                  <div className="grid grid-cols-2 gap-2">;
                    <Button variant={orderData.side === "BUY" ? "default" : "outline"} className={orderData.side === "BUY" ? "bg-green-600 hover:bg-green-700" : ""} onClick={() => setOrderData((prev: any) => ({ ...prev, side: "BUY" }))}>BUY</Button>;
                    <Button variant={orderData.side === "SELL" ? "default" : "outline"} className={orderData.side === "SELL" ? "bg-red-600 hover:bg-red-700" : ""} onClick={() => setOrderData((prev: any) => ({ ...prev, side: "SELL" }))}>SELL</Button>;
                  </div>;
                  {/* Order Type */}
                  <div>;
                    <label className="text-sm text-slate-400 mb-2 block">Order Type</label>;
                    <Select value={orderData.orderType} onValueChange={(value: any) => setOrderData((prev: any) => ({ ...prev, orderType: value }))}>;
                      <SelectTrigger className="bg-slate-600 border-slate-500">;
                        <SelectValue placeholder="Select order type" />;
                      </SelectTrigger>;
                      <SelectContent>;
                        <SelectItem value="MARKET">Market</SelectItem>;
                        <SelectItem value="LIMIT">Limit</SelectItem>;
                        <SelectItem value="STOP">Stop</SelectItem>;
                        <SelectItem value="STOP_LIMIT">Stop Limit</SelectItem>;
                      </SelectContent>;
                    </Select>;
                  </div>;
                  {/* Quantity */}
                  <div>;
                    <label className="text-sm text-slate-400 mb-2 block">Quantity</label>;
                    <Input type="number" value={orderData.quantity} onChange={e => setOrderData((prev: any) => ({ ...prev, quantity: Number(e.target.value) }))} className="bg-slate-600 border-slate-500" />;
                  </div>;
                  {/* Price (for limit orders) */}
                  {(orderData.orderType === "LIMIT" || orderData.orderType === "STOP_LIMIT") && (;
                    <div>;
                      <label className="text-sm text-slate-400 mb-2 block">Limit Price</label>;
                      <Input type="number" step="0.01" value={orderData.price || ""} onChange={e => setOrderData((prev: any) => ({ ...prev, price: Number(e.target.value) }))} className="bg-slate-600 border-slate-500" />;
                    </div>;
                  )}
                  {/* Stop Price (for stop orders) */}
                  {(orderData.orderType === "STOP" || orderData.orderType === "STOP_LIMIT") && (;
                    <div>;
                      <label className="text-sm text-slate-400 mb-2 block">Stop Price</label>;
                      <Input type="number" step="0.01" value={orderData.stopPrice || ""} onChange={e => setOrderData((prev: any) => ({ ...prev, stopPrice: Number(e.target.value) }))} className="bg-slate-600 border-slate-500" />;
                    </div>;
                  )}
                  {/* Time in Force */}
                  <div>;
                    <label className="text-sm text-slate-400 mb-2 block">Time in Force</label>;
                    <Select value={orderData.timeInForce} onValueChange={(value: any) => setOrderData((prev: any) => ({ ...prev, timeInForce: value }))}>;
                      <SelectTrigger className="bg-slate-600 border-slate-500">;
                        <SelectValue placeholder="Select time in force" />;
                      </SelectTrigger>;
                      <SelectContent>;
                        <SelectItem value="DAY">Day</SelectItem>;
                        <SelectItem value="GTC">Good Till Canceled</SelectItem>;
                        <SelectItem value="IOC">Immediate or Cancel</SelectItem>;
                        <SelectItem value="FOK">Fill or Kill</SelectItem>;
                      </SelectContent>;
                    </Select>;
                  </div>;
                  {/* Order Summary */}
                  <div className="bg-slate-600 rounded-lg p-3 space-y-2">;
                    <div className="flex justify-between text-sm">;
                      <span className="text-slate-400">Estimated Value:</span>;
                      <span className="text-white font-semibold">{formatCurrency(calculateOrderValue())}</span>;
                    </div>;
                    <div className="flex justify-between text-sm">;
                      <span className="text-slate-400">Commission:</span>;
                      <span className="text-white">$0.00</span>;
                    </div>;
                  </div>;
                  {/* Place Order Button */}
                  <Button onClick={executeOrder} className={`w-full ${orderData.side === "BUY" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}>{orderData.side} {orderData.quantity} {symbol}</Button>;
                </CardContent>;
              </Card>;
              {/* Quick Actions */}
              <Card className="bg-slate-700 border-slate-600">;
                <CardHeader className="pb-3"><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>;
                <CardContent className="space-y-2">;
                  <Button variant="outline" size="sm" className="w-full"><Target className="h-4 w-4 mr-2" />Set Stop Loss</Button>;
                  <Button variant="outline" size="sm" className="w-full"><Shield className="h-4 w-4 mr-2" />Set Take Profit</Button>;
                  <Button variant="outline" size="sm" className="w-full"><Zap className="h-4 w-4 mr-2" />Bracket Order</Button>;
                </CardContent>;
              </Card>;
            </TabsContent>;
            <TabsContent value="positions" className="p-4">;
              <div className="text-center py-8">;
                <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-3" />;
                <p className="text-slate-400">No open positions</p>;
              </div>;
            </TabsContent>;
            <TabsContent value="orders" className="p-4">;
              <div className="text-center py-8">;
                <Activity className="h-12 w-12 text-slate-400 mx-auto mb-3" />;
                <p className="text-slate-400">No pending orders</p>;
              </div>;
            </TabsContent>;
          </Tabs>;
        </div>;
      </div>;
    </div>;
  );
}

export default AdvancedTradingInterface;
      {/* Trading Header */}
      <div className="h-16 bg-slate-800 border-b border-slate-700 flex items-center px-6">;
        <div className="flex items-center space-x-6">;
          <Select value={symbol} onValueChange={onSymbolChange}>;
            <SelectTrigger className="w-32 bg-slate-700 border-slate-600">;
              <SelectValue placeholder="Select symbol" />;
            </SelectTrigger>;
            <SelectContent>;
              <SelectItem value="AAPL">AAPL</SelectItem>;
              <SelectItem value="TSLA">TSLA</SelectItem>;
              <SelectItem value="NVDA">NVDA</SelectItem>;
              <SelectItem value="MSFT">MSFT</SelectItem>;
              <SelectItem value="GOOGL">GOOGL</SelectItem>;
            </SelectContent>;
          </Select>;
          {marketData && (;
            <>;
              <div className="flex items-center space-x-4">;
                <span className="text-2xl font-bold">{formatCurrency(marketData.price)}</span>;
                <div className={`flex items-center space-x-1 ${marketData.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>;
                  {marketData.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  <span>{formatCurrency(Math.abs(marketData.change))}</span>;
                  <span>({marketData.changePercent.toFixed(2)}%)</span>;
                </div>;
              </div>;
              <div className="flex items-center space-x-6 text-sm text-slate-400">;
                <div>Bid: <span className="text-white">{formatCurrency(marketData.bid)}</span></div>;
                <div>Ask: <span className="text-white">{formatCurrency(marketData.ask)}</span></div>;
                <div>Volume: <span className="text-white">{formatVolume(marketData.volume)}</span></div>;
                <div>High: <span className="text-white">{formatCurrency(marketData.high)}</span></div>;
                <div>Low: <span className="text-white">{formatCurrency(marketData.low)}</span></div>;
              </div>;
            </>;
          )}
        </div>;
        <div className="ml-auto flex items-center space-x-4">;
          <div className="flex items-center space-x-2">;
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />;
            <span className="text-sm">Auto Refresh</span>;
          </div>;
          <Select value={timeframe} onValueChange={setTimeframe}>;
            <SelectTrigger className="w-20 bg-slate-700 border-slate-600">;
              <SelectValue placeholder="Select timeframe" />;
            </SelectTrigger>;
            <SelectContent>;
              <SelectItem value="1m">1m</SelectItem>;
              <SelectItem value="5m">5m</SelectItem>;
              <SelectItem value="15m">15m</SelectItem>;
              <SelectItem value="1H">1H</SelectItem>;
              <SelectItem value="1D">1D</SelectItem>;
            </SelectContent>;
          </Select>;
        </div>;
      </div>;
      {/* Main Trading Interface */}
      <div className="flex h-[calc(100vh-4rem)]">;
        {/* Chart Area */}
        <div className="flex-1 flex flex-col">;
          {/* Chart Controls */}
          <div className="h-12 bg-slate-800 border-b border-slate-700 flex items-center px-4">;
            <div className="flex items-center space-x-4">;
              <Button variant={chartType === 'candlestick' ? 'default' : 'ghost'} size="sm" onClick={() => setChartType('candlestick')}>Candlestick</Button>;
              <Button variant={chartType === 'line' ? 'default' : 'ghost'} size="sm" onClick={() => setChartType('line')}>Line</Button>;
              <Button variant={chartType === 'bar' ? 'default' : 'ghost'} size="sm" onClick={() => setChartType('bar')}>Bar</Button>;
              <div className="h-6 w-px bg-slate-600" />;
              <div className="flex items-center space-x-2">;
                <Switch checked={showIndicators} onCheckedChange={setShowIndicators} />;
                <span className="text-sm">Indicators</span>;
              </div>;
            </div>;
          </div>;
          {/* Chart Container */}
          <div className="flex-1 bg-slate-900 p-4">;
            <div ref={chartRef} className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center">;
              <div className="text-center">;
                <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />;
                <h3 className="text-xl font-semibold text-slate-300 mb-2">Professional Trading Chart</h3>;
                <p className="text-slate-400">Advanced TradingView-style chart integration</p>;
                <p className="text-slate-500 text-sm mt-2">Symbol: {symbol} • Timeframe: {timeframe}</p>;
              </div>;
            </div>;
          </div>;
          {/* Technical Indicators Panel */}
          {showIndicators && (;
            <div className="h-32 bg-slate-800 border-t border-slate-700 p-4">;
              <div className="flex items-center justify-between mb-3">;
                <h4 className="font-semibold">Technical Indicators</h4>;
                <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>;
              </div>;
              <div className="grid grid-cols-5 gap-4">;
                {technicalIndicators.map((indicator, index) => (;
                  <div key={index} className="bg-slate-700 rounded-lg p-3">;
                    <div className="text-sm text-slate-400">{indicator.name}</div>;
                    <div className={`font-semibold ${getSignalColor(indicator.signal)}`}>{indicator.value.toFixed(2)}</div>;
                    <div className={`text-xs ${getSignalColor(indicator.signal)}`}>{indicator.signal}</div>;
                  </div>;
                ))}
              </div>;
            </div>;
          )}
        </div>;
        {/* Order Entry Panel */}
        <div className="w-80 bg-slate-800 border-l border-slate-700">;
          <Tabs defaultValue="order" className="h-full">;
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">;
              <TabsTrigger value="order">Order</TabsTrigger>;
              <TabsTrigger value="positions">Positions</TabsTrigger>;
              <TabsTrigger value="orders">Orders</TabsTrigger>;
            </TabsList>;
            <TabsContent value="order" className="p-4 space-y-4">;
              <Card className="bg-slate-700 border-slate-600">;
                <CardHeader className="pb-3"><CardTitle className="text-lg">Place Order</CardTitle></CardHeader>;
                <CardContent className="space-y-4">;
                  {/* Buy/Sell Toggle */}
                  <div className="grid grid-cols-2 gap-2">;
                    <Button variant={orderData.side === 'BUY' ? 'default' : 'outline'} className={orderData.side === 'BUY' ? 'bg-green-600 hover:bg-green-700' : ''} onClick={() => setOrderData(prev => ({ ...prev, side: 'BUY' }))}>BUY</Button>;
                    <Button variant={orderData.side === 'SELL' ? 'default' : 'outline'} className={orderData.side === 'SELL' ? 'bg-red-600 hover:bg-red-700' : ''} onClick={() => setOrderData(prev => ({ ...prev, side: 'SELL' }))}>SELL</Button>;
                  </div>;
                  {/* Order Type */}
                  <div>;
                    <label className="text-sm text-slate-400 mb-2 block">Order Type</label>;
                    <Select value={orderData.orderType} onValueChange={(value: any) => setOrderData(prev => ({ ...prev, orderType: value }))}>;
                      <SelectTrigger className="bg-slate-600 border-slate-500">;
                        <SelectValue placeholder="Select order type" />;
                      </SelectTrigger>;
                      <SelectContent>;
                        <SelectItem value="MARKET">Market</SelectItem>;
                        <SelectItem value="LIMIT">Limit</SelectItem>;
                        <SelectItem value="STOP">Stop</SelectItem>;
                        <SelectItem value="STOP_LIMIT">Stop Limit</SelectItem>;
                      </SelectContent>;
                    </Select>;
                  </div>;
                  {/* Quantity */}
                  <div>;
                    <label className="text-sm text-slate-400 mb-2 block">Quantity</label>;
                    <Input type="number" value={orderData.quantity} onChange={e => setOrderData(prev => ({ ...prev, quantity: Number(e.target.value) }))} className="bg-slate-600 border-slate-500" />;
                  </div>;
                  {/* Price (for limit orders) */}
                  {(orderData.orderType === 'LIMIT' || orderData.orderType === 'STOP_LIMIT') && (;
                    <div>;
                      <label className="text-sm text-slate-400 mb-2 block">Limit Price</label>;
                      <Input type="number" step="0.01" value={orderData.price || ''} onChange={e => setOrderData(prev => ({ ...prev, price: Number(e.target.value) }))} className="bg-slate-600 border-slate-500" />;
                    </div>;
                  )}
                  {/* Stop Price (for stop orders) */}
                  {(orderData.orderType === 'STOP' || orderData.orderType === 'STOP_LIMIT') && (;
                    <div>;
                      <label className="text-sm text-slate-400 mb-2 block">Stop Price</label>;
                      <Input type="number" step="0.01" value={orderData.stopPrice || ''} onChange={e => setOrderData(prev => ({ ...prev, stopPrice: Number(e.target.value) }))} className="bg-slate-600 border-slate-500" />;
                    </div>;
                  )}
                  {/* Time in Force */}
                  <div>;
                    <label className="text-sm text-slate-400 mb-2 block">Time in Force</label>;
                    <Select value={orderData.timeInForce} onValueChange={(value: any) => setOrderData(prev => ({ ...prev, timeInForce: value }))}>;
                      <SelectTrigger className="bg-slate-600 border-slate-500">;
                        <SelectValue placeholder="Select time in force" />;
                      </SelectTrigger>;
                      <SelectContent>;
                        <SelectItem value="DAY">Day</SelectItem>;
                        <SelectItem value="GTC">Good Till Canceled</SelectItem>;
                        <SelectItem value="IOC">Immediate or Cancel</SelectItem>;
                        <SelectItem value="FOK">Fill or Kill</SelectItem>;
                      </SelectContent>;
                    </Select>;
                  </div>;
                  {/* Order Summary */}
                  <div className="bg-slate-600 rounded-lg p-3 space-y-2">;
                    <div className="flex justify-between text-sm">;
                      <span className="text-slate-400">Estimated Value:</span>;
                      <span className="text-white font-semibold">{formatCurrency(calculateOrderValue())}</span>;
                    </div>;
                    <div className="flex justify-between text-sm">;
                      <span className="text-slate-400">Commission:</span>;
                      <span className="text-white">$0.00</span>;
                    </div>;
                  </div>;
                  {/* Place Order Button */}
                  <Button onClick={executeOrder} className={`w-full ${orderData.side === 'BUY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>{orderData.side} {orderData.quantity} {symbol}</Button>;
                </CardContent>;
              </Card>;
              {/* Quick Actions */}
              <Card className="bg-slate-700 border-slate-600">;
                <CardHeader className="pb-3"><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>;
                <CardContent className="space-y-2">;
                  <Button variant="outline" size="sm" className="w-full"><Target className="h-4 w-4 mr-2" />Set Stop Loss</Button>;
                  <Button variant="outline" size="sm" className="w-full"><Shield className="h-4 w-4 mr-2" />Set Take Profit</Button>;
                  <Button variant="outline" size="sm" className="w-full"><Zap className="h-4 w-4 mr-2" />Bracket Order</Button>;
                </CardContent>;
              </Card>;
            </TabsContent>;
            <TabsContent value="positions" className="p-4">;
              <div className="text-center py-8">;
                <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-3" />;
                <p className="text-slate-400">No open positions</p>;
              </div>;
            </TabsContent>;
            <TabsContent value="orders" className="p-4">;
              <div className="text-center py-8">;
                <Activity className="h-12 w-12 text-slate-400 mx-auto mb-3" />;
                <p className="text-slate-400">No pending orders</p>;
              </div>;
            </TabsContent>;
          </Tabs>;
        </div>;
      </div>;
    </div>;
  );
}

export default AdvancedTradingInterface;
              <SelectValue placeholder="Select symbol" />;
            </SelectTrigger>;
            <SelectContent>;
              <SelectItem value="AAPL">AAPL</SelectItem>;
              <SelectItem value="TSLA">TSLA</SelectItem>;
              <SelectItem value="NVDA">NVDA</SelectItem>;
              <SelectItem value="MSFT">MSFT</SelectItem>;
              <SelectItem value="GOOGL">GOOGL</SelectItem>;
            </SelectContent>;
          </Select>;
          {marketData && (;
            <>;
              <div className="flex items-center space-x-4">;
                <span className="text-2xl font-bold">{formatCurrency(marketData.price)}</span>;
                <div className={`flex items-center space-x-1 ${marketData.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>;
                  {marketData.change >= 0 ? (;
                    <span className="h-4 w-4">↑</span>;
                  ) : (;
                    <span className="h-4 w-4">↓</span>;
                  )}
                  <span>{formatCurrency(Math.abs(marketData.change))}</span>;
                  <span>({marketData.changePercent.toFixed(2)}%)</span>;
                </div>;
              </div>;
              <div className="flex items-center space-x-6 text-sm text-slate-400">;
                <div>;
                  Bid: <span className="text-white">{formatCurrency(marketData.bid)}</span>;
                </div>;
                <div>;
                  Ask: <span className="text-white">{formatCurrency(marketData.ask)}</span>;
                </div>;
                <div>;
                  Volume: <span className="text-white">{formatVolume(marketData.volume)}</span>;
                </div>;
                <div>;
                  High: <span className="text-white">{formatCurrency(marketData.high)}</span>;
                </div>;
                <div>;
                  Low: <span className="text-white">{formatCurrency(marketData.low)}</span>;
                </div>;
              </div>;
            </>;
          )}
        </div>;
        <div className="ml-auto flex items-center space-x-4">;
          <div className="flex items-center space-x-2">;
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />;
            <span className="text-sm">Auto Refresh</span>;
          </div>;
          <Select value={timeframe} onValueChange={setTimeframe}>;
            <SelectTrigger className="w-20 bg-slate-700 border-slate-600">;
              <SelectValue placeholder="Select timeframe" />;
            </SelectTrigger>;
            <SelectContent>;
              <SelectItem value="1m">1m</SelectItem>;
              <SelectItem value="5m">5m</SelectItem>;
              <SelectItem value="15m">15m</SelectItem>;
              <SelectItem value="1H">1H</SelectItem>;
              <SelectItem value="1D">1D</SelectItem>;
            </SelectContent>;
          </Select>;
        </div>;
      </div>;
      {/* Main Trading Interface */}
      <div className="flex h-[calc(100vh-4rem)]">;
        {/* Chart Area */}
        <div className="flex-1 flex flex-col">;
          {/* Chart Controls */}
          <div className="h-12 bg-slate-800 border-b border-slate-700 flex items-center px-4">;
            <div className="flex items-center space-x-4">;
              <Button;
                variant={chartType === 'candlestick' ? 'default' : 'ghost'}
                size="sm";
                onClick={() => setChartType('candlestick')}
              >;
                Candlestick;
              </Button>;
              <Button;
                variant={chartType === 'line' ? 'default' : 'ghost'}
                size="sm";
                onClick={() => setChartType('line')}
              >;
                Line;
              </Button>;
              <Button;
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                size="sm";
                onClick={() => setChartType('bar')}
              >;
                Bar;
              </Button>;
              <div className="h-6 w-px bg-slate-600" />;
              <div className="flex items-center space-x-2">;
                <Switch checked={showIndicators} onCheckedChange={setShowIndicators} />;
                <span className="text-sm">Indicators</span>;
              </div>;
            </div>;
          </div>;
          {/* Chart Container */}
          <div className="flex-1 bg-slate-900 p-4">;
            <div;
              ref={chartRef}
              className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center";
            >;
              <div className="text-center">;
                <span className="h-16 w-16 text-slate-400 mx-auto mb-4">📊</span>;
                <h3 className="text-xl font-semibold text-slate-300 mb-2">;
                  Professional Trading Chart;
                </h3>;
                <p className="text-slate-400">Advanced TradingView-style chart integration</p>;
                <p className="text-slate-500 text-sm mt-2">;
                  Symbol: {symbol} • Timeframe: {timeframe}
                </p>;
              </div>;
            </div>;
          </div>;
          {/* Technical Indicators Panel */}
          {showIndicators && (;
            <div className="h-32 bg-slate-800 border-t border-slate-700 p-4">;
              <div className="flex items-center justify-between mb-3">;
                <h4 className="font-semibold">Technical Indicators</h4>;
                <Button variant="ghost" size="sm">;
                  <span className="h-4 w-4">👁️</span>;
                </Button>;
              </div>;
              <div className="grid grid-cols-5 gap-4">;
                {technicalIndicators.map((indicator, index) => (;
                  <div key={index} className="bg-slate-700 rounded-lg p-3">;
                    <div className="text-sm text-slate-400">{indicator.name}</div>;
                    <div className={`font-semibold ${getSignalColor(indicator.signal)}`}>{indicator.value.toFixed(2)}</div>;
                    <div className={`text-xs ${getSignalColor(indicator.signal)}`}>{indicator.signal}</div>;
                  </div>;
                ))}
              </div>;
            </div>;
          )}
        </div>;
        {/* Order Entry Panel */}
        <div className="w-80 bg-slate-800 border-l border-slate-700">;
          <Tabs defaultValue="order" className="h-full">;
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">;
              <TabsTrigger value="order">Order</TabsTrigger>;
              <TabsTrigger value="positions">Positions</TabsTrigger>;
              <TabsTrigger value="orders">Orders</TabsTrigger>;
            </TabsList>;
            <TabsContent value="order" className="p-4 space-y-4">;
              <Card className="bg-slate-700 border-slate-600">;
                <CardHeader className="pb-3">;
                  <CardTitle className="text-lg">Place Order</CardTitle>;
                </CardHeader>;
                <CardContent className="space-y-4">;
                  {/* Buy/Sell Toggle */}
                  <div className="grid grid-cols-2 gap-2">;
                    <Button;
                      variant={orderData.side === 'BUY' ? 'default' : 'outline'}
                      className={orderData.side === 'BUY' ? 'bg-green-600 hover:bg-green-700' : ''}
                      onClick={() => setOrderData(prev => ({ ...prev, side: 'BUY' }))}
                    >;
                      BUY;
                    </Button>;
                    <Button;
                      variant={orderData.side === 'SELL' ? 'default' : 'outline'}
                      className={orderData.side === 'SELL' ? 'bg-red-600 hover:bg-red-700' : ''}
                      onClick={() => setOrderData(prev => ({ ...prev, side: 'SELL' }))}
                    >;
                      SELL;
                    </Button>;
                  </div>;
                  {/* Order Type */}
                  <div>;
                    <label className="text-sm text-slate-400 mb-2 block">Order Type</label>;
                    <Select;
                      value={orderData.orderType}
                      onValueChange={(value: any) =>;
                        setOrderData(prev => ({ ...prev, orderType: value }));
                      }
                    >;
                      <SelectTrigger className="bg-slate-600 border-slate-500">;
                        <SelectValue placeholder="Select order type" />;
                      </SelectTrigger>;
                      <SelectContent>;
                        <SelectItem value="MARKET">Market</SelectItem>;
                        <SelectItem value="LIMIT">Limit</SelectItem>;
                        <SelectItem value="STOP">Stop</SelectItem>;
                        <SelectItem value="STOP_LIMIT">Stop Limit</SelectItem>;
                      </SelectContent>;
                    </Select>;
                  </div>;
                  {/* Quantity */}
                  <div>;
                    <label className="text-sm text-slate-400 mb-2 block">Quantity</label>;
                    <Input;
                      type="number";
                      value={orderData.quantity}
                      onChange={e => setOrderData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                      className="bg-slate-600 border-slate-500";
                    />;
                  </div>;
                  {/* Price (for limit orders) */}
                  {(orderData.orderType === 'LIMIT' || orderData.orderType === 'STOP_LIMIT') && (;
                    <div>;
                      <label className="text-sm text-slate-400 mb-2 block">Limit Price</label>;
                      <Input;
                        type="number";
                        step="0.01";
                        value={orderData.price || ''}
                        onChange={e => setOrderData(prev => ({ ...prev, price: Number(e.target.value) }))}
                        className="bg-slate-600 border-slate-500";
                      />;
                    </div>;
                  )}

                  {/* Stop Price (for stop orders) */}
                  {(orderData.orderType === 'STOP' || orderData.orderType === 'STOP_LIMIT') && (;
                    <div>;
                      <label className="text-sm text-slate-400 mb-2 block">Stop Price</label>;
                      <Input;
                        type="number";
                        step="0.01";
                        value={orderData.stopPrice || ''}
                        onChange={e => setOrderData(prev => ({ ...prev, stopPrice: Number(e.target.value) }))}
                        className="bg-slate-600 border-slate-500";
                      />;
                    </div>;
                  )}

                  {/* Time in Force */}
                  <div>;
                    <label className="text-sm text-slate-400 mb-2 block">Time in Force</label>;
                    <Select;
                      value={orderData.timeInForce}
                      onValueChange={(value: any) => setOrderData(prev => ({ ...prev, timeInForce: value }))}
                    >;
                      <SelectTrigger className="bg-slate-600 border-slate-500">;
                        <SelectValue placeholder="Select time in force" />;
                      </SelectTrigger>;
                      <SelectContent>;
                        <SelectItem value="DAY">Day</SelectItem>;
                        <SelectItem value="GTC">Good Till Canceled</SelectItem>;
                        <SelectItem value="IOC">Immediate or Cancel</SelectItem>;
                        <SelectItem value="FOK">Fill or Kill</SelectItem>;
                      </SelectContent>;
                    </Select>;
                  </div>;
                  {/* Order Summary */}
                  <div className="bg-slate-600 rounded-lg p-3 space-y-2">;
                    <div className="flex justify-between text-sm">;
                      <span className="text-slate-400">Estimated Value:</span>;
                      <span className="text-white font-semibold">;
                        {formatCurrency(calculateOrderValue())}
                      </span>;
                    </div>;
                    <div className="flex justify-between text-sm">;
                      <span className="text-slate-400">Commission:</span>;
                      <span className="text-white">$0.00</span>;
                    </div>;
                  </div>;
                  {/* Place Order Button */}
                  <Button;
                    onClick={executeOrder}
                    className={`w-full ${orderData.side === 'BUY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                  >;
                    {orderData.side} {orderData.quantity} {symbol}
                  </Button>;
                </CardContent>;
              </Card>;
              {/* Quick Actions */}
              <Card className="bg-slate-700 border-slate-600">;
                <CardHeader className="pb-3"><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>;
                <CardContent className="space-y-2">;
                  <Button variant="outline" size="sm" className="w-full"><span className="h-4 w-4 mr-2">🎯</span>Set Stop Loss</Button>;
                  <Button variant="outline" size="sm" className="w-full"><span className="h-4 w-4 mr-2">🛡️</span>Set Take Profit</Button>;
                  <Button variant="outline" size="sm" className="w-full"><span className="h-4 w-4 mr-2">⚡</span>Bracket Order</Button>;
                </CardContent>;
              </Card>;
            </TabsContent>;
            <TabsContent value="positions" className="p-4">;
              <div className="text-center py-8">;
                <span className="h-12 w-12 text-slate-400 mx-auto mb-3">🥧</span>;
                <p className="text-slate-400">No open positions</p>;
              </div>;
            </TabsContent>;
            <TabsContent value="orders" className="p-4">;
              <div className="text-center py-8">;
                <span className="h-12 w-12 text-slate-400 mx-auto mb-3">📈</span>;
                <p className="text-slate-400">No pending orders</p>;
              </div>;
            </TabsContent>;
          </Tabs>;
        </div>;
      </div>;
    </div>;
  );
};

export default AdvancedTradingInterface;

          <Button variant="outline" size="sm">;
            <Settings className="h-4 w-4" />;
          </Button>;
        </div>;
      </div>;
      {/* Main Trading Interface */}
      <div className="flex h-[calc(100vh-4rem)]">;
        {/* Chart Area */}
        <div className="flex-1 flex flex-col">;
          {/* Chart Controls */}
          <div className="h-12 bg-slate-800 border-b border-slate-700 flex items-center px-4">;
            <div className="flex items-center space-x-4">;
              <Button;
                variant={chartType === 'candlestick' ? 'default' : 'ghost'}
                size="sm";
                onClick={() => setChartType('candlestick')}
              >;
                Candlestick;
              </Button>;
              <Button;
                variant={chartType === 'line' ? 'default' : 'ghost'}
                size="sm";
                onClick={() => setChartType('line')}
              >;
                Line;
              </Button>;
              <Button;
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                size="sm";
                onClick={() => setChartType('bar')}
              >;
                Bar;
              </Button>;
              <div className="h-6 w-px bg-slate-600" />;
              <div className="flex items-center space-x-2">;
                <Switch checked={showIndicators} onCheckedChange={setShowIndicators} />;
                <span className="text-sm">Indicators</span>;
              </div>;
            </div>;
          </div>;
          {/* Chart Container */}
          <div className="flex-1 bg-slate-900 p-4">;
            <div;
              ref={chartRef}
              className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center";
            >;
              <div className="text-center">;
                <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />;
                <h3 className="text-xl font-semibold text-slate-300 mb-2">;
                  Professional Trading Chart;
                </h3>;
                <p className="text-slate-400">Advanced TradingView-style chart integration</p>;
                <p className="text-slate-500 text-sm mt-2">;
                  Symbol: {symbol} • Timeframe: {timeframe}
                </p>;
              </div>;
            </div>;
          </div>;
          {/* Technical Indicators Panel */}
          {showIndicators && (;
            <div className="h-32 bg-slate-800 border-t border-slate-700 p-4">;
              <div className="flex items-center justify-between mb-3">;
                <h4 className="font-semibold">Technical Indicators</h4>;
                <Button variant="ghost" size="sm">;
                  <Eye className="h-4 w-4" />;
                </Button>;
              </div>;
              <div className="grid grid-cols-5 gap-4">;
                {technicalIndicators.map((indicator, index) => (;
                  <div key={index} className="bg-slate-700 rounded-lg p-3">;
                    <div className="text-sm text-slate-400">{indicator.name}</div>;
                    <div className={`font-semibold ${getSignalColor(indicator.signal)}`}>{indicator.value.toFixed(2)}</div>;
                    <div className={`text-xs ${getSignalColor(indicator.signal)}`}>{indicator.signal}</div>;
                  </div>;
                ))}
              </div>;
            </div>;
          )}
        </div>;
        {/* Order Entry Panel */}
        <div className="w-80 bg-slate-800 border-l border-slate-700">;
          <Tabs defaultValue="order" className="h-full">;
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">;
              <TabsTrigger value="order">Order</TabsTrigger>;
              <TabsTrigger value="positions">Positions</TabsTrigger>;
              <TabsTrigger value="orders">Orders</TabsTrigger>;
            </TabsList>;
            <TabsContent value="order" className="p-4 space-y-4">;
              <Card className="bg-slate-700 border-slate-600">;
                <CardHeader className="pb-3">;
                  <CardTitle className="text-lg">Place Order</CardTitle>;
                </CardHeader>;
                <CardContent className="space-y-4">;
                  {/* Buy/Sell Toggle */}
                  <div className="grid grid-cols-2 gap-2">;
                    <Button;
                      variant={orderData.side === 'BUY' ? 'default' : 'outline'}
                      className={orderData.side === 'BUY' ? 'bg-green-600 hover:bg-green-700' : ''}
                      onClick={() => setOrderData(prev => ({ ...prev, side: 'BUY' }))}
                    >;
                      BUY;
                    </Button>;
                    <Button;
                      variant={orderData.side === 'SELL' ? 'default' : 'outline'}
                      className={orderData.side === 'SELL' ? 'bg-red-600 hover:bg-red-700' : ''}
                      onClick={() => setOrderData(prev => ({ ...prev, side: 'SELL' }))}
                    >;
                      SELL;
                    </Button>;
                  </div>;
                  {/* Order Type */}
                  <div>;
                    <label className="text-sm text-slate-400 mb-2 block">Order Type</label>;
                    <Select;
                      value={orderData.orderType}
                      onValueChange={(value: any) => setOrderData(prev => ({ ...prev, orderType: value }))}
                    >;
                      <SelectTrigger className="bg-slate-600 border-slate-500">;
                        <SelectValue />;
                      </SelectTrigger>;
                      <SelectContent>;
                        <SelectItem value="MARKET">Market</SelectItem>;
                        <SelectItem value="LIMIT">Limit</SelectItem>;
                        <SelectItem value="STOP">Stop</SelectItem>;
                        <SelectItem value="STOP_LIMIT">Stop Limit</SelectItem>;
                      </SelectContent>;
                    </Select>;
                  </div>;
                  {/* Quantity */}
                  <div>;
                    <label className="text-sm text-slate-400 mb-2 block">Quantity</label>;
                    <Input;
                      type="number";
                      value={orderData.quantity}
                      onChange={e =>;
                        setOrderData(prev => ({ ...prev, quantity: Number(e.target.value) }));
                      }
                      className="bg-slate-600 border-slate-500";
                    />;
                  </div>;
                  {/* Price (for limit orders) */}
                  {(orderData.orderType === 'LIMIT' || orderData.orderType === 'STOP_LIMIT') && (;
                    <div>;
                      <label className="text-sm text-slate-400 mb-2 block">Limit Price</label>;
                      <Input;
                        type="number";
                        step="0.01";
                        value={orderData.price || ''}
                        onChange={e =>;
                          setOrderData(prev => ({ ...prev, price: Number(e.target.value) }));
                        }
                        className="bg-slate-600 border-slate-500";
                      />;
                    </div>;
                  )}

                  {/* Stop Price (for stop orders) */}
                  {(orderData.orderType === 'STOP' || orderData.orderType === 'STOP_LIMIT') && (;
                    <div>;
                      <label className="text-sm text-slate-400 mb-2 block">Stop Price</label>;
                      <Input;
                        type="number";
                        step="0.01";
                        value={orderData.stopPrice || ''}
                        onChange={e =>;
                          setOrderData(prev => ({ ...prev, stopPrice: Number(e.target.value) }));
                        }
                        className="bg-slate-600 border-slate-500";
                      />;
                    </div>;
                  )}

                  {/* Time in Force */}
                  <div>;
                    <label className="text-sm text-slate-400 mb-2 block">Time in Force</label>;
                    <Select;
                      value={orderData.timeInForce}
                      onValueChange={(value: any) =>;
                        setOrderData(prev => ({ ...prev, timeInForce: value }));
                      }
                    >;
                      <SelectTrigger className="bg-slate-600 border-slate-500">;
                        <SelectValue />;
                      </SelectTrigger>;
                      <SelectContent>;
                        <SelectItem value="DAY">Day</SelectItem>;
                        <SelectItem value="GTC">Good Till Canceled</SelectItem>;
                        <SelectItem value="IOC">Immediate or Cancel</SelectItem>;
                        <SelectItem value="FOK">Fill or Kill</SelectItem>;
                      </SelectContent>;
                    </Select>;
                  </div>;
                  {/* Order Summary */}
                  <div className="bg-slate-600 rounded-lg p-3 space-y-2">;
                    <div className="flex justify-between text-sm">;
                      <span className="text-slate-400">Estimated Value:</span>;
                      <span className="text-white font-semibold">;
                        {formatCurrency(calculateOrderValue())}
                      </span>;
                    </div>;
                    <div className="flex justify-between text-sm">;
                      <span className="text-slate-400">Commission:</span>;
                      <span className="text-white">$0.00</span>;
                    </div>;
                  </div>;
                  {/* Place Order Button */}
                  <Button;
                    onClick={executeOrder}
                    className={`w-full ${orderData.side === 'BUY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                  >;
                    {orderData.side} {orderData.quantity} {symbol}
                  </Button>;
                </CardContent>;
              </Card>;
              {/* Quick Actions */}
              <Card className="bg-slate-700 border-slate-600">;
                <CardHeader className="pb-3">;
                  <CardTitle className="text-sm">Quick Actions</CardTitle>;
                </CardHeader>;
                <CardContent className="space-y-2">;
                  <Button variant="outline" size="sm" className="w-full">;
                    <Target className="h-4 w-4 mr-2" />;
                    Set Stop Loss;
                  </Button>;
                  <Button variant="outline" size="sm" className="w-full">;
                    <Shield className="h-4 w-4 mr-2" />;
                    Set Take Profit;
                  </Button>;
                  <Button variant="outline" size="sm" className="w-full">;
                    <Zap className="h-4 w-4 mr-2" />;
                    Bracket Order;
                  </Button>;
                </CardContent>;
              </Card>;
            </TabsContent>;
            <TabsContent value="positions" className="p-4">;
              <div className="text-center py-8">;
                <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-3" />;
                <p className="text-slate-400">No open positions</p>;
              </div>;
            </TabsContent>;
            <TabsContent value="orders" className="p-4">;
              <div className="text-center py-8">;
                <Activity className="h-12 w-12 text-slate-400 mx-auto mb-3" />;
                <p className="text-slate-400">No pending orders</p>;
              </div>;
            </TabsContent>;
          </Tabs>;
        </div>;
      </div>;
    </div>;
  );
}


export default calculateOrderValue;