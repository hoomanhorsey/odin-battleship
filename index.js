import { gameInit } from "./gameSetup.js";
import { targetListener, attackListener, checkAllSunk } from "./listeners.js";
import { computerTarget, computerChooseTarget } from "./computerLogic.js";
import { updateGameMoveStatus } from "./display.js";

let computerTargets = 100;
let computerTargetingTime = 25;

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
    const removeTargetListener = targetListener(defendingPlayer);
    //  attacking
    attackListener(
      defendingPlayer,
      players,
      removeTargetListener,
      computerMove
    );
  }

  function computerMove() {
    updateGameMoveStatus("computerMove");
    const gameMoveStatus = document.querySelector(".gameMoveStatus");
    gameMoveStatus.addEventListener("click", triggerComputertMove);

    // callback function for listener
    function triggerComputertMove() {
      // insert logic to swap players - TODO, this may be redundant
      gameMoveStatus.removeEventListener("click", triggerComputertMove);
      console.log("trigger next move removed");

      computerTarget(
        computerChooseTarget,
        computerTargets,
        computerTargetingTime,
        players,
        checkAllSunk(players, playerMove)
      );
    }
  }
});
