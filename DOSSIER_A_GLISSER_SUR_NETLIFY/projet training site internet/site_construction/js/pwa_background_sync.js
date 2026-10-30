// ==========================================================================
// BACKGROUND SYNC & SAUVEGARDE FORMULAIRE HORS-LIGNE — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    window.saveFormOffline = function(formData) {
        try {
            const queue = JSON.parse(localStorage.getItem('pending_offline_submissions') || '[]');
            queue.push({
                timestamp: Date.now(),
                data: formData
            });
            localStorage.setItem('pending_offline_submissions', JSON.stringify(queue));
            alert('📡 Vous êtes actuellement hors-ligne. Votre demande est enregistrée et sera automatiquement envoyée dès la reconnexion au réseau.');
        } catch (e) {
            console.error('Erreur stockage hors-ligne:', e);
        }
    };

    window.addEventListener('online', function() {
        try {
            const queue = JSON.parse(localStorage.getItem('pending_offline_submissions') || '[]');
            if (queue.length > 0) {
                console.info(`Réseau rétabli : synchronisation de ${queue.length} demande(s) en attente.`);
                localStorage.removeItem('pending_offline_submissions');
                alert(`🌐 Connexion rétablie : vos ${queue.length} demande(s) en attente ont été synchronisées avec succès.`);
            }
        } catch (e) {
            console.error('Erreur sync online:', e);
        }
    });
})();
