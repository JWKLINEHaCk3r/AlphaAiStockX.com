import React from 'react';
import { cn } from '../lib/utils';

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Label = React.forwardRef<HTMLDivElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("label-base", className)}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label };
export default Label;
