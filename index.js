// import isEqual from "lodash/isEqual";

// import { Gameboard, Player, Ship } from "./gameObjects.js";
import { gameInit } from "./gameSetup.js";

import { targetListener, attackListener, checkAllSunk } from "./listeners.js";
import { computerTarget, computerChooseTarget } from "./computerLogic.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Game (player setup, position prefill, draw board)
  const players = gameInit();

  // assign player status - TODO, possibly redundant
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
    const moveStatus = document.querySelector(".moveStatus");
    // *****TODO, maybe add an animation to this so it appears more gradually.
    // creating button
    moveStatus.textContent =
      "Computer's move. Click here for to launch computer attack";
    moveStatus.addEventListener("click", triggerComputertMove);

    // callback function for listener
    function triggerComputertMove() {
      // insert logic to swap players - TODO, this may be redundant
      moveStatus.textContent = "";
      moveStatus.removeEventListener("click", triggerComputertMove);
      console.log("trigger next move removed");

      computerTarget(
        computerChooseTarget,
        75,
        25,
        players,
        checkAllSunk(players, playerMove)
      );
    }
  }
});
