'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  TrendingUp, 
  Brain, 
  Settings, 
  User,
  ChevronDown,
  Sparkles,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Home className="w-4 h-4" />,
  },
  {
    label: 'AI Trading',
    href: '/trading',
    icon: <Brain className="w-4 h-4" />,
    children: [
      { label: 'Live Trading', href: '/trading/live' },
      { label: 'Backtesting', href: '/trading/backtest' },
      { label: 'Strategies', href: '/trading/strategies' },
      { label: 'AI Agents', href: '/trading/agents' },
    ],
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: <TrendingUp className="w-4 h-4" />,
    children: [
      { label: 'Portfolio', href: '/analytics/portfolio' },
      { label: 'Market Scan', href: '/analytics/scanner' },
      { label: 'Risk Analysis', href: '/analytics/risk' },
      { label: 'Performance', href: '/analytics/performance' },
    ],
  },
  {
    label: 'Education',
    href: '/education',
    icon: <Sparkles className="w-4 h-4" />,
  },
];

function DropdownMenu({ item, isOpen, onToggle }: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-neon-blue group"
      >
        {item.icon}
        {item.label}
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform duration-200",
          isOpen ? "rotate-180" : ""
        )} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 glass-card border border-neon-blue/20 rounded-xl shadow-glow overflow-hidden z-50">
          {item.children?.map((child, index) => (
            <a
              key={index}
              href={child.href}
              className="block px-4 py-3 text-sm transition-colors hover:bg-neon-blue/10 hover:text-neon-blue border-b border-white/5 last:border-b-0"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileMenu({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-80 glass-card border-l border-neon-blue/20 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold neon-text">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-2">
          {navigation.map((item, index) => (
            <div key={index}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => setOpenDropdown(
                      openDropdown === item.label ? null : item.label
                    )}
                    className="flex items-center justify-between w-full px-4 py-3 text-left transition-colors hover:bg-white/10 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </div>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform",
                      openDropdown === item.label ? "rotate-180" : ""
                    )} />
                  </button>
                  
                  {openDropdown === item.label && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <a
                          key={childIndex}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-neon-blue transition-colors rounded-lg hover:bg-white/5"
                          onClick={onClose}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/10 rounded-lg"
                  onClick={onClose}
                >
                  {item.icon}
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="space-y-3">
            <Button variant="default" size="sm" className="w-full">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NextLevelNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    // Skip during SSR
    if (typeof document === 'undefined') return;

    document.addEventListener('click', handleClickOutside);
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('click', handleClickOutside);
      }
    };
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled 
          ? "glass-card border-b border-neon-blue/20 shadow-glow" 
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center animate-pulse-glow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="font-bold text-xl">
                <span className="neon-text">Alpha</span>
                <span className="text-neon-orange">AI</span>
                <span className="text-neon-cyan">StockX</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <div key={index} onClick={(e) => e.stopPropagation()}>
                  {item.children ? (
                    <DropdownMenu
                      item={item}
                      isOpen={openDropdown === item.label}
                      onToggle={() => setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )}
                    />
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-neon-blue rounded-lg hover:bg-white/10"
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button variant="default" size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Spacer for fixed navigation */}
      <div className="h-16" />
    </>
  );
}
