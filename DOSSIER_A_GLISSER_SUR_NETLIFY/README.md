# 🌿 EFFICIENS ENERGIA — Expertise Technique Bâtiment & Énergie

<<<<<<< HEAD
> **Site officiel, catalogue d'expertises & portail d'ingénierie technique indépendante**  
> Dirigeant : **Sébastien Mathe** • 📞 07 78 24 65 67 • ✉️ contact@efficiens-energia.fr  
> Siège : 480 Route du Belvédère, 01250 Hautecourt-Romanèche • SIRET : 827 694 498 00011  
=======
> **Site vitrine officiel, catalogue d'expertises & portail de qualification d'expertise indépendante**  
> Dirigeant : **Sébastien Mathe** • 📞 07 78 24 65 67 • ✉️ contact@efficiens-energia.fr  
> Siège : 480 Route du Belvédère, 01250 Hautecourt-Romaneche • SIRET : 827 694 498 00011  
>>>>>>> 6c2805c (feat(site-efficiens-energia): initialize repository and replace Bati-Excellence Pro branding)
> 🌐 **Production Vercel** : [https://siteconstruction.vercel.app/](https://siteconstruction.vercel.app/)  
> 🌐 **Miroir GitHub Pages** : [https://efficiens-energia.github.io/site_construction/](https://efficiens-energia.github.io/site_construction/)

---

## 🎯 1. Présentation & Positionnement

<<<<<<< HEAD
**EFFICIENS ENERGIA** est un **Cabinet d'Expertise Technique Indépendant · Particuliers, Entreprises, Collectivités & Institutionnels**. 

Intervenant à l'initiative des propriétaires, maîtres d'ouvrage, entreprises ou collectivités territoriales, la mission du cabinet est la défense rigoureuse de vos droits, l'investigation des causes racines et l'éclairage technique impartial et probant de vos dossiers :

1. **Sinistres & dommages à la construction** (infiltrations, fissures structurelles, tassements différentiels RGA, malfaçons, garanties biennale et décennale).
2. **Expertise technique & protection juridique** (appui contradictoire, analyse des pièces, assistance selon l'Art. L. 127-2-3 du Code des Assurances).
3. **Visite technique avant achat immobilier** (examen visuel méthodique du clos et couvert, détection des désordres et estimation budgétaire des travaux).
4. **Diagnostics immobiliers contestés** (contre-analyse technique de rapports DPE 3CL-2021, amiante, plomb, électricité ou termites mis en cause).
5. **Énergies renouvelables & systèmes solaires** (centrales photovoltaïques toiture/sol, pompes à chaleur, pertes de productible et non-conformités).
6. **Performance énergétique des bâtiments** (enveloppe thermique, thermographie infrarouge FLIR, ponts thermiques, ventilation et stratégie de rénovation).
7. **Incendie & dommages associés** (recherche de causes et points d'ignition, analyse des atteintes aux structures et aux équipements).
8. **Expertise industrielle & BTP** (bâtiments tertiaires, structures métalliques, dallages industriels et équipements de production).

---

## 🚀 2. Architecture & 20 Améliorations Déployées

Le site repose sur une architecture statique moderne, ultra-rapide (**< 300 ms**), sobre (*Zero-Dependency Bloat*) et conforme aux normes d'accessibilité WCAG AA/AAA :

### 📄 Fiches PDF Individuelles & Documents
* **8 Fiches PDF d'expertise professionnelles** (`assets/pdf/Fiche_Expertise_*.pdf`) générées en haute résolution avec gestionnaire de téléchargement direct (`js/pdf_download.js`).
* **Dossier de Présentation complet** (`Dossier_Prestations_EFFICIENS_ENERGIA.pdf`).

### 🔍 Référencement SEO & Réseaux Sociaux
* **Cartographie XML** : `sitemap.xml` complet avec priorités et fréquences d'indexation.
* **Directives robots** : `robots.txt` multi-cibles.
* **Données structurées Schema.org** : `assets/schema_org.json` (`ProfessionalService`, SIRET 82769449800011, adresse et géolocalisation).
* **Cartes réseaux sociaux** : balises Open Graph et Twitter Cards (`assets/og_meta_tags.html`).
* **Page 404 sur-mesure** : `404.html` chartée en bleu `#1e3a8a` avec navigation de secours et contact 1-clic.

### 🛡️ Conversion, Confiance & Relations Clients
* **Dépôt de pièces justificatives** : zone de glisser-déposer (*drag-and-drop*) intégrée au formulaire de contact pour photos, devis ou DPE (`js/file_upload.js`, max 10 Mo/fichier).
* **Simulateur d'honoraires multi-critères** : estimation indicative forfaitaire selon le bien, la surface et la complexité (`js/price_calculator.js`).
* **Export d'agenda ICS** : génération d'invitations calendrier (.ics / Google Calendar) pour la confirmation des rendez-vous (`js/calendar_export.js`).
* **Cas d'études réels & retours d'expérience** : typologies d'interventions concrètes et méthodologies vérifiables sans données fictives (*Ground Truth by Design*, `js/testimonials.js`).
* **Orientation des urgences 24/7** : bandeau d'alerte automatique hors heures ouvrées et week-ends (`js/emergency_247.js`).
* **Veille réglementaire** : module d'inscription technique DTU / RE2020 (`js/newsletter_subscription.js`).

### 📱 PWA, Ergonomie & Résilience Réseau
* **Pied de page corporate style Kapia-RGI** : 5 colonnes thématiques (Solutions & Expertises, Méthodologie, Société, Services & Outils, Contacts) avec 100% de liens vérifiés (0 lien mort).
* **Barre d'action mobile persistante** : appel direct (`07 78 24 65 67`) et contact WhatsApp prioritaire.
* **PWA Service Worker (Cache v40+)** : navigation hors-ligne complète, alerte visuelle de mise à jour (`js/pwa_update.js`) et Background Sync (`js/pwa_background_sync.js`).
* **Feuille de style d'impression** : `css/print.css` (@media print) masquant la navigation et les éléments interactifs pour un rendu papier sobre.
* **Fil d'Ariane & temps de lecture** : `js/breadcrumb.js` sémantique et `js/toc_reading_time.js`.
* **Conformité RGPD** : bandeau de consentement pour cookies strictement techniques (`js/cookie_banner.js`).

---

## 📂 3. Arborescence du Projet

```text
DOSSIER_A_GLISSER_SUR_NETLIFY/
├── index.html                           # Accueil, 8 expertises, simulateur et formulaire avec drag & drop
├── prestation.html                      # Fiches de prestations détaillées (?service=...)
├── informations-legales.html            # Mentions légales, SIRET et politique de confidentialité
├── 404.html                             # Page d'erreur personnalisée
├── sitemap.xml / robots.txt             # Indexation SEO
├── sw.js                                # Service Worker PWA Network-First (Cache v40+)
=======
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
>>>>>>> 6c2805c (feat(site-efficiens-energia): initialize repository and replace Bati-Excellence Pro branding)
├── manifest.webmanifest                 # Manifeste d'installation mobile & desktop
├── netlify.toml / vercel.json           # En-têtes HTTP de sécurité (CSP, HSTS, X-Frame)
├── Dossier_Prestations_*.pdf            # Catalogue général téléchargeable
├── css/
<<<<<<< HEAD
│   ├── design_system.css                # Variables, typographie et grille
│   ├── components.css                   # Composants, cartes, footer 5 colonnes et drag & drop
│   └── print.css                        # Feuille d'impression @media print
├── js/
│   ├── app.js                           # Thème sombre/clair, navigation et interaction
│   ├── prestation.js                    # Rendu dynamique des 8 expertises
│   ├── file_upload.js                   # Glisser-déposer de pièces justificatives
│   ├── price_calculator.js              # Simulateur d'estimation tarifaire indicative
│   ├── pdf_download.js                  # Gestionnaire de téléchargement des fiches PDF
│   ├── calendar_export.js               # Export de rendez-vous .ics / Google Calendar
│   ├── emergency_247.js                 # Orientation des urgences hors-horaires
│   ├── pwa_update.js                    # Notification de mise à jour PWA
│   ├── pwa_background_sync.js           # Enregistrement et synchronisation hors-ligne
│   ├── breadcrumb.js                    # Fil d'Ariane sémantique Schema.org
│   ├── toc_reading_time.js              # Calcul du temps de lecture et sommaire
│   ├── cookie_banner.js                 # Consentement cookies RGPD
│   ├── newsletter_subscription.js       # Inscription à la veille réglementaire
│   └── testimonials.js                  # Cas d'études réels & retours d'expérience
├── assets/
│   ├── logo_efficiens_energia.png       # Logo officiel fond transparent
=======
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
>>>>>>> 6c2805c (feat(site-efficiens-energia): initialize repository and replace Bati-Excellence Pro branding)
│   ├── schema_org.json                  # Données structurées ProfessionalService
│   ├── og_meta_tags.html                # Balises Open Graph / Twitter Cards
│   ├── icons/                           # Icônes vectorielles PWA (192, 512)
│   ├── services/                        # 8 visuels WebP optimisés
│   └── pdf/                             # 8 Fiches PDF d'expertise individuelles
<<<<<<< HEAD
└── scripts/
    └── audit_site_construction.py       # Banc d'essai QA automatisé (26/26 assertions)
=======
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
>>>>>>> 6c2805c (feat(site-efficiens-energia): initialize repository and replace Bati-Excellence Pro branding)
```

---

<<<<<<< HEAD
## 🧪 4. Banc d'Essai QA & Sécurité (26/26 PASS)

Le banc d'essai automatisé valide déterministement l'intégrité de la plateforme avant chaque livraison :
=======
## 🧪 4. Banc d'Essai QA & Sécurité (41/41 PASS)

Le banc d'essai automatisé valide déterministement l'intégrité de la plateforme :
>>>>>>> 6c2805c (feat(site-efficiens-energia): initialize repository and replace Bati-Excellence Pro branding)

```powershell
python scripts/audit_site_construction.py
```

<<<<<<< HEAD
* **Intégrité des 20 modules** : 20/20 modules officiels certifiés conformes.
* **Audit des liens** : 198/198 liens et ancres internes vérifiés (0 lien mort).
* **Sobriété & Syntaxe JS** : 14/14 fichiers JS validés par compilation AST Node.js sans corruption.
* **Sécurité OWASP** : neutralisation des injections XSS, protection des liens sortants (`rel="noopener noreferrer"`).
* **Rendu DOM réel** : validation sous Edge Chromium Headless (84 000+ octets rendus).
=======
* **Intégrité des fichiers** : 23/23 fichiers critiques certifiés.
* **Sécurité OWASP** : neutralisation des injections XSS, protection anti-spam bot-field.
* **Accessibilité WCAG AA/AAA** : rôles sémantiques ARIA, contrastes et accessibilité clavier.
* **Rendu DOM réel** : validation sous Edge Chromium Headless (68 000+ octets validés).
>>>>>>> 6c2805c (feat(site-efficiens-energia): initialize repository and replace Bati-Excellence Pro branding)

---

## 💻 5. Déploiement & Accès

| Plateforme | URL de Déploiement | Statut |
|:---:|---|:---:|
| **Production Vercel** | [https://siteconstruction.vercel.app/](https://siteconstruction.vercel.app/) | 🟢 **En ligne (HTTP 200)** |
| **Miroir GitHub Pages** | [https://efficiens-energia.github.io/site_construction/](https://efficiens-energia.github.io/site_construction/) | 🟢 **En ligne (HTTP 200)** |
| **Dépôt Git Officiel** | [https://github.com/EFFICIENS-ENERGIA/site_construction](https://github.com/EFFICIENS-ENERGIA/site_construction) | 🟢 **Synchronisé (main)** |
