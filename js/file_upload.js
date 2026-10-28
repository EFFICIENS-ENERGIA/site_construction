// ==========================================================================
// ZONE DE GLISSER-DÉPOSER DE PIÈCES JUSTIFICATIVES — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    window.initFileUploadZone = function(containerId) {
        const container = document.getElementById(containerId);
        if (!container || container.dataset.initialized === 'true') return;
        container.dataset.initialized = 'true';

        container.innerHTML = `
            <div class="upload-dropzone" style="border:2px dashed #94a3b8;border-radius:10px;padding:1.5rem 1rem;text-align:center;background:#f8fafc;cursor:pointer;transition:all 0.25s ease;">
                <input type="file" id="dropzone-file-input" name="pieces_justificatives" multiple accept="image/*,.pdf" style="display:none;" />
                <div style="font-size:2rem;margin-bottom:0.35rem;" aria-hidden="true">📎</div>
                <p style="margin:0;font-size:0.95rem;font-weight:600;color:#1e293b;">Glissez-déposez vos photos de désordres, devis ou DPE ici</p>
                <p style="margin:4px 0 0 0;font-size:0.82rem;color:#64748b;">ou cliquez pour parcourir vos fichiers (PDF, JPG, PNG, WEBP · Max 10 Mo par document)</p>
                <button type="button" class="btn-file-browse" style="margin-top:10px;padding:7px 16px;background:#1e3a8a;color:#ffffff;border:none;border-radius:6px;font-size:0.85rem;font-weight:600;cursor:pointer;transition:background 0.2s;">Sélectionner des fichiers</button>
                <div id="dropzone-preview-list" style="margin-top:0.85rem;text-align:left;display:flex;flex-direction:column;gap:8px;"></div>
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
                    alert('Le fichier ' + file.name + ' dépasse la taille limite de 10 Mo.');
                    return;
                }
                const row = document.createElement('div');
                row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;background:#ffffff;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.85rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);';
                const sizeKb = Math.round(file.size / 1024);
                row.innerHTML = `
                    <span style="color:#1e293b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:82%;">📄 <strong>${file.name}</strong> <span style="color:#64748b;">(${sizeKb} Ko)</span></span>
                    <button type="button" style="background:none;border:none;color:#ef4444;cursor:pointer;font-weight:bold;font-size:1.1rem;padding:0 4px;" title="Retirer">×</button>
                `;
                row.querySelector('button').addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    row.remove();
                });
                previewList.appendChild(row);
            });
        }
    };

    // Auto-initialisation si l'élément existe dans la page
    function autoInit() {
        if (document.getElementById('fileUploadContainer')) {
            window.initFileUploadZone('fileUploadContainer');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        autoInit();
    }
})();
