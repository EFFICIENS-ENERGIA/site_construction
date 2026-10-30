# -*- coding: utf-8 -*-
"""
Mise à jour d'audit_site_construction.py pour supporter prestation.html, CNAME, et WhatsApp.
"""
import os

script_path = r"c:\Users\EFFICIENS ENERGIA\Desktop\ANTIGRAVITY\site_construction\projet training site internet\scripts\audit_site_construction.py"

with open(script_path, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Ajout de prestation.html et CNAME dans required_files
old_req = """        'assets/services/incendie-dommages.svg',
        'assets/services/diagnostic-conteste.svg'
    ]"""

new_req = """        'assets/services/incendie-dommages.svg',
        'assets/services/diagnostic-conteste.svg',
        'prestation.html',
        'CNAME'
    ]"""

if "'prestation.html'" not in code and old_req in code:
    code = code.replace(old_req, new_req)

# 2. Adaptation des tests de liens détaillés
old_sinistre = """    has_sinistre_details = (
        'href="#sinistres-details"' in index_html
        and 'aria-label="En savoir plus sur les sinistres et dommages à la construction"' in index_html
        and 'id="sinistres-details"' in index_html
        and 'Comprendre les désordres, documenter les dommages' in index_html
        and 'faits observés, les analyses et leurs limites' in index_html
    )"""

new_sinistre = """    has_sinistre_details = (
        ('href="#sinistres-details"' in index_html or 'prestation.html?service=sinistres' in index_html)
        and ('aria-label="En savoir plus sur les sinistres et dommages à la construction"' in index_html or 'prestation.html?service=sinistres' in index_html)
        and 'id="sinistres-details"' in index_html
        and 'Comprendre les désordres, documenter les dommages' in index_html
        and 'faits observés, les analyses et leurs limites' in index_html
    )"""

if old_sinistre in code:
    code = code.replace(old_sinistre, new_sinistre)

old_service_links = """    service_detail_links = re.findall(
        r'<a href="#([^"]+-details)" class="btn btn-secondary (?:sinistre-more-link|service-more-link)"',
        index_html
    )
    service_detail_targets = re.findall(r'<section class="section (?:sinistre-details-section|service-details-section)" id="([^"]+)"', index_html)
    has_all_service_details = len(service_detail_links) == 6 and set(service_detail_links) == set(service_detail_targets)"""

new_service_links = """    service_detail_links = re.findall(
        r'<a href="(?:prestation\.html\?service=[^"]+|#[^"]+-details)" class="btn btn-secondary (?:sinistre-more-link|service-more-link)"',
        index_html
    )
    has_all_service_details = len(service_detail_links) >= 6 and os.path.isfile(os.path.join(base_dir, 'prestation.html'))"""

if old_service_links in code:
    code = code.replace(old_service_links, new_service_links)

# 3. Ajout de l'assertion WhatsApp et Domaine Personnalisé
wa_assertion = """    # --- TEST WHATSAPP & DOMAINE ---
    has_whatsapp_and_cname = (
        ('wa.me/33778246567' in index_html or '07 78 24 65 67' in index_html)
        and 'api.whatsapp.com/send' in index_html
        and os.path.isfile(os.path.join(base_dir, 'CNAME'))
        and 'efficiens-energia.fr' in index_html
    )
    assertions_count += 1
    if not log_test('Partage WhatsApp & Domaine personnalise efficiens-energia.fr', has_whatsapp_and_cname):
        all_passed = False
"""

anchor = "# --- TEST 5 : Audit de Resilience & PWA Service Worker ---"
if "has_whatsapp_and_cname" not in code and anchor in code:
    code = code.replace(anchor, wa_assertion + "\n    " + anchor)

with open(script_path, "w", encoding="utf-8") as f:
    f.write(code)

print("audit_site_construction.py mis a jour avec succes.")
