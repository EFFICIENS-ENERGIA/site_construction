# 🌿 Guide de Test & Mise en Ligne — EFFICIENS ENERGIA

**Destinataire** : **Sébastien Mathe (Seb)** — Dirigeant & Conseiller en Rénovation Énergétique  
**Auteurs** : **@DOC** (Tech Writer) & **@CE** (Lead Orchestrator)  
**Date** : 16 Septembre 2026

---

## ⚡ Étape 1 : Lancer Votre Vitrine en 1 Clic sous Windows

Pour tester immédiatement le site dans votre navigateur :

1. Ouvrez votre explorateur de fichiers Windows dans le dossier du projet :
   `c:\Users\EFFICIENS ENERGIA\Desktop\ANTIGRAVITY\site_construction`
2. **Double-cliquez sur `LANCER_SITE.bat`** (à la racine) ou sur `projet training site internet/LANCER_SITE_CONSTRUCTION.bat`.
3. Le serveur local démarre automatiquement et votre navigateur Edge/Chrome s'ouvre directement sur votre vitrine :  
   👉 **http://localhost:8089/index.html**

---

## 🎯 Étape 2 : Les 5 Fonctionnalités Majeures à Tester

### 1. 🔗 Liens Réseaux Sociaux Professionnels Intégrés
- Dans l'en-tête (en haut à droite) ainsi que dans la section Contact et le pied de page :
  - **Bouton Facebook `f`** : pointe vers votre page pro [facebook.com/efficiens.energia](https://www.facebook.com/efficiens.energia).
  - **Bouton LinkedIn `in`** : pointe vers votre profil pro [linkedin.com/in/sébastien-mathe-b04446113](https://www.linkedin.com/in/s%C3%A9bastien-mathe-b04446113/).
  - Tous les liens s'ouvrent dans un nouvel onglet sécurisé (`target="_blank" rel="noopener noreferrer"`).

### 2. 📐 Le Simulateur Déterministe d'Aides & Travaux
- Cliquez sur **Simulateur d'Aides** dans le menu ou faites défiler la page.
- **Étape 1** : Choisissez un type de projet (ex: *Rénovation Globale* ou *Rénovation Thermique*).
- **Étape 2** : Ajustez la surface (ex: *120 m²*), la finition et la performance thermique (*RE2020* ou *Passif*).
- **Étape 3** : Visualisez l'estimation instantanée (Total TTC, HT, décomposition des 4 postes métiers BTP, aides MaPrimeRénov' 2026 / CEE et reste à charge net calculé).
- **Étape 4** : Cliquez sur **Télécharger / Imprimer en PDF** pour exporter la synthèse.

### 3. 🔀 Le Comparateur Visuel Avant / Après Rénovation DPE
- Rendez-vous sur la section **Rénovations DPE**.
- Faites glisser le curseur central pour apprécier la métamorphose : d'une passoire thermique F des années 1970 à une bâtisse rénovée BBC Classe A contemporaine.

### 4. 📊 Le Cockpit Espace Client : Suivi de Chantier en Direct
- Consultez la section **Suivi de Chantier** dédiée au projet témoin :  
  *Rénovation Globale BBC & PAC • Réf. EE-2026-AIN-LUMIERE (Hautecourt-Romaneche 01)*.
- Cliquez sur les 5 jalons chronologiques supervisés par Sébastien Mathe (Audit thermique, Dossier MaPrimeRénov', Dépose & Isolation ITE, Pompe à Chaleur, Réception & DPE A final).

### 5. 🌙 Le Mode Sombre / Clair & Formulaire Sécurisé
- Cliquez sur **🌙 Sombre / ☀️ Clair** dans la barre de navigation.
- Testez le formulaire de demande d'étude préliminaire (filtrage anti-XSS et coordonnées complètes d'EFFICIENS ENERGIA : 480 Route du Belvédère, 01250 Hautecourt-Romaneche, 07 78 24 65 67, SIRET : 827 694 498 00011).

---

## 🌐 Étape 3 : Mettre en Ligne Votre Vitrine Gratuitement (Méthode Infaillible)

### Solution 1 : Déploiement Netlify Drop en 1 Clic (Recommandé)

Si le glisser-déposer d'un dossier complet a échoué, c'est pour l'une des 3 raisons suivantes :
1. **Compte Netlify déconnecté** : Netlify exige désormais d'être connecté à son compte (gratuit) sur [app.netlify.com](https://app.netlify.com) pour autoriser l'import.
2. **Arborescence racine** : Netlify exige impérativement que `index.html` soit situé directement au premier niveau (ce qui n'était pas le cas si vous aviez glissé le dossier parent du projet).
3. **Sécurité Windows / Navigateur** : Les navigateurs sous Windows bloquent parfois le glisser de dossiers arborescents, mais **acceptent à 100% le glisser d'une archive `.zip`** !

**Procédure Infaillible préparée par l'équipe :**
1. Double-cliquez sur **`DEPLOYER_SUR_NETLIFY.bat`** (à la racine de `site_construction`).
2. Votre navigateur s'ouvre automatiquement sur **[app.netlify.com/drop](https://app.netlify.com/drop)** et l'explorateur Windows sélectionne directement le fichier :  
   👉 **`site_efficiens_energia.zip`** (87 Ko).
3. Assurez-vous d'être connecté à votre compte Netlify.
4. Glissez simplement le fichier **`site_efficiens_energia.zip`** (ou le dossier `DOSSIER_A_GLISSER_SUR_NETLIFY`) dans la zone en pointillés de Netlify Drop.
5. Votre vitrine est instantanément en ligne avec une adresse HTTPS sécurisée (ex: `https://efficiens-energia.netlify.app`) !

---

### Solution 2 : Déploiement Alternatif sur Tiiny Host (Zéro configuration, 10 secondes)

Si vous ne souhaitez pas créer de compte Netlify :
1. Ouvrez votre navigateur sur **[tiiny.host](https://tiiny.host)**.
2. Glissez le fichier **`site_efficiens_energia.zip`** directement dans la zone de dépôt.
3. Entrez un nom (ex: `efficiens-energia`) et cliquez sur **Publish**.
4. Votre site est immédiatement en ligne et partageable !
