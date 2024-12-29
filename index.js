import { gameInit } from "./gameSetup.js";

import {
  areAllShipsSunk,
  attackListener,
  shipBlockDropListener,
  targetListener,
} from "./eventHandling.js";

import {
  chooseRandomGridCoords,
  computerTargetAsync,
} from "./computerLogic.js";

import { updateGameMoveStatus } from "./display.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Game (player setup, position prefill, draw board)
  const players = gameInit();

  updateGameMoveStatus("placeShips");

  // Starts gameLoop on click of gameMoveStatus
  shipBlockDropListener(players);
});

// Main game loop
async function gameLoop(players) {
  let gameOver = false;

  console.log("gameloop is called");

  while (!gameOver) {
    // Wait for player's move to complete
    await playerMove(players);

    // check if game is over
    if (checkForWin(players)) {
      gameOver = true;
      break;
    }

    console.log("computer move start");
    // Wait for computer's move to complete
    await computerMove(players);

    // check if game is over
    if (checkForWin(players)) {
      gameOver = true;
      break;
    }
  }
  console.log("Game over!");
}

//  playerMoves function
function playerMove(players) {
  console.log("******PLAYVER MOVE HAS BEEN CALLED");

  updateGameMoveStatus("userMove");

  return new Promise((resolve) => {
    // Setup target listener

    const removeTargetListener = targetListener();
    // Setup attack listener, resolve Promise when attack completed
    const removeAttackListener = attackListener(
      players,
      removeTargetListener,
      () => {
        // Resolve the Promise to indicate the move is done
        console.log("********PLAYVER MOVE HAS BEEN DONE");
        resolve();
      }
    );
  });
}

// set computer targeting values
let numComputerTargets = 10;
let computerTargetingTime = 250;

function computerMove(players) {
  console.log("**********COMPUTER MOVE CALLED");

  // removeAttackListener();
  updateGameMoveStatus("computerMove");

  return new Promise((resolve) => {
    // TODOIs this a mix of concerns?
    const gameMoveStatus = document.querySelector(".gameMoveStatus");
    gameMoveStatus.addEventListener("click", triggerComputerMove);

    // callback function for listener
    async function triggerComputerMove() {
      // insert logic to swap players - TODO, this may be redundant
      gameMoveStatus.removeEventListener("click", triggerComputerMove);
      console.log("trigger next move removed");

      updateGameMoveStatus("computerTarget");
      // Wait for computer targeting to finish before resolving

      await computerTargetAsync(
        chooseRandomGridCoords,
        numComputerTargets,
        computerTargetingTime,
        players
      );
      resolve(); //Resolves promise after `computerTargetAsync` completes
    }
  });
}

function checkForWin(players) {
  const [result, playerName] = areAllShipsSunk(players);
  if (result) {
    console.log(playerName + " is the winner!");
    return true;
  }
}

export { gameLoop, playerMove };
