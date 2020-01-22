import { select, geoNaturalEarth1 } from 'd3';
import { cleanedArr } from './cleanData.js';
// Import de locale json files
import main from './nibud-maincat.json';
import budgettips from './budgettips.json';

// local aanroepen
let data = main;
var allTips = budgettips

allTips.forEach(i => {
    // console.log("Alltips dataset", i);
    if(i === "Kleding en schoenen") {

    }
    // console.log(i.soortuitgaven);
});

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
        console.log("eerste uitgaven", d.reserveringsuitgaven);
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

    let differenceOfReserveringsuitgaven = allTotalValuesLocal()[0] - allTotalValuesLocal()[1];
    let differenceOfVastelasten = allTotalValuesLocal()[1] - allTotalValuesLocal()[2];
    let differenceOfOverigevastelasten = allTotalValuesLocal()[2] - allTotalValuesLocal()[3];
    let differenceOfHuishoudelijkeuitgaven = allTotalValuesLocal()[3] - allTotalValuesLocal()[4];

    document.querySelector('#reserveringsuitgavenSaldo b').innerHTML = "-€" + Math.abs(differenceOfReserveringsuitgaven) + ",-";
    document.querySelector('#vastelastenSaldo b').innerHTML = "-€" + Math.abs(differenceOfVastelasten) + ",-";
    document.querySelector('#overigevastelastenSaldo b').innerHTML = "-€" + Math.abs(differenceOfOverigevastelasten) + ",-";
    document.querySelector('#huishoudelijkeuitgavenSaldo b').innerHTML = "-€" + Math.abs(differenceOfHuishoudelijkeuitgaven) + ",-";

    // Line chart -------------------------------------------------------------
    var mainCat = new Chart(lineChart, {
        type: 'line',
        data: {
            labels: ['', '', '', '', ''],
            datasets: [{
                label: 'Uw uitgaven',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: '#E36B0A',
                data: allTotalValuesLocal()
            }, {
                label: 'Gemiddeld',
                backgroundColor:'rgba(0, 0, 0, 0)',
                borderColor: '#CDCDCD',
                data: allTotalValues[0]
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
                xAxes: [{
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display:false
                    },
                    ticks: {
                        beginAtZero: true,
                        fontFamily: 'WhitneyMedium',
                        fontColor: '#0F6000'
                    }
                }]
            }
        }
    });

    // Zero state barchart & Settings of the barChart -----------------
    var subCat = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: ['', '', '', ''],
            datasets: [{
                label: '',
                backgroundColor: '#E36B0A',
                barThickness: 55,
                data: [8,8,8,8]
            }, {
                label: '',
                backgroundColor:'#A2A2A2',
                barThickness: 55,
                data: [8,8,8,8]
            }]
        },
        options: {
        barValueSpacing: 20,
            scales: {
                xAxes: [{
                    barPercentage: 1.0,
                    categoryPercentage: 1.0,
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    barPercentage: 1.0,
                    categoryPercentage: 1.0,
                    ticks: {
                        max: 350,
                        beginAtZero: true
                    },
                    gridLines: {
                        display:false
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


    // Onclick mainCat vlakken -----------------------------------------------------------------------------------------
    // Click on reserveringsuitgaven ----------------------------------------------------------
    document.querySelector('.lineChartMainCat').onclick = function removeZeroState() {
        document.querySelector('.barchartResults').classList.remove('zeroState')
        document.querySelector('.container.dashboard > section:nth-of-type(2)').classList.add('barchartResults')
        removeEventListener('click', removeZeroState);
    }

    document.querySelector('.dashboard div.reserveringsuitgaven').onclick = function() {
        document.querySelector('.lineChartMainCat').classList.remove('vastelasten')
        document.querySelector('.lineChartMainCat').classList.remove('overigevastelasten')
        document.querySelector('.lineChartMainCat').classList.remove('huishoudelijkeuitgaven')
        document.querySelector('.lineChartMainCat').classList.add('reserveringsuitgaven')

        var reserveringsuitgavenValues = currentData.map(function(d) {
            let kleding = d.reserveringsuitgaven.kleding;
            let inventaris = d.reserveringsuitgaven.inventaris;
            let nietvergoedeziektekosten = d.reserveringsuitgaven.nietvergoedeziektekosten;
            let vrijetijdsuitgaven = d.reserveringsuitgaven.vrijetijdsuitgaven;
            return [kleding, inventaris, nietvergoedeziektekosten, vrijetijdsuitgaven];
        });

        var calculateCurrency = currentData.map(function(d) {
            return [d.reserveringsuitgaven.kleding, d.reserveringsuitgaven.inventaris, d.reserveringsuitgaven.nietvergoedeziektekosten, d.reserveringsuitgaven.vrijetijdsuitgaven]
        });

        var kledingenschoenenSaldo = calculateCurrency[0][0] - Number(localStorage.getItem("kledingenschoenen"));
        var inventarisSaldo = calculateCurrency[0][1] - Number(localStorage.getItem("inventaris"));
        var nietvergoedeziektekostenSaldo = calculateCurrency[0][2] - Number(localStorage.getItem("nietvergoedeziektekosten"));
        var vrijetijdsuitgavenSaldo = calculateCurrency[0][3] - Number(localStorage.getItem("vrijetijdsuitgaven"));

        var totalreserveringsuitgaven = kledingenschoenenSaldo + inventarisSaldo + nietvergoedeziektekostenSaldo + vrijetijdsuitgavenSaldo;

        document.querySelector('.barchartResults > h2 span').innerHTML = "€" + Math.abs(totalreserveringsuitgaven) + ",-";
        document.querySelector('#firstBar b').innerHTML = "€" + Math.abs(kledingenschoenenSaldo) + ",-";
        document.querySelector('#firstBar h5').innerHTML = "Kleding en schoenen";
        document.querySelector('#secondBar b').innerHTML = "€" + Math.abs(inventarisSaldo) + ",-";
        document.querySelector('#secondBar h5').innerHTML = "Inventaris";
        document.querySelector('#thirdBar b').innerHTML = "€" + Math.abs(nietvergoedeziektekostenSaldo) + ",-";
        document.querySelector('#thirdBar h5').innerHTML = "Niet-vergoede ziektekosten";
        document.querySelector('#fourthBar b').innerHTML = "€" + Math.abs(vrijetijdsuitgavenSaldo) + ",-";
        document.querySelector('#fourthBar h5').innerHTML = "Vrijetijdsuitgaven";



        // BUGDETTIPS SECTION
        document.getElementById('tipalert').innerHTML = 0;

        let alluitgaven = {
            kleding: kledingenschoenenSaldo,
            inventaris: inventarisSaldo,
            nietvergoedeziektekosten: nietvergoedeziektekostenSaldo,
            vrijetijdsuitgaven: vrijetijdsuitgavenSaldo
        }

        let values = [kledingenschoenenSaldo, inventarisSaldo, nietvergoedeziektekostenSaldo, vrijetijdsuitgavenSaldo]
        let min = d3.min(values, function (d) {
             return d
         });
        var alerts = 0

        console.log("min", min);
        console.log("data", alluitgaven);

        values.forEach(i => {
            if(i < 0) {
                alerts ++;
            }
        });

        document.getElementById('tipalert').innerHTML = alerts;

        if(kledingenschoenenSaldo < 0) {
            if(kledingenschoenenSaldo === min) {}
            document.getElementById('tipalert').innerHTML
        }
        if(inventarisSaldo < 0) {
            if(inventarisSaldo === min) {}

        }
        if(nietvergoedeziektekostenSaldo < 0) {
            if(nietvergoedeziektekosten === min) {}

        }
        if(vrijetijdsuitgavenSaldo < 0) {
            if(vrijetijdsuitgaven === min) {}

        }

        // Less or more values
        if(totalreserveringsuitgaven > 1) {
            document.querySelector('.barchartResults > h2 span').classList.add('less')
            document.querySelector('.barchartResults > h2 span').append(' minder')
        } else if(totalreserveringsuitgaven === 0) {
            document.querySelector('.barchartResults > h2 span').classList = ('zelfde')
            document.querySelector('.barchartResults > h2 span').append('')
        } else {
            document.querySelector('.barchartResults > h2 span').classList.add('more')
            document.querySelector('.barchartResults > h2 span').append(' meer')
        }

        if(kledingenschoenenSaldo > 1) {
            document.querySelector('#firstBar b').className = 'less';
            document.querySelector('#firstBar b').append(' minder')
        } else if(kledingenschoenenSaldo === 0) {
            document.querySelector('#firstBar b').classList = ('zelfde')
            document.querySelector('#firstBar b').append('')
        } else {
            document.querySelector('#firstBar b').className = 'more';
            document.querySelector('#firstBar b').append(' meer')
        }

        if(inventarisSaldo > 1) {
            document.querySelector('#secondBar b').className = 'less';
            document.querySelector('#secondBar b').append(' minder')
        } else if(inventarisSaldo === 0) {
            document.querySelector('#secondBar b').classList = ('zelfde')
            document.querySelector('#secondBar b').append('')
        } else {
            document.querySelector('#secondBar b').className = 'more';
            document.querySelector('#secondBar b').append(' meer')
        }

        if(nietvergoedeziektekostenSaldo > 1) {
            document.querySelector('#thirdBar b').className = 'less';
            document.querySelector('#thirdBar b').append(' minder')
        } else if(nietvergoedeziektekostenSaldo === 0) {
            document.querySelector('#thirdBar b').classList = ('zelfde')
            document.querySelector('#thirdBar b').append('')
        } else {
            document.querySelector('#thirdBar b').className = 'more';
            document.querySelector('#thirdBar b').append(' meer')
        }

        if(vrijetijdsuitgavenSaldo > 1) {
            document.querySelector('#fourthBar b').className = 'less';
            document.querySelector('#fourthBar b').append(' minder')
        } else if(vrijetijdsuitgavenSaldo === 0) {
            document.querySelector('#fourthBar b').classList = ('zelfde')
            document.querySelector('#fourthBar b').append('')
        } else {
            document.querySelector('#fourthBar b').className = 'more';
            document.querySelector('#fourthBar b').append(' meer')
        }

        subCat.data.datasets[0].data = [localStorage.getItem("kledingenschoenen"), localStorage.getItem("inventaris"), localStorage.getItem("nietvergoedeziektekosten"), localStorage.getItem("vrijetijdsuitgaven")]
        subCat.data.datasets[1].data = reserveringsuitgavenValues[0]
        subCat.options.scales = {
            xAxes: [{
                display: true,
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    display: false
                }
            }]
        };

        subCat.update();
    }


    // Click on vastelasten ----------------------------------------------------------
    document.querySelector('.dashboard div.vastelasten').onclick = function() {
        document.querySelector('.lineChartMainCat').classList.remove('overigevastelasten')
        document.querySelector('.lineChartMainCat').classList.remove('huishoudelijkeuitgaven')
        document.querySelector('.lineChartMainCat').classList.remove('reserveringsuitgaven')
        document.querySelector('.lineChartMainCat').classList.add('vastelasten')

        var vastelastenValues = currentData.map(function(d) {
            let huurhypotheek = d.vastelasten.huurhypotheek;
            let gwl = d.vastelasten.gwl;
            let telefoontelevisieinternet = d.vastelasten.telefoontelevisieinternet;
            let verzekeringen = d.vastelasten.verzekeringen;
            return [huurhypotheek, gwl, telefoontelevisieinternet, verzekeringen];
        });

        var calculateCurrency = currentData.map(function(d) {
            return [d.vastelasten.huurhypotheek, d.vastelasten.gwl, d.vastelasten.telefoontelevisieinternet, d.vastelasten.verzekeringen]
        });

        var huurhypotheekSaldo = calculateCurrency[0][0] - Number(localStorage.getItem("huurhypotheek"));
        var gwlenlokalelastenSaldo = calculateCurrency[0][1] - Number(localStorage.getItem("gwlenlokalelasten"));
        var telefoontelevisieinternetSaldo = calculateCurrency[0][2] - Number(localStorage.getItem("telefoontelevisieinternet"));
        var verzekeringenSaldo = calculateCurrency[0][3] - Number(localStorage.getItem("verzekeringen"));

        var totalvastelasten = huurhypotheekSaldo + gwlenlokalelastenSaldo + telefoontelevisieinternetSaldo + verzekeringenSaldo;

        document.querySelector('.barchartResults > h2 span').innerHTML = "€" + Math.abs(totalvastelasten) + ",-";
        document.querySelector('#firstBar b').innerHTML = "€" + Math.abs(huurhypotheekSaldo) + ",-";
        document.querySelector('#firstBar h5').innerHTML = "Woning";
        document.querySelector('#secondBar b').innerHTML = "€" + Math.abs(gwlenlokalelastenSaldo) + ",-";
        document.querySelector('#secondBar h5').innerHTML = "GWL & Lokale lasten";
        document.querySelector('#thirdBar b').innerHTML = "€" + Math.abs(telefoontelevisieinternetSaldo) + ",-";
        document.querySelector('#thirdBar h5').innerHTML = "Telefoon, televisie & internet";
        document.querySelector('#fourthBar b').innerHTML = "€" + Math.abs(verzekeringenSaldo) + ",-";
        document.querySelector('#fourthBar h5').innerHTML = "Verzekeringen";

        // Less or more values
        if(totalvastelasten > 1) {
            document.querySelector('.barchartResults > h2 span').className = 'less';
            document.querySelector('.barchartResults > h2 span').append(' minder')
        } else if(totalvastelasten === 0) {
            document.querySelector('.barchartResults > h2 span').classList = ('zelfde')
            document.querySelector('.barchartResults > h2 span').append('')
        } else {
            document.querySelector('.barchartResults > h2 span').className = 'more';
            document.querySelector('.barchartResults > h2 span').append(' meer')
        }

        if(huurhypotheekSaldo > 1) {
            document.querySelector('#firstBar b').className = 'less';
            document.querySelector('#firstBar b').append(' minder')
        } else if(huurhypotheekSaldo === 0) {
            document.querySelector('#firstBar b').classList = ('zelfde')
            document.querySelector('#firstBar b').append('')
        } else {
            document.querySelector('#firstBar b').className = 'more';
            document.querySelector('#firstBar b').append(' meer')
        }

        if(gwlenlokalelastenSaldo > 1) {
            document.querySelector('#secondBar b').className = 'less';
            document.querySelector('#secondBar b').append(' minder')
        } else if(gwlenlokalelastenSaldo === 0) {
            document.querySelector('#secondBar b').classList = ('zelfde')
            document.querySelector('#secondBar b').append('')
        } else {
            document.querySelector('#secondBar b').className = 'more';
            document.querySelector('#secondBar b').append(' meer')
        }

        if(telefoontelevisieinternetSaldo > 1) {
            document.querySelector('#thirdBar b').className = 'less';
            document.querySelector('#thirdBar b').append(' minder')
        } else if(telefoontelevisieinternetSaldo === 0) {
            document.querySelector('#thirdBar b').classList = ('zelfde')
            document.querySelector('#thirdBar b').append('')
        } else {
            document.querySelector('#thirdBar b').className = 'more';
            document.querySelector('#thirdBar b').append(' meer')
        }

        if(telefoontelevisieinternetSaldo > 1) {
            document.querySelector('#fourthBar b').className = 'less';
            document.querySelector('#fourthBar b').append(' minder')
        } else if(telefoontelevisieinternetSaldo === 0) {
            document.querySelector('#fourthBar b').classList = ('zelfde')
            document.querySelector('#fourthBar b').append('')
        } else {
            document.querySelector('#fourthBar b').className = 'more';
            document.querySelector('#fourthBar b').append(' meer')
        }

        subCat.data.datasets[0].data = [localStorage.getItem("huurhypotheek"), localStorage.getItem("gwlenlokalelasten"), localStorage.getItem("telefoontelevisieinternet"), localStorage.getItem("verzekeringen")]
        subCat.data.datasets[1].data = vastelastenValues[0]
        subCat.options.scales = {
            xAxes: [{
                display: true,
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    display: false
                }
            }]
        };

        subCat.update();
    }


    // Click on overige overigevastelasten ----------------------------------------------------------
    document.querySelector('.dashboard div.overigevastelasten').onclick = function() {
        document.querySelector('.lineChartMainCat').classList.remove('vastelasten')
        document.querySelector('.lineChartMainCat').classList.remove('huishoudelijkeuitgaven')
        document.querySelector('.lineChartMainCat').classList.remove('reserveringsuitgaven')
        document.querySelector('.lineChartMainCat').classList.add('overigevastelasten')

        var overigevastelastenValues = currentData.map(function(d) {
            let contributiesenabonnementen = d.overigevastelasten.contributiesenabonnementen;
            let onderwijs = d.overigevastelasten.onderwijs;
            let kinderopvang = d.overigevastelasten.kinderopvang;
            let vervoer = d.overigevastelasten.vervoer;
            return [contributiesenabonnementen, onderwijs, kinderopvang, vervoer];
        });

        var calculateCurrency = currentData.map(function(d) {
            return [d.overigevastelasten.contributiesenabonnementen, d.overigevastelasten.onderwijs, d.overigevastelasten.kinderopvang, d.overigevastelasten.vervoer]
        });

        var contributiesenabonnementenSaldo = calculateCurrency[0][0] - Number(localStorage.getItem("contributiesenabonnementen"));
        var onderwijsSaldo = calculateCurrency[0][1] - Number(localStorage.getItem("onderwijs"));
        var kinderopvangSaldo = calculateCurrency[0][2] - Number(localStorage.getItem("kinderopvang"));
        var vervoerSaldo = calculateCurrency[0][3] - Number(localStorage.getItem("vervoer"));

        var totaloverigevastelasten = contributiesenabonnementenSaldo + onderwijsSaldo + kinderopvangSaldo + vervoerSaldo;

        document.querySelector('.barchartResults > h2 span').innerHTML = "€" + Math.abs(totaloverigevastelasten) + ",-";
        document.querySelector('#firstBar b').innerHTML = "€" + Math.abs(contributiesenabonnementenSaldo) + ",-";
        document.querySelector('#firstBar h5').innerHTML = "Contributies en abonnementen";
        document.querySelector('#secondBar b').innerHTML = "€" + Math.abs(onderwijsSaldo) + ",-";
        document.querySelector('#secondBar h5').innerHTML = "Onderwijs";
        document.querySelector('#thirdBar b').innerHTML = "€" + Math.abs(kinderopvangSaldo) + ",-";
        document.querySelector('#thirdBar h5').innerHTML = "Kinderopvang";
        document.querySelector('#fourthBar b').innerHTML = "€" + Math.abs(vervoerSaldo) + ",-";
        document.querySelector('#fourthBar h5').innerHTML = "Vervoer";

        // Less or more values
        if(totaloverigevastelasten > 1) {
            document.querySelector('.barchartResults > h2 span').className = 'less';
            document.querySelector('.barchartResults > h2 span').append(' minder')
        } else if(totaloverigevastelasten === 0) {
            document.querySelector('.barchartResults > h2 span').classList = ('zelfde')
            document.querySelector('.barchartResults > h2 span').append('')
        } else {
            document.querySelector('.barchartResults > h2 span').className = 'more';
            document.querySelector('.barchartResults > h2 span').append(' meer')
        }

        if(contributiesenabonnementenSaldo > 1) {
            document.querySelector('#firstBar b').className = 'less';
            document.querySelector('#firstBar b').append(' minder')
        } else if(contributiesenabonnementenSaldo === 0) {
            document.querySelector('#firstBar b').classList = ('zelfde')
            document.querySelector('#firstBar b').append('')
        } else {
            document.querySelector('#firstBar b').className = 'more';
            document.querySelector('#firstBar b').append(' meer')
        }

        if(onderwijsSaldo > 1) {
            document.querySelector('#secondBar b').className = 'less';
            document.querySelector('#secondBar b').append(' minder')
        } else if(onderwijsSaldo === 0) {
            document.querySelector('#secondBar b').classList = ('zelfde')
            document.querySelector('#secondBar b').append('')
        } else {
            document.querySelector('#secondBar b').className = 'more';
            document.querySelector('#secondBar b').append(' meer')
        }

        if(kinderopvangSaldo > 1) {
            document.querySelector('#thirdBar b').className = 'less';
            document.querySelector('#thirdBar b').append(' minder')
        } else if(kinderopvangSaldo === 0) {
            document.querySelector('#thirdBar b').classList = ('zelfde')
            document.querySelector('#thirdBar b').append('')
        } else {
            document.querySelector('#thirdBar b').className = 'more';
            document.querySelector('#thirdBar b').append(' meer')
        }

        if(kinderopvangSaldo > 1) {
            document.querySelector('#fourthBar b').className = 'less';
            document.querySelector('#fourthBar b').append(' minder')
        } else if(kinderopvangSaldo === 0) {
            document.querySelector('#fourthBar b').classList = ('zelfde')
            document.querySelector('#fourthBar b').append('')
        } else {
            document.querySelector('#fourthBar b').className = 'more';
            document.querySelector('#fourthBar b').append(' meer')
        }

        subCat.data.datasets[0].data = [localStorage.getItem("contributiesenabonnementen"), localStorage.getItem("onderwijs"), localStorage.getItem("kinderopvang"), localStorage.getItem("vervoer")]
        subCat.data.datasets[1].data = overigevastelastenValues[0]
        subCat.options.scales = {
            xAxes: [{
                display: true,
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    display: false
                }
            }]
        }

        subCat.update();
    }


    // Click on overige huishoudelijkeuitgaven ----------------------------------------------------------
    document.querySelector('.dashboard div.huishoudelijkeuitgaven').onclick = function() {
        document.querySelector('.lineChartMainCat').classList.remove('vastelasten')
        document.querySelector('.lineChartMainCat').classList.remove('overigevastelasten')
        document.querySelector('.lineChartMainCat').classList.remove('reserveringsuitgaven')
        document.querySelector('.lineChartMainCat').classList.add('huishoudelijkeuitgaven')

        var huishoudelijkeuitgavenValues = currentData.map(function(d) {
            let voeding = d.huishoudelijkeuitgaven.voeding;
            let huisentuinonderhoud = d.huishoudelijkeuitgaven.huisentuinonderhoud;
            let overigehuishoudelijkeuitgaven = d.huishoudelijkeuitgaven.overigehuishoudelijkeuitgaven;
            let reserveringsuitgaven = d.huishoudelijkeuitgaven.reserveringsuitgaven;
            return [voeding, huisentuinonderhoud, overigehuishoudelijkeuitgaven, reserveringsuitgaven];
        });

        var calculateCurrency = currentData.map(function(d) {
            return [d.huishoudelijkeuitgaven.voeding, d.huishoudelijkeuitgaven.huisentuinonderhoud, d.huishoudelijkeuitgaven.overigehuishoudelijkeuitgaven, d.huishoudelijkeuitgaven.reserveringsuitgaven]
        });

        var voedingSaldo = calculateCurrency[0][0] - Number(localStorage.getItem("voeding"));
        var huisentuinonderhoudSaldo = calculateCurrency[0][1] - Number(localStorage.getItem("huisentuinonderhoud"));
        var overigehuishoudelijkeuitgavenSaldo = calculateCurrency[0][2] - Number(localStorage.getItem("overigehuishoudelijkeuitgaven"));
        var reserveringsuitgavenSaldo = calculateCurrency[0][3] - Number(localStorage.getItem("reserveringsuitgaven"));

        var totalhuishoudelijkeuitgaven = voedingSaldo + huisentuinonderhoudSaldo + overigehuishoudelijkeuitgavenSaldo + reserveringsuitgavenSaldo;

        document.querySelector('.barchartResults > h2 span').innerHTML = "€" + Math.abs(totalhuishoudelijkeuitgaven) + ",-";
        document.querySelector('#firstBar b').innerHTML = "€" + Math.abs(voedingSaldo) + ",-";
        document.querySelector('#firstBar h5').innerHTML = "Voeding";
        document.querySelector('#secondBar b').innerHTML = "€" + Math.abs(huisentuinonderhoudSaldo) + ",-";
        document.querySelector('#secondBar h5').innerHTML = "Huis & tuin";
        document.querySelector('#thirdBar b').innerHTML = "€" + Math.abs(overigehuishoudelijkeuitgavenSaldo) + ",-";
        document.querySelector('#thirdBar h5').innerHTML = "Overige huishoudelijke uitgaven";
        document.querySelector('#fourthBar b').innerHTML = "€" + Math.abs(reserveringsuitgavenSaldo) + ",-";
        document.querySelector('#fourthBar h5').innerHTML = "Huishoudelijke reserverings uitgaven";

        // Less or more values
        if(totalhuishoudelijkeuitgaven > 1) {
            document.querySelector('.barchartResults > h2 span').className = 'less';
            document.querySelector('.barchartResults > h2 span').append(' minder')
        } else if(totalhuishoudelijkeuitgaven === 0) {
            document.querySelector('.barchartResults > h2 span').className = 'zelfde';
            document.querySelector('.barchartResults > h2 span').append('')
        } else {
            document.querySelector('.barchartResults > h2 span').className = 'more';
            document.querySelector('.barchartResults > h2 span').append(' meer')
        }

        if(voedingSaldo > 1) {
            document.querySelector('#firstBar b').className = 'less';
            document.querySelector('#firstBar b').append(' minder')
        } else if(voedingSaldo === 0) {
            document.querySelector('#firstBar b').className = 'zelfde';
            document.querySelector('#firstBar b').append('')
        } else {
            document.querySelector('#firstBar b').className = 'more';
            document.querySelector('#firstBar b').append(' meer')
        }

        if(huisentuinonderhoudSaldo > 1) {
            document.querySelector('#secondBar b').className = 'less';
            document.querySelector('#secondBar b').append(' minder')
        } else if(huisentuinonderhoudSaldo === 0) {
            document.querySelector('#secondBar b').className = 'zelfde';
            document.querySelector('#secondBar b').append('')
        } else {
            document.querySelector('#secondBar b').className = 'more';
            document.querySelector('#secondBar b').append(' meer')
        }

        if(overigehuishoudelijkeuitgavenSaldo > 1) {
            document.querySelector('#thirdBar b').className = 'less';
            document.querySelector('#thirdBar b').append(' minder')
        } else if(overigehuishoudelijkeuitgavenSaldo === 0) {
            document.querySelector('#thirdBar b').className = 'zelfde';
            document.querySelector('#thirdBar b').append('')
        } else {
            document.querySelector('#thirdBar b').className = 'more';
            document.querySelector('#thirdBar b').append(' meer')
        }

        if(overigehuishoudelijkeuitgavenSaldo > 1) {
            document.querySelector('#fourthBar b').className = 'less';
            document.querySelector('#fourthBar b').append(' minder')
        } else if(overigehuishoudelijkeuitgavenSaldo === 0) {
            document.querySelector('#fourthBar b').className = 'zelfde';
            document.querySelector('#fourthBar b').append('')
        } else {
            document.querySelector('#fourthBar b').className = 'more';
            document.querySelector('#fourthBar b').append(' meer')
        }

        subCat.data.datasets[0].data = [localStorage.getItem("voeding"), localStorage.getItem("huisentuinonderhoud"), localStorage.getItem("overigehuishoudelijkeuitgaven"), localStorage.getItem("reserveringsuitgaven")]
        subCat.data.datasets[1].data = huishoudelijkeuitgavenValues[0]
        subCat.options.scales = {
            xAxes: [{
                display: true,
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    display: false
                }
            }]
        }

        subCat.update();
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
