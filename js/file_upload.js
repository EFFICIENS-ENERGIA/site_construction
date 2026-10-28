// ==========================================================================
// ZONE DE GLISSER-DÉPOSER DE PIÈCES JUSTIFICATIVES — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    window.initFileUploadZone = function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="upload-dropzone" style="border:2px dashed #94a3b8;border-radius:10px;padding:1.5rem;text-align:center;background:#f8fafc;cursor:pointer;transition:border-color 0.2s, background 0.2s;">
                <input type="file" id="dropzone-file-input" multiple accept="image/*,.pdf" style="display:none;" />
                <div style="font-size:1.8rem;margin-bottom:0.5rem;">📁</div>
                <p style="margin:0;font-size:0.95rem;font-weight:600;color:#1e293b;">Glissez-déposez vos photos de désordres, devis ou DPE</p>
                <p style="margin:4px 0 0 0;font-size:0.82rem;color:#64748b;">Formats acceptés : PDF, JPG, PNG, WEBP (Max 10 Mo par fichier)</p>
                <button type="button" class="btn-file-browse" style="margin-top:12px;padding:6px 14px;background:#1e3a8a;color:#fff;border:none;border-radius:6px;font-size:0.85rem;cursor:pointer;">Parcourir mes fichiers</button>
                <div id="dropzone-preview-list" style="margin-top:1rem;text-align:left;display:flex;flex-direction:column;gap:8px;"></div>
            </div>
        `;

        const dropzone = container.querySelector('.upload-dropzone');
        const fileInput = container.querySelector('#dropzone-file-input');
        const browseBtn = container.querySelector('.btn-file-browse');
        const previewList = container.querySelector('#dropzone-preview-list');

        browseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            fileInput.click();
        });

        dropzone.addEventListener('click', () => fileInput.click());

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.style.borderColor = '#1e3a8a';
                dropzone.style.background = '#eff6ff';
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.style.borderColor = '#94a3b8';
                dropzone.style.background = '#f8fafc';
            });
        });

        dropzone.addEventListener('drop', (e) => {
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleFiles(e.dataTransfer.files);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                handleFiles(e.target.files);
            }
        });

        function handleFiles(files) {
            Array.from(files).forEach(file => {
                if (file.size > 10 * 1024 * 1024) {
                    alert(`Le fichier ${file.name} dépasse la taille limite de 10 Mo.`);
                    return;
                }
                const row = document.createElement('div');
                row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;background:#fff;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:0.85rem;';
                const sizeKb = Math.round(file.size / 1024);
                row.innerHTML = `
                    <span style="color:#1e293b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:80%;">📄 <strong>${file.name}</strong> (${sizeKb} Ko)</span>
                    <button type="button" style="background:none;border:none;color:#ef4444;cursor:pointer;font-weight:bold;font-size:1rem;" title="Retirer">×</button>
                `;
                row.querySelector('button').addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    row.remove();
                });
                previewList.appendChild(row);
            });
        }
    };
})();
