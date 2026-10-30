
    // --- MOTEUR AGENT IA RDV HUB EFFICIENS ENERGIA (INGESTION & QUALIFICATION) ---
    class RDVAIAssistant {
        constructor() {
            this.urgencyKeywords = [
                'urgent', 'urgence', 'immédiat', 'rapidement', 'au plus vite', 'inondation',
                'eau', 'fuite', 'fissure', 'effondrement', 'décennale', 'litige', 'sinistre'
            ];
            this.categories = {
                sinistre: ['sinistre', 'infiltrations', 'fuite', 'dégât', 'fissure', 'malfaçon', 'décennale'],
                achat: ['achat', 'visite', 'compromis', 'offre', 'vétusté', 'immobilier'],
                dpe: ['dpe', 'audit', 'diagnostic', 'amiante', 'plomb', 'gaz', 'électricité'],
                energie: ['panneau', 'photovoltaïque', 'solaire', 'pompe à chaleur', 'pac', 'onduleur'],
                juridique: ['protection juridique', 'assureur', 'avocat', 'tribunal', 'expertise contradictoire']
            };
        }

        analyzeInquiry(text) {
            const lower = (text || '').toLowerCase();
            let score = 50;
            let urgency = 'normale';
            const detectedTags = [];

            if (this.urgencyKeywords.some(kw => lower.includes(kw))) {
                urgency = 'haute';
                score += 25;
                detectedTags.push('⚡ Urgence signalée');
            }

            let categoryFound = 'Sinistres & Construction';
            for (const [cat, words] of Object.entries(this.categories)) {
                if (words.some(w => lower.includes(w))) {
                    categoryFound = cat.toUpperCase();
                    detectedTags.push(`🏷️ Domaine : ${cat}`);
                    break;
                }
            }

            return {
                leadScore: Math.min(99, score),
                urgency,
                category: categoryFound,
                detectedTags,
                recommendedSlot: this.calculateOptimalSlot(urgency)
            };
        }

        calculateOptimalSlot(urgency) {
            const now = new Date();
            const daysToAdd = urgency === 'haute' ? 1 : 2;
            const target = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
            if (target.getDay() === 0) target.setDate(target.getDate() + 1);
            if (target.getDay() === 6) target.setDate(target.getDate() + 2);

            const pad = n => String(n).padStart(2, '0');
            const dateStr = `${pad(target.getDate())}/${pad(target.getMonth() + 1)}/${target.getFullYear()}`;
            const timeStr = urgency === 'haute' ? '09:30' : '14:00';
            return { date: dateStr, time: timeStr };
        }
    }

    const rdvAgent = new RDVAIAssistant();

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
        const aiAnalysis = rdvAgent.analyzeInquiry(rawMessage);
        formData.append('rdv_hub_channel', 'web');
        formData.append('rdv_hub_urgency', aiAnalysis.urgency);
        formData.append('rdv_hub_lead_score', String(aiAnalysis.leadScore));
        formData.append('rdv_hub_suggested_slot', `${aiAnalysis.recommendedSlot.date} à ${aiAnalysis.recommendedSlot.time}`);

        new FormData(contactForm).forEach((value, key) => {
            formData.append(key, String(value));
        });

        if (submitButton instanceof HTMLButtonElement) {
            submitButton.disabled = true;
        }
        if (status) {
            status.textContent = 'Envoi de votre demande…';
        }

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString()
            });
            if (!response.ok) {
                throw new Error(`Netlify Forms rejected the request with status ${response.status}`);
            }

                        contactForm.reset();
            const successState = document.getElementById('form-success-state');
            if (successState) {
                contactForm.style.display = 'none';
                successState.style.display = 'block';
                successState.scrollIntoView({ behavior: 'smooth' });
            } else if (status) {
                const priorityBadge = aiAnalysis.urgency === 'haute' ? '⚡ Priorité Haute' : '✅ Enregistré';
                status.innerHTML = `<strong>${priorityBadge} · Pris en charge par l'Agent IA RDV Hub</strong><br>Votre demande a été qualifiée avec succès (créneau suggéré : ${aiAnalysis.recommendedSlot.date} à ${aiAnalysis.recommendedSlot.time}). Notre expert vous confirme l'intervention sous 24h.`;
                status.style.color = '#38bdf8';
            }
        } catch (error) {
            console.error('Impossible de transmettre le formulaire de contact.', error);
            if (status) {
                status.textContent = 'Le formulaire n’a pas pu être envoyé. Réessayez ou contactez-nous directement par e-mail à contact@efficiens-energia.fr.';
            }
        } finally {
            if (submitButton instanceof HTMLButtonElement) {
                submitButton.disabled = false;
            }
        }
    });

    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((registration) => registration.update())
                .catch((error) => console.warn('Service worker indisponible:', error));
        });
    }


    // --- GESTION DU FILTRE D'INTENTION 1-CLIC & DU GUIDE D'ORIENTATION (@UIX) ---
    initExpertiseFilter();
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

    const zoneSelect = document.getElementById('calcZoneSelect');
    const btnTogglePjLetter = document.getElementById('btnTogglePjLetter');
    const pjLetterBox = document.getElementById('pjLetterBox');
    const pjLetterTextarea = document.getElementById('pjLetterTextarea');
    const btnCopyPjLetter = document.getElementById('btnCopyPjLetter');
    const pjCopyConfirm = document.getElementById('pjCopyConfirm');
    const btnApplyCalcToRdv = document.getElementById('btnApplyCalcToRdv');

    function buildPjOfficialLetter() {
        const sLabel = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : 'Expertise bâtiment';
        const pLabel = propSelect ? propSelect.options[propSelect.selectedIndex].text : 'Bien immobilier';
        const priceText = priceDisplay ? priceDisplay.textContent : '790 € – 1 090 € TTC';
        const todayStr = new Date().toLocaleDateString('fr-FR');
        return [
            "OBJET : Déclaration de sinistre et exercice du droit au libre choix de l'expert (Art. L. 127-2-3 du Code des assurances)",
            "Date : " + todayStr,
            "",
            "Madame, Monsieur,",
            "",
            "Dans le cadre de mon contrat d'assurance Protection Juridique / Multirisque Habitation, je vous informe par la présente faire appel à un expert bâtiment et énergie indépendant pour assurer la défense technique de mes intérêts concernant :",
            "- Nature de la mission : " + sLabel,
            "- Bien concerné : " + pLabel,
            "- Cabinet d'expertise désigné : EFFICIENS ENERGIA (M. Sébastien MATHE, SIRET 827 694 498 00011, 480 Route du Belvédère, 01250 Hautecourt-Romanèche).",
            "- Estimation d'honoraires forfaitaires : " + priceText,
            "",
            "Conformément aux dispositions d'ordre public de l'Article L. 127-2-3 du Code des assurances (liberté du choix de l'expert et du conseil par l'assuré), je vous prie de bien vouloir enregistrer la constitution de M. Sébastien MATHE et de me confirmer le plafond de prise en charge applicable aux frais et honoraires d'expertise.",
            "",
            "Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées."
        ].join("\n");
    }

    const origUpdatePrice = updatePrice;
    function enhancedUpdatePrice() {
        origUpdatePrice();
        if (zoneSelect && priceDisplay && serviceSelect && serviceSelect.value !== 'industriel') {
            const z = zoneSelect.value;
            const s = serviceSelect.value;
            const p = propSelect.value;
            const d = deliverableSelect.value;
            const sData = TARIFF_MATRIX[s] || TARIFF_MATRIX.sinistre;
            const dData = sData[d] || sData.rapport_ecrit;
            const item = dData[p] || { min: 690, max: 990 };
            let surcharge = 0;
            if (z === 'zone_38_73_74') surcharge = 60;
            else if (z === 'zone_suisse') surcharge = 140;
            const minFinal = item.min + surcharge;
            const maxFinal = item.max + surcharge;
            priceDisplay.textContent = minFinal + " € – " + maxFinal + " € TTC";
        }
        if (pjLetterTextarea) {
            pjLetterTextarea.value = buildPjOfficialLetter();
        }
    }

    if (serviceSelect && propSelect && deliverableSelect) {
        serviceSelect.addEventListener('change', enhancedUpdatePrice);
        propSelect.addEventListener('change', enhancedUpdatePrice);
        deliverableSelect.addEventListener('change', enhancedUpdatePrice);
        if (zoneSelect) zoneSelect.addEventListener('change', enhancedUpdatePrice);
        enhancedUpdatePrice();
    }

    if (btnTogglePjLetter && pjLetterBox) {
        btnTogglePjLetter.addEventListener('click', () => {
            const isHidden = pjLetterBox.hasAttribute('hidden');
            if (isHidden) {
                pjLetterBox.removeAttribute('hidden');
                if (pjLetterTextarea) pjLetterTextarea.value = buildPjOfficialLetter();
            } else {
                pjLetterBox.setAttribute('hidden', '');
            }
        });
    }

    if (btnCopyPjLetter && pjLetterTextarea) {
        btnCopyPjLetter.addEventListener('click', () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(pjLetterTextarea.value).catch(() => {});
            }
            if (pjCopyConfirm) {
                pjCopyConfirm.removeAttribute('hidden');
                setTimeout(() => pjCopyConfirm.setAttribute('hidden', ''), 3500);
            }
        });
    }

    if (btnApplyCalcToRdv) {
        btnApplyCalcToRdv.addEventListener('click', () => {
            const contactType = document.getElementById('contactType');
            const contactLocation = document.getElementById('contactLocation');
            const contactMessage = document.getElementById('contactMessage');
            const sVal = serviceSelect ? serviceSelect.value : 'sinistre';
            const sText = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : '';
            const pText = propSelect ? propSelect.options[propSelect.selectedIndex].text : '';
            const dText = deliverableSelect ? deliverableSelect.options[deliverableSelect.selectedIndex].text : '';
            const zText = zoneSelect ? zoneSelect.options[zoneSelect.selectedIndex].text : '';
            const priceText = priceDisplay ? priceDisplay.textContent : '';

                        const contactDossierType = document.getElementById('contactDossierType');
            if (contactDossierType) {
                const sVal = serviceSelect ? serviceSelect.value : '';
                const dVal = deliverableSelect ? deliverableSelect.value : '';
                if (dVal === 'contradictoire') {
                    contactDossierType.value = "Convocation à une réunion d'expertise contradictoire (date imminente)";
                } else if (sVal === 'industriel') {
                    contactDossierType.value = "Autre mission technique / audit industriel";
                } else if (sVal === 'dpe_energie') {
                    contactDossierType.value = "Litige malfaçons / travaux / DPE contesté";
                } else {
                    contactDossierType.value = "Sinistre récent (dégât des eaux, incendie, fissuration, sécheresse)";
                }
            }

            if (contactType) {
                const mapType = {
                    sinistre: 'Sinistre ou dommage de construction',
                    visite_achat: 'Visite technique avant achat immobilier',
                    contre_expertise: 'Expertise technique dans le cadre d’une protection juridique',
                    dpe_energie: 'Diagnostic immobilier contesté',
                    industriel: 'Expertise industrielle'
                };
                contactType.value = mapType[sVal] || 'Sinistre ou dommage de construction';
            }
            if (contactLocation && !contactLocation.value) {
                contactLocation.value = zText.split('—')[0].trim();
            }
            if (contactMessage) {
                contactMessage.value = `[SIMULATION D'HONORAIRES VALIDÉE : ${priceText}]\n- Mission : ${sText}\n- Typologie : ${pText}\n- Livrable : ${dText}\n- Secteur : ${zText}\nBonjour M. MATHE, je souhaite confirmer un devis ferme et réserver un créneau pour cette mission.`;
            }
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ==========================================================================
    
    // ==========================================================================
    // MOTEUR DE NAVIGATION PAR ONGLETS EXCLUSIFS INDÉPENDANTS (@UIX & @DEV)
    // ==========================================================================
    const tabPanels = document.querySelectorAll('.site-tab-panel');
    const prepVisiteSub = document.getElementById('preparer-visite');
    const mainNavLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    const validTabs = ['expertises', 'methode', 'tarifs', 'zones', 'faq', 'contact', 'cabinet'];

    window.activateTab = activateTab;
    function activateTab(targetId, doScroll) {
        if (typeof doScroll === 'undefined') doScroll = true;
        if (!targetId) targetId = 'expertises';
        targetId = targetId.replace('#', '');
        if (targetId === 'zones-intervention') targetId = 'zones';
        let isGuidesTarget = false;
        if (targetId === 'guides') { targetId = 'faq'; isGuidesTarget = true; }
        if (targetId === 'accueil' || targetId === 'contenu' || targetId === 'simulateur') {
            targetId = 'expertises';
        }

        // Si ce n'est pas un des 6 onglets connus, ne rien faire
        if (!validTabs.includes(targetId)) return;

        // 0. Hero & Intro Cabinet masqués sur tous les onglets
        const heroSection = document.getElementById('accueil');
        if (heroSection) heroSection.style.display = 'none';

        // 1. Basculer l'affichage des panneaux
        tabPanels.forEach(panel => {
            if (panel.id === targetId) {
                panel.classList.add('active-tab');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active-tab');
                panel.style.display = 'none';
            }
        });

        // 2. Gestion du sous-panneau préparation visite (lié à la méthode)
        if (prepVisiteSub) {
            if (targetId === 'methode') {
                prepVisiteSub.classList.add('active-subpanel');
                prepVisiteSub.style.display = 'block';
            } else {
                prepVisiteSub.classList.remove('active-subpanel');
                prepVisiteSub.style.display = 'none';
            }
        }

        if (isGuidesTarget) {
            const gEl = document.getElementById('guides');
            if (gEl) gEl.scrollIntoView({ behavior: 'smooth' });
        }

        // 3. Mise à jour de l'onglet actif dans la barre de navigation
        mainNavLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            const isMatch = (href === targetId) || (targetId === 'zones' && href === 'zones-intervention');
            link.classList.toggle('nav-highlight', isMatch);
            link.classList.toggle('active', isMatch);
            link.setAttribute('aria-selected', String(isMatch));
        });

        // 4. Défilement propre vers l'onglet sélectionné
        if (doScroll) {
            const activePanel = document.getElementById(targetId);
            if (activePanel) {
                const header = document.querySelector('.site-header');
                const headerH = header ? header.offsetHeight : 70;
                const panelTop = activePanel.getBoundingClientRect().top + window.pageYOffset - headerH - 10;
                window.scrollTo({ top: Math.max(0, panelTop), behavior: 'smooth' });
            }
        }
    }

    // Intercepter les clics sur la navigation principale
    mainNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').replace('#', '');
            if (validTabs.includes(targetId) || targetId === 'zones-intervention') {
                e.preventDefault();
                activateTab(targetId, true);
                if (history.pushState) {
                    history.pushState(null, '', '#' + (targetId === 'zones-intervention' ? 'zones' : targetId));
                }
            }
        });
    });

    
    // Redirection garantie au clic sur les badges de prise en charge vers l'onglet tarifs (@PO Seb)
    document.addEventListener('click', function(e) {
        const badge = e.target.closest('.badge-prise-en-charge');
        if (badge) {
            e.preventDefault();
            activateTab('tarifs', true);
            if (history.pushState) {
                history.pushState(null, '', '#tarifs');
            }
            setTimeout(function() {
                const targetEl = document.querySelector('.insurance-reimbursement-box') || document.getElementById('tarifs');
                if (targetEl) {
                    const headerH = document.querySelector('.site-header') ? document.querySelector('.site-header').offsetHeight : 76;
                    const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerH - 20;
                    window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
                }
            }, 100);
        }
    });

    // Intercepter les liens d'action internes (ex: "Prendre contact", "Toutes nos expertises")
    document.addEventListener('click', (e) => {
        const targetA = e.target.closest('a[href^="#"]');
        if (!targetA) return;
        const href = targetA.getAttribute('href');
        if (!href) return;
        const targetId = href.replace('#', '');
        if (validTabs.includes(targetId) || targetId === 'zones-intervention') {
            e.preventDefault();
            activateTab(targetId, true);
            if (history.pushState) {
                history.pushState(null, '', '#' + (targetId === 'zones-intervention' ? 'zones' : targetId));
            }
        }
    });

    // Écouter le hash de l'URL au chargement et au changement
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) activateTab(hash, true);
    });

    // Activation initiale au chargement selon le hash
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && validTabs.includes(initialHash)) {
        activateTab(initialHash, false);
    } else {
        activateTab('expertises', false);
    }

            // ==========================================================================
    // GÉNÉRATEUR DE COURRIER PAR PROFIL MANDANT (OFFICIEL SEB)
    // ==========================================================================
    const letters = {
        particulier: {
            badge: "Modèle Particulier · MRH / Protection Juridique",
            text: `OBJET : Déclaration de litige et désignation de mon expert d'assuré indépendant
Réf. Contrat / Dossier Sinistre N° : [À compléter]

Madame, Monsieur,

Par la présente, je vous informe faire appel à un expert bâtiment indépendant pour assurer la défense technique et contradictoire de mes intérêts concernant les désordres suivants :
- Nature du litige / désordre : [Fissures, dégât des eaux, malfaçon artisan, etc.]
- Bien concerné : [Adresse du bien sinistré]
- Expert désigné : Cabinet EFFICIENS ENERGIA (M. Sébastien MATHE, SIRET : 827 694 498 00011).
- Estimation prévisionnelle des honoraires : [Montant du devis] € TTC.

Conformément à l'article L. 127-3 du Code des assurances garantissant le libre choix de l'expert d'assuré, et aux stipulations de mon contrat relatives à la prise en charge des honoraires d'expert, je vous remercie de bien vouloir :
1. Enregistrer la constitution de M. Sébastien MATHE à mon dossier et lui transmettre toute convocation aux opérations contradictoires.
2. Me confirmer le montant et plafond de prise en charge applicable à cette mission.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
[Nom, Prénom et Signature]`
        },
        entreprise: {
            badge: "Modèle Entreprise · Multirisque Industrielle / PE",
            text: `OBJET : Sinistre professionnel / Dommages aux biens – Constitution d'expert d'assuré
Police Entreprise N° : [N° de contrat MRI/PE] / Réf. Sinistre : [À compléter]

Madame, Monsieur le Gestionnaire Grands Comptes / Risques Entreprises,

Nous vous notifions par la présente la survenance d'un sinistre impactant notre outil d'exploitation :
- Nature du sinistre : [Incendie, bris de machine, sinistre structurel, etc.]
- Site d'exploitation concerné : [Adresse de l'usine / de l'entrepôt]
- Impact d'exploitation : [Arrêt partiel ou total, mesures conservatoires en cours]

En application des stipulations de notre police relatives à l'assistance technique et à la garantie « Honoraires d'expert », notre société mandate le Cabinet EFFICIENS ENERGIA (M. Sébastien MATHE) pour nous assister lors des opérations d'expertise contradictoire, du chiffrage des dommages matériels et de la justification des pertes d'exploitation.

Nous vous prions de :
- Adresser l'ensemble des correspondances techniques et convocations directement à notre expert (contact@efficiens-energia.fr).
- Nous confirmer l'ouverture du dossier de prise en charge des honoraires selon le barème contractuel prévu au contrat.

Veuillez agréer, Madame, Monsieur, nos salutations distinguées.
[Raison Sociale, Nom du Dirigeant / DAF, Cachet]`
        },
        collectivite: {
            badge: "Modèle Collectivité · Dommages aux Biens / Marché Public",
            text: `OBJET : Sinistre / Pathologie sur ouvrage public – Désignation d'assistance technique
Contrat Dommages aux Biens de la Collectivité N° : [N° de police]

Madame, Monsieur le Gestionnaire,

La collectivité vous informe de la survenance de désordres constructifs affectant le patrimoine public suivant :
- Ouvrage concerné : [Nom de l'équipement, groupe scolaire, bâtiment administratif]
- Nature des désordres : [Infiltration, fissuration structurelle, non-conformité EnR, etc.]

Afin de préserver les intérêts techniques et financiers de la collectivité et de garantir le caractère contradictoire des opérations d'évaluation, nous vous informons que la collectivité a missionné, au titre des prestations d'assistance à maîtrise d'ouvrage technique :
- Cabinet EFFICIENS ENERGIA (M. Sébastien MATHE, SIRET : 827 694 498 00011).

Nous vous demandons d'associer systématiquement notre conseil technique à l'ensemble des réunions d'expertise sur site et de nous confirmer les modalités d'indemnisation des frais d'expertise engagés conformément aux termes de notre marché d'assurance.

Je vous prie d'agréer, Madame, Monsieur, l'expression de ma considération distinguée.
[Pour la Collectivité, Nom et Qualité de l'élu ou du DGS]`
        }
    };

    const selectEl = document.getElementById("mandant-type");
    const badgeEl = document.getElementById("letter-profile-badge");
    const textareaEl = document.getElementById("letter-content");
    const copyBtn = document.getElementById("btn-copy");
    const copyText = document.getElementById("btn-copy-text");

    function updateLetter(type) {
        if (letters[type] && badgeEl && textareaEl) {
            badgeEl.textContent = letters[type].badge;
            textareaEl.value = letters[type].text;
        }
    }

    if (selectEl && badgeEl && textareaEl) {
        // Initialisation à l'affichage
        updateLetter(selectEl.value || 'particulier');

        // Changement dynamique au sélecteur
        selectEl.addEventListener("change", (e) => {
            updateLetter(e.target.value);
        });
    }

    if (copyBtn && textareaEl && copyText) {
        // Copie en un clic dans le presse-papier
        copyBtn.addEventListener("click", () => {
            textareaEl.select();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textareaEl.value).then(() => {
                    copyText.textContent = "Copié !";
                    setTimeout(() => {
                        copyText.textContent = "Copier le texte";
                    }, 2000);
                }).catch(() => {
                    document.execCommand('copy');
                    copyText.textContent = "Copié !";
                    setTimeout(() => {
                        copyText.textContent = "Copier le texte";
                    }, 2000);
                });
            } else {
                document.execCommand('copy');
                copyText.textContent = "Copié !";
                setTimeout(() => {
                    copyText.textContent = "Copier le texte";
                }, 2000);
            }
        });
    }


        // ==========================================================================
    // SIMULATEUR D'ORIENTATION EN 30 SECONDES CÂBLÉ VERS LE CONTACT (@PO SEB)
    // ==========================================================================
    const simNature = document.getElementById('sim-nature');
    const simStade = document.getElementById('sim-stade');
    const simStatut = document.getElementById('sim-statut');
    const resTitre = document.getElementById('res-titre');
    const resDesc = document.getElementById('res-desc');
    const resPec = document.getElementById('res-pec');
    const simCtaBtn = document.getElementById('sim-cta-btn');

    const SIM_DIAGNOSTICS = {
        stades: {
            amont: {
                titre: "Évaluation technique & Cadrage préalable",
                desc: "Votre situation gagne à être qualifiée techniquement dès l'amont pour constituer un dossier irréfutable avant toute convocation ou proposition indemnitaire de l'assureur."
            },
            convoque: {
                titre: "Assistance contradictoire d'urgence",
                desc: "Convocation imminente : la présence d'un expert d'assuré indépendant à vos côtés est déterminante pour contredire l'expert de compagnie sur site et inscrire vos réserves au PV."
            },
            refus: {
                titre: "Contre-expertise contradictoire & Recours",
                desc: "Le refus de garantie ou le chiffrage insuffisant n'est pas définitif : notre contre-expertise technique chiffre vos préjudices réels selon les règles de l'art et les DTU en vigueur."
            },
            bloque: {
                titre: "Audit technique & Résolution de litige",
                desc: "Litige bloqué avec constructeur ou artisan : nous établissons un constat d'expert indépendant opposable pour engager les garanties légales (parfait achèvement, biennale, décennale)."
            }
        },
        prisesEnCharge: {
            particulier: "Garantie « Honoraires d'expert » MRH ou Protection Juridique (Art. L. 127-3)",
            pro: "Police Multirisque Industrielle (MRI / Pertes d'exploitation) ou RC Pro adverse",
            collectivite: "Contrat Dommages aux Biens de la Collectivité / Assurance Construction"
        }
    };

    function selectOptionByKeyword(selectEl, keywords) {
        if (!selectEl) return false;
        const kwList = Array.isArray(keywords) ? keywords : [keywords];
        for (let i = 0; i < selectEl.options.length; i++) {
            const opt = selectEl.options[i];
            const textLower = (opt.value + " " + opt.text).toLowerCase();
            if (kwList.some(kw => textLower.includes(kw.toLowerCase()))) {
                selectEl.selectedIndex = i;
                selectEl.dispatchEvent(new Event('change', { bubbles: true }));
                return true;
            }
        }
        return false;
    }

    function wireSimulatorToContact(doNavigateAndFocus = false) {
        if (!simNature || !simStade || !simStatut) return;

        const natureVal = simNature.value;
        const stadeVal = simStade.value;
        const statutVal = simStatut.value;

        const natureText = simNature.selectedIndex >= 0 ? simNature.options[simNature.selectedIndex].text : '';
        const stadeText = simStade.selectedIndex >= 0 ? simStade.options[simStade.selectedIndex].text : '';
        const statutText = simStatut.selectedIndex >= 0 ? simStatut.options[simStatut.selectedIndex].text : '';

        // 1. Câblage du type de dossier (#contactDossierType)
        const contactDossierSelect = document.getElementById('contactDossierType');
        if (contactDossierSelect) {
            const stadeKeywords = {
                amont: ['sinistre récent', 'dégât des eaux'],
                convoque: ['convocation', 'contradictoire'],
                refus: ['refus', 'contestation'],
                bloque: ['malfaçons', 'litige']
            };
            selectOptionByKeyword(contactDossierSelect, stadeKeywords[stadeVal] || ['sinistre récent']);
        }

        // 2. Câblage du domaine d'expertise (#contactType)
        const contactTypeSelect = document.getElementById('contactType');
        if (contactTypeSelect) {
            const natureKeywords = {
                fissures: ['sinistre ou dommage'],
                dde: ['sinistre ou dommage'],
                enr: ['énergies renouvelables'],
                dpe: ['diagnostic immobilier', 'performance énergétique'],
                malfacon: statutVal === 'pro' ? ['expertise industrielle', 'sinistre ou dommage'] : ['sinistre ou dommage'],
                incendie: ['incendie']
            };
            selectOptionByKeyword(contactTypeSelect, natureKeywords[natureVal] || ['sinistre ou dommage']);
        }

        // 3. Pré-remplissage du message avec le diagnostic structuré
        const contactMsg = document.getElementById('contactMessage');
        if (contactMsg) {
            const currentVal = contactMsg.value.trim();
            if (!currentVal || currentVal.startsWith('[Orientation Simulateur')) {
                contactMsg.value = `[Orientation Simulateur - 30s]
• Profil : ${statutText}
• Désordre / Litige : ${natureText}
• Stade du dossier : ${stadeText}

Précisions complémentaires (faits observés, date d'intervention ou convocation) : `;
            }
        }

        // 4. Navigation vers le formulaire de contact si demandé (clic CTA)
        if (doNavigateAndFocus) {
            if (typeof activateTab === 'function') {
                activateTab('contact');
            }
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.scrollIntoView({ behavior: 'smooth' });
                const nameInput = document.getElementById('contactName');
                if (nameInput) {
                    setTimeout(() => nameInput.focus(), 400);
                }
            }
        }
    }

    function updateSimulatorResult() {
        if (!simNature || !simStade || !simStatut || !resTitre || !resDesc || !resPec) return;
        const stade = simStade.value || 'convoque';
        const statut = simStatut.value || 'particulier';

        const stadeData = SIM_DIAGNOSTICS.stades[stade] || SIM_DIAGNOSTICS.stades.convoque;
        const pecData = SIM_DIAGNOSTICS.prisesEnCharge[statut] || SIM_DIAGNOSTICS.prisesEnCharge.particulier;

        resTitre.textContent = stadeData.titre;
        resDesc.textContent = stadeData.desc;
        resPec.textContent = pecData;

        // Met à jour la pré-qualification du formulaire en arrière-plan
        wireSimulatorToContact(false);
    }

    if (simNature && simStade && simStatut) {
        simNature.addEventListener('change', updateSimulatorResult);
        simStade.addEventListener('change', updateSimulatorResult);
        simStatut.addEventListener('change', updateSimulatorResult);
        updateSimulatorResult();
    }

    if (simCtaBtn) {
        simCtaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            wireSimulatorToContact(true);
        });
    }

});
