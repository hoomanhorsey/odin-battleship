import { Player } from "./gameObjects.js";
import {
  drawGrid,
  populateGridSquare,
  colorGridSquares,
  unColorGridSquares,
} from "./display.js";
import { checkMoveLegal } from "./helpers.js";
import { setupGameSetupListeners } from "./eventHandling.js";

function gameInit() {
  const players = createPlayers();
  // prefill positions

  // draw gameBoard grid
  drawGrid(players["playerOne"], populateGridSquare);
  drawGrid(players["playerTwo"], populateGridSquare);

  // *** <<<< FOR TESTING- function for computer to prefill postions>>>>>
  // gameSetUp_positionPreFill(players);

  // function to allow user to selection positions
  gameSetUp_positionFill(players);
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

// TODO - error check that checks if object is illegal or a collision.
// ------TODO - if it is an error or collision, then you need to disable allowDrop()
// ------ TODO - but if it is legal then you can allow drop again.
// TODO - then once drop, you can display on DOM.
// TODO - draw it in, but don't save it to array.
// ------Once it is drawn in, the shipBlock is still on display.
//--------disable piece? append piece to div? remove shipBLock?
// TODO - allow user to rotate the piece using up and down.
// TODO - once all 5 pieces are on the gameboard allow user to START GAME!

// TODO - how to keep track of ships? Create a temp array of co-ordinates.
// ---- once you press confirm, take the co-ords from temp array and then put into place ship

// prefill computer player positions
function gameSetUp_positionFill(players) {
  players["playerTwo"].gameBoard.placeShip(0, 9, "down", "C", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(2, 6, "right", "S", "playerTwo");

  setupGameSetupListeners(players);
}

// event listeners - remove.....
function cleanupListeners() {
  div.removeEventListener("dragover", allowDrop);
  div.removeEventListener("drop", drop);
  img.removeEventListener("dragstart", drag);
  console.log("Listeners removed.");
}

// prefill positions for testing

function gameSetUp_positionPreFill(players) {
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
