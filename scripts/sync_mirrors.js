const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');

const filesToSync = [
    'index.html',
    'sw.js',
    'css/components.css',
    'js/app.js',
    'js/emergency_247.js',
    'js/cookie_banner.js'
];

const mirrorDirs = [
    path.join(root, 'DOSSIER_A_GLISSER_SUR_NETLIFY'),
    path.join(root, 'projet training site internet', 'site_construction'),
    path.join(root, 'DOSSIER_A_GLISSER_SUR_NETLIFY', 'projet training site internet', 'site_construction')
];

function getHash(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const buf = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('--- SYNCING MIRRORS ---');
for (const relFile of filesToSync) {
    const srcFile = path.join(root, relFile);
    if (!fs.existsSync(srcFile)) {
        console.warn('Source does not exist:', srcFile);
        continue;
    }
    const srcHash = getHash(srcFile);

    for (const mDir of mirrorDirs) {
        if (!fs.existsSync(mDir)) continue;
        const destFile = path.join(mDir, relFile);
        const destDir = path.dirname(destFile);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

        fs.copyFileSync(srcFile, destFile);
        const destHash = getHash(destFile);
        if (destHash === srcHash) {
            console.log(`[PARITY OK] ${relFile} -> ${path.relative(root, destFile)}`);
        } else {
            console.error(`[HASH MISMATCH] ${relFile} -> ${path.relative(root, destFile)}`);
        }
    }
}
console.log('--- SYNC COMPLETE ---');
