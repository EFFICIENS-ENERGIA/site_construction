// Simulateur d'estimation tarifaire indicative pour EFFICIENS ENERGIA
function calculateEstimatedCost(serviceType, propertyType) {
    let basePrice = 350;
    
    if (serviceType === 'sinistre') basePrice = 450;
    else if (serviceType === 'dpe_contestation') basePrice = 380;
    else if (serviceType === 'visite_achat') basePrice = 400;
    else if (serviceType === 'industriel') basePrice = 750;

    if (propertyType === 'maison') basePrice += 50;
    else if (propertyType === 'professionnel') basePrice += 200;

    return basePrice;
}
