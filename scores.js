var listOfScores = document.querySelector("#listOfScores");

var highscores = {
    initials : [],
    scores : [],
}

function getScores() {
    var storeScoreString = localStorage.getItem("highscores");

    if (storeScoreString !== null) {
        var storedHighscores = JSON.parse(storeScoreString);
        highscores.initials = storedHighscores.initials;
        highscores.scores = storedHighscores.scores;
    }
    else {
        highscores.initials = [];
        highscores.scores = [];
    }
}

function showScores() {
    listOfScores.innerHTML = "";
    
    getScores();

    for (var i = 0; i < highscores.initials.length; i++) {
        var listEl = document.createElement("li");
        var pEl = document.createElement("p");
        pEl.setAttribute("class", "highscore");
        pEl.textContent = (i + 1) + ". " + highscores.initials[i] + " - " + highscores.scores[i];
        
        listEl.appendChild(pEl);
        listOfScores.appendChild(listEl);
    }
}

function save(newInitials, newScore) {
    getScores();
    
    highscores.initials.push(newInitials);
    highscores.scores.push(newScore);

    var highscoresString = JSON.stringify(highscores);
    localStorage.setItem("highscores", highscoresString);
}

function clearOut() {
    localStorage.removeItem("highscores");
    showScores();
}

if (listOfScores !== null) {
    showScores();
}