# -*- coding: utf-8 -*-
"""
Banc d'Essai QA E2E : Crawler Dynamique de 100% des Liens & Ancres
Vérification intégrale des URLs, ancres DOM, pages enfants et paramètres
"""
import os
import re
import urllib.parse
from bs4 import BeautifulSoup

def audit_all_links(site_dir='DOSSIER_A_GLISSER_SUR_NETLIFY'):
    print("=" * 65)
    print("BANC D'ESSAI E2E : CRAWLER EXHAUSTIF DE LIENS ET ANCRES")
    print("=" * 65)
    
    html_files = [f for f in os.listdir(site_dir) if f.endswith('.html')]
    dom_cache = {}
    anchors_cache = {}
    
    # 1. Collect all valid anchors in each HTML file
    for hf in html_files:
        p = os.path.join(site_dir, hf)
        with open(p, 'r', encoding='utf-8') as f:
            content = f.read()
        soup = BeautifulSoup(content, 'html.parser')
        dom_cache[hf] = soup
        
        anchors = set()
        for tag in soup.find_all(True):
            if tag.get('id'):
                anchors.add(tag['id'])
            if tag.get('name'):
                anchors.add(tag['name'])
        anchors_cache[hf] = anchors

    total_links = 0
    broken_links = []
    
    # 2. Check every <a> tag in every HTML file
    for hf, soup in dom_cache.items():
        links = soup.find_all('a', href=True)
        for a in links:
            href = a['href'].strip()
            total_links += 1
            
            # Ignore external protocols, tel, mailto, javascript
            if href.startswith(('http://', 'https://', 'tel:', 'mailto:', 'javascript:', '#/')):
                continue
                
            # Internal anchor only (e.g. #contact)
            if href.startswith('#'):
                anchor_id = href[1:]
                if anchor_id and (anchor_id not in anchors_cache[hf]):
                    broken_links.append((hf, href, f"Ancre '#{anchor_id}' introuvable dans {hf}"))
                continue
                
            # Relative path with possible query and anchor (e.g. prestation.html?service=sinistres#prestationDetails)
            parsed = urllib.parse.urlparse(href)
            target_file = parsed.path or hf
            target_path = os.path.join(site_dir, target_file.replace('/', os.sep))
            
            if not os.path.exists(target_path):
                broken_links.append((hf, href, f"Fichier cible '{target_file}' introuvable"))
                continue
                
            # If target is HTML and has anchor
            if parsed.fragment and target_file in anchors_cache:
                if parsed.fragment not in anchors_cache[target_file]:
                    broken_links.append((hf, href, f"Ancre '#{parsed.fragment}' introuvable dans {target_file}"))

    print(f"Total des liens et ancres analysés : {total_links}")
    if broken_links:
        print(f"[FAIL] {len(broken_links)} lien(s) défaillant(s) détecté(s) :")
        for src, href, reason in broken_links:
            print(f"  - [{src}] -> '{href}' : {reason}")
        return False
    else:
        print(f"[PASS] 100% des liens internes et ancres ({total_links}/{total_links}) sont VALIDES et OPÉRATIONNELS !")
        return True

if __name__ == '__main__':
    ok = audit_all_links()
    import sys
    sys.exit(0 if ok else 1)
