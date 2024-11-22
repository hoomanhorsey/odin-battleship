import { Gameboard, Player, Ship } from "./gameObjects.js";

document.addEventListener("DOMContentLoaded", () => {
  const gameBoardDiv = document.querySelector(".gameBoard");

  const players = {
    playerOne: new Player("playerOne"),
    playerTwo: new Player("playerTwo"),
  };
  //   const playerOne = new Player("playerOne");
  players["playerOne"].gameBoard.placeShip(0, 0, "down", "C");
  players["playerOne"].gameBoard.placeShip(5, 2, "right", "D");
  players["playerOne"].gameBoard.placeShip(9, 7, "left", "B");
  players["playerOne"].gameBoard.placeShip(4, 7, "down", "P");
  players["playerOne"].gameBoard.placeShip(9, 9, "up", "S");

  //   const playerTwo = new Player("playerTwo");

  players["playerTwo"].gameBoard.placeShip(0, 9, "down", "C");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P");
  players["playerTwo"].gameBoard.placeShip(2, 6, "right", "S");

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
        gridSquare.dataset.column = column;

        gridSquare.textContent = player.gameBoard.boardArray[row][column].ship;

        gridRow.append(gridSquare);
      }
    }
  }

  const gridSquares = document.querySelectorAll("gridSquare");
  gridSquares.forEach((e) => {
    e.addEventListener("click", (event) => {
      console.log(event.target);

      // let playerName = event.target.dataset.playerName;
      let row = parseInt(event.target.dataset.row);
      let column = parseInt(event.target.dataset.column);
      console.log(event.target.dataset.row + event.target.dataset.column);
      console.log(players["playerOne"].gameBoard.boardArray[row][column]);
    });
  });
});
