const CACHE_NAME = 'v1_cache_catalog_z';
const urlsToCache = [
  './',
  './index.html',
  './css/bootstrap.min.css',
  './fontawesome/css/all.min.css',
  './css/templatemo-style.css',
  './img/hero.jpg',
  './img/icon-192.png',
  './img/icon-512.png',
  './js/plugins.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Error al registrar el cache', err))
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
