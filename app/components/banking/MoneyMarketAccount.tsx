'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DollarSign,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Star,
  Crown,
  Zap,
  Target,
  Activity,
} from 'lucide-react';

interface User {
  id: string | number;
  name: string;
  email: string;
}

interface MoneyMarketAccountProps {
  user: User;
  balance: number;
  onUpdateBalance: (newBalance: number) => void;
}

export default function MoneyMarketAccount({
  user,
  balance,
  onUpdateBalance,
}: MoneyMarketAccountProps) {
  const [moneyMarketBalance, setMoneyMarketBalance] = useState(25000);
  const [dailyInterest, setDailyInterest] = useState(0);
  const [totalInterestEarned, setTotalInterestEarned] = useState(1250.75);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [interestHistory, setInterestHistory] = useState<any[]>([]);
  const [compoundingEffect, setCompoundingEffect] = useState(0);

  const annualRate = 1.5; // 1.5% APY
  const dailyRate = annualRate / 365 / 100;

  useEffect(() => {
    // Calculate interest every 10 seconds for demo (represents daily in real time)
    const interestInterval = setInterval(() => {
      if (moneyMarketBalance > 0) {
        const interest = moneyMarketBalance * dailyRate * (10 / 86400); // 10 seconds worth
        const newInterest = interest;

        setMoneyMarketBalance(prev => prev + newInterest);
        setDailyInterest(prev => prev + newInterest);
        setTotalInterestEarned(prev => prev + newInterest);
        setCompoundingEffect(prev => prev + newInterest * 0.1); // Compounding bonus

        // Add to interest history
        setInterestHistory(prev => [
          {
            id: Date.now(),
            amount: newInterest,
            balance: moneyMarketBalance + newInterest,
            timestamp: new Date(),
            type: 'interest',
          },
          ...prev.slice(0, 19), // Keep last 20 entries
        ]);
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interestInterval);
  }, [moneyMarketBalance, dailyRate]);

  const handleDeposit = () => {
    const amount = Number.parseFloat(depositAmount);
    if (amount > 0 && amount <= balance) {
      setMoneyMarketBalance(prev => prev + amount);
      onUpdateBalance(balance - amount);
      setInterestHistory(prev => [
        {
          id: Date.now(),
          amount: amount,
          balance: moneyMarketBalance + amount,
          timestamp: new Date(),
          type: 'deposit',
        },
        ...prev.slice(0, 19),
      ]);
      setDepositAmount('');
    }
  };

  const handleWithdraw = () => {
    const amount = Number.parseFloat(withdrawAmount);
    if (amount > 0 && amount <= moneyMarketBalance) {
      setMoneyMarketBalance(prev => prev - amount);
      onUpdateBalance(balance + amount);
      setInterestHistory(prev => [
        {
          id: Date.now(),
          amount: -amount,
          balance: moneyMarketBalance - amount,
          timestamp: new Date(),
          type: 'withdrawal',
        },
        ...prev.slice(0, 19),
      ]);
      setWithdrawAmount('');
    }
  };

  const projectedYearlyEarnings = moneyMarketBalance * (annualRate / 100);
  const projectedMonthlyEarnings = projectedYearlyEarnings / 12;

  return (
    <div className="space-y-6">
      {/* Money Market Overview */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-2 border-green-400/50 backdrop-blur-xl shadow-2xl shadow-green-500/25">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <DollarSign className="h-8 w-8 mr-3 text-green-400 animate-pulse" />
            💰 HIGH-YIELD MONEY MARKET ACCOUNT
            <Badge className="ml-4 bg-gradient-to-r from-green-400 to-emerald-500 text-black animate-pulse">
              <Star className="h-4 w-4 mr-1" />
              1.5% APY
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-xl border-2 border-green-400/30 shadow-lg shadow-green-500/25">
              <Wallet className="h-10 w-10 text-green-400 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Current Balance</p>
              <p className="text-3xl font-bold text-green-400">
                ${moneyMarketBalance.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-400 mt-1">FDIC Insured</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-xl border-2 border-blue-400/30 shadow-lg shadow-blue-500/25">
              <TrendingUp className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Today's Interest</p>
              <p className="text-3xl font-bold text-blue-400">${dailyInterest.toFixed(4)}</p>
              <p className="text-xs text-cyan-400 mt-1">Auto-Compounded</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-xl border-2 border-purple-400/30 shadow-lg shadow-purple-500/25">
              <Crown className="h-10 w-10 text-purple-400 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Total Interest Earned</p>
              <p className="text-3xl font-bold text-purple-400">
                ${totalInterestEarned.toFixed(2)}
              </p>
              <p className="text-xs text-pink-400 mt-1">Lifetime Earnings</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl border-2 border-yellow-400/30 shadow-lg shadow-yellow-500/25">
              <Zap className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Compounding Bonus</p>
              <p className="text-3xl font-bold text-yellow-400">${compoundingEffect.toFixed(2)}</p>
              <p className="text-xs text-orange-400 mt-1">Extra Earnings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deposit/Withdraw */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <ArrowUpRight className="h-6 w-6 mr-2 text-green-400" />
              💸 Deposit Funds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium">Amount to Deposit</label>
              <Input
                type="number"
                placeholder="0.00"
                value={depositAmount}
                onChange={e => setDepositAmount(e.target.value)}
                className="bg-black/20 border-green-500/30 text-white mt-1"
              />
              <p className="text-xs text-gray-400 mt-1">Available: ${balance.toLocaleString()}</p>
            </div>

            <div className="flex gap-2">
              {[1000, 5000, 10000, 25000].map((amount: any) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setDepositAmount(Math.min(amount, balance).toString())}
                  className="border-green-500/30 text-green-400 hover:bg-green-500/20"
                  disabled={amount > balance}
                >
                  ${amount.toLocaleString()}
                </Button>
              ))}
            </div>

            <Button
              onClick={handleDeposit}
              disabled={
                !depositAmount ||
                Number.parseFloat(depositAmount) <= 0 ||
                Number.parseFloat(depositAmount) > balance
              }
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black font-bold"
            >
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Deposit ${depositAmount || '0.00'}
            </Button>

            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
              <p className="text-green-400 text-sm font-semibold">💡 Earning Potential</p>
              <p className="text-xs text-gray-300">
                ${depositAmount || '0'} would earn ~$
                {((Number.parseFloat(depositAmount) || 0) * (annualRate / 100)).toFixed(2)} per year
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-400/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <ArrowDownLeft className="h-6 w-6 mr-2 text-blue-400" />
              💳 Withdraw Funds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium">Amount to Withdraw</label>
              <Input
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                className="bg-black/20 border-blue-500/30 text-white mt-1"
                max={moneyMarketBalance}
              />
              <p className="text-xs text-gray-400 mt-1">
                Available: ${moneyMarketBalance.toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              {[1000, 5000, 10000].map((amount: any) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setWithdrawAmount(Math.min(amount, moneyMarketBalance).toString())}
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                  disabled={amount > moneyMarketBalance}
                >
                  ${amount.toLocaleString()}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWithdrawAmount(moneyMarketBalance.toString())}
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
              >
                All
              </Button>
            </div>

            <Button
              onClick={handleWithdraw}
              disabled={
                !withdrawAmount ||
                Number.parseFloat(withdrawAmount) <= 0 ||
                Number.parseFloat(withdrawAmount) > moneyMarketBalance
              }
              className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-black font-bold"
            >
              <ArrowDownLeft className="h-4 w-4 mr-2" />
              Withdraw ${withdrawAmount || '0.00'}
            </Button>

            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <p className="text-blue-400 text-sm font-semibold">⚡ Instant Access</p>
              <p className="text-xs text-gray-300">
                No penalties • Same-day transfers • Keep earning until withdrawal
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projections */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-6 w-6 mr-2 text-purple-400" />
            📈 Earnings Projections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <p className="text-purple-400 font-semibold">Monthly Earnings</p>
              <p className="text-2xl font-bold text-white">
                ${projectedMonthlyEarnings.toFixed(2)}
              </p>
              <Progress value={30} className="h-2 mt-2" />
              <p className="text-xs text-gray-400 mt-1">Based on current balance</p>
            </div>

            <div className="text-center p-4 bg-pink-500/10 rounded-lg border border-pink-500/30">
              <p className="text-pink-400 font-semibold">Yearly Earnings</p>
              <p className="text-2xl font-bold text-white">${projectedYearlyEarnings.toFixed(2)}</p>
              <Progress value={75} className="h-2 mt-2" />
              <p className="text-xs text-gray-400 mt-1">1.5% APY guaranteed</p>
            </div>

            <div className="text-center p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
              <p className="text-cyan-400 font-semibold">5-Year Growth</p>
              <p className="text-2xl font-bold text-white">
                ${(moneyMarketBalance * Math.pow(1.015, 5)).toFixed(2)}
              </p>
              <Progress value={90} className="h-2 mt-2" />
              <p className="text-xs text-gray-400 mt-1">With compound interest</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="bg-gradient-to-r from-gray-900/90 to-black/90 border-2 border-cyan-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-6 w-6 mr-2 text-cyan-400" />
            📊 Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {interestHistory.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">
                No transactions yet. Start earning interest by depositing funds!
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {interestHistory.map((transaction: any) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-800/30 rounded border border-gray-700/30"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === 'interest'
                          ? 'bg-green-500/20'
                          : transaction.type === 'deposit'
                            ? 'bg-blue-500/20'
                            : 'bg-red-500/20'
                      }`}
                    >
                      {transaction.type === 'interest' && (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      )}
                      {transaction.type === 'deposit' && (
                        <ArrowUpRight className="h-4 w-4 text-blue-400" />
                      )}
                      {transaction.type === 'withdrawal' && (
                        <ArrowDownLeft className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white capitalize">{transaction.type}</p>
                      <p className="text-sm text-gray-400">
                        {transaction.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${transaction.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(4)}
                    </p>
                    <p className="text-sm text-gray-400">
                      Balance: ${transaction.balance.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
