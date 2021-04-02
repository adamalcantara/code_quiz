var highScores = JSON.parse(localStorage.getItem("scores"));
var highScoreEl = document.getElementById("highscorebox");
var clearScores = document.getElementById("clearscores");

console.log(highScores);

//for loop over array

for (let index = 0; index < highScores.length; index++) {
    //creating elements for the users' scores

    //this is the save point
    var initials = document.createElement("li")
    // var score = document.createElement("li")
    //add score and initials for each element
    initials.textContent = highScores[index].initials + " - " + highScores[index].score;
    // score.textContent = ;
    //add them to the page
    highScoreEl.append(initials)
    // highScoreEl.append(score)
}

function clearAll () {
    localStorage.clear();
    highScoreEl.remove(initials);
}

clearScores.addEventListener("click", clearAll);
