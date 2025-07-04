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
  variant = "default",
  size = "default",
  className,
}: {
  variant?: string;
  size?: string;
  className?: string;
}) {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  };

  return cn(
    baseStyles,
    variants[variant as keyof typeof variants] || variants.default,
    sizes[size as keyof typeof sizes] || sizes.default,
    className
  );
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

export { Button };
export default Button;
