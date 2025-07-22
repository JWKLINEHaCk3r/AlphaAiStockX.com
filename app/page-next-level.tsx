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
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card';
import { CardTitle } from "../components/ui/card";
import { CardDescription } from "../components/ui/card";
import { CardContent } from "../components/ui/card";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
'use client';
import React from 'react';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Brain,
  BarChart3,
  Zap,
  TrendingUp,
  Shield,
  Atom,
  Infinity,
  Sparkles,
  ArrowRight,
  Play,
  ChevronDown,
  Star,
  Rocket,
  Target,
  Globe,
} from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Neural Trading AI',
    desc: 'Advanced GPT-4o powered analysis with 47+ specialized AI agents providing real-time market insights.',
    gradient: 'from-neon-blue to-neon-purple',
    delay: '0ms',
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Quantum Analytics',
    desc: 'Breakthrough quantum-enhanced backtesting and predictive modeling with microsecond precision.',
    gradient: 'from-neon-green to-neon-cyan',
    delay: '100ms',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Lightning Execution',
    desc: 'Ultra-low latency trading with algorithmic execution speeds faster than institutional platforms.',
    gradient: 'from-neon-orange to-neon-pink',
    delay: '200ms',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Smart Portfolio AI',
    desc: 'Autonomous portfolio optimization with dynamic rebalancing and risk-adjusted alpha generation.',
    gradient: 'from-neon-pink to-neon-purple',
    delay: '300ms',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Quantum Security',
    desc: 'Military-grade encryption with quantum-resistant protocols and regulatory compliance.',
    gradient: 'from-neon-cyan to-neon-blue',
    delay: '400ms',
  },
  {
    icon: <Atom className="w-8 h-8" />,
    title: 'Alternative Data',
    desc: 'Harness satellite imagery, social sentiment, and alternative datasets for edge discovery.',
    gradient: 'from-neon-purple to-neon-pink',
    delay: '500ms',
  },
];

const stats = [
  { value: '$2.3B+', label: 'Assets Under Management', icon: <TrendingUp className="w-6 h-6" /> },
  { value: '98.7%', label: 'Accuracy Rate', icon: <Target className="w-6 h-6" /> },
  { value: '47', label: 'AI Agents', icon: <Brain className="w-6 h-6" /> },
  { value: '0.003s', label: 'Execution Speed', icon: <Zap className="w-6 h-6" /> },
];

function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
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

  return (
    <span ref={ref} className="neon-text">
      {displayValue}
    </span>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: 1,
        size: Math.random() * 2 + 1,
      });
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(34, 35, 58, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create new particles
      if (Math.random() < 0.1) createParticle();

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.005;

        if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${217 + Math.sin(p.x * 0.01) * 30}, 91%, 60%)`;
        ctx.fill();
        ctx.restore();
      }

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 100) * 0.2;
            ctx.strokeStyle = 'hsl(217, 91%, 60%)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    resize();
    animate();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resize);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="neon-text">Alpha AI</span>
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent">Stock X</span>
          </h1>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The world's most advanced AI trading platform. Harness the power of 47+ specialized AI
            agents, quantum analytics, and real-time market intelligence to dominate financial
            markets.
          </p>
        </div>

        <div
          className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center mb-12"
          style={{ animationDelay: '400ms' }}
        >
          <Button size="lg" className="btn-primary group text-lg px-8 py-4">
            Start Trading
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="glass-card text-lg px-8 py-4 group">
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2 text-neon-blue">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-bounce mt-16">
          <ChevronDown className="w-8 h-8 mx-auto text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="scroll-fade-in" style={{ animationDelay: feature.delay }}>
      <Card
        className={`glass-card interactive-hover group relative overflow-hidden h-full ${
          isHovered ? 'neon-border' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />

        <CardContent className="p-8 relative z-10">
          <div
            className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 animate-float`}
          >
            <div className="text-white">{feature.icon}</div>
          </div>

          <CardTitle className="text-2xl font-bold mb-4 group-hover:neon-text transition-all duration-300">
            {feature.title}
          </CardTitle>

          <CardDescription className="text-muted-foreground leading-relaxed">
            {feature.desc}
          </CardDescription>
        </CardContent>

        <div
          className={`shimmer-effect ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        />
      </Card>
    </div>
  );
}

function FeaturesSection() {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
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

  return (
    <section ref={setRef} className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="neon-text">Next-Level</span> Trading Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of financial markets with our cutting-edge AI technology stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="glass-card p-12 neon-border">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Trading?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of traders who are already using AI to maximize their profits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary group text-lg px-8 py-4">
              <Rocket className="mr-2 w-5 h-5" />
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="glass-card text-lg px-8 py-4">
              <Globe className="mr-2 w-5 h-5" />
              View Live Demo
            </Button>
          </div>

          <div className="flex justify-center mt-8 gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} className="w-6 h-6 fill-neon-orange text-neon-orange" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Rated 5/5 by over 10,000+ professional traders
          </p>
        </div>
      </div>
    </section>
  );
}

export default function NextLevelHomePage() {
  return (
    <div className="relative min-h-screen">
      <ParticleField />

      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
