# -*- coding: utf-8 -*-
"""
Regénération du ZIP de déploiement 1-clic Netlify Drop
"""
import os
import zipfile

src_dir = r"c:\Users\EFFICIENS ENERGIA\Desktop\ANTIGRAVITY\site_construction\DOSSIER_A_GLISSER_SUR_NETLIFY"
zip_path = r"c:\Users\EFFICIENS ENERGIA\Desktop\ANTIGRAVITY\site_construction\site_efficiens_energia.zip"

if os.path.exists(zip_path):
    os.remove(zip_path)

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(src_dir):
        if '.git' in dirs:
            dirs.remove('.git')
        for f in files:
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, src_dir)
            zf.write(full_path, rel_path)

print("ZIP genere avec succes :", os.path.getsize(zip_path), "octets")
