/**
 * 📐 Simulateur Déterministe de Devis & Aides Rénovation — EFFICIENS ENERGIA
 * Conforme aux barèmes réels de rénovation énergétique 2026, normes RE2020 et calculs d'aides.
 */
const BatiSimulator = {
    // Barèmes de base au m² (€ HT)
    RATES: {
        new_build: { baseM2: 1850, label: 'Construction Maison Individuelle', tva: 0.20, monthsPer100m2: 10 },
        renovation: { baseM2: 1200, label: 'Rénovation Globale / Réhabilitation', tva: 0.10, monthsPer100m2: 6 },
        extension: { baseM2: 2100, label: 'Extension & Surélévation', tva: 0.20, monthsPer100m2: 5 },
        thermal_eco: { baseM2: 650, label: 'Rénovation Énergétique & Isolation', tva: 0.055, monthsPer100m2: 3 }
    },

    // Multiplicateurs de gamme de finitions
    FINISH_MULTIPLIERS: {
        standard: { factor: 1.00, label: 'Gamme Essentielle (Matériaux éprouvés, finitions soignées)' },
        signature: { factor: 1.25, label: 'Gamme Signature (Menuiseries alu, carrelage grand format, domotique)' },
        prestige: { factor: 1.60, label: 'Gamme Prestige (Architecte dédié, parquets nobles, pierre naturelle, sur-mesure)' }
    },

    // Multiplicateurs thermiques & aides d'État
    ECO_STANDARDS: {
        rt2012: { factor: 1.00, label: 'Conforme RT2012 (Standard)', subsidyPerM2: 0, maxSubsidy: 0 },
        re2020: { factor: 1.08, label: 'Haute Performance RE2020 (Éco-responsable)', subsidyPerM2: 45, maxSubsidy: 15000 },
        passive: { factor: 1.20, label: 'Maison Passive / Bepos (Autonome en énergie)', subsidyPerM2: 95, maxSubsidy: 28000 }
    },

    // État courant du devis
    state: {
        currentStep: 1,
        projectType: 'new_build',
        surfaceM2: 120,
        finishLevel: 'signature',
        ecoStandard: 're2020',
        postalCode: '01250',
        fullName: '',
        email: '',
        phone: ''
    },

    /**
     * Calcule le devis détaillé complet.
     */
    calculateQuote(params) {
        const pType = params.projectType || this.state.projectType;
        const rateInfo = this.RATES[pType] || this.RATES.new_build;
        const surface = BatiSecurity.sanitizeNumber(params.surfaceM2 || this.state.surfaceM2, 20, 1000, 100);
        const finish = this.FINISH_MULTIPLIERS[params.finishLevel] || this.FINISH_MULTIPLIERS.standard;
        const eco = this.ECO_STANDARDS[params.ecoStandard] || this.ECO_STANDARDS.re2020;

        // Calcul du coût de base HT
        const baseCostHT = surface * rateInfo.baseM2 * finish.factor * eco.factor;
        const totalHT = Math.round(baseCostHT);

        // Ventilation des 4 postes métiers BTP
        const structural = Math.round(totalHT * 0.35); // Gros oeuvre & terrassement (35%)
        const envelope = Math.round(totalHT * 0.25);   // Clos & couvert, toiture, fenêtres (25%)
        const finishes = Math.round(totalHT * 0.22);   // Second oeuvre, sols, peintures (22%)
        const ecoEnergy = Math.round(totalHT * 0.18);  // CVC, pompe à chaleur, isolation (18%)

        // Calcul TVA
        const totalTTC = Math.round(totalHT * (1 + rateInfo.tva));

        // Calcul des aides écologiques (MaPrimeRénov' + CEE)
        const rawSubsidy = surface * eco.subsidyPerM2;
        const maPrimeRenov = Math.min(rawSubsidy, eco.maxSubsidy);
        const ceeBonus = Math.round(surface * 18); // Primes CEE fournisseurs énergie
        const totalSubsidies = maPrimeRenov + ceeBonus;
        const netRemaining = Math.max(0, totalTTC - totalSubsidies);

        // Durée prévisionnelle en mois
        const durationMonths = Math.max(2, Math.round((surface / 100) * rateInfo.monthsPer100m2));

        return {
            projectType: pType,
            projectLabel: rateInfo.label,
            surfaceM2: surface,
            finishLevel: params.finishLevel,
            finishLabel: finish.label,
            ecoStandard: params.ecoStandard,
            ecoLabel: eco.label,
            totalHT: totalHT,
            totalTTC: totalTTC,
            tvaRate: rateInfo.tva,
            breakdown: {
                structural,
                envelope,
                finishes,
                ecoEnergy
            },
            subsidies: {
                maPrimeRenov,
                ceeBonus,
                totalSubsidies,
                netRemaining
            },
            estimatedDurationMonths: durationMonths,
            generatedAt: new Date().toISOString()
        };
    },

    /**
     * Initialise l'interface utilisateur du simulateur.
     */
    initUI() {
        this.loadSavedState();
        this.bindEvents();
        this.updateStepView();
        this.renderCalculation();
    },

    /**
     * Sauvegarde et rechargement local.
     */
    saveState() {
        try {
            localStorage.setItem('bati_simulator_state', JSON.stringify(this.state));
        } catch (e) {
            console.warn('Stockage local indisponible :', e);
        }
    },

    loadSavedState() {
        try {
            const saved = localStorage.getItem('bati_simulator_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.state = Object.assign(this.state, parsed);
            }
        } catch (e) {
            console.warn('Erreur chargement state :', e);
        }
    },

    /**
     * Branchement des écouteurs d'événements.
     */
    bindEvents() {
        // Choix du type de projet (Cartes cliquables)
        const typeCards = document.querySelectorAll('.project-type-card');
        typeCards.forEach(card => {
            card.addEventListener('click', () => {
                typeCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.state.projectType = card.dataset.type;
                this.saveState();
                this.renderCalculation();
            });
        });

        // Curseur de surface
        const surfaceInput = document.getElementById('surfaceRange');
        const surfaceVal = document.getElementById('surfaceDisplay');
        if (surfaceInput && surfaceVal) {
            surfaceInput.value = this.state.surfaceM2;
            surfaceVal.textContent = this.state.surfaceM2 + ' m²';
            surfaceInput.addEventListener('input', (e) => {
                const val = parseInt(e.target.value, 10);
                this.state.surfaceM2 = val;
                surfaceVal.textContent = val + ' m²';
                this.saveState();
                this.renderCalculation();
            });
        }

        // Sélecteur de finition
        const finishInputs = document.querySelectorAll('input[name=finishLevel]');
        finishInputs.forEach(input => {
            if (input.value === this.state.finishLevel) input.checked = true;
            input.addEventListener('change', (e) => {
                this.state.finishLevel = e.target.value;
                this.saveState();
                this.renderCalculation();
            });
        });

        // Sélecteur de norme énergétique
        const ecoInputs = document.querySelectorAll('input[name=ecoStandard]');
        ecoInputs.forEach(input => {
            if (input.value === this.state.ecoStandard) input.checked = true;
            input.addEventListener('change', (e) => {
                this.state.ecoStandard = e.target.value;
                this.saveState();
                this.renderCalculation();
            });
        });

        // Boutons de navigation étapes
        const nextBtn = document.getElementById('simNextBtn');
        const prevBtn = document.getElementById('simPrevBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.goToNextStep());
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.goToPrevStep());
        }

        // Bouton d'export PDF/Impression
        const exportBtn = document.getElementById('exportQuoteBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.printOrExportPDF());
        }
    },

    goToNextStep() {
        if (this.state.currentStep < 4) {
            this.state.currentStep++;
            this.updateStepView();
            this.saveState();
        }
    },

    goToPrevStep() {
        if (this.state.currentStep > 1) {
            this.state.currentStep--;
            this.updateStepView();
            this.saveState();
        }
    },

    updateStepView() {
        // MAJ des onglets d'étape
        const stepIndicators = document.querySelectorAll('.sim-step-indicator');
        stepIndicators.forEach(ind => {
            const stepNum = parseInt(ind.dataset.step, 10);
            ind.classList.toggle('active', stepNum === this.state.currentStep);
            ind.classList.toggle('completed', stepNum < this.state.currentStep);
        });

        // MAJ des panneaux
        const stepPanels = document.querySelectorAll('.sim-step-panel');
        stepPanels.forEach(panel => {
            const stepNum = parseInt(panel.dataset.step, 10);
            panel.classList.toggle('hidden', stepNum !== this.state.currentStep);
        });

        // MAJ des boutons
        const prevBtn = document.getElementById('simPrevBtn');
        const nextBtn = document.getElementById('simNextBtn');
        if (prevBtn) prevBtn.style.display = this.state.currentStep === 1 ? 'none' : 'inline-flex';
        if (nextBtn) {
            if (this.state.currentStep === 4) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'inline-flex';
                nextBtn.textContent = this.state.currentStep === 3 ? 'Finaliser & Exporter' : 'Étape suivante →';
            }
        }

        if (this.state.currentStep >= 3) {
            this.renderCalculation();
        }
    },

    /**
     * Rendu dynamique des résultats de calcul.
     */
    renderCalculation() {
        const res = this.calculateQuote(this.state);

        // Formatage monétaire
        const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

        // Éléments du DOM
        const elTotalTTC = document.getElementById('simTotalTTC');
        const elTotalHT = document.getElementById('simTotalHT');
        const elDuration = document.getElementById('simDuration');
        const elSubsidies = document.getElementById('simSubsidies');
        const elNetRemaining = document.getElementById('simNetRemaining');

        if (elTotalTTC) elTotalTTC.textContent = fmt(res.totalTTC);
        if (elTotalHT) elTotalHT.textContent = fmt(res.totalHT) + ' HT';
        if (elDuration) elDuration.textContent = res.estimatedDurationMonths + ' mois';
        if (elSubsidies) elSubsidies.textContent = '- ' + fmt(res.subsidies.totalSubsidies);
        if (elNetRemaining) elNetRemaining.textContent = fmt(res.subsidies.netRemaining);

        // Détail des 4 postes
        const elBreakdownStruct = document.getElementById('breakdownStructural');
        const elBreakdownEnv = document.getElementById('breakdownEnvelope');
        const elBreakdownFin = document.getElementById('breakdownFinishes');
        const elBreakdownEco = document.getElementById('breakdownEcoEnergy');

        if (elBreakdownStruct) elBreakdownStruct.textContent = fmt(res.breakdown.structural);
        if (elBreakdownEnv) elBreakdownEnv.textContent = fmt(res.breakdown.envelope);
        if (elBreakdownFin) elBreakdownFin.textContent = fmt(res.breakdown.finishes);
        if (elBreakdownEco) elBreakdownEco.textContent = fmt(res.breakdown.ecoEnergy);

        // Barres de pourcentage de répartition
        const barStruct = document.getElementById('barStructural');
        const barEnv = document.getElementById('barEnvelope');
        const barFin = document.getElementById('barFinishes');
        const barEco = document.getElementById('barEcoEnergy');

        if (barStruct) barStruct.style.width = '35%';
        if (barEnv) barEnv.style.width = '25%';
        if (barFin) barFin.style.width = '22%';
        if (barEco) barEco.style.width = '18%';

        // Récapitulatif texte
        const elSummaryType = document.getElementById('summaryProjectType');
        const elSummarySurface = document.getElementById('summarySurface');
        const elSummaryFinish = document.getElementById('summaryFinish');
        const elSummaryEco = document.getElementById('summaryEco');

        if (elSummaryType) elSummaryType.textContent = res.projectLabel;
        if (elSummarySurface) elSummarySurface.textContent = res.surfaceM2 + ' m²';
        if (elSummaryFinish) elSummaryFinish.textContent = res.finishLabel;
        if (elSummaryEco) elSummaryEco.textContent = res.ecoLabel;
    },

    /**
     * Impression native / export PDF de la synthèse devis.
     */
    printOrExportPDF() {
        window.print();
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BatiSimulator;
}
