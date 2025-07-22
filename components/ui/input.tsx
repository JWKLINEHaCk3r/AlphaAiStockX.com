import * as React from 'react';

export function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return <input className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm ${className}`} {...props} />;
}
import * as React from 'react';

export function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return <input className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm ${className}`} {...props} />;
}

// Removed legacy code and extra exports
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}


import * as React from 'react';

export function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return <input className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm ${className}`} {...props} />;
}
export { Input };
