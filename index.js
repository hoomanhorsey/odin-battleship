// import isEqual from "lodash/isEqual";

// import { Gameboard, Player, Ship } from "./gameObjects.js";
import { createPlayers, gameSetUp_positionPreFill } from "./gameSetup.js";
import { drawGrid } from "./display.js";
import {
  playerOwnGridListenerAndRemove,
  playerOtherGridListenerAndRemove,
  targetListener,
  attackListener,
  removeActiveGridSquareHighlight,
  updateGridSquare,
} from "./listeners.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Game (including position prefill for testing)
  // TODO possibly move to it's own module

  const players = createPlayers();
  // position prefill for testing
  gameSetUp_positionPreFill(players);

  // draw gameBoard grid
  drawGrid(players["playerOne"]);
  drawGrid(players["playerTwo"]);

  playTurn();
  if (!checkSunk()) {
    console.log(checkSunk());
  }

  function playTurn() {
    console.log("playturn function");
  }

  // player status
  let attackingPlayer = players["playerOne"];
  let defendingPlayer = players["playerTwo"];

  // calling Listeners
  // playerOne - listener - targeting
  const removeTargetListener = targetListener(attackingPlayer, defendingPlayer);
  // playerOne - listener - attacking
  let attackResult = attackListener(
    attackingPlayer,
    defendingPlayer,
    removeTargetListener,
    nextMove
  );

  function nextMove() {
    const nextMoveDiv = document.querySelector(".nextMoveDiv");
    nextMoveDiv.textContent = "Click for next Move";
    nextMoveDiv.addEventListener("click", triggerNextMove);
    function triggerNextMove() {
      // insert logic to swap players
      console.log("next move triggered. Now call computer move");
      nextMoveDiv.textContent = "";
      nextMoveDiv.removeEventListener("click", triggerNextMove);
      console.log("trigger next move removed");

      let target = 0;
      target = computerTarget(computerChooseTarget, 5, 150);
    }
  }

  function computerTarget(computerChooseTarget, times, delay) {
    let count = 0;
    const interval = setInterval(() => {
      computerChooseTarget();
      count++;

      if (count >= times) {
        clearInterval(interval);
        computerAttack();
      }
    }, delay);
  }

  function computerChooseTarget() {
    removeActiveGridSquareHighlight();
    //     let previousActiveGridSquare = document.querySelector(".gridSquareActive");
    // previousActiveGridSquare

    const [row, column] = genRandomPosition();

    console.log(row, column);

    const gridSquareActive = document.querySelector(".r" + row + "c" + column);
    console.log(gridSquareActive);
    gridSquareActive.classList.add("gridSquareActive");

    function genRandomPosition() {
      return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    }
  }

  function computerAttack() {
    const gridSquareActive = document.querySelector(".gridSquareActive");
    console.log(gridSquareActive);
    const attackResult = players["playerOne"].gameBoard.receiveAttack(
      gridSquareActive.dataset.row,
      gridSquareActive.dataset.column
    );

    console.log(attackResult);
    updateGridSquare(attackResult, gridSquareActive);
  }

  function checkSunk() {
    if (players["playerOne"].gameBoard.checkSunk()) {
      return players["playerOne"];
    } else if (players["playerTwo"].gameBoard.checkSunk()) {
      return players["playerTwo"];
    } else {
      return false;
    }
  }
  //
  //
  //
  ///////////////THE FOLLOWING MAY NOT BE NECESSARY.
  ///AS I WONT INCLUDE A CHANGE TURN FUNCTION
  // Rather moves will change once a player presses hit, '
  // But I may need to salvage some of the code to switch players

  const takeTurn = document.querySelector(".changeTurn");
  const playerTurn = document.querySelector(".playerTurn");
  playerTurn.textContent = players["playerOne"].name + "'s turn";

  let sunkShips = 0;

  takeTurn.addEventListener("click", () => {
    console.log("attacking player" + attackingPlayer.name);
    if (attackingPlayer.name === "playerOne") {
      playerTurn.textContent = players["playerTwo"].name + "'s turn";
      attackingPlayer = players["playerTwo"];
      defendingPlayer = players["playerOne"];

      // removeTargetListener();
      // targetListener(attackingPlayer, defendingPlayer);

      // removeAttackListener();
      // attackListener(attackingPlayer, defendingPlayer);

      console.log("attacking player is now " + attackingPlayer.name);
    } else if (attackingPlayer.name === "playerTwo") {
      playerTurn.textContent = players["playerOne"].name + "'s turn";
      attackingPlayer = players["playerOne"];
      defendingPlayer = players["playerTwo"];

      // removeTargetListener();
      // targetListener(attackingPlayer, defendingPlayer);

      // removeAttackListener();
      // attackListener(attackingPlayer, defendingPlayer);
      console.log("attacking player is now " + attackingPlayer.name);
    }
  });

  // let removePlayerTwoGridClickHandlerListener = null;
  // const removePlayerOneGridClickHandlerListener =
  //   playerOtherGridListenerAndRemove(players["playerOne"], players);

  // playerOtherGridListenerAndRemove(players["playerOne"], players);

  // Initial event listener call
  // let removePlayerTwoGridClickHandlerListener = null;
  // const removePlayerOneGridClickHandlerListener =
  //   playerOwnGridListenerAndRemove(players["playerOne"], players);

  // Change player turn
  // const takeTurn = document.querySelector(".changeTurn");
  // const playerTurn = document.querySelector(".playerTurn");
  // takeTurn.addEventListener("click", () => {
  //   if (playerTurn.textContent === "Player One's Turn") {
  //     playerTurn.textContent = "Player Two's Turn";
  //     removePlayerOneGridClickHandlerListener();
  //     removePlayerTwoGridClickHandlerListener = playerOwnGridListenerAndRemove(
  //       players["playerTwo"],
  //       players
  //     );
  //   } else {
  //     playerTurn.textContent = "Player One's Turn";
  //     removePlayerTwoGridClickHandlerListener();
  //     playerOwnGridListenerAndRemove(players["playerOne"], players);
  //   }
  // });

  function changeAttackingPlayer() {
    console.log(isEqual(attackingPlayer, players["playerOne"])); // true

    if (attackingPlayer === players["playerOne"]) {
      attackingPlayer = players["playerTwo"];
      defendingPlayer = players["playerOne"];
    } else {
      attackingPlayer = players["playerOne"];
      defendingPlayer = players["playerTwo"];
    }
  }
});
