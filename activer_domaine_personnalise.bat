@echo off
title EFFICIENS ENERGIA - Activation Domaine efficiens-energia.fr
echo ============================================================
echo   ACTIVATION DU DOMAINE PERSONNALISE : efficiens-energia.fr
echo ============================================================
echo.
echo Configuration du domaine efficiens-energia.fr sur GitHub Pages...
gh api repos/EFFICIENS-ENERGIA/site_construction/pages -X PUT -f cname="efficiens-energia.fr"
echo.
echo Verification du statut :
gh api repos/EFFICIENS-ENERGIA/site_construction/pages
echo.
echo ============================================================
echo  TERMINE ! Des que vos DNS sont propages chez votre registrar,
echo  votre site repondra directement sur https://efficiens-energia.fr
echo ============================================================
pause
