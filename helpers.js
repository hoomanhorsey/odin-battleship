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
    console.log("row is NaN");
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
        console.log(column);
        if (!column) {
          console.log("no column");
        }
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
function checkCollisions(boardArray, row, column, orientation, ship, mode) {
  const array = positionCheckArray(boardArray, row, column, orientation, ship);

  console.log(boardArray, row, column, orientation, ship);

  if (mode === "drag") {
    return array.every((value) => value.ship === null);
  } else {
    console.log("calling click logic");
    return array.slice(1).every((value) => value.ship === null);
  }
}

// checks if there are any collisions,  called by placeShip()
function acheckCollisions(array) {
  return array.every((value) => value.ship === null);
}

function shipBlockUpdateBoardArray(
  boardArray,
  row,
  column,
  orientation,
  ship,
  mode
) {
  console.log(row, column, orientation, ship, mode);

  const value = mode === "save" ? ship.type : null;
  switch (orientation) {
    case "vertical":
      for (let i = row; i < row + ship.length; i++) {
        boardArray[i][column].ship = value;
      }
      break;
    case "horizontal":
      for (let i = column; i < column + ship.length; i++) {
        boardArray[row][i].ship = value;
      }
      break;
    default:
      throw new Error("Invalid orientation provided");
  }
}

function checkDupeGridSquare(player, row, column) {
  console.log(player);
  console.log("dupe checked" + row + column);

  let shipObject = player.gameBoard.boardArray[row][column];

  if (shipObject.hit === true || shipObject.missed === true) {
    console.log("already hit, dont count this one");
    return true;
  } else {
    console.log("returning false");
    return false;
  }
}

export {
  makeGrid,
  checkCollisions,
  positionCheckArray,
  checkMoveLegal,
  shipBlockUpdateBoardArray,
  checkDupeGridSquare,
};
