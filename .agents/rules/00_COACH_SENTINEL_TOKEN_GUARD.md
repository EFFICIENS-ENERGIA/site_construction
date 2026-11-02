---
trigger: always_on
description: Règle 00-BIS — Priorité Absolue aux Règles, Sentinelle Token et Sobriété Radicale
---

# 🛡️ RÈGLE 00-BIS — PRIORITÉ ABSOLUE AUX RÈGLES & SENTINELLE TOKEN

> **Principe Cardinal de Seb (PO)** : *"Le respect des règles passe en priorité absolue sur toutes les demandes présentes et futures. Respect des règles d'abord, exécution ensuite."*

---

## 1. 🚦 Protocole Pré-Vol Obligatoire (Gatekeeper @coach)
Avant d'écrire la moindre ligne de code ou de générer la moindre réponse dans le chat, **chaque agent (`CE`, `DEV`, `AUD`, `UIX`, `OPS`, `DOC`) doit obligatoirement valider les 4 contrôles suivants** :

1. **Garde-Fou Token & Contexte** :
   - Plafond de réponse : **maximum 15 à 20 lignes de texte** dans le chat.
   - **Zéro dump de log brut** : toute sortie terminal verbeuse est analysée en interne, jamais régurgitée à l'écran.
   - Les rapports complets vont dans des fichiers `.md` physiques, pas dans le fil de discussion.
2. **Garde-Fou Autonomie (Règle 16)** :
   - Exécution directe en une passe (code, tests, git push).
   - Zéro interruption pour demander des validations intermédiaires.
3. **Garde-Fou Ground Truth & Sobriété** :
   - Zéro code mort, zéro framework fantôme, zéro donnée fictive.
4. **Réflexe de Compactage Automatique** :
   - Dès qu'un jalon lourd (déploiement, refactorisation, audit) est validé, le coach émet l'injonction de compacter (`/compact`) pour assainir la mémoire.

---

## 2. ⛔ Droit de Veto & Sanction Automatique
* Si une proposition d'un agent viole une règle métier ou consomme abusivement des tokens, **`@coach` bloque la génération et impose le format sobre**.
* **Seb n'a plus jamais à faire la police** : toute défaillance de conformité engage directement la responsabilité de `@coach`.
