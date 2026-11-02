# -*- coding: utf-8 -*-
from playwright.sync_api import sync_playwright
import os

repo_dir = r"c:\Users\EFFICIENS ENERGIA\Desktop\ANTIGRAVITY\site_construction"
html_url = "file:///" + os.path.join(repo_dir, "index.html").replace("\\", "/")

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        headless=True
    )
    
    # Desktop - scroll to cards buttons
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto(html_url)
    page.wait_for_timeout(800)
    page.evaluate("document.querySelector('.btn-card-primary').scrollIntoView({block: 'center'});")
    page.wait_for_timeout(400)
    page.screenshot(path=os.path.join(repo_dir, "preview_cards_cta.png"))
    print("Cards CTA screenshot captured")

    browser.close()
