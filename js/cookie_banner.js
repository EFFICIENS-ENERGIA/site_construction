// Bannière de consentement aux cookies et conformité RGPD
function initCookieConsent() {
    if (localStorage.getItem('cookie_consent_given')) return;

    const banner = document.createElement('div');
    banner.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;background:#0f172a;color:#fff;padding:1rem;text-align:center;z-index:10000;font-size:0.9rem;';
    banner.innerHTML = `
        <span>Ce site utilise des cookies techniques nécessaires à son bon fonctionnement (PWA, Copilote IA).</span>
        <button id="accept-cookies" style="margin-left:15px;padding:6px 14px;background:#1e3a8a;color:#fff;border:none;border-radius:4px;cursor:pointer;">Accepter</button>
    `;
    document.body.appendChild(banner);

    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookie_consent_given', 'true');
        banner.remove();
    });
}
document.addEventListener('DOMContentLoaded', initCookieConsent);
