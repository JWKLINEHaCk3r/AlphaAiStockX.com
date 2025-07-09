<<<<<<< HEAD
import { Button } from "./button";
'use client';
=======
import { Button } from '@/components/ui/button';
('use client');
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.
import React from 'react';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  children?: React.ReactNode;
}

export function buttonVariants({
  variant = 'default',
  size = 'default',
  className,
}: {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
}) {
<<<<<<< HEAD
  const baseStyles =
    'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group transform-gpu';

  const variants = {
    default:
      'bg-gradient-primary text-white shadow-glow hover:shadow-glow-lg hover:scale-105 border border-neon-blue/30',
    destructive:
      'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:from-red-600 hover:to-red-700 hover:scale-105',
    outline:
      'glass-card border-2 border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue hover:scale-105 backdrop-blur-xl',
    secondary:
      'bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 text-white shadow-lg hover:from-neon-purple/30 hover:to-neon-pink/30 border border-neon-purple/30 hover:scale-105',
    ghost: 'text-neon-blue hover:bg-neon-blue/10 hover:text-neon-blue',
    link: 'text-neon-blue underline-offset-4 hover:underline hover:text-neon-purple transition-colors',
  };

  const sizes = {
    default: 'h-12 px-6 py-3 text-base',
    sm: 'h-9 px-4 py-2 text-sm rounded-lg',
    lg: 'h-14 px-8 py-4 text-lg rounded-2xl',
    icon: 'h-12 w-12 rounded-xl',
  };

  return cn(
    baseStyles,
    variants[variant as keyof typeof variants] || variants.default,
    sizes[size as keyof typeof sizes] || sizes.default,
=======
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };
  
  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };
  
  return cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
    className
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    // Since we removed Slot dependency, we'll just use button element
    return (
<<<<<<< HEAD
      <Comp className={buttonVariants({ variant, size, className })} ref={ref} {...props}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 group-hover:animate-shimmer" />
      </Comp>
=======
      <button 
        className={buttonVariants({ variant, size, className })} 
        ref={ref} 
        {...props}
      >
        {children}
      </button>
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
    );
  }
);

Button.displayName = 'Button';

export { Button };
export default Button;
