import React from 'react';
import type { Config } from 'tailwindcss';
 const config: Config = { darkMode: ['class'], content: [ './pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', '*.{js,ts,jsx,tsx,mdx}', ], prefix: '',
  theme: {
      container: { center: true, padding: '2rem', screens: { '2xl': '1400px';
      }
  },
    extend: { colors: { border: 'hsl(var(--border))', input: 'hsl(var(--input))', ring: 'hsl(var(--ring))', background: 'hsl(var(--background))', foreground: 'hsl(var(--foreground))', primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))'
  }, secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))'
  }, destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))'
  }, muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))'
  }, accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))'
  }, popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))'
  }, card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))'
  },
        // Enhanced neon colors neon: { blue: 'hsl(var(--neon-blue))', purple: 'hsl(var(--neon-purple))', pink: 'hsl(var(--neon-pink))', green: 'hsl(var(--neon-green))', orange: 'hsl(var(--neon-orange))', cyan: 'hsl(var(--neon-cyan))'
  }
  }, fontFamily: { sans: ['var(--font-sans)'], mono: ['var(--font-mono)']
  }, borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)', xl: 'calc(var(--radius) + 4px)', '2xl': 'calc(var(--radius) + 8px)', '3xl': 'calc(var(--radius) + 12px)'
  }, spacing: { '18': '4.5rem', '88': '22rem', '128': '32rem'
  }, backdropBlur: { xs: '2px'
  }, keyframes: { 'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' }, }, 'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' }, }, 'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' }, }, 'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(10px)', }, '100%': { opacity: '1', transform: 'translateY(0)'
  }, }, 'fade-in-down': { '0%': { opacity: '0', transform: 'translateY(-10px)', }, '100%': { opacity: '1', transform: 'translateY(0)'
  }, }, 'slide-up': { '0%': { opacity: '0', transform: 'translateY(30px)', }, '100%': { opacity: '1', transform: 'translateY(0)'
  }, }, 'slide-down': { '0%': { opacity: '0', transform: 'translateY(-30px)', }, '100%': { opacity: '1', transform: 'translateY(0)'
  }, }, 'scale-in': { '0%': { opacity: '0', transform: 'scale(0.9)', }, '100%': { opacity: '1', transform: 'scale(1)'
  }
  }, float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' }, }, 'pulse-glow': { '0%, 100%': { opacity: '1', boxShadow: '0 0 20px hsl(var(--neon-blue) / 0.4)', }, '50%': { opacity: '0.8', boxShadow: '0 0 40px hsl(var(--neon-blue) / 0.8), 0 0 60px hsl(var(--neon-purple) / 0.4)'
  }
  }, shimmer: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' }, }, 'rotate-y': { '0%': { transform: 'rotateY(0deg)' }, '100%': { transform: 'rotateY(360deg)' }, }, 'bounce-gentle': { '0%, 100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)', }, '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
  }
  }
  }, animation: { 'accordion-down': 'accordion-down 0.2s ease-out', 'accordion-up': 'accordion-up 0.2s ease-out', 'fade-in': 'fade-in 0.5s ease-in-out', 'fade-in-up': 'fade-in-up 0.5s ease-out', 'fade-in-down': 'fade-in-down 0.5s ease-out', 'slide-up': 'slide-up 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)', 'slide-down': 'slide-down 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)', 'scale-in': 'scale-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)', float: 'float 6s ease-in-out infinite', 'pulse-glow': 'pulse-glow 3s ease-in-out infinite', shimmer: 'shimmer 2s infinite', 'rotate-y': 'rotate-y 3s linear infinite', 'bounce-gentle': 'bounce-gentle 2s infinite', 'spin-slow': 'spin 4s linear infinite'
  }, transitionTimingFunction: { spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }, boxShadow: { glow: '0 0 20px hsl(var(--neon-blue) / 0.3)', 'glow-lg': '0 0 40px hsl(var(--neon-blue) / 0.4)', neon: '0 0 5px currentColor
               0 0 20px currentColor 0 0 40px currentColor', 'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)'
  }, backgroundImage: { 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))', 'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))', 'gradient-primary': 'linear-gradient(135deg, hsl(var(--neon-blue)) 0%, hsl(var(--neon-purple)) 100%)', 'gradient-secondary': 'linear-gradient(135deg, hsl(var(--neon-pink)) 0%, hsl(var(--neon-orange)) 100%)', 'gradient-accent': 'linear-gradient(135deg, hsl(var(--neon-green)) 0%, hsl(var(--neon-cyan)) 100%)'
  }
  }, }, plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
  };

export default config;
