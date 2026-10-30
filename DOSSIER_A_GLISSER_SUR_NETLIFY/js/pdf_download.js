// ==========================================================================
// GESTIONNAIRE DE TÉLÉCHARGEMENT DES FICHES PDF D'EXPERTISE — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    const PDF_SERVICE_MAP = {
        'sinistre': 'assets/pdf/Fiche_Expertise_Sinistres_et_Dommages.pdf',
        'protection_juridique': 'assets/pdf/Fiche_Expertise_Protection_Juridique.pdf',
        'visite_achat': 'assets/pdf/Fiche_Expertise_Visite_Avant_Achat.pdf',
        'dpe_contestation': 'assets/pdf/Fiche_Expertise_Diagnostics_Contestes.pdf',
        'energies_renouvelables': 'assets/pdf/Fiche_Expertise_Energies_Renouvelables.pdf',
        'performance_energetique': 'assets/pdf/Fiche_Expertise_Performance_Energetique.pdf',
        'incendie': 'assets/pdf/Fiche_Expertise_Incendie.pdf',
        'industriel': 'assets/pdf/Fiche_Expertise_Industrielle.pdf'
    };

    window.downloadServicePDF = function(serviceKey) {
        const path = PDF_SERVICE_MAP[serviceKey] || 'Dossier_Prestations_EFFICIENS_ENERGIA.pdf';
        const link = document.createElement('a');
        link.href = path;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function attachPdfButtons() {
        const buttons = document.querySelectorAll('[data-pdf-service]');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceKey = btn.getAttribute('data-pdf-service');
                window.downloadServicePDF(serviceKey);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachPdfButtons);
    } else {
        attachPdfButtons();
    }
})();
