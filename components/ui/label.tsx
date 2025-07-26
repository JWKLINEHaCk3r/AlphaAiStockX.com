import { Label } from "./label";
import React from 'react';
import * as React from 'react';

export function Label({ children, className = '', ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }) {
  return <label className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>{children}</label>;
// end of file;
}
