import React from 'react';
import { cn } from '@/lib/utils';

interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("dropdown-menu-base", className)}
        {...props}
      />
    );
  }
);

DropdownMenu.displayName = "DropdownMenu";

export { DropdownMenu };
export default DropdownMenu;
