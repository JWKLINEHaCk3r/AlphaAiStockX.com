const CACHE_NAME = 'alphaaistockx-v1';
const urlsToCache = [;
  '/',;
  '/index.html',;
  '/site.webmanifest',;
  '/favicon.ico',;
  '/favicon-16x16.png',;
  '/favicon-32x32.png',;
  '/apple-touch-icon.png',;
];

// Install event;
self.addEventListener('install', event => {
  event.waitUntil(;
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    });
  );
});

// Fetch event;
self.addEventListener('fetch', event => {
  event.respondWith(;
    caches.match(event.request).then(response => {
      // Return cached version or fetch from network;
      return response || fetch(event.request);
    });
  );
});

// Activate event;
self.addEventListener('activate', event => {
  event.waitUntil(;
    caches.keys().then(cacheNames =>;
      Promise.all(;
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        });
      );
    );
  );
});
