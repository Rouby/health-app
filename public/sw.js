const CACHE_NAME = 'healthsync-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/images/favicon.ico',
  '/images/favicon-16x16.png',
  '/images/favicon-32x32.png',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
  '/images/apple-touch-icon.png'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event (Network First for routes, Cache First for static images/assets)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Bypass for non-GET requests
  if (event.request.method !== 'GET') return;

  // Bypass for hot module reloading or other dev server requests
  if (url.pathname.startsWith('/@') || url.pathname.includes('hot-update')) return;

  // Cache-first for images
  if (event.request.destination === 'image' || url.pathname.startsWith('/images/')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Network-first for other pages/resources to support live edge updates
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses for offline fallback
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline fallback
        return caches.match(event.request);
      })
  );
});
