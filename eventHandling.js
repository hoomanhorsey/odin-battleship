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
  // get shipType from event.target dataset
  console.log(event.target.dataset.shipType);

  // get shipBlock by ID to set class
  const shipBlock = document.getElementById(event.target.id);
  shipBlock.classList.add("shipBlockDragging");

  event.dataTransfer.setData("text", event.target.dataset.shipType);
  event.dataTransfer.setDragImage(shipBlock, 0, 0);
}

function checkLegal(event, players) {
  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

  const draggedElement = document.querySelector(".shipBlockDragging");
  const shipTypeData = draggedElement?.getAttribute("data-ship-type");

  const ship = players["playerOne"].gameBoard.ships[shipTypeData];

  if (
    checkMoveLegal(
      parseInt(event.target.dataset.row),
      parseInt(event.target.dataset.column),
      "right",
      ship.type,
      ship.length
    ) === false
  ) {
    console.log("not legal"); // not legal
    const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");
    gameBoardplayerOne.classList.remove("gameBoardLegal");
    gameBoardplayerOne.classList.add("gameBoardNotLegal");
    gameBoardplayerOne.removeEventListener("drop", (event) =>
      handleShipBlockDragEvent(event, shipType)
    );
  } else {
    console.log("legal"); // legal
    gameBoardplayerOne.classList.remove("gameBoardNotLegal");
    gameBoardplayerOne.classList.add("gameBoardLegal");
    gameBoardplayerOne.addEventListener("drop", (event) =>
      handleShipBlockDragEvent(event, players)
    );
  }
}

function dragEnd(event) {
  console.log("drag end");
  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");
  gameBoardplayerOne.classList.remove("gameBoardNotLegal");
  gameBoardplayerOne.classList.add("gameBoardLegal");
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event, players) {
  event.preventDefault();

  // ship Block ID
  const shipBlockId = event.dataTransfer.getData("text");

  const gridSquareMain = event.target;

  gridSquareMain.addEventListener("dragstart", (event) => {
    drag(event, players);
  });

  gridSquareMain.setAttribute("ship-type", shipBlockId);

  const shipType = players["playerOne"].gameBoard.ships[shipBlockId].type;
  const shipLength = players["playerOne"].gameBoard.ships[shipBlockId].length;

  // //  ****TODO IS THAT KEYSQUAREID used anywhere?
  // const keySquareId = gridSquaresColor(
  //   gridSquareMain,
  //   shipType,
  //   shipLength,
  //   direction
  // );

  //Initial paint
  let direction = "right";

  direction = shipBlockPaintDirection(
    gridSquareMain,
    shipType,
    shipLength,
    direction
  );

  direction = shipBlockChangeAxisListener(
    gridSquareMain,
    shipType,
    shipLength,
    direction
  );

  // removes the original shipBlock
  document.querySelector(`[data-ship-type="${shipBlockId}"]`).remove();
}

function shipBlockChangeAxisListener(
  gridSquareMain,
  shipType,
  shipLength,
  direction
) {
  console.log("<<<called shipBlockChangeAxisListener");
  gridSquareMain.addEventListener(
    "click",
    () =>
      (direction = shipBlockPaintDirection(
        gridSquareMain,
        shipType,
        shipLength,
        direction
      ))
    // gridSquaresUncolor(gridSquareMain, shipType, shipLength, direction)
  );
}

function shipBlockPaintDirection(
  gridSquareMain,
  shipType,
  shipLength,
  direction
) {
  if (direction === "right") {
    gridSquaresUncolor(gridSquareMain, shipType, shipLength, "down");
    gridSquaresColor(gridSquareMain, shipType, shipLength, "right");
    return "down";
  } else {
    gridSquaresUncolor(gridSquareMain, shipType, shipLength, "right");
    gridSquaresColor(gridSquareMain, shipType, shipLength, "down");
    return "right";
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
          gridSquareActiveAddHighlight(event); // Your logic for dragenter
          break;
        case "dragover":
          allowDrop(event, players); // Your logic for dragover
          break;
        case "dragleave":
          gridSquareNonActiveRemoveHighlight(); // Your logic for dragleave
          break;
        case "dragend":
          dragEnd(event, players);
          break;
        case "drop":
          drop(event, players); // Your logic for drop
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

function addGridSquareTargetListener(element, handler) {
  element.addEventListener("mouseover", handler);
}

function removeGridSquareTargetListener(element, handler) {
  element.removeEventListener("mouseover", handler);
}

// targeting square highlighting
function gridSquareTarget(event) {
  if (event.target.classList.contains("gridSquare")) {
    gridSquareNonActiveRemoveHighlight();
    gridSquareActiveAddHighlight(event);
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
        // removeTargetListener();
        // removeAttackListener();

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
  element.addEventListener("click", handler);
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

function shipBlockDirectionListenerKey(direction, shipType, shipLength) {
  const gridSquareTarget = document.getElementById(event.target.id);
  console.log(gridSquareTarget);

  gridSquareTarget.addEventListener("keydown", (event) => {
    console.log(event.key);
    // console.log(direction);
    // console.log(event.deltaY);
    // if (event.deltaY < 0) {
    //   direction = "right";
    //   gridSquaresUncolor(event, shipType, shipLength, direction);
    //   return "down";
    // } else if (event.deltaY > 0) {
    //   direction = "down";
    //   gridSquaresUncolor(event, shipType, shipLength, direction);
    //   return "right";
    // }
  });
}

// function shipBlockDirectionListener(direction, shipType, shipLength) {
//   const gridSquareTarget = document.getElementById(event.target.id);
//   console.log(gridSquareTarget);

//   gridSquareTarget.addEventListener("wheel", (event) => {
//     console.log(direction);
//     console.log(event.deltaY);
//     if (event.deltaY < 0) {
//       direction = "right";
//       gridSquaresUncolor(event, shipType, shipLength, direction);
//       return "down";
//     } else if (event.deltaY > 0) {
//       direction = "down";
//       gridSquaresUncolor(event, shipType, shipLength, direction);
//       return "right";
//     }
//   });
// }

function ashipBlockChangeAxis(gridSquareMain, shipType, shipLength, direction) {
  console.log("shipBLockChange Axis direciton " + direction);
  console.log(gridSquareMain, shipType, shipLength, direction);

  if (direction === "right") {
    gridSquaresUncolor(gridSquareMain, shipType, shipLength, direction);
    console.log(gridSquareMain);

    direction = "down";

    console.log(direction);

    return direction;
  }
}
