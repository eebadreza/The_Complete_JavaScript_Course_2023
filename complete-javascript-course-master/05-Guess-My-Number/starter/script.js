'use strict';

let score = 20;
let highScore = 0;
let randomNum = Math.trunc(Math.random()*20)+1;
//console.log(randomNum);

document.querySelector('.check').addEventListener('click',
 function(){
  
  const guessNum = Number (document.querySelector('.guess').value);
  //console.log(guessNum);
  if (!guessNum) {
    document.querySelector('.message').textContent = 'No Number 🚫';
  } 
  else if (guessNum == randomNum) {
    document.querySelector('.number').textContent = randomNum;

    document.querySelector('.message').textContent = 'Correct Number ✅';

    document.querySelector('.score').textContent = score;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  }
  else if (guessNum != randomNum){
    if(score > 0){
      document.querySelector('.message').textContent = guessNum > randomNum ? 'Too High 👆' : 'Too Low 👇';
      score--;
      document.querySelector('.score').textContent = score;
    }
    else{
      document.querySelector('.message').textContent = 'You Lose 🥲';
    }
  }
 
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  randomNum = Math.trunc(Math.random() * 20) + 1;
  //console.log(randomNum);
});