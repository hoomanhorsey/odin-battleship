import { checkDupeGridSquare } from "./eventHandling.js";
import {
  squareActiveLocate,
  squareNonActiveRemoveHighlight,
  squareUpdateAfterAttack,
  updateGameMoveStatus,
} from "./display.js";

import { checkMoveLegal, isClearOfCollisions } from "./helpers.js";

async function computerTargetAsync(
  chooseRandomGridCoords,
  numComputerTargets,
  computerTargetingTime,
  players,
  playMoveAfterCheckSunk,
  updateComputerTargetUI
) {
  let count = 0;

  while (count < numComputerTargets) {
    // choose random co-ords for computer
    const [row, column] = chooseRandomGridCoords();

    // check co-ords for dupe
    if (checkDupeGridSquare(players["playerOne"], row, column)) {
      continue; // skip iteration as a dupe
    } else {
      count++;
    }
    // Pass UI updates to the function passed as an argument
    updateComputerTargetUI(row, column);

    // Wait for the delay before continuing
    await new Promise((resolve) => setTimeout(resolve, computerTargetingTime));
  }

  // After completing the required times
  // playMoveAfterCheckSunk is the name given to a function passeded into computerTargetAsync, which is checkAllSunk(players, playMove)
  computerAttack(players);
  if (playMoveAfterCheckSunk) playMoveAfterCheckSunk();
}

function chooseRandomGridCoords() {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function updateComputerTargetUI(row, column) {
  // The eleemnt being selected is the one that currently has the 'squareActive' class, which is the previous element to the one being targeted by the computer
  const eventTarget = document.querySelector(".squareActive");

  squareNonActiveRemoveHighlight(eventTarget);
  squareActiveLocate(row, column);
}

function computerAttack(players) {
  updateGameMoveStatus("computerAttack");

  const squareActive = document.querySelector(".squareActive");
  console.log(squareActive);
  const attackResult = players["playerOne"].gameBoard.receiveAttack(
    squareActive.dataset.row,
    squareActive.dataset.column
  );

  console.log(attackResult);
  squareUpdateAfterAttack(attackResult, squareActive);

  updateGameMoveStatus("userMove");
}

function placeComputerShip(ship, boardArray, players) {
  let placed = false;

  while (!placed) {
    // generate random square co-ords
    const [row, column] = chooseRandomGridCoords();

    if (isSquareUnoccupied(boardArray, row, column)) {
      let orientation = genRandomOrientation();

      let orientationExhausted = 0;
      while (orientationExhausted < 2) {
        if (
          checkMoveLegal(row, column, orientation, ship.length) &&
          isClearOfCollisions(
            boardArray,
            row,
            column,
            orientation,
            ship,
            "drag"
          )
        ) {
          // passes all checks, place ship
          orientationExhausted = 2;

          players["playerTwo"].gameBoard.placeShip(
            row,
            column,
            orientation,
            ship.type,
            "save"
          );
          placed = true;
          break;
        } else {
          // ship place failed, try again.
          if (orientation === "vertical") {
            orientation = "horizontal";
            orientationExhausted++;
          } else {
            orientation = "vertical";
            orientationExhausted++;
          }
          // loop ends, but is sent back with orientation with a different value.
        }
      }
    } else {
      // square is occupied, so placed is false and loop reruns
      placed = false;
      console.log("*****LOOP RERUNS");
    }
  }
}

function genRandomOrientation() {
  if (Math.random() > 0.5) {
    return "horizontal";
  } else {
    return "vertical";
  }
}
function isSquareUnoccupied(boardArray, row, column) {
  return boardArray[row][column].ship === null;
}
export {
  computerTargetAsync,
  computerAttack,
  chooseRandomGridCoords,
  updateComputerTargetUI,
  placeComputerShip,
};
