import React from 'react';
import { cn } from '../lib/utils';

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("select-base", className)}
        {...props}
      />
    );
  }
);

Select.displayName = "Select";

export { Select };
export default Select;
