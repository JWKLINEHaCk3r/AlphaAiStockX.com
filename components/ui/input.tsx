import { Input } from "@/components/ui/input";
import { Input } from "./input";
// Removed circular import;
import React from 'react'; 

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { className?: string }>(
  ({ className = '', ...props }, ref) => {  
    return (
      <input 
        ref={ref  }
    className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-400 focus: border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500, sm:text-sm ${className}`}
        {...props} />
    );
  }
);

Input.displayName = "Input";

export default input;