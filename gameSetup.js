import { Player } from "./gameObjects.js";
import { drawGrid } from "./display.js";

function gameInit() {
  const players = createPlayers();
  // prefill positions
  // Following option allows computer to prefill postions
  // gameSetUp_positionPreFill(players);

  // Following option is to allow user to selection positions
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

function gameSetUp_positionFill(players) {
  players["playerTwo"].gameBoard.placeShip(0, 9, "down", "C", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(2, 6, "right", "S", "playerTwo");
  // setup Draggables

  //  https://www.w3schools.com/html/html5_draganddrop.asp
  const gameSetupDiv = document.querySelector(".gameSetup");

  const shipBlockC = document.getElementById("shipBlockC");
  const shipBlockB = document.getElementById("shipBlockB");
  const shipBlockD = document.getElementById("shipBlockD");
  const shipBlockS = document.getElementById("shipBlockS");
  const shipBlockP = document.getElementById("shipBlockP");

  const gameBoardPlayerOne = document.getElementById("gameBoardPlayerOne");

  //

  gameBoardPlayerOne.addEventListener("dragover", allowDrop);
  gameBoardPlayerOne.addEventListener("drop", drop);

  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();

    const shipBlockId = event.dataTransfer.getData("text");

    players["playerOne"].gameBoard.placeShip(
      event.target.id[10],
      event.target.id[12],
      "right",
      shipBlockId[9],
      players["playerOne"]
    );

    console.log(players["playerOne"].gameBoard.ships);
    event.target.appendChild(document.getElementById(shipBlockId));
  }

  function cleanupListeners() {
    div.removeEventListener("dragover", allowDrop);
    div.removeEventListener("drop", drop);
    img.removeEventListener("dragstart", drag);
    console.log("Listeners removed.");
  }

  shipBlockC.addEventListener("dragstart", drag);
  // shipBlockB.addEventListener("dragstart", drag);
  // shipBlockD.addEventListener("dragstart", drag);
  // shipBlockS.addEventListener("dragstart", drag);
  // shipBlockP.addEventListener("dragstart", drag);

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

// TO DELETE - This was code for when I dynamically created the shipBlock objects. Nott necessary as more straightforwad to hard code.

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
