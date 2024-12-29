import {
  gameBoardToggleLegalState,
  shipBlockColorAndUnColor,
  shipBlockGetOrientationData,
  squareActiveAddHighlight,
  squareNonActiveRemoveHighlight,
  squareMainPreviousRemove,
  squareUpdateAfterAttack,
} from "./display.js";

import {
  checkDupeSquare,
  checkMoveLegal,
  isClearOfCollisions,
  shipBlocksInPlace,
} from "./helpers.js";

import { setUpGameStartListener } from "./gameLogic.js";

/*
 *shipBlock event handlers
 */

function shipBlockEventHandlersAttach(players) {
  const shipBlockC = document.getElementById("shipBlockC");
  const shipBlockB = document.getElementById("shipBlockB");
  const shipBlockD = document.getElementById("shipBlockD");
  const shipBlockS = document.getElementById("shipBlockS");
  const shipBlockP = document.getElementById("shipBlockP");

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

  // passes shipType info to drag event to be passed to  drop event when dropped.
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

  let isClear = isClearOfCollisions(
    players["playerOne"].gameBoard.boardArray,
    row,
    column,
    orientation,
    ship,
    "drag"
  );

  if (!isLegalMove || !isClear) {
    isMoveValid = false;
    const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");
  } else {
    isMoveValid = true;
  }
  // Call the Display Module to update the visual state
  // gameBoardToggleLegalState(isLegalMove);
  gameBoardToggleLegalState(isMoveValid, gameBoardplayerOne);
}

function dragEnd() {
  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");
  gameBoardToggleLegalState(true, gameBoardplayerOne);
}

/*
 *gameBoard event handlers
 */

// Store event handlers in an object for flexibility
const gameBoardHandlers = {};

function gameBoardEventHandlersAttach(players) {
  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

  // Define and store handlers for individual access
  gameBoardHandlers.dragenter = (event) => {
    event.preventDefault(); // Allow the drag event

    if (isValidSquare(event.target)) {
      squareActiveAddHighlight(event.target);
      validateMove(event, players);
    }
  };
  gameBoardHandlers.dragover = (event) => allowDrop(event, players);
  gameBoardHandlers.dragleave = (event) =>
    squareNonActiveRemoveHighlight(event.target);
  gameBoardHandlers.drop = (event) => {
    if (isValidSquare(event.target)) {
      drop(event, players);
    }
  };

  // Attach Each handler
  gameBoardplayerOne.addEventListener("dragenter", gameBoardHandlers.dragenter);
  gameBoardplayerOne.addEventListener("dragover", gameBoardHandlers.dragover);
  gameBoardplayerOne.addEventListener("dragleave", gameBoardHandlers.dragleave);
  gameBoardplayerOne.addEventListener("drop", gameBoardHandlers.drop);
}

// checks that the dragenter and drop functions occur over squares, rather than rows.
function isValidSquare(target) {
  return target.classList.contains("square");
}
/*
 * Detach all handlers or a specific handler by event type
 */
function gameBoardEventHandlersDetach(eventType) {
  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

  if (eventType) {
    // Remove a specific event handler
    if (gameBoardHandlers[eventType]) {
      gameBoardplayerOne.removeEventListener(
        eventType,
        gameBoardHandlers[eventType]
      );
      delete gameBoardHandlers[eventType]; // Optional: remove reference
    }
  } else {
    // Remove all event handlers
    for (const [event, handler] of Object.entries(gameBoardHandlers)) {
      gameBoardplayerOne.removeEventListener(event, handler);
    }
    // Clear all references
    Object.keys(gameBoardHandlers).forEach(
      (key) => delete gameBoardHandlers[key]
    );
  }
}

/*
 * Functions for gameBoard event handlers
 */

function allowDrop(event) {
  // prevents default (which allows a drop) only if isMoveValid is true
  if (isMoveValid) {
    event.preventDefault();
  }
}

const shipClickListeners = [];

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

  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

  if (squareMainPrevious !== null) {
    removeShipClickListener(shipTypeFromShipBlockData);
  }

  // Listener for shipBlock change axis
  const handler = shipBlockChangeAxisListener(
    squareMain,
    shipTypeFromShipBlockData,
    shipLength,
    players,
    gameBoardplayerOne
  );
  // Store the handler with the element for later removal
  squareMain.handlerReference = handler;

  // assigns drag functionality onto new square remain/shipBlock
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
    console.log(
      "squareMainPrevious is null, so its the first shipBlock of it's kind"
    );
  } else {
    players["playerOne"].gameBoard.placeShip(
      parseInt(squareMainPrevious.dataset.row),
      parseInt(squareMainPrevious.dataset.column),
      orientationColor,
      shipTypeFromShipBlockData,
      "delete"
    );
  }

  // save the shipBlock to the boardArray
  players["playerOne"].gameBoard.placeShip(
    row,
    column,
    orientationColor,
    shipTypeFromShipBlockData,
    "save"
  );
}

function shipBlockChangeAxisListener(
  squareMain,
  shipType,
  shipLength,
  players,
  gameBoardplayerOne
) {
  const shipBlockChangeAxis = function () {
    shipBlockHandleChangeAxisClick(squareMain, shipType, shipLength, players);
  };

  squareMain.addEventListener("click", shipBlockChangeAxis);
  shipClickListeners.push({
    element: squareMain,
    handler: shipBlockChangeAxis,
    shipType: shipType,
  });

  console.table(shipClickListeners);

  // ***TODOreturn callback function in case you need remove the event listener
  // return shipBlockChangeAxis;
}

function shipBlockHandleChangeAxisClick(
  squareMain,
  shipType,
  shipLength,
  players
) {
  // determine new orientation of shipBlock, based on existing
  let currentOrientation = squareMain.dataset.orientation;
  let newOrientation =
    currentOrientation === "horizontal" ? "vertical" : "horizontal";

  // Parse dataset once at the start of the function
  const row = parseInt(squareMain.dataset.row);
  const column = parseInt(squareMain.dataset.column);

  const isLegalMove = checkMoveLegal(row, column, newOrientation, shipLength);

  const isClear = isClearOfCollisions(
    players["playerOne"].gameBoard.boardArray,
    row,
    column,
    newOrientation,
    players["playerOne"].gameBoard.ships[`${shipType}`],
    "axisClick"
  );

  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

  if (!isLegalMove || isClear === false) {
    // Indicate an illegal move temporarily
    gameBoardToggleLegalState(false, gameBoardplayerOne);
    setTimeout(() => gameBoardToggleLegalState(true, gameBoardplayerOne), 250);
  } else {
    // Mark the move as legal and update the board visually
    gameBoardToggleLegalState(true, gameBoardplayerOne);
    shipBlockColorAndUnColor(
      squareMain,
      squareMain,
      shipType,
      shipLength,
      newOrientation,
      currentOrientation
    );

    // delete the shipBlock from boardArray
    players["playerOne"].gameBoard.placeShip(
      row,
      column,
      currentOrientation,
      shipType,
      "delete"
    );

    // save the shipBlock to the boardArray
    players["playerOne"].gameBoard.placeShip(
      row,
      column,
      newOrientation,
      shipType,
      "save"
    );
  }
}

// Function to remove a listener for a specific ship (based on shipId)
function removeShipClickListener(shipType) {
  const shipEntry = shipClickListeners.find(
    (entry) => entry.shipType === shipType
  );

  if (shipEntry) {
    shipEntry.element.removeEventListener("click", shipEntry.handler);
    // Optionally, remove the entry from the registry if no longer needed
    const index = shipClickListeners.indexOf(shipEntry);
    if (index !== -1) {
      shipClickListeners.splice(index, 1); // Remove the specific entry from the registry
    }
  } else {
    shipClickListeners.forEach(({ element, handler }) => {
      element.removeEventListener("click", handler);
    });
    shipClickListeners.length = 0; // Clear the registry
    // console.log(`No listener found for ship ${shipType}`);
  }
}

function targetListener() {
  const gameBoardplayerTwo = document.querySelector(".gameBoardplayerTwo");

  // attach Listener
  addSquareTargetListener(gameBoardplayerTwo, squareTarget);

  // return function to remove listeners
  function removeTargetListener() {
    console.log("remove target listener called");
    removeSquareTargetListener(gameBoardplayerTwo, squareTarget);
  }
  return removeTargetListener;
}

// functions to support targetListener
function addSquareTargetListener(element, handler) {
  console.log("addedSquareTargetListener");

  element.addEventListener("mouseover", handler);
  element.addEventListener("mouseout", handler);
}

function removeSquareTargetListener(element, handler) {
  console.log("removeSquareTargetListener");
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

function attackListener(
  players,
  removeTargetListener,
  callResolveToCompleteMove
) {
  // gets the playerBoard
  const gameBoardplayerTwo = document.querySelector(".gameBoardplayerTwo");

  // squareAttackHandler that actually handles the attack.
  function squareAttackHandler(event, players) {
    if (event.target.classList.contains("square")) {
      // checks if the square has already been hit (dupe)
      console.log("square attack handler is called");

      if (
        checkDupeSquare(
          players["playerTwo"],
          event.target.dataset.row,
          event.target.dataset.column
        ) === true
      ) {
        gameBoardToggleLegalState(false, gameBoardplayerTwo);

        setTimeout(
          () => gameBoardToggleLegalState(true, gameBoardplayerTwo),
          150
        );
        return;
      } else {
        callResolveToCompleteMove();
        removeTargetListener();
        removeAttackListener();

        // receiveAttack updates boardArray on successful attack
        let attackResult = players["playerTwo"].gameBoard.receiveAttack(
          event.target.dataset.row,
          event.target.dataset.column
        );
        squareUpdateAfterAttack(attackResult, event.target);
      }
    }
  }
  const attackHandler = createAttackHandler(players);

  // VERYIMPORTANT - currently removed addSquareAttackListener. Need to re add
  addSquareAttackListener(gameBoardplayerTwo, attackHandler);

  function createAttackHandler(players) {
    return (event) => squareAttackHandler(event, players);
  }

  // function to remove attack listener
  function removeAttackListener() {
    console.log("remove attack listener called");
    removeSquareAttackListener(gameBoardplayerTwo, attackHandler);
  }
  return { removeAttackListener };
}

function addSquareAttackListener(element, handler) {
  element.addEventListener("click", handler);
}

function removeSquareAttackListener(element, handler) {
  element.removeEventListener("click", handler);
}

function areAllShipsSunk(players) {
  console.log(
    "checkallsunk has been called which means play move has been called too. And I'm logging this because if play move has been called then the target and attack event listeners have been called as well"
  );

  if (players["playerOne"].gameBoard.checkSunk(players["playerOne"].name)) {
    console.log("p1 true");
    return [true, players["playerOne"].name];
  } else if (
    players["playerTwo"].gameBoard.checkSunk(players["playerTwo"].name)
  ) {
    console.log("p2 true");
    return [true, players["playerOne"].name];
  } else {
    console.log("false", null);
    return [false, null];
  }
}

function shipBlockDropListener(players) {
  const gameBoardplayerOne = document.getElementById("gameBoardplayerOne");
  gameBoardplayerOne.addEventListener("drop", (event) =>
    shipBlockDropHandler(event, players)
  );
}

function shipBlockDropHandler(event, players) {
  if (shipBlocksInPlace(players)) {
    setUpGameStartListener(players);
  }
}

export {
  areAllShipsSunk,
  attackListener,
  checkDupeSquare,
  gameBoardEventHandlersAttach,
  gameBoardEventHandlersDetach,
  removeShipClickListener,
  shipBlockEventHandlersAttach,
  shipBlockDropListener,
  targetListener,
};
