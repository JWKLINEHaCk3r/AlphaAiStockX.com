import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ErrorBoundary } from "./components/ErrorBoundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AlphaAIStockX - AI-Powered Trading Platform",
  description: "Advanced AI stock analysis, trading education, and real-time market insights",
  keywords: "stock analysis, AI trading, Series 6, Series 7, financial education, market analysis",
  authors: [{ name: "AlphaAIStockX Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  metadataBase: new URL("https://alphaaistockx.com"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e293b" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <div className="relative z-10">{children}</div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
