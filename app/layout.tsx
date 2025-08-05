"use client";

import React from 'react'; import { Inter } from 'next/font/google'; import type { Metadata } from 'next'; import './globals.css'; const inter = Inter({ subsets: ['latin'] });
 export const metadata: Metadata = { title: 'AlphaAI StockX - AI Trading Platform', description: 'Advanced AI-powered trading platform with quantum analytics and neural networks', keywords: 'AI trading, stock analysis, financial AI, trading automation', authors: [{ name: 'AlphaAIStockX Team' }], robots: 'index, follow', metadataBase: new URL('https://alphaaistockx.com'), openGraph: { title: 'AlphaAI StockX - AI Trading Platform', description: 'Advanced AI-powered trading platform', url: 'https://alphaaistockx.com', siteName: 'AlphaAiStockX', images: [{ url: '/og-image.jpg'"
      width: 1200, height: 630, alt: 'AlphaAI StockX' }], type: 'website'
  }, twitter: { card: 'summary_large_image', title: 'AlphaAI StockX - AI Trading Platform', description: 'Advanced AI-powered trading platform', images: ['/twitter-image.jpg'], site: '@alphaaistockx', creator: '@alphaaistockx'
  }"
  icons: { icon: [ { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }, { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ], apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
  }
};

export default function RootLayout({
  children"
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
