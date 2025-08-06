import React from 'react';
import { cn } from '@/lib/utils';

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("tabs-base", className)}
        {...props}
      />
    );
  }
);

Tabs.displayName = "Tabs";

export { Tabs };
export default Tabs;
