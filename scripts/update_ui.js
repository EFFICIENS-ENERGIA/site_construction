const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

// 1. UPDATE index.html
let html = fs.readFileSync(path.join(repoRoot, 'index.html'), 'utf8');

// Ensure components.css?v=49
html = html.replace(/components\.css\?v=\d+/g, 'components.css?v=49');

// Remove duplicate badge in #expertises
const badgeTarget = `<div class="independence-badge" style="display: inline-flex; margin-bottom: 1.25rem;">
                        <span class="badge-icon" aria-hidden="true">🛡️</span>
                        <div class="badge-content">
                            <strong>Cabinet d'Expertise Technique Indépendant</strong> <span class="badge-sep">·</span> <span>Particuliers, Entreprises, Collectivités &amp; Institutionnels</span>
                        </div>
                    </div>`;

if (html.includes(badgeTarget)) {
    html = html.replace(badgeTarget, '');
    console.log('Removed duplicate independence-badge');
} else {
    // Try with \r\n normalized
    const normalizedHtml = html.replace(/\r\n/g, '\n');
    const normalizedTarget = badgeTarget.replace(/\r\n/g, '\n');
    if (normalizedHtml.includes(normalizedTarget)) {
        html = normalizedHtml.replace(normalizedTarget, '');
        console.log('Removed duplicate independence-badge (normalized)');
    } else {
        console.warn('Could not find badge target in index.html');
    }
}

// Lighten section-desc in #expertises
const oldDesc = 'Particuliers, entreprises et acteurs du bâtiment : découvrez les situations dans lesquelles une analyse technique indépendante peut vous aider à mieux comprendre un dommage, un désordre ou un rapport contesté.';
const newDesc = 'Sélectionnez votre situation pour obtenir un diagnostic technique indépendant, rigoureux et opposable.';
if (html.includes(oldDesc)) {
    html = html.replace(oldDesc, newDesc);
    console.log('Replaced section-desc in #expertises');
}

fs.writeFileSync(path.join(repoRoot, 'index.html'), html, 'utf8');
console.log('Updated index.html');

// 2. UPDATE js/emergency_247.js
const emergencyJs = `// ==========================================================================
// BANDEAU D'ORIENTATION DES URGENCES PERMANENT 24/7 — EFFICIENS ENERGIA
// Solution 1 : Affichage permanent en haut du site (@PO Seb)
// ==========================================================================
(function() {
    'use strict';

    function initPermanentEmergencyBanner() {
        if (sessionStorage.getItem('emergency_banner_dismissed')) return;
        if (document.querySelector('.emergency-banner')) return;

        const banner = document.createElement('div');
        banner.className = 'emergency-banner';
        banner.style.cssText = 'position:relative;background:#0f172a;color:#f8fafc;padding:8px 16px;font-size:0.86rem;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px;border-bottom:2px solid #0284c7;z-index:9999;line-height:1.4;text-align:center;';

        banner.innerHTML = \`
            <span style="display:inline-flex;align-items:center;gap:6px;font-weight:700;">
                <span style="font-size:1.05rem;" aria-hidden="true">🚨</span>
                <span>Urgence Sinistre ? Assistance sous 24h :</span>
            </span>
            <div style="display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <a href="https://wa.me/33767583180?text=Bonjour%20S%C3%A9bastien%2C%20je%20vous%20contacte%20pour%20une%20urgence%20sinistre." target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:5px;background:#25D366;color:#ffffff;font-weight:700;font-size:0.84rem;padding:4px 12px;border-radius:9999px;text-decoration:none;box-shadow:0 2px 8px rgba(37,211,102,0.35);transition:transform 0.15s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <span aria-hidden="true">💬</span> WhatsApp Prioritaire
                </a>
                <a href="tel:+33767583180" style="display:inline-flex;align-items:center;gap:5px;background:#0284c7;color:#ffffff;font-weight:700;font-size:0.84rem;padding:4px 12px;border-radius:9999px;text-decoration:none;box-shadow:0 2px 8px rgba(2,132,199,0.35);transition:transform 0.15s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <span aria-hidden="true">📞</span> 07 67 58 31 80
                </a>
            </div>
            <button type="button" aria-label="Fermer le bandeau d'urgence" style="background:none;border:none;color:#94a3b8;font-size:1.25rem;cursor:pointer;padding:0 8px;line-height:1;margin-left:auto;" title="Fermer">×</button>
        \`;

        banner.querySelector('button').addEventListener('click', () => {
            sessionStorage.setItem('emergency_banner_dismissed', 'true');
            banner.remove();
        });

        document.body.insertAdjacentElement('afterbegin', banner);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPermanentEmergencyBanner);
    } else {
        initPermanentEmergencyBanner();
    }
})();
`;
fs.writeFileSync(path.join(repoRoot, 'js', 'emergency_247.js'), emergencyJs, 'utf8');
console.log('Updated js/emergency_247.js');

// 3. UPDATE js/cookie_banner.js
const cookieJs = `// ==========================================================================
// BANDEAU DE CONSENTEMENT RGPD & COOKIES TECHNIQUES — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    function initCookieBanner() {
        if (localStorage.getItem('cookie_consent_choice')) return;

        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;background:rgba(15,23,42,0.96);backdrop-filter:blur(8px);color:#f8fafc;padding:0.65rem 1.25rem;box-shadow:0 -4px 20px rgba(0,0,0,0.25);z-index:10000;font-size:0.82rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;box-sizing:border-box;border-top:1.5px solid #2563eb;';

        banner.innerHTML = \`
            <div style="flex:1;min-width:240px;line-height:1.4;">
                🔒 <strong>Cookies techniques</strong> : strict minimum nécessaire (simulateur, PWA). Zéro traceur publicitaire. <a href="informations-legales.html#cookies" style="color:#60a5fa;text-decoration:underline;">Détails</a>.
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
                <button id="btn-accept-cookies" style="background:#2563eb;color:#ffffff;border:none;padding:6px 14px;border-radius:9999px;font-weight:700;font-size:0.82rem;cursor:pointer;box-shadow:0 2px 6px rgba(37,99,235,0.4);">Accepter</button>
                <button id="btn-refuse-cookies" style="background:transparent;color:#cbd5e1;border:1px solid #475569;padding:6px 12px;border-radius:9999px;font-size:0.82rem;cursor:pointer;">Fermer</button>
            </div>
        \`;

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
`;
fs.writeFileSync(path.join(repoRoot, 'js', 'cookie_banner.js'), cookieJs, 'utf8');
console.log('Updated js/cookie_banner.js');

// 4. UPDATE sw.js
let sw = fs.readFileSync(path.join(repoRoot, 'sw.js'), 'utf8');
sw = sw.replace(/efficiens-expertise-cache-v\d+/g, 'efficiens-expertise-cache-v49');
sw = sw.replace(/components\.css\?v=\d+/g, 'components.css?v=49');
fs.writeFileSync(path.join(repoRoot, 'sw.js'), sw, 'utf8');
console.log('Updated sw.js to v49');
