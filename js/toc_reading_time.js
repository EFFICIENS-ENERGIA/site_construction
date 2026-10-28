// ==========================================================================
// CALCULATEUR TEMPS DE LECTURE & SOMMAIRE INTERACTIF (TOC) — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    function initTocAndReadingTime() {
        const main = document.querySelector('main') || document.body;
        const text = main.innerText || main.textContent || '';
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const readingMinutes = Math.max(1, Math.ceil(words / 220));

        // Insertion du badge de temps de lecture
        const h1 = document.querySelector('h1');
        if (h1 && !document.querySelector('.reading-time-badge')) {
            const badge = document.createElement('div');
            badge.className = 'reading-time-badge';
            badge.style.cssText = 'display:inline-flex;align-items:center;gap:6px;font-size:0.85rem;color:#64748b;background:#f1f5f9;padding:4px 10px;border-radius:20px;margin:8px 0 16px 0;';
            badge.innerHTML = `<span>⏱️</span> <span>Temps de lecture estimé : <strong>${readingMinutes} min</strong></span>`;
            h1.insertAdjacentElement('afterend', badge);
        }

        // Sommaire interactif sur prestation.html
        if (window.location.pathname.includes('prestation.html') && !document.querySelector('.table-of-contents')) {
            const headings = main.querySelectorAll('h2, h3');
            if (headings.length >= 3) {
                const toc = document.createElement('nav');
                toc.className = 'table-of-contents';
                toc.setAttribute('aria-label', 'Sommaire de la page');
                toc.style.cssText = 'background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #1e3a8a;border-radius:8px;padding:1.25rem;margin:1.5rem 0;';

                let listHtml = '<p style="margin:0 0 0.75rem 0;font-weight:600;color:#1e3a8a;">📑 Sommaire de l\'intervention</p><ul style="margin:0;padding-left:1.25rem;line-height:1.8;font-size:0.92rem;">';
                headings.forEach((h, idx) => {
                    if (!h.id) h.id = 'section-' + (idx + 1);
                    listHtml += `<li><a href="#${h.id}" style="color:#334155;text-decoration:none;">${h.innerText}</a></li>`;
                });
                listHtml += '</ul>';
                toc.innerHTML = listHtml;

                const target = document.querySelector('.reading-time-badge') || h1;
                if (target) target.insertAdjacentElement('afterend', toc);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTocAndReadingTime);
    } else {
        initTocAndReadingTime();
    }
})();
