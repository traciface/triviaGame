var questionsAndAnswers = [
    {
        question: "if a variable is not a function and does not have var then it is?",
        choices: ["a. a global variable", "b. an ID", "c. a cat", "d. I don't know"],
        answer: "a. a global variable"
    },
    {
        question: "javascript starts counting on what?",
        choices: ["a. 1", "b. 0", "c. 2", "d. 5"],
        answer: "b. 0"
    },
    {
        question: "Which is NOT a HTML DOM mouse events?",
        choices: ["a. mousedown", "b. onclick", "c. mouseover", "d. mousecheese"],
        answer: "d. mousecheese"
    },
    {
        question: "Which is the best meal",
        choices: ["a. tacos", "b. curry", "c. ice cream", "d. grilled cheese"],
        answer: "c. ice cream"
    },
    {
        question: "how to access an array?",
        choices: ["a. string[array index]", "b. push()", "c. pop()", "d. var x="],
        answer: "a. string[array index]"
    },
    
];

var countdown;
var timeRemaining = 60;
var remainingTime = document.querySelector("#remainingTime");
var questionBlock = document.querySelector(".main-content");
var introduction = document.querySelector(".introduction");
var quizContent;
var gameOver;
var questionIndex = 0;

function rightOrWrong(index, buttonID) {    
    var isCorrect = (questionsAndAnswers[index].choices[buttonID] === 
        questionsAndAnswers[index].answer);

    var feedback = document.createElement("div");
    var pEl = document.createElement("p");
    feedback.setAttribute("class", "feedback");

    feedback.appendChild(pEl);
    questionBlock.appendChild(feedback);
    
    if (isCorrect) {
        alert("You got it!");
;
    }
    else {
        alert("Nope! The answer is " + questionsAndAnswers[questionIndex].answer);

        if (timeRemaining <= 5) {
            timeRemaining = 0;
        }
        else {
            timeRemaining -= 5;
        }
    }


}

function beginGame() {
    var index = 0;
    
    quizContent = document.createElement("div");
    quizContent.setAttribute("class", "quiz-content");
    

    var questionDisplay = document.createElement("h2");
    questionDisplay.setAttribute("class", "quiz-question");
    questionDisplay.textContent = questionsAndAnswers[index].question;

    var answerDisplay = document.createElement("ul");
    answerDisplay.setAttribute("class", "quiz-answers");

    for (var i = 0; i < 4; i++) {
        var listEl = document.createElement("li");
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute("class", "quiz-answer");
        buttonEl.setAttribute("data-id", i);
        buttonEl.textContent = (i + 1) + ". " + questionsAndAnswers[index].choices[i];

        listEl.appendChild(buttonEl);
        answerDisplay.appendChild(listEl);
    }

    quizContent.appendChild(questionDisplay);
    quizContent.appendChild(answerDisplay);
    questionBlock.replaceChild(quizContent, introduction);

    var buttonArray = answerDisplay.querySelectorAll("button");
    
    answerDisplay.addEventListener("click", function(event) {
        var element = event.target;
        if (element.matches("button")) {
            var buttonID = element.getAttribute("data-id");
            rightOrWrong(index, buttonID);
            index++;           
            if (index === questionsAndAnswers.length) {
                stopCountdown();
                allDone();
                return null;
            }
            questionDisplay.textContent = questionsAndAnswers[index].question;
            for (var j = 0; j < 4; j++) {
                buttonArray[j].textContent = (j + 1) + ". " + questionsAndAnswers[index].choices[j];
            }
        }
    })
}

function allDone() {
    gameOver = document.createElement("div");
    gameOver.setAttribute("class", "quiz-done");    
    
    var h1El = document.createElement("h1");
    h1El.textContent = "All done!";

    var pEl = document.createElement("p");
    pEl.textContent = "Your final score is " + timeRemaining + ".";

    var formEl = document.createElement("form");
    formEl.setAttribute("class", "quiz-answers");
    var labelEl = document.createElement("label");
    labelEl.textContent = "Enter your name here!: ";
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    var submitEl = document.createElement("input");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("id", "submit");
    labelEl.appendChild(inputEl);
    formEl.appendChild(labelEl);
    formEl.appendChild(submitEl);

    gameOver.appendChild(h1El);
    gameOver.appendChild(pEl);
    gameOver.appendChild(formEl);
    questionBlock.replaceChild(gameOver, quizContent);

    submitEl.addEventListener("click", function(event) {
        event.preventDefault();

        if (inputEl.value === "") {
            alert("Dont Forget to enter your name!");
            return null;
        }

        saveScore(inputEl.value, timeRemaining);
        window.location = "highscores.html";
    })
}

function startCountdown() {
    remainingTime.textContent = timeRemaining;

    countdown = setInterval(function() {
        if (timeRemaining <= 0) {
            stopCountdown();
            allDone();
            return null;
        }
        timeRemaining--;
        remainingTime.textContent = timeRemaining;
    }, 1000)
}

function stopCountdown() {
    remainingTime.textContent = timeRemaining;
    clearInterval(countdown);
}

document.querySelector("#beginButton").addEventListener("click", function() {
    startCountdown();
    beginGame();
})