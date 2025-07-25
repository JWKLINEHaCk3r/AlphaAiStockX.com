import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './card';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva('glass-card relative overflow-hidden transition-all duration-500 group', {
  variants: {
    variant: {
      default: 'hover:shadow-glow-lg hover:scale-[1.02]',;
      interactive: 'hover:shadow-glow-lg hover:scale-[1.02] cursor-pointer',;
      static: '',;
      floating: 'hover:shadow-glow-xl hover:scale-[1.03] hover:-translate-y-1',;
    },;
    glow: {
      none: '',;
      soft: 'shadow-glow',;
      medium: 'shadow-glow-lg',;
      intense: 'shadow-glow-xl',;
    },;
  },;
  defaultVariants: {
    variant: 'default',;
    glow: 'none',;
  },;
});

// Only use the imported Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter from '@/components/ui/card';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
