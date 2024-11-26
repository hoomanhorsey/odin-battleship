import {
  removeActiveGridSquareHighlight,
  updateGridSquare,
} from "./listeners.js";

function computerTarget(computerChooseTarget, times, delay, players) {
  const moveStatus = document.querySelector(".moveStatus");

  moveStatus.textContent = "Computer's targeting....";
  let count = 0;
  const interval = setInterval(() => {
    computerChooseTarget();
    count++;

    if (count >= times) {
      clearInterval(interval);
      computerAttack(players);
    }
  }, delay);
}

function computerChooseTarget() {
  // remove previous gridSquare highlight
  removeActiveGridSquareHighlight();

  const [row, column] = genRandomPosition();
  const gridSquareActive = document.querySelector(".r" + row + "c" + column);
  gridSquareActive.classList.add("gridSquareActive");

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

// // ansyn function to ensure computerAttack is only called after computerTarget is completed
// async function computerTarget(computerChooseTarget, times, delay, players) {
//     const moveStatus = document.querySelector(".moveStatus");
//     moveStatus.textContent = "Computer's targeting....";
//     let count = 0;

//     // setInterval wrapped in a promise

//     await new Promise((resolve) => {
//       const interval = setInterval(() => {
//         computerChooseTarget();
//         count++;

//         if (count >= times) {
//           clearInterval(interval);
//           resolve();
//         }
//       }, delay);
//     });
//     computerAttack(players);
//   }
