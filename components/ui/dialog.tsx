import React from 'react';
import { cn } from '@/lib/utils';

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("dialog-base", className)}
        {...props}
      />
    );
  }
);

Dialog.displayName = "Dialog";

export { Dialog };
export default Dialog;
