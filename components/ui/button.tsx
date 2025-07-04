'use client';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  size?: string;
  asChild?: boolean;
  children?: React.ReactNode;
}
export function buttonVariants({
  variant,
  size,
  className,
}: {
  variant?: string;
  size?: string;
  className?: string;
}) {
  // Replace with your actual logic
  return [className, variant, size].filter(Boolean).join(' ');
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export default Button;
