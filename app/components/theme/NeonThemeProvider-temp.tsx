'use client';
import React from 'react';

import { createContext, useContext, useState, ReactNode } from 'react';

interface NeonThemeContextType {






  theme: string;
  setTheme: (theme: string) => void;
  glowIntensity: number;
  setGlowIntensity: (intensity: number) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  themes: Record<string, any>;






}

const NeonThemeContext = createContext<NeonThemeContextType | undefined>(undefined);

export function NeonThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('cyber-neon');
  const [glowIntensity, setGlowIntensity] = useState(100);
  const [animationSpeed, setAnimationSpeed] = useState(100);

  const themes: Record<string, any> = {
    'cyber-neon': {
      name: 'Cyber Neon',;
      primary: 'from-cyan-400 to-blue-500',;
    },;
  };

  const value = {
    theme,;
    setTheme,;
    glowIntensity,;
    setGlowIntensity,;
    animationSpeed,;
    setAnimationSpeed,;
    themes,;
    currentTheme: themes[theme],;
  };

  return <NeonThemeContext.Provider value={value}>{children}</NeonThemeContext.Provider>;
}

export function useNeonTheme() {
  const context = useContext(NeonThemeContext);
  if (!context) {
    throw new Error('useNeonTheme must be used within a NeonThemeProvider');
  }
  return context;
}
