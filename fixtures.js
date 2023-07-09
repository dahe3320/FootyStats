var chosenLeague;
var eventId;

function init () {
        setTimeout(function() { 
            // loading animation before retrieving data from api - applies the class fader to constant loader 
            const loader = document.querySelector('.loader');
            loader.style.display = 'none'
            loader.classList.add('.fader'); 
        }, 1500);
    
    
    localS();
}
window.addEventListener("load", init);

// check if the string selectedCountry is in localStorage
// saves the string in variable chosenLeague and parse it to an object
// sends the variable as an argument to function getData
function localS () {
    if ("selectedCountry" in localStorage) { 
        chosenLeague = JSON.parse(localStorage.getItem("selectedCountry"));
    } 
    getData(chosenLeague);     
}
// function where the data is written out in html
function getData (jsonString) {
    let tournamentSeason = jsonString.TOURNAMENT_SEASON_ID;
    let tournamentStage = jsonString.TOURNAMENT_STAGE_ID;
    localStorage.setItem("tournamentId", tournamentSeason); //save two different ids to localstorage - so that it can be retrieved on the next page
    localStorage.setItem("tournamentStage", tournamentStage);
    let mainContainer = document.getElementById("myData");
        let div = document.createElement("div"); //creates div that the object will be printed inside
        div.innerHTML = '<div class="league"><div class="tagMain"><h2>' + jsonString.SHORT_NAME + '</h2></div></div>';
        let jsonEvent = jsonString.EVENTS;
        for (let i = 0; i < jsonEvent.length; i++) { //for-loop that goes through every index of the array jsonEvent
            let timestamp = jsonEvent[i].START_TIME;
            let date = new Date(timestamp * 1000); //convert the unix-timestamp by creating an instance by Date and multiply it by 1000 to get real time
            let dateString = date.toDateString(); // converts the date in the Date instance to get a real time date string
            eventId = jsonEvent[i].EVENT_ID; // saves the event_id of every index in the array 
            div.innerHTML += '<div class="container" eventId="' + eventId + '"><div class="match"><div class="match-content"><div class="column"><div class="team team--home"><div class="team-logo"><img src="' + jsonEvent[i].HOME_IMAGES[0]
         + '"></div><h2 class="team-name">' + jsonEvent[i].HOME_NAME + '</h2></div></div><div class="column"><div class="match-details"><div class="match-date"><div class="match-status">' +
         jsonEvent[i].ROUND + '</div>' + dateString + '</div><div class="match-score"><span>VS</span></div></div></div><div class="column"><div class="team team--away"><div class="team-logo"><img src="' 
          + jsonEvent[i].AWAY_IMAGES[0] + '"></div><h2 class="team-name">' + jsonEvent[i].AWAY_NAME + '</h2></div></div></div></div></div>';
        }
        mainContainer.appendChild(div);
        let overlayElem = document.getElementsByClassName("container"); // variable that works as an overlay to the match-cards so that they are clickable
        for (let i = 0; i < overlayElem.length; i++) {
            overlayElem[i].addEventListener("click", getGame); 

        }
    }
        // function that recieves the target-event as a parameter to get the eventid of the clicked match-card 
        function getGame (event) {
            let eventId = event.target.getAttribute("eventid"); // retrieves the attribute event-id from the clicked match-card
            localStorage.setItem("selectedMatch", JSON.stringify(eventId)); // saves the event-id in localstorage as a string
            location.href = "matchinfo.html";
        } 
