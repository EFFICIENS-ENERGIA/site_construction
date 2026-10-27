// Sommaire interactif & Estimation du temps de lecture pour prestation.html
function initTocAndReadingTime() {
    const article = document.querySelector('main') || document.body;
    const text = article.innerText || article.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    const badge = document.createElement('div');
    badge.className = 'reading-time-badge';
    badge.style.cssText = 'font-size:0.85rem; color:#64748b; margin-bottom:1rem;';
    badge.innerHTML = `⏱️ Temps de lecture estimé : <strong>${readingTimeMinutes} min</strong>`;

    const h1 = document.querySelector('h1');
    if (h1) h1.parentNode.insertBefore(badge, h1.nextSibling);
}
document.addEventListener('DOMContentLoaded', initTocAndReadingTime);
