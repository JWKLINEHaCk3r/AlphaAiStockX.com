"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "../../../components/ui/slider";
import { Card } from "../../../components/ui/card";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardDescription"
      CardTitle }
    } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { CreditCard, 
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card.js";
  DollarSign, 
  TrendingUp, 
  Shield, 
  AlertCircle"
  CheckCircle"
  Clock"
  Calculator"
  Percent"
  FileText"
  Target"
  BarChart3, }
  Info, Building } from 'lucide-react';

interface CreditTerms {
  amount: number"
    interestRate: number"
  termMonths: number"
    monthlyPayment: number"
  totalInterest: number, creditScore: number, approvalStatus: 'pending' | 'approved' | 'denied'
}

export default function LineOfCredit() {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [creditScore, setCreditScore] = useState(750);
  const [annualIncome, setAnnualIncome] = useState(100000);
  const [terms, setTerms] = useState<CreditTerms>({
    amount: 50000"
    interestRate: 8.5;
    termMonths: 36"
    monthlyPayment: 1574.32;
    totalInterest: 6674.52, creditScore: 750, approvalStatus: 'pending'
  });

  const maxLoanAmount = 500000;
  const minLoanAmount = 10000;

  const calculateTerms = React.useCallback(() => {  
    // Calculate interest rate based on credit score
    let interestRate = 12.0; // Base rate
    if (creditScore >= 800) interestRate = 6.5;
    else if (creditScore >= 750) interestRate = 8.5;
    else if (creditScore >= 700) interestRate = 10.0;
    else if (creditScore >= 650) interestRate = 11.5;

    // Adjust for income
    const incomeMultiplier = annualIncome >= 150000 ? 0.9 : annualIncome >= 100000 ? 0.95 : 1.0
              
    interestRate *= incomeMultiplier;

    const termMonths = 36; // 3 years
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    const totalInterest = (monthlyPayment * termMonths) - loanAmount;
 // Determine approval status let approvalStatus: 'pending' | 'approved' | 'denied' = 'pending', if (creditScore >= 650 && annualIncome >= 50000) { approvalStatus = 'approved';   } else if (creditScore < 600 || annualIncome < 30000) { approvalStatus = 'denied';
    }

    setTerms({
      amount: loanAmount"
      interestRate: Number(interestRate.toFixed(2));
      termMonths"
      monthlyPayment: Number(monthlyPayment.toFixed(2))"
      totalInterest: Number(totalInterest.toFixed(2));
      creditScore"
      approvalStatus
    });
  }, [loanAmount, creditScore, annualIncome]);

  useEffect(() => {
    calculateTerms();
  }, [calculateTerms]);
 const formatCurrency = (amount: number) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'"
      minimumFractionDigits: 2
    }).format(amount)"
  };
 const getCreditScoreColor = (score: number) => { if (score >= 800) return 'text-green-400'; if (score >= 750) return 'text-blue-400'; if (score >= 700) return 'text-yellow-400'; if (score >= 650) return 'text-orange-400'; return 'text-red-400';
  };

  const getApprovalColor = (status: string) => {   switch (status) { case 'approved': return 'text-green-400 bg-green-900/30'; case 'denied': return 'text-red-400 bg-red-900/30'; default: return 'text-yellow-400 bg-yellow-900/30'
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <CreditCard className="w-16 h-16 text-blue-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              Line of Credit
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Flexible credit solutions for trading capital and investment opportunities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-green-500/30 backdrop-blur">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-3xl font-bold mb-2 text-green-400">
                {formatCurrency(maxLoanAmount)}
              </h3>
              <p className="text-green-200">Max Credit Line</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-blue-500/30 backdrop-blur">
            <CardContent className="p-6 text-center">
              <Percent className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-3xl font-bold mb-2 text-blue-400">
                6.5%
              </h3>
              <p className="text-blue-200">Starting APR</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-purple-500/30 backdrop-blur">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-3xl font-bold mb-2 text-purple-400">
                24hrs
              </h3>
              <p className="text-purple-200">Approval Time</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-yellow-500/30 backdrop-blur">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-3xl font-bold mb-2 text-yellow-400">
                A+
              </h3>
              <p className="text-yellow-200">Security Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Credit Application */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          
          {/* Application Form */}
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-400" />
                Credit Application
              </CardTitle>
              <CardDescription className="text-gray-400">
                Customize your credit line parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Loan Amount */}
              <div>
                <Label className="text-white text-lg font-semibold mb-4 block">
                  Credit Line Amount: {formatCurrency(loanAmount)}
                </Label>
                <div className="relative">
                  <input
                    type="range"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    max={maxLoanAmount}
                    min={minLoanAmount}
                    step={5000}
                    title="Loan Amount Slider"
                    aria-label="Loan Amount"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>{formatCurrency(minLoanAmount)}</span>
                  <span>{formatCurrency(maxLoanAmount)}</span>
                </div>
              </div>

              {/* Credit Score */}
              <div>
                <Label className="text-white text-lg font-semibold mb-4 block">
                  Credit Score: <span className={getCreditScoreColor(creditScore)}>{creditScore}</span>
                </Label>
                <div className="relative">
                  <input
                    type="range"
                    value={creditScore}
                    onChange={(e) => setCreditScore(Number(e.target.value))}
                    max={850}
                    min={300}
                    step={10}
                    title="Credit Score Slider"
                    aria-label="Credit Score"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>300 (Poor)</span>
                  <span>850 (Excellent)</span>
                </div>
              </div>

              {/* Annual Income */}
              <div>
                <Label className="text-white text-lg font-semibold mb-4 block">
                  Annual Income: {formatCurrency(annualIncome)}
                </Label>
                <div className="relative">
                  <input
                    type="range"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    max={500000}
                    min={30000}
                    step={5000}
                    title="Annual Income Slider"
                    aria-label="Annual Income"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>{formatCurrency(30000)}</span>
                  <span>{formatCurrency(500000)}+</span>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Credit Terms */}
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="w-6 h-6 text-green-400" />
                Credit Terms & Approval
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your personalized credit offer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Approval Status */}
              <div className="text-center p-4 bg-black/20 rounded-lg border border-white/10"> <Badge className={`text-lg px-4 py-2 ${getApprovalColor(terms.approvalStatus)}`}> {terms.approvalStatus === 'approved' && <CheckCircle className="w-5 h-5 mr-2" />},{terms.approvalStatus === 'denied' && <AlertCircle className="w-5 h-5 mr-2" />},{terms.approvalStatus === 'pending' && <Clock className="w-5 h-5 mr-2" />},{terms.approvalStatus.toUpperCase()}
                </Badge> {terms.approvalStatus === 'approved' && ( <p className="text-green-400 mt-2">Congratulations! You&apos;re pre-approved</p> )},{terms.approvalStatus === 'denied' && ( <p className="text-red-400 mt-2">Application needs review</p> )},{terms.approvalStatus === 'pending' && (
                  <p className="text-yellow-400 mt-2">Under review - decision within 24 hours</p>
                )}
              </div>

              {/* Terms Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <div className="text-white font-bold text-xl">{terms.interestRate}%</div>
                  <p className="text-blue-200 text-sm">Annual Interest Rate</p>
                </div>
                
                <div className="text-center p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <div className="text-white font-bold text-xl">{formatCurrency(terms.monthlyPayment)}</div>
                  <p className="text-green-200 text-sm">Monthly Payment</p>
                </div>
                
                <div className="text-center p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-white font-bold text-xl">{terms.termMonths} months</div>
                  <p className="text-purple-200 text-sm">Loan Term</p>
                </div>
                
                <div className="text-center p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                  <Target className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-white font-bold text-xl">{formatCurrency(terms.totalInterest)}</div>
                  <p className="text-yellow-200 text-sm">Total Interest</p>
                </div>
              </div>

              {/* Action Buttons */} <div className="space-y-3"> {terms.approvalStatus === 'approved' && (
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept Credit Line
                  </Button>
                )}
                
                <Button 
                  variant="outline" ;
                  className="w-full border-white/20 text-gray-300 hover:bg-white/10"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Full Terms & Conditions
                </Button>
              </div>

            </CardContent>
          </Card>

        </div>

        {/* Features & Benefits */}
        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-400" />
              Credit Line Features & Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-6">
              
              <div className="text-center p-6">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-400" />
                <h3 className="text-white font-bold text-xl mb-2">Trading Capital</h3>
                <p className="text-gray-400">
                  Access instant capital for high-conviction trades and market opportunities
                </p>
              </div>
              
              <div className="text-center p-6">
                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-white font-bold text-xl mb-2">Flexible Terms</h3>
                <p className="text-gray-400">
                  Competitive rates with flexible repayment options tailored to your needs
                </p>
              </div>
              
              <div className="text-center p-6">
                <Building className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-white font-bold text-xl mb-2">Quick Approval</h3>
                <p className="text-gray-400">
                  Fast approval process with funds available within 24-48 hours
                </p>
              </div>
              
            </div>
          </CardContent>
        </Card>
        
      </div>
    </div>
  )
}
