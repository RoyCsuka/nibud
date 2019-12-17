// Voor local doeleinde
import config from './nibud-full-dataset.json'

// local aanroepen
const jsonResults = config.results.bindings

console.log(jsonResults)

// export functie zorgt voor database resultaten
export async function cleanedArr(endpoint, query){
  //Load the data and return a promise which resolves with said data
	let data = await loadData(endpoint, query)
    console.log("raw data: ", data)

    data = data.filter(entry => filterData(entry, "continentLabel"))

    cleanAllData(data)

    return data
}


// Haal data op en zet om in JSON met D3
function loadData(url, query) {
  return d3.json(url +"?query="+ encodeURIComponent(query) + "&format=json")
    .then(data => data.results.bindings)
}


// Dezen functie cleaned alle data
function cleanAllData() {
    let addContinentLatAndLong = addLatLongContinent(jsonResults);
    let convertYears = convertToYear(jsonResults);
    return addContinentLatAndLong && convertYears
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
            contLat: d[0].contLat,
            contLong: d[0].contLong,
            country: d[0].landLabel,
            countryLat: d[0].countryLat,
            countryLong: d[0].countryLong,
            continent: d[0].continentLabel,
            date: d[0].date
        }
    })
        .entries(source);
    return transformed
}
