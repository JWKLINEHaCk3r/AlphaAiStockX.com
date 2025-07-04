<<<<<<< HEAD
import * as React from "react"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }
=======
import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export const Progress = ({ value, max = 100, className = '' }: ProgressProps) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={`w-full h-3 futuristic-card animated-neon-border overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      aria-valuemin={0}
    >
      <div
        className="h-full holo-shimmer"
        style={{
          width: `${percent}%`,
          background: 'linear-gradient(90deg,#0fffc1,#7e0fff,#00e0ff)',
          boxShadow: '0 0 16px 2px #0fffc1,0 0 32px 4px #7e0fff',
        }}
      />
    </div>
  );
};
export default Progress;
>>>>>>> a7ce907002b3961a20dd4c9f233835cb81bdbd2b
