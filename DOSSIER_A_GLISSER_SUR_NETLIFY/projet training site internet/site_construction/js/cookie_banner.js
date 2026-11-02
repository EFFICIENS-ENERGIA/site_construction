// ==========================================================================
// BANDEAU DE CONSENTEMENT RGPD & COOKIES TECHNIQUES — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    function initCookieBanner() {
        if (localStorage.getItem('cookie_consent_choice')) return;

        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;background:rgba(15,23,42,0.96);backdrop-filter:blur(8px);color:#f8fafc;padding:0.65rem 1.25rem;box-shadow:0 -4px 20px rgba(0,0,0,0.25);z-index:10000;font-size:0.82rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;box-sizing:border-box;border-top:1.5px solid #2563eb;';

        banner.innerHTML = `
            <div style="flex:1;min-width:240px;line-height:1.4;">
                🔒 <strong>Cookies techniques</strong> : strict minimum nécessaire (simulateur, PWA). Zéro traceur publicitaire. <a href="informations-legales.html#cookies" style="color:#60a5fa;text-decoration:underline;">Détails</a>.
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
                <button id="btn-accept-cookies" style="background:#2563eb;color:#ffffff;border:none;padding:6px 14px;border-radius:9999px;font-weight:700;font-size:0.82rem;cursor:pointer;box-shadow:0 2px 6px rgba(37,99,235,0.4);">Accepter</button>
                <button id="btn-refuse-cookies" style="background:transparent;color:#cbd5e1;border:1px solid #475569;padding:6px 12px;border-radius:9999px;font-size:0.82rem;cursor:pointer;">Fermer</button>
            </div>
        `;

        document.body.appendChild(banner);

        banner.querySelector('#btn-accept-cookies').addEventListener('click', () => {
            localStorage.setItem('cookie_consent_choice', 'accepted');
            banner.remove();
        });

        banner.querySelector('#btn-refuse-cookies').addEventListener('click', () => {
            localStorage.setItem('cookie_consent_choice', 'dismissed');
            banner.remove();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieBanner);
    } else {
        initCookieBanner();
    }
})();
