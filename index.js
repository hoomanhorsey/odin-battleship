import { Gameboard, Player, Ship } from "./gameObjects.js";

document.addEventListener("DOMContentLoaded", () => {
  const gameBoardDiv = document.querySelector(".gameBoard");

  const players = {
    playerOne: new Player("playerOne"),
    playerTwo: new Player("playerTwo"),
  };
  //   const playerOne = new Player("playerOne");
  players["playerOne"].gameBoard.placeShip(0, 0, "down", "carrier");
  players["playerOne"].gameBoard.placeShip(5, 5, "up", "destroyer");
  players["playerOne"].gameBoard.placeShip(9, 9, "left", "battleship");
  players["playerOne"].gameBoard.placeShip(4, 7, "right", "patrolBoat");
  players["playerOne"].gameBoard.placeShip(0, 6, "right", "submarine");

  //   const playerTwo = new Player("playerTwo");

  players["playerTwo"].gameBoard.placeShip(0, 0, "down", "carrier");
  players["playerTwo"].gameBoard.placeShip(5, 5, "up", "destroyer");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "battleship");
  players["playerTwo"].gameBoard.placeShip(4, 7, "right", "patrolBoat");
  players["playerTwo"].gameBoard.placeShip(0, 6, "right", "submarine");

  const gridDivOne = document.createElement("div");
  const gridDivTwo = document.createElement("div");

  gridDivOne.classList.add("gridDiv", "gridDivOne");
  gridDivTwo.classList.add("gridDiv", "gridDivTwo");

  const gameBoardPlayerOne = document.querySelector(".gameBoardPlayerOne");
  gameBoardPlayerOne.append(gridDivOne);
  const gameBoardPlayerTwo = document.querySelector(".gameBoardPlayerTwo");
  gameBoardPlayerTwo.append(gridDivTwo);

  drawGrid(gridDivOne, players["playerOne"]);
  drawGrid(gridDivTwo, players["playerTwo"]);

  function drawGrid(gridDiv, player) {
    for (let row = 0; row < 10; row++) {
      let gridRow = document.createElement("div");
      gridRow.classList.add("gridRow");

      gridDiv.append(gridRow);
      for (let column = 0; column < 10; column++) {
        let gridSquare = document.createElement("gridSquare");

        gridSquare.classList.add(
          "gridSquare",
          player.name,
          "r" + row + "c" + column
        );
        // // gridSquare.setAttribute("id", "r" + row + "c" + column);
        // gridSquare.setAttribute("id", player.name + "r" + row + "c" + column);

        gridSquare.dataset.playerName = player.name;
        gridSquare.dataset.row = row;
        gridSquare.dataset.col = column;

        gridSquare.textContent = player.gameBoard.boardArray[row][column].ship;

        gridRow.append(gridSquare);
      }
    }
  }

  const gridSquares = document.querySelectorAll("gridSquare");
  gridSquares.forEach((e) => {
    e.addEventListener("click", (event) => {
      console.log(event.target);

      let playerName = event.target.dataset.playerName;
      let row = parseInt(event.target.dataset.row);
      let column = parseInt(event.target.dataset.col);

      console.log(players["playerOne"].gameBoard.boardArray[row][column]);
    });
  });
});
