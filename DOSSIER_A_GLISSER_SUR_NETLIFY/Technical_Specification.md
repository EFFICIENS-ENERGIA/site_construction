# Spécification du site — EFFICIENS ENERGIA

## Objectif

Présenter EFFICIENS ENERGIA comme un expert indépendant que le client peut solliciter directement pour une analyse technique en matière de bâtiment, de sinistres, d'industrie et d'énergie, et permettre aux visiteurs de prendre contact par téléphone ou par courriel. Expliquer que la mission est cadrée selon la situation du demandeur et ne constitue ni un avis juridique ni une garantie sur l'issue d'un différend.

La page d'accueil met en avant deux parcours de première intention (sinistre/dommage et diagnostic contesté). Les six prestations disposent d'une section de détail liée depuis leur carte.

## Direction visuelle

- Conserver le design system existant : palette minérale en modes clair et sombre, typographie sobre, grille architecturale et accent bronze.
- Mettre en avant des constats techniques et une méthode de mission compréhensible, sans utiliser de statistiques commerciales non justifiées, de cas clients fictifs ou de promesses d'indemnisation.
- Adapter les cartes, la navigation et les appels à l'action aux écrans mobiles et aux technologies d'assistance.

## Domaines affichés

1. Sinistres et dommages à la construction.
2. Expertise industrielle.
3. Installations d'énergies renouvelables.
4. Performance énergétique des bâtiments.
5. Incendie et dommages associés.
6. Analyse technique de diagnostics immobiliers existants, mis en cause, contestés ou susceptibles de l'être par un tiers.

La mission d'expertise porte sur l'analyse d'un diagnostic existant, de ses constats, de sa portée et de ses conclusions. Elle ne doit pas être présentée comme la réalisation d'un nouveau diagnostic réglementaire.

## Parcours de mission présenté

1. Recueil de la situation, des parties concernées et des pièces disponibles.
2. Cadrage du contexte, des parties concernées, du périmètre, des modalités et du devis avant intervention.
3. Constats et investigations convenus.
4. Restitution des résultats, de leurs limites et des suites possibles.

Le site précise qu'une expertise technique ne se substitue ni à un conseil juridique ni aux décisions d'un assureur ou d'une juridiction.

## Implémentation et validation

- Site statique en HTML, CSS et JavaScript natifs, sans dépendance distante pour l'affichage principal.
- La carte des sinistres conduit, par un lien d'ancrage accessible, à une section détaillant les situations, les principes d'analyse et la restitution des conclusions.
- Les cartes de prestation et leurs liens « Découvrir » ouvrent une page dédiée dans un nouvel onglet. Chaque page présente une illustration, un contexte complémentaire et des liens vers des ressources documentaires officielles, en plus du périmètre et des limites de la mission.
- Un bouton « Accueil » est disponible depuis chaque page de prestation.
- La page d'accueil explique l'indépendance de l'analyse technique et présente les modalités d'honoraires par type de mission. Les missions sont proposées sur devis avant intervention ; aucun tarif ni pourcentage d'indemnité non confirmé par l'éditeur n'est affiché.
- Le formulaire client prépare un brouillon `mailto:` dans le logiciel de messagerie du visiteur ; aucun serveur ni stockage local ne reçoit les champs. Les coordonnées téléphone et courriel directs restent visibles.
- Le site ne déclare aucun outil d'analytique ni traceur tiers. La mesure d'audience reste volontairement désactivée tant qu'un outil adapté et le cadre de consentement ne sont pas déterminés.
- La page `informations-legales.html` documente le stockage local du thème, le cache PWA et le comportement du brouillon de courriel. La forme juridique, le directeur de publication et l'hébergeur restent à confirmer par l'éditeur avant publication.
- Les métadonnées sociales et données structurées n'utilisent que les coordonnées, identifiants et zones déjà présents dans les fichiers du projet. L'URL canonique et l'image de partage absolue ne sont pas définies faute de domaine public confirmé.
- Le service worker utilise Network-First, purge les anciens caches et met à jour son enregistrement au chargement.
- Le contrôleur gère les interactions au chargement et à partir de `Escape` pour le menu mobile ; les animations respectent la préférence de réduction des mouvements.
- Vérifier la page, la navigation, l'affichage mobile, les liens, les contrastes et la console après chaque modification.
