import {
  removeActiveGridSquareHighlight,
  updateGridSquare,
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
      clearInterval(interval);
      computerAttack(players);
      if (playMoveAfterCheckSunk) playMoveAfterCheckSunk();
    }
  }, delay);
}

// function computerTarget(
//   computerChooseTarget,
//   times,
//   delay,
//   players,
//   playMoveAfterCheckSunk
// ) {
//   const moveStatus = document.querySelector(".moveStatus");

//   moveStatus.textContent = "Computer's targeting....";
//   let count = 0;
//   const interval = setInterval(() => {
//     computerChooseTarget();
//     count++;

//     if (count >= times) {
//       clearInterval(interval);
//       computerAttack(players);
//       if (playMoveAfterCheckSunk) playMoveAfterCheckSunk();
//     }
//   }, delay);
// }

function computerChooseTarget(players) {
  // remove previous gridSquare highlight
  removeActiveGridSquareHighlight();

  const [row, column] = genRandomPosition();
  const gridSquareActive = document.querySelector(".r" + row + "c" + column);
  gridSquareActive.classList.add("gridSquareActive");

  // could turn this into a function, argument required is gridSquareActive, which then gives us the ID
  let shipObject =
    players["playerOne"].gameBoard.boardArray[gridSquareActive.id[10]][
      gridSquareActive.id[12]
    ];

  if (shipObject.hit === true || shipObject.missed === true) {
    console.log("already hit, dont count this one");
    return false;
  }
  // console.log(shipObject.ship);

  return gridSquareActive.id;

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
