// ==========================================================================
// CALCULATEUR TEMPS DE LECTURE & SOMMAIRE INTERACTIF (TOC) — EFFICIENS ENERGIA
// Compatible Mode Sombre & Mode Clair
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
            badge.style.cssText = 'display:inline-flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--text-secondary,#94a3b8);background:var(--bg-secondary,rgba(30,41,59,0.6));border:1px solid var(--border-color,rgba(255,255,255,0.1));padding:5px 12px;border-radius:20px;margin:8px 0 16px 0;';
            badge.innerHTML = `<span>⏱️</span> <span>Temps de lecture estimé : <strong>${readingMinutes} min</strong></span>`;
            h1.insertAdjacentElement('afterend', badge);
        }

        // Sommaire interactif sur prestation.html
        if (window.location.pathname.includes('prestation.html') && !document.querySelector('.table-of-contents')) {
            const headings = main.querySelectorAll('h2, h3');
            if (headings.length >= 3) {
                const toc = document.createElement('nav');
                toc.className = 'table-of-contents';
                toc.setAttribute('aria-label', 'Sommaire de la prestation');
                toc.style.cssText = 'background:var(--bg-card, #0f172a);border:1px solid var(--border-color, rgba(14,165,233,0.3));border-left:4px solid #0284c7;border-radius:10px;padding:1.25rem 1.5rem;margin:1.5rem 0;color:var(--text-primary,#f8fafc);';

                let listHtml = '<p style="margin:0 0 0.75rem 0;font-weight:700;font-size:0.95rem;color:#38bdf8;">📑 Sommaire de l\'intervention</p><ul style="margin:0;padding-left:1.25rem;line-height:1.8;font-size:0.9rem;">';
                headings.forEach((h, idx) => {
                    if (!h.id) h.id = 'section-' + (idx + 1);
                    listHtml += `<li><a href="#${h.id}" style="color:var(--text-secondary,#cbd5e1);text-decoration:none;" onmouseover="this.style.color='#38bdf8'" onmouseout="this.style.color='var(--text-secondary,#cbd5e1)'">${h.innerText}</a></li>`;
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
