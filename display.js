function drawGrid(player) {
  const gridDiv = document.querySelector(".gameBoard" + player.name);
  for (let row = 0; row < 10; row++) {
    let gridRow = document.createElement("div");
    gridRow.classList.add("gridRow");

    gridDiv.append(gridRow);
    for (let column = 0; column < 10; column++) {
      let gridSquare = document.createElement("gridSquare");
      // TODO - Some of these classes may be redundant, but just keep them in here for now in case you wish to customise the grids for each player for some reason?
      gridSquare.classList.add(
        "gridSquare",
        "gridSquare_" + player.name,
        "r" + row + "c" + column
      );

      gridSquare.dataset.playerName = player.name;
      gridSquare.dataset.row = row;
      gridSquare.dataset.column = column;

      gridSquare.textContent = player.gameBoard.boardArray[row][column].ship;

      gridRow.append(gridSquare);
    }
  }
}

export { drawGrid };
