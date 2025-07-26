import { Card } from "../../../components/ui/card";
import React from 'react';

export function Card({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return <div className={`rounded-xl border bg-white text-black shadow ${className}`} {...props}>{children}</div>;
}

export function CardHeader({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="border-b px-4 py-2 font-bold" {...props}>{children}</div>;
}

export function CardContent({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="p-4" {...props}>{children}</div>;
}

export function CardTitle({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <h3 className="text-lg font-semibold" {...props}>{children}</h3>;
}
