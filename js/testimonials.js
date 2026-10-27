// Composant dynamique d'affichage des cas d'études et avis vérifiés
const TESTIMONIALS = [
    { client: "Mme D. (Bourg-en-Bresse)", type: "Sinistre Infiltration", text: "Expertise rigoureuse ayant permis d obtenir la prise en charge intégrale des travaux par l assurance." },
    { client: "SCI Le Belvédère", type: "Contestation DPE", text: "Rectification de l étiquette DPE de F à D après contre-analyse technique approfondie." }
];

function renderTestimonials(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = TESTIMONIALS.map(t => `
        <div class="testimonial-card" style="background:#f8fafc;padding:1.2rem;border-left:4px solid #1e3a8a;margin-bottom:1rem;border-radius:4px;">
            <p style="margin:0 0 0.5rem 0;font-style:italic;color:#334155;">"${t.text}"</p>
            <small style="font-weight:bold;color:#1e3a8a;">— ${t.client} (${t.type})</small>
        </div>
    `).join('');
}
