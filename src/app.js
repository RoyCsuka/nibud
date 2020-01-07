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

    console.log("Data in app", data);

    setUpForm(data)

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
                    .on('change', balance)
}

function balance() {
    console.log("Balans", data);

    let vaste_lasten = selectCat.Inkomen - selectCat.vasteLasten;
    console.log(vaste_lasten, "Vaste lasten");

    let huishoudelijke_uitgaven = vaste_lasten - selectCat.huishoudelijkeUitgaven;
    console.log(huishoudelijke_uitgaven, "Huishoudelijke uitgaven");

    let reserverings_uitgaven = huishoudelijke_uitgaven - selectCat.reserveringsUitgaven;
    console.log(reserverings_uitgaven, "Reserverings uitgaven");

    // setUpScales()
}
//
// function setUpScales() {
//     //We'll set the x domain to the different preferences
//     x.domain(vaste_lasten, huishoudelijke_uitgaven, reserverings_uitgaven)
//     //The y-domain is set to the min and inkomen of the current y variable
//     y.domain(inkomen)
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
//         const bars = group.selectAll('.bar')
// }
