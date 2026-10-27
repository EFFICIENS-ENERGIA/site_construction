// Générateur dynamique de Fil d'Ariane (Breadcrumb) sémantique
function renderBreadcrumb(serviceName) {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Fil d\'Ariane');
    nav.style.cssText = 'padding: 8px 0; font-size: 0.85rem; color: #64748b;';
    
    nav.innerHTML = `
        <a href="index.html" style="color: #1e3a8a; text-decoration: none;">Accueil</a> &gt; 
        <a href="index.html#expertises" style="color: #1e3a8a; text-decoration: none;">Expertises</a> &gt; 
        <span>${serviceName || 'Détail prestation'}</span>
    `;
    
    const header = document.querySelector('header') || document.body.firstChild;
    header.parentNode.insertBefore(nav, header.nextSibling);
}
