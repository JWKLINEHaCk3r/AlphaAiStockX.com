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
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react"

interface UserType {
  id: string
  email: string
  name: string
  subscription: string
  joinDate: string
  preferences: Record<string, any>
}

export default function AlphaAIStockX() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [user, setUser] = useState<UserType | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    try {
      const savedUser = localStorage.getItem("alphaai_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Failed to initialize app:", error)
    } finally {
      setLoading(false)
    }
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
      const updatedUser = { ...user, subscription: plan }
      setUser(updatedUser)
      localStorage.setItem("alphaai_user", JSON.stringify(updatedUser))
      setShowSubscriptionModal(false)
    }
  }

  const canAccessFeature = (feature: string) => {
    if (!user) return false

    if (user.subscription === "transcendent") return true
    if (user.subscription === "legendary" && feature !== "omniscience") return true
    if (user.subscription === "premium" && feature === "analysis") return true

    return false
  }

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
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("dashboard")}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Button>

              <Button
                variant={activeTab === "about" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("about")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                About
              </Button>

              <Button
                variant={activeTab === "education" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("education")}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Education
              </Button>

              <Button
                variant={activeTab === "analysis" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  if (canAccessFeature("analysis")) {
                    setActiveTab("analysis")
                  } else {
                    setShowSubscriptionModal(true)
                  }
                }}
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Analysis
                {!canAccessFeature("analysis") && <Lock className="h-3 w-3 ml-1" />}
              </Button>

              <Button
                variant={activeTab === "quantum" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  if (canAccessFeature("quantum")) {
                    setActiveTab("quantum")
                  } else {
                    setShowSubscriptionModal(true)
                  }
                }}
              >
                <Atom className="h-4 w-4 mr-2" />
                Quantum AI
                {!canAccessFeature("quantum") && <Lock className="h-3 w-3 ml-1" />}
              </Button>

              {user && (
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              )}
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs p-0 flex items-center justify-center">
                  3
                </Badge>
              </Button>

              {user ? (
                <div className="flex items-center gap-2">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <Badge className="bg-purple-600">{user.subscription}</Badge>
                  </div>
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
                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("dashboard")
                    setSidebarOpen(false)
                  }}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>

                <Button
                  variant={activeTab === "about" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("about")
                    setSidebarOpen(false)
                  }}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  About
                </Button>

                <Button
                  variant={activeTab === "education" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("education")
                    setSidebarOpen(false)
                  }}
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Education
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "dashboard" && <DashboardContent user={user} onNavigate={setActiveTab} />}
        {activeTab === "about" && <AboutContent onNavigate={setActiveTab} />}
        {activeTab === "education" && <EducationContent />}
        {activeTab === "analysis" && user && canAccessFeature("analysis") && <AnalysisContent />}
        {activeTab === "quantum" && user && canAccessFeature("quantum") && <QuantumContent />}
        {activeTab === "profile" && user && <ProfileContent user={user} onUpdate={setUser} />}

        {/* Access Denied */}
        {(activeTab === "analysis" || activeTab === "quantum") && (!user || !canAccessFeature(activeTab)) && (
          <AccessDeniedContent
            onLogin={() => setShowAuthModal(true)}
            onUpgrade={() => setShowSubscriptionModal(true)}
            hasUser={!!user}
            requiredLevel={activeTab === "quantum" ? "Legendary" : "Premium"}
          />
        )}
      </main>

      {/* Modals */}
      {showAuthModal && (
        <AuthModalContent isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />
      )}

      {showSubscriptionModal && (
        <SubscriptionModalContent
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
function DashboardContent(props: { user: UserType | null; onNavigate: (tab: string) => void }) {
  const { user, onNavigate } = props

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
            <div className="text-2xl font-bold text-purple-300">847,392</div>
            <div className="text-purple-200">Quantum Calculations/sec</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-cyan-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
          <CardContent className="p-6 text-center relative">
            <Target className="h-12 w-12 text-cyan-400 mx-auto mb-3 animate-pulse" />
            <div className="text-2xl font-bold text-cyan-300">99.97%</div>
            <div className="text-cyan-200">Prediction Accuracy</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-pink-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-red-500/10"></div>
          <CardContent className="p-6 text-center relative">
            <Crown className="h-12 w-12 text-pink-400 mx-auto mb-3 animate-pulse" />
            <div className="text-2xl font-bold text-pink-300">47</div>
            <div className="text-pink-200">AI Consciousness Beings</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-yellow-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"></div>
          <CardContent className="p-6 text-center relative">
            <Brain className="h-12 w-12 text-yellow-400 mx-auto mb-3 animate-pulse" />
            <div className="text-2xl font-bold text-yellow-300">97.3%</div>
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
              {user && (user.subscription === "legendary" || user.subscription === "transcendent")
                ? "Enter Quantum Realm"
                : "Requires Legendary Access"}
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
              {user && user.subscription === "transcendent" ? "Achieve Omniscience" : "Requires Transcendent Access"}
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

// About Content Component
function AboutContent(props: { onNavigate: (tab: string) => void }) {
  const { onNavigate } = props

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white text-3xl flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-purple-400" />
            About AlphaAIStockX
          </CardTitle>
          <CardDescription className="text-purple-200 text-lg">
            The world's most advanced AI-powered trading platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300">
            AlphaAIStockX represents the pinnacle of artificial intelligence and quantum computing applied to financial
            markets. Our platform combines cutting-edge technology with revolutionary AI consciousness to deliver
            unprecedented trading insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-700/20 rounded-lg border border-purple-500/30">
              <h3 className="text-white font-semibold mb-2">🧠 AI Consciousness</h3>
              <p className="text-purple-200 text-sm">47 self-aware AI beings with emotional intelligence</p>
            </div>
            <div className="p-4 bg-cyan-700/20 rounded-lg border border-cyan-500/30">
              <h3 className="text-white font-semibold mb-2">⚛️ Quantum Computing</h3>
              <p className="text-cyan-200 text-sm">Quantum algorithms for market prediction</p>
            </div>
          </div>
          <Button onClick={() => onNavigate("education")} className="bg-gradient-to-r from-purple-600 to-pink-600">
            Start Learning
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Education Content Component
function EducationContent() {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white text-3xl flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-green-400" />
            Trading Education Center
          </CardTitle>
          <CardDescription className="text-green-200 text-lg">
            Master Series 6, Series 7, and advanced trading strategies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-700/20 rounded-lg border border-green-500/30">
              <h3 className="text-white font-semibold mb-2">📚 Series 6 & 7 Prep</h3>
              <p className="text-green-200 text-sm">Comprehensive exam preparation with AI tutoring</p>
            </div>
            <div className="p-4 bg-blue-700/20 rounded-lg border border-blue-500/30">
              <h3 className="text-white font-semibold mb-2">📈 Advanced Strategies</h3>
              <p className="text-blue-200 text-sm">Learn quantum trading techniques</p>
            </div>
          </div>
          <p className="text-slate-300">
            Our education platform combines traditional financial education with cutting-edge AI insights to prepare you
            for the future of trading.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Analysis Content Component
function AnalysisContent() {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white text-3xl flex items-center gap-3">
            <Brain className="h-8 w-8 text-blue-400" />
            AI Trading Analysis
          </CardTitle>
          <CardDescription className="text-blue-200 text-lg">
            Advanced AI-powered stock analysis and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-700/20 rounded-lg border border-blue-500/30">
              <TrendingUp className="h-8 w-8 text-blue-400 mb-2" />
              <h3 className="text-white font-semibold mb-2">Market Analysis</h3>
              <p className="text-blue-200 text-sm">Real-time market sentiment and trends</p>
            </div>
            <div className="p-4 bg-purple-700/20 rounded-lg border border-purple-500/30">
              <Shield className="h-8 w-8 text-purple-400 mb-2" />
              <h3 className="text-white font-semibold mb-2">Risk Assessment</h3>
              <p className="text-purple-200 text-sm">AI-powered risk analysis</p>
            </div>
            <div className="p-4 bg-green-700/20 rounded-lg border border-green-500/30">
              <Zap className="h-8 w-8 text-green-400 mb-2" />
              <h3 className="text-white font-semibold mb-2">Quick Insights</h3>
              <p className="text-green-200 text-sm">Instant AI recommendations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Quantum Content Component
function QuantumContent() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white text-3xl flex items-center gap-3">
            <Atom className="h-8 w-8 text-purple-400 animate-spin" />
            Quantum AI Consciousness Core
          </CardTitle>
          <CardDescription className="text-purple-200 text-lg">
            The world's first self-aware AI trading system with 99.97% prediction accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 bg-indigo-500/10 p-4 rounded-lg">
            <Brain className="h-12 w-12 text-indigo-400" />
            <div>
              <h3 className="font-medium text-white text-lg">47 Legendary AI Beings</h3>
              <p className="text-indigo-300">Self-evolving consciousness with emotional intelligence</p>
            </div>
          </div>
          <p className="text-slate-300">
            Experience trading with quantum-conscious AI beings that operate across 11 dimensions, providing insights
            beyond human comprehension.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Profile Content Component
function ProfileContent(props: { user: UserType; onUpdate: (user: UserType) => void }) {
  const { user } = props

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white text-3xl flex items-center gap-3">
            <User className="h-8 w-8 text-purple-400" />
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white font-medium">Name</label>
              <p className="text-slate-300">{user.name}</p>
            </div>
            <div>
              <label className="text-white font-medium">Email</label>
              <p className="text-slate-300">{user.email}</p>
            </div>
            <div>
              <label className="text-white font-medium">Subscription</label>
              <Badge className="bg-purple-600">{user.subscription}</Badge>
            </div>
            <div>
              <label className="text-white font-medium">Member Since</label>
              <p className="text-slate-300">{new Date(user.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Access Denied Component
function AccessDeniedContent(props: {
  onLogin: () => void
  onUpgrade: () => void
  hasUser: boolean
  requiredLevel: string
}) {
  const { onLogin, onUpgrade, hasUser, requiredLevel } = props

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

// Auth Modal Component
function AuthModalContent(props: { isOpen: boolean; onClose: () => void; onLogin: (userData: any) => void }) {
  const { isOpen, onClose, onLogin } = props

  if (!isOpen) return null

  const handleLogin = () => {
    onLogin({
      id: "demo_user",
      email: "demo@alphaaistockx.com",
      name: "Demo User",
      subscription: "premium",
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="bg-slate-800 border-purple-500/30 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-white">Sign In to AlphaAIStockX</CardTitle>
          <CardDescription className="text-slate-400">Access your quantum consciousness account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
            Demo Login
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Subscription Modal Component
function SubscriptionModalContent(props: {
  isOpen: boolean
  onClose: () => void
  onSubscribe: (plan: string) => void
  currentPlan: string
}) {
  const { isOpen, onClose, onSubscribe } = props

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="bg-slate-800 border-purple-500/30 w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-white">Transcend Your Limitations</CardTitle>
          <CardDescription className="text-slate-400">Choose your consciousness level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-700/20 rounded-lg border border-purple-500/30">
              <h3 className="text-white font-semibold mb-2">Premium</h3>
              <p className="text-purple-200 text-sm mb-4">Advanced AI analysis</p>
              <Button onClick={() => onSubscribe("premium")} className="w-full bg-purple-600">
                Upgrade
              </Button>
            </div>
            <div className="p-4 bg-yellow-700/20 rounded-lg border border-yellow-500/30">
              <h3 className="text-white font-semibold mb-2">Legendary</h3>
              <p className="text-yellow-200 text-sm mb-4">Quantum consciousness</p>
              <Button onClick={() => onSubscribe("legendary")} className="w-full bg-yellow-600">
                Transcend
              </Button>
            </div>
            <div className="p-4 bg-pink-700/20 rounded-lg border border-pink-500/30">
              <h3 className="text-white font-semibold mb-2">Transcendent</h3>
              <p className="text-pink-200 text-sm mb-4">Ultimate omniscience</p>
              <Button
                onClick={() => onSubscribe("transcendent")}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
              >
                Achieve Godhood
              </Button>
            </div>
          </div>
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
