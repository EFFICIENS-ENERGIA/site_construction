// ==========================================================================
// SIMULATEUR D'ESTIMATION TARIFAIRE INDICATIVE — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    window.calculateIndicativeFee = function(params) {
        const { domain, propertyType, surface, deliverable, emergency } = params;

        let baseMin = 450;
        let baseMax = 650;

        switch (domain) {
            case 'sinistre':
                baseMin = 500; baseMax = 780; break;
            case 'visite_achat':
                baseMin = 420; baseMax = 620; break;
            case 'dpe_contestation':
                baseMin = 390; baseMax = 590; break;
            case 'energies_renouvelables':
                baseMin = 550; baseMax = 890; break;
            case 'performance_energetique':
                baseMin = 520; baseMax = 790; break;
            case 'incendie':
                baseMin = 650; baseMax = 1100; break;
            case 'industriel':
                baseMin = 850; baseMax = 1500; break;
            case 'protection_juridique':
                baseMin = 480; baseMax = 720; break;
            default:
                baseMin = 450; baseMax = 650;
        }

        if (propertyType === 'maison') {
            baseMin += 40; baseMax += 60;
        } else if (propertyType === 'professionnel') {
            baseMin += 200; baseMax += 350;
        }

        if (surface === '100_200') {
            baseMin += 50; baseMax += 80;
        } else if (surface === 'sup_200') {
            baseMin += 120; baseMax += 180;
        }

        if (deliverable === 'contradictoire_probant') {
            baseMin += 80; baseMax += 120;
        }

        if (emergency) {
            baseMin = Math.round(baseMin * 1.15);
            baseMax = Math.round(baseMax * 1.15);
        }

        return {
            minPrice: Math.round(baseMin),
            maxPrice: Math.round(baseMax),
            currency: '€ TTC',
            disclaimer: "Forfait global mission · Analyse contradictoire et rapport technique probant inclus · Estimation indicative sans engagement."
        };
    };
})();
