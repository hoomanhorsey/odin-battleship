import { Player } from "./gameObjects.js";
import { drawGrid } from "./display.js";
import { checkMoveLegal } from "./helpers.js";

function gameInit() {
  const players = createPlayers();
  // prefill positions

  // draw gameBoard grid
  drawGrid(players["playerOne"]);
  drawGrid(players["playerTwo"]);

  // *** <<<< FOR TESTING- function for computer to prefill postions>>>>>
  // gameSetUp_positionPreFill(players);

  // function to allow user to selection positions
  gameSetUp_positionFill(players);
  return players;
}

function createPlayers(
  playerOneName = "playerOne",
  playerTwoName = "playerTwo"
) {
  return {
    playerOne: new Player(playerOneName),
    playerTwo: new Player(playerTwoName),
  };
}

// TODO - error check that checks if object is illegal or a collision.
// ------TODO - if it is an error or collision, then you need to disable allowDrop()
// ------ TODO - but if it is legal then you can allow drop again.
// TODO - then once drop, you can display on DOM.
// TODO - draw it in, but don't save it to array.
// ------Once it is drawn in, the shipBlock is still on display.
//--------disable piece? append piece to div? remove shipBLock?
// TODO - allow user to rotate the piece using up and down.
// TODO - once all 5 pieces are on the gameboard allow user to START GAME!

// TODO - how to keep track of ships? Create a temp array of co-ordinates.
// ---- once you press confirm, take the co-ords from temp array and then put into place ship

// prefill computer player positions
function gameSetUp_positionFill(players) {
  players["playerTwo"].gameBoard.placeShip(0, 9, "down", "C", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(2, 6, "right", "S", "playerTwo");

  // Functions for event listeners
  function drag(event) {
    const shipBlock = document.getElementById(event.target.id);

    shipBlock.classList.add("shipBlockDragging");
    shipBlock.setAttribute("ship-type", event.target.id);

    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.setDragImage(shipBlock, 0, 0);
  }

  function checkLegal(event) {
    const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

    const draggedElement = document.querySelector(".shipBlockDragging");
    const shipTypeData = draggedElement?.getAttribute("ship-type");

    if (
      checkMoveLegal(
        parseInt(event.target.dataset.row),
        parseInt(event.target.dataset.column),
        "right",
        players["playerOne"].gameBoard.ships[shipTypeData[9]]
      ) === false
    ) {
      console.log("not legal"); // not legal
      const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");
      gameBoardplayerOne.classList.remove("gameBoardLegal");
      gameBoardplayerOne.classList.add("gameBoardNotLegal");
      gameBoardplayerOne.removeEventListener("drop", handleShipBlockDragEvent);
    } else {
      console.log("legal"); // legal
      gameBoardplayerOne.classList.remove("gameBoardNotLegal");
      gameBoardplayerOne.classList.add("gameBoardLegal");
      gameBoardplayerOne.addEventListener("drop", handleShipBlockDragEvent);
    }
  }

  function dragEnd(event) {
    console.log("drag end");
    const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");
    gameBoardplayerOne.classList.remove("gameBoardNotLegal");
    gameBoardplayerOne.classList.add("gameBoardLegal");
  }

  function highlightGridSquareAdd(event) {
    console.log("entering gridSquare");
    document
      .getElementById(event.target.id)
      .classList.add("gridSquareDraggedOver");
  }

  function highlightGridSquareRemove(event) {
    console.log("leaving gridSquare");
    document
      .getElementById(event.target.id)
      .classList.remove("gridSquareDraggedOver");
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();

    // ship Block ID
    const shipBlockId = event.dataTransfer.getData("text");
    console.log(shipBlockId);

    //Initially drop grid squares to the right.
    // colorGridSquaresRight();

    colorGridSquares(event, shipBlockId, "right");

    console.log(event.target.id);

    const gridSquareTarget = document.getElementById(event.target.id);
    gridSquareTarget.addEventListener("wheel", unColourGridSquares);

    function unColourGridSquares(event) {
      console.log("uncolourGrid Squares");
      console.log(event.target);
      console.log(event, shipBlockId, "down");

      // TODO, insert logic to delete colour from 'right' gridsquares.
      // TODO, refactor logic to make it a utility function

      colorGridSquares(event, shipBlockId, "down");
    }

    function colorGridSquares(event, shipBlockId, direction) {
      console.log(event.target, shipBlockId, direction);

      // FILLING IN GRIDS - at direction specified in parameters
      switch (direction) {
        case "right":
          let startColumn = parseInt(event.target.dataset.column);
          for (
            let i = 0;
            i < players["playerOne"].gameBoard.ships[shipBlockId[9]].length;
            i++
          ) {
            let newColumn = startColumn + i;
            const gridSquareExtended = document.getElementById(
              `playerOner${event.target.dataset.row}c${newColumn}`
            );

            updateGridSquareExtended(gridSquareExtended, shipBlockId[9]);
          }
          break;

        case "down":
          let startRow = parseInt(event.target.dataset.row);
          for (
            let i = 0;
            i < players["playerOne"].gameBoard.ships[shipBlockId[9]].length;
            i++
          ) {
            let newRow = startRow + i;
            const gridSquareExtended = document.getElementById(
              `playerOner${newRow}c${event.target.dataset.column}`
            );

            updateGridSquareExtended(gridSquareExtended, shipBlockId[9]);
          }
      }
    }

    function updateGridSquareExtended(gridSquareExtended, shipType) {
      gridSquareExtended.classList.remove(
        "gridSquare",
        "gridSquare_playerOne",
        "gridSquareDraggedOver"
      );

      gridSquareExtended.classList.add(
        "gridSquareContainShip",
        "gridSquareContainShipC"
      );
      gridSquareExtended.setAttribute("draggable", true);
      gridSquareExtended.textContent = shipType;
    }

    // removes the original shipBlock
    document.getElementById(shipBlockId).remove();

    //ship length
    // console.log(players["playerOne"].gameBoard.ships[shipBlockId[9]].length);

    // console.log(event.target.dataset.row, event.target.dataset.column);

    // event.target.textContent = shipBlockId;

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
  }

  // Event listeners - ship blocks
  // setup Draggables

  const shipBlockC = document.getElementById("shipBlockC");
  const shipBlockB = document.getElementById("shipBlockB");
  const shipBlockD = document.getElementById("shipBlockD");
  const shipBlockS = document.getElementById("shipBlockS");
  const shipBlockP = document.getElementById("shipBlockP");

  shipBlockC.addEventListener("dragstart", drag);

  // shipBlockB.addEventListener("dragstart", drag);
  // shipBlockD.addEventListener("dragstart", drag);
  // shipBlockS.addEventListener("dragstart", drag);
  // shipBlockP.addEventListener("dragstart", drag);

  // Event listeners - gameBoard

  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

  gameBoardplayerOne.addEventListener("dragenter", handleShipBlockDragEvent); // NOTE TODO, these event listeners haven't been removed. May need to remove.
  gameBoardplayerOne.addEventListener("dragover", handleShipBlockDragEvent);
  gameBoardplayerOne.addEventListener("dragleave", handleShipBlockDragEvent); // NOTE TODO, these event listeners haven't been removed. May need to remove.
  gameBoardplayerOne.addEventListener("drop", handleShipBlockDragEvent);
  gameBoardplayerOne.addEventListener("dragend", handleShipBlockDragEvent); ///TODO - drag end doesn't currently operate

  function handleShipBlockDragEvent(event) {
    event.preventDefault(); // Allow drag-and-drop functionality

    let target = event.target;
    // Traverse up to find the gridSquare
    while (target !== gameBoardplayerOne) {
      if (target.classList.contains("gridSquare")) {
        // Handle the event based on event type
        switch (event.type) {
          case "dragenter":
            checkLegal(event);
            highlightGridSquareAdd(event); // Your logic for dragenter
            break;
          case "dragover":
            allowDrop(event); // Your logic for dragover
            break;
          case "dragleave":
            highlightGridSquareRemove(event); // Your logic for dragleave
            break;
          case "dragend":
            dragEnd(event);
            break;
          case "drop":
            drop(event); // Your logic for drop
            break;
        }
        break;
      }
      target = target.parentElement; // Traverse up to the parent
    }
  }
}

// event listeners - remove.....
function cleanupListeners() {
  div.removeEventListener("dragover", allowDrop);
  div.removeEventListener("drop", drop);
  img.removeEventListener("dragstart", drag);
  console.log("Listeners removed.");
}

// EXPERIMENT rotate shipBlock via adding class
document.getElementById("shipBlockC").addEventListener("wheel", rotateBlock);
function rotateBlock() {
  // << logic disabled
  // shipBlockC.style.fontSize = "35px";
  // shipBlockC.classList.add("shipBlockrotate90");
}

// prefill positions for testing

function gameSetUp_positionPreFill(players) {
  players["playerOne"].gameBoard.placeShip(0, 6, "right", "C", "playerOne");
  players["playerOne"].gameBoard.placeShip(5, 2, "right", "D", "playerOne");
  players["playerOne"].gameBoard.placeShip(9, 7, "left", "B", "playerOne");
  players["playerOne"].gameBoard.placeShip(4, 7, "down", "P", "playerOne");
  players["playerOne"].gameBoard.placeShip(9, 9, "up", "S", "playerOne");

  players["playerTwo"].gameBoard.placeShip(0, 9, "down", "C", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(2, 6, "right", "S", "playerTwo");
}

export { gameInit };
