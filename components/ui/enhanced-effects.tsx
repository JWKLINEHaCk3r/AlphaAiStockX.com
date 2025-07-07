'use client';

'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Early return for SSR
  if (typeof window === 'undefined') {
    return null;
  }

  useEffect(() => {
    // Skip during SSR or if document is not available
    if (typeof window === 'undefined') return;
    if (typeof document === 'undefined') return;
    
    try {
      const updateScrollProgress = () => {
        if (typeof document === 'undefined') return;
        
        const scrollPx = document.documentElement?.scrollTop || 0;
        const scrollHeight = document.documentElement?.scrollHeight || 0;
        const clientHeight = document.documentElement?.clientHeight || 0;
        const winHeightPx = scrollHeight - clientHeight;
        
        if (winHeightPx > 0) {
          const scrolled = (scrollPx / winHeightPx) * 100;
          setScrollProgress(Math.min(100, Math.max(0, scrolled)));
        }
      };

      window.addEventListener('scroll', updateScrollProgress, { passive: true });
      updateScrollProgress(); // Initial calculation
      
      return () => window.removeEventListener('scroll', updateScrollProgress);
    } catch (error) {
      console.warn('ScrollProgress initialization failed during SSR:', error);
      return () => {}; // Return empty cleanup function
    }
  }, []);

  return (
    <div 
      className="scroll-indicator gpu-optimized"
      style={{ transform: `scaleX(${scrollProgress / 100})` }}
    />
  );
}

export function MatrixRain() {
  const [characters, setCharacters] = useState<Array<{
    id: number;
    char: string;
    left: number;
    duration: number;
    delay: number;
  }>>([]);

  // Early return for SSR
  if (typeof window === 'undefined') {
    return null;
  }

  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') return;
    
    try {
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const newCharacters = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        char: chars[Math.floor(Math.random() * chars.length)] || '0', // Fallback to '0'
        left: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }));
      
      setCharacters(newCharacters);
    } catch (error) {
      console.warn('MatrixRain initialization failed during SSR:', error);
    }
  }, []);

  return (
    <div className="matrix-rain">
      {characters.map(char => (
        <div
          key={char.id}
          className="matrix-character"
          style={{
            left: `${char.left}%`,
            animationDuration: `${char.duration}s`,
            animationDelay: `${char.delay}s`,
          }}
        >
          {char.char}
        </div>
      ))}
    </div>
  );
}

export function AIConsciousnessOrb() {
  // Early return for SSR
  if (typeof window === 'undefined') {
    return null;
  }
  
  return (
    <div className="fixed bottom-8 right-8 w-16 h-16 rounded-full ai-consciousness opacity-30 pointer-events-none z-50">
      <div className="absolute inset-2 rounded-full bg-black/50 backdrop-blur-sm" />
    </div>
  );
}
