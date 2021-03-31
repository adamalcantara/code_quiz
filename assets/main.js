var currentQuestionIndex = 0;
// var time = questions.length * 15;
var count = 75

var startbutton = document.querySelector("#startbutton")
var questionpart = document.querySelector("#questions")
var timerElement = document.querySelector("#time")
var questionContent = document.querySelector("#choices")
var highScores = document.getElementById('highscorebox')

var correctAnswer = 0
var timer;

function startQuiz () {
    var startscreen = document.querySelector("#startscreen")
    startscreen.setAttribute ('class', "hide");
    questionpart.removeAttribute ("class");
    getthequestions ()
    timer = setInterval(createTimer, 1000)
    
}

function getthequestions () {
    var currentQuestion = questions[currentQuestionIndex];
    var titleElement = document.querySelector("#questiontitle")
    titleElement.textContent =  currentQuestion.title;
    console.log(titleElement);
    questionContent.innerHTML = "";
    for(var i = 0; i < currentQuestion.options.length; i++) {
       var userChoice = document.createElement("button");
       userChoice.setAttribute("class", "choice");
       userChoice.setAttribute("value", currentQuestion.options[i]);
       userChoice.textContent= i + 1 + ". " + currentQuestion.options[i];
        
       questionContent.appendChild(userChoice);

       console.log(userChoice);

       userChoice.onclick = selectAnswer
    }
    
}

function selectAnswer() {
    var displayCorrect = document.getElementById("displayed")

    if (this.value === questions[currentQuestionIndex].answer) {
        displayCorrect.innerHTML = "Correct"
        correctAnswer = correctAnswer + 1;
    } else {
        displayCorrect.innerHTML = "Incorrect"
        count = count -10;
    }

    currentQuestionIndex++
    if (currentQuestionIndex === questions.length-0) {
        gameover();
    } else {
        getthequestions();
    }
}

function gameover () {
    var endScreen = document.querySelector("#endscreen");
    endScreen.removeAttribute('class');
    questionpart.setAttribute('class', 'hide');
    var showScore = document.getElementById("showscore");
    showScore.innerHTML = "Correct Answers: " + correctAnswer;
    var showTime = document.getElementById('showtime');
    showTime.innerHTML = "Your Score: " + (count + 11);
    stopTimer()
}

function createTimer () {
    timerElement.textContent = count;
    if (count <= 0) {
        stopTimer();
    } else {
        count--
    }
}

function stopTimer () {
    clearInterval(timer);
    gameover();
}

console.log(questions);

startbutton.onclick = startQuiz ();

var timeLeft = count

var submitButton = document.getElementById("submit");
submitButton.addEventListener("click", addToPage);
console.log(submitButton);

function addToPage () {
    var initialInput = document.getElementById("initials");
    var initialInput = initialInput.value;
    localStorage.setItem("initials", JSON.stringify(initialInput + " - " + (count + 11)));
    localStorage.append(highScores);
}

//Take time remaining on timer, make that the score
//Display score on game over screen
//Prompt user to enter intials
//Create an array from the scores and initials in the JavaScript file for the other page
//append that array into the HTML for the high scores page
//store the array in local storage so it can be saved
//create back button with JavaScript
//Clear the array using the clear button