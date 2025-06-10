"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, TrendingUp, User, Bot, Brain, Zap, Crown, Shield, Target, Palette, Rocket } from "lucide-react"
import BankingDashboard from "./components/banking/BankingDashboard"
import MoneyMarketAccount from "./components/banking/MoneyMarketAccount"
import InvestmentDashboard from "./components/investing/InvestmentDashboard"
import CustomizableProfile from "./components/profile/CustomizableProfile"
import UltraFastTradingEngine from "./components/trading/UltraFastTradingEngine"
import AutomatedTradingSystem from "./components/trading/AutomatedTradingSystem"
import AdvancedTradingStrategies from "./components/trading/AdvancedTradingStrategies"
import MembershipTiers from "./components/membership/MembershipTiers"
import QuantumAIEngine from "./components/ai/QuantumAIEngine"
import NeuralMarketAnalysis from "./components/ai/NeuralMarketAnalysis"
import ThemeCustomizer from "./components/theme/ThemeCustomizer"
import { NeonThemeProvider } from "./components/theme/NeonThemeProvider"
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
  const [currentView, setCurrentView] = useState("trading") // owner, admin, investor, trading

  const handleMembershipUpgrade = (newTier) => {
    setUser((prev) => ({ ...prev, membership: newTier }))
    console.log(`Upgrading to ${newTier} membership`)
  }

  const getMembershipBadge = () => {
    const badges = {
      owner: { color: "bg-gradient-to-r from-yellow-400 to-orange-500", icon: Crown, text: "OWNER" },
      investor: { color: "bg-gradient-to-r from-blue-400 to-purple-500", icon: Target, text: "INVESTOR" },
      free: { color: "bg-gray-500", icon: User, text: "Free" },
      basic: { color: "bg-blue-500", icon: Zap, text: "Alpha Trader" },
      pro: { color: "bg-purple-500", icon: Bot, text: "Alpha Wolf" },
      ultimate: { color: "bg-gradient-to-r from-cyan-400 to-pink-500", icon: Crown, text: "Alpha Apex" },
    }
    return badges[user.membership] || badges.free
  }

  const membershipBadge = getMembershipBadge()
  const BadgeIcon = membershipBadge.icon

  return (
    <NeonThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950/20 p-6 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -inset-10 opacity-40">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-green-400/30 to-emerald-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  ⚡ AlphaAIStockX
                </h1>
                <p className="text-gray-300 mt-3 text-xl">🚀 The World's Most Advanced AI Trading Platform</p>
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                    <span className="text-green-400 text-sm font-bold">LIVE • 127,892 Active Traders</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
                    <span className="text-cyan-400 text-sm font-bold">AI PROCESSING • 8.7M Data Points/sec</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
                    <span className="text-purple-400 text-sm font-bold">QUANTUM READY • 512 Qubits</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div
                  className={`px-8 py-4 rounded-full ${membershipBadge.color} flex items-center space-x-3 shadow-2xl animate-pulse border-2 border-white/20`}
                >
                  <BadgeIcon className="h-6 w-6 text-white" />
                  <span className="text-white font-bold text-xl">{membershipBadge.text}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-3xl">
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
            <Tabs defaultValue="automated" className="space-y-8">
              <TabsList className="bg-gradient-to-r from-gray-900/90 to-black/90 border-2 border-cyan-400/30 backdrop-blur-xl p-2">
                <TabsTrigger
                  value="automated"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-500 data-[state=active]:text-black"
                >
                  <Bot className="h-5 w-5 mr-2" />🤖 AI Auto-Trading
                </TabsTrigger>
                <TabsTrigger
                  value="strategies"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-pink-500 data-[state=active]:text-black"
                >
                  <Brain className="h-5 w-5 mr-2" />🧠 Advanced Strategies
                </TabsTrigger>
                <TabsTrigger
                  value="quantum"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-emerald-500 data-[state=active]:text-black"
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  ⚛️ Quantum AI
                </TabsTrigger>
                <TabsTrigger
                  value="neural"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-500 data-[state=active]:text-black"
                >
                  <Brain className="h-5 w-5 mr-2" />🔬 Neural Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="trading"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-red-500 data-[state=active]:text-black"
                >
                  <Zap className="h-5 w-5 mr-2" />⚡ Ultra-Fast Trading
                </TabsTrigger>
                <TabsTrigger
                  value="banking"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-cyan-500 data-[state=active]:text-black"
                >
                  <Building2 className="h-5 w-5 mr-2" />🏦 Banking & Money Market
                </TabsTrigger>
                <TabsTrigger
                  value="investing"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-teal-500 data-[state=active]:text-black"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />📈 Investing
                </TabsTrigger>
                <TabsTrigger
                  value="membership"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-indigo-500 data-[state=active]:text-black"
                >
                  <Crown className="h-5 w-5 mr-2" />👑 Membership
                </TabsTrigger>
                <TabsTrigger
                  value="theme"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-500 data-[state=active]:text-black"
                >
                  <Palette className="h-5 w-5 mr-2" />🎨 Themes
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-400 data-[state=active]:to-purple-500 data-[state=active]:text-black"
                >
                  <User className="h-5 w-5 mr-2" />👤 Profile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="automated">
                <AutomatedTradingSystem user={user} membershipLevel={user.membership} />
              </TabsContent>

              <TabsContent value="strategies">
                <AdvancedTradingStrategies />
              </TabsContent>

              <TabsContent value="quantum">
                <QuantumAIEngine />
              </TabsContent>

              <TabsContent value="neural">
                <NeuralMarketAnalysis />
              </TabsContent>

              <TabsContent value="trading">
                <UltraFastTradingEngine user={user} membershipLevel={user.membership} />
              </TabsContent>

              <TabsContent value="banking">
                <div className="space-y-8">
                  <BankingDashboard user={{ ...user, balance: userBalance }} onUpdateBalance={setUserBalance} />
                  <MoneyMarketAccount user={user} balance={userBalance} onUpdateBalance={setUserBalance} />
                </div>
              </TabsContent>

              <TabsContent value="investing">
                <InvestmentDashboard user={{ ...user, balance: userBalance }} onUpdatePortfolio={setUserPortfolio} />
              </TabsContent>

              <TabsContent value="membership">
                <MembershipTiers currentTier={user.membership} onUpgrade={handleMembershipUpgrade} />
              </TabsContent>

              <TabsContent value="theme">
                <ThemeCustomizer />
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
            <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
              {user.isOwner && (
                <button
                  onClick={() => setCurrentView("owner")}
                  className={`p-4 rounded-full transition-all shadow-2xl border-2 border-white/20 ${
                    currentView === "owner"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 scale-110 shadow-yellow-500/50 animate-pulse"
                      : "bg-gray-800/80 hover:bg-gray-700/80 hover:scale-105"
                  }`}
                  title="Owner Dashboard"
                >
                  <Crown className="h-7 w-7 text-white" />
                </button>
              )}
              {user.isAdmin && (
                <button
                  onClick={() => setCurrentView("admin")}
                  className={`p-4 rounded-full transition-all shadow-2xl border-2 border-white/20 ${
                    currentView === "admin"
                      ? "bg-gradient-to-r from-red-400 to-orange-500 scale-110 shadow-red-500/50 animate-pulse"
                      : "bg-gray-800/80 hover:bg-gray-700/80 hover:scale-105"
                  }`}
                  title="Admin Panel"
                >
                  <Shield className="h-7 w-7 text-white" />
                </button>
              )}
              {user.isInvestor && (
                <button
                  onClick={() => setCurrentView("investor")}
                  className={`p-4 rounded-full transition-all shadow-2xl border-2 border-white/20 ${
                    currentView === "investor"
                      ? "bg-gradient-to-r from-blue-400 to-purple-500 scale-110 shadow-blue-500/50 animate-pulse"
                      : "bg-gray-800/80 hover:bg-gray-700/80 hover:scale-105"
                  }`}
                  title="Investor Profile"
                >
                  <Target className="h-7 w-7 text-white" />
                </button>
              )}
              <button
                onClick={() => setCurrentView("trading")}
                className={`p-4 rounded-full transition-all shadow-2xl border-2 border-white/20 ${
                  currentView === "trading"
                    ? "bg-gradient-to-r from-cyan-400 to-pink-500 scale-110 shadow-cyan-500/50 animate-pulse"
                    : "bg-gray-800/80 hover:bg-gray-700/80 hover:scale-105"
                }`}
                title="Trading Platform"
              >
                <Zap className="h-7 w-7 text-white" />
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
          .animation-delay-6000 {
            animation-delay: 6s;
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
    </NeonThemeProvider>
  )
}
