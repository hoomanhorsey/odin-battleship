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
        // "r" + row + "c" + column, // Looks potentially redundant, but not presently
        "gridSquare",
        "gridSquare_" + player.name
      );
      // gridSquare.setAttribute("id", player.name + "r" + row + "c" + column);

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

function highlightTargetedGridSquare(event) {
  if (event.target.classList.contains("gridSquare")) {
    removeActiveGridSquareHighlight();
    event.target.classList.add("gridSquareActive");
  }
}

function highlightActiveGridSquare(row, column) {
  const gridSquareActive = document.querySelector(
    `[data-row="${row}"][data-column="${column}"]`
  );
  gridSquareActive.classList.add("gridSquareActive");
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

function colorGridSquares(event, shipType, shipLength, direction) {
  // FILLING IN GRIDS - at direction specified in parameters
  switch (direction) {
    case "right":
      let startColumn = parseInt(event.target.dataset.column);
      for (let i = 0; i < shipLength; i++) {
        let newColumn = startColumn + i;
        const gridSquareExtended = document.getElementById(
          `playerOner${event.target.dataset.row}c${newColumn}`
        );
        updateGridSquareExtended(gridSquareExtended, shipType, i);
      }
      break;

    case "down":
      let startRow = parseInt(event.target.dataset.row);
      for (let i = 0; i < shipLength; i++) {
        let newRow = startRow + i;
        const gridSquareExtended = document.getElementById(
          `playerOner${newRow}c${event.target.dataset.column}`
        );
        updateGridSquareExtended(gridSquareExtended, shipType, i);
      }

      break;
  }
}

function updateGridSquareExtended(gridSquareExtended, shipType, i) {
  if (i === 0) {
    gridSquareExtended.setAttribute("draggable", true);
  }
  gridSquareExtended.classList.remove(
    "gridSquare",
    "gridSquare_playerOne",
    "gridSquareDraggedOver"
  );

  gridSquareExtended.classList.add(
    "gridSquareContainShip",
    "gridSquareContainShipC"
  );
  gridSquareExtended.textContent = shipType;
}

function unColorGridSquares(event, shipType, shipLength, direction) {
  console.log(direction);

  if (direction === "down") {
    console.log("uncolourGrid Squares");
    console.log(event.target);
    // console.log(event, shipBlockId, "down");
    console.log(event.target.id);

    const startingGridSquare = document.getElementById(event.target.id);

    console.log(event.target.dataset.row);
    console.log(event.target.dataset.column);

    let startColumn = parseInt(event.target.dataset.column);
    for (let i = 0; i < 5; i++) {
      let newColumn = startColumn + i;
      const gridSquareExtended = document.getElementById(
        `playerOner${event.target.dataset.row}c${newColumn}`
      );
      removeGridSquareExtended(gridSquareExtended);
    }

    // TODO, insert logic to delete colour from 'right' gridsquares. ///*** DONE */
    // creating initial function to remove gridSquares from the right only.
    // TODO, refactor logic to make it a utility function
    colorGridSquares(event, shipType, shipLength, direction);

    return "right";
  } else {
    console.log("uncolourGrid SquaresDown");
    console.log(event.target);
    console.log(event.target.id);

    const startingGridSquare = document.getElementById(event.target.id);

    console.log(event.target.dataset.row);
    console.log(event.target.dataset.column);

    let startRow = parseInt(event.target.dataset.row);
    for (let i = 0; i < 5; i++) {
      let newRow = startRow + i;
      const gridSquareExtended = document.getElementById(
        `playerOner${newRow}c${event.target.dataset.column}`
      );
      removeGridSquareExtended(gridSquareExtended);
    }

    // TODO, insert logic to delete colour from 'right' gridsquares. ///*** DONE */
    // creating initial function to remove gridSquares from the right only.
    // TODO, refactor logic to make it a utility function
    colorGridSquares(event, shipType, shipLength, direction);
  }
  return "down";
}

function unColorGridSquaresDown(
  event,
  shipType,
  shipLength,
  direction = "right"
) {
  console.log("uncolourGrid SquaresDown");
  console.log(event.target);
  console.log(event.target.id);

  const startingGridSquare = document.getElementById(event.target.id);

  console.log(event.target.dataset.row);
  console.log(event.target.dataset.column);

  let startRow = parseInt(event.target.dataset.row);
  for (let i = 0; i < 5; i++) {
    let newColumn = startRow + i;
    const gridSquareExtended = document.getElementById(
      `playerOner${newColumn}c${event.target.dataset.row}`
    );
    removeGridSquareExtended(gridSquareExtended);
  }

  // TODO, insert logic to delete colour from 'right' gridsquares. ///*** DONE */
  // creating initial function to remove gridSquares from the right only.
  // TODO, refactor logic to make it a utility function
  colorGridSquares(event, shipType, shipLength, direction);
}

function removeGridSquareExtended(gridSquareExtended) {
  gridSquareExtended.classList.remove(
    "gridSquareContainShip",
    "gridSquareContainShipC"
  );
  gridSquareExtended.classList.add(
    "gridSquare",
    "gridSquare_playerOne"
    // "gridSquareDraggedOver"
  );
  gridSquareExtended.removeAttribute("draggable");
  gridSquareExtended.textContent = "";
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
  highlightTargetedGridSquare,
  highlightActiveGridSquare,
  removeActiveGridSquareHighlight,
  updateGridSquare,
  colorGridSquares,
  unColorGridSquares,
  updateGameMoveStatus,
};
