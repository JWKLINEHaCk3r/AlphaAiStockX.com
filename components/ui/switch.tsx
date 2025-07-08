import { Switch } from "./switch";
'use client';
import React from 'react';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function Switch({
  checked,
  onCheckedChange,
<<<<<<< HEAD
  className,
  disabled = false,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
=======
  disabled = false,
  className = "",
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
<<<<<<< HEAD
      className={cn(
        `relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${
          disabled
            ? 'bg-gray-400 cursor-not-allowed opacity-50'
            : checked
              ? 'bg-fuchsia-600'
              : 'bg-slate-600'
        }`,
        className
      )}
=======
      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${
        disabled 
          ? 'bg-slate-400 cursor-not-allowed' 
          : checked 
            ? 'bg-fuchsia-600' 
            : 'bg-slate-600'
      } ${className}`}
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  );
}
