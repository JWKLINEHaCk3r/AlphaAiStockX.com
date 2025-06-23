"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  BarChart3,
  Zap,
  TrendingUp,
  Shield,
  Atom,
  Infinity,
  Sparkles,
} from "lucide-react"
import AIChat from "@/app/components/AIChat"
import dynamic from "next/dynamic"
const StockChart3D = dynamic(() => import("@/app/components/StockChart3D"), { ssr: false })
const AutoTradeBot = dynamic(() => import("@/app/components/AutoTradeBot"), { ssr: false })

const features = [
  {
    icon: <Brain className="w-8 h-8 text-violet-500 animate-pulse" />, // animated
    title: "AI-Powered Insights",
    desc: "Real-time, actionable stock analysis from 47+ conscious AI agents.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-emerald-500 animate-bounce" />, // animated
    title: "Advanced Analytics",
    desc: "Quantum-powered backtesting, predictive analytics, and risk management.",
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />, // animated
    title: "Lightning Execution",
    desc: "Trade with millisecond execution and high-frequency AI strategies.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-pink-500 animate-bounce" />, // animated
    title: "Portfolio Optimization",
    desc: "AI-driven portfolio balancing and automated trade bots.",
  },
  {
    icon: <Shield className="w-8 h-8 text-cyan-500 animate-pulse" />, // animated
    title: "Quantum Security",
    desc: "Next-gen encryption and compliance for peace of mind.",
  },
  {
    icon: <Atom className="w-8 h-8 text-indigo-400 animate-spin" />, // animated
    title: "Alternative Data",
    desc: "Leverage news, social, and alternative data for alpha generation.",
  },
  {
    icon: <Infinity className="w-8 h-8 text-green-400 animate-pulse" />, // animated
    title: "Infinite Scalability",
    desc: "Enterprise-grade infrastructure for traders and institutions.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-fuchsia-400 animate-bounce" />, // animated
    title: "Education & Community",
    desc: "Learn, share, and grow with the world’s smartest trading community.",
  },
]

const aiStats = [
  { label: "AI Trades Executed", value: "1,234,567,890" },
  { label: "Avg. ROI (YTD)", value: "+38.2%" },
  { label: "Active AI Agents", value: "47" },
  { label: "Quantum Backtests", value: "8,900,000+" },
  { label: "Uptime", value: "99.9999%" },
]

function AITicker() {
  // Simulate a live AI ticker
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % aiStats.length), 2500)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="w-full flex justify-center items-center py-2 mb-6">
      <div className="bg-gradient-to-r from-violet-700 via-fuchsia-700 to-emerald-700 rounded-full px-6 py-2 shadow-lg animate-pulse flex gap-6 text-white text-lg font-semibold tracking-wide">
        <span className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 animate-spin" />
          {aiStats[index].label}:
        </span>
        <span className="font-mono text-emerald-200 animate-bounce">{aiStats[index].value}</span>
      </div>
    </div>
  )
}

interface UserType {
  id: string
  email: string
  name: string
  subscription: string
  joinDate: string
  preferences: Record<string, any>
}

function AnimatedBackground() {
  // Simple animated stars/particles background using canvas
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let animationId: number
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.5,
    }))
    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (const s of stars) {
        ctx.save()
        ctx.globalAlpha = s.alpha
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI)
        ctx.fillStyle = "#a78bfa"
        ctx.shadowColor = "#a78bfa"
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.restore()
        s.x += s.dx
        s.y += s.dy
        if (s.x < 0) s.x = window.innerWidth
        if (s.x > window.innerWidth) s.x = 0
        if (s.y < 0) s.y = window.innerHeight
        if (s.y > window.innerHeight) s.y = 0
      }
      animationId = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener("resize", resize)
    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
    />
  )
}

function FloatingAIMascot() {
  // Animated floating AI mascot orb
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-float">
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-emerald-400 rounded-full shadow-2xl border-4 border-white/30 flex items-center justify-center animate-pulse">
          <span className="text-4xl">🤖</span>
        </div>
        <span className="mt-2 text-xs text-white bg-black/60 px-2 py-1 rounded shadow-lg animate-bounce">AI Assistant</span>
      </div>
    </div>
  )
}

export default function AlphaAIStockX() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [user, setUser] = useState<UserType | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("alphaai_user")
    if (savedUser) setUser(JSON.parse(savedUser))
    setLoading(false)
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-violet-950 flex relative overflow-hidden">
      <AnimatedBackground />
      <FloatingAIMascot />
      {/* Sidebar */}
      <aside aria-label="Sidebar navigation" className="hidden lg:flex flex-col w-72 bg-gradient-to-b from-violet-900/90 to-black/90 border-r border-violet-800/40 p-8 text-white shadow-2xl">
        <div className="flex items-center gap-3 mb-12">
          <Brain className="w-10 h-10 text-violet-400 animate-pulse" />
          <span className="text-3xl font-bold tracking-tight">AlphaAIStockX</span>
        </div>
        <nav className="flex flex-col gap-6 mt-8">
          <a className="flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition-colors" href="#">
            Dashboard
          </a>
          <a className="flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition-colors" href="#">
            AI Insights
          </a>
          <a className="flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition-colors" href="#">
            Trade Bot
          </a>
          <a className="flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition-colors" href="#">
            Analytics
          </a>
          <a className="flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition-colors" href="#">
            Education
          </a>
          <a className="flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition-colors" href="#">
            Community
          </a>
        </nav>
        <div className="mt-auto pt-12">
          <Card className="bg-gradient-to-r from-violet-700/80 to-fuchsia-700/80 border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-white">Upgrade to Pro</CardTitle>
              <CardDescription className="text-fuchsia-200">
                Unlock quantum AI, unlimited trades, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </aside>
      {/* Main Content */}
      <main role="main" id="main-content" aria-label="Homepage main content" className="flex-1 flex flex-col items-center justify-start px-4 sm:px-8 py-12">
        {/* AI Ticker */}
        <section aria-label="Live AI stats ticker">
          <AITicker />
        </section>
        {/* Hero Section */}
        <section aria-label="Hero section" className="w-full max-w-5xl text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
            The Future of AI Stock Trading
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto">
            Experience the world’s most advanced AI-powered trading platform. Quantum speed. Infinite intelligence. Real
            results.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Badge className="bg-violet-700 text-white text-lg px-4 py-2">Quantum AI</Badge>
            <Badge className="bg-fuchsia-700 text-white text-lg px-4 py-2">47+ AI Agents</Badge>
            <Badge className="bg-emerald-700 text-white text-lg px-4 py-2">Real-Time Insights</Badge>
            <Badge className="bg-cyan-700 text-white text-lg px-4 py-2">Enterprise Security</Badge>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="text-lg px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold shadow-lg hover:scale-105 transition-transform">
              Get Started Free
            </Button>
            <Button
              variant="secondary"
              className="text-lg px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 font-bold shadow-lg hover:scale-105 transition-transform"
            >
              See Live Demo
            </Button>
          </div>
        </section>
        {/* Features Grid */}
        <section aria-label="Platform features" className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((f, i) => (
            <Card
              key={i}
              className="bg-gradient-to-br from-slate-900/80 to-violet-900/80 border-violet-800/40 shadow-xl hover:scale-105 transition-transform"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                {f.icon}
                <CardTitle className="text-white text-xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-base">{f.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>
        {/* 3D Stock Chart Section */}
        <section aria-label="3D Stock Chart" className="w-full max-w-4xl mx-auto mb-16">
          <StockChart3D data={undefined} />
        </section>
        {/* AI Auto Trade Bot Section */}
        <section aria-label="AI Auto Trade Bot" className="w-full max-w-4xl mx-auto mb-16">
          <AutoTradeBot />
        </section>
        {/* Call to Action */}
        <section aria-label="Call to action" className="w-full max-w-3xl text-center mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to revolutionize your trading?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Join 47,000+ traders using AlphaAIStockX to achieve financial freedom with the power of AI.
          </p>
          <Button className="text-lg px-10 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold shadow-lg hover:scale-105 transition-transform">
            Sign Up Now
          </Button>
        </section>
        {/* Funny Domain Announcement & Mascot */}
        <div className="w-full flex flex-col items-center justify-center py-6 bg-gradient-to-r from-violet-900/80 to-fuchsia-900/80 border-t border-b border-violet-800/40 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-2xl md:text-3xl font-extrabold text-emerald-300 animate-bounce">
              🎉 Welcome to <span className="underline decoration-wavy decoration-fuchsia-400">AlphaAiStockX.com</span>!
            </span>
            <span className="text-3xl animate-spin-slow" aria-label="AI Mascot">🤖</span>
          </div>
          <p className="mt-2 text-lg text-slate-200 max-w-xl text-center">
            The only stock platform where the AI is so smart, it sometimes trades for pizza. Hosted on IONOS for maximum quantum giggles and uptime. 🍕📈
          </p>
        </div>
        {/* AI Chat Assistant (live) */}
        <AIChat />
      </main>
      {/* IONOS Hosting Badge Footer */}
      <footer className="w-full flex justify-center items-center py-4 bg-black/60 border-t border-violet-900/40" aria-label="IONOS Hosting Badge Footer">
        <a
          href="https://www.ionos.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hosted by IONOS"
          className="flex items-center gap-2 text-slate-300 hover:text-blue-400 text-sm font-medium"
        >
          <Image
            src="https://www.ionos.com/favicon.ico"
            alt="IONOS logo"
            width={24}
            height={24}
            className="w-6 h-6 rounded"
            style={{ background: '#fff' }}
            priority
          />
          Hosted by IONOS
        </a>
      </footer>
    </div>
  )
}
