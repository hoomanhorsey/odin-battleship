import { Player } from "./gameObjects.js";
import { drawGrid, squarePopulateWithShip } from "./display.js";
import {
  shipBlockAttachEventHandlers,
  gameBoardAttachEventHandlers,
} from "./eventHandling.js";

import { chooseRandomGridCoords } from "./computerLogic.js";

import {
  positionCheckArray,
  checkMoveLegal,
  isClearOfCollisions,
} from "./helpers.js";

function gameInit() {
  const players = createPlayers();
  // prefill positions

  // draw gameBoard grid
  drawGrid(players["playerOne"], squarePopulateWithShip);
  drawGrid(players["playerTwo"], squarePopulateWithShip);

  // *** <<<< FOR TESTING- function for computer to prefill postions>>>>>
  // gameSetUp_positionPreFill_BothPlayers(players);

  // function to allow user to selection positions
  // gameSetUp_positionFill_ComputerOnly(players);

  // // function to set up on postions for computer, simply for testing.
  // gameSetup_Noprefill();
  // function to set up computer game board at random positions
  gameSetupComputerRandom(players);

  console.log(players["playerTwo"].gameBoard.boardArray);

  shipBlockAttachEventHandlers(players);
  gameBoardAttachEventHandlers(players);
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

function gameSetupComputerRandom(players) {
  console.log(players["playerTwo"].gameBoard.boardArray);
  console.log(players["playerTwo"].gameBoard.ships);

  const boardArray = players["playerTwo"].gameBoard.boardArray;

  const shipsArray = Object.values(players["playerTwo"].gameBoard.ships);
  shipsArray.sort((a, b) => a.length - b.length);
  console.log(shipsArray);

  shipsArray.forEach((ship) => placeComputerShip(ship, boardArray, players));
}

function placeComputerShip(ship, boardArray, players) {
  let placed = false;

  while (!placed) {
    console.log(ship.type, ship.length);
    console.log("!!!!!!!!!!!!!!!!!!!!!!STARTING PLACING AGAIN");

    // generate random square co-ords
    const [row, column] = chooseRandomGridCoords();
    console.log("random called again " + row, column);

    // checks if unoccupied
    // ********************BACK TO LOOP
    //if !== null,  then it needs to go back to random coord generation

    if (isSquareUnoccupied(boardArray, row, column)) {
      console.log(isSquareUnoccupied(boardArray, row, column));

      let orientation = genRandomOrientation();
      console.log(orientation);

      let orientationExhausted = 0;
      while (orientationExhausted < 2) {
        if (
          checkMoveLegal(row, column, orientation, ship.length) &&
          isClearOfCollisions(
            boardArray,
            row,
            column,
            orientation,
            ship,
            "drag"
          )
        ) {
          // passes all checks, place ship
          console.log("***Looks like itlegal");
          orientationExhausted = 2;

          players["playerTwo"].gameBoard.placeShip(
            row,
            column,
            orientation,
            ship.type,
            "save"
          );
          placed = true;
          break;
        } else {
          // ship place failed, try again.
          if (orientation === "vertical") {
            orientation = "horizontal";
            orientationExhausted++;
            console.log(orientationExhausted);
          } else {
            orientation = "vertical";

            orientationExhausted++;
            console.log(orientationExhausted);
          }

          // loop ends, but is sent back with orientation with a different value.
          console.log("***NOT LEGAL");
        }
        // placed = false;
      }
    } else {
      // square is occupied, so placed is false and loop reruns
      placed = false;
      console.log("*****LOOP RERUNS");
    }
  }
}

function genRandomOrientation() {
  // generate random orientation
  // let orientation = "";
  if (Math.random() > 0.5) {
    // console.log(orientation);

    return "horizontal";
  } else {
    // console.log(orientation);

    return "vertical";
  }
}
function isSquareUnoccupied(boardArray, row, column) {
  return boardArray[row][column].ship === null;
}

function gameSetup_Noprefill() {
  // No positions prefilled on computer gameboard. This function is simply here as a reminder to reset prefills or delete entirely once into production
}
// TESTING ONLY prefill computer player positions
function gameSetUp_positionFill_ComputerOnly(players) {
  players["playerTwo"].gameBoard.placeShip(0, 9, "vertical", "C", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(
    2,
    6,
    "horizontal",
    "S",
    "playerTwo"
  );
}

// For Testing//
// prefill positions for testing_BothPlayers -
function gameSetUp_positionPreFill_BothPlayers(players) {
  players["playerOne"].gameBoard.placeShip(
    0,
    6,
    "horizontal",
    "C",
    "playerOne"
  );
  players["playerOne"].gameBoard.placeShip(
    5,
    2,
    "horizontal",
    "D",
    "playerOne"
  );
  players["playerOne"].gameBoard.placeShip(9, 7, "left", "B", "playerOne");
  players["playerOne"].gameBoard.placeShip(4, 7, "vertical", "P", "playerOne");
  players["playerOne"].gameBoard.placeShip(9, 9, "up", "S", "playerOne");

  players["playerTwo"].gameBoard.placeShip(0, 9, "vertical", "C", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(5, 3, "up", "D", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(9, 9, "left", "B", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(4, 7, "left", "P", "playerTwo");
  players["playerTwo"].gameBoard.placeShip(
    2,
    6,
    "horizontal",
    "S",
    "playerTwo"
  );
}

export { gameInit };

// checks Legal
// ********************toggle orientation if false???, then check again????
// console.log(row, column, orientation, ship.length);

// console.log(
//   "check move Legal ",
//   checkMoveLegal(row, column, orientation, ship.length)
// );

// // if (!checkMoveLegal) {
// //   return false;
// // }
// const isClear = isClearOfCollisions(
//   boardArray,
//   row,
//   column,
//   orientation,
//   ship,
//   "drag"
// );
// players["playerTwo"].gameBoard.placeShip(
//   row,
//   column,
//   orientation,
//   ship.type,
//   "save"
// );
// console.log("is clear ", isClear);

// positionCheckArray(boardArray, row, column, orientation, ship);
// placed = true;
