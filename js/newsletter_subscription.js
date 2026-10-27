// Script de gestion d'inscription à la veille réglementaire Bâtiment & Énergie
function handleNewsletterSubscription(emailInputId) {
    const input = document.getElementById(emailInputId);
    if (!input || !input.value.includes('@')) {
        alert('Veuillez saisir une adresse e-mail valide.');
        return;
    }
    alert('Merci ! Votre inscription à la veille réglementaire d EFFICIENS ENERGIA est enregistrée.');
    input.value = '';
}
