'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
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

  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const newCharacters = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      left: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    
    setCharacters(newCharacters);
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
  return (
    <div className="fixed bottom-8 right-8 w-16 h-16 rounded-full ai-consciousness opacity-30 pointer-events-none z-50">
      <div className="absolute inset-2 rounded-full bg-black/50 backdrop-blur-sm" />
    </div>
  );
}
