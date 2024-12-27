// makes empty boardArray for gameBoard object
function makeGrid() {
  const tempArray = [];
  for (let row = 0; row < 10; row++) {
    tempArray[row] = [];
    for (let column = 0; column < 10; column++) {
      tempArray[row].push({ ship: null, hit: false, missed: false });
    }
  }
  return tempArray;
}

// creates an array of a proposed position for checking, called by placeShip()
// this currently calls an error until it's dropped. It's okay for now
function positionCheckArray(boardArray, row, column, orientation, ship) {
  if (isNaN(row)) {
    return null;
  } else {
    switch (orientation) {
      case "vertical":
        return boardArray
          .slice(row, row + ship.length)
          .map((row) => row[column]);
      case "horizontal":
        return boardArray[row].slice(column, column + ship.length);
      default:
        throw new Error("positionCheckArray error");
    }
  }
}

// checks if moves are legal and within board bounds, called by placeShip()
function checkMoveLegal(row, column, orientation, shipLength) {
  switch (orientation) {
    case "vertical":
      if (row + shipLength > 10) {
        return false;
      } else {
        return true;
      }
    case "horizontal":
      if (column + shipLength > 10) {
        return false;
      } else {
        return true;
      }
    default:
      return false;
  }
}

// checks if there are any collisions,  called by placeShip() and shipBLockHandleChangeAxisClick
// 'false' means there are collisions
function isClearOfCollisions(boardArray, row, column, orientation, ship, mode) {
  const array = positionCheckArray(boardArray, row, column, orientation, ship);

  if (mode === "drag") {
    // pseudocode
    // if ship.type in array === null || shipType, return true
    // else
    return array.every(
      (value) => value.ship === null || value.ship === ship.type
    );
  } else {
    // returns true if all items are null, else false
    return array.slice(1).every((value) => value.ship === null);
  }
}

function shipBlockUpdateBoardArray(
  boardArray,
  row,
  column,
  orientation,
  shipObject,
  mode
) {
  const value = mode === "save" ? shipObject.type : null;
  switch (orientation) {
    case "vertical":
      for (let i = row; i < row + shipObject.length; i++) {
        boardArray[i][column].ship = value;
      }
      break;
    case "horizontal":
      for (let i = column; i < column + shipObject.length; i++) {
        boardArray[row][i].ship = value;
      }
      break;
    default:
      throw new Error("Invalid orientation provided");
  }
}

function checkDupeGridSquare(player, row, column) {
  let shipObject = player.gameBoard.boardArray[row][column];
  // if either condition is true, returns true - else returns false
  return shipObject.hit === true || shipObject.missed === true;
}

export {
  makeGrid,
  isClearOfCollisions,
  positionCheckArray,
  checkMoveLegal,
  shipBlockUpdateBoardArray,
  checkDupeGridSquare,
};
