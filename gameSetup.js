import { Player } from "./gameObjects.js";
import { drawGrid } from "./display.js";
import {
  shipBlockEventHandlersAttach,
  gameBoardEventHandlersAttach,
} from "./eventHandling.js";

import { placeComputerShip } from "./computerLogic.js";

function gameInit() {
  // create player Objects
  const players = createPlayers();

  // draw gameBoard grid
  drawGrid(players["playerOne"]);
  drawGrid(players["playerTwo"]);

  // place computerShips
  gameSetupComputerRandom(players);

  // launch ship block and gameboard handlers
  shipBlockEventHandlersAttach(players);
  gameBoardEventHandlersAttach(players);

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
