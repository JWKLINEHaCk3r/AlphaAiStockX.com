const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing missing cards and components...');

// Create missing trading components
try {
  const componentsDir = path.join(process.cwd(), 'components/ui');
  
  // Ensure components directory exists
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
    console.log('📁 Created components/ui directory');
  }

  // Create missing basic components if they don't exist
  const components = {
    'button.tsx': `import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
            'border border-input hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'text-primary underline-offset-4 hover:underline': variant === 'link',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;`,

    'badge.tsx': `import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          {
            'border-transparent bg-primary text-primary-foreground hover:bg-primary/80': variant === 'default',
            'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80': variant === 'destructive',
            'text-foreground': variant === 'outline',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
export default Badge;`,

    'progress.tsx': `import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <div
          className="h-full w-full flex-1 bg-primary transition-all"
          style={{ transform: "translateX(-" + (100 - percentage) + "%)" }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
export default Progress;`
  };

  // Create missing components
  for (const [filename, content] of Object.entries(components)) {
    const filePath = path.join(componentsDir, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
      console.log('✅ Created ' + filename);
    } else {
      console.log('⏭️ ' + filename + ' already exists, skipping');
    }
  }

  // Create/update index file for easy imports
  const indexContent = [
    "export * from './trading-cards';",
    "export * from './card';", 
    "export * from './button';",
    "export * from './badge';",
    "export * from './progress';",
    "export * from './input';",
    "export * from './label';"
  ].join('\n');
  
  fs.writeFileSync(path.join(componentsDir, 'index.ts'), indexContent);
  console.log('📦 Created/updated components index file');
  
  console.log('🎉 Missing components fixed! All UI components are now available!');
  
} catch (error) {
  console.error('❌ Error creating missing components:', error);
  process.exit(1);
}
