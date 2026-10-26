# EFFICIENS ENERGIA — Expertise technique & énergétique

Site vitrine statique présentant EFFICIENS ENERGIA comme expert indépendant sollicité directement par le client. Les domaines affichés couvrent les sinistres et désordres de construction, l'expertise technique dans le cadre d'une protection juridique, l'industrie, les énergies renouvelables, la performance énergétique des bâtiments, l'incendie et l'analyse technique de diagnostics immobiliers contestés par un tiers.

## Structure

- `index.html` : page d'accueil et présentation des missions.
- `informations-legales.html` : mentions et informations de confidentialité ; les informations éditeur/hébergeur encore inconnues y sont signalées sans être inventées.
- `css/design_system.css` : palette, typographie et fondations du design system.
- `css/components.css` : composants, mise en page, adaptation mobile et accessibilité.
- `js/app.js` : menu mobile, thème clair/sombre, envoi du formulaire Netlify et mise à jour du service worker.
- `sw.js` : stratégie Network-First avec repli cache uniquement hors ligne.
- `manifest.webmanifest` : métadonnées d'installation PWA.
- `assets/` : logo, icônes et visuels WebP optimisés avec images sources de repli.

Les huit cartes de l'accueil ouvrent une page dédiée à la prestation sélectionnée. `prestation.html` affiche son périmètre, ses points d'analyse et les limites associées ; l'accueil conserve également les détails et les étapes de cadrage d'une mission.

La prestation relative à la protection juridique porte sur l'analyse technique du dossier. Les garanties et modalités de prise en charge dépendent du contrat et de l'assureur ; elles sont à vérifier avant d'engager une mission. Cette prestation ne constitue ni un conseil juridique ni une représentation auprès de l'assureur.

Le formulaire de contact est configuré pour Netlify Forms. Après déploiement sur Netlify, les demandes sont transmises à Netlify et consultables dans le tableau de bord du site ; le lien `mailto:` reste disponible en solution de repli. Dans Netlify, ouvrir les notifications de soumission de formulaires et ajouter l'adresse de contact comme destinataire. Avant publication, définir la durée de conservation et les modalités de suppression des demandes, puis vérifier la page de confidentialité. Ne pas transmettre de pièce confidentielle via le formulaire.

L'accueil inclut une FAQ, des métadonnées locales et des données structurées de services. Les huit visuels d'expertise sont servis en WebP avec leur fichier JPEG/PNG d'origine en repli, en chargement différé.

Aucun outil de mesure d'audience n'est installé. L'hébergement, le directeur de publication, la forme juridique de l'éditeur et les informations de conservation des journaux doivent être confirmés avant publication ; aucune qualification ou référence client non vérifiée n'est revendiquée.

## Lancer en local sous Windows

Depuis le dossier `projet training site internet`, exécuter `LANCER_SITE_CONSTRUCTION.bat`. Le serveur de développement local ouvre le site à l'adresse `http://localhost:8089/index.html`.

On peut également utiliser Python depuis le dossier du site :

```powershell
python -m http.server 8089
```

## Contrôle du site

Depuis `projet training site internet` :

```powershell
python scripts\audit_site_construction.py
```

La mission relative aux diagnostics immobiliers porte sur l'analyse technique d'un diagnostic existant mis en cause, contesté ou susceptible de l'être par un tiers. Elle ne signifie pas que l'entreprise réalise un nouveau diagnostic réglementaire.
