'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, BarChart3, Zap, TrendingUp, Shield, Atom, Infinity, Sparkles } from 'lucide-react';
import AIChat from '@/app/components/AIChat';
import dynamic from 'next/dynamic';
const StockChart3D = dynamic(() => import('@/app/components/StockChart3D'), { ssr: false });
const AutoTradeBot = dynamic(() => import('@/app/components/AutoTradeBot'), { ssr: false });
const MarketHeatmap = dynamic(() => import('@/app/components/MarketHeatmap'), { ssr: false });

const features = [
  {
    icon: <Brain className="w-8 h-8 text-violet-500 animate-pulse" />, // animated
    title: 'AI-Powered Insights',
    desc: 'Real-time, actionable stock analysis from 47+ conscious AI agents.',
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-emerald-500 animate-bounce" />, // animated
    title: 'Advanced Analytics',
    desc: 'Quantum-powered backtesting, predictive analytics, and risk management.',
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />, // animated
    title: 'Lightning Execution',
    desc: 'Trade with millisecond execution and high-frequency AI strategies.',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-pink-500 animate-bounce" />, // animated
    title: 'Portfolio Optimization',
    desc: 'AI-driven portfolio balancing and automated trade bots.',
  },
  {
    icon: <Shield className="w-8 h-8 text-cyan-500 animate-pulse" />, // animated
    title: 'Quantum Security',
    desc: 'Next-gen encryption and compliance for peace of mind.',
  },
  {
    icon: <Atom className="w-8 h-8 text-indigo-400 animate-spin" />, // animated
    title: 'Alternative Data',
    desc: 'Leverage news, social, and alternative data for alpha generation.',
  },
  {
    icon: <Infinity className="w-8 h-8 text-green-400 animate-pulse" />, // animated
    title: 'Infinite Scalability',
    desc: 'Enterprise-grade infrastructure for traders and institutions.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-fuchsia-400 animate-bounce" />, // animated
    title: 'Education & Community',
    desc: 'Learn, share, and grow with the world’s smartest trading community.',
  },
];

const aiStats = [
  { label: 'AI Trades Executed', value: '1,234,567,890' },
  { label: 'Avg. ROI (YTD)', value: '+38.2%' },
  { label: 'Active AI Agents', value: '47' },
  { label: 'Quantum Backtests', value: '8,900,000+' },
  { label: 'Uptime', value: '99.9999%' },
];

function AITicker() {
  // Simulate a live AI ticker
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % aiStats.length), 2500);
    return () => clearInterval(interval);
  }, []);
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
  );
}

interface UserType {
  id: string;
  email: string;
  name: string;
  subscription: string;
  joinDate: string;
  preferences: Record<string, any>;
}

function AnimatedBackground() {
  // Simple animated stars/particles background using canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId: number;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.5,
    }));
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const s of stars) {
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#a78bfa';
        ctx.shadowColor = '#a78bfa';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < 0) s.x = window.innerWidth;
        if (s.x > window.innerWidth) s.x = 0;
        if (s.y < 0) s.y = window.innerHeight;
        if (s.y > window.innerHeight) s.y = 0;
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener('resize', resize);
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
    />
  );
}

function FloatingAIMascot() {
  // Animated floating AI mascot orb
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-float">
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-emerald-400 rounded-full shadow-2xl border-4 border-white/30 flex items-center justify-center animate-pulse">
          <span className="text-4xl">🤖</span>
        </div>
        <span className="mt-2 text-xs text-white bg-black/60 px-2 py-1 rounded shadow-lg animate-bounce">
          AI Assistant
        </span>
      </div>
    </div>
  );
}

// Floating Voice AI Button
function VoiceAIMic({ onToggle, listening }: { onToggle: () => void; listening: boolean }) {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-28 right-8 z-50 p-4 rounded-full shadow-2xl border-4 border-fuchsia-400/40 bg-black/70 hover:bg-fuchsia-800/80 transition-colors animate-float ${listening ? 'ring-4 ring-fuchsia-400' : ''}`}
      aria-label={listening ? 'Stop Voice Assistant' : 'Start Voice Assistant'}
    >
      {listening ? (
        <span className="flex items-center gap-2 text-fuchsia-300">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#a78bfa" strokeWidth="2" opacity="0.5" />
            <rect x="9" y="7" width="6" height="10" rx="3" fill="#a78bfa" />
          </svg>{' '}
          <span className="font-bold">Listening...</span>
        </span>
      ) : (
        <span className="flex items-center gap-2 text-fuchsia-300">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#a78bfa" strokeWidth="2" opacity="0.5" />
            <rect x="9" y="7" width="6" height="10" rx="3" fill="#a78bfa" />
          </svg>{' '}
          <span className="font-bold">Voice AI</span>
        </span>
      )}
    </button>
  );
}

function FuturisticHoloRings() {
  // Animated holographic rings for a futuristic effect
  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
      <div className="relative w-[60vw] h-[60vw] max-w-3xl max-h-3xl flex items-center justify-center">
        <div
          className="absolute inset-0 animate-spin-slow rounded-full border-4 border-fuchsia-400/30 shadow-2xl"
          style={{ boxShadow: '0 0 80px 10px #a78bfa55, 0 0 200px 40px #0ff2' }}
        ></div>
        <div
          className="absolute inset-8 animate-spin-slower rounded-full border-2 border-emerald-400/20"
          style={{ boxShadow: '0 0 60px 5px #34d39933' }}
        ></div>
        <div
          className="absolute inset-16 animate-spin-fast rounded-full border border-cyan-400/20"
          style={{ boxShadow: '0 0 40px 2px #22d3ee22' }}
        ></div>
        <div
          className="absolute inset-24 animate-pulse rounded-full border border-violet-400/10"
          style={{ boxShadow: '0 0 20px 1px #a78bfa11' }}
        ></div>
      </div>
    </div>
  );
}

export default function AlphaAIStockX() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<UserType | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // --- Voice AI State/Logic ---
  const [voiceListening, setVoiceListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('alphaai_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      if (transcript && voiceListening) {
        // Here you could send transcript to AIChat or handle commands
        window.speechSynthesis.speak(new SpeechSynthesisUtterance('AI received: ' + transcript));
      }
    };
    recognitionRef.current.onend = () => {
      if (voiceListening) recognitionRef.current.start();
    };
    return () => recognitionRef.current && recognitionRef.current.stop();
  }, [voiceListening]);

  const handleLogin = (userData: any) => {
    const newUser: UserType = {
      id: userData.id || 'user_' + Date.now(),
      email: userData.email,
      name: userData.name,
      subscription: userData.subscription || 'free',
      joinDate: new Date().toISOString(),
      preferences: userData.preferences || {},
    };

    setUser(newUser);
    localStorage.setItem('alphaai_user', JSON.stringify(newUser));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('alphaai_user');
    setActiveTab('dashboard');
  };

  const handleSubscriptionUpgrade = (plan: string) => {
    if (user) {
      const updatedUser = { ...user, subscription: plan };
      setUser(updatedUser);
      localStorage.setItem('alphaai_user', JSON.stringify(updatedUser));
      setShowSubscriptionModal(false);
    }
  };

  const canAccessFeature = (feature: string) => {
    if (!user) return false;

    if (user.subscription === 'transcendent') return true;
    if (user.subscription === 'legendary' && feature !== 'omniscience') return true;
    if (user.subscription === 'premium' && feature === 'analysis') return true;

    return false;
  };

  const toggleVoice = () => {
    setVoiceListening(v => {
      if (!v) recognitionRef.current && recognitionRef.current.start();
      else recognitionRef.current && recognitionRef.current.stop();
      return !v;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/30">
          <CardContent className="p-8 text-center">
            <div className="relative">
              <Atom className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-spin" />
              <div className="absolute inset-0 h-16 w-16 bg-purple-400/20 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Initializing Quantum AI Consciousness
            </h2>
            <p className="text-slate-400">
              Loading interdimensional systems and cosmic intelligence...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen futuristic-bg flex relative overflow-hidden">
      <AnimatedBackground />
      <div className="animated-grid" />
      <FuturisticHoloRings />
      <FloatingAIMascot />
      <VoiceAIMic onToggle={toggleVoice} listening={voiceListening} />
      {/* Sidebar */}
      <aside
        aria-label="Sidebar navigation"
        className="hidden lg:flex flex-col w-72 holo-shimmer bg-gradient-to-b from-violet-900/90 to-black/90 border-r border-violet-800/40 p-8 text-white shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-12">
          <Brain className="w-10 h-10 text-violet-400 animate-pulse" />
          <span className="text-3xl font-bold tracking-tight neon-text">AlphaAIStockX</span>
        </div>
        <nav className="flex flex-col gap-6 mt-8">
          <a
            className="flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition-colors"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition-colors"
            href="#"
          >
            AI Insights
          </a>
          <a
            className="flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition-colors"
            href="#"
          >
            Trade Bot
          </a>
          <a
            className="flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition-colors"
            href="#"
          >
            Analytics
          </a>
          <a
            className="flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition-colors"
            href="#"
          >
            Education
          </a>
          <a
            className="flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition-colors"
            href="#"
          >
            Community
          </a>
        </nav>
        <div className="mt-auto pt-12">
          <Card className="futuristic-card holo-shimmer border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-white neon-text">Upgrade to Pro</CardTitle>
              <CardDescription className="text-fuchsia-200">
                Unlock quantum AI, unlimited trades, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full holo-btn font-bold">Upgrade Now</Button>
            </CardContent>
          </Card>
        </div>
      </aside>
      {/* Main Content */}
      <main
        role="main"
        id="main-content"
        aria-label="Homepage main content"
        className="flex-1 flex flex-col items-center justify-start px-4 sm:px-8 py-12"
      >
        {/* AI Ticker */}
        <section aria-label="Live AI stats ticker">
          <AITicker />
        </section>
        {/* Hero Section */}
        <section
          aria-label="Hero section"
          className="w-full max-w-5xl text-center mb-16 futuristic-card holo-shimmer animated-neon-border"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold neon-text drop-shadow-lg animate-pulse">
            The Future of AI Stock Trading
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto">
            Experience the world’s most advanced AI-powered trading platform. Quantum speed.
            Infinite intelligence. Real results.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Badge className="bg-violet-700 text-white text-lg px-4 py-2 neon-glow animated-neon-border">
              Quantum AI
            </Badge>
            <Badge className="bg-fuchsia-700 text-white text-lg px-4 py-2 neon-glow animated-neon-border">
              47+ AI Agents
            </Badge>
            <Badge className="bg-emerald-700 text-white text-lg px-4 py-2 neon-glow animated-neon-border">
              Real-Time Insights
            </Badge>
            <Badge className="bg-cyan-700 text-white text-lg px-4 py-2 neon-glow animated-neon-border">
              Enterprise Security
            </Badge>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="text-lg px-8 py-4 holo-btn font-bold">Get Started Free</Button>
            <Button variant="secondary" className="text-lg px-8 py-4 holo-btn font-bold">
              See Live Demo
            </Button>
          </div>
        </section>
        {/* Features Grid */}
        <section
          aria-label="Platform features"
          className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {features.map((f, i) => (
            <Card
              key={i}
              className="futuristic-card holo-shimmer animated-neon-border hover:scale-105 transition-transform"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                {f.icon}
                <CardTitle className="text-white neon-text text-xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-base">{f.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>
        {/* 3D Stock Chart Section */}
        <section
          aria-label="3D Stock Chart"
          className="w-full max-w-4xl mx-auto mb-16 futuristic-card holo-shimmer animated-neon-border"
        >
          <StockChart3D data={undefined} />
        </section>
        {/* AI Auto Trade Bot Section */}
        <section
          aria-label="AI Auto Trade Bot"
          className="w-full max-w-4xl mx-auto mb-16 futuristic-card holo-shimmer animated-neon-border"
        >
          <AutoTradeBot />
        </section>
        {/* Market Heatmap Section */}
        <section
          aria-label="Market Heatmap"
          className="w-full max-w-4xl mx-auto mb-16 futuristic-card holo-shimmer animated-neon-border"
        >
          <MarketHeatmap />
        </section>
        {/* Next-Level AI Tools Section */}
        <section aria-label="Next-Level AI Tools" className="w-full max-w-7xl mx-auto mb-20">
          <h2 className="text-4xl font-extrabold neon-text text-center mb-8">
            Next-Level AI Stock Tools & Scanners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[
              require('@/app/components/ai-tools/AIStockScreener').default,
              require('@/app/components/ai-tools/AIPatternRecognition').default,
              require('@/app/components/ai-tools/AINewsSentiment').default,
              require('@/app/components/ai-tools/AIInsiderUnusual').default,
              require('@/app/components/ai-tools/AIPortfolioDoctor').default,
              require('@/app/components/ai-tools/AITradeCopilot').default,
              require('@/app/components/ai-tools/AIBacktester').default,
              require('@/app/components/ai-tools/AIGlobalHeatmap').default,
              require('@/app/components/ai-tools/AIVoiceCommandCenter').default,
              require('@/app/components/ai-tools/AIWhiteLabelBranding').default,
            ].map((Tool, i) => (
              <Tool key={i} />
            ))}
          </div>
        </section>
        {/* Call to Action */}
        <section
          aria-label="Call to action"
          className="w-full max-w-3xl text-center mt-12 futuristic-card holo-shimmer animated-neon-border"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white neon-text mb-4">
            Ready to revolutionize your trading?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Join 47,000+ traders using AlphaAIStockX to achieve financial freedom with the power of
            AI.
          </p>
          <Button className="text-lg px-10 py-4 holo-btn font-bold">Sign Up Now</Button>
        </section>
        {/* Funny Domain Announcement & Mascot */}
        <div className="w-full flex flex-col items-center justify-center py-6 bg-gradient-to-r from-violet-900/80 to-fuchsia-900/80 border-t border-b border-violet-800/40 mb-8 holo-shimmer">
          <div className="flex items-center gap-4">
            <span className="text-2xl md:text-3xl font-extrabold text-emerald-300 animate-bounce">
              🎉 Welcome to{' '}
              <span className="underline decoration-wavy decoration-fuchsia-400">
                AlphaAiStockX.com
              </span>
              !
            </span>
            <span className="text-3xl animate-spin-slow" aria-label="AI Mascot">
              🤖
            </span>
          </div>
          <p className="mt-2 text-lg text-slate-200 max-w-xl text-center">
            The only stock platform where the AI is so smart, it sometimes trades for pizza. Hosted
            on IONOS for maximum quantum giggles and uptime. 🍕📈
          </p>
        </div>
        {/* AI Chat Assistant (live) */}
        <AIChat />
      </main>
      {/* IONOS Hosting Badge Footer */}
      <footer
        className="w-full flex justify-center items-center py-4 bg-black/60 border-t border-violet-900/40 holo-shimmer"
        aria-label="IONOS Hosting Badge Footer"
      >
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
  );
}
