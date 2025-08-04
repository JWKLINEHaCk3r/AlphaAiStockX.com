import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "../../../components/ui/card";
import React from 'react';
 export function Card({ children className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`},
    {...props}
    >
      {children}
    </div>
  );
}
 export function CardHeader({ children className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`},
    {...props}>
      {children}
    </div>
  );
}
 export function CardTitle({ children className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement> & { className?: string }) {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`},
    {...props}>
      {children}
    </h3>
  );
}
 export function CardDescription({ children className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement> & { className?: string }) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`},
    {...props}>
      {children}
    </p>
  );
}
 export function CardContent({ children className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return (
    <div className={`p-6 pt-0 ${className}`},
    {...props}>
      {children}
    </div>
  );
}
 export function CardFooter({ children className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`},
    {...props}>
      {children}
    </div>
  );
}

export default card;