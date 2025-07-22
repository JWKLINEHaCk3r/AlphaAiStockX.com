import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card';
import * as React from 'react';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

// Dynamic imports for client-side only components;
const FloatingElements = dynamic(() => Promise.resolve(() => <div />), { ssr: false });
const MorphingBlob = dynamic(() => Promise.resolve(() => <div />), { ssr: false });
const QuantumGrid = dynamic(() => Promise.resolve(() => <div />), { ssr: false });
const HolographicDisplay = dynamic(;
  () => Promise.resolve(({ children }: any) => <div>{children}</div>),;
  { ssr: false }
);
const DataStream = dynamic(() => Promise.resolve(() => <div />), { ssr: false });

const TradingDashboardDemo = dynamic(;
  () =>;
    Promise.resolve(() => (;
      <div className="h-64 bg-gradient-to-br from-slate-800 to-blue-900 rounded-lg flex items-center justify-center">;
        <span className="text-white">Trading Dashboard Loading...</span>;
      </div>;
    )),;
  { ssr: false }
);

const Advanced3DBackground = dynamic(() => Promise.resolve(() => <div />), { ssr: false });
const InteractiveCursor = dynamic(() => Promise.resolve(() => <div />), { ssr: false });
const EnhancedParticleField = dynamic(() => Promise.resolve(() => <div />), { ssr: false });
const QuantumDataViz = dynamic(() => Promise.resolve(() => <div />), { ssr: false });

// const SuperiorTradingPlatform = dynamic(() => import('./components/platform/SuperiorTradingPlatform'), { ssr: false });
// const LearnMoreModal = dynamic(() => import('./components/features/LearnMoreModal'), { ssr: false });
import {
  Brain,;
  BarChart3,;
  Zap,;
  TrendingUp,;
  Shield,;
  Atom,;
  Infinity,;
  Sparkles,;
  ArrowRight,;
  Play,;
  ChevronDown,;
  Star,;
  Rocket,;
  Target,;
  Globe,;
  CheckCircle,;
  DollarSign,;
  Users,;
  Clock,;
  Cpu,;
  Database,;
  Lock,;
  BookOpen,;
  Award,;
} from 'lucide-react';
import Link from 'next/link';

const features = [;
  {
    icon: <Brain className="w-8 h-8" />,;
    title: 'Live AI Trading Engine',;
    desc: 'Real-time AI-powered trading system with LSTM neural networks, pattern recognition, and automated execution.',;
    gradient: 'from-neon-blue to-neon-purple',;
    delay: '0ms',;
    details: {
      overview:;
        'Our advanced AI trading engine uses cutting-edge machine learning algorithms to analyze market patterns and execute trades with superhuman precision. Built on LSTM neural networks and reinforcement learning, it processes millions of data points in real-time to identify profitable opportunities.',;
      features: [;
        '🧠 LSTM Neural Networks for pattern recognition',;
        '⚡ Real-time signal processing and execution',;
        '📊 Advanced risk management algorithms',;
        '🔄 Continuous learning and adaptation',;
        '🎯 Multi-timeframe analysis',;
        '📈 Backtesting with 10+ years of data',;
        '🤖 47+ specialized AI trading agents',;
        '🔮 Predictive market modeling',;
      ],;
      benefits: [;
        'Eliminate emotional trading decisions',;
        '24/7 automated market monitoring',;
        'Consistent performance across market conditions',;
        'Advanced pattern recognition capabilities',;
        'Risk-adjusted returns optimization',;
        'Multi-asset class support',;
        'Institutional-grade execution',;
      ],;
      stats: {
        accuracy: '94.7%',;
        trades: '1.2M+',;
        users: '50K+',;
        uptime: '99.99%',;
        avgReturn: '+38.2%',;
        sharpeRatio: '2.14',;
      },;
    },;
  },;
  {
    icon: <BarChart3 className="w-8 h-8" />,;
    title: 'Advanced Market Analysis',;
    desc: 'Multi-provider market data aggregation with 50+ technical indicators and real-time signal generation.',;
    gradient: 'from-neon-green to-neon-cyan',;
    delay: '100ms',;
    details: {
      overview:;
        'Comprehensive market analysis powered by AI with real-time data from multiple sources and advanced technical indicators. Our system processes news, social sentiment, and alternative data to provide unparalleled market insights.',;
      features: [;
        '📊 50+ Technical indicators and oscillators',;
        '🌐 Multi-source data aggregation',;
        '⚡ Real-time signal generation',;
        '📈 Custom indicator creation',;
        '🔍 Market sentiment analysis',;
        '📱 Mobile-responsive dashboards',;
        '🛰️ Alternative data integration',;
        '📰 News and social media analytics',;
      ],;
      benefits: [;
        'Make informed trading decisions',;
        'Identify trends before they happen',;
        'Reduce analysis time by 90%',;
        'Access institutional-grade research',;
        'Custom alert system',;
        'Multi-market coverage',;
        'Real-time risk assessment',;
      ],;
      stats: {
        indicators: '50+',;
        markets: '100+',;
        updates: 'Real-time',;
        accuracy: '92.3%',;
        dataSources: '25+',;
        coverage: '87.5%',;
      },;
    },;
  },;
  {
    icon: <Zap className="w-8 h-8" />,;
    title: 'Lightning-Fast Execution',;
    desc: 'Sub-millisecond order execution with direct market access and smart order routing.',;
    gradient: 'from-neon-yellow to-neon-orange',;
    delay: '200ms',;
    details: {
      overview:;
        'Ultra-low latency trading infrastructure with direct market access and intelligent order routing for optimal execution. Our co-located servers and advanced algorithms ensure you get the best prices with minimal slippage.',;
      features: [;
        '⚡ Sub-millisecond execution speeds',;
        '🔗 Direct market access (DMA)',;
        '🧠 Smart order routing algorithms',;
        '📊 Real-time execution analytics',;
        '🎯 Price improvement optimization',;
        '🔄 Automatic order management',;
        '🏢 Co-located server infrastructure',;
        '📈 Slippage minimization',;
      ],;
      benefits: [;
        'Maximize profit on every trade',;
        'Minimize slippage and market impact',;
        'Access best available prices',;
        'Reduce trading costs significantly',;
        'Institutional-grade execution',;
        'Real-time order tracking',;
        'Advanced order types',;
      ],;
      stats: {
        latency: '<1ms',;
        venues: '15+',;
        fillRate: '99.8%',;
        savings: '45%',;
        slippage: '0.02%',;
        uptime: '99.99%',;
      },;
    },;
  },;
  {
    icon: <TrendingUp className="w-8 h-8" />,;
    title: 'Portfolio Optimization',;
    desc: 'Dynamic portfolio rebalancing using modern portfolio theory and risk management algorithms.',;
    gradient: 'from-neon-pink to-neon-purple',;
    delay: '300ms',;
    details: {
      overview:;
        'Advanced portfolio optimization using AI-driven rebalancing, risk assessment, and modern portfolio theory. Our algorithms continuously monitor and adjust your portfolio to maximize risk-adjusted returns.',;
      features: [;
        '⚖️ Dynamic rebalancing algorithms',;
        '📊 Risk-return optimization',;
        '🎯 Goal-based investing',;
        '🔍 Factor-based analysis',;
        '📈 Performance attribution',;
        '🛡️ Downside protection strategies',;
        '🌐 Global diversification',;
        '💰 Tax-loss harvesting',;
      ],;
      benefits: [;
        'Maximize risk-adjusted returns',;
        'Reduce portfolio volatility',;
        'Automated rebalancing',;
        'Tax-efficient optimization',;
        'Custom risk profiles',;
        'ESG integration options',;
        'Institutional-grade strategies',;
      ],;
      stats: {
        avgReturn: '+38.2%',;
        sharpeRatio: '2.14',;
        maxDrawdown: '-8.3%',;
        clients: '25K+',;
        aum: '$2.3B+',;
        volatility: '12.5%',;
      },;
    },;
  },;
  {
    icon: <Shield className="w-8 h-8" />,;
    title: 'Enterprise Security',;
    desc: 'Bank-grade security with multi-factor authentication, encryption, and compliance monitoring.',;
    gradient: 'from-neon-red to-neon-pink',;
    delay: '400ms',;
    details: {
      overview:;
        'Military-grade security infrastructure protecting your assets with advanced encryption and compliance monitoring. Our security framework meets the highest industry standards with continuous monitoring and threat detection.',;
      features: [;
        '🔐 256-bit AES encryption',;
        '🔑 Multi-factor authentication',;
        '🛡️ Biometric security options',;
        '📋 Real-time compliance monitoring',;
        '🔍 Advanced fraud detection',;
        '☁️ Secure cloud infrastructure',;
        '🔒 Cold storage for assets',;
        '📊 Security analytics dashboard',;
      ],;
      benefits: [;
        'Complete asset protection',;
        'Regulatory compliance assurance',;
        'Zero security breaches to date',;
        'Insurance coverage up to $500M',;
        '24/7 security monitoring',;
        'Advanced threat detection',;
        'Secure API access',;
      ],;
      stats: {
        encryption: '256-bit',;
        uptime: '99.99%',;
        breaches: '0',;
        compliance: '100%',;
        insurance: '$500M',;
        monitoring: '24/7',;
      },;
    },;
  },;
  {
    icon: <Atom className="w-8 h-8" />,;
    title: 'Quantum Computing Ready',;
    desc: 'Future-proof infrastructure designed for quantum computing integration and advanced algorithms.',;
    gradient: 'from-neon-purple to-neon-blue',;
    delay: '500ms',;
    details: {
      overview:;
        'Next-generation quantum-ready infrastructure preparing for the future of computational finance and trading. Our research partnerships and quantum algorithm development ensure you stay ahead of the technological curve.',;
      features: [;
        '⚛️ Quantum algorithm research',;
        '🔬 Advanced computational models',;
        '🚀 Scalable cloud architecture',;
        '🧬 Genetic algorithm optimization',;
        '🌌 Parallel processing systems',;
        '🔮 Predictive quantum models',;
        '🎯 Quantum machine learning',;
        '🔗 Hybrid classical-quantum systems',;
      ],;
      benefits: [;
        'Future-proof technology stack',;
        'Exponential processing power',;
        'Revolutionary trading strategies',;
        'Unmatched computational advantage',;
        'Next-generation AI capabilities',;
        'Advanced optimization techniques',;
        'Quantum-enhanced predictions',;
      ],;
      stats: {
        research: 'Active',;
        partnerships: '5+',;
        investment: '$50M+',;
        timeline: '2026',;
        patents: '12+',;
        publications: '25+',;
      },;
    },;
  },;
];

const stats = [;
  { value: '$2.3B+', label: 'Assets Under Management', icon: <TrendingUp className="w-6 h-6" /> },;
  { value: '98.7%', label: 'Accuracy Rate', icon: <Target className="w-6 h-6" /> },;
  { value: '47', label: 'AI Agents', icon: <Brain className="w-6 h-6" /> },;
  { value: '0.003s', label: 'Execution Speed', icon: <Zap className="w-6 h-6" /> },;
];

function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(;
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },;
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const increment = numericValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        const suffix = value.replace(/[0-9.]/g, '');
        setDisplayValue(start.toFixed(1) + suffix);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return (;
    <span ref={ref} className="neon-text">;
      {displayValue}
    </span>;
  );
}

function ParticleField() {
  return (;
    <>;
      <Advanced3DBackground />;
      <EnhancedParticleField />;
      <QuantumDataViz />;
      <QuantumGrid />;
      <FloatingElements count={30} />;
      <DataStream density={0.05} speed={1.5} />;
      <MorphingBlob;
        className="top-1/4 left-1/4 animate-float";
        color="hsl(217, 91%, 60%)";
        size={300}
      />;
      <MorphingBlob;
        className="bottom-1/4 right-1/4 animate-float [animation-delay:2s]";
        color="hsl(322, 85%, 70%)";
        size={250}
      />;
    </>;
  );
}

function HeroSection() {
  return (;
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">;
      <div className="absolute inset-0 grid-pattern opacity-30" />;
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">;
        <HolographicDisplay intensity={1.2}>;
          <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>;
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">;
              <span className="holographic-text">Alpha AI</span>;
              <br />;
              <span className="bg-gradient-secondary bg-clip-text text-transparent">Stock X</span>;
            </h1>;
          </div>;
        </HolographicDisplay>;
        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>;
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">;
            The world's most advanced AI trading platform. Harness the power of 47+ specialized AI;
            agents, quantum analytics, and real-time market intelligence to dominate financial;
            markets.;
          </p>;
        </div>;
        <div;
          className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center mb-12";
          style={{ animationDelay: '400ms' }}
        >;
          <Link href="/ai-trading">;
            <Button size="lg" className="btn-primary group text-lg px-8 py-4 interactive-cursor">;
              <Brain className="mr-2 w-5 h-5" />;
              Live AI Trading;
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />;
            </Button>;
          </Link>;
          <Link href="/platform">;
            <Button;
              size="lg";
              variant="outline";
              className="glass-card text-lg px-8 py-4 group interactive-cursor";
            >;
              <Play className="mr-2 w-5 h-5" />;
              Trading Platform;
            </Button>;
          </Link>;
        </div>;
        <HolographicDisplay intensity={0.8}>;
          <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>;
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">;
              {stats.map((stat, index) => (;
                <div key={index} className="text-center">;
                  <div className="flex items-center justify-center mb-2 text-neon-blue animate-bounce-gentle">;
                    {stat.icon}
                  </div>;
                  <div className="text-2xl md:text-3xl font-bold">;
                    <AnimatedCounter value={stat.value} />;
                  </div>;
                  <div className="text-sm text-muted-foreground">{stat.label}</div>;
                </div>;
              ))}
            </div>;
          </div>;
        </HolographicDisplay>;
        <div className="animate-bounce mt-16">;
          <ChevronDown className="w-8 h-8 mx-auto text-muted-foreground animate-pulse-glow" />;
        </div>;
      </div>;
    </section>;
  );
}

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (;
    <div className="scroll-fade-in" style={{ animationDelay: feature.delay }}>;
      <Card;
        className={`glass-card interactive-hover group relative overflow-hidden h-full interactive-cursor ${
          isHovered ? 'neon-border' : '';
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >;
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />;
        <CardContent className="p-8 relative z-10">;
          <div;
            className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 animate-float`}
          >;
            <div className="text-white">{feature.icon}</div>;
          </div>;
          <CardTitle className="text-2xl font-bold mb-4 group-hover:neon-text transition-all duration-300">;
            {feature.title}
          </CardTitle>;
          <CardDescription className="text-muted-foreground leading-relaxed mb-6">;
            {feature.desc}
          </CardDescription>;
          <div className="flex gap-3">;
            {/* <LearnMoreModal feature={feature}> */}
            <Button;
              variant="outline";
              className="flex-1 bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30";
            >;
              Learn More;
              <ArrowRight className="ml-2 h-4 w-4" />;
            </Button>;
            {/* </LearnMoreModal> */}

            <Button size="sm" className={`bg-gradient-to-r ${feature.gradient} hover:opacity-90`}>;
              Try Now;
            </Button>;
          </div>;
        </CardContent>;
        <div;
          className={`shimmer-effect ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        />;
      </Card>;
    </div>;
  );
}

function FeaturesSection() {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(;
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },;
      { threshold: 0.1 }
    );

    try {
      const elements = ref.querySelectorAll('.scroll-fade-in');
      elements.forEach(el => observer.observe(el));
    } catch (error) {
      console.warn('Error setting up scroll animation:', error);
    }

    return () => observer.disconnect();
  }, [ref]);

  return (;
    <section ref={setRef} className="py-24 px-6 relative">;
      <div className="max-w-7xl mx-auto">;
        <div className="text-center mb-16">;
          <h2 className="text-4xl md:text-6xl font-bold mb-6">;
            <span className="holographic-text">Next-Level</span> Trading Technology;
          </h2>;
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">;
            Experience the future of financial markets with our cutting-edge AI technology stack.;
          </p>;
        </div>;
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">;
          {features.map((feature, index) => (;
            <FeatureCard key={index} feature={feature} index={index} />;
          ))}
        </div>;
      </div>;
    </section>;
  );
}

function CTASection() {
  return (;
    <section className="py-24 px-6 relative">;
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10" />;
      <div className="max-w-4xl mx-auto text-center relative z-10">;
        <div className="glass-card p-12 neon-border">;
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Trading?</h2>;
          <p className="text-xl text-muted-foreground mb-8">;
            Join thousands of traders who are already using AI to maximize their profits.;
          </p>;
          <div className="flex flex-col sm:flex-row gap-4 justify-center">;
            <Link href="/ai-trading">;
              <Button size="lg" className="btn-primary group text-lg px-8 py-4 interactive-cursor">;
                <Rocket className="mr-2 w-5 h-5" />;
                Get Started Now;
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />;
              </Button>;
            </Link>;
            <Link href="/platform">;
              <Button;
                size="lg";
                variant="outline";
                className="glass-card text-lg px-8 py-4 interactive-cursor";
              >;
                <Globe className="mr-2 w-5 h-5" />;
                View Platform;
              </Button>;
            </Link>;
          </div>;
          <div className="flex justify-center mt-8 gap-1">;
            {[1, 2, 3, 4, 5].map(star => (;
              <Star key={star} className="w-6 h-6 fill-neon-orange text-neon-orange" />;
            ))}
          </div>;
          <p className="text-sm text-muted-foreground mt-2">;
            Rated 5/5 by over 10,000+ professional traders;
          </p>;
        </div>;
      </div>;
    </section>;
  );
}

export default function NextLevelHomePage() {
  return (;
    <div className="relative min-h-screen">;
      <InteractiveCursor />;
      <ParticleField />;
      <HeroSection />;
      <FeaturesSection />;
      <TradingDashboardDemo />;
      <CTASection />;
    </div>;
  );
}
