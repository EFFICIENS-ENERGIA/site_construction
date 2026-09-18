/**
 * 📊 Espace Suivi de Chantier en Direct — EFFICIENS ENERGIA
 * Permet aux maîtres d'ouvrage et clients de visualiser l'avancement chronologique
 * des 5 phases d'un projet de rénovation énergétique, les rapports d'audit et contrôles.
 */
'use strict';

const BatiTracker = {
    // Données de démonstration d'un chantier de rénovation énergétique BBC en cours
    demoProject: {
        reference: 'EE-2026-AIN-LUMIERE',
        title: 'Rénovation Globale BBC & Pompe à Chaleur',
        location: 'Hautecourt-Romaneche (01)',
        architect: 'Sébastien Mathe (Assistance à Maîtrise d\'Ouvrage)',
        progressPercentage: 65,
        targetDelivery: 'Novembre 2026',
        phases: [
            {
                id: 1,
                title: '1. Audit Énergétique & Diagnostic DPE Initial',
                status: 'completed',
                date: 'Janvier 2026',
                description: 'Relevé des parois, calcul des déperditions thermiques, diagnostic DPE initial F et élaboration du scénario BBC classe A.',
                inspector: 'Sébastien Mathe (Auditeur Thermique)',
                documents: ['Audit_Energetique_Reglementaire.pdf', 'Simulation_Aides_MaPrimeRenov.pdf'],
                photos: [
                    { title: 'Relevé thermographique infrarouge', tag: 'Bilan Thermique' }
                ]
            },
            {
                id: 2,
                title: '2. Sélection Artisans RGE & Validation Devis',
                status: 'completed',
                date: 'Mars 2026',
                description: 'Mise en concurrence des artisans locaux certifiés RGE, analyse comparative des devis et constitution du dossier MaPrimeRénov\'.',
                inspector: 'Sébastien Mathe (AMO)',
                documents: ['Comparatif_Devis_Artisans.pdf', 'Accord_Eligibilite_Anah.pdf'],
                photos: [
                    { title: 'Plans de calepinage de l\'isolation', tag: 'Plans Techniques' }
                ]
            },
            {
                id: 3,
                title: '3. Isolation Extérieure (ITE) & Menuiseries',
                status: 'in_progress',
                date: 'Mai - Juillet 2026',
                description: 'Pose de l\'isolation thermique biosourcée sous enduit, suppression des ponts thermiques et menuiseries aluminium triple vitrage.',
                inspector: 'Entreprise RGE Partenaire & Sébastien Mathe',
                documents: ['PV_Controle_Epaisseur_Isolant.pdf'],
                photos: [
                    { title: 'Mise en œuvre du complexe isolant', tag: 'Isolation ITE' },
                    { title: 'Pose des menuiseries haute étanchéité', tag: 'Menuiseries' }
                ]
            },
            {
                id: 4,
                title: '4. Pompe à Chaleur Air/Eau & Ventilation VMC',
                status: 'pending',
                date: 'Août - Septembre 2026',
                description: 'Dépose de l\'ancienne chaudière fioul, raccordement de la pompe à chaleur air/eau haute performance et VMC double-flux hygroréglable.',
                inspector: 'Installateur QualiPAC Partenaire',
                documents: [],
                photos: []
            },
            {
                id: 5,
                title: '5. Réception des Travaux & Versement des Aides',
                status: 'pending',
                date: 'Octobre - Novembre 2026',
                description: 'Contrôle de conformité COFRAC, établissement du DPE final projeté classe A et déblocage des primes MaPrimeRénov\' et CEE.',
                inspector: 'Sébastien Mathe (AMO Référent)',
                documents: [],
                photos: []
            }
        ]
    },

    init() {
        this.renderTimeline();
        this.selectPhase(3); // Sélection de la phase en cours par défaut
    },

    renderTimeline() {
        const listContainer = document.getElementById('trackerPhasesList');
        if (!listContainer) return;

        let html = '';
        this.demoProject.phases.forEach(phase => {
            const statusClass = phase.status === 'completed' ? 'phase-completed' : (phase.status === 'in_progress' ? 'phase-active' : 'phase-pending');
            const iconBadge = phase.status === 'completed' ? '✓' : (phase.status === 'in_progress' ? '⚙' : '⏳');
            const statusLabel = phase.status === 'completed' ? 'Validé' : (phase.status === 'in_progress' ? 'En cours' : 'À venir');

            html += '<div class="tracker-phase-item ' + statusClass + '" data-phase-id="' + phase.id + '">';
            html += '  <div class="phase-icon-badge">' + iconBadge + '</div>';
            html += '  <div class="phase-info">';
            html += '    <div class="phase-header">';
            html += '      <h4 class="phase-title">' + phase.title + '</h4>';
            html += '      <span class="phase-badge ' + statusClass + '">' + statusLabel + '</span>';
            html += '    </div>';
            html += '    <p class="phase-date">' + phase.date + '</p>';
            html += '  </div>';
            html += '</div>';
        });

        listContainer.innerHTML = html;

        // Écouteurs de clic sur chaque jalon
        const items = listContainer.querySelectorAll('.tracker-phase-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.phaseId, 10);
                this.selectPhase(id);
            });
        });
    },

    selectPhase(phaseId) {
        const phase = this.demoProject.phases.find(p => p.id === phaseId);
        if (!phase) return;

        // Mise en surbrillance dans la liste
        const items = document.querySelectorAll('.tracker-phase-item');
        items.forEach(item => {
            const id = parseInt(item.dataset.phaseId, 10);
            item.classList.toggle('selected', id === phaseId);
        });

        // Mise à jour du panneau de détails
        const detailsContainer = document.getElementById('trackerPhaseDetails');
        if (!detailsContainer) return;

        const statusLabel = phase.status === 'completed' ? 'Phase validée et réceptionnée' : (phase.status === 'in_progress' ? 'Phase active en cours de réalisation' : 'Phase programmée');
        const statusBadgeClass = phase.status === 'completed' ? 'phase-completed' : (phase.status === 'in_progress' ? 'phase-active' : 'phase-pending');

        let docsHtml = '<p class="text-sm text-muted">Aucun document pour cette phase.</p>';
        if (phase.documents && phase.documents.length > 0) {
            docsHtml = '<ul class="tracker-doc-list">';
            phase.documents.forEach(doc => {
                docsHtml += '<li><button type="button" class="btn-doc-download" data-doc="' + doc + '">📄 ' + doc + ' <span class="doc-badge">PDF</span></button></li>';
            });
            docsHtml += '</ul>';
        }

        let html = '<div class="phase-detail-card">';
        html += '  <div class="phase-detail-header">';
        html += '    <div>';
        html += '      <span class="phase-badge ' + statusBadgeClass + '">' + statusLabel + '</span>';
        html += '      <h3 class="phase-detail-title">' + phase.title + '</h3>';
        html += '      <p class="phase-detail-date">📅 Échéance : ' + phase.date + '</p>';
        html += '    </div>';
        html += '  </div>';
        html += '  <div class="phase-detail-body">';
        html += '    <div class="detail-section">';
        html += '      <h5>Description des travaux</h5>';
        html += '      <p>' + phase.description + '</p>';
        html += '    </div>';
        html += '    <div class="detail-section">';
        html += '      <h5>Contrôle technique & Responsable</h5>';
        html += '      <p class="inspector-name">👷 ' + phase.inspector + '</p>';
        html += '    </div>';
        html += '    <div class="detail-section">';
        html += '      <h5>Procès-Verbaux & Documents d\'Assurance</h5>';
        html += docsHtml;
        html += '    </div>';
        html += '  </div>';
        html += '</div>';

        detailsContainer.innerHTML = html;

        // Attachement des clics sur les boutons de téléchargement
        const docBtns = detailsContainer.querySelectorAll('.btn-doc-download');
        docBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const docName = btn.dataset.doc;
                alert('Téléchargement du document certifié EFFICIENS ENERGIA : ' + docName);
            });
        });
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BatiTracker;
}
