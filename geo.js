var leagueId;
var response;

function init () {
    var paths = document.getElementsByTagName("path");
    //removes every item except the theme string in localstorage so that the league and match object is not saved when index.html is loaded
    localStorage.removeItem("selectedCountry");
    localStorage.removeItem("selectedMatch");
    localStorage.removeItem("tournamentId");
    localStorage.removeItem("tournamentStage");

    for (let i = 0; i < paths.length; i++) { // for loop that goes through every path element in the svg file
        let cValue = paths[i].getAttribute("value"); // saves the value of the specific clicked path in variable cValue
        paths[i].addEventListener("click", () => { // eventlistener with anonymous function to be able to send arguments into function
            sendValue(cValue);        
        });
        paths[i].style.cursor = "pointer";
        if (paths[i].classList.contains("noLeague")) { // checks if the paths array contains class noleague in html, if so, cursor style is changed
            paths[i].style.cursor = "not-allowed";
        }
    }
}
window.addEventListener("load", init);


// function that recieves the value string from init function and uses it in the xhr request as the tournament_stage_id value

function sendValue(leagueValue) {
    leagueId = leagueValue;
    console.log(leagueId);
    const data = null;
    
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            response = JSON.parse(xhr.responseText);
            reqListener(response);
        }
    });
    
    xhr.open("GET", "https://flashlive-sports.p.rapidapi.com/v1/tournaments/fixtures?locale=en_INT&tournament_stage_id=" + leagueId +"&page=1");
    xhr.setRequestHeader("X-RapidAPI-Key", "2df7d20e7fmshe30517e16f2bffbp13fc9djsnf1999d6df826");
    xhr.setRequestHeader("X-RapidAPI-Host", "flashlive-sports.p.rapidapi.com");
    
    xhr.send(data);
    
}
// retrieves the parsed object from the xhr request as parameter response
// sets the object in localstorage and stringify it so it can be contained
function reqListener(response) {
    console.log(response);
    localStorage.setItem("selectedCountry", JSON.stringify(response.DATA[0]));
    location.href = "fixtures.html";
}

