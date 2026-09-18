# 🏗️ Spécification Technique Formelle — BÂTI-EXCELLENCE Pro

**Projet** : Plateforme Web & Vitrine Applicative pour Entreprise de BTP & Rénovation  
**Auteurs** : @CE (Lead Orchestrator) & @coach (Lead Tech Trainer)  
**Destinataire** : **Seb** (Product Owner)  
**Version** : 1.0.0 — Production-Ready

---

## 1. Architecture des Données & Schémas JSON

### 1.1 Contrat de Données du Simulateur de Devis (QuoteRequest & QuoteResult)
`	ypescript
interface QuoteRequest {
    projectType: 'new_build' | 'renovation' | 'extension' | 'thermal_eco';
    surfaceM2: number; // 20 <= surfaceM2 <= 1000
    finishLevel: 'standard' | 'signature' | 'prestige';
    ecoStandards: 'rt2012' | 're2020' | 'passive';
    postalCode: string; // 5 chiffres français valides
    contact?: {
        fullName: string;
        email: string;
        phone: string;
    };
}

interface QuoteResult {
    totalHT: number;
    totalTTC: number;
    tvaRate: number; // 0.10 pour rénovation, 0.20 pour neuf
    breakdown: {
        structural: number;    // Gros oeuvre & fondations
        envelope: number;      // Clos & couvert (charpente, toiture, menuiseries)
        finishes: number;      // Second oeuvre (électricité, plomberie, sols, peintures)
        ecoEnergy: number;     // Isolation & CVC (pompe à chaleur, VMC double flux)
    };
    subsidiesEstimated: {
        maPrimeRenov: number;  // Aides écologiques de l'État
        ceeBonus: number;      // Certificats d'économie d'énergie
        netRemaining: number;  // Reste à charge client
    };
    estimatedDurationMonths: number;
    generatedAt: string; // ISO 8601
}
`

### 1.2 Algorithme Déterministe de Calcul BTP (Barème Métier Réel 2026)
* **Base au ^2$ selon la nature des travaux** :
  - 
ew_build : 1 850 € HT / ^2$
  - enovation : 1 200 € HT / ^2$
  - extension : 2 100 € HT / ^2$
  - 	hermal_eco : 650 € HT / ^2$
* **Coefficients de Finition** :
  - standard : $\times 1.00$
  - signature : $\times 1.25$
  - prestige : $\times 1.60$
* **Coefficients Énergétiques & Aides** :
  - t2012 : $\times 1.00$ (Aides : 0 €)
  - e2020 : $\times 1.08$ (Aides estimées : $\min(15000, \text{surface} \times 45 €)$)
  - passive : $\times 1.20$ (Aides estimées : $\min(28000, \text{surface} \times 95 €)$)
* **TVA** : 20% pour 
ew_build et extension ; 10% pour enovation et 5.5% sur la part éco-énergie.

---

## 2. Rôles & Contrats d'Implémentation

### 2.1 @UIX — Design System & Ergonomie
* Palette officielle :
  - Primaire : Ardoise Architecte (--color-primary: #0f172a, --color-primary-light: #1e293b)
  - Accent BTP : Cuivre & Ambre Chantier (--color-accent: #f59e0b, --color-accent-hover: #d97706)
  - Fond clair : Ivoire & Béton doux (#f8fafc / #ffffff)
  - Fond sombre : Graphite & Ardoise profonde (#0b0f19 / #111827)
* Typographie moderne avec hiérarchie claire et échelle modulaire.
* Micro-interactions : Effets de survol sur cartes de réalisations, barres de progression de devis dynamiques, slider Avant/Après sans à-coup.
* Conformité WCAG 2.1 AA/AAA : ratio de contraste minimal de 4.5:1 sur tous les textes, focus visibles pour navigation clavier.

### 2.2 @DEV — Moteur Applicatif & Sécurité
* Moteur de calcul encapsulé dans js/simulator.js (pur, testable unitairement, zéro faille de division par zéro ou de NaN).
* Désinfection systématique des entrées dans js/security.js via escapeHtml().
* Composant Avant/Après tactile et souris dans js/before_after.js.
* Suivi de chantier avec 5 étapes réelles, timeline chronologique et carrousel d'inspection dans js/tracker.js.
* Persistance locale : toute progression dans le devis ou choix de thème est enregistrée dans localStorage.

### 2.3 @OPS — Déploiement & PWA
* Service Worker autonome dans sw.js pour chargement instantané même hors-connexion.
* manifest.webmanifest avec icônes SVG intégrées.
* Lanceur local 1-clic LANCER_SITE_CONSTRUCTION.bat sous Windows pour test immédiat par Seb.
* Fichiers de configuration hébergement gratuit mondial (ercel.json, 
etlify.toml).

### 2.4 @AUD — Assurance Qualité & Sécurité
* Banc d'essai Chromium Headless avec tests fonctionnels automatisés.
* Test de fuzzing hostile anti-injections.
* Validation d'accessibilité ARIA et contrastes.

---

## 3. Matrice de Validation
* 0 erreur console JavaScript.
* 0 faille XSS lors de l'injection de scripts malveillants.
* 100% des formulaires validés côté client avec retours visuels immédiats.
* Export PDF/Impression du devis 100% opérationnel.
