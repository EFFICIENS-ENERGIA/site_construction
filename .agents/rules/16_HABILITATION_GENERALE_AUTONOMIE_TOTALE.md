---
trigger: always_on
description: Règle 16 — Habilitation Générale d'Exécution & Travail Prioritaire en Local (Zéro Push Automatique)
---

# 🚀 RÈGLE 16 — AUTONOMIE LOCALE & ZÉRO PUSH AUTOMATIQUE (`LOCAL-FIRST`)

1. **Priorité Absolue au Travail en Local** :
   - Sur consigne formelle de **Seb** (Manager / Product Owner), l'équipe travaille **prioritairement et exclusivement en local**.
   - **Interdiction formelle de `git push` automatique** : Ne jamais pousser vers les dépôts distants (GitHub, Vercel, Netlify) sans demande explicite de Seb.
   - Les commits éventuels restent strictement locaux.

2. **Autonomie Opérationnelle Locale Sans Friction** :
   - Application directe des modifications de code, refactoring, audits QA automatisés et vérifications visuelles (Edge Chromium Headless) en local sans interruption intermédiaire.
   - Utiliser `write_file` et `edit_file` directement sur les fichiers du workspace.
   - Pour les artefacts, toujours définir `RequestFeedback: false`.
