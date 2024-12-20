import {
  squareUpdateAfterAttack,
  shipBlockColorAndUnColor,
  squareActiveAddHighlight,
  squareNonActiveRemoveHighlight,
  squareMainPreviousRemove,
  shipBlockGetOrientationData,
  gameBoardToggleLegalState,
} from "./display.js";

import {
  checkCollisions,
  checkMoveLegal,
  checkDupeGridSquare,
} from "./helpers.js";

// gameSetup handlers
function shipBlockAttachEventHandlers(players) {
  // shipBlock draggables

  //  *****Todo, conider finding by class, and then attaching via forEaCH
  // const shipBlockC = document.getElementById("shipBlockC");

  // if (!document.querySelector(`[data-ship-type="${shipType}"]`)) {
  //   console.log("is null");
  // }
  const shipBlockC = document.getElementById("shipBlockC");
  // const shipBlockC = document.querySelector(`[data-ship-type="${shipType}"]`);
  const shipBlockB = document.getElementById("shipBlockB");
  const shipBlockD = document.getElementById("shipBlockD");
  const shipBlockS = document.getElementById("shipBlockS");
  const shipBlockP = document.getElementById("shipBlockP");

  // const handlerDrag = (event) => drag(event);

  shipBlockC.addEventListener("dragstart", drag);
  shipBlockB.addEventListener("dragstart", drag);
  shipBlockD.addEventListener("dragstart", drag);
  shipBlockS.addEventListener("dragstart", drag);
  shipBlockP.addEventListener("dragstart", drag);

  shipBlockC.addEventListener("dragend", dragEnd);
  shipBlockB.addEventListener("dragend", dragEnd);
  shipBlockD.addEventListener("dragend", dragEnd);
  shipBlockS.addEventListener("dragend", dragEnd);
  shipBlockP.addEventListener("dragend", dragEnd);

  // add Eventlisteners to
  // shipBlockC.addEventListener("dragstart", (event) => {
  //   drag(event, players);
  // });
  // shipBlockB.addEventListener("dragstart", (event) => {
  //   drag(event, players);
  // });
  // shipBlockD.addEventListener("dragstart", (event) => {
  //   drag(event, players);
  // });
  // shipBlockS.addEventListener("dragstart", (event) => {
  //   drag(event, players);
  // });
  // shipBlockP.addEventListener("dragstart", (event) => {
  //   drag(event, players);
  // });

  // return handlerDrag;
}

// Not even sure if this funtion is necessary....or the event listener....
function dragEnd(event) {
  console.log(event);

  console.log("return to legal state");

  gameBoardToggleLegalState(true);
  // console.log("drag end");
  // const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");
  // console.log("add axis event listener now?");
}

/*
 *shipBLock placment - setting up event handlers
 */

// Store event handlers in an object for flexibility
const handlers = {};

function gameBoardAttachEventHandlers(players) {
  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

  // Define and store handlers for individual access
  handlers.dragenter = (event) => {
    console.log(event.target);

    event.preventDefault(); // Allow the drag event

    if (isValidSquare(event.target)) {
      squareActiveAddHighlight(event.target);
      validateMove(event, players);
    }
  };
  handlers.dragover = (event) => allowDrop(event, players);
  handlers.dragleave = (event) => squareNonActiveRemoveHighlight(event.target);
  handlers.drop = (event) => {
    if (isValidSquare(event.target)) {
      drop(event, players);
    }
  };
  // Not even sure if this event listener is necessary....or the function..
  handlers.dragend = (event) => dragEnd(event); // TODO, query whether you need dragend

  // Attach Each handler
  gameBoardplayerOne.addEventListener("dragenter", handlers.dragenter);
  gameBoardplayerOne.addEventListener("dragover", handlers.dragover);
  gameBoardplayerOne.addEventListener("dragleave", handlers.dragleave);
  gameBoardplayerOne.addEventListener("drop", handlers.drop);
}

// checks that the dragenter and drop functions occur over squares, rather than rows.
function isValidSquare(target) {
  return target.classList.contains("square");
}
/*
 * Detach all handlers or a specific handler by event type
 */
function gameBoardDetachEventHandlers(eventType) {
  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

  if (eventType) {
    // Remove a specific event handler
    if (handlers[eventType]) {
      gameBoardplayerOne.removeEventListener(eventType, handlers[eventType]);
      delete handlers[eventType]; // Optional: remove reference
    }
  } else {
    // Remove all event handlers
    for (const [event, handler] of Object.entries(handlers)) {
      gameBoardplayerOne.removeEventListener(event, handler);
    }
    // Clear all references
    Object.keys(handlers).forEach((key) => delete handlers[key]);
  }
}

/*
 * Functions for shipBlock event handlers
 */
function drag(event) {
  // get shipBlock by dataset shipType to set class
  const shipBlock = document.querySelector(
    `[data-ship-type="${event.target.dataset.shipType}"]`
  );
  shipBlock.classList.add("shipBlockDragging");

  // passes shipType info onto drag event to be passed to the drop event when dropped.
  event.dataTransfer.setData("text", event.target.dataset.shipType);

  // Orients drag to left side of shipBlock
  event.dataTransfer.setDragImage(shipBlock, 0, 0);
}

// isMoveValid value toggles droppability of shipBlock onto square
let isMoveValid = false;

function validateMove(event, players) {
  const draggedElement = document.querySelector(".shipBlockDragging");
  const shipTypeData = draggedElement?.getAttribute("data-ship-type");
  const orientation = draggedElement.dataset.orientation;

  const ship = players["playerOne"].gameBoard.ships[shipTypeData];

  // Parse dataset once at the start of the function
  const row = parseInt(event.target.dataset.row);
  const column = parseInt(event.target.dataset.column);

  // Call the helper module to check if the move is legal
  const isLegalMove = checkMoveLegal(row, column, orientation, ship.length);

  let isClearOfCollisions = checkCollisions(
    players["playerOne"].gameBoard.boardArray,
    row,
    column,
    orientation,
    ship,
    "drag"
  );

  console.log("isCLear of collisios", isClearOfCollisions);

  if (!isLegalMove || !isClearOfCollisions) {
    isMoveValid = false;
    const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");
    console.log("isMoveValid " + isMoveValid);
  } else {
    isMoveValid = true;
    console.log("isMoveValid " + isMoveValid);
  }
  // Call the Display Module to update the visual state
  // gameBoardToggleLegalState(isLegalMove);
  gameBoardToggleLegalState(isMoveValid);
}

function allowDrop(event) {
  // prevents default (which allows a drop) only if isMoveValid is true
  if (isMoveValid) {
    event.preventDefault();
  }
}

function drop(event, players) {
  event.preventDefault();

  // removes targeting highlight
  squareNonActiveRemoveHighlight(event.target);

  // get shipType from event.target data
  const shipTypeFromShipBlockData = event.dataTransfer.getData("text");

  // removes previous squareMain, removes if it was original shipBlock, or returns element for processing if it is a previously placed shipBlock
  const squareMainPrevious = squareMainPreviousRemove(
    shipTypeFromShipBlockData
  );

  // gets orientation data of the placed shipBlock
  const { orientationColor, orientationUncolor } =
    shipBlockGetOrientationData(squareMainPrevious);

  // gets squareMain, the square being targeted
  const squareMain = event.target;
  // gets shipLength
  const shipLength =
    players["playerOne"].gameBoard.ships[shipTypeFromShipBlockData].length;

  // removal of previously placed shipBlock, placement of new shipBlock on gameBoard
  shipBlockColorAndUnColor(
    squareMainPrevious,
    squareMain,
    shipTypeFromShipBlockData,
    shipLength,
    orientationColor,
    orientationUncolor
  );

  // Listener for shipBlock change axis
  shipBlockChangeAxisListener(
    squareMain,
    shipTypeFromShipBlockData,
    shipLength,
    players
  );

  // assigns drag functionality onto new gridSquagit remain/shipBlock

  // const handlerDrag = shipBlockAttachEventHandlers(
  //   players,
  //   shipTypeFromShipBlockData
  // );
  // squareMain.addEventListener("dragstart", () =>
  //   handlerDrag(event, shipTypeFromShipBlockData)
  // );
  squareMain.addEventListener("dragstart", (event) => {
    drag(event);
  });
  squareMain.addEventListener("dragend", (event) => {
    dragEnd();
  });

  // Parse dataset once at the start of the function
  const row = parseInt(event.target.dataset.row);
  const column = parseInt(event.target.dataset.column);

  // Where the shipBlock is not the original, delete the previous one saved onto boardArray

  if (squareMainPrevious === null) {
    console.log("squareMainPrevious is null, so its the first shipBlock");
  } else {
    console.log("%%%%%trying to delete");

    console.log(squareMainPrevious);
    console.log(squareMainPrevious.dataset.row);
    players["playerOne"].gameBoard.placeShip(
      parseInt(squareMainPrevious.dataset.row),
      parseInt(squareMainPrevious.dataset.column),
      orientationColor,
      shipTypeFromShipBlockData,
      players["playerOne"],
      "delete"
    );
  }

  // save the shipBlock to the boardArray
  players["playerOne"].gameBoard.placeShip(
    row,
    column,
    orientationColor,
    shipTypeFromShipBlockData,
    players["playerOne"],
    "save"
  );
}

function shipBlockChangeAxisListener(
  squareMain,
  shipType,
  shipLength,
  players
) {
  const shipBlockChangeAxis = function () {
    shipBlockHandleChangeAxisClick(squareMain, shipType, shipLength, players);
  };
  squareMain.addEventListener("click", shipBlockChangeAxis);

  // ***TODOreturn callback function in case you need remove the event listener
  return shipBlockChangeAxis;
}

function shipBlockHandleChangeAxisClick(
  squareMain,
  shipType,
  shipLength,
  players
) {
  console.log("axis click operating");

  // determine new orientation of shipBlock, based on existing
  let currentOrientation = squareMain.dataset.orientation;
  let newOrientation =
    currentOrientation === "horizontal" ? "vertical" : "horizontal";

  // Parse dataset once at the start of the function
  const row = parseInt(squareMain.dataset.row);
  const column = parseInt(squareMain.dataset.column);

  const isLegalMove = checkMoveLegal(row, column, newOrientation, shipLength);

  const isClearOfCollisions = checkCollisions(
    players["playerOne"].gameBoard.boardArray,
    row,
    column,
    newOrientation,
    players["playerOne"].gameBoard.ships[`${shipType}`],
    "axisClick"
  );

  console.log(isClearOfCollisions);

  if (!isLegalMove) {
    // Indicate an illegal move temporarily
    gameBoardToggleLegalState(isLegalMove);
    setTimeout(() => gameBoardToggleLegalState(true), 250);
  } else {
    // Mark the move as legal and update the board visually
    gameBoardToggleLegalState(true);
    shipBlockColorAndUnColor(
      squareMain,
      squareMain,
      shipType,
      shipLength,
      newOrientation,
      currentOrientation
    );
  }
}

function targetListener() {
  const gameBoardplayerTwo = document.querySelector(".gameBoardplayerTwo");

  // attach Listener
  addGridSquareTargetListener(gameBoardplayerTwo, squareTarget);

  // return function to remove listeners
  function removeTargetListener() {
    console.log("remove target listener called");
    removeGridSquareTargetListener(gameBoardplayerTwo, squareTarget);
  }
  return removeTargetListener;
}

// functions to support targetListener

function addGridSquareTargetListener(element, handler) {
  element.addEventListener("mouseover", handler);
  element.addEventListener("mouseout", handler);
}

function removeGridSquareTargetListener(element, handler) {
  element.removeEventListener("mouseover", handler);
  element.removeEventListener("mouseout", handler);
}

// targeting square highlighting
function squareTarget(event) {
  const target = event.target;

  if (event.type === "mouseover") {
    // Adding highlight on mouse enter
    squareActiveAddHighlight(target);
  } else if (event.type === "mouseout") {
    // Removing highlight on mouse leave
    squareNonActiveRemoveHighlight(target);
  }
}

function attackListener(players, removeTargetListener, computerMove) {
  // gets the playerBoard
  const gameBoardplayerTwo = document.querySelector(".gameBoardplayerTwo");

  // gridAttackHandler that actually handles the attack.
  function gridAttackHandler(event, players) {
    if (event.target.classList.contains("square")) {
      console.log(players);

      // checks if the square has already been hit (dupe)
      if (
        checkDupeGridSquare(
          players["playerTwo"],
          event.target.dataset.row,
          event.target.dataset.column
        ) === true
      ) {
        alert("already been clicked");
        console.log("alreadybeenclicked");

        return;
      } else {
        removeTargetListener();
        removeAttackListener();
        // calls receive Attack to update boardArray if there is a succeful attack

        let attackResult = players["playerTwo"].gameBoard.receiveAttack(
          event.target.dataset.row,
          event.target.dataset.column
        );
        squareUpdateAfterAttack(attackResult, event.target);

        checkAllSunk(players, () =>
          computerMove(removeTargetListener, removeAttackListener)
        );
      }
    }
  }

  // VERYIMPORTANT - currently removed addGridSquareAttackListener. Need to re add
  addGridSquareAttackListener(gameBoardplayerTwo, (event) =>
    gridAttackHandler(event, players)
  );

  // function to remove attack listener
  function removeAttackListener() {
    console.log("remove attack listener called");
    removeGridSquareAttackListener(gameBoardplayerTwo, gridAttackHandler);
  }
  return { removeAttackListener };
}

function addGridSquareAttackListener(element, handler) {
  element.addEventListener("click", handler);
}

function removeGridSquareAttackListener(element, handler) {
  element.removeEventListener("click", handler);
}

function checkAllSunk(players, nextMoveCallback) {
  if (
    !players["playerOne"].gameBoard.checkSunk() &&
    !players["playerTwo"].gameBoard.checkSunk()
  ) {
    console.log("ships afloat");
    nextMoveCallback();
  } else {
    if (players["playerOne"].gameBoard.checkSunk()) {
      console.log(players["playerTwo"].name + "is the winner");
    } else {
      console.log(players["playerOne"].name + "is the winner");
    }
  }
}

export {
  shipBlockAttachEventHandlers,
  gameBoardAttachEventHandlers,
  targetListener,
  attackListener,
  checkDupeGridSquare,
  checkAllSunk,
};

// following actually appends the item to the block
// event.target.appendChild(document.getElementById(shipBlockId));

// THIS NEEDS TO HAPPEN AT THE END OF THE FUNCTION.
//    CALLING PLACESHIP FUNCTION
// ALTHOUGH DO I NEED TO PUT SHIPS INTO ARRAY TO DETECT COLLISIONS? I THINK I DO
// placeShip function sends ships to array
// TODO
// but don't placeShip yet okay, wait til all ships have been dragged on:
// also create a button that triggers final placement
// players["playerOne"].gameBoard.placeShip(
//   event.target.id[10],
//   event.target.id[12],
//   "horizontal",
//   shipBlockId[9],
//   players["playerOne"]
// );

// OBSEOLETE HANDLERS

// // Define the handlers at the top level or within a scope where they'll persist
// const handleDragEnter = (event, players) => {
//   validateMove(event, players);
//   squareActiveAddHighlight(event.target);
// };
// const handleDragOver = (event, players) => allowDrop(event, players);
// const handleDragLeave = (event) =>
//   squareNonActiveRemoveHighlight(event.target);
// const handleDrop = (event, players) => drop(event, players);
// const handleDragEnd = (event, players) => dragEnd(event, players);

// // Wrapper functions that allow passing `players` and remove listeners
// function createHandleDragEnter(players) {
//   return (event) => handleDragEnter(event, players);
// }
// function createHandleDragOver(players) {
//   return (event) => handleDragOver(event, players);
// }
// function createHandleDragLeave() {
//   return () => handleDragLeave();
// }
// function createHandleDrop(players) {
//   return (event) => handleDrop(event, players);
// }
// function createHandleDragEnd(players) {
//   return (event) => handleDragEnd(event, players);
// }
// function gameBoardAttachEventHandlers(players) {
//   // Event listeners - gameBoard
//   const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

//   gameBoardplayerOne.addEventListener(
//     "dragenter",
//     createHandleDragEnter(players)
//   );
//   gameBoardplayerOne.addEventListener(
//     "dragover",
//     createHandleDragOver(players)
//   );
//   gameBoardplayerOne.addEventListener("dragleave", createHandleDragLeave);
//   gameBoardplayerOne.addEventListener("drop", createHandleDrop(players));
//   gameBoardplayerOne.addEventListener("dragend", createHandleDragEnd(players));
// }

// function gameBoardDetachEventHandlers(players) {
//   gameBoard.removeEventListener("dragenter", handleDragEnter);
//   gameBoard.removeEventListener("dragover", handleDragOver);
//   gameBoard.removeEventListener("dragleave", handleDragLeave);
//   gameBoard.removeEventListener("drop", handleDrop);
//   gameBoard.removeEventListener("dragend", handleDragEnd);
// }
