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
import {
  updateGameMoveStatus,
  activeGridSquareRemoveHighlight,
} from "./display.js";

let numComputerTargets = 10;
let computerTargetingTime = 500;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Game (player setup, position prefill, draw board)
  const players = gameInit();

  updateGameMoveStatus("userMove");

  // ?????assign player status - TODO, possibly redundant
  let attackingPlayer = players["playerOne"];
  let defendingPlayer = players["playerTwo"];

  // start game turn ev ent loop
  const { removeTargetListener, removeAttackListener } = playerMove();

  function playerMove() {
    // targetListener
    const removeTargetListener = targetListener();
    //  attackingListener
    const removeAttackListener = attackListener(
      players,
      removeTargetListener,
      computerMove
    );
    return { removeTargetListener, removeAttackListener };
  }

  function computerMove(removeTargetListener, removeAttackListener) {
    removeTargetListener();
    removeAttackListener();
    // console.log(removeTargetListener);
    // console.log(removeAttackListener);
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
        checkAllSunk(players, playerMove),
        updateComputerTargetUI
      );
    }
  }
});
