'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Shield,
  Globe,
  Crown,
  Lock,
  Database,
  Smartphone,
  DollarSign,
  TrendingUp,
  Target,
  Rocket,
  Star,
  CheckCircle,
} from 'lucide-react';

export default function EnterpriseFeatures() {
  const [selectedPlan, setSelectedPlan] = useState('enterprise');
  const [customQuote, setCustomQuote] = useState({
    users: 1000,
    volume: 10000000,
    features: [],
  });

  const enterprisePlans = [
    {
      id: 'startup',
      name: 'Startup Pro',
      price: '$2,999',
      period: '/month',
      description: 'Perfect for growing fintech startups',
      features: [
        'Up to 1,000 users',
        'Basic AI trading algorithms',
        'Standard API access',
        'Email support',
        'Basic analytics',
        'Mobile app access',
      ],
      color: 'from-blue-400 to-cyan-500',
      popular: false,
    },
    {
      id: 'enterprise',
      name: 'Enterprise Elite',
      price: '$9,999',
      period: '/month',
      description: 'Full-featured enterprise solution',
      features: [
        'Up to 10,000 users',
        'Advanced AI algorithms',
        'Full API access',
        '24/7 priority support',
        'Advanced analytics',
        'White-label options',
        'Custom integrations',
        'Dedicated account manager',
      ],
      color: 'from-purple-400 to-pink-500',
      popular: true,
    },
    {
      id: 'institutional',
      name: 'Institutional',
      price: '$49,999',
      period: '/month',
      description: 'For banks and large institutions',
      features: [
        'Unlimited users',
        'Quantum AI algorithms',
        'Custom API development',
        'Dedicated support team',
        'Real-time analytics',
        'Full white-label',
        'On-premise deployment',
        'Regulatory compliance',
        'Custom neural networks',
      ],
      color: 'from-yellow-400 to-orange-500',
      popular: false,
    },
  ];

  const whitelabelFeatures = [
    {
      title: 'Complete Branding',
      description: 'Your logo, colors, and branding throughout',
      icon: Crown,
    },
    {
      title: 'Custom Domain',
      description: 'yourcompany.com with SSL certificate',
      icon: Globe,
    },
    {
      title: 'Mobile Apps',
      description: 'iOS and Android apps with your branding',
      icon: Smartphone,
    },
    {
      title: 'API Integration',
      description: 'Seamless integration with your existing systems',
      icon: Database,
    },
  ];

  const complianceFeatures = [
    {
      title: 'SOC 2 Type II',
      status: 'Certified',
      icon: Shield,
    },
    {
      title: 'GDPR Compliant',
      status: 'Verified',
      icon: Lock,
    },
    {
      title: 'FINRA Approved',
      status: 'Registered',
      icon: Building2,
    },
    {
      title: 'ISO 27001',
      status: 'Certified',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Enterprise Plans */}
      <Card className="bg-gradient-to-r from-gray-900/90 to-black/90 border-2 border-cyan-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-3xl">
            <Building2 className="h-8 w-8 mr-3 text-cyan-400" />
            🏢 Enterprise Solutions
            <Badge className="ml-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-lg px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              ENTERPRISE READY
            </Badge>
          </CardTitle>
          <p className="text-gray-300 text-lg">
            Scale your business with our enterprise-grade AI trading platform
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {enterprisePlans.map((plan: any) => (
              <div
                key={plan.id}
                className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer ${
                  plan.popular
                    ? 'border-purple-400/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10 scale-105'
                    : 'border-gray-600/30 bg-gradient-to-br from-gray-800/20 to-gray-900/20 hover:scale-102'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 text-sm">
                      <Crown className="h-4 w-4 mr-1" />
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span
                      className={`text-4xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full bg-gradient-to-r ${plan.color} text-black font-bold py-3 text-lg hover:scale-105 transition-all`}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* White Label Solutions */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Crown className="h-7 w-7 mr-3 text-purple-400" />
            👑 White Label Solutions
            <Badge className="ml-3 bg-gradient-to-r from-purple-400 to-pink-500">
              <Rocket className="h-4 w-4 mr-1" />
              LAUNCH YOUR BRAND
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whitelabelFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-400/20 rounded-lg mr-4">
                      <IconComponent className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-400/30">
            <h3 className="text-white font-bold text-xl mb-4">🚀 Launch Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold">1</span>
                </div>
                <p className="text-white font-semibold">Setup</p>
                <p className="text-gray-400 text-sm">1-2 weeks</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold">2</span>
                </div>
                <p className="text-white font-semibold">Customization</p>
                <p className="text-gray-400 text-sm">2-3 weeks</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold">3</span>
                </div>
                <p className="text-white font-semibold">Testing</p>
                <p className="text-gray-400 text-sm">1 week</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold">4</span>
                </div>
                <p className="text-white font-semibold">Launch</p>
                <p className="text-gray-400 text-sm">Go Live!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance & Security */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Shield className="h-7 w-7 mr-3 text-green-400" />
            🔒 Compliance & Security
            <Badge className="ml-3 bg-gradient-to-r from-green-400 to-emerald-500">
              <Lock className="h-4 w-4 mr-1" />
              BANK-GRADE SECURITY
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30 text-center"
                >
                  <div className="p-4 bg-green-400/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                  <Badge className="bg-green-500">{feature.status}</Badge>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
              <h4 className="text-white font-bold mb-3">🔐 Data Protection</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• AES-256 encryption</li>
                <li>• Zero-knowledge architecture</li>
                <li>• Multi-factor authentication</li>
                <li>• Regular security audits</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30">
              <h4 className="text-white font-bold mb-3">📊 Regulatory Compliance</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• FINRA registered</li>
                <li>• SEC compliant</li>
                <li>• GDPR ready</li>
                <li>• SOX compliance</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-400/30">
              <h4 className="text-white font-bold mb-3">🏦 Financial Security</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• FDIC insured accounts</li>
                <li>• Segregated client funds</li>
                <li>• Real-time monitoring</li>
                <li>• Fraud detection AI</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Sharing Program */}
      <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <DollarSign className="h-7 w-7 mr-3 text-yellow-400" />
            💰 Revenue Sharing Program
            <Badge className="ml-3 bg-gradient-to-r from-yellow-400 to-orange-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              EARN TOGETHER
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">70%</div>
              <h3 className="text-white font-bold mb-2">Revenue Share</h3>
              <p className="text-gray-300 text-sm">
                You keep 70% of all subscription revenue from your platform
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">$50K+</div>
              <h3 className="text-white font-bold mb-2">Monthly Potential</h3>
              <p className="text-gray-300 text-sm">
                Top partners earn $50K+ per month in recurring revenue
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <h3 className="text-white font-bold mb-2">Support</h3>
              <p className="text-gray-300 text-sm">
                Dedicated partner success team to help you grow
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-400/30">
            <h3 className="text-white font-bold text-xl mb-4">🎯 Partner Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Marketing co-op funds</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Lead generation support</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Sales training program</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Technical integration help</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Enterprise Sales */}
      <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Target className="h-7 w-7 mr-3 text-cyan-400" />
            🎯 Ready to Scale Your Business?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">Get Custom Enterprise Quote</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm font-medium">Expected Users</label>
                  <Input
                    type="number"
                    value={customQuote.users}
                    onChange={e =>
                      setCustomQuote({ ...customQuote, users: Number(e.target.value) })
                    }
                    className="bg-black/20 border-cyan-400/30 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm font-medium">
                    Monthly Trading Volume ($)
                  </label>
                  <Input
                    type="number"
                    value={customQuote.volume}
                    onChange={e =>
                      setCustomQuote({ ...customQuote, volume: Number(e.target.value) })
                    }
                    className="bg-black/20 border-cyan-400/30 text-white"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold py-3">
                  Get Custom Quote
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30">
                <h4 className="text-white font-bold mb-3">📞 Enterprise Sales</h4>
                <p className="text-gray-300 mb-3">Speak with our enterprise team</p>
                <Button className="bg-green-500 hover:bg-green-600 text-black font-bold">
                  Schedule Demo Call
                </Button>
              </div>

              <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30">
                <h4 className="text-white font-bold mb-3">🚀 Fast Track Setup</h4>
                <p className="text-gray-300 mb-3">Get your platform live in 30 days</p>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold">
                  Start Fast Track
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
