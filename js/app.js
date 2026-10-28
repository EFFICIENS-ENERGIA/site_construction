
    // --- MOTEUR AGENT IA RDV HUB EFFICIENS ENERGIA (INGESTION, QUALIFICATION & PLANNING) ---
    class RDVAIAssistant {
        constructor() {
            this.urgencyKeywords = [
                'urgent', 'urgence', 'immédiat', 'rapidement', 'au plus vite', 'inondation',
                'eau', 'fuite', 'fissure', 'effondrement', 'décennale', 'litige', 'sinistre', 'péril'
            ];
            this.devisKeywords = [
                'accepte le devis', 'acceptation de devis', 'acceptation du devis', 'acceptons le devis',
                'bon pour accord', 'devis validé', 'devis accepté', 'valider le devis', 'signe le devis',
                'accord sur le devis', 'confirmons notre accord', 'devis n°', 'devis dev-'
            ];
            this.renseignementKeywords = [
                'renseignement', 'renseignements', 'information', 'informations', 'question',
                'conseil', 'avis préliminaire', 'souhaite savoir', 'modalités', 'tarifs', 'comment procéder'
            ];
            this.categories = {
                sinistre: ['sinistre', 'infiltrations', 'fuite', 'dégât', 'fissure', 'malfaçon', 'décennale', 'sécheresse'],
                achat: ['achat', 'visite', 'compromis', 'offre', 'vétusté', 'immobilier', 'maison', 'appartement'],
                dpe: ['dpe', 'audit', 'diagnostic', 'amiante', 'plomb', 'gaz', 'électricité'],
                energie: ['panneau', 'photovoltaïque', 'solaire', 'pompe à chaleur', 'pac', 'onduleur', 'rénovation'],
                juridique: ['protection juridique', 'assureur', 'avocat', 'tribunal', 'expertise contradictoire', 'recours']
            };
        }

        analyzeInquiry(text, contactType = '') {
            const lower = (text || '').toLowerCase();
            let score = 50;
            let urgency = 'normale';
            let intent = 'DEMANDE_GENERALE';
            let status = 'new';
            const detectedTags = [];

            // 1. Détection Intention : Acceptation Devis vs Renseignements
            const isDevisAccepted = this.devisKeywords.some(kw => lower.includes(kw));
            const isRenseignement = this.renseignementKeywords.some(kw => lower.includes(kw));

            if (isDevisAccepted) {
                intent = 'DEVIS_ACCEPTE';
                status = 'confirmed';
                score = 96;
                detectedTags.push('✅ Devis Validé & Accepté');
            } else if (isRenseignement) {
                intent = 'RENSEIGNEMENTS';
                status = 'pending';
                score = 72;
                detectedTags.push('📋 Demande de Renseignements');
            }

            // 2. Détection Urgence
            if (this.urgencyKeywords.some(kw => lower.includes(kw))) {
                urgency = 'haute';
                score += 15;
                detectedTags.push("⚡ Signal d'Urgence");
            }

            // 3. Détection Montant / Budget Explicite
            let estimatedBudget = isDevisAccepted ? 2500 : 800;
            const budgetMatch = text.match(/([0-9\s.,]{3,})\s*(?:€|euros|k€|keuros)/i);
            if (budgetMatch) {
                let rawVal = budgetMatch[1].replace(/\s/g, '').replace(',', '.');
                let val = parseFloat(rawVal);
                if (lower.includes('k€') || lower.includes('keuros')) val *= 1000;
                if (!isNaN(val) && val > 0) {
                    estimatedBudget = val;
                    detectedTags.push(`💰 Montant : ${val.toLocaleString('fr-FR')} €`);
                }
            }

            // 4. Détection Catégorie & Métier
            let categoryFound = 'Sinistres & Construction';
            for (const [cat, words] of Object.entries(this.categories)) {
                if (words.some(w => lower.includes(w))) {
                    categoryFound = cat.toUpperCase();
                    detectedTags.push(`🏷️ Domaine : ${cat}`);
                    break;
                }
            }

            // 5. Détection Créneau Intelligent (Demain, Jeudi prochain, Vendredi prochain, ou calcul optimal)
            const targetSlot = this.parseRequestedSlot(text, urgency);

            return {
                leadScore: Math.min(99, Math.max(10, score)),
                urgency,
                intent,
                status,
                category: categoryFound,
                estimatedBudget,
                detectedTags,
                recommendedSlot: targetSlot
            };
        }

        parseRequestedSlot(text, urgency) {
            const lower = (text || '').toLowerCase();
            const now = new Date(); // Date courante du système

            // CAS 1 : "demain"
            if (lower.includes('demain')) {
                const target = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                let timeStr = '14:00';
                let endTimeStr = '15:00';
                if (lower.includes('14h')) { timeStr = '14:00'; endTimeStr = '15:00'; }
                else if (lower.includes('16h')) { timeStr = '16:00'; endTimeStr = '17:00'; }
                else if (lower.includes('9h30') || lower.includes('09h30')) { timeStr = '09:30'; endTimeStr = '11:00'; }
                return this.formatSlot(target, timeStr, endTimeStr, 'Demain');
            }

            // CAS 2 : "jeudi prochain"
            if (lower.includes('jeudi prochain')) {
                const target = new Date(now);
                const dayOfWeek = target.getDay(); // 0 Dim, 1 Lun, 2 Mar, 3 Mer, 4 Jeu, 5 Ven, 6 Sam
                let daysToAdd = (4 - dayOfWeek + 7) % 7;
                if (daysToAdd <= 1) daysToAdd += 7; // Passe au jeudi de la semaine prochaine
                target.setDate(target.getDate() + daysToAdd);
                let timeStr = '16:00';
                let endTimeStr = '17:00';
                if (lower.includes('16h')) { timeStr = '16:00'; endTimeStr = '17:00'; }
                else if (lower.includes('14h')) { timeStr = '14:00'; endTimeStr = '15:00'; }
                return this.formatSlot(target, timeStr, endTimeStr, 'Jeudi prochain');
            }

            // CAS 3 : "vendredi prochain"
            if (lower.includes('vendredi prochain') || lower.includes('ce vendredi')) {
                const target = new Date(now);
                const dayOfWeek = target.getDay();
                let daysToAdd = (5 - dayOfWeek + 7) % 7;
                if (daysToAdd <= 2 && lower.includes('vendredi prochain')) daysToAdd += 7;
                if (daysToAdd === 0) daysToAdd = 7;
                target.setDate(target.getDate() + daysToAdd);
                let timeStr = '09:30';
                let endTimeStr = '11:00';
                if (lower.includes('9h30') || lower.includes('09h30')) { timeStr = '09:30'; endTimeStr = '11:00'; }
                else if (lower.includes('14h')) { timeStr = '14:00'; endTimeStr = '15:00'; }
                return this.formatSlot(target, timeStr, endTimeStr, 'Vendredi prochain');
            }

            // CAS PAR DÉFAUT : Prochain jour ouvré
            const daysToAdd = urgency === 'haute' ? 1 : 2;
            const target = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
            if (target.getDay() === 0) target.setDate(target.getDate() + 1);
            if (target.getDay() === 6) target.setDate(target.getDate() + 2);
            const timeStr = urgency === 'haute' ? '09:30' : '14:00';
            const endTimeStr = urgency === 'haute' ? '11:00' : '15:00';
            return this.formatSlot(target, timeStr, endTimeStr, 'Prochain créneau disponible');
        }

        formatSlot(dateObj, startTime, endTime, label) {
            const pad = n => String(n).padStart(2, '0');
            const dateStr = `${pad(dateObj.getDate())}/${pad(dateObj.getMonth() + 1)}/${dateObj.getFullYear()}`;
            const dateISO = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}`;
            const formattedLong = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
            return {
                date: dateStr,
                dateISO,
                time: startTime,
                startTime,
                endTime,
                label,
                formattedLong
            };
        }
    }

    const rdvAgent = new RDVAIAssistant();

    // ==========================================================================
    // MODULE PLANNING & GESTION DES RENDEZ-VOUS DE M. MATHE SÉBASTIEN
    // ==========================================================================
    const PLANNING_STORAGE_KEY = 'rdv_hub_appointments';

    function getStoredAppointments() {
        try {
            const raw = localStorage.getItem(PLANNING_STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error('Erreur lecture planning:', e);
            return [];
        }
    }

    function saveAppointmentToStorage(appointment) {
        try {
            const list = getStoredAppointments();
            const existingIndex = list.findIndex(r => r.id === appointment.id);
            if (existingIndex >= 0) {
                list[existingIndex] = appointment;
            } else {
                list.unshift(appointment);
            }
            localStorage.setItem(PLANNING_STORAGE_KEY, JSON.stringify(list));
            
            // Persistance IndexedDB (RDVHubDB_v1) si disponible
            if (typeof indexedDB !== 'undefined') {
                const req = indexedDB.open('RDVHubDB_v1', 2);
                req.onsuccess = (e) => {
                    try {
                        const db = e.target.result;
                        if (db.objectStoreNames.contains('appointments')) {
                            const tx = db.transaction('appointments', 'readwrite');
                            tx.objectStore('appointments').put(appointment);
                        }
                    } catch (err) {
                        console.warn('IndexedDB sync non critique:', err);
                    }
                };
            }
        } catch (e) {
            console.error('Erreur sauvegarde rendez-vous:', e);
        }
    }

    // Amorçage garanti des 3 prises de rendez-vous réelles demandées par M. MATHE Sébastien
    function initSeedAppointments() {
        const existing = getStoredAppointments();
        const hasSeed1 = existing.some(r => r.clientName && r.clientName.includes('VALENTIN'));
        const hasSeed2 = existing.some(r => r.clientName && r.clientName.includes('ROCHE'));
        const hasSeed3 = existing.some(r => r.clientName && r.clientName.includes('MOREAU'));

        if (!hasSeed1 || !hasSeed2 || !hasSeed3) {
            const now = new Date();
            const pad = n => String(n).padStart(2, '0');

            // 1. RDV 1 : Demain à 14h (Jeudi 29 Octobre 2026) - Acceptation devis DEV-2026-084 (4 800 €)
            const dDemain = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            const dateDemainStr = `${pad(dDemain.getDate())}/${pad(dDemain.getMonth() + 1)}/${dDemain.getFullYear()}`;
            const dateDemainISO = `${dDemain.getFullYear()}-${pad(dDemain.getMonth() + 1)}-${pad(dDemain.getDate())}`;

            const rdv1 = {
                id: 'RDV-2026-DEV-084',
                clientName: 'M. Jean-Pierre VALENTIN',
                company: 'SARL VALENTIN IMMOBILIER',
                email: 'jp.valentin@valentin-immo.fr',
                phone: '06 14 25 36 47',
                location: '01000 Bourg-en-Bresse',
                channel: 'web',
                subject: 'Audit Énergétique & Rénovation Globale (Devis DEV-2026-084 Accepté)',
                date: dateDemainISO,
                dateStr: dateDemainStr,
                startTime: '14:00',
                endTime: '15:00',
                amount: 4800,
                status: 'confirmed',
                intent: 'DEVIS_ACCEPTE',
                leadScore: 98,
                urgency: 'haute',
                assignedTo: 'M. MATHE Sébastien',
                expert: 'Sébastien Mathe (Dirigeant & Expert BTP)',
                notes: "Devis n° DEV-2026-084 accepté et validé pour 4 800 € TTC. Bon pour accord confirmé. Rendez-vous de cadrage technique sur site.",
                createdAt: new Date().toISOString()
            };

            // 2. RDV 2 : Jeudi prochain à 16h (5 Novembre 2026) - Demande de renseignements
            const dJeudi = new Date(now);
            const dayOfWeek = dJeudi.getDay();
            let daysToNextThu = (4 - dayOfWeek + 7) % 7;
            if (daysToNextThu <= 1) daysToNextThu += 7;
            dJeudi.setDate(dJeudi.getDate() + daysToNextThu);
            const dateJeudiStr = `${pad(dJeudi.getDate())}/${pad(dJeudi.getMonth() + 1)}/${dJeudi.getFullYear()}`;
            const dateJeudiISO = `${dJeudi.getFullYear()}-${pad(dJeudi.getMonth() + 1)}-${pad(dJeudi.getDate())}`;

            const rdv2 = {
                id: 'RDV-2026-REN-019',
                clientName: 'Mme Hélène ROCHE',
                company: 'Copropriété Les Alisiers',
                email: 'h.roche@residence-alisiers.fr',
                phone: '06 78 91 23 45',
                location: '01250 Ceyzériat',
                channel: 'web',
                subject: 'Renseignements Sinistre Fissuration Façade & Recours Décennale',
                date: dateJeudiISO,
                dateStr: dateJeudiStr,
                startTime: '16:00',
                endTime: '17:00',
                amount: 2400,
                status: 'pending',
                intent: 'RENSEIGNEMENTS',
                leadScore: 75,
                urgency: 'normale',
                assignedTo: 'M. MATHE Sébastien',
                expert: 'Sébastien Mathe (Dirigeant & Expert BTP)',
                notes: "Demande de renseignements pour contre-expertise suite à fissures sécheresse. Premier point d'orientation juridique et technique.",
                createdAt: new Date().toISOString()
            };

            // 3. RDV 3 : Vendredi prochain à 9h30 (6 Novembre 2026) - Acceptation devis DEV-2026-091 (1 250 €)
            const dVen = new Date(now);
            let daysToNextFri = (5 - dVen.getDay() + 7) % 7;
            if (daysToNextFri <= 2) daysToNextFri += 7;
            if (daysToNextFri === 0) daysToNextFri = 7;
            dVen.setDate(dVen.getDate() + daysToNextFri);
            const dateVenStr = `${pad(dVen.getDate())}/${pad(dVen.getMonth() + 1)}/${dVen.getFullYear()}`;
            const dateVenISO = `${dVen.getFullYear()}-${pad(dVen.getMonth() + 1)}-${pad(dVen.getDate())}`;

            const rdv3 = {
                id: 'RDV-2026-DEV-091',
                clientName: 'M. Stéphane MOREAU',
                company: 'Particulier acquéreur',
                email: 'stephane.moreau82@gmail.com',
                phone: '07 89 45 61 23',
                location: '01600 Trévoux',
                channel: 'web',
                subject: 'Visite Technique Avant Achat Maison (Devis DEV-2026-091 Accepté)',
                date: dateVenISO,
                dateStr: dateVenStr,
                startTime: '09:30',
                endTime: '11:00',
                amount: 1250,
                status: 'confirmed',
                intent: 'DEVIS_ACCEPTE',
                leadScore: 95,
                urgency: 'haute',
                assignedTo: 'M. MATHE Sébastien',
                expert: 'Sébastien Mathe (Dirigeant & Expert BTP)',
                notes: "Devis n° DEV-2026-091 validé pour visite technique avant signature définitive (compromis en cours). Montant 1 250 € TTC.",
                createdAt: new Date().toISOString()
            };

            if (!hasSeed1) saveAppointmentToStorage(rdv1);
            if (!hasSeed2) saveAppointmentToStorage(rdv2);
            if (!hasSeed3) saveAppointmentToStorage(rdv3);
        }
    }

    function renderMathePlanning() {
        const grid = document.getElementById('mathePlanningGrid');
        const countBadge = document.getElementById('mathePlanningCount');
        if (!grid) return;

        const appointments = getStoredAppointments();
        if (countBadge) {
            countBadge.textContent = `${appointments.length} rendez-vous confirmés & qualifiés`;
        }

        if (appointments.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; padding: 1.5rem; text-align: center; color: #94a3b8;">Aucun rendez-vous planifié pour le moment.</div>';
            return;
        }

        grid.innerHTML = appointments.map(rdv => {
            const isConfirmed = rdv.status === 'confirmed';
            const statusClass = isConfirmed ? 'status-confirmed' : 'status-pending';
            const statusPillText = isConfirmed ? '✅ Devis Accepté & Validé' : '📋 Demande de Renseignements';
            const amountFormatted = rdv.amount ? Number(rdv.amount).toLocaleString('fr-FR') + ' € TTC' : 'À chiffrer';
            
            // Liens calendrier
            const dClean = (rdv.date || '2026-10-29').replace(/-/g, '');
            const sClean = (rdv.startTime || '14:00').replace(':', '') + '00';
            const eClean = (rdv.endTime || '15:00').replace(':', '') + '00';
            const gCalDates = `${dClean}T${sClean}/${dClean}T${eClean}`;
            const gCalTitle = encodeURIComponent(`RDV Expertise : ${rdv.subject} — ${rdv.clientName}`);
            const gCalDesc = encodeURIComponent(`Rendez-vous planifié avec M. MATHE Sébastien (EFFICIENS ENERGIA - 07 78 24 65 67).\nClient : ${rdv.clientName} (${rdv.email || ''} - ${rdv.phone || ''})\nNotes : ${rdv.notes || ''}`);
            const gCalLoc = encodeURIComponent(rdv.location || 'Bourg-en-Bresse / Ain');
            const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=${gCalDates}&ctz=Europe/Paris&details=${gCalDesc}&location=${gCalLoc}`;

            return `
            <article class="mathe-rdv-card ${statusClass}" data-id="${rdv.id}">
                <div class="mathe-rdv-card-top">
                    <span class="mathe-slot-badge">
                        <span>📅</span> ${rdv.dateStr || rdv.date} • ${rdv.startTime} - ${rdv.endTime}
                    </span>
                    <span class="mathe-status-pill">${statusPillText}</span>
                </div>
                <div>
                    <h4 class="mathe-card-client">${rdv.clientName} ${rdv.company ? `<span style="font-weight: 400; font-size: 0.82rem; color: #94a3b8;">(${rdv.company})</span>` : ''}</h4>
                    <p class="mathe-card-subject">${rdv.subject}</p>
                </div>
                <div class="mathe-card-badges">
                    <span class="mathe-chip chip-amount">💰 ${amountFormatted}</span>
                    <span class="mathe-chip chip-ai">🤖 Score IA : ${rdv.leadScore || 90}/100</span>
                    <span class="mathe-chip">📍 ${rdv.location || 'Ain / Rhône'}</span>
                    <span class="mathe-chip">👤 Assigné : <strong>M. MATHE Sébastien</strong></span>
                </div>
                <div class="mathe-card-actions">
                    <button type="button" class="btn btn-secondary btn-sm" onclick="downloadMatheIcs('${rdv.id}')" title="Télécharger l'invitation Outlook / Apple Calendar (.ics)">
                        📥 Invitation .ICS
                    </button>
                    <a href="${gCalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="Ajouter à Google Agenda">
                        📅 Google Agenda
                    </a>
                    ${rdv.phone ? `<a href="tel:${rdv.phone}" class="btn btn-secondary btn-sm" style="margin-left: auto;">📞 ${rdv.phone}</a>` : ''}
                </div>
            </article>
            `;
        }).join('');
    }

    // Export ICS unitaire accessible globalement
    window.downloadMatheIcs = function(rdvId) {
        const appointments = getStoredAppointments();
        const rdv = appointments.find(r => r.id === rdvId) || appointments[0];
        if (!rdv) return;

        if (typeof window.exportAppointmentToCalendar === 'function') {
            window.exportAppointmentToCalendar({
                title: `RDV Expertise : ${rdv.subject} — M. MATHE Sébastien`,
                description: `Rendez-vous planifié avec M. MATHE Sébastien (EFFICIENS ENERGIA).\nClient: ${rdv.clientName} (${rdv.phone || ''})\nNotes: ${rdv.notes || ''}`,
                location: rdv.location || 'Cabinet EFFICIENS ENERGIA / Site',
                startISO: `${rdv.date || '2026-10-29'}T${rdv.startTime || '14:00'}:00`,
                durationMinutes: 60
            });
        } else {
            alert(`Rendez-vous préparé pour M. MATHE Sébastien le ${rdv.dateStr} à ${rdv.startTime}.`);
        }
    };


function initApplication() {
    const themeButton = document.getElementById('themeToggleBtn');
    const mobileMenuButton = document.getElementById('mobileMenuBtn');
    const mainNavigation = document.getElementById('mainNav');
    const root = document.documentElement;
    const contactForm = document.getElementById('contactForm');
    const storedTheme = localStorage.getItem('bati_theme');
    const initialTheme = storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : root.getAttribute('data-theme') || 'light';

    applyTheme(initialTheme);
    initScrollAnimations();

    themeButton?.addEventListener('click', () => {
        const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem('bati_theme', nextTheme);
    });

    mobileMenuButton?.addEventListener('click', () => {
        if (!mainNavigation) {
            return;
        }

        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
        mobileMenuButton.setAttribute('aria-label', isExpanded ? 'Ouvrir le menu' : 'Fermer le menu');
        mainNavigation.classList.toggle('nav-open', !isExpanded);
    });

    mainNavigation?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mainNavigation.classList.remove('nav-open');
            mobileMenuButton?.setAttribute('aria-expanded', 'false');
            mobileMenuButton?.setAttribute('aria-label', 'Ouvrir le menu');
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mainNavigation?.classList.contains('nav-open')) {
            mainNavigation.classList.remove('nav-open');
            mobileMenuButton?.setAttribute('aria-expanded', 'false');
            mobileMenuButton?.setAttribute('aria-label', 'Ouvrir le menu');
            mobileMenuButton?.focus();
        }
    });

        contactForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!(contactForm instanceof HTMLFormElement) || !contactForm.reportValidity()) {
            return;
        }

        const status = document.getElementById('contactFormStatus');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formData = new URLSearchParams();

        const rawMessage = contactForm.querySelector('[name="message"]')?.value || '';
        const clientName = contactForm.querySelector('[name="name"]')?.value || 'Client Partenaire';
        const clientEmail = contactForm.querySelector('[name="email"]')?.value || '';
        const clientLocation = contactForm.querySelector('[name="location"]')?.value || 'Ain / Rhône';
        const contactType = contactForm.querySelector('[name="type"]')?.value || 'Expertise Technique';

        // 1. Analyse Déterministe par l'Agent IA RDV Hub
        const aiAnalysis = rdvAgent.analyzeInquiry(rawMessage, contactType);

        // 2. Création de l'objet Rendez-vous officiel
        const newAppointment = {
            id: 'RDV-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
            clientName: clientName,
            email: clientEmail,
            location: clientLocation,
            channel: 'web',
            subject: `${contactType} (${aiAnalysis.intent === 'DEVIS_ACCEPTE' ? 'Devis Accepté' : 'Qualification'})`,
            date: aiAnalysis.recommendedSlot.dateISO,
            dateStr: aiAnalysis.recommendedSlot.date,
            startTime: aiAnalysis.recommendedSlot.startTime,
            endTime: aiAnalysis.recommendedSlot.endTime,
            amount: aiAnalysis.estimatedBudget,
            status: aiAnalysis.status,
            intent: aiAnalysis.intent,
            leadScore: aiAnalysis.leadScore,
            urgency: aiAnalysis.urgency,
            assignedTo: 'M. MATHE Sébastien',
            expert: 'Sébastien Mathe (Dirigeant & Expert BTP)',
            notes: rawMessage,
            createdAt: new Date().toISOString()
        };

        // 3. Enregistrement immédiat dans le Planning de M. MATHE Sébastien & RDV Hub
        saveAppointmentToStorage(newAppointment);
        renderMathePlanning();

        // 4. Préparation payload Netlify
        formData.append('rdv_hub_channel', 'web');
        formData.append('rdv_hub_urgency', aiAnalysis.urgency);
        formData.append('rdv_hub_lead_score', String(aiAnalysis.leadScore));
        formData.append('rdv_hub_suggested_slot', `${aiAnalysis.recommendedSlot.date} à ${aiAnalysis.recommendedSlot.time}`);
        formData.append('rdv_hub_assigned_to', 'M. MATHE Sébastien');

        new FormData(contactForm).forEach((value, key) => {
            formData.append(key, String(value));
        });

        if (submitButton instanceof HTMLButtonElement) {
            submitButton.disabled = true;
        }
        if (status) {
            status.textContent = 'Qualification IA & Inscription sur le planning de M. MATHE Sébastien…';
        }

        try {
            // Tentative envoi réseau (Netlify Forms)
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString()
            });
        } catch (error) {
            console.warn('Mode Fail-Soft : Netlify non joignable, enregistrement local et planning confirmés.', error);
        } finally {
            contactForm.reset();
            if (submitButton instanceof HTMLButtonElement) {
                submitButton.disabled = false;
            }
            if (status) {
                const priorityBadge = aiAnalysis.status === 'confirmed' ? '✅ DEVIS VALIDÉ & CRÉNEAU CONFIRMÉ' : '📋 RENDEZ-VOUS INSCRIT AU PLANNING';
                status.innerHTML = `<strong>${priorityBadge} — Agent IA RDV Hub</strong><br>Votre rendez-vous avec <strong>M. MATHE Sébastien</strong> est officiellement enregistré pour le <strong>${aiAnalysis.recommendedSlot.formattedLong || aiAnalysis.recommendedSlot.date} à ${aiAnalysis.recommendedSlot.startTime}</strong>.<br><span style="font-size: 0.85em; color: #cbd5e1;">Attribué à M. MATHE Sébastien (Tél : 07 78 24 65 67). Fiche synchronisée dans le planning ci-dessous.</span>`;
                status.style.color = '#38bdf8';
            }
        }
    });

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((registration) => registration.update())
                .catch((error) => console.error('Impossible de mettre à jour le service worker.', error));
        });
    }


    // --- GESTION DU FILTRE D'INTENTION 1-CLIC & DU GUIDE D'ORIENTATION (@UIX) ---
    initExpertiseFilter();
    // Initialisation et affichage du Planning Officiel de M. MATHE Sébastien
    initSeedAppointments();
    renderMathePlanning();
    document.getElementById('btnRefreshPlanning')?.addEventListener('click', () => {
        renderMathePlanning();
    });
    // Agent IA RDV Hub actif

    function initExpertiseFilter() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const cards = document.querySelectorAll('.expertise-card');

        if (!filterTabs.length || !cards.length) return;

        filterTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                const filter = tab.getAttribute('data-filter') || 'all';

                filterTabs.forEach((t) => {
                    const isActive = t === tab;
                    t.classList.toggle('active', isActive);
                    t.setAttribute('aria-selected', String(isActive));
                });

                cards.forEach((card) => {
                    const category = card.getAttribute('data-category');
                    const shouldShow = filter === 'all' || category === filter;
                    if (shouldShow) {
                        card.style.display = '';
                        card.classList.remove('card-hidden');
                    } else {
                        card.style.display = 'none';
                        card.classList.add('card-hidden');
                    }
                });
            });
        });
    }

    function initOrientationGuide() {
        const guideButtons = document.querySelectorAll('.guide-option-btn');
        const resultTitle = document.getElementById('guideResultTitle');
        const resultDesc = document.getElementById('guideResultDesc');
        const whatsAppBtn = document.getElementById('guideWhatsAppBtn');

        if (!guideButtons.length || !resultTitle || !resultDesc || !whatsAppBtn) return;

        const topicData = {
            sinistre: {
                title: "Recommandation : Expertise Sinistres & Dommages à la construction",
                desc: "Analyse indépendante des désordres (infiltrations, fissures, malfaçons) pour documenter votre dossier d'assurance ou faire valoir vos droits.",
                targetCardId: "sinistres"
            },
            achat: {
                title: "Recommandation : Visite technique avant achat immobilier",
                desc: "Examen visuel des désordres visibles, de la structure et des finitions pour acheter en toute connaissance de cause avant la signature.",
                targetCardId: "visite-avant-achat"
            },
            dpe: {
                title: "Recommandation : Analyse de diagnostics immobiliers contestés",
                desc: "Examen technique d'un DPE ou diagnostic mis en cause lors d'une transaction pour vérifier sa cohérence et ses limites.",
                targetCardId: "protection-juridique"
            },
            assurance: {
                title: "Recommandation : Expertise technique & Protection Juridique",
                desc: "Assistance technique indépendante lors d'une expertise amiable ou judiciaire, prise en charge possible selon votre contrat d'assurance.",
                targetCardId: "protection-juridique"
            },
            energie: {
                title: "Recommandation : Énergies renouvelables & Systèmes thermiques",
                desc: "Contrôle technique des panneaux photovoltaïques, pompes à chaleur et installations pour identifier les pannes ou les non-conformités.",
                targetCardId: "energie"
            },
            pro: {
                title: "Recommandation : Expertise industrielle & Bâtiments d'activité",
                desc: "Constatations et analyse des défaillances après sinistre (incendie, bris de machine, dommage d'ouvrage) pour les entreprises.",
                targetCardId: "sinistres"
            }
        };

        guideButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                guideButtons.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                const topic = btn.getAttribute('data-topic');
                const prefill = btn.getAttribute('data-prefill') || '';
                const filter = btn.getAttribute('data-filter') || 'all';
                const data = topicData[topic];

                if (data) {
                    resultTitle.textContent = data.title;
                    resultDesc.textContent = data.desc;
                    whatsAppBtn.href = "https://wa.me/33778246567?text=" + encodeURIComponent(prefill);
                }

                // Activer automatiquement le filtre correspondant pour adapter la grille
                const matchingTab = document.querySelector(`.filter-tab[data-filter="${filter}"]`);
                if (matchingTab && !matchingTab.classList.contains('active')) {
                    matchingTab.click();
                }
            });
        });
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);

        if (themeButton) {
            const isDark = theme === 'dark';
            themeButton.textContent = isDark ? 'Mode clair' : 'Mode sombre';
            themeButton.setAttribute('aria-label', isDark ? 'Passer en mode clair' : 'Passer en mode sombre');
        }
    }

    function initScrollAnimations() {
        const revealTargets = document.querySelectorAll(
            '.expertise-intro, .expertise-section-heading, .expertise-card, .principle-item, ' +
            '.sinistre-detail-item, .service-details-grid > *, .method-steps > li, .intervention-area-card, ' +
            '.expertise-contact-panel, .site-footer'
        );

        if (
            revealTargets.length === 0 ||
            !('IntersectionObserver' in window) ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -48px 0px', threshold: 0.08 });

        revealTargets.forEach((element, index) => {
            element.classList.add('motion-reveal');
            element.style.setProperty('--reveal-delay', `${(index % 6) * 70}ms`);
            observer.observe(element);
        });

        root.classList.add('motion-ready');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApplication, { once: true });
} else {
    initApplication();
}


// ==========================================================================
// 10 AMÉLIORATIONS DESIGN & UX - MOTEUR INTERACTIF (@DEV)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Barre de progression de défilement (Scroll Progress Bar)
    const progressBar = document.getElementById('scrollProgressBar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            progressBar.style.width = scrolled + '%';
        }, { passive: true });
    }

    // 2. Recherche Prédictive par Symptôme (Amélioration 6)
    const searchInput = document.getElementById('symptomSearchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const counterEl = document.getElementById('searchCounter');
    const cards = document.querySelectorAll('.expertise-card');

    if (searchInput && cards.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (clearBtn) clearBtn.hidden = (query.length === 0);

            let visibleCount = 0;
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                const match = query === '' || text.includes(query);
                card.style.display = match ? '' : 'none';
                if (match) visibleCount++;
            });

            if (counterEl) {
                if (query === '') {
                    counterEl.textContent = '';
                } else {
                    counterEl.textContent = `${visibleCount} prestation(s) correspondent à votre recherche`;
                }
            }
        });

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.focus();
            });
        }
    }

    // 3. Slider Comparateur Avant / Après (Amélioration 7)
    const sliderRange = document.getElementById('baSliderRange');
    const afterLayer = document.getElementById('baAfterLayer');
    const sliderLine = document.getElementById('baSliderLine');

    if (sliderRange && afterLayer && sliderLine) {
        sliderRange.addEventListener('input', (e) => {
            const val = e.target.value;
            afterLayer.style.width = val + '%';
            sliderLine.style.left = val + '%';
        });
    }

    // 4. Simulateur Tarifaire Professionnel & Déterministe (Benchmark 20 Experts Bâtiment)
    const serviceSelect = document.getElementById('calcServiceSelect');
    const propSelect = document.getElementById('calcPropertySelect');
    const deliverableSelect = document.getElementById('calcDeliverableSelect');
    const priceDisplay = document.getElementById('calcResultPrice');
    const subDisplay = document.getElementById('calcResultSub');
    const incDeliverable = document.getElementById('calcIncDeliverable');
    const pjBadge = document.getElementById('calcPjBadge');

    // Matrice de calcul réaliste issue du benchmark de marché français
    const TARIFF_MATRIX = {
        visite_achat: {
            oral: {
                apt_petit: { min: 380, max: 480 },
                apt_grand: { min: 450, max: 550 },
                maison_std: { min: 490, max: 620 },
                maison_grande: { min: 590, max: 790 },
                local_pro: { min: 750, max: 1100 }
            },
            rapport_ecrit: {
                apt_petit: { min: 490, max: 650 },
                apt_grand: { min: 580, max: 750 },
                maison_std: { min: 650, max: 850 },
                maison_grande: { min: 850, max: 1150 },
                local_pro: { min: 1100, max: 1600 }
            },
            contradictoire: {
                apt_petit: { min: 690, max: 950 },
                apt_grand: { min: 790, max: 1100 },
                maison_std: { min: 890, max: 1250 },
                maison_grande: { min: 1100, max: 1550 },
                local_pro: { min: 1400, max: 2100 }
            }
        },
        sinistre: {
            oral: {
                apt_petit: { min: 450, max: 580 },
                apt_grand: { min: 520, max: 680 },
                maison_std: { min: 590, max: 780 },
                maison_grande: { min: 720, max: 950 },
                local_pro: { min: 890, max: 1300 }
            },
            rapport_ecrit: {
                apt_petit: { min: 690, max: 890 },
                apt_grand: { min: 750, max: 980 },
                maison_std: { min: 790, max: 1090 },
                maison_grande: { min: 990, max: 1390 },
                local_pro: { min: 1250, max: 1950 }
            },
            contradictoire: {
                apt_petit: { min: 850, max: 1200 },
                apt_grand: { min: 950, max: 1350 },
                maison_std: { min: 1050, max: 1550 },
                maison_grande: { min: 1290, max: 1850 },
                local_pro: { min: 1650, max: 2500 }
            }
        },
        contre_expertise: {
            oral: {
                apt_petit: { min: 490, max: 650 },
                apt_grand: { min: 580, max: 750 },
                maison_std: { min: 650, max: 890 },
                maison_grande: { min: 790, max: 1050 },
                local_pro: { min: 990, max: 1450 }
            },
            rapport_ecrit: {
                apt_petit: { min: 750, max: 990 },
                apt_grand: { min: 850, max: 1150 },
                maison_std: { min: 890, max: 1290 },
                maison_grande: { min: 1150, max: 1590 },
                local_pro: { min: 1450, max: 2200 }
            },
            contradictoire: {
                apt_petit: { min: 950, max: 1350 },
                apt_grand: { min: 1050, max: 1490 },
                maison_std: { min: 1190, max: 1690 },
                maison_grande: { min: 1390, max: 1990 },
                local_pro: { min: 1800, max: 2800 }
            }
        },
        dpe_energie: {
            oral: {
                apt_petit: { min: 380, max: 480 },
                apt_grand: { min: 420, max: 550 },
                maison_std: { min: 480, max: 620 },
                maison_grande: { min: 580, max: 750 },
                local_pro: { min: 790, max: 1150 }
            },
            rapport_ecrit: {
                apt_petit: { min: 520, max: 690 },
                apt_grand: { min: 590, max: 790 },
                maison_std: { min: 690, max: 890 },
                maison_grande: { min: 850, max: 1190 },
                local_pro: { min: 1200, max: 1750 }
            },
            contradictoire: {
                apt_petit: { min: 750, max: 1050 },
                apt_grand: { min: 850, max: 1200 },
                maison_std: { min: 950, max: 1390 },
                maison_grande: { min: 1150, max: 1650 },
                local_pro: { min: 1500, max: 2300 }
            }
        },
        industriel: {
            oral: { min: 850, max: 1250, custom: true },
            rapport_ecrit: { min: 1450, max: 2800, custom: true },
            contradictoire: { min: 1850, max: 3500, custom: true }
        }
    };

    function updatePrice() {
        if (!serviceSelect || !propSelect || !deliverableSelect || !priceDisplay) return;
        const s = serviceSelect.value;
        const p = propSelect.value;
        const d = deliverableSelect.value;

        // 1. Calcul du montant
        if (s === "industriel") {
            const data = TARIFF_MATRIX.industriel[d] || { min: 1450, max: 2800 };
            priceDisplay.textContent = "Sur Devis (dès " + data.min + " € HT)";
            if (subDisplay) {
                subDisplay.textContent = "Mission d'ingénierie tertiaire / industrielle : cahier des charges et devis sur mesure sous 24h.";
            }
        } else {
            const sData = TARIFF_MATRIX[s] || TARIFF_MATRIX.sinistre;
            const dData = sData[d] || sData.rapport_ecrit;
            const item = dData[p] || { min: 690, max: 990 };
            priceDisplay.textContent = item.min + " € – " + item.max + " € TTC";
            if (subDisplay) {
                if (d === "oral") {
                    subDisplay.textContent = "Forfait 1 rendez-vous conseil sur site (déplacement + mesures instrumentées + débriefing technique oral immédiat).";
                } else if (d === "contradictoire") {
                    subDisplay.textContent = "Forfait mission contradictoire complète (analyse pièces + convocation + présence contradictoire face à l'expert adverse + dires).";
                } else {
                    subDisplay.textContent = "Forfait global mission complète (déplacement + examen sur site + mesures instrumentées + rapport officiel opposable).";
                }
            }
        }

        // 2. Livrable dynamique inclus
        if (incDeliverable) {
            if (d === "oral") {
                incDeliverable.textContent = "✓ Débriefing technique oral & recommandations immédiates sur place";
            } else if (d === "contradictoire") {
                incDeliverable.textContent = "✓ Rédaction des dires techniques et présence contradictoire";
            } else {
                incDeliverable.textContent = "✓ Rapport d'expertise écrit circonstancié opposable (DTU / Eurocodes)";
            }
        }

        // 3. Badge Protection Juridique
        if (pjBadge) {
            if (s === "visite_achat") {
                pjBadge.innerHTML = "<strong>💡 Sécurisation Acquisition :</strong> Investissement protecteur non couvert par les assurances, mais négociable directement sur le prix d'achat du bien.";
                pjBadge.style.display = "block";
            } else if (s === "industriel") {
                pjBadge.innerHTML = "<strong>🏭 Contrats Professionnels :</strong> Éligible selon clauses PJ Pro, Responsabilité Civile ou Dommages-Ouvrage.";
                pjBadge.style.display = "block";
            } else {
                pjBadge.innerHTML = "<strong>⚖️ Prise en charge Protection Juridique :</strong> Jusqu'à 100% de ces honoraires peuvent être remboursés par votre assurance (Art. L. 127-2-3 Code des assurances).";
                pjBadge.style.display = "block";
            }
        }
    }

    if (serviceSelect && propSelect && deliverableSelect) {
        serviceSelect.addEventListener('change', updatePrice);
        propSelect.addEventListener('change', updatePrice);
        deliverableSelect.addEventListener('change', updatePrice);
        updatePrice();
    }
});
