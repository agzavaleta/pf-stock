// PF Stock — Service Worker v0.9.0-beta
// Shell: stale-while-revalidate | CDN: cache-first | Navigation: SPA fallback

var SHELL_CACHE = 'pf-stock-shell-v1';
var CDN_CACHE   = 'pf-stock-cdn-v1';

var SHELL_ASSETS = [
  './',
  './index.html',
  './app.jsx',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/maskable-icon-192x192.png',
  './icons/maskable-icon-512x512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32x32.png',
  './icons/favicon.ico'
];

var CDN_HOSTS = ['unpkg.com', 'cdnjs.cloudflare.com'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(function (cache) { return cache.addAll(SHELL_ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (k) { return k !== SHELL_CACHE && k !== CDN_CACHE; })
          .map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  var url = new URL(event.request.url);

  if (CDN_HOSTS.some(function (h) { return url.hostname === h; })) {
    event.respondWith(cdnCacheFirst(event.request));
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then(function (cached) {
        return cached || fetch('./index.html');
      })
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }
});

function cdnCacheFirst(request) {
  return caches.open(CDN_CACHE).then(function (cache) {
    return cache.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        if (response && (response.ok || response.type === 'opaque')) {
          cache.put(request, response.clone());
        }
        return response;
      }).catch(function () {
        return new Response('Offline — CDN asset not cached', { status: 503 });
      });
    });
  });
}

function staleWhileRevalidate(request) {
  return caches.open(SHELL_CACHE).then(function (cache) {
    return cache.match(request).then(function (cached) {
      var networkFetch = fetch(request).then(function (response) {
        if (response && response.ok) cache.put(request, response.clone());
        return response;
      }).catch(function () { return null; });
      return cached || networkFetch;
    });
  });
}
