// get HTML elements which the script will need to interact with
let startBtn = document.querySelector('#start');
let timeSpan = document.querySelector('#time');
let startDiv = document.querySelector('#start-screen');
let questionDiv = document.querySelector('#questions');
let questionTitleh2 = document.querySelector('#question-title');
let choicesDiv = document.querySelector('#choices');
let endDiv = document.querySelector('#end-screen');
let finalScoreSpan = document.querySelector('#final-score');
let initialsInput = document.querySelector('#initials');
let submitBtn = document.querySelector('#submit');

// global variables
let timeRemaining;
let timer;
let score;
let finished = false;

// audio files for correct and incorrect sounds
// solution gained from https://stackoverflow.com/questions/9419263/how-to-play-audio
let correctSound = new Audio('./sfx/correct.wav');
let incorrectSound = new Audio('./sfx/incorrect.wav');

// event listener to check for start button being clicked
// which will replace the starter text with the question text
// and start the timer

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
  // start timer
  timeRemaining = questions.length * 5;
  score = 0;
  timeSpan.textContent = timeRemaining;
  timer = setInterval(reduceTimer, 1000);
  // replace start message with question area
  startDiv.className = startDiv.className + ' hide';
  questionDiv.className = '';
  getQuestion();
  return;
}

function reduceTimer(){
  timeRemaining -= 1;
  if(timeRemaining<=0){
    timeRemaining = 0;
  }
  timeSpan.textContent = timeRemaining;
  if(timeRemaining===0 || finished===true){
    clearInterval(timer);
    renderEnd();
  }
  return;
}

// function to return a question and possible answers from questions.js
function getQuestion(){
  let whichQuestion = Math.floor(Math.random() * questions.length);
  let chosenQuestion = questions.splice(whichQuestion, 1);
  renderQuestion(chosenQuestion[0]);
  return;
}
// function to render question
function renderQuestion(question) {
  choicesDiv.innerHTML = '';
  questionTitleh2.textContent = question.question;
  let answers = question.dummyAnswers;
  answers.push(question.answer);
  while(answers.length!==0){
    let whatAnswer = Math.floor(Math.random() * answers.length);
    let ansBtn = document.createElement('button');
    ansBtn.textContent = answers.splice(whatAnswer, 1);
    ansBtn.addEventListener('click', checkAnswer);
    if(ansBtn.textContent===question.answer){
      ansBtn.dataset.correct = true;
    }
    choicesDiv.appendChild(ansBtn);
  }
  return;
}
// function to check if answer is correct or not and either add to score
// or subtract from score and reduce timer
function checkAnswer(event){
  if(event.target.dataset.correct){
    score += 1;
    correctSound.play();
  }
  else {
    timeRemaining -= 10;
    score -= 1;
    incorrectSound.play();
  }
  // check that there are still more questions to answer
  if(questions.length>0){
    getQuestion();  
  } else {
    clearInterval(timer);
    renderEnd();
  }
  
  return;
}

// function to render the finish screen showing score for this game and adding to high score
function renderEnd() {
  questionDiv.className = 'hide';
  endDiv.className = '';
  finalScoreSpan.textContent = score;
  return;
}

// add event listener to submit initials 
submitBtn.addEventListener('click', saveScore);

// function to save the initials and score to localStorage
function saveScore(event){
  let highScoreList = JSON.parse(localStorage.getItem('scores'));
  console.log(highScoreList);
  if(highScoreList===null){
    highScoreList = []
  }
  highScoreList.push({initials: initialsInput.value, score: score});
  localStorage.setItem('scores', JSON.stringify(highScoreList));
  window.location.href = "highscores.html";
}