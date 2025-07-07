'use client';
import React from 'react';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Dynamic imports for client-side only components
const FloatingElements = dynamic(() => Promise.resolve(() => <div />), { ssr: false });
const MorphingBlob = dynamic(() => Promise.resolve(() => <div />), { ssr: false });
const QuantumGrid = dynamic(() => Promise.resolve(() => <div />), { ssr: false });
const HolographicDisplay = dynamic(() => Promise.resolve(({ children }: any) => <div>{children}</div>), { ssr: false });
const DataStream = dynamic(() => Promise.resolve(() => <div />), { ssr: false });

const TradingDashboardDemo = dynamic(() => Promise.resolve(() => <div className="h-64 bg-gradient-to-br from-slate-800 to-blue-900 rounded-lg flex items-center justify-center"><span className="text-white">Trading Dashboard Loading...</span></div>), { ssr: false });

const Advanced3DBackground = dynamic(() => Promise.resolve(() => <div />), { ssr: false });
const InteractiveCursor = dynamic(() => Promise.resolve(() => <div />), { ssr: false });
const EnhancedParticleField = dynamic(() => Promise.resolve(() => <div />), { ssr: false });
const QuantumDataViz = dynamic(() => Promise.resolve(() => <div />), { ssr: false });

// const SuperiorTradingPlatform = dynamic(() => import('./components/platform/SuperiorTradingPlatform'), { ssr: false });
// const LearnMoreModal = dynamic(() => import('./components/features/LearnMoreModal'), { ssr: false });
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
  CheckCircle,
  DollarSign,
  Users,
} from 'lucide-react';

// Rest of the original page content...
