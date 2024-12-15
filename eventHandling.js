import {
  gridSquareNonActiveRemoveHighlight,
  gridSquareUpdateAfterAttack,
  gridSquaresColor,
  gridSquaresUncolor,
  gridSquareActiveAddHighlight,
} from "./display.js";

import { checkMoveLegal, checkDupeGridSquare } from "./helpers.js";

// gameSetup handlers
function setupGameSetupListeners(players) {
  // shipBlock draggables

  //  *****Todo, conider finding by class, and then attaching via forEaCH
  const shipBlockC = document.getElementById("shipBlockC");
  // ** inactive below
  // const shipBlockB = document.getElementById("shipBlockB");
  // const shipBlockD = document.getElementById("shipBlockD");
  // const shipBlockS = document.getElementById("shipBlockS");
  // const shipBlockP = document.getElementById("shipBlockP");

  // add Eventlisteners to
  shipBlockC.addEventListener("dragstart", (event) => {
    drag(event, players);
  });

  // drag);
  // shipBlockB.addEventListener("dragstart", drag);
  // shipBlockD.addEventListener("dragstart", drag);
  // shipBlockS.addEventListener("dragstart", drag);
  // shipBlockP.addEventListener("dragstart", drag);

  // Event listeners - gameBoard

  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

  gameBoardplayerOne.addEventListener("dragenter", (event) =>
    handleShipBlockDragEvent(event, players)
  ); // NOTE TODO, these event listeners haven't been removed. May need to remove.
  gameBoardplayerOne.addEventListener("dragover", (event) =>
    handleShipBlockDragEvent(event, players)
  );
  gameBoardplayerOne.addEventListener("dragleave", (event) =>
    handleShipBlockDragEvent(event, players)
  ); // NOTE TODO, these event listeners haven't been removed. May need to remove.
  gameBoardplayerOne.addEventListener("drop", (event) =>
    handleShipBlockDragEvent(event, players)
  );
  gameBoardplayerOne.addEventListener("dragend", (event) =>
    handleShipBlockDragEvent(event, players)
  ); ///TODO

  const shipBlocks = document.querySelectorAll(".shipBlock");
  shipBlocks.forEach((block) => {
    // block.addEventListener("dragstart", handleShipDragStart);
    // block.addEventListener("dragend", handleShipDragEnd);
  });
}

// Functions for event listeners
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

function checkLegal(event, players) {
  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

  const draggedElement = document.querySelector(".shipBlockDragging");
  const shipTypeData = draggedElement?.getAttribute("data-ship-type");
  const direction = draggedElement.dataset.direction;
  console.log(direction);

  const ship = players["playerOne"].gameBoard.ships[shipTypeData];

  if (
    checkMoveLegal(
      parseInt(event.target.dataset.row),
      parseInt(event.target.dataset.column),
      direction,
      ship.length
    ) === false
  ) {
    console.log("not legal"); // not legal
    gameBoardplayerOne.classList.remove("gameBoardLegal");
    gameBoardplayerOne.classList.add("gameBoardNotLegal");
  } else {
    gameBoardplayerOne.classList.remove("gameBoardNotLegal");
    gameBoardplayerOne.classList.add("gameBoardLegal");
  }
}
///TODO NOT Sure this fuction works
function dragEnd(event) {
  console.log("drag end");
  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");
  gameBoardplayerOne.classList.remove("gameBoardNotLegal");
  gameBoardplayerOne.classList.add("gameBoardLegal");
  console.log("add axis event listener now?");
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event, players) {
  event.preventDefault();

  // removes targeting  highlight
  gridSquareNonActiveRemoveHighlight();

  // REMOVES ORIGINAL SHIPBLOCK
  // gets shipBlockOriginal
  let shipBlockOriginal = document.querySelector('[data-ship-type="C"]');
  // removes the original shipBlock
  if (shipBlockOriginal.id === "shipBlockC") {
    shipBlockOriginal.remove();
  }

  //********************
  // get ship Block ID
  const shipBlockIdFromData = event.dataTransfer.getData("text");

  // Gets gridSquareMainPrevious and the direction the shipBlock is facing, direction, unless it's the first shipBlock placed in which case it's null.

  let directionColor;
  let directionUncolor;
  let gridSquareMainPrevious = document.querySelector('[data-ship-type="C"]');
  console.log("gridSquareMainPrevious -if null, means no previous yet");
  if (gridSquareMainPrevious !== null) {
    directionColor = gridSquareMainPrevious.dataset.direction;
    directionUncolor = gridSquareMainPrevious.dataset.direction;
  } else {
    directionColor = "right";
    directionUncolor = "right";
  }

  // gets gridSquareMain, the gridSquare being targeted
  const gridSquareMain = event.target;

  const shipType =
    players["playerOne"].gameBoard.ships[shipBlockIdFromData].type;
  const shipLength =
    players["playerOne"].gameBoard.ships[shipBlockIdFromData].length;

  // Initial colouring of gameBoard for shipBlock
  shipBlockColorAndUnColor(
    gridSquareMainPrevious,
    gridSquareMain,
    shipType,
    shipLength,
    directionColor,
    directionUncolor
  );

  // Listener for shipBlock change axis
  let shipBlockColorAndUncolorOnChangeAxisClickLogger;
  shipBlockChangeAxisListener(
    gridSquareMain,
    shipType,
    shipLength,
    shipBlockColorAndUncolorOnChangeAxisClickLogger
  );

  // assigns drag functionality onto new gridSquaremain/shipBlock
  gridSquareMain.addEventListener("dragstart", (event) => {
    drag(event, players);
  });
}

function shipBlockChangeAxisListener(
  gridSquareMain,
  shipType,
  shipLength,
  shipBlockColorAndUncolorOnChangeAxisClickLogger
) {
  gridSquareMain.addEventListener("click", () =>
    shipBlockColorAndUncolorOnChangeAxisClick(
      gridSquareMain,
      shipType,
      shipLength,
      shipBlockColorAndUncolorOnChangeAxisClickLogger
    )
  );
}

function shipBlockColorAndUncolorOnChangeAxisClick(
  gridSquareMain,
  shipType,
  shipLength,
  shipBlockColorAndUncolorOnChangeAxisClickLogger
) {
  console.log("axis click operating");
  shipBlockColorAndUncolorOnChangeAxisClickLogger++;
  console.log(shipBlockColorAndUncolorOnChangeAxisClickLogger);

  // get directions of shipBlock
  let directionColor = gridSquareMain.dataset.direction;
  let directionUncolor;

  console.log(
    parseInt(gridSquareMain.dataset.row),
    parseInt(gridSquareMain.dataset.column),
    directionColor,
    shipLength
  );

  // transforming directions before checkLegal processing
  if (directionColor === "right") {
    directionColor = "down";
    directionUncolor = "right";
    console.log(" directionUncolor = right, directionColor = down");
  } else if (directionColor === "down") {
    directionColor = "right";
    directionUncolor = "down";
    console.log(" directionUncolor = down, directionColor = right");
  }
  // check move legal first, before displaying

  if (
    checkMoveLegal(
      parseInt(gridSquareMain.dataset.row),
      parseInt(gridSquareMain.dataset.column),
      directionColor,
      shipLength
    ) === false
  ) {
    console.log("not legal"); // not legal
    // alert(
    //   "sorry, this move will take the ship out of the ocean. Please choose another move"
    // );
    gameBoardplayerOne.classList.remove("gameBoardLegal");
    gameBoardplayerOne.classList.add("gameBoardNotLegal");
    setTimeout(makeLegalAgain, 250);
    function makeLegalAgain() {
      gameBoardplayerOne.classList.remove("gameBoardNotLegal");
      gameBoardplayerOne.classList.add("gameBoardLegal");
    }
  } else {
    console.log("legal");
    gameBoardplayerOne.classList.remove("gameBoardNotLegal");
    gameBoardplayerOne.classList.add("gameBoardLegal");
    let shipBlockColorAndUncolorLogger = 0;
    shipBlockColorAndUnColor(
      gridSquareMain,
      gridSquareMain,
      shipType,
      shipLength,
      directionColor,
      directionUncolor
    );
  }
}

function shipBlockColorAndUnColor(
  gridSquareMainPrevious,
  gridSquareMain,
  shipType,
  shipLength,
  directionColor,
  directionUncolor
) {
  if (gridSquareMainPrevious !== null) {
    console.log("not null");
    console.log(directionUncolor);

    gridSquaresUncolor(
      gridSquareMainPrevious,
      shipType,
      shipLength,
      directionUncolor
    );
  }
  if (directionColor === "right") {
    gridSquaresColor(gridSquareMain, shipType, shipLength, "right");
    return "right";
  } else {
    //down
    gridSquaresColor(gridSquareMain, shipType, shipLength, "down");
    return "down";
  }
}

function handleShipBlockDragEvent(event, players) {
  event.preventDefault(); // Allow drag-and-drop functionality

  let target = event.target;
  // Traverse up to find the gridSquare
  while (target !== gameBoardplayerOne) {
    if (target.classList.contains("gridSquare")) {
      // Handle the event based on event type
      switch (event.type) {
        case "dragenter":
          checkLegal(event, players);
          gridSquareActiveAddHighlight(event.target); // Y
          break;
        case "dragover":
          allowDrop(event, players);
          break;
        case "dragleave":
          gridSquareNonActiveRemoveHighlight(event.target);
          break;
        case "dragend":
          dragEnd(event, players);
          break;
        case "drop":
          drop(event, players);
          break;
      }
      break;
    }
    target = target.parentElement; // Traverse up to the parent
  }
}

function targetListener() {
  const gameBoardplayerTwo = document.querySelector(".gameBoardplayerTwo");

  // attach Listener
  addGridSquareTargetListener(gameBoardplayerTwo, gridSquareTarget);

  // return function to remove listeners
  function removeTargetListener() {
    console.log("remove target listener called");
    removeGridSquareTargetListener(gameBoardplayerTwo, gridSquareTarget);
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
function gridSquareTarget(event) {
  const target = event.target;

  if (event.type === "mouseover") {
    // Adding highlight on mouse enter
    gridSquareActiveAddHighlight(target);
  } else if (event.type === "mouseout") {
    // Removing highlight on mouse leave
    gridSquareNonActiveRemoveHighlight(target);
  }
}

function attackListener(players, removeTargetListener, computerMove) {
  // gets the playerBoard
  const gameBoardplayerTwo = document.querySelector(".gameBoardplayerTwo");

  // gridAttackHandler that actually handles the attack.
  function gridAttackHandler(event, players) {
    if (event.target.classList.contains("gridSquare")) {
      console.log(players);

      // checks if the gridSquare has already been hit (dupe)
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
        gridSquareUpdateAfterAttack(attackResult, event.target);

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
  setupGameSetupListeners,
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
//   "right",
//   shipBlockId[9],
//   players["playerOne"]
// );
