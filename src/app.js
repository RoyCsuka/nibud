import { select , geoNaturalEarth1} from 'd3'
import { feature } from 'topojson'
import { cleanedArr } from './cleanData.js';

// D3 data transfomeren
// Eigen query aangepast
const query = `PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX gn: <http://www.geonames.org/ontology#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?landLabel ?countryLat ?countryLong ?continentLabel ?contLat ?contLong ?date (COUNT(?cho) AS ?choCount) WHERE {
   ?cho dct:created ?date;
        dct:spatial ?plaats .

  FILTER (!REGEX(?date, "[NI]")) .

   ?plaats skos:exactMatch/gn:parentCountry ?land .
   ?land wgs84:lat ?countryLat .
   ?land wgs84:long ?countryLong .
   ?land gn:name ?landLabel .

  <https://hdl.handle.net/20.500.11840/termmaster2> skos:narrower ?continent .
  ?continent skos:prefLabel ?continentLabel .
  ?continent skos:narrower* ?place .
  ?cho dct:spatial ?place .


} GROUP BY ?date ?landLabel ?countryLat ?countryLong ?continentLabel ?contLat ?contLong
ORDER BY DESC(?choCount)`

// Mijn end-point
const endpoint = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-14/sparql"
const svg = select('svg')

const mapSettings = {
    projection: geoNaturalEarth1().rotate([-11,0]),
    circleDelay: 11
}

// Global data variable
let data

// standaard waarde
let centuryVar = 2000;


makeVisualization()

// Our main function which runs other function to make a visualization
async function makeVisualization(){
    //Use the cleanedArr module to get and process our data
    data = await cleanedArr(endpoint, query)

    setUpCenturys(data)

    // klik op het eerste element en zorg ervoor dat de onchange wordt getriggerd

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
