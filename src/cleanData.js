// export functie zorgt voor database resultaten
export async function cleanedArr(mainArr) {

    mainArr = prepareData(mainArr)

    return mainArr
}


// Dezen functie cleaned alle data
function prepareData(mainData) {
    mainData = toMonths(mainData)
    mainData = makeSubCategories(mainData)
    mainData = groupMainData(mainData)

    return mainData

}

function toMonths(monthsData) {

    return monthsData
}

function makeSubCategories(data) {

    data.forEach(cat => {
        switch(cat.Post) {
            case 'kleding en schoenen':
            case 'inventaris':
            case 'onderhoud huis en tuin':
            case 'niet-vergoede ziektekosten':
            case 'vrijetijdsuitgaven':
                cat.maincat = "reserveringsuitgaven"
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

// Voor als subposten ook gefixt moet worden
// function groupSubData(source){
//     let transformed =  d3.nest()
//     .key(function(d) { return d.Post; })
//     .entries(source);
//     console.log(transformed)
//     return transformed
// }
