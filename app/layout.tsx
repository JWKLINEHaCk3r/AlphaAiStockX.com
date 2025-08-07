import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AlphaAI StockX - AI-Powered Trading Platform',
  description: 'Revolutionary AI-powered trading platform with automated strategies and real-time market insights.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}
