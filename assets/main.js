var currentQuestionIndex = 0;
// var time = questions.length * 15;
var count = 75;

var startButton = document.querySelector("#startbutton");
var questionPart = document.querySelector("#questions");
var timerElement = document.querySelector("#time");
var questionContent = document.querySelector("#choices");
var highScores = document.getElementById('highscorebox');
var inputElement = document.getElementById('initials');

var correctAnswer = 0;
var timer;

function startQuiz () {
    var startScreen = document.querySelector("#startscreen");
    startScreen.setAttribute ('class', "hide");
    questionPart.removeAttribute ("class");
    getTheQuestions ()
    timer = setInterval(createTimer, 1000)
    
}

function getTheQuestions () {
    var currentQuestion = questions[currentQuestionIndex];
    var titleElement = document.querySelector("#questiontitle");
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

       userChoice.onclick = selectAnswer;
    }
    
}

function selectAnswer() {
    var displayCorrect = document.getElementById("displayed");

    if (this.value === questions[currentQuestionIndex].answer) {
        displayCorrect.innerHTML = "Correct";
        correctAnswer = correctAnswer + 1;
    } else {
        displayCorrect.innerHTML = "Incorrect";
        count = count - 10;
        timerElement.textContent = count;
        if (count <= 0){
            count=0
        }
    }

    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length-0) {
        gameOver();
    } else {
        getTheQuestions();
    }
}

function gameOver () {
    var endScreen = document.querySelector("#endscreen");
    endScreen.removeAttribute('class');
    questionPart.setAttribute('class', 'hide');
    var showScore = document.getElementById("showscore");
    showScore.innerHTML = "Correct Answers: " + correctAnswer;
    var showTime = document.getElementById('showtime');
    showTime.innerHTML = "Your Score: " + (count);
    stopTimer()
}

function createTimer () {
    count--;
    timerElement.textContent = count;
    if (count <= 0) {
        gameOver();
    }
}

function stopTimer () {
    clearInterval(timer);
}

console.log(questions);

startButton.addEventListener("click", startQuiz);

var timeLeft = count

var submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submitScore);
console.log(submitButton);


function submitScore () {
    var initials = inputElement.value;

    var scores =JSON.parse(localStorage.getItem("scores")) || [];
    var newScores = {
        initials:initials,
        score:count
    }

    scores.push(newScores);
    localStorage.setItem("scores", JSON.stringify(scores));
}
