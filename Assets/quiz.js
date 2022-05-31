var introEl = document.querySelector("#intro")
var qaViewEl = document.querySelector("#qa-view")
var timerEl = document.querySelector("#timer")
var titleEl = document.querySelector("#title")
var answer1El = document.querySelector("#answer1")
var answer2El = document.querySelector("#answer2")
var answer3El = document.querySelector("#answer3")
var answer4El = document.querySelector("#answer4")
var startQuizBtn = document.querySelector("#start-quiz")


/*
step 1. display start page - title and paragraph and start button.
start button - ( triggers the quiz game and displays timer and question page)

step 2. Displays questions page and hides start page - timer will start when the start button is clciked, display question, 4 answer buttons
, start pge becomes hidden then only display question page. When one of the answers is clicked, show correct or wrong. Each question should be 15 seconds and since you have 5 questions. Total time remaining is 75 seconds for 5 questions. total = number of Questions*15seconds. 
When you get a wrong answer your time gets dedcuted by 15 seconds off the timer and it needs to show wrong. IF you get it right, then no penalty off the clock but you need to show "Correct" message. 

step 3. Once you answer all the questions, you will be presented with the score and input your initial and submit button. The timer should stop and time left becomes your score. When you click submit, it shoudl store initial and score in local storage. 

Step 4: show a dashboard of all the highscores. 

*/
var timerRemaining = 75;
var clockid

var question=[{
    title: "new question 1",
    answers:["answer1", "answer2", "answer3", "answer4"],
    solution: "answer2"
},{
    title: "new question 2",
    answers:["answer1", "answer2", "answer3", "answer4"],
    solution: "answer3"
}]

var index = 0;

function countDown () {
    timerEl.textContent=timerRemaining;
    timerRemaining--
}


function startGame() {
    qaViewEl.classList.remove("hide");
    introEl.classList.add("hide");
    clockid=setInterval(countDown,1000);
    displayQuestions();

}

function displayQuestions() {
    titleEl.textContent=question[index].title;
    answer1El.textContent=question[index].answers[0];
    answer2El.textContent=question[index].answers[1];
    answer3El.textContent=question[index].answers[2];
    answer4El.textContent=question[index].answers[3];
}

function


startQuizBtn.addEventListener("click",startGame)