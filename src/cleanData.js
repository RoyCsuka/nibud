// export functie zorgt voor database resultaten
export async function cleanedArr(mainArr) {

    mainArr = prepareData(mainArr)

    return mainArr
}


// Deze functie maakt alle data gereed voor D3
function prepareData(mainData) {
    mainData = toMonths(mainData)
    mainData = makeSubCategories(mainData)
    mainData = groupMainData(mainData)
    return mainData
}

// Trekt alle waardes gelijk
function toMonths(monthsData) {
    return monthsData
}

// Maakt hoofdcategorieën aan
function makeSubCategories(data) {

    data.map(cat => cat.Post = cat.Post.toLowerCase())

    data.forEach(cat => {
        switch(cat.Post) {
            case 'kleding en schoenen':
            case 'inventaris':
            case 'onderhoud huis en tuin':
            case 'niet-vergoede ziektekosten':
            case 'vrijetijdsuitgaven':
                cat.maincat = "reserverings uitgaven"
        }
    })

    data.forEach(cat => {
        switch(cat.Post) {
            case 'huur/hypotheek':
            case 'gas':
            case 'elektriciteit':
            case 'water':
            case 'verzekeringen':
            case 'verzekeringen':
            case 'onderwijs':
            case 'kinderopvang':
            case 'vervoer':
            case 'contributies en abonnementen':
            case 'lokale lasten':
            case 'telefoon, televisie, internet':
                cat.maincat = "vaste lasten"
        }
    })

    data.forEach(cat => {
        switch(cat.Post) {
            case 'voeding':
            case 'overige huishoudelijke uitgaven':
            case 'reserveringsuitgaven':
                cat.maincat = "huishoudelijke uitgaven"
        }
    })

    console.log(data)

    return data
}

function groupMainData(source) {
    let transformed =  d3.nest()
    .key(function(d) { return d.Huishouden; })
    .entries(source);
    console.log(transformed)
    return transformed
}
