import { Player } from "./gameObjects.js";
import { drawGrid } from "./display.js";
import {
  shipBlockAttachEventHandlers,
  gameBoardAttachEventHandlers,
} from "./eventHandling.js";

import { placeComputerShip } from "./computerLogic.js";

function gameInit() {
  const players = createPlayers();

  // draw gameBoard grid
  drawGrid(players["playerOne"]);
  drawGrid(players["playerTwo"]);

  gameSetupComputerRandom(players);

  shipBlockAttachEventHandlers(players);
  gameBoardAttachEventHandlers(players);
  return players;
}

function createPlayers(
  playerOneName = "playerOne",
  playerTwoName = "playerTwo"
) {
  return {
    playerOne: new Player(playerOneName),
    playerTwo: new Player(playerTwoName),
  };
}

function gameSetupComputerRandom(players) {
  const boardArray = players["playerTwo"].gameBoard.boardArray;
  const shipsArray = Object.values(players["playerTwo"].gameBoard.ships);
  shipsArray.sort((a, b) => a.length - b.length);
  shipsArray.forEach((ship) => placeComputerShip(ship, boardArray, players));
}

export { gameInit };

// *** <<<< FOR TESTING- function for computer to prefill postions>>>>>
// gameSetUp_positionPreFill_BothPlayers(players);

// function to allow user to selection positions
// gameSetUp_positionFill_ComputerOnly(players);

// // function to set up on postions for computer, simply for testing.
// gameSetup_Noprefill();
// function to set up computer game board at random positions

function gameSetup_Noprefill() {
  // No positions prefilled on computer gameboard. This function is simply here as a reminder to reset prefills or delete entirely once into production
}
// TESTING ONLY prefill computer player positions
function gameSetUp_positionFill_ComputerOnly(players) {
  players["playerTwo"].gameBoard.placeShip(0, 9, "vertical", "C", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(
    2,
    6,
    "horizontal",
    "S",
    "playerTwo"
  );
}

// For Testing//
// prefill positions for testing_BothPlayers -
function gameSetUp_positionPreFill_BothPlayers(players) {
  players["playerOne"].gameBoard.placeShip(
    0,
    6,
    "horizontal",
    "C",
    "playerOne"
  );
  players["playerOne"].gameBoard.placeShip(
    5,
    2,
    "horizontal",
    "D",
    "playerOne"
  );
  players["playerOne"].gameBoard.placeShip(9, 7, "left", "B", "playerOne");
  players["playerOne"].gameBoard.placeShip(4, 7, "vertical", "P", "playerOne");
  players["playerOne"].gameBoard.placeShip(9, 9, "up", "S", "playerOne");

  players["playerTwo"].gameBoard.placeShip(0, 9, "vertical", "C", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(
    2,
    6,
    "horizontal",
    "S",
    "playerTwo"
  );
}

// checks Legal
// ********************toggle orientation if false???, then check again????
// console.log(row, column, orientation, ship.length);

// console.log(
//   "check move Legal ",
//   checkMoveLegal(row, column, orientation, ship.length)
// );

// // if (!checkMoveLegal) {
// //   return false;
// // }
// const isClear = isClearOfCollisions(
//   boardArray,
//   row,
//   column,
//   orientation,
//   ship,
//   "drag"
// );
// players["playerTwo"].gameBoard.placeShip(
//   row,
//   column,
//   orientation,
//   ship.type,
//   "save"
// );
// console.log("is clear ", isClear);

// positionCheckArray(boardArray, row, column, orientation, ship);
// placed = true;
