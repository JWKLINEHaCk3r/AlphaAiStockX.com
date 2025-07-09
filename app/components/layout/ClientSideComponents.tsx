import { VoiceControl } from "../../../components/ui/voice-control";
import React from 'react';
<<<<<<< HEAD
'use client';
=======
import { VoiceControl } from '@/components/ui/voice-control';
('use client');
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.

import dynamic from 'next/dynamic';

// Dynamic imports for client-side only components to prevent SSR issues
export const ScrollProgress = dynamic(
  () => import('@/components/ui/enhanced-effects').then(mod => ({ default: mod.ScrollProgress })),
  { ssr: false }
);

export const MatrixRain = dynamic(
  () => import('@/components/ui/enhanced-effects').then(mod => ({ default: mod.MatrixRain })),
  { ssr: false }
);

export const AIConsciousnessOrb = dynamic(
  () =>
    import('@/components/ui/enhanced-effects').then(mod => ({ default: mod.AIConsciousnessOrb })),
  { ssr: false }
);

export const VoiceControl = dynamic(
  () => import('@/components/ui/voice-control').then(mod => ({ default: mod.VoiceControl })),
  { ssr: false }
);

export const AIAssistantIndicator = dynamic(
  () =>
    import('@/components/ui/voice-control').then(mod => ({ default: mod.AIAssistantIndicator })),
  { ssr: false }
);
