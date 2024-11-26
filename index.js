// import isEqual from "lodash/isEqual";

// import { Gameboard, Player, Ship } from "./gameObjects.js";
import { createPlayers, gameSetUp_positionPreFill } from "./gameSetup.js";
import { drawGrid } from "./display.js";
import {
  targetListener,
  attackListener,
  removeActiveGridSquareHighlight,
  updateGridSquare,
} from "./listeners.js";

import {
  computerTarget,
  computerChooseTarget,
  computerAttack,
} from "./computerLogic.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Game (including position prefill for testing)
  // TODO possibly move to it's own module

  const players = createPlayers();
  // position prefill for testing
  gameSetUp_positionPreFill(players);

  // draw gameBoard grid
  drawGrid(players["playerOne"]);
  drawGrid(players["playerTwo"]);

  // assign player status - TODO, possibly redundant
  let attackingPlayer = players["playerOne"];
  let defendingPlayer = players["playerTwo"];

  // playTurn();
  // if (!checkSunk()) {
  //   console.log(checkSunk());
  // }

  // function playTurn() {
  //   console.log("playturn function");

  playerMove();

  // call playerOne listeners
  // targeting

  function playerMove() {
    const removeTargetListener = targetListener(
      attackingPlayer, // [TODO - possibly redundant]
      defendingPlayer
    );
    //  attacking
    let attackResult = attackListener(
      attackingPlayer, // [TODO - possibly redundant]
      defendingPlayer,
      removeTargetListener,
      computerMove
    );
  }

  function computerMove() {
    const moveStatus = document.querySelector(".moveStatus");
    // TODO, maybe add an animation to this so it appears more gradually.

    // creating button
    moveStatus.textContent =
      "Computer's move. Click here for to launch computer attack";
    moveStatus.addEventListener("click", triggerNextMove);

    // callback function for listener
    function triggerNextMove() {
      // insert logic to swap players
      console.log("next move triggered. Now call computer move");
      moveStatus.textContent = "";
      moveStatus.removeEventListener("click", triggerNextMove);
      console.log("trigger next move removed");

      // This is the async function that waits for the computer target and attack
      async function getComputerTarget() {
        // Call computerTarget and wait for its completion before calling computerAttack
        await computerTarget(computerChooseTarget, 30, 50, players);
        // computerAttack(players); // Proceed with computerAttack after computerTarget completes
      }

      // Execute the async function that handles the computer move
      getComputerTarget()
        .then(() => {
          if (
            !attackingPlayer.gameBoard.checkSunk() &&
            !defendingPlayer.gameBoard.checkSunk()
          ) {
            console.log("ships afloat");
            playerMove();
          }
        })
        .catch((error) => {
          console.log("Error during computer move:", error);
        });
    }
  }

  // function computerTarget(computerChooseTarget, times, delay) {
  //   let count = 0;
  //   const interval = setInterval(() => {
  //     computerChooseTarget();
  //     count++;

  //     if (count >= times) {
  //       clearInterval(interval);
  //       computerAttack();
  //     }
  //   }, delay);
  // }

  // function computerChooseTarget() {
  //   // remove previous gridSquare highlight
  //   removeActiveGridSquareHighlight();

  //   const [row, column] = genRandomPosition();
  //   const gridSquareActive = document.querySelector(".r" + row + "c" + column);
  //   gridSquareActive.classList.add("gridSquareActive");

  //   function genRandomPosition() {
  //     return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  //   }
  // }

  // function computerAttack() {
  //   const gridSquareActive = document.querySelector(".gridSquareActive");
  //   console.log(gridSquareActive);
  //   const attackResult = players["playerOne"].gameBoard.receiveAttack(
  //     gridSquareActive.dataset.row,
  //     gridSquareActive.dataset.column
  //   );

  //   console.log(attackResult);
  //   updateGridSquare(attackResult, gridSquareActive);
  // }

  //
  //
  //
  ///////////////THE FOLLOWING MAY NOT BE NECESSARY.
  ///AS I WONT INCLUDE A CHANGE TURN FUNCTION
  // Rather moves will change once a player presses hit, '
  // But I may need to salvage some of the code to switch players

  //   function changeAttackingPlayer() {
  //     console.log(isEqual(attackingPlayer, players["playerOne"])); // true

  //     if (attackingPlayer === players["playerOne"]) {
  //       attackingPlayer = players["playerTwo"];
  //       defendingPlayer = players["playerOne"];
  //     } else {
  //       attackingPlayer = players["playerOne"];
  //       defendingPlayer = players["playerTwo"];
  //     }
  //   }
});
