/**
 * 🔀 Curseur Interactif Avant / Après — BÂTI-EXCELLENCE Pro
 * Permet de comparer visuellement les réalisations de rénovation en temps réel.
 * Compatible navigation souris, glisser-déposer tactile et accessibilité clavier.
 */
const BatiBeforeAfter = {
    init() {
        const containers = document.querySelectorAll('.before-after-container');
        containers.forEach(container => this.setupSlider(container));
    },

    setupSlider(container) {
        const slider = container.querySelector('.ba-slider');
        const beforeLayer = container.querySelector('.ba-before-layer');
        const handle = container.querySelector('.ba-handle');

        if (!slider || !beforeLayer || !handle) return;

        let isDragging = false;

        const updatePosition = (clientX) => {
            const rect = container.getBoundingClientRect();
            let posX = clientX - rect.left;
            // Clamping entre 0% et 100%
            posX = Math.max(0, Math.min(posX, rect.width));
            const percentage = (posX / rect.width) * 100;

            beforeLayer.style.width = percentage + '%';
            handle.style.left = percentage + '%';
            slider.value = percentage;
        };

        // Événements de souris
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            updatePosition(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updatePosition(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Événements tactiles
        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            if (e.touches && e.touches[0]) {
                updatePosition(e.touches[0].clientX);
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            if (e.touches && e.touches[0]) {
                updatePosition(e.touches[0].clientX);
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Curseur input range (accessibilité clavier)
        slider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            beforeLayer.style.width = val + '%';
            handle.style.left = val + '%';
        });
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BatiBeforeAfter;
}
