'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const curr0 = document.getElementById('current--0');
const curr1 = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

///starting conditions function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  curr0.textContent = 0;
  curr1.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//switching function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle adds a voice to the class if is not present and removes it if is already present, in this case we select the active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//roll button function

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. display dice
    diceEl.classList.remove('hidden');

    // check for rolled 1 if true, switch to next player

    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      //add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//hold button function

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if player's score is >=100

    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to other player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  init();
});
