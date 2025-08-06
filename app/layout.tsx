import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainNav } from '@/components/navigation/MainNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AlphaAI StockX - AI-Powered Trading Platform',
  description: 'Advanced AI trading platform for smart investment decisions. Analyze stocks, track portfolios, and make informed trades with cutting-edge artificial intelligence.',
  keywords: 'AI trading, stock analysis, investment platform, financial technology, portfolio management, algorithmic trading',
  authors: [{ name: 'AlphaAI StockX Team' }],
  creator: 'AlphaAI StockX',
  publisher: 'AlphaAI StockX',
  applicationName: 'AlphaAI StockX',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  category: 'finance',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    title: 'AlphaAI StockX - AI-Powered Trading Platform',
    description: 'Advanced AI trading platform for smart investment decisions',
    siteName: 'AlphaAI StockX',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AlphaAI StockX - AI Trading Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlphaAI StockX - AI-Powered Trading Platform',
    description: 'Advanced AI trading platform for smart investment decisions',
    images: ['/og-image.jpg'],
    creator: '@alphaai_stockx',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <MainNav />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
