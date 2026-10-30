# -*- coding: utf-8 -*-
"""
Banc de test UI/UX & Design System - Entrainement continu de l'agent @UIX
Verification des regles ARIA, modales et attributs de securite HTML
Compatible Python 3.5+
"""
import sys
import os

def run_tests():
    files = ['travel_dashboard.html', 'index.html']
    for f in files:
        if not os.path.exists(f):
            print('[FAIL] Fichier manquant: ' + f)
            return False

    with open('travel_dashboard.html', 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # Assertion 1 : Presence de la modale native #hotelDetailModal
    assert 'id="hotelDetailModal"' in html, 'La modale #hotelDetailModal est absente'
    print('[PASS] Assertion 1 UIX: Modale #hotelDetailModal detectee')

    # Assertion 2 : Attributs ARIA pour l accessibilite
    assert 'role="dialog"' in html, 'L attribut role=dialog est manquant'
    assert 'aria-modal="true"' in html, 'L attribut aria-modal=true est manquant'
    print('[PASS] Assertion 2 UIX: Attributs d accessibilite ARIA valides')

    # Assertion 3 : Fonction de fermeture in-app
    assert 'closeHotelDetailModal()' in html, 'La fonction de fermeture closeHotelDetailModal est manquante'
    print('[PASS] Assertion 3 UIX: Controleur de fermeture modale present')

    # Assertion 4 : Securite des liens sortants (rel=noopener noreferrer)
    assert 'noopener noreferrer' in html, 'Absence de securisation noopener noreferrer sur les liens'
    print('[PASS] Assertion 4 UIX: Securisation noopener noreferrer conforme')

    print('[PASS] Toutes les assertions UIX (4/4) sont validees avec succes.')
    return True

if __name__ == '__main__':
    try:
        success = run_tests()
        sys.exit(0 if success else 1)
    except Exception as e:
        print('[FAIL] Exception UIX: ' + str(e))
        sys.exit(1)
