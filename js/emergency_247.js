// Gestionnaire de qualification des urgences 24/7
function checkEmergencyMode() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Dimanche, 6 = Samedi
    const isOffHours = (day === 0 || day === 6 || hour < 8 || hour >= 18);

    if (isOffHours) {
        const emergencyBanner = document.getElementById('emergency-banner');
        if (emergencyBanner) {
            emergencyBanner.style.display = 'block';
            emergencyBanner.innerHTML = '🚨 <strong>Service d urgence 24/7</strong> : Pour les sinistres graves (incendie, effondrement), votre demande sera traitée en priorité dès 8h30.';
        }
    }
}
document.addEventListener('DOMContentLoaded', checkEmergencyMode);
