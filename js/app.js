/**
 * 🚀 Contrôleur Général de l'Application — BÂTI-EXCELLENCE Pro
 * Orchestre les composants interactifs, la navigation, le thème sombre/clair
 * et l'expérience utilisateur globale.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialisation du thème (Sombre / Clair)
    initTheme();

    // 2. Initialisation des modules applicatifs
    if (typeof BatiSimulator !== 'undefined') {
        BatiSimulator.initUI();
    }
    if (typeof BatiBeforeAfter !== 'undefined') {
        BatiBeforeAfter.init();
    }
    if (typeof BatiTracker !== 'undefined') {
        BatiTracker.init();
    }

    // 3. Navigation réactive & Menu mobile
    initNavigation();

    // 4. Formulaire de contact sécurisé
    initContactForm();

    // 5. Enregistrement PWA Service Worker
    initServiceWorker();
});

/**
 * Gestion du Thème Sombre / Clair avec mémorisation
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const root = document.documentElement;

    // Détection préférence système ou stockée
    const currentAttr = root.getAttribute('data-theme');
    const initialTheme = savedTheme || currentAttr || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(currentTheme);
            localStorage.setItem('bati_theme', currentTheme);
        });
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre');
            themeToggleBtn.innerHTML = theme === 'dark' ? '☀️ Mode Clair' : '🌙 Mode Sombre';
        }
    }
}

/**
 * Gestion de la navigation et scroll fluide
 */
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('nav-open');
        });

        // Fermer le menu lors du clic sur un lien
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('nav-open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/**
 * Formulaire de contact sécurisé avec désinfection
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const alertBox = document.getElementById('formAlertBox');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const phoneInput = document.getElementById('contactPhone');
        const projectInput = document.getElementById('contactProject');
        const messageInput = document.getElementById('contactMessage');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const project = projectInput ? projectInput.value : '';
        const message = messageInput ? messageInput.value.trim() : '';

        // Validations
        if (!name || name.length < 2) {
            showAlert('Veuillez renseigner votre nom complet.', 'error');
            return;
        }
        if (typeof BatiSecurity !== 'undefined' && !BatiSecurity.isValidEmail(email)) {
            showAlert('Veuillez renseigner une adresse email valide.', 'error');
            return;
        }

        // Échappement anti-XSS
        const safeName = typeof BatiSecurity !== 'undefined' ? BatiSecurity.escapeHtml(name) : name;
        const safeProject = typeof BatiSecurity !== 'undefined' ? BatiSecurity.escapeHtml(project) : project;

        showAlert('Merci ' + safeName + ' ! Votre demande pour un projet \"' + safeProject + '\" a été transmise à notre bureau d\'études. Vous serez recontacté sous 24h ouvrées.', 'success');

        form.reset();
    });

    function showAlert(msg, type) {
        if (!alertBox) {
            alert(msg);
            return;
        }
        alertBox.className = 'form-alert alert-' + type;
        alertBox.innerHTML = msg;
        alertBox.style.display = 'block';

        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 8000);
    }
}

/**
 * Enregistrement Service Worker PWA
 */
function initServiceWorker() {
 if ('serviceWorker' in navigator) {
 window.addEventListener('load', () => {
 navigator.serviceWorker.register('./sw.js')
 .then(reg => console.log('BÂTI PWA ServiceWorker actif :', reg.scope))
 .catch(err => console.log('Erreur SW :', err));
 });
 }
}
