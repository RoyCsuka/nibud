import { select, geoNaturalEarth1 } from 'd3';
import { cleanedArr } from './cleanData.js';
// Import de locale json files
import main from './nibud-maincat.json';

// local aanroepen
let data = main;

//The initial variable the y axis is set on
let yVar = "";
let xVar = "Alleenstaand";

// Voor de doorklik knoppen
var timesClicked = 0;

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

    console.log("crash", selectedData.map(d => d.reserveringsuitgaven.nietvergoedeziektekosten));

    document.querySelector('.uitgaven .vergelijkbaarHuishouden ul li:first-of-type').innerHTML = "€" + selectedData.map(d => d.reserveringsuitgaven.kleding) + ",-";
    document.querySelector('.uitgaven .vergelijkbaarHuishouden ul li:nth-of-type(2)').innerHTML = "€" + selectedData.map(d => d.reserveringsuitgaven.inventaris) + ",-";
    document.querySelector('.uitgaven .vergelijkbaarHuishouden ul li:nth-of-type(3)').innerHTML = "€" + selectedData.map(d => d.reserveringsuitgaven.nietvergoedeziektekosten) + ",-";
    document.querySelector('.uitgaven .vergelijkbaarHuishouden ul li:nth-of-type(4)').innerHTML = "€" + selectedData.map(d => d.reserveringsuitgaven.vrijetijdsuitgaven) + ",-";

    document.querySelector('.uitgaven.second .vergelijkbaarHuishouden ul li:first-of-type').innerHTML = "€" + selectedData.map(d => d.vastelasten.huurhypotheek) + ",-";
    document.querySelector('.uitgaven.second .vergelijkbaarHuishouden ul li:nth-of-type(2)').innerHTML = "€" + selectedData.map(d => d.vastelasten.gwl) + ",-";
    document.querySelector('.uitgaven.second .vergelijkbaarHuishouden ul li:nth-of-type(3)').innerHTML = "€" + selectedData.map(d => d.vastelasten.telefoontelevisieinternet) + ",-";
    document.querySelector('.uitgaven.second .vergelijkbaarHuishouden ul li:nth-of-type(4)').innerHTML = "€" + selectedData.map(d => d.vastelasten.verzekeringen) + ",-";

    document.querySelector('.uitgaven.third .vergelijkbaarHuishouden ul li:first-of-type').innerHTML = "€" + selectedData.map(d => d.overigevastelasten.contributiesenabonnementen) + ",-";
    document.querySelector('.uitgaven.third .vergelijkbaarHuishouden ul li:nth-of-type(2)').innerHTML = "€" + selectedData.map(d => d.overigevastelasten.onderwijs) + ",-";
    document.querySelector('.uitgaven.third .vergelijkbaarHuishouden ul li:nth-of-type(3)').innerHTML = "€" + selectedData.map(d => d.overigevastelasten.kinderopvang) + ",-";
    document.querySelector('.uitgaven.third .vergelijkbaarHuishouden ul li:nth-of-type(4)').innerHTML = "€" + selectedData.map(d => d.overigevastelasten.vervoer) + ",-";

    document.querySelector('.uitgaven.fourth .vergelijkbaarHuishouden ul li:first-of-type').innerHTML = "€" + selectedData.map(d => d.huishoudelijkeuitgaven.voeding) + ",-";
    document.querySelector('.uitgaven.fourth .vergelijkbaarHuishouden ul li:nth-of-type(2)').innerHTML = "€" + selectedData.map(d => d.huishoudelijkeuitgaven.huisentuinonderhoud) + ",-";
    document.querySelector('.uitgaven.fourth .vergelijkbaarHuishouden ul li:nth-of-type(3)').innerHTML = "€" + selectedData.map(d => d.huishoudelijkeuitgaven.overigehuishoudelijkeuitgaven) + ",-";
    document.querySelector('.uitgaven.fourth .vergelijkbaarHuishouden ul li:nth-of-type(4)').innerHTML = "€" + selectedData.map(d => d.huishoudelijkeuitgaven.reserveringsuitgaven) + ",-";

}

function localStor(){
    // onclick: https://stackoverflow.com/questions/1947263/using-an-html-button-to-call-a-javascript-function
    // localStorage save: http://jsfiddle.net/rx0rjaf3/7/
    document.getElementById("showResults").onclick = function () {
        // check if browser supports localStorage
        if (typeof(Storage) != "undefined") {
            localStorage.setItem("kledingenschoenen", document.getElementById("kledingenschoenen").value);
            var kledingenschoenen = localStorage.getItem("kledingenschoenen");
            document.getElementById("kledingenschoenen").value = kledingenschoenen;

            localStorage.setItem("gwlenlokalelasten", document.getElementById("gwlenlokalelasten").value);
            var gwlenlokalelasten = localStorage.getItem("gwlenlokalelasten");
            document.getElementById("gwlenlokalelasten").value = gwlenlokalelasten;

            localStorage.setItem("inkomsten", document.getElementById("inkomsten").value);
            var inkomsten = localStorage.getItem("inkomsten");
            document.getElementById("inkomsten").value = inkomsten;

            localStorage.setItem("huurhypotheek", document.getElementById("huurhypotheek").value);
            var huurhypotheek = localStorage.getItem("huurhypotheek");
            document.getElementById("huurhypotheek").value = huurhypotheek;

            localStorage.setItem("kinderopvang", document.getElementById("kinderopvang").value);
            var kinderopvang = localStorage.getItem("kinderopvang");
            document.getElementById("kinderopvang").value = kinderopvang;

            localStorage.setItem("contributiesenabonnementen", document.getElementById("contributiesenabonnementen").value);
            var contributiesenabonnementen = localStorage.getItem("contributiesenabonnementen");
            document.getElementById("contributiesenabonnementen").value = contributiesenabonnementen;

            localStorage.setItem("verzekeringen", document.getElementById("verzekeringen").value);
            var verzekeringen = localStorage.getItem("verzekeringen");
            document.getElementById("verzekeringen").value = verzekeringen;

            localStorage.setItem("telefoontelevisieinternet", document.getElementById("telefoontelevisieinternet").value);
            var telefoontelevisieinternet = localStorage.getItem("telefoontelevisieinternet");
            document.getElementById("telefoontelevisieinternet").value = telefoontelevisieinternet;

            localStorage.setItem("onderwijs", document.getElementById("onderwijs").value);
            var onderwijs = localStorage.getItem("onderwijs");
            document.getElementById("onderwijs").value = onderwijs;

            localStorage.setItem("vervoer", document.getElementById("vervoer").value);
            var vervoer = localStorage.getItem("vervoer");
            document.getElementById("vervoer").value = vervoer;

            localStorage.setItem("inventaris", document.getElementById("inventaris").value);
            var inventaris = localStorage.getItem("inventaris");
            document.getElementById("inventaris").value = inventaris;

            localStorage.setItem("nietvergoedeziektekosten", document.getElementById("nietvergoedeziektekosten").value);
            var nietvergoedeziektekosten = localStorage.getItem("nietvergoedeziektekosten");
            document.getElementById("nietvergoedeziektekosten").value = nietvergoedeziektekosten;

            localStorage.setItem("vrijetijdsuitgaven", document.getElementById("vrijetijdsuitgaven").value);
            var vrijetijdsuitgaven = localStorage.getItem("vrijetijdsuitgaven");
            document.getElementById("vrijetijdsuitgaven").value = vrijetijdsuitgaven;

            localStorage.setItem("voeding", document.getElementById("voeding").value);
            var voeding = localStorage.getItem("voeding");
            document.getElementById("voeding").value = voeding;

            localStorage.setItem("overigehuishoudelijkeuitgaven", document.getElementById("overigehuishoudelijkeuitgaven").value);
            var overigehuishoudelijkeuitgaven = localStorage.getItem("overigehuishoudelijkeuitgaven");
            document.getElementById("overigehuishoudelijkeuitgaven").value = overigehuishoudelijkeuitgaven;

            localStorage.setItem("reserveringsuitgaven", document.getElementById("reserveringsuitgaven").value);
            var reserveringsuitgaven = localStorage.getItem("reserveringsuitgaven");
            document.getElementById("reserveringsuitgaven").value = reserveringsuitgaven;

            localStorage.setItem("huisentuinonderhoud", document.getElementById("huisentuinonderhoud").value);
            var huisentuinonderhoud = localStorage.getItem("huisentuinonderhoud");
            document.getElementById("huisentuinonderhoud").value = huisentuinonderhoud;



            let localData = {
                reserveringsuitgaven: {
                    naam: "Reserverings uitgaven",
                    totaal: Math.round(Number(kledingenschoenen) + Number(inventaris) + Number(nietvergoedeziektekosten) + Number(vrijetijdsuitgaven)),
                    kleding: Number(kledingenschoenen),
                    inventaris: Number(inventaris),
                    nietvergoedeziektekosten: Number(nietvergoedeziektekosten),
                    vrijetijdsuitgaven: Number(vrijetijdsuitgaven),
                },
                vastelasten: {
                    naam: "Primaire vaste lasten",
                    totaal: Math.round(Number(huurhypotheek) + Number(gwlenlokalelasten) + Number(telefoontelevisieinternet) + Number(verzekeringen)),
                    huurhypotheek: Number(huurhypotheek),
                    gwl: Number(gwlenlokalelasten),
                    telefoontelevisieinternet: Number(telefoontelevisieinternet),
                    verzekeringen: Number(verzekeringen)
                },
                overigevastelasten: {
                    naam: "Overige vaste lasten",
                    totaal: Math.round(Number(contributiesenabonnementen) + Number(onderwijs) + Number(kinderopvang) + Number(vervoer)),
                    contributiesenabonnementen: Number(contributiesenabonnementen),
                    onderwijs: Number(onderwijs),
                    kinderopvang: Number(kinderopvang),
                    vervoer: Number(vervoer),
                },
                huishoudelijkeuitgaven: {
                    naam: "Huishoudelijke uitgaven",
                    totaal: Math.round(Number(voeding) + Number(huisentuinonderhoud) + Number(overigehuishoudelijkeuitgaven) + Number(reserveringsuitgaven)),
                    voeding: Number(voeding),
                    huisentuinonderhoud: Number(huisentuinonderhoud),
                    overigehuishoudelijkeuitgaven: Number(overigehuishoudelijkeuitgaven),
                    reserveringsuitgaven: Number(reserveringsuitgaven),
                },

                inkomen: Number(inkomsten),
                // uitgaven: uitgaven,
                // saldo: saldo,
                // min: min,
                // max: inkomen
            };
            console.log(localData);

            document.querySelector('.containerSlider').classList.remove('slideTwo');
            document.querySelector('.containerSlider').classList.add('results');
        } else {
            document.getElementById("result").innerHTML = "Je browser ondersteund geen Local Storage";//Error
        }
    }
}

// INVOEREN VAN GEGEVENS
// Verder klik knop
// Check dit voor tweede click: https://stackoverflow.com/questions/44572859/a-function-that-runs-on-the-second-click?answertab=oldest#tab-top
document.getElementById('saveSituatie').onclick = function() {

    timesClicked ++;

    if(timesClicked == 1) {
        document.getElementById('form').classList.add('stepTwo');
        document.querySelector('.container > header').classList.add('stepTwo');
    } else if(timesClicked == 2) {
        document.querySelector('.containerSlider').classList.remove('slideTwo');
        document.querySelector('.containerSlider').classList.add('slideOne');
    } else if(timesClicked == 3) {
        document.querySelector('.containerSlider').classList.remove('slideOne');
        document.querySelector('.containerSlider').classList.add('slideTwo');
    } else if(timesClicked == 4) {
        document.querySelector('.containerSlider').classList.remove('slideTwo');
        document.querySelector('.containerSlider').classList.add('slideThree');
    } else {
        console.log("forward");
    }
}

// Terug knop
document.getElementById('back').onclick = function() {
    timesClicked --;

    if(timesClicked == 0) {
        document.getElementById('form').classList.remove('stepTwo');
        document.querySelector('.container > header').classList.remove('stepTwo');
    } else if(timesClicked == 1) {
        document.querySelector('.containerSlider').classList.remove('slideTwo');
        document.querySelector('.containerSlider').classList.remove('slideOne');
    } else if(timesClicked == 2) {
        document.querySelector('.containerSlider').classList.remove('slideTwo');
        document.querySelector('.containerSlider').classList.add('slideOne');
    } else if(timesClicked == 3) {
        document.querySelector('.containerSlider').classList.remove('slideThree');
        document.querySelector('.containerSlider').classList.add('slideTwo');
    } else {
        console.log("back");
        timesClicked ++;
    }
}
