'use strict';

// CSS
const Us0 = document.querySelector('.player--0');
const Us1 = document.querySelector('.player--1');

// Score
const scoreU0 = document.getElementById('score--0');
const scoreU1 = document.getElementById('score--1');

// Current Score
let currentU1 = document.getElementById('current--0');
let currentU2 = document.getElementById('current--1');

// Add ons
const dice = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdDice = document.querySelector('.btn--hold');

const switchP = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  Us0.classList.toggle('player--active');
  Us1.classList.toggle('player--active');
};

newGame.addEventListener('click', function () {
  
  scoreU0.textContent = 0;
  scoreU1.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  dice.classList.add('hidden');
  playing = true;

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  
  Us0.classList.add('player--active');
  Us1.classList.remove('player--active');
});

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

rollDice.addEventListener('click', function () {
  if (playing) {
    const rolled = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${rolled}.png`;
    dice.classList.remove('hidden');

    if (rolled !== 1) {
      currentScore += rolled;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchP();
    }
  }
});

holdDice.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    if (scores[activePlayer] >= 100) {
      playing = false;

      dice.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    }
    switchP();
  }
});
