// Aumenta CACHE a ogni modifica ai file in cache.
const CACHE = 'pixellogo-v5';
const FILES = [
  './', 'index.html', 'style.css', 'app.js', 'manifest.json',
  'icons/icon-192.png', 'icons/icon-512.png',
  'fonts/fonts.css',
  'fonts/press-start-2p-400-latin-ext.woff2', 'fonts/press-start-2p-400-latin.woff2',
  'fonts/space-grotesk-300-latin-ext.woff2', 'fonts/space-grotesk-300-latin.woff2',
  'fonts/unbounded-300-latin-ext.woff2', 'fonts/unbounded-300-latin.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Solo file dell'app: mai api.github.com né altre origini.
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
