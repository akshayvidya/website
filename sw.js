// AkshayVidya marketing site — service worker
// Strategy: precache the shell, cache-first for static assets,
// network-first (with offline fallback) for page navigations.

const VERSION = 'akshayvidya-v7';
const CORE = [
  '/index.html',
  '/manifest.webmanifest',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => Promise.allSettled(CORE.map((url) => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Never intercept cross-origin requests (Google Fonts, etc.) — avoids (blocked:origin).
  if (url.origin !== self.location.origin) return;

  // Page navigations: network-first, fall back to cached shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Same-origin static assets: cache-first, then fill cache.
  event.respondWith(
    caches.match(request).then((cached) =>
      cached ||
      fetch(request).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(request, copy));
        }
        return res;
      }).catch(() => cached)
    )
  );
});
