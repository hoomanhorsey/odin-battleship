import { checkDupeGridSquare } from "./eventHandling.js";
import {
  gridSquareActiveLocate,
  gridSquareNonActiveRemoveHighlight,
  gridSquareUpdateAfterAttack,
  updateGameMoveStatus,
} from "./display.js";

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
    const [row, column] = chooseRandomGridCoords(players);

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

function chooseRandomGridCoords(players) {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function updateComputerTargetUI(row, column) {
  // The eleemnt being selected is the one that currently has the 'gridSquareActive' class, which is the previous element to the one being targeted by the computer
  const eventTarget = document.querySelector(".gridSquareActive");

  gridSquareNonActiveRemoveHighlight(eventTarget);
  gridSquareActiveLocate(row, column);
}

// function chooseRandomGridCoords(players) {
//   const row = Math.floor(Math.random() * 10);
//   const column = Math.floor(Math.random() * 10);

//   if (checkDupeGridSquare(players["playerOne"], row, column)) {
//     return { row, column, valid: true };
//   }
//   return { row, column, valid: false };
// }

function computerAttack(players) {
  updateGameMoveStatus("computerAttack");

  const gridSquareActive = document.querySelector(".gridSquareActive");
  console.log(gridSquareActive);
  const attackResult = players["playerOne"].gameBoard.receiveAttack(
    gridSquareActive.dataset.row,
    gridSquareActive.dataset.column
  );

  console.log(attackResult);
  gridSquareUpdateAfterAttack(attackResult, gridSquareActive);

  updateGameMoveStatus("userMove");
}

export {
  computerTargetAsync,
  computerAttack,
  chooseRandomGridCoords,
  updateComputerTargetUI,
};
