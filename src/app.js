import { select, geoNaturalEarth1 } from 'd3';
import { cleanedArr } from './cleanData.js';
// Import de locale json files
import main from './nibud-maincat.json';

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
    localStor()
}

//This awesome function makes dynamic input options based on our data!
//You can also create the options by hand if you can't follow what happens here
function setUpForm(data) {
    const form = d3.select('form fieldset:nth-of-type(2)')
        .select('form fieldset:nth-of-type(2) select')
        .on('change', selectedDataForVis)
        .selectAll('option')
        .data(data)
        .enter()
            .append('option')
            .text(d => d.key)
            .attr('type', 'option')
            .attr('value', d => d.key)
}

function selectedDataForVis() {
    var selectedData = data.filter(d => d.key === this.value);

    selectedData = selectedData.map(d => d.values);

    var categoriesNames = selectedData.map(function(d) {
        let reserveringsuitgaven = d.reserveringsuitgaven.naam;
        let vastelasten = d.vastelasten.naam;
        let overigevastelasten = d.overigevastelasten.naam;
        let huishoudelijkeuitgaven = d.huishoudelijkeuitgaven.naam;
        return [reserveringsuitgaven, vastelasten, overigevastelasten, huishoudelijkeuitgaven];
    });

    var categoriesValues = selectedData.map(function(d) {
        let reserveringsuitgaven = d.reserveringsuitgaven.totaal;
        let vastelasten = d.vastelasten.totaal;
        let overigevastelasten = d.overigevastelasten.totaal;
        let huishoudelijkeuitgaven = d.huishoudelijkeuitgaven.totaal;
        return [reserveringsuitgaven, vastelasten, overigevastelasten, huishoudelijkeuitgaven];
    });



    console.log("selected data ", selectedData);
    // calculated values
    document.querySelectorAll('.vergelijkbaarHuishouden ul li').innerHTML = '';
    document.querySelector('.vergelijkbaarHuishouden ul li:first-of-type').innerHTML = "€" + selectedData.map(d => d.vastelasten.huurhypotheek) + ",-";
    document.querySelector('.vergelijkbaarHuishouden ul li:nth-of-type(2)').innerHTML = "€" + selectedData.map(d => d.vastelasten.gwl) + ",-";
    document.querySelector('.vergelijkbaarHuishouden ul li:nth-of-type(3)').innerHTML = "€" + selectedData.map(d => d.overigevastelasten.verzekeringen) + ",-";
    document.querySelector('.vergelijkbaarHuishouden ul li:nth-of-type(4)').innerHTML = "€" + selectedData.map(d => d.overigevastelasten.telefoontelevisieinternet) + ",-";

}

function localStor(){
    // onclick: https://stackoverflow.com/questions/1947263/using-an-html-button-to-call-a-javascript-function
    // localStorage save: http://jsfiddle.net/rx0rjaf3/7/
    document.getElementById("showResults").onclick = function () {
        // check if browser supports localStorage
        if (typeof(Storage) != "undefined") {
            localStorage.setItem("inkomsten", document.getElementById("inkomsten").value);
            var inkomsten = localStorage.getItem("inkomsten");

            document.getElementById("inkomsten").value = inkomsten;

            let localData = {
                reserveringsuitgaven: {
                    naam: "Reserverings uitgaven",
                //     totaal: Math.round(kledingEnSchoenen + inventaris + huisEnTuin + nietVergoedeZiektekosten + vrijetijdsUitgaven),
                //     kleding: Math.round(kledingEnSchoenen),
                //     inventaris: Math.round(inventaris),
                //     huisentuinonderhoud: Math.round(huisEnTuin),
                //     nietvergoedeziektekosten: Math.round(nietVergoedeZiektekosten),
                //     vrijetijdsuitgaven: Math.round(vrijetijdsUitgaven),
                },
                vastelasten: {
                    naam: "Vaste lasten",
                //     totaal: Math.round(vasteLasten),
                //     huurhypotheek: Math.round(huurHypotheek),
                //     gas: Math.round(gas),
                //     elektriciteit: Math.round(elektriciteit),
                //     water: Math.round(water),
                //     lokaleLasten: Math.round(lokaleLasten),
                },
                overigevastelasten: {
                    naam: "Overige vaste lasten",
                //     totaal: Math.round(telefoonTelevisieInternet + verzekeringen + contributiesAbonnementen + onderwijs + kinderopvang),
                //     telefoontelevisieinternet: Math.round(telefoonTelevisieInternet),
                //     verzekeringen: Math.round(verzekeringen),
                //     contributiesenabonnementen: Math.round(contributiesAbonnementen),
                //     onderwijs: Math.round(onderwijs),
                //     kinderopvang: Math.round(kinderopvang),
                //     vervoer: Math.round(vervoer),
                },
                huishoudelijkeuitgaven: {
                    naam: "Huishoudelijke uitgaven",
                //     totaal: Math.round(huishoudelijkeUitgaven),
                //     voeding: Math.round(voeding),
                //     overigehuishoudelijkeuitgaven: Math.round(overigeHuishoudelijkeUitgaven),
                //     reserveringsuitgaven: Math.round(reserveringsUitgaven),
                },

                inkomen: Math.round(inkomsten)
                // uitgaven: Math.round(uitgaven),
                // saldo: saldo,
                // min: Math.round(min),
                // max: Math.round(inkomen)
            };
            console.log(localData);
        } else {
            document.getElementById("result").innerHTML = "Je browser ondersteund geen Local Storage";//Error
        }
    }
}

// Check dit voor tweede click: https://stackoverflow.com/questions/44572859/a-function-that-runs-on-the-second-click?answertab=oldest#tab-top
document.getElementById('saveSituatie').onclick = function() {
    document.getElementById('form').classList.add('stepTwo')
    document.querySelector('.container > header').classList.add('stepTwo')
}
