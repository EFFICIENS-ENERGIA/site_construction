// Module de synchronisation hors-ligne (PWA Background Sync)
async function registerFormBackgroundSync(formData) {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        const reg = await navigator.serviceWorker.ready;
        localStorage.setItem('offline_form_data', JSON.stringify(formData));
        await reg.sync.register('sync-form-data');
        alert('Votre demande est enregistrée hors-ligne et sera envoyée automatiquement dès le retour du réseau.');
    } else {
        alert('Mode hors-ligne non supporté sur ce navigateur.');
    }
}
