// ==========================================================================
// DÉTECTION & ALERTE DE MISE À JOUR PWA (SERVICE WORKER CACHE V40+) — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(reg => {
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                if (!newWorker) return;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateBanner(reg);
                    }
                });
            });
        }).catch(err => {
            console.debug('SW Registration Info:', err);
        });

        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                refreshing = true;
                window.location.reload();
            }
        });
    }

    function showUpdateBanner(registration) {
        if (document.querySelector('.pwa-update-banner')) return;

        const banner = document.createElement('div');
        banner.className = 'pwa-update-banner';
        banner.style.cssText = 'position:fixed;bottom:80px;right:20px;background:#1e3a8a;color:#ffffff;padding:12px 18px;border-radius:10px;box-shadow:0 10px 25px rgba(0,0,0,0.25);z-index:9999;font-size:0.9rem;display:flex;align-items:center;gap:12px;border:1px solid #3b82f6;';

        banner.innerHTML = `
            <span>✨ Nouvelle version disponible</span>
            <button id="pwa-refresh-btn" style="background:#ffffff;color:#1e3a8a;border:none;padding:6px 12px;border-radius:6px;font-weight:600;font-size:0.85rem;cursor:pointer;">Mettre à jour</button>
            <button id="pwa-dismiss-btn" style="background:none;border:none;color:#bfdbfe;font-size:1.2rem;cursor:pointer;padding:0 4px;">×</button>
        `;

        document.body.appendChild(banner);

        banner.querySelector('#pwa-refresh-btn').addEventListener('click', () => {
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            } else {
                window.location.reload();
            }
        });

        banner.querySelector('#pwa-dismiss-btn').addEventListener('click', () => {
            banner.remove();
        });
    }
})();
