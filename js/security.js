/**
 * 🛡️ Module de Sécurité & Désinfection — BÂTI-EXCELLENCE Pro
 * Protection stricte contre les failles XSS, injections HTML et données corrompues.
 */
const BatiSecurity = {
    /**
     * Échappe rigoureusement tous les caractères dangereux pour l'injection HTML.
     * @param {string} str Chaîne à désinfecter
     * @returns {string} Chaîne sécurisée
     */
    escapeHtml(str) {
        if (str === null || str === undefined) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
            '/': '&#x2F;',
            '`': '&#x60;'
        };
        return String(str).replace(/[&<>"'`\/]/g, (s) => map[s]);
    },

    /**
     * Échappe une valeur pour injection sécurisée dans un attribut HTML.
     */
    escapeAttr(str) {
        return this.escapeHtml(str);
    },

    /**
     * Valide et nettoie un nombre flottant dans une plage donnée.
     */
    sanitizeNumber(val, min = 0, max = 10000000, defaultVal = 0) {
        const num = parseFloat(val);
        if (isNaN(num) || !isFinite(num)) return defaultVal;
        return Math.min(Math.max(num, min), max);
    },

    /**
     * Valide la structure d'un code postal français (5 chiffres).
     */
    isValidPostalCode(cp) {
        return /^[0-9]{5}$/.test(String(cp).trim());
    },

    /**
     * Valide un format d'adresse email standard.
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
    },

    /**
     * Valide un numéro de téléphone français standard.
     */
    isValidPhone(phone) {
        return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(String(phone).trim());
    }
};

// Export pour environnements navigateurs et modules Node / bancs d'essai
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BatiSecurity;
}
