// Globale variabler
var wsurl;


//Det der skal ske når siden loader
window.onload = function() {

    //Url/adresse til webservicen i variabel
    wsurl = "https://api.dfi.dk/v1/film/?sortby=title&releasestart=2020";

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
        console.log(jsonsvar); //Tester først 

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

    //Variabel til et at rumme filmresultatet i loopen
    var filmresultat = "";

    // Loop gennem jsondata
    for (var x in jsondata.FilmList) {

        //style det gerne lidt med en div rundtt om eller andet
        filmresultat += "<div>" +  jsondata.FilmList[x].Title + "(" + jsondata.FilmList[x].ReleaseYear + ")</div>";
    }

    //Udskriv i html
    document.getElementById("resultat").innerHTML = filmresultat;

};