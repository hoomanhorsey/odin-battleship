import { interpretAttackResult } from "./gameLogic.js";

function drawGrid(player, populateGridSquare) {
  const gridDiv = document.querySelector(".gameBoard" + player.name);
  for (let row = 0; row < 10; row++) {
    let gridRow = document.createElement("div");
    gridRow.classList.add("gridRow");

    gridDiv.append(gridRow);
    for (let column = 0; column < 10; column++) {
      let gridSquare = document.createElement("div");
      gridSquare.classList.add("gridSquare");
      gridSquare.dataset.playerName = player.name;
      gridSquare.dataset.row = row;
      gridSquare.dataset.column = column;

      // ***TO DO, FOR PREFILL TESTING ONLY - I think this function is only used when playerONe is prechosen. As it reveals the position of ships.  The computer's ships will never be revealed at the outset.  So it and the populateShipOnGridSquare() as well as the arguments in drawGrid can probably be deleted.
      if (populateGridSquare) {
        gridSquarePopulateWithShip(gridSquare, row, column, player);
      }
      gridRow.append(gridSquare);
    }
  }
}

function gridSquarePopulateWithShip(gridSquare, row, column, player) {
  gridSquare.textContent = player.gameBoard.boardArray[row][column].ship;
}

// gridSquare highlighting and unhighlighting
function gridSquareActiveLocate(row, column) {
  const gridSquareActive = document.querySelector(
    `[data-row="${row}"][data-column="${column}"]`
  );
  gridSquareActiveAddHighlight(gridSquareActive);
}

// gridSquare highlighting and unhighlighting
function gridSquareActiveAddHighlight(eventTarget) {
  if (eventTarget.classList.contains("gridSquare")) {
    eventTarget.classList.add("gridSquareActive");
  }
}

// function gridSquareNonActiveRemoveHighlight(eventTarget) {
//   console.log(eventTarget);
//   console.log("so its been removed");

//   eventTarget.classList.remove("gridSquareActive");
// }

function gridSquareNonActiveRemoveHighlight() {
  const gridSquareActive = document.querySelector(".gridSquareActive");

  if (gridSquareActive) {
    gridSquareActive.classList.remove("gridSquareActive");
  }
}

function gridSquareUpdateAfterAttack(attackResult, eventTarget) {
  const interpretation = interpretAttackResult(attackResult);

  console.log(interpretation.text);

  if (interpretation) {
    eventTarget.textContent = interpretation.text;
    eventTarget.classList.add(interpretation.class);
  }
}
function gridSquaresUncolor(
  gridSquareMainPrevious,
  shipType,
  shipLength,
  directionUncolor
) {
  console.log("called grisSquaresUncolor");

  console.log(directionUncolor);

  // noted, the args for shipType and shipLength Direction need to be customised for each type of ship

  if (directionUncolor === "right") {
    console.log("uncolor right");

    let startColumn = parseInt(gridSquareMainPrevious.dataset.column);
    for (let i = 0; i < 5; i++) {
      let newColumn = startColumn + i;
      gridSquareExtendedRemove(
        document.querySelector(
          `[data-row="${gridSquareMainPrevious.dataset.row}"][data-column="${newColumn}"]`
        ),
        i
      );
    }
  } else {
    console.log("uncolor down");

    console.log(gridSquareMainPrevious);
    let startRow = parseInt(gridSquareMainPrevious.dataset.row);
    for (let i = 0; i < 5; i++) {
      let newRow = startRow + i;
      const gridSquareExtended = document.querySelector(
        `[data-row="${newRow}"][data-column="${gridSquareMainPrevious.dataset.column}"]`
      );
      gridSquareExtendedRemove(gridSquareExtended, i);
    }
  }
}
function gridSquaresColor(gridSquareMain, shipType, shipLength, direction) {
  // FILLING IN GRIDS - at direction specified in parameters

  switch (direction) {
    case "right":
      console.log("gridSquaresColor right");

      let startColumn = parseInt(gridSquareMain.dataset.column);
      for (let i = 0; i < shipLength; i++) {
        let newColumn = startColumn + i;

        const gridSquareExtended = document.querySelector(
          `[data-row="${gridSquareMain.dataset.row}"][data-column="${newColumn}"]`
        );
        gridSquareExtendedUpdate(gridSquareExtended, shipType, i, "right");
      }
      break;

    case "down":
      console.log("gridSquaresColor down");

      let startRow = parseInt(gridSquareMain.dataset.row);
      for (let i = 0; i < shipLength; i++) {
        let newRow = startRow + i;

        const gridSquareExtended = document.querySelector(
          `[data-row="${newRow}"][data-column="${gridSquareMain.dataset.column}"]`
        );
        gridSquareExtendedUpdate(gridSquareExtended, shipType, i, "down");
      }
      break;
  }
}

function gridSquareExtendedUpdate(gridSquareExtended, shipType, i, direction) {
  console.log("callilng gridSquareExtendedUpdate");

  if (i === 0) {
    gridSquareExtended.setAttribute("draggable", true);
    gridSquareExtended.setAttribute("data-direction", direction);

    gridSquareExtended.setAttribute("data-ship-type", shipType);
    // Following hard codes, prob should be deleted.
    // gridSquareMain.setAttribute("data-direction", "right");
    // Following adds shipBlock classes. as it's a grid square, not quite the same as a shipblock so that may not be needed.
    // gridSquareMain.classList.add("shipBlock", `shipBlock${shipBlockIdFromData}`);
  }

  gridSquareExtended.classList.add(
    "gridSquareContainShip",
    "gridSquareContainShipC",
    "shipColorC"
  );

  gridSquareExtended.textContent = shipType;
}

function gridSquareExtendedRemove(gridSquareExtended, i) {
  if (i === 0) {
    //remove axis listener
    gridSquareExtended.removeAttribute("draggable");
    gridSquareExtended.removeAttribute("data-ship-type");
    gridSquareExtended.removeAttribute("data-direction");
  }
  console.log("gridSquareExtendedRemove");

  gridSquareExtended.classList.add("gridSquare");

  gridSquareExtended.classList.remove(
    "gridSquareContainShip",
    "gridSquareContainShipC",
    "shipBlock", // these are no longer in the thing anymore
    "shipBlockC", // these are no longer in the thing anymore
    "shipBlockDragging",
    "shipColorC"
  );
  gridSquareExtended.classList.add("gridSquare");

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
  gridSquarePopulateWithShip,
  gridSquareActiveAddHighlight,
  gridSquareNonActiveRemoveHighlight,
  gridSquareActiveLocate,
  gridSquareUpdateAfterAttack,
  gridSquaresColor,
  gridSquaresUncolor,
  gridSquareExtendedRemove,
  updateGameMoveStatus,
};
