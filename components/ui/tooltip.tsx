import React from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("tooltip-base", className)}
        {...props}
      />
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
export default Tooltip;
