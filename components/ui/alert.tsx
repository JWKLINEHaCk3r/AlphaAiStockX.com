import React from 'react';
import { cn } from '@/lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("alert-base", className)}
        {...props}
      />
    );
  }
);

Alert.displayName = "Alert";

export { Alert };
export default Alert;
