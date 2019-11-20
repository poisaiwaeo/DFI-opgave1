// Globale variabler
var wsurl;


//Det der skal ske når siden loader
window.onload = function() {

    //Url/adresse til webservicen i variabel
    wsurl = "https://api.dfi.dk/v1/film/74245";

    //Kald funktionen som kalder webservicen (request) og modtager data (response)
    kaldWebservice();

};

// Funktion til at kalde webservicen
function kaldWebservice() {

    fetch(wsurl, {
        method: 'get', //get' er/henter data
        headers: new Headers({
            //Medsend brugernavn og password til DFI
            Authorization: "Basic " + btoa('F005936:JRbTlfWVMH0bm3n')
        })
    }).then(function(response){

        //Send resultatet/responset fra webservicen videre til næste stop - som json-format
        return response.json();

    }).then(function(jsonsvar){

        //Kontroller data ii konsollen - inden næste stop
        console.log(jsonsvar);
        // Når data ser ok ud - kald funktion som udskriver data i htlml'en
        udskriveData(jsonsvar);

    }).catch(function(error){

        //Håndter/vis eventuelle fejl
        console.log("Det er sket en fejl!!!");
        alert("FEJL!!!");
    })
};

// Funktion til at udskrive data/resultatet i html
function udskriveData(jsondata) {

    //Udtræk og vis filmens titel
    document.getElementById("titel").innerHTML = jsondata.Title + "(" + jsondata.DanishTitle + ")";

    //Udtræk og vis filemns beskrivelse 
    document.getElementById("beskrivelse").innerHTML = jsondata.Description;

    //Udtræk og vis filemns premieredato
    document.getElementById("premiere").innerHTML = "Premiere: " +  jsondata.Premiere[0].PremiereDate;

};