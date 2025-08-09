'use client';

import React, { useState, useEffect } from 'react';

interface ScrollProgressProps {
  className?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ className }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-green-400 transition-all duration-300 z-50 ${className}`} 
         style={{ width: `${scrollProgress}%` }} />
  );
};

interface MatrixRainProps {
  className?: string;
  density?: number;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ className, density = 50 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const drops = Array.from({ length: density }, (_, i) => (
    <div
      key={i}
      className="absolute animate-pulse text-green-400 opacity-30 font-mono text-sm"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      }}
    >
      {characters[Math.floor(Math.random() * characters.length)]}
    </div>
  ));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {drops}
    </div>
  );
};