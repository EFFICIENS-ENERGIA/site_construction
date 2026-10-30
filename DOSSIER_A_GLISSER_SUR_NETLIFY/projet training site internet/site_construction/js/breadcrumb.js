// ==========================================================================
// FIL D'ARIANE SÉMANTIQUE & DYNAMIQUE — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    function initBreadcrumb() {
        const container = document.getElementById('breadcrumb-container');
        if (!container && !document.querySelector('.breadcrumb-nav')) {
            const main = document.querySelector('main') || document.body;
            const nav = document.createElement('nav');
            nav.className = 'breadcrumb-nav';
            nav.setAttribute('aria-label', "Fil d'Ariane");
            nav.style.cssText = 'max-width:1200px;margin:12px auto;padding:0 1.25rem;font-size:0.85rem;color:#64748b;';

            const pathname = window.location.pathname;
            const params = new URLSearchParams(window.location.search);
            const serviceKey = params.get('service');

            const SERVICE_TITLES = {
                'sinistre': 'Sinistres de la Construction & Dommages',
                'protection_juridique': 'Protection Juridique & Assistance',
                'visite_achat': 'Visite Technique Avant Achat',
                'dpe_contestation': 'Diagnostics Contestés & DPE',
                'energies_renouvelables': 'Énergies Renouvelables & Photovoltaïque',
                'performance_energetique': 'Audit Énergétique & Bâtiment',
                'incendie': 'Sinistres Incendie & Électrique',
                'industriel': 'Expertise Industrielle & BTP'
            };

            let currentLabel = 'Page en cours';
            if (pathname.includes('prestation.html')) {
                currentLabel = serviceKey && SERVICE_TITLES[serviceKey] ? SERVICE_TITLES[serviceKey] : 'Domaines d\'Expertise';
            } else if (pathname.includes('informations-legales.html')) {
                currentLabel = 'Informations Légales & RGPD';
            } else if (pathname.includes('404.html')) {
                currentLabel = 'Erreur 404';
            } else {
                return; // Sur l'accueil simple, pas besoin de fil d'Ariane
            }

            nav.innerHTML = `
                <ol itemscope itemtype="https://schema.org/BreadcrumbList" style="list-style:none;display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:0;margin:0;">
                    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <a itemprop="item" href="index.html" style="color:#1e3a8a;text-decoration:none;"><span itemprop="name">Accueil</span></a>
                        <meta itemprop="position" content="1" />
                    </li>
                    <span style="color:#94a3b8;">/</span>
                    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <a itemprop="item" href="index.html#expertises" style="color:#1e3a8a;text-decoration:none;"><span itemprop="name">Expertises</span></a>
                        <meta itemprop="position" content="2" />
                    </li>
                    <span style="color:#94a3b8;">/</span>
                    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" aria-current="page">
                        <span itemprop="name" style="color:#1e293b;font-weight:600;">${currentLabel}</span>
                        <meta itemprop="position" content="3" />
                    </li>
                </ol>
            `;

            main.parentNode.insertBefore(nav, main);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBreadcrumb);
    } else {
        initBreadcrumb();
    }
})();
