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
let xVar = "";

makeBugetVisualisation()

// Our main function which runs other function to make a visualization
async function makeBugetVisualisation() {
    let data = await cleanedArr(mainArr)

    setUpForm(data)

    console.log("Data in app.js ", data)

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
    //'this' refers to the form element!
    centuryVar = this ? parseInt(this.value) : centuryVar

    // Laurens heeft mij hiermee geholpen
    let arrOfSelectedData = data.find(element => element.key == this.value);
    // veranderd de tekst boven aan

    plotLocations(svg, flattened, mapSettings.projection, min, max)

}


//Plot each location on the map with a circle
function plotLocations(container, data, projection, min, max) {

    const scale = d3.scaleLinear().domain([ min, max ]).range([ 15, 90 ]);


    let circles = svg.selectAll('circle').data([data][0])
    let text = svg.selectAll('text').data([data][0])
    // update
    circles
        .attr('cx', d => projection([d.contLong, d.contLat])[0])
        .attr('cy', d => projection([d.contLong, d.contLat])[1])
        .attr('r', function(d) { return scale(d.amountOfCountryItems) })

    text
        .attr('x', d => projection([d.contLong, d.contLat])[0])
        .attr('y', d => projection([d.contLong, d.contLat])[1])
            .text(d => d.amountOfCountryItems)

    // enter
    circles
        .enter()
        .append('circle')
            .attr('cx', d => projection([d.contLong, d.contLat])[0])
            .attr('cy', d => projection([d.contLong, d.contLat])[1])
            .attr('r', function(d) { return scale(d.amountOfCountryItems) })
            .attr('opacity', 0.8)
    text
        .enter()
        .append('text')
            .attr('x', d => projection([d.contLong, d.contLat])[0])
            .attr('y', d => projection([d.contLong, d.contLat])[1])
                .text(d => d.amountOfCountryItems)

    // exit
    circles
        .exit()
        .remove()
    text
        .exit()
        .remove()


}
