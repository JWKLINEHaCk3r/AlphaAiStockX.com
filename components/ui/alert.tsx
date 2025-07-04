import * as React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
  title?: string;
  description?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, description, ...props }, ref) => (
    <div
      ref={ref}
      className={`border rounded-md p-4 ${
        variant === 'destructive'
          ? 'bg-red-50 border-red-400 text-red-900'
          : 'bg-blue-50 border-blue-400 text-blue-900'
      } ${className || ''}`}
      role="alert"
      {...props}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
      {props.children}
    </div>
  )
);
Alert.displayName = 'Alert';

export function AlertTitle({ children }: { children: React.ReactNode }) {
  return <div className="font-bold mb-1">{children}</div>;
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-sm opacity-80">{children}</div>;
}
