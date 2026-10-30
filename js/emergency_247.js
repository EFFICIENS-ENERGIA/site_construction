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
        banner.style.cssText = 'position:relative;background:#0f172a;color:#f8fafc;padding:9px 16px;font-size:0.86rem;display:flex;align-items:center;justify-content:center;gap:12px;border-bottom:2px solid #0284c7;z-index:9999;line-height:1.4;text-align:center;';

        banner.innerHTML = `
            <span style="font-size:1.1rem;" aria-hidden="true">🚨</span>
            <span><strong>Urgence Sinistre & Bâtiment ?</strong> Assistance réactive sous 24h ouvrées. Transmettez votre dossier en ligne ou via <a href="https://wa.me/33778246567?text=Bonjour%20S%C3%A9bastien%2C%20je%20vous%20contacte%20pour%20une%20urgence%20sinistre." target="_blank" rel="noopener noreferrer" style="color:#38bdf8;font-weight:700;text-decoration:underline;">WhatsApp prioritaire</a> / Ligne directe <a href="tel:+33778246567" style="color:#ffffff;font-weight:700;text-decoration:underline;">07 78 24 65 67</a>.</span>
            <button type="button" aria-label="Fermer le bandeau d'urgence" style="background:none;border:none;color:#94a3b8;font-size:1.25rem;cursor:pointer;padding:0 8px;line-height:1;" title="Fermer">×</button>
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
