// set up variables for needed elements on HTML
let highScoreOL = document.querySelector('#highscores');
let clearBtn = document.querySelector('#clear');

// function to sort scores array by scores
function sortScores(a, b){
  console.log(a);
  console.log(b);
  if(a.score > b.score){
    return -1;
  }
  if(a.score < b.score){
    return 1;
  }
  if(a.score === b.score){
    return 0;
  }
}

// function to render highscores
function renderScores(){
  let highScores = JSON.parse(localStorage.getItem('scores'));
  if(highScores===null){
    return;
  }
  highScores.sort(sortScores  );
  highScores.forEach(function(score){
    let newLI = document.createElement('li');
    newLI.textContent = score.initials + " - " + score.score;
    highScoreOL.appendChild(newLI);
  });
  return;
}
// call render function when page first loads
renderScores();

// add event lister with function to clear high scores
clearBtn.addEventListener('click', function (){
  highScoreOL.innerHTML = '';
  localStorage.removeItem('scores');
})