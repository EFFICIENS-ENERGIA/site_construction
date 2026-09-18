/**
 * ⚡ Service Worker Offline-First — BÂTI-EXCELLENCE Pro
 * Met en cache l'ensemble des fichiers critiques pour fonctionnement hors-ligne total.
 */
const CACHE_NAME = 'bati-pro-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/design_system.css',
    './css/components.css',
    './js/security.js',
    './js/simulator.js',
    './js/before_after.js',
    './js/tracker.js',
    './js/app.js',
    './manifest.webmanifest',
    './assets/logo_efficiens_energia.png',
    './assets/icons/icon-192.svg',
    './assets/icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Mise en cache des assets BÂTI-EXCELLENCE...');
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[SW] Suppression ancien cache :', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return networkResponse;
            }).catch(() => {
                // Fallback hors-ligne
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
