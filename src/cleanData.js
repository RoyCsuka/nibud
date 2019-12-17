// Import de locale json files
import main from './nibud-maincat.json'
import sub from './nibud-subcat.json'

// local aanroepen
const mainArr = main;
const subArr = sub;

// export functie zorgt voor database resultaten
export async function cleanedArr(mainArr, subArr) {

    let allData =  mainArr + subArr;
    console.log(allData)

    return data
}


// Dezen functie cleaned alle data
function cleanAllData() {
    addLatLongContinent(jsonResults);

}


//Nest the data per preference (this will be our x-axis value
//Rollup data so we get averages and totals for each variable
//Note: this could also be done when visualizing the values
//    and we could make this pattern more functional by creating a mean and total function
function calculateAndGroup(source){
    let transformed =  d3.nest()
    .key(d => d.date).sortKeys(d3.descending)
    .rollup(d => {
        return {
            amountOfCountryItems: Number(d3.sum(d.map(itemsPerCountry => itemsPerCountry.choCount))),
            contLat: d[0].contLat
        }
    })
        .entries(source);
    return transformed
}
