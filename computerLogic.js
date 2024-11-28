import {
  removeActiveGridSquareHighlight,
  updateGridSquare,
  dupeGridSquareCheck,
} from "./listeners.js";

// TODO maybe - Could potentially change this to an async function for more modern implemenation
function computerTarget(
  computerChooseTarget,
  times,
  delay,
  players,
  playMoveAfterCheckSunk
) {
  const moveStatus = document.querySelector(".moveStatus");

  moveStatus.textContent = "Computer's targeting....";
  let count = 0;
  const interval = setInterval(() => {
    // computerChooseTarget returns false if square already hit or missed
    let targetResult = computerChooseTarget(players);
    if (targetResult) {
      count++;
    }

    if (count >= times) {
      console.log("COUNT COUNT " + count);

      clearInterval(interval);
      computerAttack(players);
      if (playMoveAfterCheckSunk) playMoveAfterCheckSunk();
    }
  }, delay);
}

function computerChooseTarget(players) {
  // remove previous gridSquare highlight
  removeActiveGridSquareHighlight();

  const [row, column] = genRandomPosition();
  const gridSquareActive = document.querySelector(".r" + row + "c" + column);
  gridSquareActive.classList.add("gridSquareActive");

  if (
    dupeGridSquareCheck(
      players["playerOne"],
      gridSquareActive.id[10],
      gridSquareActive.id[12]
    )
  ) {
    return true;
  } else {
    return gridSquareActive.id;
  }

  function genRandomPosition() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }
}

function computerAttack(players) {
  const moveStatus = document.querySelector(".moveStatus");

  moveStatus.textContent = "Computer attacks!!!";
  const gridSquareActive = document.querySelector(".gridSquareActive");
  console.log(gridSquareActive);
  const attackResult = players["playerOne"].gameBoard.receiveAttack(
    gridSquareActive.dataset.row,
    gridSquareActive.dataset.column
  );

  console.log(attackResult);
  updateGridSquare(attackResult, gridSquareActive);
}

export { computerTarget, computerChooseTarget, computerAttack };
