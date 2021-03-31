var initials = localStorage.getItem("initials");
var highScores = document.getElementById("highscorebox");
console.log(initials);

highScores.append(initials);