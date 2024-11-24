// import isEqual from "lodash/isEqual";

// import { Gameboard, Player, Ship } from "./gameObjects.js";
import { createPlayers, gameSetUp_positionPreFill } from "./gameSetup.js";
import { drawGrid } from "./display.js";
import {
  playerOwnGridListenerAndRemove,
  playerOtherGridListenerAndRemove,
  targetListener,
  attackListener,
} from "./listeners.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initial Game Setup, including position prefill for testing
  const players = createPlayers();
  // position prefill for testing
  gameSetUp_positionPreFill(players);

  // draw gameBoard grid
  drawGrid(players["playerOne"]);
  drawGrid(players["playerTwo"]);

  let attackingPlayer = players["playerOne"];
  let defendingPlayer = players["playerTwo"];

  // Event listener for listening to clicks on grid square
  // Player One - listening to own grid to place ships. DONE
  //            - listening to Player Two grid to place attack
  // Player Two - listening to own grid to place showCompletionScript
  //           -- listeing to Player One Grid to place attack

  // PlayerOne place attack
  // playerOne - listener for targeting gridSquare
  const removeTargetListener = targetListener(attackingPlayer, defendingPlayer);
  // playerOne - listener for attacking gridSquare
  attackListener(attackingPlayer, defendingPlayer, removeTargetListener);

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
