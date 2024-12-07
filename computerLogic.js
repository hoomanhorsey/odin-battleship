import { checkDupeGridSquare } from "./eventHandling.js";
import {
  locateActiveGridSquare,
  activeGridSquareRemoveHighlight,
  updateGridSquareAfterAttack,
  updateGameMoveStatus,
} from "./display.js";

async function computerTargetAsync(
  chooseRandomGridCoords,
  numComputerTargets,
  computerTargetingTime,
  players,
  playMoveAfterCheckSunk,
  uiUpdater
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
    uiUpdater(row, column);

    // Wait for the delay before continuing
    await new Promise((resolve) => setTimeout(resolve, computerTargetingTime));
  }

  // After completing the required times
  computerAttack(players);
  if (playMoveAfterCheckSunk) playMoveAfterCheckSunk();
}

function chooseRandomGridCoords(players) {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function updateComputerTargetUI(row, column) {
  activeGridSquareRemoveHighlight();
  locateActiveGridSquare(row, column);
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
  updateGridSquareAfterAttack(attackResult, gridSquareActive);

  updateGameMoveStatus("userMove");
}

export {
  computerTargetAsync,
  computerAttack,
  chooseRandomGridCoords,
  updateComputerTargetUI,
};
