const prestations = {
    sinistres: {
        category: 'Sinistres & dommages à la construction',
        title: 'Comprendre les désordres, documenter les dommages.',
        summary: 'Une analyse technique indépendante aide à décrire la situation, à examiner les éléments disponibles et à clarifier les points qui restent à vérifier.',
        image: 'assets/services/sinistres-construction.jpg',
        imageAlt: 'Intérieur d’un logement endommagé, avec des éléments de plafond et de cloison détériorés',
        detailTitle: 'Un regard indépendant sur les dommages et désordres',
        detailIntro: 'Chaque dossier est examiné selon son contexte, les éléments disponibles et les constats convenus avec vous.',
        context: 'La nature du dommage, son évolution et le contexte des travaux sont des éléments utiles à documenter. Les garanties de construction répondent à des critères précis : une analyse technique décrit les faits sans préjuger de la prise en charge.',
        sources: [
            {
                label: 'Service-Public.fr — garantie décennale',
                url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2034'
            },
            {
                label: 'Agence Qualité Construction — ressources techniques',
                url: 'https://www.qualiteconstruction.com/'
            }
        ],
        details: [
            {
                label: '01 / Situations',
                title: 'Des dommages et désordres variés',
                description: 'Infiltrations, dégâts des eaux, humidité, fissures, mouvements d’ouvrage, malfaçons ou dommages apparus après des travaux peuvent être concernés.'
            },
            {
                label: '02 / Analyse',
                title: 'Des constats replacés dans leur contexte',
                description: 'Les pièces communiquées et les observations convenues sont examinées pour décrire les désordres, confronter les hypothèses techniques et préciser les investigations utiles.'
            },
            {
                label: '03 / Restitution',
                title: 'Une lecture claire des éléments établis',
                description: 'La restitution distingue les faits observés, les analyses et leurs limites. Le périmètre et les livrables sont définis avec vous avant l’intervention.'
            }
        ],
        scope: 'L’analyse technique éclaire les éléments du dossier et ne se substitue ni aux décisions de l’assureur ni à un conseil juridique.'
    },
    industrie: {
        category: 'Expertise industrielle',
        title: 'Analyser les dommages aux locaux et équipements.',
        summary: 'Un examen indépendant des locaux professionnels, des équipements ou des installations touchés par un incident ou un désordre.',
        image: 'assets/services/expertise-industrielle.jpg',
        imageAlt: 'Deux techniciens en intervention sur une installation industrielle',
        detailTitle: 'Une expertise adaptée à votre activité',
        detailIntro: 'L’examen tient compte de la nature des installations, des dommages signalés et des éléments techniques accessibles.',
        context: 'Les équipements et leurs conditions d’exploitation sont souvent liés. L’historique de maintenance, les documents techniques et le déroulement de l’incident peuvent aider à replacer les constats dans leur contexte.',
        sources: [
            {
                label: 'INRS — organisation de la maintenance',
                url: 'https://www.inrs.fr/risques/maintenance/ce-qu-il-faut-retenir.html'
            }
        ],
        details: [
            {
                label: '01 / Périmètre',
                title: 'Bâtiments et équipements professionnels',
                description: 'La mission peut concerner des locaux, des équipements ou des installations professionnelles touchés par un incident ou un désordre.'
            },
            {
                label: '02 / Examen',
                title: 'Décrire les défaillances observées',
                description: 'Les constats disponibles sont rapprochés du contexte et des documents transmis afin de caractériser les atteintes et leurs conséquences techniques.'
            },
            {
                label: '03 / Suite',
                title: 'Préciser les vérifications utiles',
                description: 'Les investigations envisageables et les limites de l’analyse sont définies en fonction de l’accès aux installations et du périmètre convenu.'
            }
        ],
        scope: 'Les accès aux locaux et équipements ainsi que les conditions de sécurité nécessaires sont à convenir avant toute visite.'
    },
    renouvelables: {
        category: 'Énergies renouvelables',
        title: 'Examiner les installations et leurs performances.',
        summary: 'Une analyse des désordres ou des écarts de fonctionnement signalés sur les équipements de production et les systèmes énergétiques.',
        image: 'assets/services/energies-renouvelables.jpg',
        imageAlt: 'Deux professionnels examinent des panneaux photovoltaïques',
        detailTitle: 'Faire le point sur votre installation énergétique',
        detailIntro: 'L’analyse porte sur les équipements concernés, leur fonctionnement signalé et les éléments techniques disponibles.',
        context: 'Une installation photovoltaïque comprend plusieurs éléments, notamment les panneaux et l’onduleur, parfois complétés par un système de stockage. Les examiner séparément aide à décrire les anomalies signalées sans présumer de leur origine.',
        sources: [
            {
                label: 'Service-Public.fr — installation de panneaux solaires',
                url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F31487'
            },
            {
                label: 'Agence Qualité Construction — ressources techniques',
                url: 'https://www.qualiteconstruction.com/'
            }
        ],
        details: [
            {
                label: '01 / Installations',
                title: 'Solaire et systèmes thermiques',
                description: 'Selon le dossier, les équipements examinés peuvent inclure des installations solaires, photovoltaïques, des pompes à chaleur ou d’autres systèmes thermiques.'
            },
            {
                label: '02 / Analyse',
                title: 'Mettre les écarts en contexte',
                description: 'Les éléments techniques accessibles et les documents disponibles sont étudiés pour décrire le fonctionnement signalé et les écarts constatés.'
            },
            {
                label: '03 / Cadrage',
                title: 'Définir les constats réalisables',
                description: 'Les mesures, accès et investigations utiles sont précisés avant la mission ; aucune performance n’est présumée sans vérification adaptée.'
            }
        ],
        scope: 'Les vérifications dépendent des équipements accessibles, des données disponibles et des conditions de mesure définies pour la mission.'
    },
    performance: {
        category: 'Performance énergétique des bâtiments',
        title: 'Comprendre l’enveloppe et les équipements du bâtiment.',
        summary: 'Une analyse des caractéristiques techniques pouvant contribuer au confort du bâtiment ou à ses consommations.',
        image: 'assets/services/performance-energetique.jpg',
        imageAlt: 'Façade d’un bâtiment en cours de rénovation énergétique avec son isolation extérieure',
        detailTitle: 'Mieux comprendre le fonctionnement du bâtiment',
        detailIntro: 'L’analyse technique examine les caractéristiques du bâtiment et de ses équipements en tenant compte des informations accessibles.',
        context: 'Le DPE renseigne sur la consommation d’énergie et les émissions de gaz à effet de serre d’un logement ou d’un bâtiment. Une analyse technique complémentaire peut s’intéresser aux parois, aux équipements et aux conditions de fonctionnement, sans se substituer à la réalisation d’un DPE réglementaire.',
        sources: [
            {
                label: 'Ministère de la Transition écologique — comprendre le DPE',
                url: 'https://www.ecologie.gouv.fr/politiques-publiques/diagnostic-performance-energetique-dpe'
            },
            {
                label: 'Agence Qualité Construction — ressources techniques',
                url: 'https://www.qualiteconstruction.com/'
            }
        ],
        details: [
            {
                label: '01 / Enveloppe',
                title: 'Isolation et ponts thermiques',
                description: 'L’examen peut porter sur l’enveloppe, les parois et les éléments disponibles pour comprendre les transferts thermiques et les désordres associés.'
            },
            {
                label: '02 / Équipements',
                title: 'Chauffage, ventilation et régulation',
                description: 'Les systèmes et leur fonctionnement sont étudiés selon les pièces accessibles, les conditions d’usage décrites et le périmètre convenu.'
            },
            {
                label: '03 / Restitution',
                title: 'Présenter les constats et pistes possibles',
                description: 'La restitution distingue les observations des hypothèses et indique les limites de l’analyse.'
            }
        ],
        scope: 'L’analyse ne constitue pas une garantie de résultat énergétique et ne promet pas d’économies qui n’auraient pas été mesurées.'
    },
    incendie: {
        category: 'Incendie & dommages associés',
        title: 'Documenter les dommages après un incendie.',
        summary: 'Un constat indépendant des dommages visibles sur les ouvrages et équipements après un incendie ou un dégagement de fumées.',
        image: 'assets/services/incendie-dommages.png',
        imageAlt: 'Départ de feu sur le balcon d’un immeuble, avec des traces de fumée en façade',
        detailTitle: 'Évaluer les atteintes visibles et les suites utiles',
        detailIntro: 'L’intervention documente les dommages observables et les besoins éventuels de vérifications complémentaires.',
        context: 'Après un incendie, les atteintes visibles aux matériaux et aux équipements sont à distinguer des dommages qui nécessitent des vérifications complémentaires. Les ressources de l’AQC rassemblent des repères techniques pour prévenir et comprendre les désordres du bâtiment.',
        sources: [
            {
                label: 'Agence Qualité Construction — ressources techniques',
                url: 'https://www.qualiteconstruction.com/'
            },
            {
                label: 'Service-Public.fr — assurance dommages-ouvrage',
                url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2032'
            }
        ],
        details: [
            {
                label: '01 / Constats',
                title: 'Matériaux, ouvrages et équipements',
                description: 'Les atteintes visibles après un incendie ou un dégagement de fumées sont décrites, sous réserve des conditions de sécurité et d’accès.'
            },
            {
                label: '02 / Étendue',
                title: 'Repérer les zones à examiner',
                description: 'L’analyse documente les dommages observables et les points pouvant nécessiter des vérifications complémentaires par des intervenants compétents.'
            },
            {
                label: '03 / Dossier',
                title: 'Restituer les éléments techniques',
                description: 'Les constats et leurs limites sont présentés afin d’éclairer le dossier et les suites à envisager.'
            }
        ],
        scope: 'Toute visite est conditionnée à la sécurité et à l’accessibilité des lieux. L’expertise ne se substitue ni aux décisions de l’assureur ni à un conseil juridique.'
    },
    diagnostics: {
        category: 'Diagnostics immobiliers contestés',
        title: 'Analyser un diagnostic existant mis en cause.',
        summary: 'Un examen technique indépendant d’un diagnostic immobilier contesté ou susceptible de l’être par un tiers.',
        image: 'assets/services/diagnostic-conteste.png',
        imageAlt: 'Plan immobilier examiné à la loupe pour analyser un diagnostic contesté',
        detailTitle: 'Éclairer les points en discussion',
        detailIntro: 'L’intervention porte sur le rapport existant, son contexte et les constats, méthodes ou conclusions contestés.',
        context: 'Lors d’une vente, les diagnostics à fournir varient notamment selon le type de logement et ses caractéristiques. Le DPE est l’un des documents du dossier de diagnostic technique ; l’analyse proposée porte sur un rapport existant, et non sur la production d’un nouveau diagnostic réglementaire.',
        sources: [
            {
                label: 'Service-Public.fr — diagnostics immobiliers pour la vente',
                url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F10798'
            },
            {
                label: 'Ministère de la Transition écologique — comprendre le DPE',
                url: 'https://www.ecologie.gouv.fr/politiques-publiques/diagnostic-performance-energetique-dpe'
            }
        ],
        details: [
            {
                label: '01 / Documents',
                title: 'Examiner le rapport et les pièces',
                description: 'Le diagnostic concerné, son contexte et les documents utiles transmis sont examinés pour comprendre les points en discussion.'
            },
            {
                label: '02 / Analyse',
                title: 'Confronter les constats techniques',
                description: 'L’analyse peut concerner un DPE, l’amiante, le plomb, l’électricité, le gaz ou un autre diagnostic selon le dossier et les compétences mobilisables.'
            },
            {
                label: '03 / Limites',
                title: 'Clarifier la portée de l’analyse',
                description: 'Les éléments établis, les points qui restent à vérifier et les limites de l’examen sont restitués clairement.'
            }
        ],
        scope: 'La mission porte sur l’analyse d’un diagnostic existant : elle ne vaut pas réalisation d’un nouveau diagnostic réglementaire ni avis juridique.'
    },
    'visite-achat': {
        category: 'Visite technique avant achat immobilier',
        title: 'Un regard technique avant de vous engager.',
        summary: 'Avant un achat ou une vente, faites examiner visuellement le bien pour mieux comprendre son état apparent et repérer les points de vigilance.',
        image: 'assets/services/visite-avant-achat.png',
        imageAlt: 'Plan immobilier et outils de plomberie examinés lors d’une visite technique',
        detailTitle: 'Préparer votre projet en connaissance de cause',
        detailIntro: 'Une visite sur place vous aide à mieux comprendre l’état apparent du bien et à identifier les sujets à approfondir.',
        context: 'Le dossier de vente peut réunir plusieurs diagnostics dont la liste dépend du bien et de sa situation. Une visite technique visuelle apporte un autre éclairage sur l’état apparent des parties accessibles ; elle ne remplace ni ces diagnostics ni des investigations destructives.',
        sources: [
            {
                label: 'Service-Public.fr — diagnostics immobiliers pour la vente',
                url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F10798'
            },
            {
                label: 'Agence Qualité Construction — ressources techniques',
                url: 'https://www.qualiteconstruction.com/'
            }
        ],
        details: [
            {
                label: '01 / Visite',
                title: 'Examiner les parties accessibles',
                description: 'L’examen visuel porte, selon les accès et le périmètre convenu, sur les ouvrages, les équipements et les finitions du bien.'
            },
            {
                label: '02 / Points de vigilance',
                title: 'Repérer les désordres visibles',
                description: 'Les signes de pathologie, de malfaçon apparente ou de vétusté sont relevés afin de distinguer les constats des points à vérifier.'
            },
            {
                label: '03 / Restitution',
                title: 'Préparer les prochaines étapes',
                description: 'La restitution écrite synthétise les constats et les limites de la visite. Elle peut vous aider à préparer vos questions et à identifier les sujets à approfondir.'
            }
        ],
        scope: 'La visite est visuelle et non destructive : elle ne comprend ni démontage, ni sondage, ni diagnostic réglementaire. Elle ne garantit pas l’absence de désordres non visibles et ne constitue pas un devis de travaux.'
    },
    'protection-juridique': {
        category: 'Expertise technique & protection juridique',
        title: 'Un éclairage technique dans votre dossier de protection juridique.',
        summary: 'Dans un différend lié au bâtiment ou à un dommage, une expertise technique indépendante peut aider à documenter les faits et à éclairer les échanges.',
        image: 'assets/services/protection-juridique.png',
        imageAlt: 'Un professionnel examine des plans et des données techniques avec un casque de chantier à proximité',
        detailTitle: 'Une intervention adaptée à votre situation',
        detailIntro: 'Après un premier échange, le périmètre technique est défini avec vous. Si vous souhaitez mobiliser votre protection juridique, rapprochez-vous de votre assureur pour connaître les conditions et l’accord préalable requis.',
        context: 'Les domaines couverts, plafonds, exclusions et modalités de prise en charge varient selon les contrats. Avant d’engager des honoraires, faites confirmer par votre assureur si la mission et les frais envisagés peuvent être pris en charge. Notre intervention porte sur l’analyse technique de votre dossier.',
        sources: [
            {
                label: 'Service-Public.fr — Garantie protection juridique',
                url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F3049'
            }
        ],
        details: [
            {
                label: '01 / Préparer',
                title: 'Clarifier votre demande et les modalités',
                description: 'Présentez le différend et les questions techniques à éclaircir. Votre assureur de protection juridique pourra vous préciser les conditions de votre contrat et l’accord à obtenir avant la mission.'
            },
            {
                label: '02 / Examiner',
                title: 'Analyser les constats et les documents',
                description: 'Selon le périmètre convenu, l’examen peut porter sur les dommages, les désordres, les rapports et les autres pièces techniques utiles. Une visite est définie si elle est pertinente et réalisable.'
            },
            {
                label: '03 / Restituer',
                title: 'Présenter une analyse technique indépendante',
                description: 'Les constats, leur analyse et les limites de l’examen sont restitués clairement. Une participation à une réunion d’expertise peut être prévue si elle est comprise dans la mission convenue.'
            }
        ],
        scope: 'L’expertise porte sur les aspects techniques. Elle ne constitue ni un conseil juridique ni une représentation auprès de l’assureur et ne préjuge pas de la prise en charge. Celle-ci dépend de votre contrat et de la décision de votre assureur.'
    }
};

const serviceId = new URLSearchParams(window.location.search).get('service');
const prestation = serviceId ? prestations[serviceId] : undefined;
const content = document.getElementById('prestationContent');
const notFound = document.getElementById('prestationNotFound');
const detailSection = document.getElementById('prestationDetails');

if (!prestation) {
    if (notFound) {
        notFound.hidden = false;
    }
} else {
    const breadcrumb = document.getElementById('prestationBreadcrumb');
    const eyebrow = document.getElementById('prestationEyebrow');
    const title = document.getElementById('prestationTitle');
    const summary = document.getElementById('prestationSummary');
    const image = document.getElementById('prestationImage');
    const webpImage = document.getElementById('prestationImageWebp');
    const detailTitle = document.getElementById('prestationDetailsTitle');
    const detailIntro = document.getElementById('prestationDetailsIntro');
    const detailCards = document.getElementById('prestationDetailCards');
    const contextText = document.getElementById('prestationContextText');
    const sourcesList = document.getElementById('prestationSources');
    const scopeNote = document.getElementById('prestationScopeNote');
    const scopeText = document.getElementById('prestationScopeText');
    const metaDescription = document.querySelector('meta[name="description"]');
    const openGraphTitle = document.querySelector('meta[property="og:title"]');
    const openGraphDescription = document.querySelector('meta[property="og:description"]');

    if (
        content instanceof HTMLElement &&
        detailSection instanceof HTMLElement &&
        breadcrumb &&
        eyebrow &&
        title &&
        summary &&
        image instanceof HTMLImageElement &&
        detailTitle &&
        detailIntro &&
        detailCards &&
        contextText &&
        sourcesList instanceof HTMLUListElement &&
        scopeNote instanceof HTMLElement &&
        scopeText
    ) {
        breadcrumb.textContent = prestation.category;
        eyebrow.textContent = prestation.category;
        title.textContent = prestation.title;
        summary.textContent = prestation.summary;
        image.src = prestation.image;
        if (webpImage instanceof HTMLSourceElement) {
            webpImage.srcset = prestation.image.replace(/\.(?:jpe?g|png)$/i, '.webp');
        }
        image.alt = prestation.imageAlt;
        detailTitle.textContent = prestation.detailTitle;
        detailIntro.textContent = prestation.detailIntro;
        contextText.textContent = prestation.context;

        const pdfServiceMap = {
            'sinistres': 'assets/pdf/Fiche_Expertise_Sinistres_et_Dommages.pdf',
            'industrie': 'assets/pdf/Fiche_Expertise_Industrielle.pdf',
            'renouvelables': 'assets/pdf/Fiche_Expertise_Energies_Renouvelables.pdf',
            'performance': 'assets/pdf/Fiche_Expertise_Performance_Energetique.pdf',
            'incendie': 'assets/pdf/Fiche_Expertise_Incendie.pdf',
            'diagnostics': 'assets/pdf/Fiche_Expertise_Diagnostics_Contestes.pdf',
            'visite-achat': 'assets/pdf/Fiche_Expertise_Visite_Avant_Achat.pdf',
            'protection-juridique': 'assets/pdf/Fiche_Expertise_Protection_Juridique.pdf'
        };
        const pdfLinkEl = document.getElementById('prestationPdfLink');
        if (pdfLinkEl && pdfServiceMap[serviceKey]) {
            pdfLinkEl.href = pdfServiceMap[serviceKey];
        }

        document.title = `${prestation.category} | EFFICIENS ENERGIA`;
        if (metaDescription instanceof HTMLMetaElement) {
            metaDescription.content = `${prestation.summary} Expertise indépendante dans l’Ain et les départements voisins.`;
        }
        if (openGraphTitle instanceof HTMLMetaElement) {
            openGraphTitle.content = `${prestation.category} | EFFICIENS ENERGIA`;
        }
        if (openGraphDescription instanceof HTMLMetaElement) {
            openGraphDescription.content = `${prestation.summary} Expertise dans l’Ain et les départements voisins.`;
        }

        prestation.sources.forEach((source) => {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = source.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = source.label;
            item.append(link);
            sourcesList.append(item);
        });

        prestation.details.forEach((detail) => {
            const card = document.createElement('article');
            card.className = 'prestation-detail-card';

            const label = document.createElement('span');
            label.className = 'principle-number';
            label.textContent = detail.label;

            const heading = document.createElement('h3');
            heading.textContent = detail.title;

            const description = document.createElement('p');
            description.textContent = detail.description;

            card.append(label, heading, description);
            detailCards.append(card);
        });

        scopeText.textContent = prestation.scope;
        scopeNote.hidden = false;
        content.hidden = false;
        detailSection.hidden = false;
    }
}
