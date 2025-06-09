"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, X, Brain, Bot, Target, Sparkles } from "lucide-react"

export default function SubscriptionPlans({ currentPlan = null, onSelectPlan }) {
  const [billingCycle, setBillingCycle] = useState("yearly") // yearly, monthly

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Essential tools for market analysis",
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      features: [
        { name: "Real-time market data", included: true },
        { name: "Basic AI insights", included: true },
        { name: "Technical indicators", included: true },
        { name: "Portfolio tracking", included: true },
        { name: "News sentiment analysis", included: false },
        { name: "AI trading strategies", included: false },
        { name: "AutoTrade Bot", included: false },
        { name: "Risk analysis tools", included: false },
      ],
      cta: "Get Started",
      popular: false,
      color: "blue",
      icon: Target,
    },
    {
      id: "pro",
      name: "Pro",
      description: "Advanced tools for serious traders",
      monthlyPrice: 100.0,
      yearlyPrice: 999.99,
      features: [
        { name: "Real-time market data", included: true },
        { name: "Advanced AI insights", included: true },
        { name: "Technical indicators", included: true },
        { name: "Portfolio tracking & optimization", included: true },
        { name: "News sentiment analysis", included: true },
        { name: "5 AI trading strategies", included: true },
        { name: "AutoTrade Bot", included: false },
        { name: "Risk analysis tools", included: true },
      ],
      cta: "Upgrade Now",
      popular: true,
      color: "purple",
      icon: Brain,
    },
    {
      id: "ultimate",
      name: "Ultimate",
      description: "Full access to all premium features",
      monthlyPrice: 175.0,
      yearlyPrice: 1750.0,
      features: [
        { name: "Real-time market data", included: true },
        { name: "Advanced AI insights", included: true },
        { name: "Technical indicators", included: true },
        { name: "Portfolio tracking & optimization", included: true },
        { name: "News sentiment analysis", included: true },
        { name: "All AI trading strategies", included: true },
        { name: "AutoTrade Bot", included: true },
        { name: "Advanced risk analysis tools", included: true },
      ],
      cta: "Get Ultimate",
      popular: false,
      color: "pink",
      icon: Bot,
    },
  ]

  const getPrice = (plan) => {
    return billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice
  }

  const getSavings = (plan) => {
    const monthly = plan.monthlyPrice * 12
    const yearly = plan.yearlyPrice
    const savings = monthly - yearly
    const percentage = Math.round((savings / monthly) * 100)
    return { amount: savings.toFixed(2), percentage }
  }

  const getCardStyles = (plan) => {
    const isCurrentPlan = currentPlan === plan.id
    const baseStyles = "relative border transition-all"

    if (isCurrentPlan) {
      return `${baseStyles} bg-${plan.color}-500/10 border-${plan.color}-500/50`
    }

    if (plan.popular) {
      return `${baseStyles} bg-gradient-to-b from-purple-500/10 to-pink-500/10 border-purple-500/30`
    }

    return `${baseStyles} bg-black/20 border-white/10 hover:border-white/20`
  }

  const getButtonStyles = (plan) => {
    const isCurrentPlan = currentPlan === plan.id

    if (isCurrentPlan) {
      return "bg-gray-700 text-gray-300 cursor-not-allowed"
    }

    if (plan.id === "basic") {
      return "bg-blue-600 hover:bg-blue-700"
    }

    if (plan.id === "pro") {
      return "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
    }

    return "bg-pink-600 hover:bg-pink-700"
  }

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Choose Your Plan</h2>
        <div className="flex items-center space-x-4">
          <span className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-gray-400"}`}>Monthly</span>
          <Switch
            checked={billingCycle === "yearly"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
            className="data-[state=checked]:bg-purple-500"
          />
          <div className="flex items-center">
            <span className={`text-sm ${billingCycle === "yearly" ? "text-white" : "text-gray-400"}`}>Yearly</span>
            <Badge className="ml-2 bg-green-500 text-xs">Save 20%</Badge>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const IconComponent = plan.icon
          const isCurrentPlan = currentPlan === plan.id
          const price = getPrice(plan)
          const savings = billingCycle === "yearly" ? getSavings(plan) : null

          return (
            <Card key={plan.id} className={getCardStyles(plan)}>
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-full bg-${plan.color}-500/20`}>
                      <IconComponent className={`h-5 w-5 text-${plan.color}-400`} />
                    </div>
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-gray-400">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">${price}</span>
                    <span className="text-gray-400 ml-2">/{billingCycle === "yearly" ? "year" : "month"}</span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-sm text-green-400 mt-1">
                      Save ${savings.amount} ({savings.percentage}%)
                    </p>
                  )}
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-gray-300" : "text-gray-500"}>{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${getButtonStyles(plan)}`}
                  onClick={() => onSelectPlan(plan.id)}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? "Current Plan" : plan.cta}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
