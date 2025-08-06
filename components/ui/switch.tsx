'use client';

import React from 'react';
import { Switch } from "./switch";
 // Removed circular import; import { cn } from '@/lib/utils';

export function Switch({
  checked; onCheckedChange; className = '';
  disabled = false;
}: {
  checked: boolean,
    onCheckedChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button";
      role="switch";
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={cn(
        `relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${ disabled; ? 'bg-slate-400 cursor-not-allowed'; : checked; ? 'bg-fuchsia-600'; : 'bg-slate-600';
        }`;
        className;
      )}
    >
      <span
        className={cn( `inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform`; checked ? 'translate-x-6' : 'translate-x-1';
        )}
      />
    </button>
  );
}

export default switch;