import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SEOOptimizations from "./components/seo/SEOOptimizations"
import EnhancedVisuals from "./components/graphics/EnhancedVisuals"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://alphaaistockx.com"),
  title: {
    default:
      "AlphaAIStockX - Revolutionary AI Trading Platform | Automated Stock Trading Bots & Lightning-Fast Execution",
    template: "%s | AlphaAIStockX - AI Trading Platform",
  },
  description:
    "🚀 The ultimate AI-powered stock trading platform with lightning-fast execution (5-15ms), automated trading bots, and premium AI insights. Join 15,000+ successful traders making consistent profits with our advanced algorithms. Start your free trial today!",
  keywords: [
    "AI trading platform",
    "automated stock trading",
    "trading bot",
    "algorithmic trading",
    "stock market AI",
    "day trading software",
    "investment platform",
    "financial AI",
    "trading algorithms",
    "market analysis",
    "portfolio optimization",
    "risk management",
    "real-time trading",
    "professional trading tools",
    "alpha generation",
    "quantitative trading",
    "machine learning trading",
    "predictive analytics",
    "trading signals",
    "market intelligence",
  ],
  authors: [{ name: "AlphaAIStockX Team", url: "https://alphaaistockx.com" }],
  creator: "AlphaAIStockX",
  publisher: "AlphaAIStockX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alphaaistockx.com",
    siteName: "AlphaAIStockX",
    title: "AlphaAIStockX - #1 AI Trading Platform | Lightning-Fast Execution & Automated Bots",
    description:
      "🚀 The ultimate AI-powered stock trading platform with lightning-fast execution, automated trading bots, and premium AI insights. Join 15,000+ successful traders!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AlphaAIStockX - AI Trading Platform Dashboard",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "AlphaAIStockX Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaAIStockX - #1 AI Trading Platform",
    description: "🚀 Lightning-fast AI trading with automated bots. Join 15,000+ successful traders!",
    images: ["/twitter-image.jpg"],
    creator: "@alphaaistockx",
    site: "@alphaaistockx",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  category: "Finance",
  classification: "Trading Platform",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7c3aed" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.png", color: "#7c3aed" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AlphaAIStockX",
  },
  alternates: {
    canonical: "https://alphaaistockx.com",
    languages: {
      "en-US": "https://alphaaistockx.com",
      "en-GB": "https://alphaaistockx.com/en-gb",
    },
  },
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
        <SEOOptimizations />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdn.alphaaistockx.com" />
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Favicon and PWA */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.png" color="#7c3aed" />

        {/* SEO and verification */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />

        {/* Performance and CDN */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=no" />

        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "AlphaAIStockX",
              description:
                "Revolutionary AI-powered stock trading platform with automated bots and lightning-fast execution",
              url: "https://alphaaistockx.com",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free trial available",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "15000",
              },
              author: {
                "@type": "Organization",
                name: "AlphaAIStockX",
                url: "https://alphaaistockx.com",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <EnhancedVisuals />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
