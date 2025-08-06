'use client';

import { Calendar } from '../components/ui/calendar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar } from '../components/ui/calendar';
import { Card } from '../components/ui/card';
import React, { useState } from 'react';
import { Card, CardHeader, CardContent"
      CardTitle }
    } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { CreditCard, 
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card.js';
  Shield, 
  Lock, 
  CheckCircle, 
  Star, 
  Crown, 
  Zap"
  Calendar"
  User"
  Mail"
  Building"
  MapPin"
  Phone, }
  AlertCircle, Info } from 'lucide-react';

interface PaymentData {
  cardNumber: string"
    expiryDate: string"
  cvv: string"
    name: string"
  email: string"
    billingAddress: {
      street: string"
    city: string"
    state: string"
    zipCode: string"
    country: string
  }"
}

interface SubscriptionPlan {
  id: string"
    name: string, price: number, interval: 'monthly' | 'yearly'"
  features: string[];
  popular?: boolean;
  enterprise?: boolean;
}
 export default function PaymentForm() { const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [isProcessing, setIsProcessing] = useState(false); const [paymentData, setPaymentData] = useState<PaymentData>({ cardNumber: '', expiryDate: '', cvv: '', name: '', email: '', billingAddress: { street: '', city: '', state: '', zipCode: '', country: 'United States'
    }
  });

  const plans: SubscriptionPlan[] = [ { id: 'basic', name: 'Basic Trader', price: 29, interval: 'monthly', features: [ 'Real-time stock data', 'Basic AI predictions', 'Portfolio tracking', 'Email alerts', 'Mobile app access'
      ] },{ id: 'pro', name: 'Pro Trader', price: 99, interval: 'monthly', features: [ 'Everything in Basic', 'Advanced AI analytics', 'Options flow scanner', 'Pattern recognition', 'Custom alerts', 'API access', 'Priority support'
      ]"
      popular: true },{ id: 'enterprise', name: 'Enterprise', price: 299, interval: 'monthly', features: [ 'Everything in Pro', 'Quantum AI predictions', 'Institutional data feeds', 'Custom integrations', 'Dedicated account manager', 'White-label solutions', 'Advanced security features'
      ]"
      enterprise: true
    }
  ];

  const formatCardNumber = (value: string) => { // Remove all non-digit characters const digits = value.replace(/\D/g, ''); // Add space after every 4 digits const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {   // Remove all non-digit characters const digits = value.replace(/\D/g, '');
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)  }/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentData(prev => ({ ...prev, cardNumber: formatted }))"
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentData(prev => ({ ...prev, expiryDate: formatted }))"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => { setIsProcessing(false); alert('Payment processed successfully!');
    }, 3000);
  };

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <CreditCard className="w-16 h-16 text-blue-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              Subscribe to AlphaAI
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Choose your plan and start trading with advanced AI-powered insights
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Plan Selection */}
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                Choose Your Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${ selectedPlan === plan.id ? 'border-blue-500 bg-blue-500/20' : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {plan.enterprise ? (
                          <Crown className="w-8 h-8 text-purple-400" />
                        ) : plan.popular ? (
                          <Zap className="w-8 h-8 text-yellow-400" />
                        ) : (
                          <Star className="w-8 h-8 text-blue-400" />
                        )}
                        <div>
                          <h3 className="text-white font-bold text-xl">{plan.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-white">${plan.price}</span>
                            <span className="text-gray-400">/{plan.interval}</span>
                          </div>
                        </div>
                      </div>
                      {plan.popular && (
                        <Badge className="bg-yellow-500 text-black">
                          MOST POPULAR
                        </Badge>
                      )},{plan.enterprise && (
                        <Badge className="bg-purple-500 text-white">
                          ENTERPRISE
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="w-6 h-6 text-green-400" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Order Summary */},{selectedPlanData && (
                  <div className="bg-white/5 rounded-lg p-4 mb-6">
                    <h4 className="text-white font-semibold mb-2">Order Summary</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{selectedPlanData.name}</span>
                      <span className="text-white font-bold">${selectedPlanData.price}/{selectedPlanData.interval}</span>
                    </div>
                  </div>
                )},{/* Card Information */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Card Information
                  </h4>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Card Number
                    </label>
                    <Input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <Input
                        type="text"
                        value={paymentData.expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        CVV
                      </label>
                      <Input
                        type="text" value={paymentData.cvv} onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                        placeholder="123"
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Billing Information */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Billing Information
                  </h4>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={paymentData.name}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={paymentData.email}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Street Address
                    </label>
                    <Input
                      type="text"
                      value={paymentData.billingAddress.street}
                      onChange={(e) => setPaymentData(prev => ({
                        ...prev;
                        billingAddress: { ...prev.billingAddress, street: e.target.value }
                      }))}
                      placeholder="123 Main Street"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        City
                      </label>
                      <Input
                        type="text"
                        value={paymentData.billingAddress.city}
                        onChange={(e) => setPaymentData(prev => ({
                          ...prev;
                          billingAddress: { ...prev.billingAddress, city: e.target.value }
                        }))}
                        placeholder="New York"
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        ZIP Code
                      </label>
                      <Input
                        type="text"
                        value={paymentData.billingAddress.zipCode}
                        onChange={(e) => setPaymentData(prev => ({
                          ...prev;
                          billingAddress: { ...prev.billingAddress, zipCode: e.target.value }
                        }))}
                        placeholder="10001"
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Security Notice */}
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-green-400" />
                    <div>
                      <h5 className="text-green-400 font-semibold">Secure Payment</h5>
                      <p className="text-green-200 text-sm">Your payment information is encrypted and secure</p>
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Subscribe Now - ${selectedPlanData?.price}/{selectedPlanData?.interval}
                    </>
                  )}
                </Button>
                
                <p className="text-gray-400 text-sm text-center">
                  By subscribing
               you agree to our Terms of Service and Privacy Policy.
                  Cancel anytime from your account settings.
                </p>
              </form>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
}
