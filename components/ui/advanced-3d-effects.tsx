'use client';

import { Canvas } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, OrbitControls, Environment } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Mesh, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

// Floating 3D Orbs Component
function FloatingOrb({ position, color, intensity = 1 }: { 
  position: [number, number, number]; 
  color: string; 
  intensity?: number; 
}) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={intensity}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Neural Network Connections
function NeuralNetwork() {
  const lines = useMemo(() => {
    const lineData = [];
    const numNodes = 20;
    
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        if (Math.random() > 0.7) {
          lineData.push({
            start: new Vector3(
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ),
            end: new Vector3(
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            )
          });
        }
      }
    }
    return lineData;
  }, []);

  return (
    <group>
      {lines.map((line, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                line.start.x, line.start.y, line.start.z,
                line.end.x, line.end.y, line.end.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
        </line>
      ))}
    </group>
  );
}

// Main 3D Scene Component
function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      <FloatingOrb position={[-8, 2, -5]} color="#3b82f6" intensity={0.5} />
      <FloatingOrb position={[8, -2, -3]} color="#ec4899" intensity={0.3} />
      <FloatingOrb position={[0, 4, -8]} color="#8b5cf6" intensity={0.4} />
      <FloatingOrb position={[-5, -3, 2]} color="#06b6d4" intensity={0.3} />
      
      <NeuralNetwork />
      
      <Environment preset="night" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

// Interactive Cursor Effect
export function InteractiveCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      setIsHovering(target.closest('.interactive-cursor') !== null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
      style={{
        left: mousePosition.x - 10,
        top: mousePosition.y - 10,
        transform: isHovering ? 'scale(2)' : 'scale(1)',
      }}
    >
      <div className={`w-5 h-5 rounded-full border-2 transition-colors duration-300 ${
        isHovering ? 'border-neon-blue bg-neon-blue/20' : 'border-white/50'
      }`} />
    </div>
  );
}

// Advanced Background 3D Scene
export function Advanced3DBackground({ className }: { className?: string }) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <Scene3D />
      </Canvas>
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
          className="absolute w-1 h-1 bg-neon-cyan rounded-full animate-pulse"
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
  }>>([]);

  useEffect(() => {
    // Initialize particles
    const colors = ['#3b82f6', '#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b'];
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(initialParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let newVx = particle.vx;
        let newVy = particle.vy;
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          newVx += (dx / distance) * force * 0.5;
          newVy += (dy / distance) * force * 0.5;
        }
        
        let newX = particle.x + newVx;
        let newY = particle.y + newVy;
        
        // Bounce off edges
        if (newX < 0 || newX > window.innerWidth) newVx = -newVx;
        if (newY < 0 || newY > window.innerHeight) newVy = -newVy;
        
        return {
          ...particle,
          x: Math.max(0, Math.min(window.innerWidth, newX)),
          y: Math.max(0, Math.min(window.innerHeight, newY)),
          vx: newVx * 0.99, // Damping
          vy: newVy * 0.99
        };
      }));
    }, 16);

    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <svg className="w-full h-full">
        {particles.map(particle => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
            opacity={0.6}
            filter={`drop-shadow(0 0 ${particle.size * 2}px ${particle.color})`}
          />
        ))}
        
        {/* Draw connections between nearby particles */}
        {particles.map((particle, i) => 
          particles.slice(i + 1).map((otherParticle, j) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
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
          })
        )}
        
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
