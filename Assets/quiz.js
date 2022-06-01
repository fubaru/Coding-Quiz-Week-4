var introEl = document.querySelector("#intro");
var qaViewEl = document.querySelector("#qa-view");
var inputEl = document.querySelector("#input-init")
var timerEl = document.querySelector("#timer");
var dashboardEl = document.querySelector("#dashboard")
var titleEl = document.querySelector("#title");
var scoreEl = document.querySelector("#score");
var ansBtnEl = document.querySelectorAll("button.ansBtn");
var answer1El = document.querySelector("#answer1");
var answer2El = document.querySelector("#answer2");
var answer3El = document.querySelector("#answer3");
var answer4El = document.querySelector("#answer4");
var yesOrNoEl = document.querySelector("#yesOrNo");
var startQuizBtn = document.querySelector("#start-quiz");
var saveBtn = document.querySelector("#save");
var goBackBtn = document.querySelector("#goBack");
var clearScrBtn = document.querySelector("#clearScores");

var initialsInputEl = document.querySelector("#initials");
var scoreListEl = document.querySelector("#score-list");
var scoreList = [];

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
var clockid;

var question=[{
    title: "new question 1",
    answers:["answer1", "answer2", "answer3", "answer4"],
    solution: 0
},{
    title: "new question 2",
    answers:["answer1", "banana", "answer3", "answer4"],
    solution: 1
}];

var index = 0;

function countDown () {
    clockid = setInterval(function(){
        timerEl.textContent=timerRemaining;
        timerRemaining--
    
        if (timerRemaining === 0 || index === question.length) {
            clearInterval(clockid);
            // inputEl.classList.remove("hide");
            qaViewEl.classList.add("hide");
            
        };
    }, 1000);
   
};


function startGame() {
    qaViewEl.classList.remove("hide");
    introEl.classList.add("hide");
    // clockid=setInterval(countDown,1000);
    countDown();
    displayQuestions(index);
    
}

function displayQuestions() {
    titleEl.textContent=question[index].title;
    answer1El.textContent=question[index].answers[0];
    console.log(question[index]);
    answer2El.textContent=question[index].answers[1];
    answer3El.textContent=question[index].answers[2];
    answer4El.textContent=question[index].answers[3];
}


function nextQuestion (event){
    event.preventDefault();
    console.log(question[index].solution);
    console.log(event.target.dataset.index);
    // check answers
    if (question[index].solution == event.target.dataset.index) {
        yesOrNoEl.textContent="Correct!";
        
    } else if (question[index].solution !== event.target.dataset.index) {
        timerRemaining = timerRemaining - 15;
        yesOrNoEl.textContent = "Wrong!";
    };
    // increase question index
    if(index < question.length-1) {
        index++;
        console.log(index)
        displayQuestions(index);
    } else {
        clearInterval(clockid);
        qaViewEl.classList.add("hide");
        inputEl.classList.remove("hide")
        scoreEl.textContent = timerRemaining
    }
    // call display question to bring in next question
    
};

function addScore (event) {
    event.preventDefault();
    

    var init = initialsInputEl.value.toUpperCase();
    scoreList.push({initials: init, score: timerRemaining});

    localStorage.setItem("store", JSON.stringify(scoreList));
    var newStore = JSON.parse(localStorage.getItem("store"));
    scoreList=newStore;
    scoreListEl.textContent="";
    console.log(scoreList)
    for (var i = 0; i < scoreList.length; i++) {
        var li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    inputEl.classList.add("hide");
    dashboardEl.classList.remove("hide");

};

function goBack() {
    introEl.classList.remove("hide");
    dashboardEl.classList.add("hide");
    timerRemaining = 75;
    timerEl.textContent = `Time:${timerRemaining}`;
}


/* answer1El.addEventListener("click", nextQuestion)
answer2El.addEventListener("click", nextQuestion)
answer3El.addEventListener("click", nextQuestion)
answer4El.addEventListener("click", nextQuestion) */

// event listeners
ansBtnEl.forEach(item => {
    item.addEventListener("click",nextQuestion);
});

startQuizBtn.addEventListener("click",startGame);

saveBtn.addEventListener("click", addScore);
goBackBtn.addEventListener("click", goBack);
clearScrBtn.addEventListener("click", clearScores);