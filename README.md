# 🌿 EFFICIENS ENERGIA — Expertise Technique Bâtiment & Énergie

> **Site vitrine officiel, catalogue d'expertises & portail de qualification d'expertise indépendante**  
> Dirigeant : **Sébastien Mathe** • 📞 07 78 24 65 67 • ✉️ contact@efficiens-energia.fr  
> Siège : 480 Route du Belvédère, 01250 Hautecourt-Romaneche • SIRET : 827 694 498 00011  
> 🌐 **Production Vercel** : [https://siteconstruction.vercel.app/](https://siteconstruction.vercel.app/)  
> 🌐 **Miroir GitHub Pages** : [https://efficiens-energia.github.io/site_construction/](https://efficiens-energia.github.io/site_construction/)

---

## 🎯 1. Présentation & Positionnement

**EFFICIENS ENERGIA** intervient comme **cabinet d'expertise technique 100 % indépendant**, mandaté directement à l'initiative des particuliers, entreprises et collectivités. Sans aucun lien capitalistique ni mandat d'assureur, l'unique mission est la défense rigoureuse de vos droits et l'éclairage technique impartial de vos dossiers :

1. **Sinistres & dommages à la construction** (infiltrations, fissures, affaissements, malfaçons, garanties biennale et décennale).
2. **Expertise technique & protection juridique** (appui contradictoire, analyse des pièces, assistance selon Art. L. 127-2-3 du Code des Assurances).
3. **Visite technique avant achat immobilier** (examen visuel de l'état apparent, des désordres visibles et estimation des travaux à anticiper).
4. **Diagnostics immobiliers contestés** (contre-analyse technique de rapports DPE, amiante, plomb ou électricité mis en cause).
5. **Énergies renouvelables & systèmes thermiques** (installations photovoltaïques, pompes à chaleur, conformité et dysfonctionnements).
6. **Performance énergétique des bâtiments** (enveloppe thermique, ponts thermiques, ventilation et stratégie de rénovation).
7. **Incendie & dommages associés** (constatations après sinistre, atteintes aux matériaux et équipements).
8. **Expertise industrielle** (locaux d'activité, défaillances d'outils de production et bâtiments professionnels).

---

## 🚀 2. Architecture & 20 Améliorations Déployées (v3)

Le site repose sur une architecture statique moderne, ultra-rapide (**< 300 ms**) et sobre (*Zero-Dependency Bloat*) intégrant **20 fonctionnalités avancées sans aucun doublon** :

### 📄 Fiches PDF Individuelles & Documents
* **8 Fiches PDF d'expertise dédiées** (`assets/pdf/Fiche_Expertise_*.pdf`) générées au format haute fidélité avec module de téléchargement direct (`js/pdf_download.js`).
* **Catalogue général complet** (`Dossier_Prestations_EFFICIENS_ENERGIA.pdf`).

### 🔍 Référencement SEO & Réseaux Sociaux
* **Fichiers d'indexation** : `sitemap.xml` et `robots.txt` à jour.
* **Données structurées Schema.org** : `assets/schema_org.json` (`ProfessionalService`).
* **Cartes réseaux sociaux** : balises Open Graph et Twitter Cards (`assets/og_meta_tags.html`).
* **Page 404 chartée** : `404.html` intégrée avec navigation de secours.

### 🤖 Prise en Charge & Qualification Client
* **Intégration Copilote IA RDV Hub** : qualification en temps réel des demandes d'intervention (détection d'urgence, pré-analyse des désordres, calcul de créneau sans collision).
* **Export d'agenda ICS** : génération de rendez-vous pour Apple iCal et Google Calendar (`js/calendar_export.js`).
* **Dépôt de pièces justificatives** : zone drag & drop pour photos et documents DPE (`js/file_upload.js`).
* **Simulateur tarifaire indicatif** : calcul instantané selon le type de bien et de sinistre (`js/price_calculator.js`).
* **Orientation des urgences 24/7** : bascule automatique hors heures ouvrées (`js/emergency_247.js`).

### 📱 Expérience Mobile-First & PWA Résiliente
* **Navigation linéaire épurée** : `Nos expertises` ➔ `Notre méthode` ➔ `Tarifs` ➔ `Zones` ➔ `FAQ` ➔ `Contact`.
* **Filtre d'intention 1-clic** : sélection instantanée (*Tous*, *Particuliers & Sinistres*, *Entreprises & Énergie*).
* **Barre d'action persistante** : contact téléphonique direct (`tel:+33778246567`) et bouton WhatsApp.
* **Service Worker PWA (Cache v40)** : mode hors-ligne complet avec détection de mise à jour (`js/pwa_update.js`) et Background Sync (`js/pwa_background_sync.js`).
* **Impression Pro** : feuille de style dédiée `css/print.css` masquant les éléments interactifs.

### 🛡️ Transparence, RGPD & Suivi
* **Bannière cookies RGPD** : consentement minimaliste sans traceurs invasifs (`js/cookie_banner.js`).
* **Témoignages & retours d'expérience** : composant dynamique de cas concrets (`js/testimonials.js`).
* **Veille réglementaire** : formulaire d'inscription direct (`js/newsletter_subscription.js`).
* **Portail client / Suivi de dossier** : schéma d'intégration d'espace client (`config/client_portal.json`).
* **Fil d'Ariane & temps de lecture** : `js/breadcrumb.js` et `js/toc_reading_time.js`.

---

## 📂 3. Structure des Fichiers

```text
DOSSIER_A_GLISSER_SUR_NETLIFY/
├── index.html                           # Accueil, grille, filtres et formulaire Copilote IA
├── prestation.html                      # Fiches d'expertises détaillées (?service=...)
├── informations-legales.html            # Mentions légales, SIRET et politique RGPD
├── 404.html                             # Page d'erreur personnalisée
├── sitemap.xml / robots.txt             # Indexation SEO automatisée
├── sw.js                                # Service Worker PWA Network-First (Cache v40)
├── manifest.webmanifest                 # Manifeste d'installation mobile & desktop
├── netlify.toml / vercel.json           # En-têtes HTTP de sécurité (CSP, HSTS, X-Frame)
├── Dossier_Prestations_*.pdf            # Catalogue général téléchargeable
├── css/
│   ├── design_system.css                # Variables, typographie et charte graphique
│   ├── components.css                   # Composants, grille responsive, filtres et sticky CTA
│   └── print.css                        # Feuille de style dédiée à l'impression
├── js/
│   ├── app.js                           # Thème, navigation, filtres et Copilote IA RDV Hub
│   ├── prestation.js                    # Rendu dynamique des fiches de prestations
│   ├── pdf_download.js                  # Gestionnaire de téléchargement des fiches PDF
│   ├── calendar_export.js               # Export de rendez-vous .ics / Google Calendar
│   ├── file_upload.js                   # Dépôt de photos et pièces justificatives
│   ├── price_calculator.js              # Simulateur tarifaire indicatif
│   ├── emergency_247.js                 # Gestion des urgences hors heures ouvrées
│   ├── pwa_update.js                    # Notification de mise à jour PWA
│   ├── pwa_background_sync.js           # Synchronisation hors-ligne
│   ├── breadcrumb.js                    # Fil d'Ariane sémantique
│   ├── toc_reading_time.js              # Sommaire et temps de lecture
│   ├── cookie_banner.js                 # Bannière de consentement RGPD
│   ├── newsletter_subscription.js       # Inscription veille technique
│   └── testimonials.js                  # Témoignages et cas d'étude
├── config/
│   └── client_portal.json               # Schéma de configuration espace client
├── assets/
│   ├── logo_efficiens_energia.png       # Logo officiel haute résolution
│   ├── schema_org.json                  # Données structurées ProfessionalService
│   ├── og_meta_tags.html                # Balises Open Graph / Twitter Cards
│   ├── icons/                           # Icônes vectorielles PWA (192, 512)
│   ├── services/                        # 8 visuels WebP optimisés
│   └── pdf/                             # 8 Fiches PDF d'expertise individuelles
│       ├── Fiche_Expertise_Sinistres_et_Dommages.pdf
│       ├── Fiche_Expertise_Protection_Juridique.pdf
│       ├── Fiche_Expertise_Visite_Avant_Achat.pdf
│       ├── Fiche_Expertise_Diagnostics_Contestes.pdf
│       ├── Fiche_Expertise_Energies_Renouvelables.pdf
│       ├── Fiche_Expertise_Performance_Energetique.pdf
│       ├── Fiche_Expertise_Incendie.pdf
│       └── Fiche_Expertise_Industrielle.pdf
└── scripts/
    └── audit_site_construction.py       # Banc d'essai QA, OWASP et Edge Chromium
```

---

## 🧪 4. Banc d'Essai QA & Sécurité (41/41 PASS)

Le banc d'essai automatisé valide déterministement l'intégrité de la plateforme :

```powershell
python scripts/audit_site_construction.py
```

* **Intégrité des fichiers** : 23/23 fichiers critiques certifiés.
* **Sécurité OWASP** : neutralisation des injections XSS, protection anti-spam bot-field.
* **Accessibilité WCAG AA/AAA** : rôles sémantiques ARIA, contrastes et accessibilité clavier.
* **Rendu DOM réel** : validation sous Edge Chromium Headless (68 000+ octets validés).

---

## 💻 5. Déploiement & Accès

| Plateforme | URL de Déploiement | Statut |
|:---:|---|:---:|
| **Production Vercel** | [https://siteconstruction.vercel.app/](https://siteconstruction.vercel.app/) | 🟢 **En ligne (HTTP 200)** |
| **Miroir GitHub Pages** | [https://efficiens-energia.github.io/site_construction/](https://efficiens-energia.github.io/site_construction/) | 🟢 **En ligne (HTTP 200)** |
| **Dépôt Git Officiel** | [https://github.com/EFFICIENS-ENERGIA/site_construction](https://github.com/EFFICIENS-ENERGIA/site_construction) | 🟢 **Synchronisé (main)** |
