import { Player } from "./gameObjects.js";
import { drawGrid } from "./display.js";

function gameInit() {
  const players = createPlayers();
  // prefill positions
  gameSetUp_positionPreFill(players);
  // draw gameBoard grid
  drawGrid(players["playerOne"]);
  drawGrid(players["playerTwo"]);
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

function gameSetUp_positionPreFill(players) {
  players["playerOne"].gameBoard.placeShip(0, 0, "down", "C");
  players["playerOne"].gameBoard.placeShip(5, 2, "right", "D");
  players["playerOne"].gameBoard.placeShip(9, 7, "left", "B");
  players["playerOne"].gameBoard.placeShip(4, 7, "down", "P");
  players["playerOne"].gameBoard.placeShip(9, 9, "up", "S");

  players["playerTwo"].gameBoard.placeShip(0, 9, "down", "C");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P");
  players["playerTwo"].gameBoard.placeShip(2, 6, "right", "S");
}

export { gameInit };
