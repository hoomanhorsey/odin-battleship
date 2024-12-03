import {
  removeActiveGridSquareHighlight,
  updateGridSquare,
} from "./display.js";

import { dupeGridSquareCheck } from "./helpers.js";

function targetListener(defendingPlayer) {
  const gridSquares = document.querySelectorAll(
    `.gridSquare_${defendingPlayer.name}`
  );
  const gridTargetHandler = (event) => {
    removeActiveGridSquareHighlight();
    event.target.classList.add("gridSquareActive");
  };

  gridSquares.forEach((e) => {
    console.log("target listener called");
    e.addEventListener("mouseover", gridTargetHandler);
  });

  // return function to remove listeners
  const removeTargetListener = () => {
    console.log("remove  target listener called");
    gridSquares.forEach((e) => {
      e.removeEventListener("mouseover", gridTargetHandler);
    });
  };
  // TODO - This has been put in computerAttack()
  // updateGameMoveStatus("user");

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

function TattackListener(
  defendingPlayer, // TODO, might be redundant
  players,
  removeTargetListener,
  computerMove
) {
  const gridSquares = document.querySelectorAll(
    // TOTRY - TRY WITHOUT DEFENDING PLAYER VARIABLE
    // `.gridSquare_${defendingPlayer.name}`
    `.gridSquare_${players["playerTwo"].name}`
  );

  // callback function for listener
  const gridAttackHandler = (event) => {
    if (
      dupeGridSquareCheck(
        players["playerTwo"],
        event.target.id[10],
        event.target.id[12]
      )
    ) {
      alert("already been clicked");
      return;
    } else {
      removeTargetListener();
      removeAttackListener();

      // TOTRY - TRY WITHOUT DEFENDING PLAYER VARIABLE
      // let attackResult = defendingPlayer.gameBoard.receiveAttack(
      let attackResult = players["playerTwo"].gameBoard.receiveAttack(
        event.target.dataset.row,
        event.target.dataset.column
      );
      updateGridSquare(attackResult, event.target);
      checkAllSunk(players, computerMove);
    }
  };

  // assign listener
  gridSquares.forEach((e) => {
    e.addEventListener("click", gridAttackHandler);
  });

  // function to remove attack listener
  const removeAttackListener = () => {
    console.log("remove attack listener called");
    gridSquares.forEach((e) => {
      e.removeEventListener("click", gridAttackHandler);
    });
  };
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

// function dupeGridSquareCheck(player, row, column) {
//   let shipObject = player.gameBoard.boardArray[row][column];
//   if (shipObject.hit === true || shipObject.missed === true) {
//     console.log("already hit, dont count this one");
//     return true;
//   } else {
//     return false;
//   }
//   // console.log(players["playerOne"].gameBoard.boardArray);
// }

export { targetListener, attackListener, dupeGridSquareCheck, checkAllSunk };
