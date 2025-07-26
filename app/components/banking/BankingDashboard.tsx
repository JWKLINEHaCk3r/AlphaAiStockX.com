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
import { TabsTrigger, TabsList, TabsContent, Tabs } from '../../../components/ui/tabs';
import { Alert } from '../../../components/ui/alert';
import { Badge } from '../../../components/ui/badge';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import {
  AIStockPrediction,;
  SportsEvent,;
  TradingOpportunity,;
  Trade,;
  Trader,;
  VisionModel,;
  AnalysisResult,;
  BankAccount,;
  Transaction,;
  TradingSignalData,;
  ChartPattern,;
  TechnicalIndicators,;
  RiskAnalysis,;
  SectorPerformance,;
  BacktestStrategy,;
  AIWhiteLabelMetrics,;
  MarketClassification,;
  TradingRecommendation,;
  StockAnalysis,;
  RealtimeData,;
  VolumeProfile,;
  AIAnalysisComponents,;
  CryptoData,;
  DeFiProtocol,;
  NFTCollection,;
  UserProfile,;
  ThemeOption,;
  AccentColor,;
  SubscriptionPlan,;
  TradingStrategy,;
  ScanResult,;
  SiteDiagnostic,;
  Alert,;
  NewsAnalysis,;
  SocialPlatform,;
  Influencer,;
  SocialPost,;
  DeepLearningModel,;
  MarketPattern,;
} from '../../types/trading-types';

"use client";
import React, { useState } from 'react';

// ...existing code...;
import {
  Building2,;
  DollarSign,;
  TrendingUp,;
  ArrowUpRight,;
  ArrowDownLeft,;
  CheckCircle,;
  Clock,;
  AlertCircle,;
  Plus,;
  Trash2,;
} from 'lucide-react';

interface User {






















  id: string | number;
  name: string;
  email: string;
  balance?: number;






















}

interface BankingDashboardProps {






















  user: User;
  onUpdateBalance: (newBalance: number) => void;






















}

export default function BankingDashboard({ user, onUpdateBalance }: BankingDashboardProps) {
  const [bankAccounts, setBankAccounts] = useState([;
    {
      id: 1,;
      bankName: 'Chase Bank',;
      accountType: 'Checking',;
      accountNumber: '****1234',;
      routingNumber: '021000021',;
      verified: true,;
      isDefault: true,;
    },;
    {
      id: 2,;
      bankName: 'Bank of America',;
      accountType: 'Savings',;
      accountNumber: '****5678',;
      routingNumber: '026009593',;
      verified: false,;
      isDefault: false,;
    },;
  ]);

  const [transactions, setTransactions] = useState([;
    {
      id: 1,;
      type: 'deposit',;
      amount: 5000,;
      status: 'completed',;
      date: '2024-01-15',;
      description: 'Bank Transfer - Chase',;
    },;
    {
      id: 2,;
      type: 'withdrawal',;
      amount: 1500,;
      status: 'pending',;
      date: '2024-01-14',;
      description: 'Withdrawal to Chase',;
    },;
    {
      id: 3,;
      type: 'deposit',;
      amount: 2500,;
      status: 'completed',;
      date: '2024-01-12',;
      description: 'Bank Transfer - Chase',;
    },;
  ]);

  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('1');

  const handleDeposit = () => {
    if (depositAmount && Number.parseFloat(depositAmount) > 0) {
      const newTransaction = {
        id: Date.now(),;
        type: 'deposit',;
        amount: Number.parseFloat(depositAmount),;
        status: 'pending',;
        date: new Date().toISOString().split('T')[0],;
        description: `Deposit from ${bankAccounts.find(acc => acc.id.toString() === selectedAccount)?.bankName}`,;
      };
      // Ensure transactions is defined as a state variable;
      // If not already defined, add:;
      // const [transactions, setTransactions] = useState<Transaction[]>([]);
      setTransactions([newTransaction, ...transactions]);

      // Simulate instant deposit for demo;
      setTimeout(() => {
        onUpdateBalance((user.balance || 0) + Number.parseFloat(depositAmount));
        setTransactions(prev => prev);
          prev.map((t: any) => (t.id === newTransaction.id ? { ...t, status: 'completed' } : t));
        // ...existing code...;
      }, 2000);

      setDepositAmount('');
    }
  };

  const handleWithdraw = () => {
    if (;
      withdrawAmount &&;
      Number.parseFloat(withdrawAmount) > 0 &&;
      Number.parseFloat(withdrawAmount) <= (user.balance || 0);
    ) {
      const newTransaction = {
        id: Date.now(),;
        type: 'withdrawal',;
        amount: Number.parseFloat(withdrawAmount),;
        status: 'pending',;
        date: new Date().toISOString().split('T')[0],;
        description: `Withdrawal to ${bankAccounts.find(acc => acc.id.toString() === selectedAccount)?.bankName}`,;
      };
      setTransactions([newTransaction, ...transactions]);

      // Simulate withdrawal processing;
      setTimeout(() => {
        onUpdateBalance((user.balance || 0) - Number.parseFloat(withdrawAmount));
        setTransactions(prev => prev);
          prev.map((t: any) => (t.id === newTransaction.id ? { ...t, status: 'completed' } : t));
        // ...existing code...;
      }, 2000);

      setWithdrawAmount('');
    }
  };

  const buyingPower = (user.balance || 0) * 4; // 4x margin;
  return (;
    <div className="space-y-6">;
      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">;
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">;
          <CardContent className="p-6">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-400">Account Balance</p>;
                <p className="text-3xl font-bold text-green-400">;
                  {(user.balance || 0).toLocaleString()}
                </p>;
              </div>;
              <DollarSign className="h-8 w-8 text-green-400" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">;
          <CardContent className="p-6">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-400">Buying Power</p>;
                <p className="text-3xl font-bold text-blue-400">{buyingPower.toLocaleString()}</p>;
              </div>;
              <TrendingUp className="h-8 w-8 text-blue-400" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">;
          <CardContent className="p-6">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-400">Available to Withdraw</p>;
                <p className="text-3xl font-bold text-purple-400">;
                  {(user.balance || 0).toLocaleString()}
                </p>;
              </div>;
              <ArrowDownLeft className="h-8 w-8 text-purple-400" />;
            </div>;
          </CardContent>;
        </Card>;
      </div>;
      <Tabs defaultValue="transfer" className="space-y-6">;
        <TabsList className="bg-black/20 border-purple-500/30">;
          <TabsTrigger value="transfer" className="data-[state=active]:bg-purple-500/20">;
            <ArrowUpRight className="h-4 w-4 mr-2" />;
            Transfer Money;
          </TabsTrigger>;
          <TabsTrigger value="accounts" className="data-[state=active]:bg-purple-500/20">;
            <Building2 className="h-4 w-4 mr-2" />;
            Bank Accounts;
          </TabsTrigger>;
          <TabsTrigger value="history" className="data-[state=active]:bg-purple-500/20">;
            <Clock className="h-4 w-4 mr-2" />;
            Transaction History;
          </TabsTrigger>;
        </TabsList>;
        <TabsContent value="transfer">;
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">;
            {/* Deposit */}
            <Card className="bg-black/20 border-green-500/30 backdrop-blur-xl">;
              <CardHeader>;
                <CardTitle className="text-white flex items-center">;
                  <ArrowUpRight className="h-5 w-5 mr-2 text-green-400" />;
                  Deposit Money;
                </CardTitle>;
              </CardHeader>;
              <CardContent className="space-y-4">;
                <div className="space-y-2">;
                  <Label className="text-white">From Bank Account</Label>;
                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>;
                    <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">;
                      <SelectValue />;
                    </SelectTrigger>;
                    <SelectContent>;
                      {bankAccounts;
                        .filter(acc => acc.verified);
                        .map((account: any) => (;
                          <SelectItem key={account.id} value={account.id.toString()}>;
                            {account.bankName} - {account.accountNumber}
                          </SelectItem>;
                        ))}
                    </SelectContent>;
                  </Select>;
                </div>;
                <div className="space-y-2">;
                  <Label className="text-white">Amount</Label>;
                  <Input;
                    type="number";
                    placeholder="0.00";
                    value={depositAmount}
                    onChange={e => setDepositAmount(e.target.value)}
                    className="bg-black/20 border-purple-500/30 text-white";
                  />;
                </div>;
                <div className="flex gap-2">;
                  {[500, 1000, 2500, 5000].map((amount: any) => (;
                    <Button;
                      key={amount}
                      variant="outline";
                      size="sm";
                      onClick={() => setDepositAmount(amount.toString())}
                      className="border-green-500/30 text-green-400 hover:bg-green-500/20";
                    >;
                      ${amount}
                    </Button>;
                  ))}
                </div>;
                <Button;
                  onClick={handleDeposit}
                  disabled={!depositAmount || Number.parseFloat(depositAmount) <= 0}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700";
                >;
                  Deposit {depositAmount || '0.00'}
                </Button>;
                <p className="text-xs text-gray-400">;
                  Instant deposits available. Funds will be available immediately for trading.;
                </p>;
              </CardContent>;
            </Card>;
            {/* Withdraw */}
            <Card className="bg-black/20 border-red-500/30 backdrop-blur-xl">;
              <CardHeader>;
                <CardTitle className="text-white flex items-center">;
                  <ArrowDownLeft className="h-5 w-5 mr-2 text-red-400" />;
                  Withdraw Money;
                </CardTitle>;
              </CardHeader>;
              <CardContent className="space-y-4">;
                <div className="space-y-2">;
                  <Label className="text-white">To Bank Account</Label>;
                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>;
                    <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">;
                      <SelectValue />;
                    </SelectTrigger>;
                    <SelectContent>;
                      {bankAccounts;
                        .filter(acc => acc.verified);
                        .map((account: any) => (;
                          <SelectItem key={account.id} value={account.id.toString()}>;
                            {account.bankName} - {account.accountNumber}
                          </SelectItem>;
                        ))}
                    </SelectContent>;
                  </Select>;
                </div>;
                <div className="space-y-2">;
                  <Label className="text-white">Amount</Label>;
                  <Input;
                    type="number";
                    placeholder="0.00";
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    className="bg-black/20 border-purple-500/30 text-white";
                    max={user.balance || 0}
                  />;
                </div>;
                <div className="flex gap-2">;
                  {[500, 1000, 2500].map((amount: any) => (;
                    <Button;
                      key={amount}
                      variant="outline";
                      size="sm";
                      onClick={() =>;
                        setWithdrawAmount(Math.min(amount, user.balance || 0).toString());
                      }
                      className="border-red-500/30 text-red-400 hover:bg-red-500/20";
                      disabled={amount > (user.balance || 0)}
                    >;
                      ${amount}
                    </Button>;
                  ))}
                  <Button;
                    variant="outline";
                    size="sm";
                    onClick={() => setWithdrawAmount((user.balance || 0).toString())}
                    className="border-red-500/30 text-red-400 hover:bg-red-500/20";
                  >;
                    All;
                  </Button>;
                </div>;
                <Button;
                  onClick={handleWithdraw}
                  disabled={
                    !withdrawAmount ||;
                    Number.parseFloat(withdrawAmount) <= 0 ||;
                    Number.parseFloat(withdrawAmount) > (user.balance || 0);
                  }
                  className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700";
                >;
                  Withdraw {withdrawAmount || '0.00'}
                </Button>;
                <p className="text-xs text-gray-400">;
                  Withdrawals typically take 1-3 business days to process.;
                </p>;
              </CardContent>;
            </Card>;
          </div>;
        </TabsContent>;
        <TabsContent value="accounts">;
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
            <CardHeader>;
              <CardTitle className="text-white flex items-center justify-between">;
                <span className="flex items-center">;
                  <Building2 className="h-5 w-5 mr-2" />;
                  Connected Bank Accounts;
                </span>;
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500">;
                  <Plus className="h-4 w-4 mr-2" />;
                  Add Account;
                </Button>;
              </CardTitle>;
            </CardHeader>;
            <CardContent>;
              <div className="space-y-4">;
                {bankAccounts.map((account: any) => (;
                  <div;
                    key={account.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-gray-700/30";
                  >;
                    <div className="flex items-center space-x-4">;
                      <div className="p-3 bg-blue-500/20 rounded-full">;
                        <Building2 className="h-6 w-6 text-blue-400" />;
                      </div>;
                      <div>;
                        <p className="font-medium text-white">{account.bankName}</p>;
                        <p className="text-sm text-gray-400">;
                          {account.accountType} - {account.accountNumber}
                        </p>;
                        <div className="flex items-center space-x-2 mt-1">;
                          {account.verified ? (;
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">;
                              <CheckCircle className="h-3 w-3 mr-1" />;
                              Verified;
                            </Badge>;
                          ) : (;
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">;
                              <Clock className="h-3 w-3 mr-1" />;
                              Pending;
                            </Badge>;
                          )}
                          {account.isDefault && (;
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">;
                              Default;
                            </Badge>;
                          )}
                        </div>;
                      </div>;
                    </div>;
                    <Button;
                      variant="outline";
                      size="sm";
                      className="border-red-500/30 text-red-400 hover:bg-red-500/20";
                    >;
                      <Trash2 className="h-4 w-4" />;
                    </Button>;
                  </div>;
                ))}
              </div>;
            </CardContent>;
          </Card>;
        </TabsContent>;
        <TabsContent value="history">;
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
            <CardHeader>;
              <CardTitle className="text-white flex items-center">;
                <Clock className="h-5 w-5 mr-2" />;
                Transaction History;
              </CardTitle>;
            </CardHeader>;
            <CardContent>;
              <div className="space-y-3">;
                {transactions.map((transaction: Transaction) => (;
                  <div;
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-gray-700/30";
                  >;
                    <div className="flex items-center space-x-4">;
                      <div;
                        className={`p-3 rounded-full ${
                          transaction.type === 'deposit' ? 'bg-green-500/20' : 'bg-red-500/20';
                        }`}
                      >;
                        {transaction.type === 'deposit' ? (;
                          <ArrowUpRight className="h-5 w-5 text-green-400" />;
                        ) : (;
                          <ArrowDownLeft className="h-5 w-5 text-red-400" />;
                        )}
                      </div>;
                      <div>;
                        <p className="font-medium text-white">{transaction.description}</p>;
                        <p className="text-sm text-gray-400">{transaction.date}</p>;
                      </div>;
                    </div>;
                    <div className="text-right">;
                      <p;
                        className={`font-medium ${transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}
                      >;
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </p>;
                      <Badge;
                        className={
                          transaction.status === 'completed';
                            ? 'bg-green-500/20 text-green-400 border-green-500/30';
                            : transaction.status === 'pending';
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
                              : 'bg-red-500/20 text-red-400 border-red-500/30';
                        }
                      >;
                        {transaction.status === 'completed' && (;
                          <CheckCircle className="h-3 w-3 mr-1" />;
                        )}
                        {transaction.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                        {transaction.status === 'failed' && (;
                          <AlertCircle className="h-3 w-3 mr-1" />;
                        )}
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>;
                    </div>;
                  </div>;
                ))}
              </div>;
            </CardContent>;
          </Card>;
        </TabsContent>;
      </Tabs>;
    </div>;
  );
}
