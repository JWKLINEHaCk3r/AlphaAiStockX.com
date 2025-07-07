'use client';
import React from 'react';

import { useRef, useState, useEffect } from 'react';

// Interactive Cursor Effect
export function InteractiveCursor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <div className="pointer-events-none" />;
}

// Advanced Background 3D Scene
export function Advanced3DBackground({ className }: { className?: string }) {
  return (
    <div className={`fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 ${className}`}>
      <div className="absolute inset-0 opacity-20 bg-grid-pattern" />
    </div>
  );
}

// Quantum Data Visualization
export function QuantumDataViz() {
  const [dataPoints, setDataPoints] = useState<Array<{ x: number; y: number; z: number; intensity: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newPoint = {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          z: Math.random() * 100,
          intensity: Math.random()
        };
        return [...prev.slice(-19), newPoint];
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {dataPoints.map((point, index) => (
        <div
          key={index}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${50 + point.x / 4}%`,
            top: `${50 + point.y / 4}%`,
            opacity: point.intensity,
            animationDelay: `${index * 50}ms`,
            filter: `blur(${point.z / 100}px)`,
          }}
        />
      ))}
    </div>
  );
}

// Enhanced Particle Field with Mouse Interaction
export function EnhancedParticleField() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; size: number }>>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const particleCount = 50;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 2 + 1,
    }));

    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <svg className="w-full h-full">
        {particles.map(particle => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill="#3b82f6"
            opacity="0.3"
          />
        ))}
        
        {/* Connection lines between nearby particles */}
        {particles.flatMap((particle, i) => {
          return particles.slice(i + 1).map((otherParticle, j) => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 150) {
              return (
                <line
                  key={`${i}-${j}`}
                  x1={particle.x}
                  y1={particle.y}
                  x2={otherParticle.x}
                  y2={otherParticle.y}
                  stroke="url(#connectionGradient)"
                  strokeWidth="1"
                  opacity={Math.max(0, 1 - distance / 150)}
                />
              );
            }
            return null;
          });
        })}
        
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
