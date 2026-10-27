// Script de détection de mise à jour du Service Worker PWA (Cache v40+)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
        reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    showUpdateBanner();
                }
            });
        });
    });
}

function showUpdateBanner() {
    const banner = document.createElement('div');
    banner.className = 'pwa-update-banner';
    banner.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#1e3a8a;color:#fff;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:9999;font-size:14px;display:flex;align-items:center;gap:12px;';
    banner.innerHTML = '<span>Une nouvelle version du site est disponible.</span>';
    document.body.appendChild(banner);
}
