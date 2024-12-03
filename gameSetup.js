import { Player } from "./gameObjects.js";
import { drawGrid } from "./display.js";
import { checkMoveLegal } from "./helpers.js";

function gameInit() {
  const players = createPlayers();
  // prefill positions

  // draw gameBoard grid
  drawGrid(players["playerOne"]);
  drawGrid(players["playerTwo"]);

  // *** FOR TESTING- function for computer to prefill postions
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

    console.log(players);
    console.log("check legal is called");

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
    console.log("leaveing gridSquare");
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

    // let gridSquareTarget = document.getElementById("playerOner0c0");

    colorGridSquaresRight();

    console.log(event.target.id);

    const gridSquareTarget = document.getElementById(event.target.id);
    gridSquareTarget.addEventListener("wheel", ArotateBlockOnBoard);

    function ArotateBlockOnBoard() {
      console.log("wheel");
      console.log("poo");

      // gridSquareTarget.style.fontSize = "95px";
      // gridSquareTarget.classList.add("shipBlockrotate90");
      colorGridSquaresDown();
    }

    function colorGridSquaresRight() {
      // FILLING IN GRIDS -  when column, to the right
      let startColumn = parseInt(event.target.dataset.column);
      for (
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

        gridSquareExtended.classList.add("gridSquareContainShip");
        gridSquareExtended.classList.add("gridSquareContainShipC");

        // gridSquareExtended.classList.add("shipBlock");
        // gridSquareExtended.classList.add("shipBlockC");

        gridSquareExtended.setAttribute("draggable", true);

        gridSquareExtended.textContent =
          players["playerOne"].gameBoard.ships[shipBlockId[9]].type;

        // console.log(gridSquareExtended);
      }
    }

    function colorGridSquaresDown() {
      // FILLING IN GRIDS -  when row, to down
      console.log(event.target.dataset.row);
      let startRow = parseInt(event.target.dataset.row);
      for (
        let i = 0;
        i < players["playerOne"].gameBoard.ships[shipBlockId[9]].length;
        i++
      ) {
        console.log("i " + i);

        let newRow = startRow + i;
        console.log(newRow);

        const gridSquareExtended = document.getElementById(
          `playerOner${newRow}c${event.target.dataset.column}`
        );

        gridSquareExtended.classList.remove("gridSquare");
        gridSquareExtended.classList.remove("gridSquare_playerOne");
        gridSquareExtended.classList.remove("gridSquareDraggedOver");

        const gridSquareContainShip = document.querySelectorAll(
          ".gridSquareContainShip"
        );

        console.log(gridSquareContainShip);

        gridSquareContainShip.forEach((e) => {
          e.classList.remove("gridSquareContainShip");
        });

        const gridSquareContainShipC = document.querySelectorAll(
          ".gridSquareContainShipC"
        );

        gridSquareContainShip.forEach((e) => {
          e.classList.remove("gridSquareContainShipC");
        });

        gridSquareExtended.classList.add("gridSquareContainShip");
        gridSquareExtended.classList.add("gridSquareContainShipC");
        // gridSquareExtended.classList.add("shipBlock");
        // gridSquareExtended.classList.add("shipBlockC");

        gridSquareExtended.setAttribute("draggable", true);

        gridSquareExtended.textContent =
          players["playerOne"].gameBoard.ships[shipBlockId[9]].type;

        // console.log(gridSquareExtended);
      }
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
  shipBlockC.style.fontSize = "35px";
  shipBlockC.classList.add("shipBlockrotate90");
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
