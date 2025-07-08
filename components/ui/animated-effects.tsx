'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export function FloatingElements({ count = 20, className }: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      direction: number;
    }>
  >([]);

  useEffect(() => {
    const colors = [
      'hsl(217, 91%, 60%)', // neon-blue
      'hsl(271, 91%, 65%)', // neon-purple
      'hsl(322, 85%, 70%)', // neon-pink
      'hsl(142, 76%, 66%)', // neon-green
      'hsl(189, 85%, 70%)', // neon-cyan
    ];

    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      direction: Math.random() * Math.PI * 2,
    }));

    setElements(newElements);
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElements(prev =>
        prev.map(element => ({
          ...element,
          x: (element.x + Math.cos(element.direction) * element.speed + 100) % 100,
          y: (element.y + Math.sin(element.direction) * element.speed + 100) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
    >
      {elements.map(element => (
        <div
          key={element.id}
          className="absolute rounded-full opacity-30 animate-pulse"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            backgroundColor: element.color,
            boxShadow: `0 0 ${element.size * 2}px ${element.color}`,
          }}
        />
      ))}
    </div>
  );
}

interface MorphingBlobProps {
  className?: string;
  color?: string;
  size?: number;
}

export function MorphingBlob({
  className,
  color = 'hsl(217, 91%, 60%)',
  size = 200,
}: MorphingBlobProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.02;

      const points = [];
      const numPoints = 6;
      const radius = size / 2;
      const centerX = size / 2;
      const centerY = size / 2;

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const variation = Math.sin(time + i) * 0.3 + 0.7;
        const x = centerX + Math.cos(angle) * radius * variation;
        const y = centerY + Math.sin(angle) * radius * variation;
        points.push({ x, y });
      }

      // Create smooth curve through points
      let pathData = `M ${points[0].x} ${points[0].y}`;

      for (let i = 0; i < points.length; i++) {
        const current = points[i];
        const next = points[(i + 1) % points.length];
        const controlX = current.x + (next.x - current.x) * 0.5;
        const controlY = current.y + (next.y - current.y) * 0.5;

        pathData += ` Q ${controlX} ${controlY} ${next.x} ${next.y}`;
      }

      pathData += ' Z';
      path.setAttribute('d', pathData);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [size]);

  return (
    <svg
      width={size}
      height={size}
      className={cn('absolute opacity-20', className)}
      style={{ filter: 'blur(2px)' }}
    >
      <defs>
        <linearGradient id={`gradient-${Math.random()}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        fill={`url(#gradient-${Math.random()})`}
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.3"
      />
    </svg>
  );
}

interface QuantumGridProps {
  className?: string;
  gridSize?: number;
  lineColor?: string;
}

export function QuantumGrid({
  className,
  gridSize = 50,
  lineColor = 'hsl(217, 91%, 60%)',
}: QuantumGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      time += 0.01;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;

      // Draw animated grid
      for (let x = 0; x < canvas.width; x += gridSize) {
        const opacity = (Math.sin(time + x * 0.01) + 1) * 0.1 + 0.05;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        const opacity = (Math.sin(time + y * 0.01) + 1) * 0.1 + 0.05;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw intersection points
      ctx.fillStyle = lineColor;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const opacity = (Math.sin(time + x * 0.005 + y * 0.005) + 1) * 0.2 + 0.1;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [gridSize, lineColor]);

  return (
    <canvas ref={canvasRef} className={cn('fixed inset-0 pointer-events-none z-0', className)} />
  );
}

interface HolographicDisplayProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function HolographicDisplay({
  children,
  className,
  intensity = 1,
}: HolographicDisplayProps) {
  const [scanlinePosition, setScanlinePosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition(prev => (prev + 2) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Holographic scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 255, ${0.03 * intensity}) 2px,
            rgba(0, 255, 255, ${0.03 * intensity}) 4px
          )`,
        }}
      />

      {/* Moving scanline */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent pointer-events-none z-20 opacity-60"
        style={{
          top: `${scanlinePosition}%`,
          boxShadow: '0 0 10px hsl(189, 85%, 70%)',
        }}
      />

      {/* Content with holographic glow */}
      <div
        className="relative z-0"
        style={{
          filter: `drop-shadow(0 0 20px hsl(189, 85%, 70%, ${0.3 * intensity}))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface DataStreamProps {
  className?: string;
  speed?: number;
  density?: number;
}

export function DataStream({ className, speed = 1, density = 0.1 }: DataStreamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [streams, setStreams] = useState<
    Array<{
      id: number;
      characters: string[];
      positions: number[];
      column: number;
    }>
  >([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=|[]{}()<>';
    const columns = Math.floor(window.innerWidth / 20);

    const newStreams = Array.from({ length: Math.floor(columns * density) }, (_, i) => ({
      id: i,
      characters: Array.from(
        { length: 20 },
        () => characters[Math.floor(Math.random() * characters.length)]
      ),
      positions: Array.from({ length: 20 }, (_, j) => -j * 20),
      column: Math.floor(Math.random() * columns),
    }));

    setStreams(newStreams);
  }, [density]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const interval = setInterval(() => {
      setStreams(prev =>
        prev.map(stream => ({
          ...stream,
          positions: stream.positions.map(pos =>
            pos > window.innerHeight ? -20 : pos + speed * 2
          ),
          characters: stream.characters.map(char =>
            Math.random() < 0.05
              ? '01ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=|[]{}()<>'[Math.floor(Math.random() * 44)]
              : char
          ),
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none font-mono text-sm',
        className
      )}
    >
      {streams.map(stream => (
        <div key={stream.id} className="absolute" style={{ left: `${stream.column * 20}px` }}>
          {stream.characters.map((char, index) => (
            <div
              key={index}
              className="absolute text-neon-green opacity-70"
              style={{
                top: `${stream.positions[index]}px`,
                opacity: Math.max(0, 1 - index * 0.1),
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
