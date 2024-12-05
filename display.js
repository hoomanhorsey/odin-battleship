function drawGrid(player) {
  const gridDiv = document.querySelector(".gameBoard" + player.name);
  for (let row = 0; row < 10; row++) {
    let gridRow = document.createElement("div");
    gridRow.classList.add("gridRow");

    gridDiv.append(gridRow);
    for (let column = 0; column < 10; column++) {
      let gridSquare = document.createElement("div");
      // TODO - Some of these classes may be redundant, but just keep them in here for now in case you wish to customise the grids for each player for some reason?
      gridSquare.classList.add(
        "r" + row + "c" + column, // Looks potentially redundant, but not presently
        "gridSquare",
        "gridSquare_" + player.name
      );
      gridSquare.setAttribute("id", player.name + "r" + row + "c" + column);

      gridSquare.dataset.playerName = player.name;
      gridSquare.dataset.row = row;
      gridSquare.dataset.column = column;

      if (player.name === "playerOne") {
        gridSquare.textContent = player.gameBoard.boardArray[row][column].ship;
      }

      gridRow.append(gridSquare);
    }
  }
}

function removeActiveGridSquareHighlight() {
  if (document.querySelector(".gridSquareActive")) {
    const gridSquareActive = document.querySelector(".gridSquareActive");
    gridSquareActive.classList.remove("gridSquareActive");
  } else {
    return;
  }
}

function updateGridSquare(result, eventTarget) {
  if (result === "miss") {
    eventTarget.textContent = result;

    eventTarget.classList.add("gridSquareMiss");
    removeActiveGridSquareHighlight();
  } else if (result.ship !== null) {
    eventTarget.textContent = result.ship;

    removeActiveGridSquareHighlight();
    console.log(result.ship);
    eventTarget.classList.add("gridSquareHit");
  }
}

function updateGameMoveStatus(status) {
  console.log("updateGameMovestatus called");

  const gameMoveStatus = document.querySelector(".gameMoveStatus");

  switch (status) {
    case "userMove":
      gameMoveStatus.textContent =
        "Your move. Move cursor to target, click to attack!";
      break;
    case "computerMove":
      gameMoveStatus.textContent =
        "Computer's move. Click HERE for to launch computer attack";
      break;
    case "computerTarget":
      gameMoveStatus.textContent =
        "Computer's targeting...NOTE 'computer attacks follows this but is missing as user message is too fast. Need to update.";
      break;
    case "computerAttack":
      gameMoveStatus.textContent = "Computer attacks!!!";
      break;
    default:
      console.warn("Unknown status:", status);
  }
}

export {
  drawGrid,
  removeActiveGridSquareHighlight,
  updateGridSquare,
  updateGameMoveStatus,
};
