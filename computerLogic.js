import {
  squareActiveLocate,
  squareNonActiveRemoveHighlight,
  squareUpdateAfterAttack,
  updateGameMoveStatus,
} from "./display.js";

import {
  checkMoveLegal,
  isClearOfCollisions,
  checkDupeSquare,
} from "./helpers.js";

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
    if (checkDupeSquare(players["playerOne"], row, column)) {
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

  // TODO, consider removing this to stop the player from being able to attack while computer is going, but this although it's probably a wayward event listener that hasn't been removed
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

    // validating placement
    if (isSquareUnoccupied(boardArray, row, column)) {
      let orientation = genRandomOrientation();
      let orientationExhausted = 0;

      while (orientationExhausted < 2) {
        // passes all checks, place ship
        if (isValidPlacement(boardArray, row, column, orientation, ship)) {
          players["playerTwo"].gameBoard.placeShip(
            row,
            column,
            orientation,
            ship.type,
            "save"
          );
          placed = true;
          console.log(
            "just a check that a ship " + ship.type + " has been placed"
          );

          break;
        } else {
          // ship place failed, try again with different orientation
          orientation = toggleOrientation(orientation);
          orientationExhausted++;
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

function isValidPlacement(boardArray, row, column, orientation, ship) {
  return (
    checkMoveLegal(row, column, orientation, ship.length) &&
    isClearOfCollisions(boardArray, row, column, orientation, ship, "drag")
  );
}
function toggleOrientation(currentOrientation) {
  return currentOrientation === "vertical" ? "horizontal" : "vertical";
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
  chooseRandomGridCoords,
  computerTargetAsync,
  computerAttack,
  placeComputerShip,
  updateComputerTargetUI,
};
