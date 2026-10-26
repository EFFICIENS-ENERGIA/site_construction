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
                status.textContent = 'Votre demande a bien été transmise. Nous vous recontacterons sous 24 heures ouvrées.';
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
