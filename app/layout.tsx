import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MainNav from '@/components/navigation/MainNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AlphaAI StockX - Advanced AI Trading Platform',
  description: 'Professional AI-powered stock trading platform with real-time analytics, portfolio management, and automated trading strategies.',
  keywords: 'AI trading, stock market, portfolio management, algorithmic trading, financial analytics',
  authors: [{ name: 'AlphaAI StockX Team' }],
  openGraph: {
    title: 'AlphaAI StockX - Advanced AI Trading Platform',
    description: 'Professional AI-powered stock trading platform with real-time analytics and automated strategies.',
    url: 'https://alphaaistockx.com',
    siteName: 'AlphaAI StockX',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AlphaAI StockX Trading Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlphaAI StockX - Advanced AI Trading Platform',
    description: 'Professional AI-powered stock trading platform with real-time analytics and automated strategies.',
    images: ['/twitter-image.jpg'],
    creator: '@alphaaistockx',
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
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="AlphaAI StockX - Advanced AI-powered trading platform with real-time analytics and portfolio management" />
        <meta name="keywords" content="AI trading, stock analysis, portfolio management, algorithmic trading, financial analytics" />
        <meta name="author" content="AlphaAI Team" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://alphaai-stockx.com" />
      </head>
      <body className={inter.className}>
        {/* Skip Navigation Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200"
        >
          Skip to main content
        </a>
        
        <MainNav />
        <main id="main-content" role="main">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-700 py-8 px-4" role="contentinfo">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400 mb-4">
              © 2025 AlphaAI StockX. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="/support" className="text-gray-400 hover:text-white transition-colors duration-200">Support</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
