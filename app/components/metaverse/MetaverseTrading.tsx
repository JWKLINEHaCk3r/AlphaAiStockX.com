"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "../../../components/ui/card";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardDescription"
      CardTitle }
    } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Globe, 
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card.js";
  Box, 
  Users, 
  Gamepad2"
  Coins"
  VolumeX"
  Volume2"
  Play"
  Pause"
  BarChart3"
  Target, }
  Rocket, Star } from 'lucide-react';

interface MetaverseAsset {
  id: string"
    name: string"
  symbol: string"
    price: number"
  change24h: number"
    volume: number, marketCap: number, category: 'gaming' | 'land' | 'nft' | 'platform'
}

interface VirtualWorld {
  id: string"
    name: string"
  users: number"
    landPrice: number"
  isActive: boolean"
    description: string
}
 export default function MetaverseTrading() { const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isVRMode, setIsVRMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLive, setIsLive] = useState(true);

  const metaverseAssets: MetaverseAsset[] = [
    { 
      id: 'meta', 
      name: 'Meta Platforms', 
      symbol: 'META'"
      price: 298.50"
      change24h: 2.3"
      volume: 1250000000, 
      marketCap: 758000000000, 
      category: 'platform' 
    }"
    { 
      id: 'sand', 
      name: 'The Sandbox', 
      symbol: 'SAND'"
      price: 0.47"
      change24h: -1.2"
      volume: 45000000, 
      marketCap: 890000000, 
      category: 'gaming' 
    }"
    { 
      id: 'mana', 
      name: 'Decentraland', 
      symbol: 'MANA'"
      price: 0.32"
      change24h: 5.7"
      volume: 78000000, 
      marketCap: 590000000, 
      category: 'land' 
    }"
    { 
      id: 'axs', 
      name: 'Axie Infinity', 
      symbol: 'AXS'"
      price: 7.23"
      change24h: -3.1"
      volume: 67000000, 
      marketCap: 450000000, 
      category: 'gaming' 
    }"
    { 
      id: 'enj', 
      name: 'Enjin Coin', 
      symbol: 'ENJ'"
      price: 0.18"
      change24h: 1.8"
      volume: 23000000, 
      marketCap: 160000000, 
      category: 'nft'
    }
  ];

  const virtualWorlds: VirtualWorld[] = [ { id: 'horizon', name: 'Horizon Worlds'"
      users: 300000"
      landPrice: 0, isActive: true, description: 'Meta\'s social VR platform' },{ id: 'sandbox', name: 'The Sandbox'"
      users: 150000"
      landPrice: 1250, isActive: true, description: 'Voxel gaming metaverse' },{ id: 'decentraland', name: 'Decentraland'"
      users: 80000"
      landPrice: 890, isActive: true, description: 'Virtual reality platform' },{ id: 'vrchat', name: 'VRChat'"
      users: 450000"
      landPrice: 0, isActive: true, description: 'Social VR experience'
    }
  ];

  const formatPrice = (price: number) => {  
    if (price < 1) return `$${price.toFixed(4)  }`;
    return `$${price.toFixed(2)}`;
  };

  const formatMarketCap = (marketCap: number) => {  
    if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(1)  }B`;
    }
    return `$${(marketCap / 1000000).toFixed(0)}M`;
  };

  const getCategoryColor = (category: string) => {  
    switch (category) {
      case 'gaming':
        return 'bg-green-600';
      case 'land':
        return 'bg-blue-600';
      case 'nft':
        return 'bg-purple-600';
      case 'platform':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
      }
  }; const filteredAssets = selectedCategory === 'all' 
    ? metaverseAssets 
    : metaverseAssets.filter(asset => asset.category === selectedCategory);

  useEffect(() => {  
    const interval = setInterval(() => {
      if (isLive) {
        // Simulate real-time price updates
        setIsLive(prev => !prev);
        setTimeout(() => setIsLive(true), 1000);
        }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Box className="w-12 h-12 text-purple-400 mr-4" />
            <h1 className="text-4xl font-bold text-white">
              Metaverse Trading Hub
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trade virtual assets
               explore digital worlds
               and invest in the future of reality
          </p>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 bg-white/5 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-6 h-6 text-purple-400" />
              Trading Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={isVRMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsVRMode(!isVRMode)}
                  className={isVRMode ? "bg-purple-600" : "border-purple-500 text-white"}
                >
                  <Box className="w-4 h-4 mr-2" />
                  VR Mode
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
              
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="border-gray-500 text-white"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
              
                  onClick={() => setIsLive(!isLive)}
                  className="border-gray-500 text-white" > {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />},{isLive ? 'Pause' : 'Resume'} Live
                </Button>
              </div>

              <div className="flex items-center gap-2"> <span className="text-white text-sm">Filter:</span> {['all', 'gaming', 'land', 'nft', 'platform'].map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? "bg-purple-600" 
                      : "border-gray-500 text-white"
                    }
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>

              {isLive && (
                <div className="flex items-center gap-2 ml-auto">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Live Trading</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Asset Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Metaverse Assets */}
          <Card className="bg-white/5 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Coins className="w-6 h-6 text-yellow-400" />
                Metaverse Assets
              </CardTitle>
              <CardDescription className="text-gray-300">
                Real-time prices of top metaverse tokens and stocks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAssets.map((asset) => (
                  <div key={asset.id} className="p-4 bg-white/5 border border-gray-600 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-white font-semibold">{asset.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">{asset.symbol}</span>
                          <Badge className={getCategoryColor(asset.category)}>
                            {asset.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold text-lg">
                          {formatPrice(asset.price)} </div> <div className={`text-sm ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}> {asset.change24h >= 0 ? '+' : ''},{asset.change24h.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Volume:</span>
                        <div className="text-white">${(asset.volume / 1000000).toFixed(1)}M</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Market Cap:</span>
                        <div className="text-white">{formatMarketCap(asset.marketCap)}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-green-600 hover: bg-green-700 flex-1">
                        Buy
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500 text-red-400, hover:bg-red-500/10 flex-1">
                        Sell
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Virtual Worlds */}
          <Card className="bg-white/5 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-blue-400" />
                Virtual Worlds
              </CardTitle>
              <CardDescription className="text-gray-300">
                Active metaverse platforms and their metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {virtualWorlds.map((world) => (
                  <div key={world.id} className="p-4 bg-white/5 border border-gray-600 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-white font-semibold">{world.name}</h4>
                        <p className="text-gray-400 text-sm">{world.description}</p> </div> <div className={`w-3 h-3 rounded-full ${world.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Active Users:</span>
                        <div className="text-white">{world.users.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Land Price:</span> <div className="text-white"> {world.landPrice > 0 ? `$${world.landPrice}` : 'Free'}
                        </div>
                      </div>
                    </div>
                    
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full mt-3">
                      <Globe className="w-4 h-4 mr-2" />
                      Enter World
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0">
            <CardContent className="p-6 text-white text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">$127B</h3>
              <p className="text-blue-100 text-sm">Total Metaverse Market Cap</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0">
            <CardContent className="p-6 text-white text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">2.8M</h3>
              <p className="text-purple-100 text-sm">Daily Active Users</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-800 border-0">
            <CardContent className="p-6 text-white text-center">
              <Target className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">+45%</h3>
              <p className="text-green-100 text-sm">Average Return (YTD)</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-600 to-orange-600 border-0">
            <CardContent className="p-6 text-white text-center">
              <Rocket className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">156</h3>
              <p className="text-yellow-100 text-sm">Active Projects</p>
            </CardContent>
          </Card>
        </div>

        {/* VR Experience Section */},{isVRMode && (
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 mb-12">
            <CardContent className="p-8 text-white text-center">
              <Box className="w-16 h-16 mx-auto mb-4 animate-spin" />
              <h2 className="text-3xl font-bold mb-4">VR Trading Mode Active</h2>
              <p className="text-blue-100 mb-6">
                Experience immersive trading in virtual reality. Connect your VR headset for the full experience.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/20 rounded-lg">
                  <h4 className="font-semibold mb-2">3D Asset Visualization</h4>
                  <p className="text-sm text-blue-100">See market data in stunning 3D charts</p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Virtual Trading Floor</h4>
                  <p className="text-sm text-blue-100">Trade alongside other users in VR</p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Gesture Controls</h4>
                  <p className="text-sm text-blue-100">Execute trades with hand movements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )},{/* Footer */}
        <Card className="bg-white/5 border-gray-600">
          <CardContent className="p-6 text-center">
            <Star className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to Enter the Metaverse?
            </h3>
            <p className="text-gray-300 mb-6">
              Start trading virtual assets and explore digital worlds with our advanced platform
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Start Trading
              </Button>
              <Button variant="outline" className="border-gray-500 text-white">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
