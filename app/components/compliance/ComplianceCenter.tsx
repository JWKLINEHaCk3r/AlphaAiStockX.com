'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Lock,
  FileText,
  AlertTriangle,
  CheckCircle,
  Scale,
  Globe,
  Users,
  Clock,
  Award,
  BookOpen,
  Info,
} from 'lucide-react';

export default function ComplianceCenter() {
  const complianceItems = [
    {
      category: 'SEC Regulations',
      items: [
        {
          name: 'Regulation Best Interest (Reg BI)',
          status: 'compliant',
          description: 'Investment advice standards',
        },
        {
          name: 'Rule 15c3-5 Market Access',
          status: 'compliant',
          description: 'Risk management controls',
        },
        { name: 'Regulation SHO', status: 'compliant', description: 'Short sale regulations' },
        {
          name: 'Rule 606 Order Routing',
          status: 'compliant',
          description: 'Order execution disclosure',
        },
      ],
    },
    {
      category: 'FINRA Rules',
      items: [
        {
          name: 'Rule 3110 Supervision',
          status: 'compliant',
          description: 'Supervisory procedures',
        },
        {
          name: 'Rule 2111 Suitability',
          status: 'compliant',
          description: 'Investment suitability',
        },
        {
          name: 'Rule 4512 Customer Account',
          status: 'compliant',
          description: 'Account information',
        },
        { name: 'Rule 3240 Borrowing', status: 'compliant', description: 'Borrowing arrangements' },
      ],
    },
    {
      category: 'Data Protection',
      items: [
        { name: 'GDPR Compliance', status: 'compliant', description: 'EU data protection' },
        { name: 'CCPA Compliance', status: 'compliant', description: 'California privacy rights' },
        { name: 'SOC 2 Type II', status: 'certified', description: 'Security controls audit' },
        { name: 'ISO 27001', status: 'certified', description: 'Information security management' },
      ],
    },
    {
      category: 'Risk Management',
      items: [
        { name: 'Position Limits', status: 'active', description: 'Automated position monitoring' },
        { name: 'Circuit Breakers', status: 'active', description: 'Market volatility protection' },
        { name: 'Daily Loss Limits', status: 'active', description: 'Risk exposure controls' },
        {
          name: 'Emergency Procedures',
          status: 'active',
          description: 'Crisis management protocols',
        },
      ],
    },
  ];

  const disclaimers = [
    {
      title: 'Investment Risk Disclosure',
      content:
        'All investments involve risk, including potential loss of principal. Past performance does not guarantee future results. AI predictions are based on historical data and market analysis but cannot guarantee accuracy.',
      icon: AlertTriangle,
      type: 'warning',
    },
    {
      title: 'AI Technology Limitations',
      content:
        'Our AI systems provide analysis and recommendations based on available data. Market conditions can change rapidly, and AI predictions should be considered alongside other factors when making investment decisions.',
      icon: Info,
      type: 'info',
    },
    {
      title: 'Not Licensed Investment Advice',
      content:
        'AlphaAIStockX provides educational tools and analysis. This platform does not provide personalized investment advice. Users should consult with licensed financial advisors for investment guidance.',
      icon: BookOpen,
      type: 'educational',
    },
    {
      title: 'Data Security & Privacy',
      content:
        'We employ bank-level security measures including 256-bit AES encryption, multi-factor authentication, and regular security audits to protect your personal and financial information.',
      icon: Lock,
      type: 'security',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Compliance Overview */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Shield className="h-6 w-6 mr-3 text-green-400" />
            2025 Compliance Status
          </CardTitle>
          <CardDescription>
            Full regulatory compliance and risk management framework
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <p className="text-green-400 text-2xl font-bold">100%</p>
              <p className="text-gray-400 text-sm">SEC Compliant</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-8 w-8 text-white" />
              </div>
              <p className="text-blue-400 text-2xl font-bold">SOC 2</p>
              <p className="text-gray-400 text-sm">Type II Certified</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <p className="text-purple-400 text-2xl font-bold">GDPR</p>
              <p className="text-gray-400 text-sm">EU Compliant</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <p className="text-yellow-400 text-2xl font-bold">256-bit</p>
              <p className="text-gray-400 text-sm">AES Encryption</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {complianceItems.map((category, index) => (
          <Card key={index} className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Scale className="h-5 w-5 mr-2 text-purple-400" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`ml-3 ${
                        item.status === 'compliant'
                          ? 'border-green-500/30 text-green-400'
                          : item.status === 'certified'
                            ? 'border-blue-500/30 text-blue-400'
                            : 'border-yellow-500/30 text-yellow-400'
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Professional Disclaimers */}
      <Card className="bg-black/20 border-yellow-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <FileText className="h-6 w-6 mr-3 text-yellow-400" />
            Important Disclaimers & Legal Information
          </CardTitle>
          <CardDescription>Professional compliance and risk disclosures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {disclaimers.map((disclaimer, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  disclaimer.type === 'warning'
                    ? 'bg-red-900/20 border-red-500/30'
                    : disclaimer.type === 'info'
                      ? 'bg-blue-900/20 border-blue-500/30'
                      : disclaimer.type === 'educational'
                        ? 'bg-purple-900/20 border-purple-500/30'
                        : 'bg-green-900/20 border-green-500/30'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <disclaimer.icon
                    className={`h-6 w-6 mt-1 ${
                      disclaimer.type === 'warning'
                        ? 'text-red-400'
                        : disclaimer.type === 'info'
                          ? 'text-blue-400'
                          : disclaimer.type === 'educational'
                            ? 'text-purple-400'
                            : 'text-green-400'
                    }`}
                  />
                  <div>
                    <h4 className="text-white font-semibold mb-2">{disclaimer.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{disclaimer.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Controls */}
      <Card className="bg-black/20 border-red-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <AlertTriangle className="h-6 w-6 mr-3 text-red-400" />
            Active Risk Controls
          </CardTitle>
          <CardDescription>Real-time risk management and protection systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Position Limits', value: '$500K', status: 'Active', icon: Users },
              { name: 'Daily Loss Limit', value: '5%', status: 'Monitoring', icon: AlertTriangle },
              { name: 'Circuit Breakers', value: '10%', status: 'Armed', icon: Shield },
              { name: 'Emergency Stop', value: 'Instant', status: 'Ready', icon: Clock },
            ].map((control, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <control.icon className="h-5 w-5 text-red-400" />
                  <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                    {control.status}
                  </Badge>
                </div>
                <p className="text-white font-semibold">{control.name}</p>
                <p className="text-red-400 text-lg font-bold">{control.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact & Support */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-white font-bold text-xl mb-2">Need Compliance Support?</h3>
            <p className="text-gray-400 mb-4">
              Our compliance team is available 24/7 to assist with regulatory questions and
              requirements.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <FileText className="h-4 w-4 mr-2" />
                Download Compliance Report
              </Button>
              <Button variant="outline" className="border-purple-500/30">
                <Users className="h-4 w-4 mr-2" />
                Contact Compliance Team
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
