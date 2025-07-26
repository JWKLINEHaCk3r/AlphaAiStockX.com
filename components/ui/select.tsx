import { SelectValue } from "./select";
import { SelectTrigger } from "./select";
import { SelectItem } from "./select";
import { SelectContent } from "./select";
import { Select } from "./select";
import React from 'react';
import * as React from 'react';

export function Select({ value, onValueChange, children, className = '', ...props }: { value?: string, onValueChange?: (v: string) => void, children: React.ReactNode, className?: string }) {
  return <div className={`relative ${className}`} {...props}>{children}</div>;
}

export function SelectTrigger({ children, className = '', ...props }: React.HTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return <button className={`w-full rounded border px-3 py-2 bg-white text-black ${className}`} {...props}>{children}</button>;
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <span className="text-gray-400">{placeholder}</span>;
}

export function SelectContent({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return <div className={`absolute z-10 mt-1 w-full rounded bg-white shadow-lg ${className}`} {...props}>{children}</div>;
}

export function SelectItem({ children, value }: { children: React.ReactNode, value: string }) {
  return <div data-value={value} className="cursor-pointer px-4 py-2 hover:bg-purple-100">{children}</div>;
}