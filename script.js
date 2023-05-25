"use strict";

//slecting players
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

///////////////////////////////////////////////////////////
// SCORES /////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// Selecting Elements #id .class etc
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

//current score
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

// the dice image
const diceEl = document.querySelector(".dice");

// buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// STARTING CONDITIONS
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores = [0, 0];

// CURRENT SCORE
let currentScore = 0;
// PLAYER
let activePlayer = 0;

// END GAME
let playing = true;

//////
const switchPlayer = function () {
  // Switch to the next Player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Switch to next player
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// ROLLING THE DICE FUNCTIONALITY
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a radom dice roll---- Math.random gives a random number and Math.trunc makes sure there are no decimals
    const dice = Math.trunc(Math.random() * 6 + 1);
    // console.log(dice);
    // 2.Display dice
    diceEl.classList.remove("hidden");
    //manipulating which image shows
    diceEl.src = `dice-${dice}.png`;

    // 3.Check for rolled 1: if true
    if (dice !== 1) {
      //  Add dice to current score
      currentScore = currentScore + dice;

      // selcting the score dinamically bassed on who is the active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // adding the rolled dice score to the cuurent score
      // current0El.textContent = currentScore;
    } else {
      switchPlayer();
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // // Switch to next player
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
    }
  }
});
btnHold.addEventListener("click", function () {
  // if (playing) here is making sure the roll dice and hold doesnt work when someone wins the game
  if (playing) {
    // 1. Add current score of the active player's score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    //scores[1] = scores[1] + currentScore
    //when its player 0 it will be current 0
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score is >= 100  FINISH THE GAME
    if (scores[activePlayer] >= 20) {
      //FINISH THE GAME
      playing = false;
      diceEl.classList.add("hidden");

      /////

      /////////////////////////////
      if (scores[activePlayer] >= 20) {
        document.getElementById(`name--${activePlayer}`).textContent =
          "WINNER 🏆";
        document.getElementById(`name--${1 - activePlayer}`).textContent =
          "LOSER 😭";
      } else {
        document.getElementById(`name--${activePlayer}`).textContent =
          "LOSER 😭";
        document.getElementById(`name--${1 - activePlayer}`).textContent =
          "WINNER 🏆";
      }

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(".player--active");
      // // document.querySelector('.name').textContent = '';
      // document.getElementById('name--1').textContent = 'LOSER 😭';
      // document.getElementById('name--0').textContent = 'WINNER 🏆';
    } else {
      // Switch to the next Player
      switchPlayer();
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      //     // Switch to next player
      //     currentScore = 0;
      //     activePlayer = activePlayer === 0 ? 1 : 0;
      //     player0El.classList.toggle('player--active');
      //     player1El.classList.toggle('player--active');
    }
  }
});

//// NEW GAME
btnNew.addEventListener("click", function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  /// RESETTING THE SCORES
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  ///  HIDING THE DICE AGAIN WHEN THE GAME STARTS
  diceEl.classList.add("hidden");

  // RESETTING THE WINNER BACKGROUND
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  // RESETTING THE WINNER BACKGROUND
  document.getElementById("name--1").textContent = "Player 2";
  document.getElementById("name--0").textContent = "Player 1";

  /// REMOVE ACTIVE PLAYER
  player1El.classList.remove("player--active");
  // PLAYER 0 SHOULD ALWAYS START THE GAME AS ACTIVE
  player0El.classList.add("player--active");
});
