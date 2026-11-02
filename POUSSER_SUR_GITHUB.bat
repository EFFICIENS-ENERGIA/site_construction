@echo off
title EFFICIENS ENERGIA - Deploiement GitHub Pages
echo ============================================================
echo   CREATION DU DEPOT ET DEPLOIEMENT GITHUB PAGES
echo ============================================================
echo.
cd /d "c:\Users\EFFICIENS ENERGIA\Desktop\ANTIGRAVITY\site_construction\DOSSIER_A_GLISSER_SUR_NETLIFY"

echo Creation du depot distant 'site_construction' sur votre compte GitHub...
gh repo create site_construction --public --source=. --remote=origin --push

echo.
echo Activation de GitHub Pages...
gh api repos/:owner/site_construction/pages -X POST -f source="{\"branch\":\"main\",\"path\":\"/\"}"

echo.
echo ============================================================
echo   DEPLOIEMENT EN COURS SUR GITHUB PAGES !
echo ============================================================
pause