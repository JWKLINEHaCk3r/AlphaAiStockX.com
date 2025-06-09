"use client"

import { useEffect } from "react"

export default function SEOOptimizations() {
  useEffect(() => {
    // Add structured data for better search visibility
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "AlphaAIStockX",
      url: "https://alphaaistockx.com",
      description:
        "The ultimate AI-powered stock trading platform with lightning-fast execution, automated trading bots, and premium AI insights for maximum profits.",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: [
        {
          "@type": "Offer",
          name: "Alpha Trader",
          price: "29.99",
          priceCurrency: "USD",
          description: "Fast execution, 100 trades/day, 10 AI signals",
        },
        {
          "@type": "Offer",
          name: "Alpha Wolf",
          price: "99.99",
          priceCurrency: "USD",
          description: "Ultra-fast execution, 500 trades/day, 25 signals, auto-trade",
        },
        {
          "@type": "Offer",
          name: "Alpha Apex",
          price: "299.99",
          priceCurrency: "USD",
          description: "Lightning speed (5-15ms), unlimited everything",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "2847",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Organization",
        name: "AlphaAIStockX",
        url: "https://alphaaistockx.com",
      },
      publisher: {
        "@type": "Organization",
        name: "AlphaAIStockX",
        logo: {
          "@type": "ImageObject",
          url: "https://alphaaistockx.com/logo.png",
        },
      },
      keywords:
        "AI trading, stock trading, automated trading, trading bot, stock analysis, market predictions, algorithmic trading, financial AI, trading platform, investment tools",
      featureList: [
        "Lightning-fast trade execution (5-15ms)",
        "AI-powered stock predictions",
        "Automated trading bots",
        "Real-time market analysis",
        "Advanced risk management",
        "Portfolio optimization",
        "24/7 trading automation",
        "Professional trading tools",
      ],
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    // Add meta tags for better SEO
    const metaTags = [
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "bingbot", content: "index, follow" },
      { name: "theme-color", content: "#7c3aed" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AlphaAIStockX" },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:site", content: "@alphaaistockx" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "format-detection", content: "telephone=no" },
    ]

    metaTags.forEach((tag) => {
      const meta = document.createElement("meta")
      if (tag.name) meta.name = tag.name
      if (tag.property) meta.setAttribute("property", tag.property)
      meta.content = tag.content
      document.head.appendChild(meta)
    })

    return () => {
      // Cleanup
      document.head.removeChild(script)
      metaTags.forEach(() => {
        const metas = document.head.querySelectorAll("meta[name], meta[property]")
        metas.forEach((meta) => {
          if (
            metaTags.some(
              (tag) =>
                (tag.name && meta.getAttribute("name") === tag.name) ||
                (tag.property && meta.getAttribute("property") === tag.property),
            )
          ) {
            document.head.removeChild(meta)
          }
        })
      })
    }
  }, [])

  return null
}
