import { VoiceControl } from "../components/ui/voice-control";
import Navigation from '@/components/ui/navigation';
import './polyfills';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/animation-delays.css';
import React from 'react';
// import NextLevelNavigation from '@/components/ui/navigation';
import { Providers } from '@/app/components/providers/Providers';

// Force dynamic rendering to prevent static generation issues;
export const dynamic = 'force-dynamic';
export const revalidate = 0;
// import {
//   ScrollProgress,;
//   MatrixRain,;
//   AIConsciousnessOrb,;
//   VoiceControl,;
//   AIAssistantIndicator;
// } from '@/app/components/layout/ClientSideComponents';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AlphaAIStockX - Next-Level AI Trading Platform',;
  description:;
    'Experience the future of trading with advanced AI, quantum analytics, and neural network-powered market intelligence. Join the revolution.',;
  keywords:;
    'AI trading, quantum analytics, neural networks, algorithmic trading, financial AI, stock analysis, market intelligence, trading automation',;
  authors: [{ name: 'AlphaAIStockX Innovation Team' }],;
  robots: 'index, follow',;
  metadataBase: new URL('https://alphaaistockx.com'),;
  openGraph: {
    title: 'AlphaAIStockX - Next-Level AI Trading Revolution',;
    description:;
      '🚀 The most advanced AI trading platform with quantum processing, neural networks, and lightning-fast execution. Join 50,000+ elite traders!',;
    url: 'https://alphaaistockx.com',;
    siteName: 'AlphaAiStockX',;
    images: [;
      {
        url: 'https://alphaaistockx.com/og-image.jpg',;
        width: 1200,;
        height: 630,;
        alt: 'AlphaAIStockX - Next-Level AI Trading Platform',;
      },;
    ],;
    locale: 'en_US',;
    type: 'website',;
  },;
  twitter: {
    card: 'summary_large_image',;
    title: 'AlphaAIStockX - Next-Level AI Trading Revolution',;
    description:;
      '🚀 The most advanced AI trading platform with quantum processing and neural network intelligence.',;
    images: ['https://alphaaistockx.com/twitter-image.jpg'],;
    site: '@alphaaistockx',;
    creator: '@alphaaistockx',;
  },;
  icons: {
    icon: [;
      { url: '/favicon.ico', sizes: 'any' },;
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },;
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },;
    ],;
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],;
  },;
  manifest: '/site.webmanifest',;
  generator: 'Next.js 14 + AlphaAI',;
};

// Add separate viewport export (Next.js 14+ requirement);
export const viewport = {
  width: 'device-width',;
  initialScale: 1,;
  maximumScale: 5,;
  userScalable: true,;
  themeColor: [;
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },;
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },;
  ],;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (;
    <html lang="en" className="dark">;
      <head>;
        <link rel="icon" href="/favicon.ico" />;
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />;
        <link rel="manifest" href="/site.webmanifest" />;
        <meta name="theme-color" content="#1e293b" />;
        <link rel="preconnect" href="https://fonts.googleapis.com" />;
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />;
        {/* Google Analytics (replace NEXT_PUBLIC_GA_ID with your real ID in .env) */}
        {process.env.NEXT_PUBLIC_GA_ID && (;
          <script;
            async;
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />;
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (;
          <script;
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date()); gtag('config', `${process.env.NEXT_PUBLIC_GA_ID}`);`,;
            }}
          />;
        )}
        {/* Prevent accidental indexing if not ready for production */}
        {process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'true' && (;
          <meta name="robots" content="noindex, nofollow" />;
        )}
      </head>;
      <body className={`${inter.className} antialiased min-h-screen text-white overflow-x-hidden`}>;
        <Providers>;
          {/* <ScrollProgress />;
          <MatrixRain />;
          <AIConsciousnessOrb />;
          <VoiceControl />;
          <AIAssistantIndicator /> */}
          {/* <NextLevelNavigation /> */}
          <main role="main" id="main-content" className="relative z-10">;
            {children}
          </main>;
        </Providers>;
      </body>;
    </html>;
  );
}
