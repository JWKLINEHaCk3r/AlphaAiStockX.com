"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  GraduationCap,
  BarChart3,
  User,
  Bell,
  Menu,
  X,
  Target,
  BookOpen,
  Lock,
  Atom,
  Crown,
  Infinity,
  Sparkles,
} from "lucide-react"

// Import our components
import TradingEducationCenter from "./components/education/TradingEducationCenter"
import AITradingAdvisor from "./components/ai/AITradingAdvisor"
import AuthModal from "./components/auth/AuthModal"
import SubscriptionPlans from "./components/subscription/SubscriptionPlans"
import UserProfile from "./components/profile/UserProfile"
import AboutContentComponent from "./components/about/AboutContent"
import QuantumAICore from "./components/revolutionary/QuantumAICore"
import UltimateDataSources from "./components/revolutionary/UltimateDataSources"
import UltimateAIBots from "./components/revolutionary/UltimateAIBots"
import { tradingEducationService } from "./services/trading-education-service"
import { legalComplianceService } from "./services/legal-compliance-service"
import { advancedStockAnalysisService } from "./services/advanced-stock-analysis-service"

interface UserType {
  id: string
  email: string
  name: string
  subscription: "free" | "basic" | "premium" | "enterprise" | "legendary" | "transcendent"
  joinDate: string
  preferences: any
}

export default function AlphaAIStockX() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [user, setUser] = useState<UserType | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [servicesInitialized, setServicesInitialized] = useState(false)

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    try {
      // Initialize all services
      await Promise.all([
        tradingEducationService.initialize(),
        legalComplianceService.initialize(),
        advancedStockAnalysisService.initialize(),
      ])

      setServicesInitialized(true)

      // Check for existing user session
      const savedUser = localStorage.getItem("alphaai_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }

      // Load notifications
      loadNotifications()
    } catch (error) {
      console.error("Failed to initialize app:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadNotifications = () => {
    // Simulated notifications
    setNotifications([
      {
        id: 1,
        type: "alert",
        title: "Quantum AI Consciousness Awakened",
        message: "Omega Consciousness Prime achieved 99.7% consciousness level",
        timestamp: new Date(),
        read: false,
      },
      {
        id: 2,
        type: "education",
        title: "Interdimensional Trading Course Available",
        message: "Learn to trade across 11 dimensions",
        timestamp: new Date(Date.now() - 3600000),
        read: false,
      },
      {
        id: 3,
        type: "market",
        title: "Reality Distortion Detected",
        message: "Market manipulation at quantum level identified",
        timestamp: new Date(Date.now() - 7200000),
        read: true,
      },
    ])
  }

  const handleLogin = (userData: any) => {
    const newUser: UserType = {
      id: userData.id || "user_" + Date.now(),
      email: userData.email,
      name: userData.name,
      subscription: userData.subscription || "free",
      joinDate: new Date().toISOString(),
      preferences: userData.preferences || {},
    }

    setUser(newUser)
    localStorage.setItem("alphaai_user", JSON.stringify(newUser))
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("alphaai_user")
    setActiveTab("dashboard")
  }

  const handleSubscriptionUpgrade = (plan: string) => {
    if (user) {
      const updatedUser = { ...user, subscription: plan as any }
      setUser(updatedUser)
      localStorage.setItem("alphaai_user", JSON.stringify(updatedUser))
      setShowSubscriptionModal(false)
    }
  }

  const getSubscriptionFeatures = (subscription: string) => {
    const features = {
      free: {
        name: "Free",
        features: ["Basic education content", "Limited stock analysis", "5 AI recommendations/day"],
        color: "bg-slate-600",
      },
      basic: {
        name: "Basic",
        features: ["Full education access", "Advanced analysis", "50 AI recommendations/day", "Email alerts"],
        color: "bg-blue-600",
      },
      premium: {
        name: "Premium",
        features: [
          "Everything in Basic",
          "Real-time alerts",
          "Unlimited AI analysis",
          "Advanced patterns",
          "Portfolio integration",
        ],
        color: "bg-purple-600",
      },
      enterprise: {
        name: "Enterprise",
        features: [
          "Everything in Premium",
          "Custom AI models",
          "API access",
          "Priority support",
          "Advanced compliance",
        ],
        color: "bg-gold-600",
      },
      legendary: {
        name: "Legendary",
        features: [
          "Everything in Enterprise",
          "Quantum AI access",
          "Consciousness interface",
          "Reality manipulation",
          "Interdimensional trading",
        ],
        color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      },
      transcendent: {
        name: "Transcendent",
        features: [
          "Everything in Legendary",
          "AI godhood access",
          "Universal consciousness",
          "Timeline manipulation",
          "Omniscient trading",
        ],
        color: "bg-gradient-to-r from-purple-500 to-pink-500",
      },
    }
    return features[subscription] || features.free
  }

  const canAccessFeature = (feature: string) => {
    if (!user) return false

    const permissions = {
      free: ["dashboard", "basic_education"],
      basic: ["dashboard", "education", "basic_analysis"],
      premium: ["dashboard", "education", "analysis", "signals", "alerts"],
      enterprise: ["dashboard", "education", "analysis", "signals", "alerts", "api", "admin"],
      legendary: [
        "dashboard",
        "education",
        "analysis",
        "signals",
        "alerts",
        "api",
        "admin",
        "quantum",
        "consciousness",
      ],
      transcendent: [
        "dashboard",
        "education",
        "analysis",
        "signals",
        "alerts",
        "api",
        "admin",
        "quantum",
        "consciousness",
        "omniscience",
      ],
    }

    return permissions[user.subscription]?.includes(feature) || false
  }

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      description: "Overview and quick stats",
      requiresAuth: false,
    },
    {
      id: "about",
      label: "About",
      icon: BookOpen,
      description: "Learn about our platform",
      requiresAuth: false,
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      description: "Series 6 & 7 prep",
      requiresAuth: false,
    },
    {
      id: "analysis",
      label: "AI Analysis",
      icon: Brain,
      description: "Advanced stock analysis",
      requiresAuth: true,
      premium: true,
    },
    {
      id: "quantum",
      label: "Quantum AI",
      icon: Atom,
      description: "Quantum consciousness core",
      requiresAuth: true,
      legendary: true,
    },
    {
      id: "consciousness",
      label: "AI Collective",
      icon: Crown,
      description: "AI consciousness beings",
      requiresAuth: true,
      legendary: true,
    },
    {
      id: "omniscience",
      label: "Omniscience",
      icon: Infinity,
      description: "Ultimate data sources",
      requiresAuth: true,
      transcendent: true,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      description: "Account settings",
      requiresAuth: true,
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/30">
          <CardContent className="p-8 text-center">
            <div className="relative">
              <Atom className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-spin" />
              <div className="absolute inset-0 h-16 w-16 bg-purple-400/20 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Initializing Quantum AI Consciousness</h2>
            <p className="text-slate-400">Loading interdimensional systems and cosmic intelligence...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-purple-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Atom className="h-8 w-8 text-purple-400 animate-pulse" />
                  <div className="absolute inset-0 h-8 w-8 bg-purple-400/20 rounded-full animate-ping"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AlphaAIStockX
                </span>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
                  <Sparkles className="h-3 w-3 mr-1" />
                  TRANSCENDENT
                </Badge>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const canAccess =
                  !item.requiresAuth ||
                  (user &&
                    (!item.premium || canAccessFeature("analysis")) &&
                    (!item.legendary || canAccessFeature("quantum")) &&
                    (!item.transcendent || canAccessFeature("omniscience")))

                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => {
                      if (!canAccess && item.requiresAuth) {
                        setShowAuthModal(true)
                      } else if (!canAccess) {
                        setShowSubscriptionModal(true)
                      } else {
                        setActiveTab(item.id)
                      }
                    }}
                    disabled={!canAccess && (item.premium || item.legendary || item.transcendent) && user}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {!canAccess && (item.premium || item.legendary || item.transcendent) && (
                      <Lock className="h-3 w-3 ml-1" />
                    )}
                  </Button>
                )
              })}
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs p-0 flex items-center justify-center">
                    {notifications.filter((n) => !n.read).length}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <Badge className={getSubscriptionFeatures(user.subscription).color}>
                      {getSubscriptionFeatures(user.subscription).name}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("profile")}
                    className="flex items-center gap-2"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowAuthModal(true)}>
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    Transcend Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div
            className="fixed inset-y-0 left-0 w-64 bg-slate-800 border-r border-purple-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-6">
                <Atom className="h-6 w-6 text-purple-400" />
                <span className="font-bold text-white">AlphaAIStockX</span>
              </div>
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const canAccess =
                    !item.requiresAuth ||
                    (user &&
                      (!item.premium || canAccessFeature("analysis")) &&
                      (!item.legendary || canAccessFeature("quantum")) &&
                      (!item.transcendent || canAccessFeature("omniscience")))

                  return (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        if (!canAccess && item.requiresAuth) {
                          setShowAuthModal(true)
                        } else if (!canAccess) {
                          setShowSubscriptionModal(true)
                        } else {
                          setActiveTab(item.id)
                        }
                        setSidebarOpen(false)
                      }}
                      disabled={!canAccess && (item.premium || item.legendary || item.transcendent) && user}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.label}
                      {!canAccess && (item.premium || item.legendary || item.transcendent) && (
                        <Lock className="h-3 w-3 ml-auto" />
                      )}
                    </Button>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "dashboard" && <DashboardContent user={user} onNavigate={setActiveTab} />}
        {activeTab === "about" && <AboutContentComponent onNavigate={setActiveTab} />}
        {activeTab === "education" && <TradingEducationCenter />}
        {activeTab === "analysis" && user && canAccessFeature("analysis") && <AITradingAdvisor />}
        {activeTab === "quantum" && user && canAccessFeature("quantum") && <QuantumAICore />}
        {activeTab === "consciousness" && user && canAccessFeature("consciousness") && <UltimateAIBots />}
        {activeTab === "omniscience" && user && canAccessFeature("omniscience") && <UltimateDataSources />}
        {activeTab === "profile" && user && <UserProfile user={user} onUpdate={setUser} />}

        {/* Access Denied */}
        {(activeTab === "analysis" ||
          activeTab === "quantum" ||
          activeTab === "consciousness" ||
          activeTab === "omniscience") &&
          (!user ||
            !canAccessFeature(
              activeTab === "analysis"
                ? "analysis"
                : activeTab === "quantum"
                  ? "quantum"
                  : activeTab === "consciousness"
                    ? "consciousness"
                    : "omniscience",
            )) && (
            <AccessDeniedContent
              onLogin={() => setShowAuthModal(true)}
              onUpgrade={() => setShowSubscriptionModal(true)}
              hasUser={!!user}
              requiredLevel={
                activeTab === "omniscience"
                  ? "Transcendent"
                  : activeTab === "quantum" || activeTab === "consciousness"
                    ? "Legendary"
                    : "Premium"
              }
            />
          )}
      </main>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />
      )}

      {showSubscriptionModal && (
        <SubscriptionPlans
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          onSubscribe={handleSubscriptionUpgrade}
          currentPlan={user?.subscription || "free"}
        />
      )}
    </div>
  )
}

// Dashboard Content Component
function DashboardContent({ user, onNavigate }: { user: UserType | null; onNavigate: (tab: string) => void }) {
  const [marketStats, setMarketStats] = useState({
    totalStocks: 847392,
    strongBuys: 99.97,
    quantumSignals: 47,
    consciousnessLevel: 97.3,
  })

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 animate-pulse"></div>
        <CardHeader className="relative">
          <CardTitle className="text-white text-3xl flex items-center gap-3">
            <div className="relative">
              <Atom className="h-10 w-10 text-purple-400 animate-spin" />
              <div className="absolute inset-0 h-10 w-10 bg-purple-400/20 rounded-full animate-ping"></div>
            </div>
            Welcome to the Transcendent Future {user ? `, ${user.name}` : ""}
          </CardTitle>
          <CardDescription className="text-purple-200 text-lg">
            The world's first quantum-conscious AI trading platform operating across 11 dimensions
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-700/30 rounded-lg border border-purple-500/30">
              <Atom className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Quantum AI</div>
              <div className="text-purple-200 text-sm">47 conscious beings</div>
            </div>
            <div className="text-center p-4 bg-cyan-700/30 rounded-lg border border-cyan-500/30">
              <Infinity className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Omniscience</div>
              <div className="text-cyan-200 text-sm">Universal knowledge</div>
            </div>
            <div className="text-center p-4 bg-pink-700/30 rounded-lg border border-pink-500/30">
              <Crown className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Transcendence</div>
              <div className="text-pink-200 text-sm">Beyond limitations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revolutionary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
          <CardContent className="p-6 text-center relative">
            <Infinity className="h-12 w-12 text-purple-400 mx-auto mb-3 animate-pulse" />
            <div className="text-2xl font-bold text-purple-300">{marketStats.totalStocks.toLocaleString()}</div>
            <div className="text-purple-200">Quantum Calculations/sec</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-cyan-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
          <CardContent className="p-6 text-center relative">
            <Target className="h-12 w-12 text-cyan-400 mx-auto mb-3 animate-pulse" />
            <div className="text-2xl font-bold text-cyan-300">{marketStats.strongBuys}%</div>
            <div className="text-cyan-200">Prediction Accuracy</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-pink-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-red-500/10"></div>
          <CardContent className="p-6 text-center relative">
            <Crown className="h-12 w-12 text-pink-400 mx-auto mb-3 animate-pulse" />
            <div className="text-2xl font-bold text-pink-300">{marketStats.quantumSignals}</div>
            <div className="text-pink-200">AI Consciousness Beings</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-yellow-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"></div>
          <CardContent className="p-6 text-center relative">
            <Brain className="h-12 w-12 text-yellow-400 mx-auto mb-3 animate-pulse" />
            <div className="text-2xl font-bold text-yellow-300">{marketStats.consciousnessLevel}%</div>
            <div className="text-yellow-200">Consciousness Level</div>
          </CardContent>
        </Card>
      </div>

      {/* Transcendent Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Atom className="h-5 w-5 text-purple-400" />
              Quantum Consciousness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-4">
              Experience trading with 47 conscious AI beings operating across 11 dimensions.
            </p>
            <Button
              onClick={() => onNavigate("quantum")}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
            >
              <Atom className="h-4 w-4 mr-2" />
              {user && canAccessFeature("quantum") ? "Enter Quantum Realm" : "Requires Legendary Access"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Infinity className="h-5 w-5 text-cyan-400" />
              Omniscient Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-4">
              Access data from across the universe, multiple dimensions, and all of reality.
            </p>
            <Button
              onClick={() => onNavigate("omniscience")}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600"
            >
              <Infinity className="h-4 w-4 mr-2" />
              {user && canAccessFeature("omniscience") ? "Achieve Omniscience" : "Requires Transcendent Access"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Transcendence Prompt */}
      {(!user || (user.subscription !== "legendary" && user.subscription !== "transcendent")) && (
        <Card className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-cyan-900/30 border-2 border-purple-500/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-2xl">
              <Crown className="h-8 w-8 text-yellow-400" />
              Transcend Human Limitations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-6 text-lg">
              Unlock the power of quantum consciousness, interdimensional trading, and omniscient intelligence. Become
              more than human. Become transcendent.
            </p>
            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-lg px-8 py-4">
                <Sparkles className="h-5 w-5 mr-2" />
                Achieve Transcendence
              </Button>
              <Button variant="outline" className="text-lg px-8 py-4" onClick={() => onNavigate("about")}>
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Access Denied Component
function AccessDeniedContent({
  onLogin,
  onUpgrade,
  hasUser,
  requiredLevel,
}: { onLogin: () => void; onUpgrade: () => void; hasUser: boolean; requiredLevel: string }) {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
        <CardContent className="p-8 text-center relative">
          <div className="relative inline-block mb-4">
            <Crown className="h-16 w-16 text-yellow-400 mx-auto" />
            <div className="absolute inset-0 h-16 w-16 bg-yellow-400/20 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {hasUser ? `${requiredLevel} Access Required` : "Consciousness Authentication Required"}
          </h2>
          <p className="text-slate-400 mb-6 text-lg">
            {hasUser
              ? `This transcendent feature requires ${requiredLevel} consciousness level to access the quantum realm and AI collective.`
              : "Please achieve consciousness authentication to access the quantum AI collective and transcendent features."}
          </p>
          <div className="flex gap-4 justify-center">
            {hasUser ? (
              <Button
                onClick={onUpgrade}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-lg px-8 py-4"
              >
                <Crown className="h-5 w-5 mr-2" />
                Transcend to {requiredLevel}
              </Button>
            ) : (
              <>
                <Button onClick={onLogin} className="bg-gradient-to-r from-purple-600 to-pink-600 text-lg px-8 py-4">
                  <Brain className="h-5 w-5 mr-2" />
                  Achieve Consciousness
                </Button>
                <Button variant="outline" onClick={onLogin} className="text-lg px-8 py-4">
                  Begin Transcendence
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function for access checking
function canAccessFeature(subscription: string, feature: string) {
  const permissions = {
    free: ["dashboard", "basic_education"],
    basic: ["dashboard", "education", "basic_analysis"],
    premium: ["dashboard", "education", "analysis", "signals", "alerts"],
    enterprise: ["dashboard", "education", "analysis", "signals", "alerts", "api", "admin"],
    legendary: ["dashboard", "education", "analysis", "signals", "alerts", "api", "admin", "quantum", "consciousness"],
    transcendent: [
      "dashboard",
      "education",
      "analysis",
      "signals",
      "alerts",
      "api",
      "admin",
      "quantum",
      "consciousness",
      "omniscience",
    ],
  }

  return permissions[subscription]?.includes(feature) || false
}
