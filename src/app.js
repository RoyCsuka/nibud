import { select, geoNaturalEarth1 } from 'd3';
import { cleanedArr } from './cleanData.js';
// Import de locale json files
import main from './nibud-maincat.json';

var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Scales
var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .tickSize(0.2)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var color = d3.scale.ordinal()
    .range(["#ca0020", "#f4a582", "#d5d5d5", "#92c5de", "#0571b0"]);

var svg = d3.select('body').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// local aanroepen
let data = main;

//The initial variable the y axis is set on
let yVar = "";
let xVar = "Alleenstaand";

makeBugetVisualisation()

// Our main function which runs other function to make a visualization
async function makeBugetVisualisation() {
    data = await cleanedArr(data)

    console.log("Data in app", data);

    setUpForm(data)

    // klik op het eerste element en zorg ervoor dat de onchange wordt getriggerd
    clickFirstItem()

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

    data = data.filter(d => d.key === this.value);

    data = data.map(d => d.values);

    var categoriesNames = data.map(function(d) {
        let reserveringsuitgaven = d.reserveringsuitgaven.naam;
        let vastelasten = d.vastelasten.naam;
        let overigevastelasten = d.overigevastelasten.naam;
        let huishoudelijkeuitgaven = d.huishoudelijkeuitgaven.naam;
        return [reserveringsuitgaven, vastelasten, overigevastelasten, huishoudelijkeuitgaven];
    });

    var categoriesValues = data.map(function(d) {
        let reserveringsuitgaven = d.reserveringsuitgaven.totaal;
        let vastelasten = d.vastelasten.totaal;
        let overigevastelasten = d.overigevastelasten.totaal;
        let huishoudelijkeuitgaven = d.huishoudelijkeuitgaven.totaal;
        return [reserveringsuitgaven, vastelasten, overigevastelasten, huishoudelijkeuitgaven];
    });

    x0.domain(categoriesNames.map(name => name));
    x1.domain(categoriesNames.map(name => name)).rangeRoundBands([0, x0.rangeBand()]);
    y.domain(data.map(d => d.max))

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .style('opacity', '0')
        .call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style('font-weight', 'bold')
            .text("Value");

    svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1');

    var slice = svg.selectAll(".slice")
        .data(categoriesValues.map(value => value))
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function() {
            return "translate(" + x0(categoriesNames.map(name => name)) + ",0)";
        });

    slice.selectAll("rect")
        .data(function(d) {
            return d;
        })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) {
            console.log(x1());
            return x1(d);
        })
        .style("fill", function(d) {
            return color(d)
        })
        .attr("y", function(d) {
            return y(0);
        })
        .attr("height", function(d) {
            return height - y(0);
        })
        .on("mouseover", function(d) {
            d3.select(this).style("fill", d3.rgb(color(d)).darker(2));
        })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", color(d));
        });

    slice.selectAll("rect")
        .transition()
        .delay(function(d) {
            return Math.random() * 1000;
        })
        .duration(1000)
        .attr("y", function() {
            return y(categoriesValues.map(value => value));
        })
        .attr("height", function() {
            return height - y(categoriesValues.map(value => value));
        });

}

function clickFirstItem(){
    document.querySelector("#form label:first-of-type span input").click();
}
