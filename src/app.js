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

// Selecteer chart
var barChart = document.getElementById('subCat');
var lineChart = document.getElementById('mainCat');

makeBugetVisualisation()

// Our main function which runs other function to make a visualization
async function makeBugetVisualisation() {
    data = await cleanedArr(data)

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

    // calculated values
    document.querySelectorAll('.vergelijkbaarHuishouden ul li').innerHTML = '';

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

    localStor(selectedData)

}

function localStor(currentData) {
    // onclick: https://stackoverflow.com/questions/1947263/using-an-html-button-to-call-a-javascript-function
    // localStorage save: http://jsfiddle.net/rx0rjaf3/7/
    document.getElementById("showResults").onclick = function () {
        // check if browser supports localStorage
        if (typeof(Storage) != "undefined") {
            localStorage.setItem("leeftijd", document.getElementById("leeftijd").value);
            localStorage.setItem("kledingenschoenen", document.getElementById("kledingenschoenen").value);
            localStorage.setItem("gwlenlokalelasten", document.getElementById("gwlenlokalelasten").value);
            localStorage.setItem("inkomsten", document.getElementById("inkomsten").value);
            localStorage.setItem("huurhypotheek", document.getElementById("huurhypotheek").value);
            localStorage.setItem("kinderopvang", document.getElementById("kinderopvang").value);
            localStorage.setItem("contributiesenabonnementen", document.getElementById("contributiesenabonnementen").value);
            localStorage.setItem("verzekeringen", document.getElementById("verzekeringen").value);
            localStorage.setItem("telefoontelevisieinternet", document.getElementById("telefoontelevisieinternet").value);
            localStorage.setItem("onderwijs", document.getElementById("onderwijs").value);
            localStorage.setItem("vervoer", document.getElementById("vervoer").value);
            localStorage.setItem("inventaris", document.getElementById("inventaris").value);
            localStorage.setItem("nietvergoedeziektekosten", document.getElementById("nietvergoedeziektekosten").value);
            localStorage.setItem("vrijetijdsuitgaven", document.getElementById("vrijetijdsuitgaven").value);
            localStorage.setItem("voeding", document.getElementById("voeding").value);
            localStorage.setItem("overigehuishoudelijkeuitgaven", document.getElementById("overigehuishoudelijkeuitgaven").value);
            localStorage.setItem("reserveringsuitgaven", document.getElementById("reserveringsuitgaven").value);
            localStorage.setItem("huisentuinonderhoud", document.getElementById("huisentuinonderhoud").value);

            drawChart(currentData)

            document.querySelector('.containerSlider').classList.remove('slideTwo');
            document.querySelector('body').classList.add('results');
        } else {
            document.getElementById("result").innerHTML = "Je browser ondersteund geen Local Storage";//Error
        }
    }

    // fill in form values
    var leeftijd = localStorage.getItem("leeftijd");
    document.getElementById("leeftijd").value = leeftijd;
    var kledingenschoenen = localStorage.getItem("kledingenschoenen");
    document.getElementById("kledingenschoenen").value = kledingenschoenen;
    var gwlenlokalelasten = localStorage.getItem("gwlenlokalelasten");
    document.getElementById("gwlenlokalelasten").value = gwlenlokalelasten;
    var inkomsten = localStorage.getItem("inkomsten");
    document.getElementById("inkomsten").value = inkomsten;
    var huurhypotheek = localStorage.getItem("huurhypotheek");
    document.getElementById("huurhypotheek").value = huurhypotheek;
    var kinderopvang = localStorage.getItem("kinderopvang");
    document.getElementById("kinderopvang").value = kinderopvang;
    var contributiesenabonnementen = localStorage.getItem("contributiesenabonnementen");
    document.getElementById("contributiesenabonnementen").value = contributiesenabonnementen;
    var verzekeringen = localStorage.getItem("verzekeringen");
    document.getElementById("verzekeringen").value = verzekeringen;
    var telefoontelevisieinternet = localStorage.getItem("telefoontelevisieinternet");
    document.getElementById("telefoontelevisieinternet").value = telefoontelevisieinternet;
    var onderwijs = localStorage.getItem("onderwijs");
    document.getElementById("onderwijs").value = onderwijs;
    var vervoer = localStorage.getItem("vervoer");
    document.getElementById("vervoer").value = vervoer;
    var inventaris = localStorage.getItem("inventaris");
    document.getElementById("inventaris").value = inventaris;
    var nietvergoedeziektekosten = localStorage.getItem("nietvergoedeziektekosten");
    document.getElementById("nietvergoedeziektekosten").value = nietvergoedeziektekosten;
    var vrijetijdsuitgaven = localStorage.getItem("vrijetijdsuitgaven");
    document.getElementById("vrijetijdsuitgaven").value = vrijetijdsuitgaven;
    var voeding = localStorage.getItem("voeding");
    document.getElementById("voeding").value = voeding;
    var overigehuishoudelijkeuitgaven = localStorage.getItem("overigehuishoudelijkeuitgaven");
    document.getElementById("overigehuishoudelijkeuitgaven").value = overigehuishoudelijkeuitgaven;
    var reserveringsuitgaven = localStorage.getItem("reserveringsuitgaven");
    document.getElementById("reserveringsuitgaven").value = reserveringsuitgaven;
    var huisentuinonderhoud = localStorage.getItem("huisentuinonderhoud");
    document.getElementById("huisentuinonderhoud").value = huisentuinonderhoud;
}

function drawChart(currentData) {
    var allTotalValues = currentData.map(function(d) {
        var totaleUitgaven = d.reserveringsuitgaven.totaal + d.vastelasten.totaal + d.overigevastelasten.totaal + d.huishoudelijkeuitgaven.totaal;
        let beginSaldo = d.inkomen;
        let reserveringsuitgaven = beginSaldo - d.reserveringsuitgaven.totaal;
        let vastelasten = reserveringsuitgaven - d.vastelasten.totaal;
        let overigevastelasten = vastelasten - d.overigevastelasten.totaal;
        let huishoudelijkeuitgaven = totaleUitgaven - d.huishoudelijkeuitgaven.totaal;
        return [beginSaldo, reserveringsuitgaven, vastelasten, overigevastelasten, huishoudelijkeuitgaven];
    });

    function allTotalValuesLocal() {
        var totaleUitgavenLocal = '';
        let beginSaldo = Number(localStorage.getItem("inkomsten"))

        let reserveringsuitgaven = Number(localStorage.getItem("kledingenschoenen")) + Number(localStorage.getItem("inventaris")) + Number(localStorage.getItem("nietvergoedeziektekosten")) + Number(localStorage.getItem("vrijetijdsuitgaven"));
        let saldoReserveringsuitgaven = beginSaldo - reserveringsuitgaven;

        let vastelasten = Number(localStorage.getItem("huurhypotheek")) + Number(localStorage.getItem("gwlenlokalelasten")) + Number(localStorage.getItem("telefoontelevisieinternet")) + Number(localStorage.getItem("verzekeringen"));
        let saldoVastelasten = saldoReserveringsuitgaven - vastelasten;

        let overigevastelasten = Number(localStorage.getItem("contributiesenabonnementen")) + Number(localStorage.getItem("onderwijs")) + Number(localStorage.getItem("kinderopvang")) + Number(localStorage.getItem("vervoer"));
        let overigevastelastenSaldo = saldoVastelasten - overigevastelasten;

        let huishoudelijkeuitgaven = Number(localStorage.getItem("voeding")) + Number(localStorage.getItem("huisentuinonderhoud")) + Number(localStorage.getItem("overigehuishoudelijkeuitgaven")) + Number(localStorage.getItem("reserveringsuitgaven"));
        let huishoudelijkeuitgavenSaldo = overigevastelastenSaldo - huishoudelijkeuitgaven;

        return [beginSaldo, saldoReserveringsuitgaven, saldoVastelasten, overigevastelastenSaldo, huishoudelijkeuitgavenSaldo];
    }

    console.log("local", allTotalValuesLocal()[0]);
    console.log("dataset", allTotalValues[0][1]);

    let differenceOfReserveringsuitgaven = allTotalValuesLocal()[0] - allTotalValues[0][1];

    document.querySelector('#reserveringsuitgavenSaldo b').innerHTML = "-€" + Math.abs(differenceOfReserveringsuitgaven);

    // Line chart
    var mainCat = new Chart(lineChart, {
        type: 'line',
        data: {
            labels: ['', '', '', '', ''],
            datasets: [{
                label: 'Gemiddeld NL',
                backgroundColor:'rgba(0, 0, 0, 0)',
                borderColor: '#CDCDCD',
                data: allTotalValues[0]
            }, {
                label: 'Jouw uitgaven',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: '#E36B0A',
                data: allTotalValuesLocal()
            }]
        },
        options: {
            borderWidth: 5,
            elements: {
                line: {
                    tension: 0
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display:false
                    }
                }]
            }
        }
    });

    // Zero state barchart
    var myChart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: ['', '', '', ''],
            datasets: [{
                label: 'Gemiddeld NL',
                backgroundColor: '#E36B0A',
                barThickness: 55,
                data: [8,8,8,8]
            }, {
                label: 'Jouw uitgaven',
                backgroundColor:'#A2A2A2',
                barThickness: 55,
                data: [8,8,8,8]
            }]
        },
        options: {
        barValueSpacing: 20,
            scales: {
                yAxes: [{
                    ticks: {
                        max: 350,
                        beginAtZero: true
                    },
                    barPercentage: 1.0,
                    categoryPercentage: 1.0,
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            }
        }
    });

    // Click on reserveringsuitgaven
    document.querySelector('.dashboard div.reserveringsuitgaven').onclick = function() {
        document.querySelector('.lineChartMainCat').classList.remove('vastelasten')
        document.querySelector('.lineChartMainCat').classList.remove('overigevastelasten')
        document.querySelector('.lineChartMainCat').classList.remove('huishoudelijkeuitgaven')
        document.querySelector('.zeroState').classList.remove('zeroState')
        document.querySelector('.lineChartMainCat').classList.add('reserveringsuitgaven')

        var reserveringsuitgavenNaam = currentData.map(function(d) {
            return d.reserveringsuitgaven.naam;
        });

        var reserveringsuitgavenValues = currentData.map(function(d) {
            let kleding = d.reserveringsuitgaven.kleding;
            let inventaris = d.reserveringsuitgaven.inventaris;
            let nietvergoedeziektekosten = d.reserveringsuitgaven.nietvergoedeziektekosten;
            let vrijetijdsuitgaven = d.reserveringsuitgaven.vrijetijdsuitgaven;
            return [kleding, inventaris, nietvergoedeziektekosten, vrijetijdsuitgaven];
        });

        var subCat = new Chart(barChart, {
            type: 'bar',
            data: {
                labels: ['Kleding en schoenen', 'Inventaris', 'Niet vergoede ziektekosten', 'Vrijetijds uitgaven'],
                datasets: [{
                    backgroundColor:'#A2A2A2',
                    barThickness: 55,
                    data: reserveringsuitgavenValues[0]
                }, {
                    backgroundColor: '#E36B0A',
                    barThickness: 55,
                    data: [localStorage.getItem("kledingenschoenen"), localStorage.getItem("inventaris"), localStorage.getItem("nietvergoedeziektekosten"), localStorage.getItem("vrijetijdsuitgaven")]
                }]
            },
            options: {
                barValueSpacing: 20,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            // display:false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            // display:false
                        }
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.yLabel;
                        }
                    }
                }
            }
        });
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

document.querySelector('header nav ul li:first-of-type').onclick = function() {
    timesClicked = 0;
    document.querySelector('.containerSlider').classList.remove('slideOne');
    document.querySelector('.containerSlider').classList.remove('slideTwo');
    document.querySelector('.containerSlider').classList.remove('slideThree');
    document.querySelector('header').classList.remove('stepTwo');
    document.querySelector('form').classList.remove('stepTwo');
}

// Terug naar formulieren knop
document.getElementById('gegevensAanpassen').onclick = function() {
    document.querySelector('body').classList.remove('results');
}
