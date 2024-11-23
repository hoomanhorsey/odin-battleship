// import { Gameboard, Player, Ship } from "./gameObjects.js";
import { createPlayers, gameSetUp_positionPreFill } from "./gameSetup.js";
import { drawGrid } from "./display.js";
import {
  playerOwnGridListener,
  playerOwnGridListenerAndRemove,
} from "./listeners.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initial Game Setup, including position prefill for testing
  const players = createPlayers();
  gameSetUp_positionPreFill(players);

  // draw gameBoard grid
  drawGrid(players["playerOne"]);
  drawGrid(players["playerTwo"]);

  // Event listener for listening to clicks on grid square
  // Listeners required

  // Created grid listener, where player listens to own grid only.

  // Player One - listening to own grid to place ships. DONE
  //            - listening to Player Two grid to place attack
  // Player Two - listening to own grid to place showCompletionScript
  //           -- listeing to Player One Grid to place attack

  // console.log(players);

  // Initial event listener call

  // let removePlayerOneGridClickHandlerListener = null;
  let removePlayerTwoGridClickHandlerListener = null;

  const removePlayerOneGridClickHandlerListener =
    playerOwnGridListenerAndRemove(players["playerOne"], players);

  // Change player turn
  const takeTurn = document.querySelector(".changeTurn");
  const playerTurn = document.querySelector(".playerTurn");
  takeTurn.addEventListener("click", () => {
    if (playerTurn.textContent === "Player One's Turn") {
      playerTurn.textContent = "Player Two's Turn";
      removePlayerOneGridClickHandlerListener();
      removePlayerTwoGridClickHandlerListener = playerOwnGridListenerAndRemove(
        players["playerTwo"],
        players
      );
    } else {
      playerTurn.textContent = "Player One's Turn";
      removePlayerTwoGridClickHandlerListener();
      playerOwnGridListenerAndRemove(players["playerOne"], players);
    }
  });

  // playerOwnGridListener(players["playerOne"], players);
  // playerOwnGridListener(players["playerTwo"], players);

  // playerOneOwnGridListener(players);

  // playerOneGridListener(players);
  // playerTwoGridListener();

  // const gridSquaresPlayerOne = document.querySelectorAll(
  //   ".gridSquare_playerOne"
  // );
  // gridSquaresPlayerOne.forEach((e) => {
  //   e.addEventListener("click", (event) => {
  //     console.log(event.target);
  //     let row = parseInt(event.target.dataset.row);
  //     let column = parseInt(event.target.dataset.column);
  //     console.log(
  //       event.target.dataset.row +
  //         event.target.dataset.column +
  //         players["playerOne"].gameBoard.boardArray[row][column].ship
  //     );
  //     console.log(players["playerOne"].gameBoard.boardArray[row][column]);
  //   });
  // });

  //   const gridSquaresPlayerTwo = document.querySelectorAll(
  //     ".gridSquare_playerTwo"
  //   );
  //   gridSquaresPlayerTwo.forEach((e) => {
  //     e.addEventListener("click", (event) => {
  //       console.log(event.target);

  //       // let playerName = event.target.dataset.playerName;
  //       let row = parseInt(event.target.dataset.row);
  //       let column = parseInt(event.target.dataset.column);
  //       console.log(event.target.dataset.row + event.target.dataset.column);
  //       console.log(players["playerTwo"].gameBoard.boardArray[row][column]);
  //     });
  //   });
});
