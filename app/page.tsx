"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, TrendingUp, User, Bot, Brain, Zap, Crown } from "lucide-react"
import BankingDashboard from "./components/banking/BankingDashboard"
import InvestmentDashboard from "./components/investing/InvestmentDashboard"
import CustomizableProfile from "./components/profile/CustomizableProfile"
import UltraFastTradingEngine from "./components/trading/UltraFastTradingEngine"
import MembershipTiers from "./components/membership/MembershipTiers"
import AIStockTips from "./components/ai/AIStockTips"

const defaultUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  imageUrl: "https://github.com/shadcn.png",
  membership: "free", // free, basic, pro, ultimate
}

export default function IndexPage() {
  const [user, setUser] = useState(defaultUser)
  const [userBalance, setUserBalance] = useState(25750.43)
  const [userPortfolio, setUserPortfolio] = useState([])

  const handleMembershipUpgrade = (newTier) => {
    setUser((prev) => ({ ...prev, membership: newTier }))
    // In real app, this would process payment and update backend
    console.log(`Upgrading to ${newTier} membership`)
  }

  const getMembershipBadge = () => {
    const badges = {
      free: { color: "bg-gray-500", icon: User, text: "Free" },
      basic: { color: "bg-blue-500", icon: Zap, text: "Alpha Trader" },
      pro: { color: "bg-purple-500", icon: Bot, text: "Alpha Wolf" },
      ultimate: { color: "bg-yellow-500", icon: Crown, text: "Alpha Apex" },
    }
    return badges[user.membership] || badges.free
  }

  const membershipBadge = getMembershipBadge()
  const BadgeIcon = membershipBadge.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950/20 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Alpha Wolf StockX
              </h1>
              <p className="text-gray-400 mt-2">Ultimate AI-Powered Trading Platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-full ${membershipBadge.color} flex items-center space-x-2`}>
                <BadgeIcon className="h-4 w-4 text-white" />
                <span className="text-white font-semibold">{membershipBadge.text}</span>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-xl">${userBalance.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Account Balance</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="trading" className="space-y-6">
          <TabsList className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
            <TabsTrigger value="trading" className="data-[state=active]:bg-purple-500/20">
              <Zap className="h-4 w-4 mr-2" />
              Ultra-Fast Trading
            </TabsTrigger>
            <TabsTrigger value="ai-tips" className="data-[state=active]:bg-purple-500/20">
              <Brain className="h-4 w-4 mr-2" />
              AI Stock Tips
            </TabsTrigger>
            <TabsTrigger value="banking" className="data-[state=active]:bg-purple-500/20">
              <Building2 className="h-4 w-4 mr-2" />
              Banking
            </TabsTrigger>
            <TabsTrigger value="investing" className="data-[state=active]:bg-purple-500/20">
              <TrendingUp className="h-4 w-4 mr-2" />
              Investing
            </TabsTrigger>
            <TabsTrigger value="membership" className="data-[state=active]:bg-purple-500/20">
              <Crown className="h-4 w-4 mr-2" />
              Membership
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-500/20">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trading">
            <UltraFastTradingEngine user={user} membershipLevel={user.membership} />
          </TabsContent>

          <TabsContent value="ai-tips">
            <AIStockTips membershipLevel={user.membership} />
          </TabsContent>

          <TabsContent value="banking">
            <BankingDashboard user={{ ...user, balance: userBalance }} onUpdateBalance={setUserBalance} />
          </TabsContent>

          <TabsContent value="investing">
            <InvestmentDashboard user={{ ...user, balance: userBalance }} onUpdatePortfolio={setUserPortfolio} />
          </TabsContent>

          <TabsContent value="membership">
            <MembershipTiers currentTier={user.membership} onUpgrade={handleMembershipUpgrade} />
          </TabsContent>

          <TabsContent value="profile">
            <CustomizableProfile
              user={user}
              onUpdateProfile={(profileData) => {
                setUser((prev) => ({ ...prev, ...profileData }))
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
