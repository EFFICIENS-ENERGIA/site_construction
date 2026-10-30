# 🚀 Lanceur Local du Site EFFICIENS ENERGIA
# Démarre le serveur local et lance le navigateur avec rechargement propre

$port = 8089
$sitePath = Join-Path $PSScriptRoot "site_construction"
$url = "http://localhost:$port/index.html"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " 🌐 LANCEMENT DU SITE EFFICIENS ENERGIA (EXPERTISE & AUDIT)" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "• Dossier source : $sitePath"
Write-Host "• URL Locale     : $url"
Write-Host "• URL Web Public : https://efficiens-energia.github.io/site_construction/"

# 1. Libérer le port 8089 s'il était déjà occupé
$oldConn = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($oldConn) {
    Write-Host "• Libération de l'ancien serveur sur le port $port..." -ForegroundColor Yellow
    foreach ($c in $oldConn) {
        Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Milliseconds 500
}

# 2. Détection du binaire Python
$pythonCmd = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $pythonCmd -and (Test-Path "C:\Program Files\LibreOffice\program\python.exe")) {
    $pythonCmd = "C:\Program Files\LibreOffice\program\python.exe"
}

if ($pythonCmd) {
    Write-Host "• Démarrage du serveur HTTP local sur le port $port ($pythonCmd)..." -ForegroundColor Green
    $proc = Start-Process -FilePath $pythonCmd -ArgumentList "-m", "http.server", "$port", "--directory", "$sitePath" -PassThru -WindowStyle Hidden
    Start-Sleep -Seconds 1
    Start-Process $url
    Write-Host "• Navigateur ouvert ! Appuyez sur Entrée pour arrêter le serveur." -ForegroundColor Cyan
    Read-Host
    if ($proc -and -not $proc.HasExited) {
        Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
    }
} else {
    $fileUrl = "file:///" + ($sitePath.Replace('\', '/') + "/index.html")
    Write-Host "• Ouverture directe du fichier dans le navigateur : $fileUrl" -ForegroundColor Green
    Start-Process $fileUrl
}
