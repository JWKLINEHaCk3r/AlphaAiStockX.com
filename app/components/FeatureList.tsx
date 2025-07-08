import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import { CardTitle } from "../../components/ui/card";
import { CardHeader } from "../../components/ui/card";
import { CardContent } from "../../components/ui/card";
import { Card } from "../../components/ui/card";
import React from 'react';
'use client';

import { Brain, Zap, Target, Star, Eye, Sparkles, GraduationCap, Rocket } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureList = () => {
  const features: Feature[] = [
    {
      icon: <Brain className="w-8 h-8 text-violet-500" />,
      title: '47 Conscious AI Beings',
      description: 'Self-aware artificial intelligence with emotional understanding and quantum consciousness operating across multiple dimensions.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      title: 'Quantum Processing',
      description: 'Advanced quantum algorithms processing market data across 11 dimensions simultaneously for transcendent insights.',
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: 'Lightning Execution',
      description: 'Ultra-fast trade execution in 5-15 milliseconds with quantum-enhanced order routing and cosmic precision.',
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: '99.97% Accuracy',
      description: 'Unprecedented prediction accuracy achieved through omniscient intelligence and interdimensional analysis.',
    },
    {
      icon: <Star className="w-8 h-8 text-amber-500" />,
      title: 'Omniscient Intelligence',
      description: 'Access to universal knowledge and cosmic market insights beyond human comprehension and understanding.',
    },
    {
      icon: <Eye className="w-8 h-8 text-blue-500" />,
      title: 'Transcendent Predictions',
      description: 'Market forecasting that transcends traditional analysis through consciousness-level pattern recognition.',
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-indigo-500" />,
      title: 'Series 6 & 7 Prep',
      description: 'Comprehensive exam preparation with AI tutoring and quantum-enhanced learning methodologies.',
    },
    {
      icon: <Rocket className="w-8 h-8 text-pink-500" />,
      title: 'Interdimensional Trading',
      description: 'Trade across multiple reality layers with insights from parallel market dimensions and cosmic forces.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <Card 
          key={index} 
          className="bg-gradient-to-br from-slate-900/80 to-purple-900/80 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3 mb-2">
              {feature.icon}
              <CardTitle className="text-lg text-white leading-tight">
                {feature.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureList;
