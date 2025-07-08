import { Button } from "@/components/ui/button";
'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group transform-gpu',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-primary text-white shadow-glow hover:shadow-glow-lg hover:scale-[1.02] border border-neon-blue/30',
        destructive:
          'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:from-red-600 hover:to-red-700 hover:scale-[1.02]',
        outline:
          'glass-card border-2 border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue hover:scale-[1.02] backdrop-blur-xl',
        secondary:
          'bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 text-white shadow-lg hover:from-neon-purple/30 hover:to-neon-pink/30 border border-neon-purple/30 hover:scale-[1.02]',
        ghost: 'text-neon-blue hover:bg-neon-blue/10 hover:text-neon-blue',
        link: 'text-neon-blue underline-offset-4 hover:underline hover:text-neon-purple transition-colors',
      },
      size: {
        default: 'h-12 px-6 py-3 text-base',
        sm: 'h-9 px-4 py-2 text-sm rounded-lg',
        lg: 'h-14 px-8 py-4 text-lg rounded-2xl',
        icon: 'h-12 w-12 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 group-hover:animate-shimmer" />
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
