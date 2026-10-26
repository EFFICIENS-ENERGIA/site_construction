/**
 * Service Worker Network-First — EFFICIENS ENERGIA
 */
const CACHE_NAME = 'efficiens-expertise-cache-v40';
const ASSETS_TO_CACHE = [
    './',
    './index.html?v=31',
    './prestation.html',
    './informations-legales.html',
    './css/design_system.css?v=20',
    './css/components.css?v=30',
    './js/app.js?v=20',
    './js/prestation.js?v=31',
    './manifest.webmanifest?v=15',
    './assets/logo_efficiens_energia.png',
    './assets/icons/icon-192.svg',
    './assets/icons/icon-512.svg',
    './assets/services/sinistres-construction.webp',
    './assets/services/expertise-industrielle.webp',
    './assets/services/energies-renouvelables.webp',
    './assets/services/performance-energetique.webp',
    './assets/services/incendie-dommages.webp',
    './assets/services/diagnostic-conteste.webp',
    './assets/services/visite-avant-achat.webp',
    './assets/services/protection-juridique.webp'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET') {
        return;
    }

    const requestUrl = new URL(request.url);
    if (requestUrl.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        fetch(new Request(request, { cache: 'no-store' }))
            .then((networkResponse) => {
                if (networkResponse.ok && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    event.waitUntil(
                        caches.open(CACHE_NAME)
                            .then((cache) => cache.put(request, responseToCache))
                    );
                }
                return networkResponse;
            })
            .catch(async () => {
                const cachedResponse = await caches.match(request);
                if (cachedResponse) {
                    return cachedResponse;
                }
                if (request.mode === 'navigate') {
                    const offlinePage = requestUrl.pathname.endsWith('/prestation.html')
                        ? await caches.match('./prestation.html')
                        : await caches.match('./index.html?v=31');
                    if (offlinePage) {
                        return offlinePage;
                    }
                }
                return Response.error();
            })
    );
});
