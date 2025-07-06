'use client';

import { SessionProvider } from 'next-auth/react';
import { TradingProvider } from '@/app/contexts/TradingContext';
import { Toaster } from '@/components/ui/toaster';

interface ProvidersProps {
  children: React.ReactNode;
  session?: any;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <TradingProvider>
        {children}
        <Toaster />
      </TradingProvider>
    </SessionProvider>
  );
}
