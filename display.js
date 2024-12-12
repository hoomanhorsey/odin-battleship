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

function gridSquaresColor(gridSquareMain, shipType, shipLength, direction) {
  // FILLING IN GRIDS - at direction specified in parameters

  switch (direction) {
    case "right":
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
  }

  // TOD - not sure this needs to be removed.
  // gridSquareExtended.classList.remove(
  //   "gridSquare"

  gridSquareExtended.classList.add(
    "gridSquareContainShip",
    "gridSquareContainShipC"
  );

  gridSquareExtended.textContent = shipType;
}

function gridSquaresUncolor(gridSquareMain, direction) {
  if (direction === "right") {
    let startColumn = parseInt(gridSquareMain.dataset.column);
    for (let i = 0; i < 5; i++) {
      let newColumn = startColumn + i;
      const gridSquareExtended = document.querySelector(
        `[data-row="${gridSquareMain.dataset.row}"][data-column="${newColumn}"]`
      );

      console.log(gridSquareExtended);

      gridSquareExtendedRemove(gridSquareExtended, i);
    }
  } else {
    let startRow = parseInt(gridSquareMain.dataset.row);
    for (let i = 0; i < 5; i++) {
      let newRow = startRow + i;
      const gridSquareExtended = document.querySelector(
        `[data-row="${newRow}"][data-column="${gridSquareMain.dataset.column}"]`
      );
      gridSquareExtendedRemove(gridSquareExtended, i);
    }
  }
}

function gridSquareExtendedRemove(gridSquareExtended, i) {
  if (i === 0) {
    //remove axis listener
  }
  console.log("gridSquareExtendedRemove");

  gridSquareExtended.classList.add("gridSquare");

  gridSquareExtended.classList.remove(
    "gridSquareContainShip",
    "gridSquareContainShipC",
    "shipBlock",
    "shipBlockC",
    "shipBlockDragging"
  );
  gridSquareExtended.classList.add("gridSquare");
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

// function gridSquaresUncolorDown(
//   event,
//   shipType,
//   shipLength,
//   direction = "right"
// ) {
//   console.log("uncolourGrid SquaresDown");
//   console.log(event.target);
//   console.log(event.target.id);

//   const startingGridSquare = document.getElementById(event.target.id);

//   console.log(event.target.dataset.row);
//   console.log(event.target.dataset.column);

//   let startRow = parseInt(event.target.dataset.row);
//   for (let i = 0; i < 5; i++) {
//     let newColumn = startRow + i;
//     const gridSquareExtended = document.getElementById(
//       `playerOner${newColumn}c${event.target.dataset.row}`
//     );
//     removeGridSquareExtended(gridSquareExtended);
//   }

//   // TODO, insert logic to delete colour from 'right' gridsquares. ///*** DONE */
//   // creating initial function to remove gridSquares from the right only.
//   // TODO, refactor logic to make it a utility function
//   gridSquaresColor(event, shipType, shipLength, direction);
// }
