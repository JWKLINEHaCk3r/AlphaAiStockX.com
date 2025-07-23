import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card';
import { Card } from '../../components/ui/card';
import { TabsTrigger } from "../../components/ui/tabs";
import { TabsList } from "../../components/ui/tabs";
import { TabsContent } from "../../components/ui/tabs";
import { Tabs } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
'use client';
import React, { useState } from 'react';
import { AdvancedAIAutoTrader } from '../services/ai-auto-trader-enhanced';
import AITradingDashboard from '../components/AITradingDashboard';

export default function AutoTraderDemo() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runQuickDemo() {
    setLoading(true);
    setError(null);
    try {
      const trader = new AdvancedAIAutoTrader(25000, 'MEDIUM');

      // Simulate some AI trading;
      await trader.executeAITrading(['AAPL', 'TSLA', 'MSFT']);

      const portfolioData = trader.getPortfolio();
      setPortfolio(portfolioData);
    } catch (e: any) {
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  if (showDashboard) {
    return <AITradingDashboard />;
  }

  return (;
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">;
      <div className="container mx-auto px-4 py-20">;
        <div className="max-w-6xl mx-auto">;
          <div className="text-center mb-12">;
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">;
              AI Auto-Trader Demo;
            </h1>;
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">;
              Experience the power of advanced AI-driven trading with real-time market analysis,;
              sentiment evaluation, and automated portfolio optimization.;
            </p>;
          </div>;
          <Tabs defaultValue="overview" className="space-y-8">;
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">;
              <TabsTrigger value="overview">Overview</TabsTrigger>;
              <TabsTrigger value="features">Features</TabsTrigger>;
              <TabsTrigger value="demo">Live Demo</TabsTrigger>;
            </TabsList>;
            {/* Overview Tab */}
            <TabsContent value="overview">;
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">;
                <Card className="p-8 bg-gray-900/50 border-gray-700">;
                  <h3 className="text-2xl font-semibold mb-4 text-blue-400">AI Trading Engine</h3>;
                  <div className="space-y-4">;
                    <div className="flex items-start space-x-3">;
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>;
                      <div>;
                        <h4 className="font-semibold">Advanced Pattern Recognition</h4>;
                        <p className="text-gray-300 text-sm">;
                          AI identifies complex market patterns and trends;
                        </p>;
                      </div>;
                    </div>;
                    <div className="flex items-start space-x-3">;
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>;
                      <div>;
                        <h4 className="font-semibold">Sentiment Analysis</h4>;
                        <p className="text-gray-300 text-sm">;
                          Real-time analysis of market sentiment and news;
                        </p>;
                      </div>;
                    </div>;
                    <div className="flex items-start space-x-3">;
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>;
                      <div>;
                        <h4 className="font-semibold">Risk Management</h4>;
                        <p className="text-gray-300 text-sm">;
                          Dynamic risk assessment and position sizing;
                        </p>;
                      </div>;
                    </div>;
                  </div>;
                </Card>;
                <Card className="p-8 bg-gray-900/50 border-gray-700">;
                  <h3 className="text-2xl font-semibold mb-4 text-purple-400">;
                    Performance Metrics;
                  </h3>;
                  <div className="grid grid-cols-2 gap-4">;
                    <div className="text-center">;
                      <div className="text-3xl font-bold text-green-400">94.7%</div>;
                      <div className="text-sm text-gray-400">Success Rate</div>;
                    </div>;
                    <div className="text-center">;
                      <div className="text-3xl font-bold text-blue-400">23.4%</div>;
                      <div className="text-sm text-gray-400">Avg Annual Return</div>;
                    </div>;
                    <div className="text-center">;
                      <div className="text-3xl font-bold text-purple-400">2.3</div>;
                      <div className="text-sm text-gray-400">Sharpe Ratio</div>;
                    </div>;
                    <div className="text-center">;
                      <div className="text-3xl font-bold text-yellow-400">8.2%</div>;
                      <div className="text-sm text-gray-400">Max Drawdown</div>;
                    </div>;
                  </div>;
                </Card>;
              </div>;
            </TabsContent>;
            {/* Features Tab */}
            <TabsContent value="features">;
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">;
                {[;
                  {
                    title: 'Multi-Strategy AI',;
                    description: 'Combines momentum, mean reversion, and sentiment strategies',;
                    icon: '🧠',;
                  },;
                  {
                    title: 'Real-Time Analysis',;
                    description: 'Live market data processing and signal generation',;
                    icon: '⚡',;
                  },;
                  {
                    title: 'Risk Controls',;
                    description: 'Advanced risk management and position sizing',;
                    icon: '🛡️',;
                  },;
                  {
                    title: 'Portfolio Optimization',;
                    description: 'AI-driven portfolio allocation and rebalancing',;
                    icon: '📊',;
                  },;
                  {
                    title: 'Backtesting',;
                    description: 'Historical performance validation and optimization',;
                    icon: '📈',;
                  },;
                  {
                    title: '24/7 Monitoring',;
                    description: 'Continuous market monitoring and opportunity detection',;
                    icon: '🕰️',;
                  },;
                ].map((feature, index) => (;
                  <Card;
                    key={index}
                    className="p-6 bg-gray-900/50 border-gray-700 hover:border-blue-500 transition-all";
                  >;
                    <div className="text-4xl mb-4">{feature.icon}</div>;
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>;
                    <p className="text-gray-300 text-sm">{feature.description}</p>;
                  </Card>;
                ))}
              </div>;
            </TabsContent>;
            {/* Demo Tab */}
            <TabsContent value="demo">;
              <div className="space-y-8">;
                <Card className="p-8 bg-gray-900/50 border-gray-700">;
                  <div className="text-center">;
                    <h3 className="text-2xl font-semibold mb-4">Choose Your Demo Experience</h3>;
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">;
                      {/* Quick Demo */}
                      <div className="p-6 bg-gray-800 rounded-lg">;
                        <h4 className="text-xl font-semibold mb-4 text-blue-400">Quick Demo</h4>;
                        <p className="text-gray-300 mb-6">;
                          See AI trading in action with a simulated portfolio and trades;
                        </p>;
                        <Button;
                          onClick={runQuickDemo}
                          disabled={loading}
                          className="w-full bg-blue-600 hover:bg-blue-700";
                        >;
                          {loading ? 'Running Demo...' : 'Start Quick Demo'}
                        </Button>;
                        {error && (;
                          <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-300">;
                            Error: {error}
                          </div>;
                        )}

                        {portfolio && (;
                          <div className="mt-6 p-4 bg-green-900/30 border border-green-500 rounded">;
                            <h5 className="font-semibold mb-2">Demo Results:</h5>;
                            <div className="text-sm space-y-1">;
                              <p>;
                                Portfolio Value:{' '}
                                <span className="text-green-400">;
                                  ${portfolio.totalValue?.toFixed(2)}
                                </span>;
                              </p>;
                              <p>Cash: ${portfolio.cash?.toFixed(2)}</p>;
                              <p>;
                                Total Return:{' '}
                                <span className="text-green-400">;
                                  {portfolio.performance?.totalReturn?.toFixed(2)}%;
                                </span>;
                              </p>;
                              <p>Trades Executed: {portfolio.trades?.length || 0}</p>;
                            </div>;
                          </div>;
                        )}
                      </div>;
                      {/* Full Dashboard */}
                      <div className="p-6 bg-gray-800 rounded-lg">;
                        <h4 className="text-xl font-semibold mb-4 text-purple-400">;
                          Full Dashboard;
                        </h4>;
                        <p className="text-gray-300 mb-6">;
                          Access the complete AI trading dashboard with advanced features;
                        </p>;
                        <Button;
                          onClick={() => setShowDashboard(true)}
                          className="w-full bg-purple-600 hover:bg-purple-700";
                        >;
                          Launch Full Dashboard;
                        </Button>;
                        <div className="mt-4 text-xs text-gray-400">;
                          Includes: Portfolio management, AI signals, performance metrics, and more;
                        </div>;
                      </div>;
                    </div>;
                  </div>;
                </Card>;
                {/* AI Strategies Showcase */}
                <Card className="p-8 bg-gray-900/50 border-gray-700">;
                  <h3 className="text-2xl font-semibold mb-6 text-center">AI Trading Strategies</h3>;
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">;
                    <div className="text-center">;
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">;
                        <span className="text-2xl">📈</span>;
                      </div>;
                      <h4 className="text-lg font-semibold mb-2">Momentum Strategy</h4>;
                      <p className="text-gray-300 text-sm">;
                        Identifies and follows strong market trends with AI-powered confirmation;
                      </p>;
                    </div>;
                    <div className="text-center">;
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">;
                        <span className="text-2xl">🎯</span>;
                      </div>;
                      <h4 className="text-lg font-semibold mb-2">Mean Reversion</h4>;
                      <p className="text-gray-300 text-sm">;
                        Exploits temporary price deviations from long-term averages;
                      </p>;
                    </div>;
                    <div className="text-center">;
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">;
                        <span className="text-2xl">🧠</span>;
                      </div>;
                      <h4 className="text-lg font-semibold mb-2">Sentiment Analysis</h4>;
                      <p className="text-gray-300 text-sm">;
                        Analyzes market sentiment from news, social media, and institutional flows;
                      </p>;
                    </div>;
                  </div>;
                </Card>;
              </div>;
            </TabsContent>;
          </Tabs>;
        </div>;
      </div>;
    </div>;
  );
}
