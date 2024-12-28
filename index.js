import { gameInit } from "./gameSetup.js";

import {
  attackListener,
  checkAllSunk,
  shipBlockDropListener,
  targetListener,
} from "./eventHandling.js";

import {
  chooseRandomGridCoords,
  computerTargetAsync,
  updateComputerTargetUI,
} from "./computerLogic.js";

import { updateGameMoveStatus } from "./display.js";

import { shipBlocksInPlace } from "./helpers.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Game (player setup, position prefill, draw board)
  const players = gameInit();

  updateGameMoveStatus("placeShips");

  // Launch game once ships are placed

  console.log(players["playerOne"].gameBoard);

  // Listens for ship drops on gameBoard.
  // Once all ships are dropped, game currently runs game loop
  // gameloop calls playerMove to start game.
  // But it should actually trigger the game start
  //

  // Listens for ships being dropped, starts game loop on click of gameMoveStatus
  shipBlockDropListener(players);

  // const { removeTargetListener, removeAttackListener } = playerMove();
});

// gameLoop(players);

async function gameLoop(players) {
  let gameOver = false;

  console.log("gameloop is called");

  while (!gameOver) {
    console.log("players Move");

    // Wait for player's move to complete
    await playerMove(players);

    // check if game is over

    console.log("computer move start");
    // Wait for computer's move to complete
    await computerMove(players);

    // check if game is over
  }
  console.log("Game over!");
}

//  playerMoves function
function playerMove(players) {
  console.log("************************PLAYVER MOVE HAS BEEN CALLED");

  updateGameMoveStatus("userMove");

  return new Promise((resolve) => {
    //     // Setup target listener

    const removeTargetListener = targetListener();
    // Setup attack listener and resolve the Promise when the attack is completed
    console.log(players);
    const removeAttackListener = attackListener(
      players,
      removeTargetListener,
      // computerMove
      () => {
        console.log("playermovecomplete");

        // Clean up listeners after the move is completed
        // removeTargetListener();
        // removeAttackListener();

        // Resolve the Promise to indicate the move is done
        console.log("************************PLAYVER MOVE HAS BEEN DONE");

        resolve();
      }
    );
  });
  // return { removeTargetListener, removeAttackListener };
}

// set computer targeting values
let numComputerTargets = 10;
let computerTargetingTime = 250;

function computerMove(players, removeTargetListener, removeAttackListener) {
  console.log("*****************COMPUTER MOVE CALLED");

  // removeAttackListener();
  updateGameMoveStatus("computerMove");

  return new Promise((resolve) => {
    // TODOIs this a mix of concerns?
    const gameMoveStatus = document.querySelector(".gameMoveStatus");
    gameMoveStatus.addEventListener("click", triggerComputertMove);

    // callback function for listener
    function triggerComputertMove() {
      // insert logic to swap players - TODO, this may be redundant
      gameMoveStatus.removeEventListener("click", triggerComputertMove);
      console.log("trigger next move removed");

      updateGameMoveStatus("computerTarget");

      computerTargetAsync(
        chooseRandomGridCoords,
        numComputerTargets,
        computerTargetingTime,
        players,
        // The function passed in below is effective what starts the next move.  I don't like how it is expressed cos it's super unclear
        checkAllSunk(players, playerMove),
        // null,
        updateComputerTargetUI
      );
      resolve();
    }
  });
}

function TESTcomputerMove(players, removeTargetListener, removeAttackListener) {
  console.log("*****************COMPUTER MOVE CALLED");

  // removeAttackListener();
  updateGameMoveStatus("computerMove");

  // TODOIs this a mix of concerns?
  const gameMoveStatus = document.querySelector(".gameMoveStatus");
  gameMoveStatus.addEventListener("click", triggerComputertMove);

  // callback function for listener
  function triggerComputertMove() {
    // insert logic to swap players - TODO, this may be redundant
    gameMoveStatus.removeEventListener("click", triggerComputertMove);
    console.log("trigger next move removed");

    updateGameMoveStatus("computerTarget");

    computerTargetAsync(
      chooseRandomGridCoords,
      numComputerTargets,
      computerTargetingTime,
      players,
      // The function passed in below is effective what starts the next move.  I don't like how it is expressed cos it's super unclear
      checkAllSunk(players, playerMove),
      // null,
      updateComputerTargetUI
    );
  }
}

export { gameLoop, playerMove };
