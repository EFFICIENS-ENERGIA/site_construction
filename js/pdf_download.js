// Gestionnaire de téléchargement des fiches PDF individuelles par prestation
const PDF_MAPPING = {
    'sinistre': 'assets/pdf/Fiche_Expertise_Sinistres_et_Dommages.pdf',
    'protection_juridique': 'assets/pdf/Fiche_Expertise_Protection_Juridique.pdf',
    'visite_achat': 'assets/pdf/Fiche_Expertise_Visite_Avant_Achat.pdf',
    'dpe_contestation': 'assets/pdf/Fiche_Expertise_Diagnostics_Contestes.pdf',
    'energies_renouvelables': 'assets/pdf/Fiche_Expertise_Energies_Renouvelables.pdf',
    'performance_energetique': 'assets/pdf/Fiche_Expertise_Performance_Energetique.pdf',
    'incendie': 'assets/pdf/Fiche_Expertise_Incendie.pdf',
    'industriel': 'assets/pdf/Fiche_Expertise_Industrielle.pdf'
};

function initPdfDownloadButtons() {
    const downloadBtns = document.querySelectorAll('[data-pdf-service]');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceKey = btn.getAttribute('data-pdf-service');
            const pdfUrl = PDF_MAPPING[serviceKey];
            if (pdfUrl) {
                window.open(pdfUrl, '_blank');
            } else {
                window.open('Dossier_Prestations_EFFICIENS_ENERGIA.pdf', '_blank');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initPdfDownloadButtons);
