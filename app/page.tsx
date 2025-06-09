"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, TrendingUp, User, Bot, Brain, Zap, Crown, Shield, Target } from "lucide-react"
import BankingDashboard from "./components/banking/BankingDashboard"
import InvestmentDashboard from "./components/investing/InvestmentDashboard"
import CustomizableProfile from "./components/profile/CustomizableProfile"
import UltraFastTradingEngine from "./components/trading/UltraFastTradingEngine"
import MembershipTiers from "./components/membership/MembershipTiers"
import AIStockTips from "./components/ai/AIStockTips"
import OwnerProfile from "./components/owner/OwnerProfile"
import EnhancedAdminDashboard from "./components/admin/EnhancedAdminDashboard"
import InvestorProfile from "./components/investor/InvestorProfile"

const defaultUser = {
  name: "Platform Owner",
  email: "owner@alphaaistockx.com",
  imageUrl: "https://github.com/shadcn.png",
  membership: "owner", // owner, investor, free, basic, pro, ultimate
  isOwner: true,
  isAdmin: true,
  isInvestor: true,
}

export default function IndexPage() {
  const [user, setUser] = useState(defaultUser)
  const [userBalance, setUserBalance] = useState(999999999) // Unlimited for owner
  const [userPortfolio, setUserPortfolio] = useState([])
  const [currentView, setCurrentView] = useState("investor") // owner, admin, investor, trading

  const handleMembershipUpgrade = (newTier) => {
    setUser((prev) => ({ ...prev, membership: newTier }))
    console.log(`Upgrading to ${newTier} membership`)
  }

  const getMembershipBadge = () => {
    const badges = {
      owner: { color: "bg-gradient-to-r from-yellow-500 to-orange-600", icon: Crown, text: "OWNER" },
      investor: { color: "bg-gradient-to-r from-blue-500 to-purple-600", icon: Target, text: "INVESTOR" },
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950/20 p-6 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                AlphaAIStockX
              </h1>
              <p className="text-gray-400 mt-2 text-lg">Revolutionary AI-Powered Trading Platform</p>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-semibold">LIVE • 47,892 Active Traders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-400 text-sm font-semibold">AI PROCESSING • 2.8M Data Points/sec</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`px-6 py-3 rounded-full ${membershipBadge.color} flex items-center space-x-2 shadow-2xl animate-pulse`}
              >
                <BadgeIcon className="h-5 w-5 text-white" />
                <span className="text-white font-bold text-lg">{membershipBadge.text}</span>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-2xl">
                  {user.membership === "owner" || user.membership === "investor"
                    ? "∞"
                    : `$${userBalance.toLocaleString()}`}
                </p>
                <p className="text-gray-400 text-sm">
                  {user.membership === "owner" || user.membership === "investor"
                    ? "Unlimited Access"
                    : "Account Balance"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {currentView === "owner" && user.isOwner && (
          <OwnerProfile
            user={user}
            onSwitchToAdmin={() => setCurrentView("admin")}
            onSwitchToInvestor={() => setCurrentView("investor")}
          />
        )}

        {currentView === "admin" && user.isAdmin && (
          <EnhancedAdminDashboard
            onSwitchToOwner={() => setCurrentView("owner")}
            onSwitchToInvestor={() => setCurrentView("investor")}
          />
        )}

        {currentView === "investor" && user.isInvestor && (
          <InvestorProfile
            onSwitchToOwner={() => setCurrentView("owner")}
            onSwitchToAdmin={() => setCurrentView("admin")}
          />
        )}

        {currentView === "trading" && (
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
        )}

        {/* Enhanced Quick Access Navigation */}
        {(user.isOwner || user.isAdmin || user.isInvestor) && (
          <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
            {user.isOwner && (
              <button
                onClick={() => setCurrentView("owner")}
                className={`p-4 rounded-full transition-all shadow-2xl ${
                  currentView === "owner"
                    ? "bg-gradient-to-r from-yellow-500 to-orange-600 scale-110 shadow-yellow-500/50"
                    : "bg-gray-800/80 hover:bg-gray-700/80 hover:scale-105"
                }`}
                title="Owner Dashboard"
              >
                <Crown className="h-6 w-6 text-white" />
              </button>
            )}
            {user.isAdmin && (
              <button
                onClick={() => setCurrentView("admin")}
                className={`p-4 rounded-full transition-all shadow-2xl ${
                  currentView === "admin"
                    ? "bg-gradient-to-r from-red-500 to-orange-600 scale-110 shadow-red-500/50"
                    : "bg-gray-800/80 hover:bg-gray-700/80 hover:scale-105"
                }`}
                title="Admin Panel"
              >
                <Shield className="h-6 w-6 text-white" />
              </button>
            )}
            {user.isInvestor && (
              <button
                onClick={() => setCurrentView("investor")}
                className={`p-4 rounded-full transition-all shadow-2xl ${
                  currentView === "investor"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-110 shadow-blue-500/50"
                    : "bg-gray-800/80 hover:bg-gray-700/80 hover:scale-105"
                }`}
                title="Investor Profile"
              >
                <Target className="h-6 w-6 text-white" />
              </button>
            )}
            <button
              onClick={() => setCurrentView("trading")}
              className={`p-4 rounded-full transition-all shadow-2xl ${
                currentView === "trading"
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 scale-110 shadow-purple-500/50"
                  : "bg-gray-800/80 hover:bg-gray-700/80 hover:scale-105"
              }`}
              title="Trading Platform"
            >
              <Zap className="h-6 w-6 text-white" />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}
