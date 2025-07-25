import { Card, CardHeader, CardContent, CardDescription, CardTitle } from './card.js';
import React from 'react';

export function Card({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return <div className={`rounded-xl border bg-white text-black shadow ${className}`} {...props}>{children}</div>;
}

export function CardHeader({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>{children}</div>;
}

export function CardContent({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>;
}

export function CardDescription({ children, className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement> & { className?: string }) {
  return <p className={`text-sm text-gray-500 ${className}`} {...props}>{children}</p>;
}

export function CardTitle({ children, className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement> & { className?: string }) {
  return <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...props}>{children}</h3>;
}
