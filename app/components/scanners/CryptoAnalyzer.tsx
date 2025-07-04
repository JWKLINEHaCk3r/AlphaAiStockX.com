'use client';

import { useState, useEffect } from 'react';
import { Card, CardCoCard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bitcoin,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  Activity,
  BarChart3,
  DollarSign,
} from 'lucide-react';

// Type definitions for crypto analyzer
interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  aiScore: number;
  sentiment: string;
  fearGreedIndex: number;
  socialVolume: number;
  whaleActivity: string;
}

interface DefiMetric {
  name: string;
  tvl: number;
  apy: number;
  volume24h: number;
  change24h: number;
  users24h: number;
  riskScore: number;
}

interface NftData {
  name: string;
  floorPrice: number;
  volume24h: number;
  change24h: number;
  sales24h: number;
  holders: number;
}

interface OnChainMetrics {
  [key: string]: unknown;
}

export default function CryptoAnalyzer() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [defiMetrics, setDefiMetrics] = useState<DefiMetric[]>([]);
  const [nftData, setNftData] = useState<NftData[]>([]);
  const [onChainMetrics, setOnChainMetrics] = useState<OnChainMetrics>({});

  useEffect(() => {
    generateCryptoData();
    generateDefiMetrics();
    generateNftData();
    generateOnChainMetrics();

    const interval = setInterval(() => {
      generateCryptoData();
      generateOnChainMetrics();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateCryptoData = () => {
    const cryptos = [
      { symbol: 'BTC', name: 'Bitcoin', price: 45000 + Math.random() * 10000 },
      { symbol: 'ETH', name: 'Ethereum', price: 2500 + Math.random() * 1000 },
      { symbol: 'SOL', name: 'Solana', price: 80 + Math.random() * 40 },
      { symbol: 'ADA', name: 'Cardano', price: 0.4 + Math.random() * 0.3 },
      { symbol: 'MATIC', name: 'Polygon', price: 0.8 + Math.random() * 0.4 },
      { symbol: 'AVAX', name: 'Avalanche', price: 25 + Math.random() * 15 },
      { symbol: 'DOT', name: 'Polkadot', price: 6 + Math.random() * 4 },
      { symbol: 'LINK', name: 'Chainlink', price: 12 + Math.random() * 8 },
    ];

    const data = cryptos.map(crypto => ({
      ...crypto,
      change24h: (Math.random() - 0.5) * 20,
      volume24h: Math.random() * 10 + 1,
      marketCap: crypto.price * (Math.random() * 500 + 100),
      aiScore: 60 + Math.random() * 40,
      sentiment: Math.random() > 0.6 ? 'bullish' : Math.random() > 0.3 ? 'bearish' : 'neutral',
      fearGreedIndex: Math.floor(Math.random() * 100),
      socialVolume: Math.floor(Math.random() * 10000),
      whaleActivity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
    }));

    setCryptoData(data);
  };

  const generateDefiMetrics = () => {
    const protocols = [
      { name: 'Uniswap', tvl: 4.2, apy: 12.5, volume24h: 1.8 },
      { name: 'Aave', tvl: 8.9, apy: 8.3, volume24h: 0.9 },
      { name: 'Compound', tvl: 3.1, apy: 6.7, volume24h: 0.4 },
      { name: 'MakerDAO', tvl: 6.8, apy: 4.2, volume24h: 0.3 },
      { name: 'Curve', tvl: 2.9, apy: 15.8, volume24h: 1.2 },
    ];

    setDefiMetrics(
      protocols.map(protocol => ({
        ...protocol,
        change24h: (Math.random() - 0.5) * 10,
        users24h: Math.floor(Math.random() * 50000) + 10000,
        riskScore: Math.floor(Math.random() * 100),
      }))
    );
  };

  const generateNftData = () => {
    const collections = [
      { name: 'Bored Apes', floorPrice: 15.2, volume24h: 234.5 },
      { name: 'CryptoPunks', floorPrice: 45.8, volume24h: 189.3 },
      { name: 'Azuki', floorPrice: 8.9, volume24h: 156.7 },
      { name: 'Moonbirds', floorPrice: 6.4, volume24h: 98.2 },
    ];

    setNftData(
      collections.map(collection => ({
        ...collection,
        change24h: (Math.random() - 0.5) * 30,
        sales24h: Math.floor(Math.random() * 500) + 50,
        holders: Math.floor(Math.random() * 10000) + 1000,
      }))
    );
  };

  const generateOnChainMetrics = () => {
    setOnChainMetrics({
      btcHashRate: 350 + Math.random() * 50,
      ethGasPrice: 20 + Math.random() * 30,
      totalValueLocked: 180 + Math.random() * 20,
      activeAddresses: 850000 + Math.random() * 150000,
      exchangeInflows: (Math.random() - 0.5) * 1000,
      exchangeOutflows: (Math.random() - 0.5) * 1000,
    });
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'text-emerald-400';
      case 'bearish':
        return 'text-red-400';
      default:
        return 'text-amber-400';
    }
  };

  const getWhaleActivityColor = (activity: string) => {
    switch (activity) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-amber-400';
      default:
        return 'text-emerald-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* On-Chain Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-stone-900/40 border-orange-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Bitcoin className="h-6 w-6 text-orange-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-stone-100">
              {onChainMetrics.btcHashRate?.toFixed(0)} EH/s
            </p>
            <p className="text-xs text-stone-400">BTC Hash Rate</p>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/40 border-blue-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-stone-100">
              {onChainMetrics.ethGasPrice?.toFixed(0)} gwei
            </p>
            <p className="text-xs text-stone-400">ETH Gas Price</p>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-stone-100">
              ${onChainMetrics.totalValueLocked?.toFixed(0)}B
            </p>
            <p className="text-xs text-stone-400">Total TVL</p>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/40 border-purple-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-stone-100">
              {(onChainMetrics.activeAddresses / 1000)?.toFixed(0)}K
            </p>
            <p className="text-xs text-stone-400">Active Addresses</p>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/40 border-red-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <TrendingDown className="h-6 w-6 text-red-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-stone-100">
              {onChainMetrics.exchangeInflows?.toFixed(0)}
            </p>
            <p className="text-xs text-stone-400">Exchange Inflows</p>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/40 border-green-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-stone-100">
              {onChainMetrics.exchangeOutflows?.toFixed(0)}
            </p>
            <p className="text-xs text-stone-400">Exchange Outflows</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="crypto" className="space-y-6">
        <TabsList className="bg-stone-900/40 border-emerald-500/30">
          <TabsTrigger value="crypto" className="data-[state=active]:bg-emerald-500/20">
            <Bitcoin className="h-4 w-4 mr-2" />
            Crypto Analysis
          </TabsTrigger>
          <TabsTrigger value="defi" className="data-[state=active]:bg-emerald-500/20">
            <Target className="h-4 w-4 mr-2" />
            DeFi Protocols
          </TabsTrigger>
          <TabsTrigger value="nft" className="data-[state=active]:bg-emerald-500/20">
            <BarChart3 className="h-4 w-4 mr-2" />
            NFT Markets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crypto">
          <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-stone-100 flex items-center">
                <Bitcoin className="h-6 w-6 mr-2 text-orange-400" />
                Cryptocurrency Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cryptoData.map((crypto, index) => (
                  <div
                    key={index}
                    className="p-4 bg-stone-800/30 rounded-lg border border-stone-600/30 hover:border-stone-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-stone-100 font-bold">{crypto.symbol}</span>
                            <span className="text-stone-400 text-sm">{crypto.name}</span>
                            <Badge className={getSentimentColor(crypto.sentiment)}>
                              {crypto.sentiment}
                            </Badge>
                          </div>
                          <p className="text-sm text-stone-400">
                            MCap: ${(crypto.marketCap / 1000).toFixed(1)}B
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-100 font-semibold">${crypto.price.toFixed(2)}</p>
                          <p
                            className={`text-sm ${crypto.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
                          >
                            {crypto.change24h >= 0 ? '+' : ''}
                            {crypto.change24h.toFixed(2)}%
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">Volume 24h</p>
                          <p className="text-stone-100 font-semibold">
                            ${crypto.volume24h.toFixed(1)}B
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">AI Score</p>
                          <p className="text-emerald-400 font-semibold">
                            {crypto.aiScore.toFixed(0)}
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">Fear & Greed</p>
                          <p
                            className={`font-semibold ${
                              crypto.fearGreedIndex > 70
                                ? 'text-red-400'
                                : crypto.fearGreedIndex > 30
                                  ? 'text-amber-400'
                                  : 'text-emerald-400'
                            }`}
                          >
                            {crypto.fearGreedIndex}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge className={getWhaleActivityColor(crypto.whaleActivity)}>
                          {crypto.whaleActivity} whale activity
                        </Badge>
                        <p className="text-xs text-stone-400 mt-1">
                          Social: {(crypto.socialVolume / 1000).toFixed(1)}K mentions
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="defi">
          <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-stone-100 flex items-center">
                <Target className="h-6 w-6 mr-2 text-emerald-400" />
                DeFi Protocol Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {defiMetrics.map((protocol, index) => (
                  <div
                    key={index}
                    className="p-4 bg-stone-800/30 rounded-lg border border-stone-600/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="text-stone-100 font-bold">{protocol.name}</span>
                          <p className="text-sm text-stone-400">
                            Risk Score: {protocol.riskScore}/100
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">TVL</p>
                          <p className="text-stone-100 font-semibold">
                            ${protocol.tvl.toFixed(1)}B
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">APY</p>
                          <p className="text-emerald-400 font-semibold">
                            {protocol.apy.toFixed(1)}%
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">Volume 24h</p>
                          <p className="text-stone-100 font-semibold">
                            ${protocol.volume24h.toFixed(1)}B
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">Users 24h</p>
                          <p className="text-stone-100 font-semibold">
                            {(protocol.users24h / 1000).toFixed(1)}K
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-sm font-medium ${protocol.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
                        >
                          {protocol.change24h >= 0 ? '+' : ''}
                          {protocol.change24h.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nft">
          <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-stone-100 flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-purple-400" />
                NFT Market Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nftData.map((collection, index) => (
                  <div
                    key={index}
                    className="p-4 bg-stone-800/30 rounded-lg border border-stone-600/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="text-stone-100 font-bold">{collection.name}</span>
                          <p className="text-sm text-stone-400">
                            {collection.holders.toLocaleString()} holders
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">Floor Price</p>
                          <p className="text-stone-100 font-semibold">
                            {collection.floorPrice} ETH
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">Volume 24h</p>
                          <p className="text-stone-100 font-semibold">{collection.volume24h} ETH</p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">Sales 24h</p>
                          <p className="text-stone-100 font-semibold">{collection.sales24h}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-sm font-medium ${collection.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
                        >
                          {collection.change24h >= 0 ? '+' : ''}
                          {collection.change24h.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
