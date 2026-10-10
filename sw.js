/**
 * ⚡ Service Worker Offline-First — BÂTI-EXCELLENCE Pro
 * Conforme Règle 33 Network-First Anti-Zombie Cache
 */
const CACHE_NAME = 'bati-pro-cache-v3';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/design_system.css',
    './css/components.css',
    './js/libs/supabase.js',
    './js/supabase_config.js',
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
    if (event.request.method !== 'GET') return;

    // Network-First obligatoire (Règle 33 Anti-Zombie Cache)
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
                return caches.match(event.request);
            })
    );
});
