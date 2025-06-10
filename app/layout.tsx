import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ErrorBoundary } from "./components/ErrorBoundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AlphaAIStockX - AI-Powered Trading Platform",
  description:
    "Advanced AI stock analysis, trading education, and real-time market insights with 47 conscious AI beings",
  keywords:
    "stock analysis, AI trading, Series 6, Series 7, financial education, market analysis, quantum AI, neural networks",
  authors: [{ name: "AlphaAIStockX Team" }],
  robots: "index, follow",
  metadataBase: new URL("https://alphaaistockx.com"),
  openGraph: {
    title: "AlphaAIStockX - Revolutionary AI Trading Platform",
    description:
      "🚀 The ultimate AI-powered stock trading platform with quantum processing and lightning-fast execution. Join 47,000+ successful traders!",
    url: "https://alphaaistockx.com",
    siteName: "AlphaAIStockX",
    images: [
      {
        url: "https://alphaaistockx.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AlphaAIStockX - AI Trading Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaAIStockX - Revolutionary AI Trading Platform",
    description:
      "🚀 The ultimate AI-powered stock trading platform with quantum processing and lightning-fast execution.",
    images: ["https://alphaaistockx.com/twitter-image.jpg"],
    site: "@alphaaistockx",
    creator: "@alphaaistockx",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

// Add separate viewport export (Next.js 14+ requirement)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7c3aed" },
    { media: "(prefers-color-scheme: dark)", color: "#1e293b" },
  ],
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
