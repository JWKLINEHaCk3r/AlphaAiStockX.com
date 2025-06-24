'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export default function AIWhiteLabelBranding() {
  const [brand, setBrand] = useState({
    name: 'AlphaAIStockX',
    color: '#a78bfa',
    logo: '🤖',
  });

  // Placeholder: In real app, this would update global theme/branding
  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">White-label Branding Center</h2>
      <p className="text-slate-300 mb-4">
        Easily customize name, color, and logo for your own brand or clients.
      </p>
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-slate-200">Platform Name</label>
        <input
          className="px-4 py-2 rounded bg-black/60 border border-violet-700 text-white"
          value={brand.name}
          onChange={e => setBrand(b => ({ ...b, name: e.target.value }))}
        />
        <label className="text-slate-200">Primary Color</label>
        <input
          type="color"
          className="w-16 h-8"
          value={brand.color}
          onChange={e => setBrand(b => ({ ...b, color: e.target.value }))}
        />
        <label className="text-slate-200">Logo Emoji</label>
        <input
          className="px-4 py-2 rounded bg-black/60 border border-violet-700 text-white w-20"
          value={brand.logo}
          onChange={e => setBrand(b => ({ ...b, logo: e.target.value }))}
        />
      </div>
      <div className="flex items-center gap-3 mt-4">
        <span className="text-3xl" style={{ color: brand.color }}>
          {brand.logo}
        </span>
        <span className="text-xl font-bold" style={{ color: brand.color }}>
          {brand.name}
        </span>
      </div>
      <div className="text-xs text-slate-400 mt-2">
        (All UI and reports will reflect your branding.)
      </div>
    </div>
  );
}
