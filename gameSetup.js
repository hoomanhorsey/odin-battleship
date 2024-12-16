import { Player } from "./gameObjects.js";
import { drawGrid, gridSquarePopulateWithShip } from "./display.js";
import {
  shipBlockAttachEventHandlers,
  gameBoardAttachEventHandlers,
} from "./eventHandling.js";

function gameInit() {
  const players = createPlayers();
  // prefill positions

  // draw gameBoard grid
  drawGrid(players["playerOne"], gridSquarePopulateWithShip);
  drawGrid(players["playerTwo"], gridSquarePopulateWithShip);

  // *** <<<< FOR TESTING- function for computer to prefill postions>>>>>
  // gameSetUp_positionPreFill_BothPlayers(players);

  // function to allow user to selection positions
  gameSetUp_positionFill_ComputerOnly(players);
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

// TESTING ONLY prefill computer player positions
function gameSetUp_positionFill_ComputerOnly(players) {
  players["playerTwo"].gameBoard.placeShip(0, 9, "down", "C", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(2, 6, "right", "S", "playerTwo");
}

// For Testing//
// prefill positions for testing_BothPlayers -
function gameSetUp_positionPreFill_BothPlayers(players) {
  players["playerOne"].gameBoard.placeShip(0, 6, "right", "C", "playerOne");
  players["playerOne"].gameBoard.placeShip(5, 2, "right", "D", "playerOne");
  players["playerOne"].gameBoard.placeShip(9, 7, "left", "B", "playerOne");
  players["playerOne"].gameBoard.placeShip(4, 7, "down", "P", "playerOne");
  players["playerOne"].gameBoard.placeShip(9, 9, "up", "S", "playerOne");

  players["playerTwo"].gameBoard.placeShip(0, 9, "down", "C", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(2, 6, "right", "S", "playerTwo");
}

export { gameInit };
