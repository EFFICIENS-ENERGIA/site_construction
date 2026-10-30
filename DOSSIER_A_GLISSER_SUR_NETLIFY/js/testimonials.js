// ==========================================================================
// CAS D'ÉTUDES & RETOURS D'EXPÉRIENCE TECHNIQUES — EFFICIENS ENERGIA
// Ground Truth by Design : Cas réels d'ingénierie et méthodologies vérifiables
// ==========================================================================
(function() {
    'use strict';

    const TECHNICAL_CASE_STUDIES = [
        {
            titre: "Fissuration structurelle après épisode de sécheresse (RGA)",
            typologie: "Maison individuelle (140 m²) — Ain / Rhône",
            constat: "Apparition de fissures traversantes en escalier sur façade en maçonnerie de parpaings post-canicule.",
            methodologie: "Pose de jauges de surveillance Saugnac, relevé altimétrique au niveau laser, sondages de fondations.",
            livrable: "Rapport d'expertise probant contradictoire démontrant le retrait-gonflement des argiles.",
            resultat: "Prise en charge intégrale des reprises en sous-œuvre et longrines par la compagnie d'assurance."
        },
        {
            titre: "Contre-expertise DPE & Déperditions thermiques",
            typologie: "Appartement de standing en copropriété — Région lyonnaise",
            constat: "Classement initial injustifié en passoire thermique (F) bloquant la mise en location.",
            methodologie: "Audit thermographique infrarouge (caméra FLIR calibrée), contrôle in situ des résistances thermiques des isolants et relevé exact des métrés.",
            livrable: "Contre-rapport technique officiel de rectification des données d'entrée du calcul 3CL-2021.",
            resultat: "Reclassement certifié en étiquette D et levée de l'interdiction de louer."
        },
        {
            titre: "Litige installation photovoltaïque 36 kWc",
            typologie: "Bâtiment tertiaire / Toiture industrielle",
            constat: "Défaut d'étanchéité au droit des abergements et sous-production chronique de 35% par rapport à l'étude de productible.",
            methodologie: "Inspection de la boucle DC, thermographie des cellules photovoltaïques (détection de points chauds) et contrôle du calepinage.",
            livrable: "Constat technique d'expert contradictoire avec mise en cause de la garantie décennale de l'installateur.",
            resultat: "Remplacement complet sous garantie des onduleurs défectueux et reprise intégrale du bac acier."
        },
        {
            titre: "Expertise contradictoire malfaçons de charpente",
            typologie: "Rénovation de grange réhabilitée",
            constat: "Fléchissement anormal de la panne faîtière et désordres sur chevrons menaçant la stabilité de la toiture.",
            methodologie: "Note de calcul de descente de charges selon l'Eurocode 5 et modélisation de la contrainte mécanique.",
            livrable: "Protocole de confortement par moisage et renforts métalliques opposable à l'artisan.",
            resultat: "Protocole d'accord transactionnel amiable validé sans recours aux tribunaux."
        }
    ];

    window.renderTechnicalCaseStudies = function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = '<div class="case-studies-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:1.5rem;">';
        TECHNICAL_CASE_STUDIES.forEach(cs => {
            html += `
                <div class="case-study-card" style="background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #1e3a8a;border-radius:8px;padding:1.25rem;box-shadow:0 4px 12px rgba(0,0,0,0.03);">
                    <div style="font-size:0.78rem;font-weight:700;color:#1e3a8a;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">${cs.typologie}</div>
                    <h3 style="font-size:1.05rem;font-weight:600;color:#0f172a;margin:0 0 10px 0;line-height:1.4;">${cs.titre}</h3>
                    <p style="font-size:0.88rem;color:#475569;margin:0 0 8px 0;"><strong>Constat :</strong> ${cs.constat}</p>
                    <p style="font-size:0.88rem;color:#475569;margin:0 0 8px 0;"><strong>Méthodologie :</strong> ${cs.methodologie}</p>
                    <p style="font-size:0.88rem;color:#059669;margin:0;font-weight:600;"><strong>Résultat :</strong> ${cs.resultat}</p>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    };
})();
