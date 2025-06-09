"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle, Eye, Lock, FileText, Scale } from "lucide-react"

export default function ComplianceCenter() {
  const regulations = [
    {
      title: "SEC Regulation Best Interest (Reg BI)",
      status: "compliant",
      description: "Ensures investment advice is in the best interest of retail customers",
      lastUpdated: "2024-12-01",
      category: "Investment Advisory",
    },
    {
      title: "FINRA Rule 3110 - Supervision",
      status: "compliant",
      description: "Comprehensive supervision of trading activities and customer accounts",
      lastUpdated: "2024-12-01",
      category: "Supervision",
    },
    {
      title: "SEC Rule 15c3-5 - Market Access",
      status: "compliant",
      description: "Risk management controls for market access and algorithmic trading",
      lastUpdated: "2024-12-01",
      category: "Market Access",
    },
    {
      title: "Regulation SHO - Short Sales",
      status: "compliant",
      description: "Rules governing short sales and locate requirements",
      lastUpdated: "2024-12-01",
      category: "Trading Rules",
    },
    {
      title: "GDPR - Data Protection",
      status: "compliant",
      description: "European data protection and privacy regulations",
      lastUpdated: "2024-12-01",
      category: "Data Privacy",
    },
    {
      title: "CCPA - California Consumer Privacy Act",
      status: "compliant",
      description: "California state privacy law for consumer data protection",
      lastUpdated: "2024-12-01",
      category: "Data Privacy",
    },
  ]

  const riskControls = [
    {
      name: "Position Limits",
      status: "active",
      description: "Maximum position size limits per security and portfolio",
      threshold: "$500,000",
    },
    {
      name: "Daily Loss Limits",
      status: "active",
      description: "Maximum daily loss limits to prevent excessive risk",
      threshold: "$50,000",
    },
    {
      name: "Circuit Breakers",
      status: "active",
      description: "Automatic trading halts during extreme market volatility",
      threshold: "10% move",
    },
    {
      name: "Kill Switch",
      status: "active",
      description: "Emergency stop for all trading activities",
      threshold: "Instant",
    },
  ]

  const disclaimers = [
    {
      title: "Investment Risk Disclosure",
      content:
        "All investments involve risk, including the potential loss of principal. Past performance does not guarantee future results. The value of investments may fluctuate and investors may lose money.",
      icon: AlertTriangle,
      color: "text-yellow-400",
    },
    {
      title: "AI Technology Limitations",
      content:
        "AI predictions and analysis are based on historical data and algorithms. Market conditions can change rapidly, and AI models may not account for all variables affecting security prices.",
      icon: Eye,
      color: "text-blue-400",
    },
    {
      title: "Not Licensed Investment Advice",
      content:
        "AlphaAIStockX is not a licensed investment advisor. The platform provides educational tools and analysis for informational purposes only. Consult qualified professionals before making investment decisions.",
      icon: Scale,
      color: "text-red-400",
    },
    {
      title: "Educational Purpose Only",
      content:
        "This platform is designed for educational purposes and to provide advanced trading tools. Users are responsible for their own investment decisions and should never invest more than they can afford to lose.",
      icon: FileText,
      color: "text-green-400",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <Card className="bg-gradient-to-r from-green-900/60 to-emerald-900/60 border-green-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center">
            <Shield className="mr-2" size={20} />
            2025 Compliance Status
            <Badge className="ml-3 bg-green-500">
              <CheckCircle className="h-3 w-3 mr-1" />
              FULLY COMPLIANT
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
              <p className="text-sm text-gray-400">Regulatory Compliance</p>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <p className="text-sm text-gray-400">Monitoring Active</p>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg">
              <div className="text-3xl font-bold text-purple-400 mb-2">6</div>
              <p className="text-sm text-gray-400">Regulations Covered</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regulatory Compliance */}
      <Card className="bg-gray-900/60 border-blue-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center">
            <Scale className="mr-2" size={20} />
            Regulatory Compliance Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regulations.map((reg, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{reg.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {reg.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      {reg.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">{reg.description}</p>
                <p className="text-gray-500 text-xs">Last Updated: {reg.lastUpdated}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Management Controls */}
      <Card className="bg-gray-900/60 border-orange-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center">
            <Shield className="mr-2" size={20} />
            Risk Management Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskControls.map((control, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{control.name}</h4>
                  <Badge className="bg-orange-500">
                    <Eye className="h-3 w-3 mr-1" />
                    {control.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm mb-2">{control.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Threshold:</span>
                  <span className="text-orange-400 font-semibold">{control.threshold}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legal Disclaimers */}
      <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center">
            <AlertTriangle className="mr-2" size={20} />
            Important Legal Disclaimers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disclaimers.map((disclaimer, index) => {
              const IconComponent = disclaimer.icon
              return (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/30"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <IconComponent className={`h-5 w-5 ${disclaimer.color}`} />
                    <h4 className="text-white font-semibold">{disclaimer.title}</h4>
                  </div>
                  <p className="text-gray-300 text-sm">{disclaimer.content}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Data Security & Privacy */}
      <Card className="bg-gray-900/60 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center">
            <Lock className="mr-2" size={20} />
            Data Security & Privacy Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Security Measures</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                  <span className="text-purple-400">256-bit AES Encryption</span>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                  <span className="text-purple-400">Multi-Factor Authentication</span>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                  <span className="text-purple-400">SOC 2 Type II Compliance</span>
                  <Badge className="bg-green-500">Certified</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                  <span className="text-purple-400">Regular Security Audits</span>
                  <Badge className="bg-green-500">Monthly</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Privacy Controls</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-blue-400">Data Anonymization</span>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-blue-400">Right to be Forgotten</span>
                  <Badge className="bg-green-500">Supported</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-blue-400">Data Portability</span>
                  <Badge className="bg-green-500">Available</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-blue-400">Consent Management</span>
                  <Badge className="bg-green-500">Granular</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
