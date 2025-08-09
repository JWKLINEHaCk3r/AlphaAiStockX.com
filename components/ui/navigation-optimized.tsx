'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';

const navigationItems = [
  {
    label: 'AI Trading',
    href: '/ai-trading',
    submenu: [
      { label: 'Dashboard', href: '/ai-trading/dashboard' },
      { label: 'Algorithms', href: '/ai-trading/algorithms' },
      { label: 'Backtesting', href: '/ai-trading/backtesting' }
    ]
  },
  {
    label: 'Analytics',
    href: '/analytics',
    submenu: [
      { label: 'Market Analysis', href: '/analytics/market' },
      { label: 'Portfolio', href: '/analytics/portfolio' },
      { label: 'Risk Assessment', href: '/analytics/risk' }
    ]
  },
  { label: 'Platform', href: '/platform' },
  { label: 'Subscribe', href: '/subscribe' }
];

const mobileNavigationItems = [
  { label: 'Home', href: '/' },
  { label: 'AI Trading', href: '/ai-trading' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Platform', href: '/platform' },
  { label: 'Subscribe', href: '/subscribe' }
];

interface DropdownMenuProps {
  item: {
    label: string;
    href: string;
    submenu?: Array<{ label: string; href: string }>;
  };
  isOpen: boolean;
  onToggle: () => void;
}

function DropdownMenu({ item, isOpen, onToggle }: DropdownMenuProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-neon-blue group"
      >
        {item.label}
        <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-black/90 backdrop-blur-md border border-neon-blue/20 rounded-lg shadow-lg">
          {item.submenu?.map((subItem, index) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className={cn(
                'block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-neon-blue/10 border-b border-gray-800',
                index === item.submenu!.length - 1 && 'border-b-0'
              )}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-black/95 border-l border-neon-blue/20 p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="space-y-2">
          {mobileNavigationItems.map((item, index) => {
            const hasSubmenu = navigationItems.find(navItem => navItem.label === item.label)?.submenu;
            
            return (
              <div key={item.href}>
                {hasSubmenu ? (
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 text-left transition-colors hover:bg-white/10 rounded-lg"
                  >
                    <span className="text-gray-300">{item.label}</span>
                    <ChevronDown className="w-4 h-4 transition-transform" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block px-4 py-3 text-gray-300 transition-colors hover:text-white hover:bg-white/10 rounded-lg"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <Button asChild className="w-full bg-neon-blue hover:bg-neon-blue/80">
            <Link href="/subscribe">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled ? 'glass-card border-b border-neon-blue/20 shadow-glow' : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-white">AlphaAI StockX</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.href}>
                  {item.submenu ? (
                    <DropdownMenu
                      item={item}
                      isOpen={openDropdown === item.label}
                      onToggle={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    />
                  ) : (
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white hover:bg-white/10 rounded-lg"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button asChild className="hidden lg:inline-flex bg-neon-blue hover:bg-neon-blue/80">
                <Link href="/subscribe">Get Started</Link>
              </Button>
              
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
