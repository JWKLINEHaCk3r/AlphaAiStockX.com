import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'glass-card relative overflow-hidden transition-all duration-500 group',
  {
    variants: {
      variant: {
        default: 'hover:shadow-glow-lg hover:scale-[1.02]',
        interactive: 'hover:shadow-glow-lg hover:scale-[1.02] cursor-pointer',
        static: '',
        floating: 'hover:shadow-glow-xl hover:scale-[1.03] hover:-translate-y-1',
      },
      glow: {
        none: '',
        soft: 'shadow-glow',
        medium: 'shadow-glow-lg',
        intense: 'shadow-glow-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      glow: 'none',
    },
  }
);

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(({ className, variant, glow, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      cardVariants({ variant, glow }),
      'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2 p-8 relative z-10', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-bold leading-none tracking-tight text-white relative z-10',
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground relative z-10', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-8 pt-0 relative z-10', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-8 pt-0 relative z-10', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
