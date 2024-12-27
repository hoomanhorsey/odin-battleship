import { gameInit } from "./gameSetup.js";

import {
  attackListener,
  checkAllSunk,
  targetListener,
} from "./eventHandling.js";

import {
  chooseRandomGridCoords,
  computerTargetAsync,
  updateComputerTargetUI,
} from "./computerLogic.js";

import { updateGameMoveStatus } from "./display.js";

import { shipBlocksInPlace } from "./gameLogic.js";

// import resolve from "resolve";

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
  const gameBoardplayerOne = document.getElementById("gameBoardplayerOne");
  gameBoardplayerOne.addEventListener("drop", (event) =>
    shipBlocksInPlaceHandler(event, players)
  );

  function shipBlocksInPlaceHandler(event, players) {
    console.log(event, players);

    if (shipBlocksInPlace(players)) {
      console.log("all ships placed");
      updateGameMoveStatus("shipsPlaced");

      const gameMoveStatus = document.querySelector(".gameMoveStatus");
      gameMoveStatus.addEventListener("click", () => gameLoop(players));
    }
  }

  // console.log("something dropped on me");
  // });

  // start game turn ev ent loop
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
        removeTargetListener();
        removeAttackListener();

        // Resolve the Promise to indicate the move is done
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
