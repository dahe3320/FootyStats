var chosenMatch;
var chosenLeague;

function init () {
    // checks for selectedMatch in local storage 
    if ("selectedMatch" in localStorage) { 
        chosenMatch = localStorage.getItem("selectedMatch"); 
        chosenLeague = JSON.parse(localStorage.getItem("selectedCountry"));
    } 
    let arr = chosenLeague.EVENTS; 
    const idToFind = chosenMatch; 
    let r = null; 
    for (let i = 0; i < arr.length; i++) { //a loop that goes through the arr array to find the object whose event_id matches the idToFind value
        
        if ('"' + arr[i].EVENT_ID + '"' == idToFind) { 
            r = arr[i]; // saves the matching object in variable r
        }
        
    }
    matchInfo(r); // matched object sent as a argument to function matchInfo   
}
window.addEventListener("load", init);
// prints the object in the parameter objId, which is the matching index of the array that had a matching event_id
// this is were the clicked match on previous page is printed 
function matchInfo (objId) {
    let divContainer = document.getElementById("matchData");
        let cont = document.createElement("div");
        let timestamp = objId.START_TIME;
            let date = new Date(timestamp * 1000); //convert the unix-timestamp by creating an instance by Date and multiply it by 1000 to get real time
            let dateString = date.toDateString(); // converts the date in the Date instance to get a real time date string
        cont.innerHTML = '<div class="container"><div></div><div class="match"><div class="match-content"><div class="column"><div class="team team--home"><div class="team-logo"><img src="' + objId.HOME_IMAGES[0]
         + '"></div><h2 class="team-name">' + objId.HOME_NAME + '</h2></div></div><div class="column"><div class="match-details"><div class="match-date"><div class="match-status">' + objId.ROUND + '</div>' + dateString + '</div><div class="match-score"><span>VS</span></div></div></div><div class="column"><div class="team team--away"><div class="team-logo"><img src="' 
          + objId.AWAY_IMAGES + '"></div><h2 class="team-name">' + objId.AWAY_NAME + '</h2></div></div></div></div></div>';
          divContainer.appendChild(cont);
        let eventString = objId.EVENT_ID; // saves the event id as variable eventString so it can be used in the xhr call url
            const data = null;
    
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                    let respData = JSON.parse(xhr.responseText); //parsing the json-string and sends it as an argument to showInGameData
                    showInGameData(respData);
                }
            });

xhr.open("GET", "https://flashlive-sports.p.rapidapi.com/v1/events/odds?event_id=" + eventString + "&locale=en_INT");
xhr.setRequestHeader("X-RapidAPI-Key", "2df7d20e7fmshe30517e16f2bffbp13fc9djsnf1999d6df826");
xhr.setRequestHeader("X-RapidAPI-Host", "flashlive-sports.p.rapidapi.com");

xhr.send(data);
}
// function that prints the second api callback containing event odds
// the data printed is printed through three different for of loops that goes through three different arrays inside of the json-file 
// in every for of loop the data is printed in a div that is created
function showInGameData (respData) {
        const respObj = respData.DATA;
        
        for (const markets of respObj[0].PERIODS[0].GROUPS[0].MARKETS) { 
            let statCont = document.getElementById("grid-container");
            
            let div = document.createElement("div");
            div.innerHTML = '<div class="oddheader"><div class="bookmakers">' + markets.BOOKMAKER_NAME + '</div></div><div class="box"><h2>Fulltid</h2><div class="odds-box"><div class="odds"><span class="odd">' + markets.ODD_CELL_FIRST.VALUE + '</span><span class="label">1</span></div><div class="odds"><span class="odd">' + markets.ODD_CELL_SECOND.VALUE + '</span><span class="label">X</span></div><div class="odds"><span class="odd">' + markets.ODD_CELL_THIRD.VALUE + '</span><span class="label">2</span></div></div></div>';
            statCont.appendChild(div);
        }
        for (const htft of respObj[5].PERIODS[0].GROUPS[0].MARKETS) {
            let oddsDiv = document.getElementById("grid-container");
            let div = document.createElement("div");
            div.innerHTML = '<div class="box"><h2>Dubbelchans</h2><div class="odds-box"><div class="odds"><span class="odd">' + htft.ODD_CELL_FIRST.VALUE + '</span><span class="label">1/X</span></div><div class="odds"><span class="odd">' + htft.ODD_CELL_SECOND.VALUE + '</span><span class="label">1/2</span></div><div class="odds"><span class="odd">' + htft.ODD_CELL_THIRD.VALUE + '</span><span class="label">X/2</span></div></div></div>';
            oddsDiv.appendChild(div);
        }

        for (const bts of respObj[9].PERIODS[0].GROUPS[0].MARKETS) {
            let btsDiv = document.getElementById("grid-container");
            let div = document.createElement("div");
            div.innerHTML = '<div class="box"><h2>Båda lagen gör mål</h2><div class="odds-box"><div class="odds"><span class="odd">' + bts.ODD_CELL_SECOND.VALUE + '</span><span class="label">Ja</span></div><div class="odds"><span class="odd">' + bts.ODD_CELL_THIRD.VALUE + '</span><span class="label">Nej</span></div></div></div>';
            btsDiv.appendChild(div);
        }
        // retrieves the two strings that was set in localstorage on the previous page to use in the xhr call url to get the endpoint that contains the league table data
        let tournamentSeason = localStorage.getItem("tournamentId"); 
        let tournamentStage = localStorage.getItem("tournamentStage");
        const data = null;
    
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                    let respData = JSON.parse(xhr.responseText);
                    showLeagueTable(respData); // parsed object from the request that is sent as a argument to function showLeagueTable
                }
            });

xhr.open("GET", "https://flashlive-sports.p.rapidapi.com/v1/tournaments/standings?tournament_season_id=" + tournamentSeason + "&standing_type=overall&tournament_stage_id=" + tournamentStage + "&locale=en_INT");
xhr.setRequestHeader("X-RapidAPI-Key", "2df7d20e7fmshe30517e16f2bffbp13fc9djsnf1999d6df826");
xhr.setRequestHeader("X-RapidAPI-Host", "flashlive-sports.p.rapidapi.com");

xhr.send(data);

    }
    // function that prints the data recieved from api
    // looped through a for of loop that goes through every "rows" array and then printed in html via a div created 
    function showLeagueTable (leagueData) {
        console.log(leagueData);
        for (const tableArr of leagueData.DATA[0].ROWS) {
        let tableDiv = document.getElementById("leagueTable");
            let div = document.createElement("div");
            div.innerHTML = '<div class="stand"><div class="teamDisplay">' + tableArr.RANKING + '. ' + tableArr.TEAM_NAME + '</div><div class="table-col">' + tableArr.WINS + '</div><div class="table-col">' + tableArr.GOALS + '</div><div class="table-col">' + tableArr.MATCHES_PLAYED + '</div><div class="table-col">' + tableArr.POINTS + '</div></div></div>';
            tableDiv.appendChild(div);
        }
        
    }

