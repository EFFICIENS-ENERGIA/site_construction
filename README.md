# 🌿 EFFICIENS ENERGIA — Expertise Technique Bâtiment & Énergie

> **Site vitrine officiel & portail de qualification d'expertise indépendante**  
> Dirigeant : **Sébastien Mathe** • 📞 07 78 24 65 67 • ✉️ contact@efficiens-energia.fr  
> Siège : 480 Route du Belvédère, 01250 Hautecourt-Romaneche • SIRET : 827 694 498 00011  
> 🌐 **Site en ligne** : [https://efficiens-energia.github.io/site_construction/](https://efficiens-energia.github.io/site_construction/)

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

## 🚀 2. Architecture & Fonctionnalités Techniques

Le site repose sur une architecture statique moderne, ultra-rapide (**< 350 ms**) et sobre (*Zero-Dependency Bloat*) :

* **🧭 Navigation Linéaire Épurée** :
  `Nos expertises` (mis en valeur) ➔ `Notre méthode` ➔ `Tarifs` ➔ `Zones` ➔ `FAQ` ➔ `Contact`
* **🎯 Filtre d'Intention 1-Clic** :
  Séparation instantanée des expertises en 3 vues : *Tous les domaines (8)*, *Particuliers & Sinistres (4)* et *Entreprises & Énergie (4)*.
* **🤖 Intégration Copilote IA RDV Hub** :
  Qualification en temps réel des demandes de rendez-vous via le moteur de l'Agent IA d'EFFICIENS ENERGIA (détection d'urgence, pré-analyse des désordres et calcul de créneau optimisé sans collision d'agenda).
* **📱 Expérience Mobile-First & Sticky CTA** :
  Barre d'action inférieure persistante sur smartphone avec appel direct 1-clic (`tel:+33778246567`) et bouton direct WhatsApp.
* **🕒 Mentions de Disponibilité & Cadre de Contact** :
  Horaires affichés (du lundi au vendredi, 8h30 - 18h00) avec consigne claire pour les missions de terrain.
* **🛡️ Badge d'Indépendance d'Assurance** :
  Rappel déontologique d'indépendance absolue vis-à-vis des compagnies d'assurance.
* **⚡ PWA Offline-First (Service Worker Cache v40)** :
  Fonctionnement continu hors-ligne avec stratégie *Network-First* pour les données et consultation résiliente.

---

## 📂 3. Structure des Fichiers

```text
├── index.html                  # Page d'accueil, grille d'expertises, filtres et formulaire
├── prestation.html             # Fiches techniques détaillées des 8 prestations (?service=...)
├── informations-legales.html   # Mentions légales, SIRET et politique de confidentialité
├── css/
│   ├── design_system.css       # Palette chromatique, typographie et tokens CSS
│   └── components.css          # Composants, layout responsive, sticky bar et badge
├── js/
│   ├── app.js                  # Thème, filtre d'intention, validation et Agent IA RDV Hub
│   └── prestation.js           # Injection dynamique sécurisée des fiches prestations
├── sw.js                       # Service Worker PWA (Cache v40 Network-First)
├── manifest.webmanifest        # Manifeste d'installation sur mobile/desktop
├── netlify.toml / vercel.json  # Configuration d'en-têtes HTTP de sécurité (CSP, HSTS, X-Frame)
├── Dossier_Prestations_*.pdf   # Catalogue complet téléchargeable
└── assets/
    ├── logo_efficiens_energia  # Logo officiel de la société
    ├── icons/                  # Icônes vectorielles PWA (192, 512)
    └── services/               # 8 visuels WebP haute définition optimisés
```

---

## 🧪 4. Banc d'Essai QA & Sécurité (41/41 PASS)

Avant tout déploiement, le script de validation déterministe est exécuté sous Python et Edge Chromium Headless :

```powershell
python "projet training site internet/scripts/audit_site_construction.py"
```

**Bilan d'audit certifié :**
- ✅ Intégrité des 23 fichiers et assets critiques.
- ✅ Sécurité OWASP (neutralisation XSS, protection anti-spam bot-field).
- ✅ Accessibilité WCAG AA/AAA (rôles sémantiques ARIA, contraste, navigation clavier `Escape`).
- ✅ Rendu DOM réel Edge Chromium Headless (68 000+ octets validés).

---

## 💻 5. Lancement Local & Déploiement

### Exécution locale Windows (1-Clic)
Double-cliquez sur `LANCER_SITE.bat` ou lancez en ligne de commande :
```powershell
python -m http.server 8089
```
Accès navigateur : `http://localhost:8089/index.html`

### Déploiement en Production
Le dépôt est synchronisé sur la branche `main` de GitHub :
```powershell
git push origin main
```
Déploiement automatique en 30 secondes sur GitHub Pages :  
👉 **[https://efficiens-energia.github.io/site_construction/](https://efficiens-energia.github.io/site_construction/)**

### Domaine personnalisé `efficiens-energia.fr`
Pour lier votre nom de domaine une fois les DNS enregistrés chez votre registrar, exécutez simplement :
```cmd
activer_domaine_personnalise.bat
```
