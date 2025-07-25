'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Interface definitions for TypeScript safety;
interface FloatingElement {




















  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  direction: number;




















}

interface MatrixStream {




















  id: number;
  characters: string[];
  positions: number[];
  column: number;




















}

interface Point {




















  x: number;
  y: number;




















}

// Floating particles with neural network connections;
export function FloatingElements({ className }: { className?: string }) {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981'];
    const newElements: FloatingElement[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,;
      x: Math.random() * 100,;
      y: Math.random() * 100,;
      size: Math.random() * 4 + 2,;
      speed: Math.random() * 0.5 + 0.1,;
      color: colors[Math.floor(Math.random() * colors.length)] || '#3b82f6',;
      direction: Math.random() * Math.PI * 2,;
    }));
    setElements(newElements);

    const interval = setInterval(() => {
      setElements(prev =>;
        prev.map(element => ({
          ...element,;
          x: (element.x + Math.cos(element.direction) * element.speed + 100) % 100,;
          y: (element.y + Math.sin(element.direction) * element.speed + 100) % 100,;
        }));
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (;
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>;
      {elements.map(element => (;
        <div;
          key={element.id}
          className="absolute rounded-full opacity-60 animate-pulse";
          style={{
            left: `${element.x}%`,;
            top: `${element.y}%`,;
            width: `${element.size}px`,;
            height: `${element.size}px`,;
            backgroundColor: element.color,;
            boxShadow: `0 0 ${element.size * 2}px ${element.color}`,;
          }}
        />;
      ))}
    </div>;
  );
}

// Morphing blob with fluid animations;
export function MorphingBlob({
  className,;
  color = 'hsl(217, 91%, 60%)',;
  size = 200,;
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const animate = () => {
      const numPoints = 6;
      const points: Point[] = [];

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const radius = 40 + Math.sin(Date.now() * 0.001 + i) * 20;
        points.push({
          x: 100 + Math.cos(angle) * radius,;
          y: 100 + Math.sin(angle) * radius,;
        });
      }

      if (points.length === 0) return;

      let pathData = `M ${points[0]?.x} ${points[0]?.y}`;
      for (let i = 0; i < points.length; i++) {
        const current = points[i];
        const next = points[(i + 1) % points.length];
        if (!current || !next) continue;

        const controlX = current.x + (next.x - current.x) * 0.5;
        const controlY = current.y + (next.y - current.y) * 0.5;
        pathData += ` Q ${controlX} ${controlY} ${next.x} ${next.y}`;
      }

      path.setAttribute('d', pathData);
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  return (;
    <svg;
      width={size}
      height={size}
      className={cn('absolute opacity-20', className)}
      style={{ filter: 'blur(2px)' }}
    >;
      <path ref={pathRef} fill={color} opacity="0.3" />;
    </svg>;
  );
}

// Quantum grid background;
export function QuantumGrid({
  className,;
  gridSize = 50,;
  lineColor = 'hsl(217, 91%, 60%)',;
}: {
  className?: string;
  gridSize?: number;
  lineColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.1;
import { VoiceControl } from "./voice-control";

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    resizeCanvas();
    drawGrid();

    window.addEventListener('resize', () => {
      resizeCanvas();
      drawGrid();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gridSize, lineColor]);

  return (;
    <canvas ref={canvasRef} className={cn('fixed inset-0 pointer-events-none z-0', className)} />;
  );
}

// Holographic display effect;
export function HolographicDisplay({
  children,;
  className,;
  intensity = 1,;
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const [scanlinePosition, setScanlinePosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition(prev => (prev + 2) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (;
    <div className={cn('relative overflow-hidden', className)}>;
      {children}
      <div;
        className="absolute inset-0 pointer-events-none";
        style={{
          background: `linear-gradient(;
            90deg,;
            transparent 0%,;
            rgba(59, 130, 246, ${0.1 * intensity}) 50%,;
            transparent 100%;
          )`,;
          transform: `translateY(${scanlinePosition}%)`,;
        }}
      />;
      <div;
        className="absolute inset-0 pointer-events-none opacity-20";
        style={{
          background:;
            'repeating-linear-gradient(0deg, transparent 0px, rgba(59, 130, 246, 0.03) 2px)',;
        }}
      />;
    </div>;
  );
}

// Matrix rain effect;
export function MatrixRain({ className, speed = 1 }: { className?: string; speed?: number }) {
  const [streams, setStreams] = useState<MatrixStream[]>([]);

  useEffect(() => {
    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=|[]{}()<>';
    const columns = Math.floor(window.innerWidth / 20);
    const newStreams: MatrixStream[] = Array.from({ length: columns }, (_, i) => ({
      id: i,;
      characters: Array.from(;
        { length: 20 },;
        () => characters[Math.floor(Math.random() * characters.length)] || '0';
      ),;
      positions: Array.from({ length: 20 }, (_, j) => -j * 20),;
      column: i,;
    }));

    setStreams(newStreams);

    const interval = setInterval(() => {
      setStreams(prev =>;
        prev.map(stream => ({
          ...stream,;
          positions: stream.positions.map(pos =>;
            pos > window.innerHeight ? -20 : pos + speed * 2;
          ),;
          characters: stream.characters.map(char =>;
            Math.random() < 0.05;
              ? characters[Math.floor(Math.random() * characters.length)] || '0';
              : char;
          ),;
        }));
      );
    }, 100);

    return () => clearInterval(interval);
  }, [speed]);

  return (;
    <div;
      className={cn(;
        'absolute inset-0 overflow-hidden pointer-events-none font-mono text-sm',;
        className;
      )}
    >;
      {streams.map(stream => (;
        <div key={stream.id} className="absolute" style={{ left: `${stream.column * 20}px` }}>;
          {stream.characters.map((char, i) => (;
            <div;
              key={i}
              className="text-green-400 opacity-70";
              style={{
                position: 'absolute',;
                top: `${stream.positions[i]}px`,;
                textShadow: '0 0 5px currentColor',;
              }}
            >;
              {char}
            </div>;
          ))}
        </div>;
      ))}
    </div>;
  );
}

// Additional components for completeness;
export function ScrollProgress({ className }: { className?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (;
    <div;
      className={cn(;
        'fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50',;
        className;
      )}
      style={{ width: `${progress}%` }}
    />;
  );
}

export function AIConsciousnessOrb({ className }: { className?: string }) {
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => (prev === 1 ? 1.2 : 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (;
    <div;
      className={cn(;
        'fixed top-4 right-4 w-8 h-8 rounded-full bg-blue-500 opacity-60 z-50',;
        className;
      )}
      style={{
        transform: `scale(${pulse})`,;
        transition: 'transform 0.5s ease-in-out',;
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',;
      }}
    />;
  );
}

export function VoiceControl({ className }: { className?: string }) {
  return (;
    <div;
      className={cn(;
        'fixed bottom-4 right-4 w-12 h-12 rounded-full bg-green-500 opacity-60 z-50',;
        className;
      )}
    >;
      <div className="w-full h-full flex items-center justify-center">;
        <div className="w-4 h-4 bg-white rounded-full animate-pulse" />;
      </div>;
    </div>;
  );
}

export function AIAssistantIndicator({ className }: { className?: string }) {
  return (;
    <div;
      className={cn('fixed bottom-4 left-4 flex items-center space-x-2 text-white z-50', className)}
    >;
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />;
      <span className="text-xs">AI Assistant Active</span>;
    </div>;
  );
}
