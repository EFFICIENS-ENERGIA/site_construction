const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const compPath = path.join(repoRoot, 'css', 'components.css');
let css = fs.readFileSync(compPath, 'utf8');

// 1. Replace the legacy .main-nav a block
const legacyNavRegex = /\.main-nav\s*\{[\s\S]*?\.main-nav a:hover::after\s*\{\s*width:\s*100%;\s*\}/;
const newNavCss = `.main-nav {
    display: flex;
    align-items: center;
    gap: 0.65rem;
}

.main-nav a {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.88rem;
    letter-spacing: 0.01em;
    position: relative;
    padding: 0.42rem 0.95rem;
    border-radius: var(--border-radius-full);
    background: rgba(15, 23, 42, 0.04);
    border: 1px solid rgba(15, 23, 42, 0.12);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    display: inline-flex;
    align-items: center;
    text-decoration: none !important;
}

.main-nav a::after {
    display: none !important;
}

.main-nav a:hover {
    color: #1d4ed8;
    background: #ffffff;
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.18);
    transform: translateY(-2px);
}

.main-nav a.active,
.main-nav a.nav-highlight {
    background: #1e3a8a !important;
    color: #ffffff !important;
    border-color: #1e3a8a !important;
    font-weight: 700 !important;
    box-shadow: 0 4px 14px rgba(30, 58, 138, 0.28) !important;
}

[data-theme="dark"] .main-nav a {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.16);
    color: #f1f5f9;
}

[data-theme="dark"] .main-nav a:hover {
    background: rgba(37, 99, 235, 0.25);
    border-color: #60a5fa;
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(96, 165, 250, 0.25);
}

[data-theme="dark"] .main-nav a.active,
[data-theme="dark"] .main-nav a.nav-highlight {
    background: #2563eb !important;
    color: #ffffff !important;
    border-color: #60a5fa !important;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.45) !important;
}`;

if (legacyNavRegex.test(css)) {
    css = css.replace(legacyNavRegex, newNavCss);
    console.log('Replaced legacy .main-nav block');
} else {
    console.warn('Legacy .main-nav block not found by regex, appending override at end');
}

// 2. Append the Clickable Affordance Master Block at the end
const affordanceBlock = `

/* ==========================================================================
   OPTIMISATION VISIBILITÉ ÉLÉMENTS CLIQUABLES & AFFORDANCE (DEMANDE UTILISATEUR)
   ========================================================================== */

/* 1. Boutons du Hero (Sinistres, Diagnostic, Explorer) */
.expertise-hero-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 2rem 0;
}

.expertise-hero-actions .btn-primary {
    font-size: 1rem !important;
    font-weight: 700 !important;
    padding: 0.85rem 1.85rem !important;
    border-radius: 9999px !important;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%) !important;
    color: #ffffff !important;
    border: 1.5px solid rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.38) !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.expertise-hero-actions .btn-primary:hover {
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.52) !important;
    background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%) !important;
}

.expertise-hero-actions .btn-secondary {
    font-size: 1rem !important;
    font-weight: 700 !important;
    padding: 0.85rem 1.85rem !important;
    border-radius: 9999px !important;
    background: #ffffff !important;
    color: #1e3a8a !important;
    border: 2px solid #2563eb !important;
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.12) !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.expertise-hero-actions .btn-secondary:hover {
    background: #eff6ff !important;
    border-color: #1d4ed8 !important;
    color: #1d4ed8 !important;
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.22) !important;
}

.expertise-hero-actions .text-link {
    font-weight: 700 !important;
    color: #2563eb !important;
    text-decoration: underline !important;
    padding: 0.5rem 0.8rem;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    transition: all 0.2s ease;
}

.expertise-hero-actions .text-link:hover {
    background: rgba(37, 99, 235, 0.08);
    transform: translateY(-1px);
}

/* 2. Cartes d'Expertise : Affordance Cliquable Maximale */
.expertise-card {
    border: 1.5px solid rgba(15, 23, 42, 0.09) !important;
    border-radius: 14px !important;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05) !important;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.expertise-card:hover {
    border-color: #2563eb !important;
    box-shadow: 0 14px 32px rgba(37, 99, 235, 0.16) !important;
    transform: translateY(-4px) !important;
}

[data-theme="dark"] .expertise-card {
    border: 1.5px solid rgba(255, 255, 255, 0.12) !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
}

[data-theme="dark"] .expertise-card:hover {
    border-color: #60a5fa !important;
    box-shadow: 0 14px 32px rgba(37, 99, 235, 0.28) !important;
}

/* 3. Titre de Carte Cliquable */
.expertise-card h3 a.expertise-card-title-link {
    color: var(--text-primary) !important;
    text-decoration: none !important;
    font-weight: 700 !important;
    display: inline-block;
    transition: color 0.18s ease, transform 0.18s ease !important;
}

.expertise-card:hover h3 a.expertise-card-title-link {
    color: #2563eb !important;
    transform: translateX(3px);
}

[data-theme="dark"] .expertise-card:hover h3 a.expertise-card-title-link {
    color: #60a5fa !important;
}

/* 4. Boutons d'Action dans les Cartes (Fiche Détaillée) */
.expertise-card .btn-card-primary {
    width: 100% !important;
    height: 44px !important;
    padding: 0 1.25rem !important;
    font-size: 0.92rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.01em !important;
    border-radius: 9999px !important;
    background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%) !important;
    color: #ffffff !important;
    border: 1.5px solid rgba(255, 255, 255, 0.35) !important;
    box-shadow: 0 4px 14px rgba(29, 78, 216, 0.35) !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.5rem !important;
    text-decoration: none !important;
    white-space: nowrap !important;
    cursor: pointer !important;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.expertise-card .btn-card-primary:hover {
    background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%) !important;
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow: 0 8px 22px rgba(29, 78, 216, 0.52) !important;
    color: #ffffff !important;
}

.expertise-card .btn-card-primary span[aria-hidden="true"] {
    display: inline-block;
    transition: transform 0.2s ease !important;
    font-weight: 800 !important;
}

.expertise-card:hover .btn-card-primary span[aria-hidden="true"],
.expertise-card .btn-card-primary:hover span[aria-hidden="true"] {
    transform: translateX(4px) !important;
}

/* 5. Badge Pilule Prise en Charge Assurance */
.badge-prise-en-charge {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.45rem !important;
    font-size: 0.78rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.02em !important;
    color: #1e3a8a !important;
    background: #eef6ff !important;
    border: 1.5px solid #93c5fd !important;
    padding: 0.35rem 0.8rem !important;
    border-radius: 9999px !important;
    text-decoration: none !important;
    width: fit-content !important;
    margin-top: 0.5rem !important;
    box-shadow: 0 2px 6px rgba(37, 99, 235, 0.12) !important;
    cursor: pointer !important;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.badge-prise-en-charge:hover {
    background: #2563eb !important;
    border-color: #1d4ed8 !important;
    color: #ffffff !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.38) !important;
}

.badge-prise-en-charge:hover svg {
    fill: #ffffff !important;
}

[data-theme="dark"] .badge-prise-en-charge {
    color: #93c5fd !important;
    background: rgba(30, 58, 138, 0.35) !important;
    border-color: rgba(147, 197, 253, 0.45) !important;
}

[data-theme="dark"] .badge-prise-en-charge:hover {
    background: #2563eb !important;
    border-color: #93c5fd !important;
    color: #ffffff !important;
}

/* 6. Bouton Action Simulateur */
.btn-sim-action {
    background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%) !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    font-size: 0.95rem !important;
    padding: 0.85rem 1.75rem !important;
    border-radius: 9999px !important;
    border: 1.5px solid rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0 4px 16px rgba(29, 78, 216, 0.38) !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.5rem !important;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.btn-sim-action:hover {
    background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%) !important;
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow: 0 8px 24px rgba(29, 78, 216, 0.52) !important;
}
`;

css += affordanceBlock;
fs.writeFileSync(compPath, css, 'utf8');
console.log('Successfully updated css/components.css');
