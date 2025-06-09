const CACHE_NAME = "alphaaistockx-v1"
const CDN_CACHE = "alphaaistockx-cdn-v1"

const urlsToCache = [
  "/",
  "/trading/",
  "/ai-insights/",
  "/scanners/",
  "/portfolio/",
  "/static/css/main.css",
  "/static/js/main.js",
]

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

// Fetch event - serve from cache with CDN fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response
      }

      // Clone the request for CDN
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest).then((response) => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // Clone response for cache
        const responseToCache = response.clone()

        caches.open(CDN_CACHE).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    }),
  )
})

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== CDN_CACHE) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})
