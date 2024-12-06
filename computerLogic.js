import { checkDupeGridSquare } from "./eventHandling.js";
import {
  highlightActiveGridSquare,
  removeActiveGridSquareHighlight,
  updateGridSquare,
  updateGameMoveStatus,
} from "./display.js";

function computerTarget(
  computerChooseTarget,
  times,
  delay,
  players,
  playMoveAfterCheckSunk
) {
  let count = 0;

  const interval = setInterval(() => {
    // remove previous gridSquare highlight
    removeActiveGridSquareHighlight();

    // choose random co-ords for computer
    const [row, column] = chooseRandomGridCoords(players);

    // check co-ords for dupe
    if (checkDupeGridSquare(players["playerOne"], row, column)) {
      return; // skip iteration as a dupe
    } else {
      count++;
      updateComputerTargetUI(row, column);
    }

    if (count >= times) {
      clearInterval(interval);
      computerAttack(players);
      if (playMoveAfterCheckSunk) playMoveAfterCheckSunk();
    }
  }, delay);
}

function chooseRandomGridCoords(players) {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function updateComputerTargetUI(row, column) {
  removeActiveGridSquareHighlight();
  highlightActiveGridSquare(row, column);
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
  updateGridSquare(attackResult, gridSquareActive);

  updateGameMoveStatus("userMove");
}

export { computerTarget, computerAttack, chooseRandomGridCoords };
