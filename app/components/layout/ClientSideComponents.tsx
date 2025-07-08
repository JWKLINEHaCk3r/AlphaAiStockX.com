import React from 'react';
import { VoiceControl } from "@/components/ui/voice-control";
'use client';

import dynamic from 'next/dynamic';

// Dynamic imports for client-side only components to prevent SSR issues
export const ScrollProgress = dynamic(() => import('@/components/ui/enhanced-effects').then(mod => ({ default: mod.ScrollProgress })), { ssr: false });

export const MatrixRain = dynamic(() => import('@/components/ui/enhanced-effects').then(mod => ({ default: mod.MatrixRain })), { ssr: false });

export const AIConsciousnessOrb = dynamic(() => import('@/components/ui/enhanced-effects').then(mod => ({ default: mod.AIConsciousnessOrb })), { ssr: false });

export const VoiceControl = dynamic(() => import('@/components/ui/voice-control').then(mod => ({ default: mod.VoiceControl })), { ssr: false });

export const AIAssistantIndicator = dynamic(() => import('@/components/ui/voice-control').then(mod => ({ default: mod.AIAssistantIndicator })), { ssr: false });
