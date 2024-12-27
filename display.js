import { interpretAttackResult } from "./gameLogic.js";

function drawGrid(player) {
  const gridDiv = document.querySelector(".gameBoard" + player.name);
  for (let row = 0; row < 10; row++) {
    let gridRow = document.createElement("div");
    gridRow.classList.add("gridRow");

    gridDiv.append(gridRow);
    for (let column = 0; column < 10; column++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.dataset.playerName = player.name;
      square.dataset.row = row;
      square.dataset.column = column;

      gridRow.append(square);
    }
  }
}

// square highlighting and unhighlighting
function squareActiveLocate(row, column) {
  const squareActive = document.querySelector(
    `[data-row="${row}"][data-column="${column}"]`
  );
  squareActiveAddHighlight(squareActive);
}

// square highlighting and unhighlighting
function squareActiveAddHighlight(eventTarget) {
  if (eventTarget.classList.contains("square")) {
    eventTarget.classList.add("squareActive");
  }
}

function squareNonActiveRemoveHighlight(eventTarget) {
  const squareActive = document.querySelector(".squareActive");
  if (squareActive) {
    eventTarget.classList.remove("squareActive");
  }
}

function squareUpdateAfterAttack(attackResult, eventTarget) {
  const interpretation = interpretAttackResult(attackResult);

  if (interpretation) {
    eventTarget.textContent = interpretation.text;
    eventTarget.classList.add(interpretation.class);
  }
}
function shipBlockColorAndUnColor(
  squareMainPrevious,
  squareMain,
  shipType,
  shipLength,
  orientationColor,
  orientationUncolor
) {
  if (squareMainPrevious !== null) {
    squaresUncolor(
      squareMainPrevious,
      shipType,
      shipLength,
      orientationUncolor
    );
  }
  squaresColor(squareMain, shipType, shipLength, orientationColor);
}
function squaresUncolor(
  squareMainPrevious,
  shipType,
  shipLength,
  orientationUncolor
) {
  // noted, the args for shipType and shipLength Direction need to be customised for each type of ship

  if (orientationUncolor === "horizontal") {
    let startColumn = parseInt(squareMainPrevious.dataset.column);
    for (let i = 0; i < shipLength; i++) {
      let newColumn = startColumn + i;
      const squareExtended = document.querySelector(
        `[data-row="${squareMainPrevious.dataset.row}"][data-column="${newColumn}"]`
      );
      squareExtendedRemove(squareExtended, shipType, i);
    }
  } else {
    let startRow = parseInt(squareMainPrevious.dataset.row);
    for (let i = 0; i < shipLength; i++) {
      let newRow = startRow + i;
      const squareExtended = document.querySelector(
        `[data-row="${newRow}"][data-column="${squareMainPrevious.dataset.column}"]`
      );
      squareExtendedRemove(squareExtended, shipType, i);
    }
  }
}
function squaresColor(squareMain, shipType, shipLength, orientation) {
  // FILLING IN GRIDS - at orientation specified in parameters

  switch (orientation) {
    case "horizontal":
      let startColumn = parseInt(squareMain.dataset.column);
      for (let i = 0; i < shipLength; i++) {
        let newColumn = startColumn + i;

        const squareExtended = document.querySelector(
          `[data-row="${squareMain.dataset.row}"][data-column="${newColumn}"]`
        );
        squareExtendedUpdate(squareExtended, shipType, i, "horizontal");
      }
      break;

    case "vertical":
      let startRow = parseInt(squareMain.dataset.row);
      for (let i = 0; i < shipLength; i++) {
        let newRow = startRow + i;

        const squareExtended = document.querySelector(
          `[data-row="${newRow}"][data-column="${squareMain.dataset.column}"]`
        );
        squareExtendedUpdate(squareExtended, shipType, i, "vertical");
      }
      break;
  }
}

function squareExtendedUpdate(squareExtended, shipType, i, orientation) {
  if (i === 0) {
    squareExtended.setAttribute("draggable", true);
    squareExtended.setAttribute("data-orientation", orientation);
    squareExtended.setAttribute("data-ship-type", shipType);
  }
  squareExtended.classList.add(`shipColor${shipType}`);
  squareExtended.textContent = shipType;
}

function squareExtendedRemove(squareExtended, shipType, i) {
  if (i === 0) {
    //remove axis listener
    squareExtended.removeAttribute("draggable");
    squareExtended.removeAttribute("data-ship-type");
    squareExtended.removeAttribute("data-orientation");
  }
  squareExtended.classList.add("square");
  squareExtended.classList.remove("shipBlockDragging", `shipColor${shipType}`);
  squareExtended.textContent = "";
}

function updateGameMoveStatus(status) {
  const gameMoveStatus = document.querySelector(".gameMoveStatus");
  switch (status) {
    case "placeShips":
      gameMoveStatus.textContent =
        "Welcome to Battleship. Please place your ships on the PlayerOne gameBoard. Click on each ship to change orientation ";
      break;
    case "shipsPlaced":
      gameMoveStatus.textContent =
        "All ships have been placed. Press 'start' to start the game";
      break;
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
function shipBlockOriginalRemove(shipTypeFromShipBlockData) {
  let shipBlockOriginal = document.querySelector(
    `[data-ship-type="${shipTypeFromShipBlockData}"]`
  );

  console.log(shipBlockOriginal);

  // removes the original shipBlock only, which has an ID.  Later grid squares will share the shipType
  if (shipBlockOriginal.id === `shipBlock${shipTypeFromShipBlockData}`) {
    shipBlockOriginal.remove();
  }
}

function shipBlockGetOrientationData(squareMainPrevious) {
  // squareMainPrevious -if null, means no shipBlock has been placed yet
  if (squareMainPrevious === null) {
    return { orientationColor: "horizontal", orientationUncolor: "horizontal" };
  } else {
    return {
      orientationColor: squareMainPrevious.dataset.orientation,
      orientationUncolor: squareMainPrevious.dataset.orientation,
    };
  }
}

function gameBoardToggleLegalState(isLegal, gameBoard) {
  if (isLegal) {
    gameBoard.classList.remove("gameBoardNotLegal");
    gameBoard.classList.add("gameBoardLegal");
  } else {
    gameBoard.classList.remove("gameBoardLegal");
    gameBoard.classList.add("gameBoardNotLegal");
  }
}

function squareMainPreviousRemove(shipTypeFromShipBlockData) {
  let squareMainPrevious = document.querySelector(
    `[data-ship-type="${shipTypeFromShipBlockData}"]`
  );

  if (squareMainPrevious.classList.contains("originalShipBlock")) {
    // removes shipBlock if it's the original
    squareMainPrevious.remove();
    return null;
  } else {
    return squareMainPrevious;
  }
}

export {
  drawGrid,
  gameBoardToggleLegalState,
  shipBlockColorAndUnColor,
  shipBlockGetOrientationData,
  shipBlockOriginalRemove,
  squareActiveAddHighlight,
  squareActiveLocate,
  squareExtendedRemove,
  squareMainPreviousRemove,
  squareNonActiveRemoveHighlight,
  squareUpdateAfterAttack,
  squaresColor,
  squaresUncolor,
  updateGameMoveStatus,
};
