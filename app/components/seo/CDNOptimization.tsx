"use client"

import { useEffect } from "react"

export default function CDNOptimization() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = ["/fonts/inter.woff2", "/images/hero-bg.webp", "/images/dashboard-preview.webp"]

    preloadResources.forEach((resource) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = resource
      if (resource.includes(".woff2")) {
        link.as = "font"
        link.type = "font/woff2"
        link.crossOrigin = "anonymous"
      } else if (resource.includes(".webp")) {
        link.as = "image"
        link.type = "image/webp"
      }
      document.head.appendChild(link)
    })

    // Service Worker for CDN caching
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(console.error)
    }
  }, [])

  return null
}
