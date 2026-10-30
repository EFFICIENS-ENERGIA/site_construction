# -*- coding: utf-8 -*-
"""
Script de synchronisation propre vers DOSSIER_A_GLISSER_SUR_NETLIFY (Repo Git)
"""
import os
import shutil

src_dir = r"c:\Users\EFFICIENS ENERGIA\Desktop\ANTIGRAVITY\site_construction\projet training site internet\site_construction"
dst_dir = r"c:\Users\EFFICIENS ENERGIA\Desktop\ANTIGRAVITY\site_construction\DOSSIER_A_GLISSER_SUR_NETLIFY"

items_to_copy = [
    "index.html",
    "prestation.html",
    "informations-legales.html",
    "Dossier_Prestations_EFFICIENS_ENERGIA.pdf",
    "CNAME",
    "manifest.webmanifest",
    "sw.js",
    "vercel.json",
    "netlify.toml",
    "Technical_Specification.md",
    "README.md",
    "assets",
    "css",
    "js"
]

for item in items_to_copy:
    src_item = os.path.join(src_dir, item)
    dst_item = os.path.join(dst_dir, item)
    if os.path.isdir(src_item):
        if os.path.exists(dst_item):
            shutil.rmtree(dst_item)
        shutil.copytree(src_item, dst_item)
        print("Dossier copie :", item)
    elif os.path.isfile(src_item):
        shutil.copy2(src_item, dst_item)
        print("Fichier copie :", item)

print("Synchronisation terminee avec succes.")
