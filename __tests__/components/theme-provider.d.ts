declare module '../../../components/theme-provider' {
  import * as React from 'react';
  import { ThemeProviderProps } from 'next-themes';
  export function ThemeProvider(props: ThemeProviderProps): React.ReactElement;
}
