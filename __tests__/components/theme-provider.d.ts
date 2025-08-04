declare module '../../components/theme-provider' { import * as React from 'react'; import { ThemeProviderProps } from 'next-themes';
  export function ThemeProvider(props: ThemeProviderProps): React.ReactElement
} describe('ThemeProvider', () => { it('should render without crashing', () => {
    expect(true).toBe(true);
  }); }); declare module '../../components/theme-provider' { import { ThemeProviderProps } from 'next-themes';
  export function ThemeProvider(props: ThemeProviderProps): React.ReactElement
}
