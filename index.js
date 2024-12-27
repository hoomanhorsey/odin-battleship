import { gameInit } from "./gameSetup.js";

import {
  targetListener,
  attackListener,
  checkAllSunk,
} from "./eventHandling.js";

import {
  chooseRandomGridCoords,
  computerTargetAsync,
  updateComputerTargetUI,
} from "./computerLogic.js";

import { updateGameMoveStatus } from "./display.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Game (player setup, position prefill, draw board)
  const players = gameInit();

  updateGameMoveStatus("placeShips");

  // Launch game once ships are placed

  console.log(players["playerOne"].gameBoard);

  // start game turn ev ent loop
  // const { removeTargetListener, removeAttackListener } = playerMove();
});

//  playerMoves function
function playerMove(players) {
  console.log("************************PLAYVER MOVE HAS BEEN CALLED");

  updateGameMoveStatus("userMove");

  // targetListener
  const removeTargetListener = targetListener();
  //  attackingListener
  console.log(players);
  const removeAttackListener = attackListener(
    players,
    removeTargetListener,
    computerMove
  );
  return { removeTargetListener, removeAttackListener };
}

// set computer targeting values
let numComputerTargets = 10;
let computerTargetingTime = 250;

function computerMove(players, removeTargetListener, removeAttackListener) {
  removeTargetListener();
  removeAttackListener();
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

export { playerMove };
