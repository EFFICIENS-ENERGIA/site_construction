
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
            if (status) {
                const priorityBadge = aiAnalysis.urgency === 'haute' ? '⚡ Priorité Haute' : '✅ Enregistré';
                status.innerHTML = `<strong>${priorityBadge} — Pris en charge par l'Agent IA RDV Hub</strong><br>Votre demande a été qualifiée avec succès (créneau suggéré : ${aiAnalysis.recommendedSlot.date} à ${aiAnalysis.recommendedSlot.time}). Notre expert vous confirme l'intervention sous 24h.`;
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

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((registration) => registration.update())
                .catch((error) => console.error('Impossible de mettre à jour le service worker.', error));
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

    // 4. Simulateur Tarifaire Interactif (Amélioration 9)
    const serviceSelect = document.getElementById('calcServiceSelect');
    const propSelect = document.getElementById('calcPropertySelect');
    const priceDisplay = document.getElementById('calcResultPrice');

    function updatePrice() {
        if (!serviceSelect || !propSelect || !priceDisplay) return;
        const s = serviceSelect.value;
        const p = propSelect.value;
        
        let base = 350;
        if (s === 'sinistre') base = 450;
        else if (s === 'visite_achat') base = 400;
        else if (s === 'dpe_contestation') base = 380;
        else if (s === 'industriel') base = 750;

        if (p === 'maison') base += 50;
        else if (p === 'professionnel') base += 250;

        priceDisplay.textContent = base + ' € TTC';
    }

    if (serviceSelect && propSelect) {
        serviceSelect.addEventListener('change', updatePrice);
        propSelect.addEventListener('change', updatePrice);
        updatePrice();
    }
});
