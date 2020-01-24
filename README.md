# NIBUD Bugetcheck
## Inhoudsopgave
- [Concept](https://github.com/RoyCsuka/nibud/blob/master/README.md#de-opdracht)
- [Concept](https://github.com/RoyCsuka/nibud/blob/master/README.md#concept)
   - [Design](https://github.com/RoyCsuka/nibud/blob/master/README.md#design)
   - [Uitwerking](https://github.com/RoyCsuka/nibud/blob/master/README.md#uitwerking)
- [Dependency](https://github.com/RoyCsuka/nibud/blob/master/README.md#dependency)
- [Features](https://github.com/RoyCsuka/nibud/blob/master/README.md#features)
   - [Inloggen](https://github.com/RoyCsuka/nibud/blob/master/README.md#inloggen)
   - [Formulieren](https://github.com/RoyCsuka/nibud/blob/master/README.md#formulieren)
   - [Local storage](https://github.com/RoyCsuka/nibud/blob/master/README.md#localstorage)
   - [Persoonlijke tips](https://github.com/RoyCsuka/nibud/blob/master/README.md#persoonlijke-tips-krijgen-als-je-meer-uitgeeft-dan-het-gemiddelde)
- [Data](https://github.com/RoyCsuka/nibud/blob/master/README.md#data)
- [Nice to have](https://github.com/RoyCsuka/nibud/blob/master/README.md#nice-to-have)
- [Credits](https://github.com/RoyCsuka/nibud/blob/master/README.md#credits)   


# De opdracht
Het onafhankelijke voorlichtingsinstituut Nibud, doet onderzoek en geeft voorlichting over de huishoudportemonnee van Nederland.

Naast het geven van trainingen en onderzoek doen, maakt het Nibud ook gebruik van een voorlichtingsboek. Dit boek geeft voor verschillende levenssituaties een mogelijkheid om met geld om te gaan. Denk hierbij aan studeren, scheiden, krijgen van kinderen en hypotheekzaken.

Het boekje is tot op heden alleen offline te gebruiken, het Nibud wil graag een stapje verder gaan en deze hulp ook online aanbieden. De vraag hierbij of hoofdstukken 3 en 4 (uitgaven en begrotingen) visueel weergegeven kunnen worden zodat deze in de praktijk duidelijk is voor consumenten en budgetcoaches.

# Concept
Voor het nibud gaan wij twee bestaande tools samenvoegen. Namelijk het budgethandboek en het online budgetadvies. Met deze tool krijg je een overzicht te zien van je uitgaven en inzichten over mogelijke besparing van deze uitgaven.

## Design
Hieronder is het prototype te zien van ons gekozen concept. Dit prototype is gebouwd in Adobe XD en [hier](https://xd.adobe.com/view/33113488-6b6d-45ec-5da0-83728d24ebde-4520/) is de online link van het prototype design.
Voor het prototype zijn er verschillende stappen die je moet doorlopen die hieronder te zien zijn:

> Het invullen van je huidige situatie

![Huidige situatie](https://raw.githubusercontent.com/RoyCsuka/assets/master/situatie.png)

> Het invullen van al je uitgaven

![Huidige situatie](https://raw.githubusercontent.com/RoyCsuka/assets/master/uitgaven.png)

> Hiervan krijgt de gebruiker een overzicht en kan die meteen zien waar het probleem ligt

![Huidige situatie](https://raw.githubusercontent.com/RoyCsuka/assets/master/overzicht.png)

> En als je onzeker bent over je geldzaken en je komt er niet uit met de tips, kun je altijd contact opnemen met een budgetcoach

![Huidige situatie](https://raw.githubusercontent.com/RoyCsuka/assets/master/neemcontactop.png)

## Uitwerking
Hieronder is het prototype te zien die met Chart.js en D3 gebouwd is:
![Prototype gifje](https://i.gyazo.com/8305839a78c4f3862a8e841cb189e8ff.gif)
> Voor de volledige werking en flow, [bekijk dan de live link](https://serene-dubinsky-c2c707.netlify.com/).

# Dependency
De visualisaties zijn gemaakt in [Chart.js](https://www.chartjs.org/) en er zijn [D3 feautures](https://d3js.org/) gebruikt voor de data.

# Werkende features
## Formulieren
Na inloggen zou je al je gegevens in moeten voeren, je huidige leefsitautie (heb je kinderen, woon je alleen, hoe oud ben je, enzovoort), je uitgaven en hierna wordt je vergeleken tot het gemiddelde van de database van het NIBUD d.m.v. een datavisualisatie.

### Localstorage
Om je gegevens te onthouden die je hebt ingevoerd heb ik local storage voor de formulieren gebruikt. Als de gebruiker niks invuld is de waarde automatisch 0 waardoor de gebruiker als nog door kan klikken.

## Persoonlijke tips krijgen als je meer uitgeeft dan het gemiddelde
De tips die krijgt op basis van wat je uitgeeft is een simpele berekening, het ingevoerd bedrag min het gemiddelde bedrag en zodra dit bedrag onder de 0 valt wordt deze wel meegenomen in de "tips" sectie. Hieronder is te zien hoe dat precies werkt

![Prototype gifje](https://i.gyazo.com/ca251945a2364ddb6dfc39508ba2e534.gif)

# Data
Voor de data heb ik de database gekregen van het NIBUD. De data moet ik zelf gaan categoriseren op basis van onze cardsorting die hieronder te zien is. De eerste weergave van de datavisualisatie wordt namelijk verdeelt over de 4 hoofdcategorieën en hierop kun je klikken waardoor je all categorien erbij krijgt die daaronder vallen.
![Cardsorting](https://i.gyazo.com/f9475727dd713f1e6fc61be21bc74d8b.jpg)

# Wat mist er nog?
Hieronder een aantal punten die ik graag nog had uit willen werken als er meer tijd was geweest. Voor volledige beschrijving waar deze punten over gaan [zie mijn wiki](https://github.com/RoyCsuka/nibud/wiki/Wat-er-nog-mist).
1. Log-in feauture
> De tool begint met inloggen, deze optie heb ik helaas niet verwerkt i.v.m. tijdsnood. Het voordeel van inloggen zou zijn dat jouw gegevens alleen te zien zijn als je ingelogd bent. Zo kunnen je gezinsleden of huisgenoten hier niet zomaar in mee kijken als je je hierbij niet prettig zou voelen.
2. Verificatie van input
> Om gebruikersvrienderlijke UX toe te voegen is het handig om de formulieren fout gevoelig te programmeren. Nu is het namelijk nog mogelijk om tekens in te voeren of veel te hogen waardes. Deze fout gevoeligheid heb ik niet aangedacht i.v.m. tijdsnood.
3. Responsive versie
> Pas de laatste week was het design af van de mobiele versie. Het zou handig zijn als deze tool daarvoor ook wordt uitgewerkt.
4. Navigeren met tab zonder bug
> Als je nu navigeert met tab door de formulieren heen ga je niet naar het volgende scherm als dit nodig is.
5. Negative waardes van de line & bar -chart
> De waardes in de min moest rood worden, dit was echter nog moeilijker dan gedacht en heb ik dus niet verwerkt.
6. De tooltips en font family
> De vormgeving van de tooltips (on hover) zijn nog niet naar de huisstijl veranderd en zo is dit ook zo voor het lettertype in de bar & line -chart
7. De laatste gegeven feedback een week voor de oplevering
> Het laatste feedback gesprek was een week voor de presenatie en oplevering dus door tijdsnood is dit niet uitgewerkt.
8. Nul waardes niet meenemen omdat dit geen relevante uitgaven zijn voor de gebruiker
> Als er geen uitgaven zijn voor een bepaalde post hoeft het niet meegenomen te worden in de grafieken.
9. De data
> Het inladen van de data via CSV is wel de mooiste oplossing, echter heb ik het nu met JSON gedaan. Ook heb ik niet alle data ingeladen maar daar kwam ik achteraf pas achter.
10. Niet verder kunnen als de waardes niet ingevoerd zijn
> Je kunt nu verder klikken als invoervelden niet ingevuld zijn.

> Ook is het handig als je de velden hieronder allemaal in hebt gevuld dat de knop een oranje achtergrond krijgt en een witte kleur voor de letters.
![invoervelden](https://i.gyazo.com/6242c6acd2b6ccbcadc50b2bc193ade8.png)

# Credits
Tijdens dit project heb ik een aantal bronnen gebruikt met verschillende doeleindes die mij verder geholpen met het bouwen van deze tool. Hieronder een opsomming van de gebruikte bronnen.

Een website om de CSV code naar JSON om te zetten:
### [Van CSV naar JSON](https://www.csvjson.com/csv2json)

Om de procenten van de tips te berekenen en die met de correcte waarde te vervangen heb dit gebruikt:
### [Het vervangen van een karakter](https://stackoverflow.com/questions/10610402/javascript-replace-all-commas-in-a-string)

Om mijn data te nesten zoals ik het in gedachten had:
### [D3 nesting](http://bl.ocks.org/phoebebright/raw/3176159/)

Om mijn code wat schoner en netter te houden:
### [Verschillende waardes met elkaar vergelijken (if true)...](https://www.tjvantoll.com/2013/03/14/better-ways-of-comparing-a-javascript-string-to-multiple-values/)

Om de kliks te tellen van de formulieren die naar links schuiven
### [Count clicks](https://stackoverflow.com/questions/44572859/a-function-that-runs-on-the-second-click?answertab=oldest#tab-top)
