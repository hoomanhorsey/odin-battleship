import {
  removeActiveGridSquareHighlight,
  updateGridSquare,
} from "./display.js";

import { dupeGridSquareCheck } from "./helpers.js";

function targetListener(defendingPlayer) {
  const gameBoardplayerTwo = document.querySelector(".gameBoardplayerTwo");

  // const gridSquares = document.querySelectorAll(
  //   `.gridSquare_${defendingPlayer.name}`
  // );

  const gridTargetHandler = (event) => {
    if (event.target.classList.contains("gridSquare")) {
      removeActiveGridSquareHighlight();
      event.target.classList.add("gridSquareActive");
    }
  };

  gameBoardplayerTwo.addEventListener("mouseover", gridTargetHandler);

  // return function to remove listeners
  const removeTargetListener = () => {
    console.log("remove  target listener called");
    gameBoardplayerTwo.removeEventListener("mouseover", gridTargetHandler);
  };

  return removeTargetListener;
}

function attackListener(
  defendingPlayer, // TODO, might be redundant
  players,
  removeTargetListener,
  computerMove
) {
  const gameBoardPlayerTwo = document.querySelector(".gameBoardplayerTwo");

  const gridAttackHandler = (event) => {
    console.log(event.target.id[10], event.target.id[12]);

    if (event.target.classList.contains("gridSquare")) {
      if (
        dupeGridSquareCheck(
          players["playerTwo"],
          event.target.id[10],
          event.target.id[12]
        ) === true
      ) {
        alert("already been clicked");
        return;
      } else {
        removeTargetListener();
        removeAttackListener();

        let attackResult = players["playerTwo"].gameBoard.receiveAttack(
          event.target.dataset.row,
          event.target.dataset.column
        );
        updateGridSquare(attackResult, event.target);
        checkAllSunk(players, computerMove);
      }
    }
  };

  gameBoardPlayerTwo.addEventListener("click", gridAttackHandler);

  // function to remove attack listener
  function removeAttackListener() {
    console.log("remove attack listener called");
    gameBoardplayerTwo.removeEventListener("click", gridAttackHandler);
  }
}

function checkAllSunk(players, nextMoveCallback) {
  if (
    !players["playerOne"].gameBoard.checkSunk() &&
    !players["playerTwo"].gameBoard.checkSunk()
  ) {
    console.log("ships afloat");
    nextMoveCallback();
  } else {
    if (players["playerOne"].gameBoard.checkSunk()) {
      console.log(players["playerTwo"].name + "is the winner");
    } else {
      console.log(players["playerOne"].name + "is the winner");
    }
  }
}

export { targetListener, attackListener, dupeGridSquareCheck, checkAllSunk };
