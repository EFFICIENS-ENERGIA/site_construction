// ==========================================================================
// BANDEAU D'ORIENTATION DES URGENCES HORS-HORAIRES — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    function checkEmergencyHours() {
        if (sessionStorage.getItem('emergency_banner_dismissed')) return;

        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); // 0 = Dimanche, 6 = Samedi
        const isWeekend = (day === 0 || day === 6);
        const isOffHours = (hour < 8 || hour >= 18);

        if (isWeekend || isOffHours) {
            const banner = document.createElement('div');
            banner.className = 'emergency-banner';
            banner.style.cssText = 'position:relative;background:#0f172a;color:#f8fafc;padding:10px 16px;font-size:0.86rem;display:flex;align-items:center;justify-content:center;gap:12px;border-bottom:2px solid #3b82f6;z-index:999;';

            banner.innerHTML = `
                <span style="font-size:1.1rem;">🚨</span>
                <span><strong>Urgence Sinistre & Bâtiment ?</strong> En dehors des heures d'ouverture (8h30-18h00), transmettez votre dossier en ligne ou via <a href="https://wa.me/33778246567" target="_blank" rel="noopener noreferrer" style="color:#60a5fa;font-weight:bold;text-decoration:underline;">WhatsApp prioritaire</a> pour prise en charge sous 24h ouvrées.</span>
                <button type="button" aria-label="Fermer" style="background:none;border:none;color:#94a3b8;font-size:1.2rem;cursor:pointer;padding:0 6px;" title="Fermer">×</button>
            `;

            banner.querySelector('button').addEventListener('click', () => {
                sessionStorage.setItem('emergency_banner_dismissed', 'true');
                banner.remove();
            });

            document.body.insertAdjacentElement('afterbegin', banner);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkEmergencyHours);
    } else {
        checkEmergencyHours();
    }
})();
