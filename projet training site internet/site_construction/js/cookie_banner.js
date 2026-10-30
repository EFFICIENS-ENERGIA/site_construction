// ==========================================================================
// BANDEAU DE CONSENTEMENT RGPD & COOKIES TECHNIQUES — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    function initCookieBanner() {
        if (localStorage.getItem('cookie_consent_choice')) return;

        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;background:#0f172a;color:#f8fafc;padding:1rem 1.5rem;box-shadow:0 -4px 20px rgba(0,0,0,0.25);z-index:10000;font-size:0.88rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;box-sizing:border-box;border-top:2px solid #1e3a8a;';

        banner.innerHTML = `
            <div style="flex:1;min-width:280px;line-height:1.5;">
                🔒 <strong>Respect de votre vie privée</strong> : EFFICIENS ENERGIA utilise exclusivement des cookies techniques nécessaires au fonctionnement du site (mode hors-ligne PWA, simulateur et prise de rendez-vous). Aucun traceur publicitaire tiers n'est utilisé. <a href="informations-legales.html#cookies" style="color:#60a5fa;text-decoration:underline;">En savoir plus</a>.
            </div>
            <div style="display:flex;gap:10px;align-items:center;">
                <button id="btn-accept-cookies" style="background:#1e3a8a;color:#ffffff;border:none;padding:8px 18px;border-radius:6px;font-weight:600;font-size:0.86rem;cursor:pointer;">Accepter & Poursuivre</button>
                <button id="btn-refuse-cookies" style="background:transparent;color:#94a3b8;border:1px solid #475569;padding:8px 14px;border-radius:6px;font-size:0.86rem;cursor:pointer;">Fermer</button>
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
