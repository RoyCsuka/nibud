import { select , geoNaturalEarth1} from 'd3'
import { feature } from 'topojson'
import { cleanedArr } from './cleanData.js';

const svg = select('svg')

// Global data variable
let data

// standaard waarde
let centuryVar = 2000;


makeVisualization()

// Our main function which runs other function to make a visualization
async function makeVisualization(){
    let data = await cleanedArr(mainArr, subArr)

}

//This awesome function makes dynamic input options based on our data!
//You can also create the options by hand if you can't follow what happens here
function setUpCenturys(data) {

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
