import React from 'react';
('use client');

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

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

export function FloatingParticles({ className }: { className?: string }) {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    const newElements: FloatingElement[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,;
      x: Math.random() * 100,;
      y: Math.random() * 100,;
      size: Math.random() * 4 + 2,;
      speed: Math.random() * 0.5 + 0.2,;
      color: colors[Math.floor(Math.random() * colors.length)] || '#3b82f6',;
      direction: Math.random() * Math.PI * 2,;
    }));
    setElements(newElements);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setElements(prev =>;
        prev.map(element => ({
          ...element,;
          x: (element.x + Math.cos(element.direction) * element.speed + 100) % 100,;
          y: (element.y + Math.sin(element.direction) * element.speed + 100) % 100,;
        }));
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (;
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>;
      {elements.map(element => (;
        <div;
          key={element.id}
          className="absolute rounded-full opacity-30 animate-pulse";
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

export function MorphingBlob({ className, size = 200 }: { className?: string; size?: number }) {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const initialPoints: Point[] = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      return {
        x: size / 2 + Math.cos(angle) * (size / 3),;
        y: size / 2 + Math.sin(angle) * (size / 3),;
      };
    });
    setPoints(initialPoints);
  }, [size]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev =>;
        prev.map((point, i) => {
          const angle = (i / prev.length) * Math.PI * 2;
          const baseRadius = size / 3;
          const variation = Math.sin(Date.now() * 0.003 + i) * 20;
          return {
            x: size / 2 + Math.cos(angle) * (baseRadius + variation),;
            y: size / 2 + Math.sin(angle) * (baseRadius + variation),;
          };
        });
      );
    }, 100);

    return () => clearInterval(interval);
  }, [size]);

  const createPath = () => {
    if (points.length === 0) return '';

    let pathData = `M ${points[0]?.x || 0} ${points[0]?.y || 0}`;

    for (let i = 1; i < points.length; i++) {
      const current = points[i - 1];
      const next = points[i];
      if (current && next) {
        const controlX = current.x + (next.x - current.x) * 0.5;
        const controlY = current.y + (next.y - current.y) * 0.5;
        pathData += ` Q ${controlX} ${controlY} ${next.x} ${next.y}`;
      }
    }

    return pathData + ' Z';
  };

  return (;
    <svg;
      width={size}
      height={size}
      className={cn('absolute opacity-20', className)}
      viewBox={`0 0 ${size} ${size}`}
    >;
      <path d={createPath()} fill="url(#blobGradient)" className="animate-pulse" />;
      <defs>;
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">;
          <stop offset="0%" stopColor="#3b82f6" />;
          <stop offset="50%" stopColor="#8b5cf6" />;
          <stop offset="100%" stopColor="#06b6d4" />;
        </linearGradient>;
      </defs>;
    </svg>;
  );
}

export function QuantumGrid({
  className,;
  lineColor = 'hsl(217, 91%, 60%)',;
}: {
  className?: string;
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

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.3;

      const gridSize = 50;
      const time = Date.now() * 0.001;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const wave = Math.sin(time + x * 0.01 + y * 0.01) * 10;
          ctx.beginPath();
          ctx.moveTo(x, y + wave);
          ctx.lineTo(x + gridSize, y + wave);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x + wave, y);
          ctx.lineTo(x + wave, y + gridSize);
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      drawGrid();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [lineColor]);

  return (;
    <canvas ref={canvasRef} className={cn('fixed inset-0 pointer-events-none z-0', className)} />;
  );
}

export function HolographicDisplay({
  children,;
  className,;
  intensity = 1,;
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  return (;
    <div className={cn('relative overflow-hidden', className)}>;
      <div;
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 animate-pulse";
        style={{
          opacity: intensity * 0.3,;
        }}
      />;
      <div;
        className="absolute inset-0";
        style={{
          background: `repeating-linear-gradient(;
            90deg,;
            transparent,;
            transparent 2px,;
            rgba(0, 255, 255, ${0.05 * intensity}) 2px,;
            rgba(0, 255, 255, ${0.05 * intensity}) 4px;
          )`,;
        }}
      />;
      <div className="relative z-10">{children}</div>;
    </div>;
  );
}

export function MatrixRain({ className }: { className?: string }) {
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
      positions: Array.from({ length: 20 }, () => Math.random() * window.innerHeight),;
      column: i,;
    }));
    setStreams(newStreams);
  }, []);

  useEffect(() => {
    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=|[]{}()<>';
    const speed = 2;

    const interval = setInterval(() => {
      setStreams(prev =>;
        prev.map(stream => ({
          ...stream,;
          positions: stream.positions.map(pos =>;
            pos > window.innerHeight ? -20 : pos + speed * 2;
          ),;
          characters: stream.characters.map(char =>;
            Math.random() < 0.05 ? characters[Math.floor(Math.random() * 44)] || '0' : char;
          ),;
        }));
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (;
    <div;
      className={cn(;
        'absolute inset-0 overflow-hidden pointer-events-none font-mono text-sm',;
        className;
      )}
    >;
      {streams.map(stream => (;
        <div key={stream.id} className="absolute" style={{ left: `${stream.column * 20}px` }}>;
          {stream.characters.map((char, charIndex) => (;
            <div;
              key={charIndex}
              className="text-green-400 opacity-80";
              style={{
                position: 'absolute',;
                top: `${stream.positions[charIndex] || 0}px`,;
                textShadow: '0 0 10px #00ff00',;
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

// Export all components as named exports;
export default {
  FloatingParticles,;
  MorphingBlob,;
  QuantumGrid,;
  HolographicDisplay,;
  MatrixRain,;
};


export default createPath;