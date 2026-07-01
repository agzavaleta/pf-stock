// PF Stock — Service Worker v0.9.0-beta
// Shell: stale-while-revalidate | CDN: cache-first | Navigation: SPA fallback

var SHELL_CACHE = 'pf-stock-shell-v3';
var CDN_CACHE   = 'pf-stock-cdn-v3';

var SHELL_ASSETS = [
  './',
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
      .then(function (cache) {
        return Promise.all(
          SHELL_ASSETS.map(function (url) {
            return fetch(url).then(function (response) {
              // Never cache a redirected response — root cause of Safari
              // "Response served by service worker has redirections".
              if (response && response.ok && response.redirected === false) {
                return cache.put(url, response.clone());
              }
            }).catch(function () { /* asset unavailable offline at install time; skip */ });
          })
        );
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
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
      caches.match('./').then(function (cached) {
        if (cached) return cached;
        return fetch('./').then(function (response) {
          // Never hand a redirected response back for a navigation request —
          // Safari throws "Response served by service worker has redirections".
          if (response && response.redirected) {
            return fetch(response.url);
          }
          return response;
        });
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
