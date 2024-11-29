import { Player } from "./gameObjects.js";
import { drawGrid } from "./display.js";

function gameInit() {
  const players = createPlayers();
  // prefill positions
  // gameSetUp_positionPreFill(players);
  gameSetUp_positionFill(players);
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

function gameSetUp_positionFill(players) {
  // setup Draggables

  //  https://www.w3schools.com/html/html5_draganddrop.asp
  const gameSetupDiv = document.querySelector(".gameSetup");

  const shipBlockB = document.getElementById("shipBlockC");
  const shipBlockC = document.getElementById("shipBlockB");
  const shipBlockD = document.getElementById("shipBlockD");
  const shipBlockS = document.getElementById("shipBlockS");
  const shipBlockP = document.getElementById("shipBlockP");

  const gameBoardPlayerOne = document.getElementById("gameBoardPlayerOne");

  gameBoardPlayerOne.addEventListener("dragover", allowDrop);
  gameBoardPlayerOne.addEventListener("drop", drop);
  shipBlockB.addEventListener("dragstart", drag);
  shipBlockC.addEventListener("dragstart", drag);
  shipBlockD.addEventListener("dragstart", drag);
  shipBlockS.addEventListener("dragstart", drag);
  shipBlockP.addEventListener("dragstart", drag);

  // const shipBlockC = document.createElement("p");
  // shipBlockC.setAttribute("draggable", true);
  // shipBlockC.setAttribute("id", "shipBLockC");
  // shipBlockC.classList.add("shipBlock", "shipBlockC");
  // shipBlockC.textContent = "Cruiser";

  // const shipBlockB = document.createElement("p");
  // shipBlockB.setAttribute("draggable", true);
  // shipBlockB.setAttribute("id", "shipBLockB");
  // shipBlockB.classList.add("shipBlock", "shipBlockB");
  // shipBlockB.textContent = "Battleship";

  function allowDrop(event) {
    event.preventDefault();
  }

  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }

  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
  }

  //prompt player for row, column, direction, shipType

  // const row = prompt("row (0-9)");
  // const column = prompt("column (0-9)");
  // const direction = prompt("up, down, left or right");
  // const shipType = prompt(
  //   "C for Carrier(5), B for Battleship(4), D for Destroyer(3), S for Submarine(3), P for PatrolBoat(2)"
  // );
  // insert player daetails
  // players["playerOne"].gameBoard.placeShip(row, column, direction, shipType);
}

export { gameInit };
