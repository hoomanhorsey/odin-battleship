import { interpretAttackResult } from "./gameLogic.js";

function drawGrid(player, populateGridSquare) {
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

      // ***TO DO, FOR PREFILL TESTING ONLY - I think this function is only used when playerONe is prechosen. As it reveals the position of ships.  The computer's ships will never be revealed at the outset.  So it and the populateShipOnGridSquare() as well as the arguments in drawGrid can probably be deleted.
      if (populateGridSquare) {
        squarePopulateWithShip(square, row, column, player);
      }
      gridRow.append(square);
    }
  }
}

function squarePopulateWithShip(square, row, column, player) {
  square.textContent = player.gameBoard.boardArray[row][column].ship;
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

  console.log(interpretation.text);

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
  console.log("called grisSquaresUncolor");

  console.log(orientationUncolor);

  // noted, the args for shipType and shipLength Direction need to be customised for each type of ship

  if (orientationUncolor === "horizontal") {
    console.log("uncolor horizontal");

    let startColumn = parseInt(squareMainPrevious.dataset.column);
    for (let i = 0; i < 5; i++) {
      let newColumn = startColumn + i;
      squareExtendedRemove(
        document.querySelector(
          `[data-row="${squareMainPrevious.dataset.row}"][data-column="${newColumn}"]`
        ),
        i
      );
    }
  } else {
    console.log("uncolor vertical");
    let startRow = parseInt(squareMainPrevious.dataset.row);
    for (let i = 0; i < 5; i++) {
      let newRow = startRow + i;
      const squareExtended = document.querySelector(
        `[data-row="${newRow}"][data-column="${squareMainPrevious.dataset.column}"]`
      );
      squareExtendedRemove(squareExtended, i);
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
    // Following hard codes, prob should be deleted.
    // squareMain.setAttribute("data-orientation", "horizontal");
    // Following adds shipBlock classes. as it's a grid square, not quite the same as a shipblock so that may not be needed.
    // squareMain.classList.add("shipBlock", `shipBlock${shipBlockIdFromData}`);
  }

  squareExtended.classList.add("shipColorC");
  squareExtended.textContent = shipType;
}

function squareExtendedRemove(squareExtended, i) {
  if (i === 0) {
    //remove axis listener
    squareExtended.removeAttribute("draggable");
    squareExtended.removeAttribute("data-ship-type");
    squareExtended.removeAttribute("data-orientation");
  }
  squareExtended.classList.add("square");
  squareExtended.classList.remove("shipBlockDragging", "shipColorC");
  squareExtended.textContent = "";
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
  console.log(
    "squareMainPrevious -if null, means no shipBlock has been placed yet"
  );
  if (squareMainPrevious === null) {
    return { orientationColor: "horizontal", orientationUncolor: "horizontal" };
  } else {
    return {
      orientationColor: squareMainPrevious.dataset.orientation,
      orientationUncolor: squareMainPrevious.dataset.orientation,
    };
  }
}

function gameBoardToggleLegalState(isLegal) {
  if (isLegal) {
    console.log("legal");
    gameBoardplayerOne.classList.remove("gameBoardNotLegal");
    gameBoardplayerOne.classList.add("gameBoardLegal");
  } else {
    console.log("not legal");
    gameBoardplayerOne.classList.remove("gameBoardLegal");
    gameBoardplayerOne.classList.add("gameBoardNotLegal");
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
  squarePopulateWithShip,
  squareActiveAddHighlight,
  squareNonActiveRemoveHighlight,
  squareActiveLocate,
  squareUpdateAfterAttack,
  shipBlockColorAndUnColor,
  squareMainPreviousRemove,
  squaresColor,
  squaresUncolor,
  squareExtendedRemove,
  updateGameMoveStatus,
  shipBlockOriginalRemove,
  shipBlockGetOrientationData,
  gameBoardToggleLegalState,
};
