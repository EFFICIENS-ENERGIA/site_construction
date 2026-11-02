@echo off
title EFFICIENS ENERGIA - Deploiement 1-Clic
echo ============================================================
echo   MISE EN LIGNE DU SITE EFFICIENS ENERGIA (CONSTRUCTION BTP)
echo ============================================================
echo.
echo 1. Ouverture de Netlify Drop dans votre navigateur...
echo 2. Selection automatique du fichier ZIP pret a deployer.
echo.
echo ASTUCE INFALLIBLE :
echo - Si le glisser-deposer d'un dossier bloque dans votre navigateur,
echo   glissez simplement le fichier : site_efficiens_energia.zip
echo - Verifiez egalement que vous etes bien connecte a votre compte Netlify !
echo.
start "" "https://app.netlify.com/drop"
explorer.exe /select,"%~dp0site_efficiens_energia.zip"
pause