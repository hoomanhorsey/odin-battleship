import { Player } from "./gameObjects.js";
import { drawGrid } from "./display.js";
import { checkMoveLegal } from "./helpers.js";

function gameInit() {
  const players = createPlayers();
  // prefill positions

  // Following option allows computer to prefill postions
  // gameSetUp_positionPreFill(players);

  // draw gameBoard grid
  drawGrid(players["playerOne"]);
  drawGrid(players["playerTwo"]);
  // Following option is to allow user to selection positions
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

function gameSetUp_positionFill(players) {
  players["playerTwo"].gameBoard.placeShip(0, 9, "down", "C", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(2, 6, "right", "S", "playerTwo");
  // setup Draggables

  // EXPERIMENT rotate shipBlock via adding class
  document.getElementById("shipBlockC").addEventListener("wheel", rotateBlock);
  function rotateBlock() {
    shipBlockC.style.fontSize = "35px";
    shipBlockC.classList.add("shipBlockrotate90");
  }

  const gameSetupDiv = document.querySelector(".gameSetup");

  const shipBlockC = document.getElementById("shipBlockC");
  const shipBlockB = document.getElementById("shipBlockB");
  const shipBlockD = document.getElementById("shipBlockD");
  const shipBlockS = document.getElementById("shipBlockS");
  const shipBlockP = document.getElementById("shipBlockP");

  // Experiment with event delegation

  const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");
  console.log(gameBoardplayerOne);

  gameBoardplayerOne.addEventListener("dragenter", handleShipBlockDragEvent); // NOTE TODO, these event listeners haven't been removed. May need to remove.
  gameBoardplayerOne.addEventListener("dragover", handleShipBlockDragEvent);
  gameBoardplayerOne.addEventListener("dragleave", handleShipBlockDragEvent); // NOTE TODO, these event listeners haven't been removed. May need to remove.
  gameBoardplayerOne.addEventListener("drop", handleShipBlockDragEvent);
  gameBoardplayerOne.addEventListener("dragend", handleShipBlockDragEvent);

  function handleShipBlockDragEvent(eventB) {
    eventB.preventDefault(); // Allow drag-and-drop functionality

    let target = eventB.target;
    // Traverse up to find the gridSquare
    while (target !== gameBoardplayerOne) {
      if (target.classList.contains("gridSquare")) {
        // Handle the event based on event type
        switch (eventB.type) {
          case "dragover":
            allowDrop(eventB); // Your logic for dragover
            break;
          case "dragenter":
            checkLegal(eventB);
            highlightGridSquareAdd(eventB); // Your logic for dragenter
            break;
          case "dragleave":
            highlightGridSquareRemove(eventB); // Your logic for dragleave
            break;
          case "dragend":
            dragEnd(eventB);
            break;
          case "drop":
            drop(eventB); // Your logic for drop
            break;
        }
        break;
      }
      target = target.parentElement; // Traverse up to the parent
    }
  }

  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    const shipBlock = document.getElementById(event.target.id);
    console.log(shipBlock);
    shipBlock.classList.add("shipBlockDragging");
    event.dataTransfer.setDragImage(shipBlock, 0, 0);

    shipBlock.setAttribute("ship-type", event.target.id);
  }

  function checkLegal(event) {
    const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");

    console.log(players);
    console.log("check legal is called");

    const draggedElement = document.querySelector(".shipBlockDragging");
    const shipTypeData = draggedElement?.getAttribute("ship-type");
    console.log(shipTypeData[9]);

    if (
      checkMoveLegal(
        parseInt(event.target.dataset.row),
        parseInt(event.target.dataset.column),
        "right",
        players["playerOne"].gameBoard.ships[shipTypeData[9]]
      ) === false
    ) {
      const gameBoardplayerOne = document.querySelector(".gameBoardplayerOne");
      gameBoardplayerOne.classList.remove("gameBoardLegal");
      gameBoardplayerOne.classList.add("gameBoardNotLegal");
      console.log("not legal");
      gameBoardplayerOne.removeEventListener("drop", handleShipBlockDragEvent);

      //make gameboard red
    } else {
      console.log("legal");
      gameBoardplayerOne.classList.remove("gameBoardNotLegal");
      gameBoardplayerOne.classList.add("gameBoardLegal");
      gameBoardplayerOne.addEventListener("drop", handleShipBlockDragEvent);

      // }
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
    console.log("leaveing grid");
    document
      .getElementById(event.target.id)
      .classList.remove("gridSquareDraggedOver");
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();

    const shipBlockId = event.dataTransfer.getData("text");

    // event.target.textContent = shipBlockId;
    // console.log(event.target);

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

    let startColumn = parseInt(event.target.dataset.column);
    for (
      // let i = parseInt(event.target.dataset.column);

      let i = 0;
      i < players["playerOne"].gameBoard.ships[shipBlockId[9]].length;
      i++
    ) {
      console.log("i " + i);

      let newColumn = startColumn + i;
      console.log(newColumn);

      const gridSquareExtended = document.getElementById(
        `playerOner${event.target.dataset.row}c${newColumn}`
      );

      gridSquareExtended.classList.remove("gridSquare");
      gridSquareExtended.classList.remove("gridSquare_playerOne");
      gridSquareExtended.classList.remove("gridSquareDraggedOver");

      gridSquareExtended.classList.add("shipBlock");
      gridSquareExtended.classList.add("shipBlockC");

      gridSquareExtended.setAttribute("draggable", true);

      gridSquareExtended.textContent =
        players["playerOne"].gameBoard.ships[shipBlockId[9]].type;

      // console.log(gridSquareExtended);
    }

    // removes the original shipBlock
    document.getElementById(shipBlockId).remove();

    //ship length
    // console.log(players["playerOne"].gameBoard.ships[shipBlockId[9]].length);

    // console.log(event.target.dataset.row, event.target.dataset.column);

    // event.target.textContent = shipBlockId;

    // following actually appends the item to the block
    // event.target.appendChild(document.getElementById(shipBlockId));
    console.log(document.getElementById("playerOner0c0"));

    let testElement = document.getElementById("playerOner0c0");
    testElement.addEventListener("wheel", rotateBlockOnBoard);

    function rotateBlockOnBoard() {
      console.log("wheel");

      testElement.style.fontSize = "95px";
      testElement.classList.add("shipBlockrotate90");
    }

    // THIS NEEDS TO HAPPEN AT THE END OF THE FUNCTION.
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

  function cleanupListeners() {
    div.removeEventListener("dragover", allowDrop);
    div.removeEventListener("drop", drop);
    img.removeEventListener("dragstart", drag);
    console.log("Listeners removed.");
  }

  shipBlockC.addEventListener("dragstart", drag);

  // shipBlockB.addEventListener("dragstart", drag);
  // shipBlockD.addEventListener("dragstart", drag);
  // shipBlockS.addEventListener("dragstart", drag);
  // shipBlockP.addEventListener("dragstart", drag);
}

export { gameInit };

// TO DELETE - This was code for when I dynamically created the shipBlock objects. Nott necessary as more straightforwad to hard code.

// const shipBlockC = document.createElement("p");
// shipBlockC.setAttribute("draggable", true);
// shipBlockC.setAttribute("id", "shipBLockC");
// shipBlockC.classList.add("shipBlock", "shipBlockC");
// shipBlockC.textContent = "Cruiser";

// const shipBlockB = document.createElement("p");
// shipBlockB.setAttribute("draggable", true);
// shipBlockB.setAttribute("id", "shipBLockB");
// shipBlockB.classList.add("shipBlock", "shipBlockB");
// shipBlockB.textContent = "Battleship";
