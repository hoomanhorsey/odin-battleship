import { gameInit } from "./gameSetup.js";
import {
  targetListener,
  attackListener,
  checkAllSunk,
} from "./eventHandling.js";
import {
  chooseRandomGridCoords,
  computerTarget,
  computerTargetAsync,
  updateComputerTargetUI,
} from "./computerLogic.js";
import {
  updateGameMoveStatus,
  removeActiveGridSquareHighlight,
} from "./display.js";

let computerTargets = 10;
let computerTargetingTime = 500;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Game (player setup, position prefill, draw board)
  const players = gameInit();

  updateGameMoveStatus("userMove");

  // ?????assign player status - TODO, possibly redundant
  let attackingPlayer = players["playerOne"];
  let defendingPlayer = players["playerTwo"];

  // start game turn event loop
  playerMove();

  function playerMove() {
    // targetListener
    const removeTargetListener = targetListener(defendingPlayer);
    //  attackingListener
    attackListener(
      defendingPlayer,
      players,
      removeTargetListener,
      computerMove
    );
  }

  function computerMove() {
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
      // removeActiveGridSquareHighlight();

      // computerTarget(
      //   chooseRandomGridCoords,
      //   computerTargets,
      //   computerTargetingTime,
      //   players,
      //   checkAllSunk(players, playerMove)
      // );

      computerTargetAsync(
        chooseRandomGridCoords,
        numComputerTargets,
        computerTargetingTime,
        players,
        checkAllSunk(players, playerMove),
        updateComputerTargetUI
      );
    }
  }
});
