// Globale variabler
var wsurl;


//Det der skal ske når siden loader
window.onload = function() {

    //Url/adresse til webservicen i variabel
    wsurl = "https://api.dfi.dk/v1/film?SortBy=title&Title=";  //søgeord hentes fra inputfeltet

    //Lyt efter "keyup" i inputfeltet - for så skal der søges (kalde funktionen som henter data)
    document.getElementById("inpSoeg").addEventListener("keyup", function(){

        //Hent value fra input-feltet - altså det ord der skal søges på 
        var soegord = document.getElementById("inpSoeg").value;

        //Lav nu webservice-url MED soegord på 
        wsurl = "https://api.dfi.dk/v1/film?SortBy=title&Title=" + soegord;

        //Npår der søges: Kald (igen) funktionen som søger data¨
        kaldWebservice();

    });

    //Når siden loader: Kald funktionen som kalder webservicen (request) og modtager data (response)
    //kaldWebservice();

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
    var soegresultat = "";

    // Loop gennem jsondata
    for (var x in jsondata.FilmList) {

        //style det gerne lidt med en div rundtt om eller andet
        soegresultat += "<div>" +  jsondata.FilmList[x].Title + "(" + jsondata.FilmList[x].ReleaseYear + ")</div>";
    }

    //Udskriv i html
    document.getElementById("resultat").innerHTML = soegresultat;

};



//Her er en API key fra newsapi.org til opgave 4
//Your API key is: b64ee07e378b44869b866cd6cc12d89b

//sammensæt en query-string
//https:newsapi.org/v2/everything?q=denmark&from=2019-10-14&to=2019-10-21&sortBy=publishedAt&apiKey=b64ee07e378b44869b866cd6cc12d89b