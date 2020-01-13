// export functie zorgt voor database resultaten
export async function cleanedArr(mainArr) {
    mainArr = prepareData(mainArr)
    return mainArr
}


// Deze functie maakt alle data gereed voor D3
function prepareData(mainData) {
    mainData = makeSubCategories(mainData)
    mainData = groupMainData(mainData)
    mainData = average(mainData)
    return mainData
}

// Maakt hoofdcategorieën aan
function makeSubCategories(data) {

    data.map(cat => cat.Post = cat.Post.toLowerCase())

    data.forEach(cat => {
        switch(cat.Post) {
            case 'reserveringsuitgaven':
            case 'kleding en schoenen':
            case 'inventaris':
            case 'onderhoud huis en tuin':
            case 'niet-vergoede ziektekosten':
            case 'vrijetijdsuitgaven':
                cat.maincat = "reserverings uitgaven"
        }
    });

    data.forEach(cat => {
        switch(cat.Post) {
            case 'vaste lasten':
            case 'huur/hypotheek':
            case 'gas':
            case 'elektriciteit':
            case 'water':
            case 'lokale lasten':
                cat.maincat = "vaste lasten"
        }
    });

    data.forEach(cat => {
        switch(cat.Post) {
            case 'telefoon, televisie, internet':
            case 'verzekeringen':
            case 'contributies en abonnementen':
            case 'onderwijs':
            case 'kinderopvang':
            case 'vervoer':
                cat.maincat = "overige vaste lasten"
        }
    });

    data.forEach(cat => {
        switch(cat.Post) {
            case 'voeding':
            case 'huishoudelijke uitgaven':
            case 'overige huishoudelijke uitgaven':
                cat.maincat = "huishoudelijke uitgaven"
        }
    });
    console.log(data);
    return data
}

function groupMainData(source) {
    let transformed =  d3.nest()

        .key(function(d) { return d.Huishouden; })
        .entries(source);

    return transformed
}

// bereken het gemiddelde van elke post binnen elke categorie
function average(groupedData) {
    groupedData.forEach(d => {
        // HOOFDPOST ------------------------------------------------------
        // Reserverings uitgaven
        // Subposten -------------------------------------------------------
        let kledingEnSchoenen = d.values.filter(d => d.Post == "kleding en schoenen");
        kledingEnSchoenen = d3.mean(kledingEnSchoenen.map(d => d.Bedrag));
        let inventaris = d.values.filter(d => d.Post == "inventaris");
        inventaris = d3.mean(inventaris.map(d => d.Bedrag));
        let huisEnTuin = d.values.filter(d => d.Post == "onderhoud huis en tuin");
        huisEnTuin = d3.mean(huisEnTuin.map(d => d.Bedrag));
        let nietVergoedeZiektekosten = d.values.filter(d => d.Post == "niet-vergoede ziektekosten");
        nietVergoedeZiektekosten = d3.mean(nietVergoedeZiektekosten.map(d => d.Bedrag));
        let vrijetijdsUitgaven = d.values.filter(d => d.Post == "vrijetijdsuitgaven");
        vrijetijdsUitgaven = d3.mean(vrijetijdsUitgaven.map(d => d.Bedrag));


        // HOOFDPOST ------------------------------------------------------
        // Vaste lasten
        let vasteLasten = d.values.filter(d => d.maincat == "vaste lasten");
        vasteLasten = d3.mean(vasteLasten.map(d => d.Bedrag));
        // Subposten -------------------------------------------------------
        let huurHypotheek = d.values.filter(d => d.Post == "huur/hypotheek");
        huurHypotheek = d3.mean(huurHypotheek.map(d => d.Bedrag));
        let gas = d.values.filter(d => d.Post == "gas");
        gas = d3.mean(gas.map(d => d.Bedrag));
        let elektriciteit = d.values.filter(d => d.Post == "elektriciteit");
        elektriciteit = d3.mean(elektriciteit.map(d => d.Bedrag));
        let water = d.values.filter(d => d.Post == "water");
        water = d3.mean(water.map(d => d.Bedrag));
        let lokaleLasten = d.values.filter(d => d.Post == "lokale lasten");
        lokaleLasten = d3.mean(lokaleLasten.map(d => d.Bedrag));


        // HOOFDPOST ------------------------------------------------------
        // Overige vaste lasten
        // Subposten -------------------------------------------------------
        let telefoonTelevisieInternet = d.values.filter(d => d.Post == "telefoon, televisie, internet");
        telefoonTelevisieInternet = d3.mean(telefoonTelevisieInternet.map(d => d.Bedrag));
        let verzekeringen = d.values.filter(d => d.Post == "verzekeringen");
        verzekeringen = d3.mean(verzekeringen.map(d => d.Bedrag));
        let contributiesAbonnementen = d.values.filter(d => d.Post == "contributies en abonnementen");
        contributiesAbonnementen = d3.mean(contributiesAbonnementen.map(d => d.Bedrag));
        let onderwijs = d.values.filter(d => d.Post == "onderwijs");
        onderwijs = d3.mean(onderwijs.map(d => d.Bedrag));
        let kinderopvang = d.values.filter(d => d.Post == "kinderopvang");
        kinderopvang = d3.mean(kinderopvang.map(d => d.Bedrag));
        let vervoer = d.values.filter(d => d.Post == "vervoer");
        vervoer = d3.mean(vervoer.map(d => d.Bedrag));
        // totaal
        let overigeVasteLasten = telefoonTelevisieInternet + verzekeringen + contributiesAbonnementen + onderwijs + kinderopvang + vervoer;


        // HOOFDPOST ------------------------------------------------------
        // Huishoudelijke uitgaven
        let huishoudelijkeUitgaven = d.values.filter(d => d.Post == "huishoudelijke uitgaven");
        huishoudelijkeUitgaven = d3.mean(huishoudelijkeUitgaven.map(d => d.Bedrag));
        // Subposten -------------------------------------------------------
        let voeding = d.values.filter(d => d.Post == "voeding");
        voeding = d3.mean(voeding.map(d => d.Bedrag));
        let overigeHuishoudelijkeUitgaven = d.values.filter(d => d.Post == "overige huishoudelijke uitgaven");
        overigeHuishoudelijkeUitgaven = d3.mean(overigeHuishoudelijkeUitgaven.map(d => d.Bedrag));
        let reserveringsUitgaven = d.values.filter(d => d.maincat == "reserverings uitgaven");
        reserveringsUitgaven = d3.mean(reserveringsUitgaven.map(d => d.Bedrag));


        // Inkomen & uitgaven
        let inkomen = d.values.filter(d => d.Inkomen);
        inkomen = d3.mean(inkomen.map(d => d.Inkomen));
        let uitgaven = huishoudelijkeUitgaven + vasteLasten + overigeVasteLasten + reserveringsUitgaven;

        // Om de minimale waarde te berekenen
        let allAvgs = [huishoudelijkeUitgaven, vasteLasten, overigeVasteLasten, reserveringsUitgaven];

        // Minimale waarde
        let min = d3.entries(allAvgs)
        .sort(function(a, b) {
            return d3.ascending(a.value, b.value);
        })[0].value;

        // Console log van alle resultaten
        // Inkomen minimale uitgaven zodat je weet hoeveel je over hebt
        let saldo = Math.round(inkomen - uitgaven)

        let selectedData = {
            reserveringsuitgaven: {
                naam: "Reserverings uitgaven",
                totaal: Math.round(kledingEnSchoenen + inventaris + huisEnTuin + nietVergoedeZiektekosten + vrijetijdsUitgaven),
                kleding: Math.round(kledingEnSchoenen),
                inventaris: Math.round(inventaris),
                huisentuinonderhoud: Math.round(huisEnTuin),
                nietvergoedeziektekosten: Math.round(nietVergoedeZiektekosten),
                vrijetijdsuitgaven: Math.round(vrijetijdsUitgaven),
            },
            vastelasten: {
                naam: "Vaste lasten",
                totaal: Math.round(vasteLasten),
                huurhypotheek: Math.round(huurHypotheek),
                gas: Math.round(gas),
                elektriciteit: Math.round(elektriciteit),
                water: Math.round(water),
                lokaleLasten: Math.round(lokaleLasten),
            },
            overigevastelasten: {
                naam: "Overige vaste lasten",
                totaal: Math.round(telefoonTelevisieInternet + verzekeringen + contributiesAbonnementen + onderwijs + kinderopvang),
                telefoontelevisieinternet: Math.round(telefoonTelevisieInternet),
                verzekeringen: Math.round(verzekeringen),
                contributiesenabonnementen: Math.round(contributiesAbonnementen),
                onderwijs: Math.round(onderwijs),
                kinderopvang: Math.round(kinderopvang),
                vervoer: Math.round(vervoer),
            },
            huishoudelijkeuitgaven: {
                naam: "Huishoudelijke uitgaven",
                totaal: Math.round(huishoudelijkeUitgaven),
                voeding: Math.round(voeding),
                overigehuishoudelijkeuitgaven: Math.round(overigeHuishoudelijkeUitgaven),
                reserveringsuitgaven: Math.round(reserveringsUitgaven),
            },

            inkomen: Math.round(inkomen),
            uitgaven: Math.round(uitgaven),
            saldo: saldo,
            min: Math.round(min),
            max: Math.round(inkomen)
        };
        let avgData = d.values = selectedData;
    });

    return groupedData

}
