import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Input = React.forwardRef<HTMLDivElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("input-base", className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
export default Input;
