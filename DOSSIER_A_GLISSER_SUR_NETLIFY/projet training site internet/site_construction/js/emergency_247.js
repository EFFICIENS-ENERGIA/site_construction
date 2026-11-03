// ==========================================================================
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

        banner.innerHTML = `
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
        `;

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
