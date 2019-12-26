import { select , geoNaturalEarth1} from 'd3';
import { feature } from 'topojson';
import { cleanedArr } from './cleanData.js';
// Import de locale json files
import main from './nibud-maincat.json';

const svg = select('svg')
const margin = {top: 48, right: 72, bottom: 120, left: 72}
const height = parseInt(svg.style('height'), 10) - margin.top - margin.bottom;
const width = parseInt(svg.style('width'), 10) - margin.left - margin.right;
const group = svg
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Scales
const x = d3.scaleBand().padding(0.2)
const y = d3.scaleLinear()

// local aanroepen
const mainArr = main;

//The initial variable the y axis is set on
let yVar =  "";
let xVar = "Alleenstaand";

makeBugetVisualisation()

// Our main function which runs other function to make a visualization
async function makeBugetVisualisation() {
    let data = await cleanedArr(mainArr)

    setUpForm(data)
    // setupScales()
    // setupAxes()

    // console.log("Data in app.js ", data)

}

//This awesome function makes dynamic input options based on our data!
//You can also create the options by hand if you can't follow what happens here
function setUpForm(data) {

    const form = d3.select('form')
        .selectAll('input')
        .data(data)
        .enter()
            .append('label')
                .append('span')
                    .text(d => d.key)
                .append('input')
                    .attr('type', 'radio')
                    .attr('name', 'century')
                    .attr('value', d => d.key)
                    .on('change', selectionChanged)
}


// Code van Laurens
//This function will change the graph when the user selects another variable
function selectionChanged(){
    // Filteren van de geselecteerde waarde
    var arrOfSelectedData = mainArr.filter(d => d.Huishouden == this.value);

    // Categorieseren op de maincat
    var huishoudelijkeUitgaven = arrOfSelectedData.filter(d => d.maincat == "huishoudelijke uitgaven")
    var vasteLasten = arrOfSelectedData.filter(d => d.maincat == "vaste lasten")
    var reserveringsUitgaven = arrOfSelectedData.filter(d => d.maincat == "reserverings uitgaven")
    var inkomen = arrOfSelectedData.filter(d => d.Inkomen)

    // Gemiddelde van de drie categorieën
    var huishoudelijkeUitgavenAvg = d3.mean(huishoudelijkeUitgaven.map(d => d.Bedrag))
    var vasteLastenAvg = d3.mean(vasteLasten.map(d => d.Bedrag))
    var reserveringsUitgavenAvg = d3.mean(reserveringsUitgaven.map(d => d.Bedrag))
    var inkomen = d3.mean(inkomen.map(d => d.Inkomen))
    var uitgaven = huishoudelijkeUitgavenAvg + vasteLastenAvg + reserveringsUitgavenAvg;


    // Om de min en max te berekenen
    var allAvgs = [huishoudelijkeUitgavenAvg, vasteLastenAvg, reserveringsUitgavenAvg];
    // minimale en maximale waarde
    let max = d3.entries(allAvgs)
        .sort(function(a, b) {
            return d3.descending(a.value, b.value);
        })[0].value;
    let min = d3.entries(allAvgs)
        .sort(function(a, b) {
            return d3.ascending(a.value, b.value);
        })[0].value;

    // Console log van alle resultaten

    // Inkomen min uitgaven zodat je weet hoeveel je over hebt
    let saldo = Math.round(inkomen - uitgaven)

    let selectedData = {mainCat: this.value, huishoudelijkeUitgaven: Math.round(huishoudelijkeUitgavenAvg), vasteLasten: Math.round(vasteLastenAvg), reserveringsUitgaven: Math.round(reserveringsUitgavenAvg), Inkomen: Math.round(inkomen), Uitgaven: Math.round(uitgaven), Saldo: saldo, Min: Math.round(min), Max: Math.round(max)}
    // selectedData.key = this.value;


    console.log(selectedData)

    // plotLocations()

}

// function setupScales(){
//     //We'll set the x domain to the different preferences
//     x.domain(nestedData.map(preference => preference.key))
//     //The y-domain is set to the min and max of the current y variable
//     y.domain([0, d3.max( nestedData.map(preference => preference.value[yVar]) )] )
//     x.rangeRound([0, width]);
//     y.rangeRound([height, 0]);
// }
//
// function setupAxes(){
//     group
//         .append('g')
//         .attr('class', 'axis axis-x')
//         .call(d3.axisBottom(x)).attr('transform', 'translate(0,' + height + ')')
//     group
//         .append('g')
//         .attr('class', 'axis axis-y')
//         .call(d3.axisLeft(y).ticks(10))
// }


//Plot each location on the map with a circle
// function plotLocations(container, data, projection, min, max) {
//
//     const scale = d3.scaleLinear().domain([ min, max ]).range([ 15, 90 ]);
//
//
//     let circles = svg.selectAll('circle').data([data][0])
//     let text = svg.selectAll('text').data([data][0])
//     // update
//     circles
//         .attr('cx', d => projection([d.contLong, d.contLat])[0])
//         .attr('cy', d => projection([d.contLong, d.contLat])[1])
//         .attr('r', function(d) { return scale(d.amountOfCountryItems) })
//
//     text
//         .attr('x', d => projection([d.contLong, d.contLat])[0])
//         .attr('y', d => projection([d.contLong, d.contLat])[1])
//             .text(d => d.amountOfCountryItems)
//
//     // enter
//     circles
//         .enter()
//         .append('circle')
//             .attr('cx', d => projection([d.contLong, d.contLat])[0])
//             .attr('cy', d => projection([d.contLong, d.contLat])[1])
//             .attr('r', function(d) { return scale(d.amountOfCountryItems) })
//             .attr('opacity', 0.8)
//     text
//         .enter()
//         .append('text')
//             .attr('x', d => projection([d.contLong, d.contLat])[0])
//             .attr('y', d => projection([d.contLong, d.contLat])[1])
//                 .text(d => d.amountOfCountryItems)
//
//     // exit
//     circles
//         .exit()
//         .remove()
//     text
//         .exit()
//         .remove()
//
//
// }
