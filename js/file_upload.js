// Module de dépôt sécurisé de pièces justificatives (photos, devis, DPE)
function initFileUploadZone(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="upload-dropzone" style="border: 2px dashed #cbd5e1; padding: 2rem; border-radius: 8px; text-align: center; cursor: pointer;">
            <p style="margin: 0; font-size: 0.95rem; color: #475569;">Glissez-déposez vos photos ou documents de désordres ici</p>
            <input type="file" id="file-input" multiple accept="image/*,.pdf" style="display: none;">
            <div id="file-preview-list" style="margin-top: 1rem; text-align: left;"></div>
        </div>
    `;

    const dropzone = container.querySelector('.upload-dropzone');
    const fileInput = container.querySelector('#file-input');
    const previewList = container.querySelector('#file-preview-list');

    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        previewList.innerHTML = '';
        Array.from(e.target.files).forEach(file => {
            const item = document.createElement('div');
            item.textContent = `📎 ${file.name} (${Math.round(file.size / 1024)} Ko)`;
            previewList.appendChild(item);
        });
    });
}
