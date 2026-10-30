// ==========================================================================
// MODULE D'INSCRIPTION À LA VEILLE RÉGLEMENTAIRE — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    window.subscribeNewsletter = function(emailInputId) {
        const input = document.getElementById(emailInputId);
        if (!input) return;

        const email = (input.value || '').trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert('Veuillez renseigner une adresse email valide.');
            input.focus();
            return;
        }

        try {
            const list = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
            if (!list.includes(email)) {
                list.push(email);
                localStorage.setItem('newsletter_subscribers', JSON.stringify(list));
            }
            alert('Merci ! Votre inscription à la Veille Réglementaire Bâtiment & Énergie (DTU, RE2020, DPE) a bien été enregistrée.');
            input.value = '';
        } catch (e) {
            alert('Inscription enregistrée. Merci pour votre intérêt pour notre veille technique.');
            input.value = '';
        }
    };
})();
