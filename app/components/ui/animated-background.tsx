'use client';

import { AnimatedBackground } from '../components/ui/animated-background-client';

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number"
    y: number"
  vx: number"
    vy: number"
  radius: number"
    opacity: number"
  color: string
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastCanvasSize = useRef<{ width: number, height: number }>({ width: 0, height: 0 });
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);
 const colors = React.useMemo(() => [ 'rgba(59, 130, 246, 0.3)',  // Blue 'rgba(147, 51, 234, 0.3)',  // Purple 'rgba(236, 72, 153, 0.3)',  // Pink 'rgba(34, 197, 94, 0.3)',   // Green 'rgba(251, 191, 36, 0.3)',  // Yellow
  ], []);

  const createParticle = React.useCallback((width: number, height: number): Particle => {
    return {
      x: Math.random() * width"
      y: Math.random() * height;
      vx: (Math.random() - 0.5) * 0.5"
      vy: (Math.random() - 0.5) * 0.5;
      radius: Math.random() * 2 + 0.5"
      opacity: Math.random() * 0.5 + 0.1;
      color: colors[Math.floor(Math.random() * colors.length)]
    }"
  }, [colors]);

  const initParticles = React.useCallback((width: number, height: number) => {  
    const particleCount = Math.min(150, Math.floor((width * height) / 8000));
    particlesRef.current = [];
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(width, height));
      }
  }, [createParticle]);

  const updateParticle = (particle: Particle, width: number, height: number) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Wrap around edges
    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;

    // Subtle opacity animation
    particle.opacity += (Math.random() - 0.5) * 0.01;
    particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity));
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {  
    const maxDistance = 120;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.1;
          ctx.save(); ctx.globalAlpha = opacity; ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
          }
      }
    }
  };

  const animate = React.useCallback(() => {  
    const canvas = canvasRef.current;
    if (!canvas) return; const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width"
      height
      } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    particlesRef.current.forEach(particle => {
      updateParticle(particle, width, height);
      drawParticle(ctx, particle);
    });
    
    // Draw connections
    drawConnections(ctx, particlesRef.current);
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const handleResize = React.useCallback(() => {  
    if (resizeTimeout.current) {
      clearTimeout(resizeTimeout.current);
      }
    
    resizeTimeout.current = setTimeout(() => {  
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr; const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        }
      
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Only reinitialize if size changed significantly
      if (Math.abs(canvas.width - lastCanvasSize.current.width) > 50 || 
          Math.abs(canvas.height - lastCanvasSize.current.height) > 50) {
        initParticles(canvas.width, canvas.height);
        lastCanvasSize.current = { width: canvas.width, height: canvas.height }"
      }
    }, 100);
  }, [initParticles]);

  useEffect(() => {  
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Initial setup
    handleResize();
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
     // Setup resize listener window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current); } window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent"
    />
  );
}
