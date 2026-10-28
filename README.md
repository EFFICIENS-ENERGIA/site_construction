# 🌿 EFFICIENS ENERGIA — Expertise Technique Bâtiment & Énergie

> **Site officiel, catalogue d'expertises & portail d'ingénierie technique indépendante**  
> Dirigeant : **Sébastien Mathe** • 📞 07 78 24 65 67 • ✉️ contact@efficiens-energia.fr  
> Siège : 480 Route du Belvédère, 01250 Hautecourt-Romanèche • SIRET : 827 694 498 00011  
> 🌐 **Production Vercel** : [https://siteconstruction.vercel.app/](https://siteconstruction.vercel.app/)  
> 🌐 **Miroir GitHub Pages** : [https://efficiens-energia.github.io/site_construction/](https://efficiens-energia.github.io/site_construction/)

---

## 🎯 1. Présentation & Positionnement

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
├── manifest.webmanifest                 # Manifeste d'installation mobile & desktop
├── netlify.toml / vercel.json           # En-têtes HTTP de sécurité (CSP, HSTS, X-Frame)
├── Dossier_Prestations_*.pdf            # Catalogue général téléchargeable
├── css/
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
│   ├── schema_org.json                  # Données structurées ProfessionalService
│   ├── og_meta_tags.html                # Balises Open Graph / Twitter Cards
│   ├── icons/                           # Icônes vectorielles PWA (192, 512)
│   ├── services/                        # 8 visuels WebP optimisés
│   └── pdf/                             # 8 Fiches PDF d'expertise individuelles
└── scripts/
    └── audit_site_construction.py       # Banc d'essai QA automatisé (26/26 assertions)
```

---

## 🧪 4. Banc d'Essai QA & Sécurité (26/26 PASS)

Le banc d'essai automatisé valide déterministement l'intégrité de la plateforme avant chaque livraison :

```powershell
python scripts/audit_site_construction.py
```

* **Intégrité des 20 modules** : 20/20 modules officiels certifiés conformes.
* **Audit des liens** : 198/198 liens et ancres internes vérifiés (0 lien mort).
* **Sobriété & Syntaxe JS** : 14/14 fichiers JS validés par compilation AST Node.js sans corruption.
* **Sécurité OWASP** : neutralisation des injections XSS, protection des liens sortants (`rel="noopener noreferrer"`).
* **Rendu DOM réel** : validation sous Edge Chromium Headless (84 000+ octets rendus).

---

## 💻 5. Déploiement & Accès

| Plateforme | URL de Déploiement | Statut |
|:---:|---|:---:|
| **Production Vercel** | [https://siteconstruction.vercel.app/](https://siteconstruction.vercel.app/) | 🟢 **En ligne (HTTP 200)** |
| **Miroir GitHub Pages** | [https://efficiens-energia.github.io/site_construction/](https://efficiens-energia.github.io/site_construction/) | 🟢 **En ligne (HTTP 200)** |
| **Dépôt Git Officiel** | [https://github.com/EFFICIENS-ENERGIA/site_construction](https://github.com/EFFICIENS-ENERGIA/site_construction) | 🟢 **Synchronisé (main)** |
